import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'
import { ABUSE_LIMIT, ABUSE_WINDOW_MS, clientKey, rateLimit, readBodyWithLimit, tooManyRequests } from '@/lib/form-guard'
import type { NutibotEvent } from '@/lib/nutibot-events'
import { nutibotSystemPrompt } from '@/lib/nutibot-prompt'
import { isLocale } from '@/lib/seo/site'

/*
 * Chat libre de Nuti. La conversación vive en el navegador y viaja completa en
 * cada pedido (la API no guarda estado). La respuesta es NDJSON, una línea por
 * evento: {type:"text"} con cada fragmento, {type:"reset"} si el modelo declina
 * a mitad de camino y la API sigue con otro modelo (hay que descartar lo
 * mostrado), {type:"refusal"} y {type:"error"}.
 */

const MODEL = 'claude-sonnet-5-5'
const MAX_BODY_BYTES = 32 * 1024
const MAX_TURNS = 16
const MAX_USER_CHARS = 500
const MAX_ASSISTANT_CHARS = 4000

// Cada pregunta cuesta plata: además del techo antiflooding hay uno por ráfaga
// y otro diario por IP.
const BURST_LIMIT = 15
const BURST_WINDOW_MS = 10 * 60 * 1000
const DAILY_LIMIT = 80
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000

let client: Anthropic | null = null

function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY?.trim()) return null
  client ??= new Anthropic()
  return client
}

function parseMessages(value: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_TURNS) return null

  const messages: Anthropic.Beta.BetaMessageParam[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') return null
    const { role, content } = item as Record<string, unknown>
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null

    const text = content.trim()
    const limit = role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS
    if (!text || text.length > limit) return null
    messages.push({ role, content: text })
  }

  if (messages[0].role !== 'user' || messages.at(-1)?.role !== 'user') return null
  return messages
}

export async function POST(request: Request) {
  const who = clientKey(request)

  if (!(await rateLimit(`nutibot:abuse:${who}`, ABUSE_LIMIT, ABUSE_WINDOW_MS))) {
    return tooManyRequests(ABUSE_WINDOW_MS / 1000)
  }

  const anthropic = getClient()
  if (!anthropic) {
    console.error('[nutibot] Falta ANTHROPIC_API_KEY.')
    return NextResponse.json({ error: 'El chat no está disponible.' }, { status: 503 })
  }

  const bytes = await readBodyWithLimit(request, MAX_BODY_BYTES)
  if (!bytes) {
    return NextResponse.json({ error: 'La conversación es demasiado larga.' }, { status: 413 })
  }

  let body: Record<string, unknown> | null = null
  try {
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes))
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) body = parsed as Record<string, unknown>
  } catch {
    body = null
  }

  const locale = typeof body?.locale === 'string' && isLocale(body.locale) ? body.locale : null
  const messages = parseMessages(body?.messages)
  if (!locale || !messages) {
    return NextResponse.json({ error: 'Mensaje inválido.' }, { status: 400 })
  }

  if (
    !(await rateLimit(`nutibot:burst:${who}`, BURST_LIMIT, BURST_WINDOW_MS)) ||
    !(await rateLimit(`nutibot:daily:${who}`, DAILY_LIMIT, DAILY_WINDOW_MS))
  ) {
    return tooManyRequests(BURST_WINDOW_MS / 1000)
  }

  const stream = anthropic.beta.messages.stream(
    {
      model: MODEL,
      max_tokens: 4096,
      // Chat corto: con esfuerzo bajo el modelo casi no piensa y la primera
      // palabra llega rápido.
      output_config: { effort: 'low' },
      // Si un clasificador de seguridad declina (falso positivo), la API
      // reintenta sola con el modelo recomendado para esa categoría.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: [{ type: 'text', text: nutibotSystemPrompt(locale), cache_control: { type: 'ephemeral' } }],
      messages,
    },
    { signal: request.signal },
  )

  const encoder = new TextEncoder()
  let cancelled = false
  const responseBody = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: NutibotEvent) => {
        if (!cancelled) controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`))
      }
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_start' && event.content_block.type === 'fallback') {
            send({ type: 'reset' })
          } else if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            send({ type: 'text', text: event.delta.text })
          }
        }
        const final = await stream.finalMessage()
        if (final.stop_reason === 'refusal') send({ type: 'refusal' })
      } catch (error) {
        if (!cancelled && !request.signal.aborted) {
          if (error instanceof Anthropic.RateLimitError) {
            console.error('[nutibot] Límite de la API de Anthropic:', error.message)
          } else if (error instanceof Anthropic.APIError) {
            console.error(`[nutibot] Error ${error.status} de la API de Anthropic:`, error.message)
          } else {
            console.error('[nutibot] No se pudo completar la respuesta:', error)
          }
          send({ type: 'error' })
        }
      } finally {
        if (!cancelled) controller.close()
      }
    },
    cancel() {
      cancelled = true
      stream.abort()
    },
  })

  return new Response(responseBody, {
    headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

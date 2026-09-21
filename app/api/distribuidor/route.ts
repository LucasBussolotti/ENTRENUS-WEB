import { NextResponse } from 'next/server'
import { getResend, CONTACT_EMAIL, MAIL_FROM } from '@/lib/email'
import {
  ABUSE_LIMIT,
  ABUSE_WINDOW_MS,
  clientKey,
  rateLimit,
  tooManyRequests,
  validateFields,
} from '@/lib/form-guard'

const SUBMIT_LIMIT = 5
const SUBMIT_WINDOW_MS = 10 * 60 * 1000
const MAX_BODY_BYTES = 16 * 1024

export async function POST(request: Request) {
  const who = clientKey(request)

  // Techo antiflooding: cuenta todo, incluso lo que ni llega a validar.
  if (!(await rateLimit(`distribuidor:abuse:${who}`, ABUSE_LIMIT, ABUSE_WINDOW_MS))) {
    return tooManyRequests(ABUSE_WINDOW_MS / 1000)
  }

  // El formulario son cinco campos de texto: cualquier cuerpo más grande que esto
  // no es un envío legítimo y no hay razón para parsearlo.
  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'El formulario es demasiado grande.' }, { status: 413 })
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'El formulario es demasiado grande.' }, { status: 413 })
  }

  let body: Record<string, unknown> | null = null
  try {
    const parsed: unknown = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      body = parsed as Record<string, unknown>
    }
  } catch {
    body = null
  }

  if (!body) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }

  const validation = validateFields([
    { name: 'nombre', value: body.nombre },
    { name: 'ubicacion', value: body.ubicacion },
    { name: 'zona', value: body.zona },
    { name: 'telefono', value: body.telefono },
    { name: 'email', value: body.email, isEmail: true },
  ])

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const { nombre, ubicacion, zona, telefono, email } = validation.values

  // Recién acá se consume la cuota cara: el envío es válido y va a gastar un mail.
  if (!(await rateLimit(`distribuidor:submit:${who}`, SUBMIT_LIMIT, SUBMIT_WINDOW_MS))) {
    return tooManyRequests(SUBMIT_WINDOW_MS / 1000)
  }

  // El SDK de Resend lanza (no devuelve error) si falta la API key o si se cae la
  // red. Sin este try el endpoint respondía 500 con stack en vez de un 502 limpio.
  try {
    const { error } = await getResend().emails.send({
      from: MAIL_FROM,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nuevo interesado en ser distribuidor: ${nombre}`,
      text: `Nombre: ${nombre}\nUbicación: ${ubicacion}\nZona de cobertura: ${zona}\nTeléfono: ${telefono}\nEmail: ${email}`,
    })

    if (error) {
      console.error('[distribuidor] Resend rechazó el envío:', error)
      return NextResponse.json({ error: 'No se pudo enviar el formulario.' }, { status: 502 })
    }
  } catch (cause) {
    console.error('[distribuidor] No se pudo contactar a Resend:', cause)
    return NextResponse.json({ error: 'No se pudo enviar el formulario.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

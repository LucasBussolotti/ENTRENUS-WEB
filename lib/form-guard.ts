/**
 * Defensas compartidas por los formularios públicos (/api/empleos y /api/distribuidor).
 *
 * Ambos endpoints son anónimos y disparan efectos con costo real: mandan mail por
 * Resend y escriben en el CRM de Odoo. Sin estos límites, cualquiera puede quemar
 * la cuota de mail, llenar el kanban de Reclutamiento o tumbar el proceso subiendo
 * archivos en paralelo.
 */

// ── Límites de campo ──

export const FIELD_LIMITS = {
  nombre: 120,
  dni: 40,
  telefono: 40,
  localidad: 160,
  ubicacion: 160,
  zona: 200,
  email: 254, // RFC 5321
} as const

export type FieldName = keyof typeof FIELD_LIMITS

// Todos los campos son de una línea. Los saltos y tabulaciones pasan a ser un
// espacio (un \r\n en el nombre terminaba en el asunto del mail) y el resto de
// los caracteres de control se elimina, porque rompen el XML que va a Odoo.
const LINE_BREAKS = /[\t\n\v\f\r\u0085\u2028\u2029]+/g
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g

export function sanitizeText(value: string): string {
  return value.replace(LINE_BREAKS, ' ').replace(CONTROL_CHARS, '').trim()
}

/**
 * Lee el cuerpo cortando apenas supera `maxBytes`. Mirar sólo `content-length` no
 * alcanza: un envío "chunked" no lo declara y se leía entero en memoria antes de
 * medirlo. Devuelve null si se pasa del límite.
 */
export async function readBodyWithLimit(request: Request, maxBytes: number): Promise<Uint8Array<ArrayBuffer> | null> {
  if (!request.body) return new Uint8Array()

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > maxBytes) {
      await reader.cancel()
      return null
    }
    chunks.push(value)
  }

  const body = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    body.set(chunk, offset)
    offset += chunk.byteLength
  }
  return body
}

// Deliberadamente laxo: sólo descarta lo que con seguridad no es una dirección.
// Validar emails "del todo" con una regex es una batalla perdida.
const EMAIL_SHAPE = /^[^\s@,;:<>"']+@[^\s@,;:<>"'.]+(\.[^\s@,;:<>"'.]+)+$/

export type FieldSpec = { name: FieldName; value: unknown; isEmail?: boolean }

export type ValidationResult =
  | { ok: true; values: Record<string, string> }
  | { ok: false; error: string }

export function validateFields(specs: FieldSpec[]): ValidationResult {
  const values: Record<string, string> = {}

  for (const { name, value, isEmail } of specs) {
    if (typeof value !== 'string') {
      return { ok: false, error: 'Faltan campos obligatorios.' }
    }

    const clean = sanitizeText(value)
    if (!clean) {
      return { ok: false, error: 'Faltan campos obligatorios.' }
    }
    if (clean.length > FIELD_LIMITS[name]) {
      return { ok: false, error: 'Alguno de los campos supera el largo permitido.' }
    }
    if (isEmail && !EMAIL_SHAPE.test(clean)) {
      return { ok: false, error: 'El email no tiene un formato válido.' }
    }

    values[name] = clean
  }

  return { ok: true, values }
}

// ── Validación del CV ──

export const MAX_CV_SIZE = 5 * 1024 * 1024

/**
 * El `Content-Type` de un FormData lo elige el cliente, así que no alcanza con
 * mirarlo: se comprueba la firma binaria real del archivo. Evita que un ejecutable
 * renombrado termine como adjunto en la casilla del equipo.
 */
const MAGIC_SIGNATURES: { mime: string; bytes: number[]; offset: number }[] = [
  { mime: 'application/pdf', bytes: [0x25, 0x50, 0x44, 0x46], offset: 0 }, // %PDF
  // .docx es un ZIP (PK\x03\x04); .doc es el contenedor OLE2 de Office 97-2003.
  {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    bytes: [0x50, 0x4b, 0x03, 0x04],
    offset: 0,
  },
  { mime: 'application/msword', bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], offset: 0 },
]

export function detectCvMime(content: Buffer): string | null {
  for (const { mime, bytes, offset } of MAGIC_SIGNATURES) {
    if (bytes.every((byte, i) => content[offset + i] === byte)) return mime
  }
  return null
}

/** Deja sólo un nombre de archivo plano: sin rutas, sin control, sin sorpresas. */
export function safeFilename(name: string, fallback: string): string {
  const base = sanitizeText(name).split(/[/\\]/).pop() ?? ''
  const cleaned = base.replace(/[^\w.\- ]+/g, '_').replace(/^\.+/, '').slice(0, 120)
  return cleaned || fallback
}

// ── Rate limiting ──

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

/**
 * Hay dos techos distintos, a propósito:
 *
 *  - ABUSE: generoso, cuenta *todos* los requests. Frena el flooding puro.
 *  - SUBMIT: estricto, se consume sólo cuando el envío es válido y va a gastar
 *    plata (mail + escritura en Odoo).
 *
 * Separarlos importa: con un único contador, alguien que se equivoca al tipear
 * el email cinco veces queda bloqueado diez minutos por usar mal el formulario.
 */
export const ABUSE_LIMIT = 40
export const ABUSE_WINDOW_MS = 10 * 60 * 1000

function rateLimitInMemory(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()

  // Barrido perezoso: sin esto el Map crece sin techo y se vuelve un leak.
  if (buckets.size > 5000) {
    for (const [k, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(k)
    }
  }

  const existing = buckets.get(key)
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (existing.count >= limit) return false

  existing.count += 1
  return true
}

/**
 * Contador compartido sobre Upstash Redis por su API REST: no necesita driver ni
 * conexiones persistentes, así que funciona igual en serverless y en un server
 * largo. INCR + EXPIRE en un pipeline es atómico del lado de Redis.
 */
async function rateLimitShared(
  url: string,
  token: string,
  key: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const redisKey = `ratelimit:${key}`
  const response = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      ['INCR', redisKey],
      ['EXPIRE', redisKey, String(Math.ceil(windowMs / 1000)), 'NX'],
    ]),
    signal: AbortSignal.timeout(2_000),
  })

  if (!response.ok) throw new Error(`Upstash respondió ${response.status}`)

  const result = (await response.json()) as { result?: number }[]
  const count = Number(result?.[0]?.result)
  if (!Number.isFinite(count)) throw new Error('Respuesta inesperada de Upstash')

  return count <= limit
}

let warnedMissingStore = false

/**
 * Ventana fija. Si hay credenciales de Upstash el contador es global a todas las
 * instancias; si no, cae al contador en memoria, que es por réplica.
 *
 * Ante un fallo del store compartido NO se deja pasar el request a ciegas: se cae
 * al contador local. Es preferible frenar de más que quedarse sin techo justo
 * cuando la infraestructura está teniendo problemas.
 */
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()

  if (url && token) {
    try {
      return await rateLimitShared(url, token, key, limit, windowMs)
    } catch (cause) {
      console.error('[rate-limit] Falló el store compartido, se usa el contador local:', cause)
    }
  } else if (process.env.NODE_ENV === 'production' && !warnedMissingStore) {
    warnedMissingStore = true
    console.warn(
      '[rate-limit] Sin UPSTASH_REDIS_REST_URL/TOKEN el límite de los formularios es por instancia: con varias réplicas se multiplica.',
    )
  }

  return rateLimitInMemory(key, limit, windowMs)
}

/**
 * IP del cliente para el rate limit. El primer valor de x-forwarded-for lo escribe
 * el propio cliente, así que rotándolo se esquivaba el límite. Se usa, en orden:
 *
 *  1. x-real-ip, que el proxy (Vercel, nginx) pisa con la IP real de la conexión.
 *  2. El último valor de x-forwarded-for: lo agrega el proxy más cercano y el
 *     cliente no lo controla.
 *
 * Si no hay ninguna, todo cae en el mismo bucket: prefiere frenar de más antes
 * que dejar el endpoint sin techo. Sin un proxy delante que ponga estas
 * cabeceras no hay forma confiable de saber la IP.
 */
export function clientKey(request: Request): string {
  const realIp = request.headers.get('x-real-ip')?.trim()
  const forwarded = request.headers.get('x-forwarded-for')?.split(',').map((part) => part.trim()).filter(Boolean)
  return realIp || forwarded?.at(-1) || 'sin-ip'
}

export function tooManyRequests(retryAfterSeconds: number): Response {
  return Response.json(
    { error: 'Demasiados intentos. Probá de nuevo en unos minutos.' },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
  )
}

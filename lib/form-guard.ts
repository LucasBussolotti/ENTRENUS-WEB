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

// Los caracteres de control rompen tanto el XML que se le manda a Odoo como las
// cabeceras del mail, así que se eliminan antes de cualquier otra cosa.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

export function sanitizeText(value: string): string {
  return value.replace(CONTROL_CHARS, '').trim()
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
  }

  return rateLimitInMemory(key, limit, windowMs)
}

/**
 * Sólo se confía en x-forwarded-for cuando lo pone el proxy de delante. Si no hay
 * cabecera, todo cae en el mismo bucket: prefiere frenar de más antes que dejar
 * el endpoint sin techo.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip')?.trim()
  return ip || 'sin-ip'
}

export function tooManyRequests(retryAfterSeconds: number): Response {
  return Response.json(
    { error: 'Demasiados intentos. Probá de nuevo en unos minutos.' },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
  )
}

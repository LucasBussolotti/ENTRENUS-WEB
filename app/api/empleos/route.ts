import { NextResponse } from 'next/server'
import { getMailAddresses, getResend } from '@/lib/email'
import { getOdooConfig } from '@/lib/odoo'
import { createApplicant } from '@/lib/odoo-recruitment'
import {
  ABUSE_LIMIT,
  ABUSE_WINDOW_MS,
  clientKey,
  detectCvMime,
  MAX_CV_SIZE,
  rateLimit,
  safeFilename,
  tooManyRequests,
  validateFields,
} from '@/lib/form-guard'

const AREA_LABELS: Record<string, string> = {
  produccion: 'Producción',
  administracion: 'Administración',
  ventas: 'Ventas / Comercial',
  marketing: 'Marketing',
  logistica: 'Logística',
}

const SUBMIT_LIMIT = 3
const SUBMIT_WINDOW_MS = 15 * 60 * 1000
// El CV son 5MB; el resto del formulario es texto. 6MB deja margen sin permitir abuso.
const MAX_BODY_BYTES = 6 * 1024 * 1024

const CV_EXTENSIONS: Record<string, string> = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
}

export async function POST(request: Request) {
  const who = clientKey(request)

  // Techo antiflooding: cuenta todo, incluso lo que ni llega a validar.
  if (!(await rateLimit(`empleos:abuse:${who}`, ABUSE_LIMIT, ABUSE_WINDOW_MS))) {
    return tooManyRequests(ABUSE_WINDOW_MS / 1000)
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'El archivo supera el tamaño permitido.' }, { status: 413 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'No se pudo leer el formulario.' }, { status: 400 })
  }

  const validation = validateFields([
    { name: 'nombre', value: formData.get('nombre') },
    { name: 'dni', value: formData.get('dni') },
    { name: 'telefono', value: formData.get('telefono') },
    { name: 'localidad', value: formData.get('localidad') },
    { name: 'email', value: formData.get('email'), isEmail: true },
  ])

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const { nombre, dni, telefono, localidad, email } = validation.values

  // El área tiene que ser una de las opciones del select, no texto libre.
  const area = formData.get('area')
  if (typeof area !== 'string' || !(area in AREA_LABELS)) {
    return NextResponse.json({ error: 'El área seleccionada no es válida.' }, { status: 400 })
  }
  const areaLabel = AREA_LABELS[area]

  const cv = formData.get('cv')
  const attachments: { filename: string; content: Buffer }[] = []
  let cvFile: { filename: string; content: Buffer; mimetype: string } | null = null

  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV_SIZE) {
      return NextResponse.json({ error: 'El CV supera los 5MB permitidos.' }, { status: 400 })
    }

    const content = Buffer.from(await cv.arrayBuffer())

    // El tipo declarado por el navegador no se usa: manda la firma binaria real.
    const realMime = detectCvMime(content)
    if (!realMime) {
      return NextResponse.json(
        { error: 'El CV tiene que ser un PDF o un documento de Word.' },
        { status: 400 },
      )
    }

    const filename = safeFilename(cv.name, `cv-${Date.now()}${CV_EXTENSIONS[realMime]}`)
    attachments.push({ filename, content })
    cvFile = { filename, content, mimetype: realMime }
  }

  // Envío válido: recién acá se consume la cuota cara (mail + escritura en Odoo).
  if (!(await rateLimit(`empleos:submit:${who}`, SUBMIT_LIMIT, SUBMIT_WINDOW_MS))) {
    return tooManyRequests(SUBMIT_WINDOW_MS / 1000)
  }

  // ── Reclutamiento de Odoo: la postulación entra en la columna "Nuevo" del kanban ──
  let odooApplicantId: number | null = null
  let odooError: string | null = null

  if (getOdooConfig()) {
    try {
      const result = await createApplicant({ nombre, dni, telefono, localidad, email, areaLabel, cv: cvFile })
      odooApplicantId = result.applicantId
    } catch (error) {
      odooError = error instanceof Error ? error.message : 'Error desconocido.'
      console.error('[empleos] No se pudo crear la postulación en Odoo:', error)
    }
  } else {
    odooError = 'Integración con Odoo no configurada.'
  }

  // El mail se mantiene como respaldo para que ninguna postulación se pierda.
  const odooStatus = odooApplicantId
    ? `Cargada en Odoo (postulación #${odooApplicantId}).`
    : `NO se cargó en Odoo: ${odooError}`

  let emailSent = false
  const mail = getMailAddresses('contact')
  if (mail) {
    try {
      const { error } = await getResend().emails.send({
        from: mail.from,
        to: mail.to,
        replyTo: email,
        subject: `Nueva postulación laboral: ${nombre}`,
        text: `Nombre: ${nombre}\nDNI: ${dni}\nTeléfono: ${telefono}\nLocalidad: ${localidad}\nEmail: ${email}\nÁrea: ${areaLabel}\n\n${odooStatus}`,
        attachments,
      })
      emailSent = !error
      if (error) console.error('[empleos] No se pudo enviar el mail de respaldo:', error)
    } catch (error) {
      console.error('[empleos] No se pudo enviar el mail de respaldo:', error)
    }
  }

  if (!odooApplicantId && !emailSent) {
    return NextResponse.json({ error: 'No se pudo enviar la postulación.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, odooApplicantId })
}

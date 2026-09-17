import { NextResponse } from 'next/server'
import { getResend, CONTACT_EMAIL } from '@/lib/email'
import { getOdooConfig } from '@/lib/odoo'
import { createApplicant } from '@/lib/odoo-recruitment'

const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_CV_SIZE = 5 * 1024 * 1024

const AREA_LABELS: Record<string, string> = {
  produccion: 'Producción',
  administracion: 'Administración',
  ventas: 'Ventas / Comercial',
  marketing: 'Marketing',
  logistica: 'Logística',
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const nombre = formData.get('nombre')
  const dni = formData.get('dni')
  const telefono = formData.get('telefono')
  const localidad = formData.get('localidad')
  const email = formData.get('email')
  const area = formData.get('area')
  const cv = formData.get('cv')

  if (
    typeof nombre !== 'string' || !nombre ||
    typeof dni !== 'string' || !dni ||
    typeof telefono !== 'string' || !telefono ||
    typeof localidad !== 'string' || !localidad ||
    typeof email !== 'string' || !email ||
    typeof area !== 'string' || !area
  ) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }

  const areaLabel = AREA_LABELS[area] ?? area

  const attachments: { filename: string; content: Buffer }[] = []
  let cvFile: { filename: string; content: Buffer; mimetype: string } | null = null
  if (cv instanceof File && cv.size > 0) {
    if (!ALLOWED_CV_TYPES.includes(cv.type)) {
      return NextResponse.json({ error: 'Formato de CV no válido.' }, { status: 400 })
    }
    if (cv.size > MAX_CV_SIZE) {
      return NextResponse.json({ error: 'El CV supera los 5MB permitidos.' }, { status: 400 })
    }
    const content = Buffer.from(await cv.arrayBuffer())
    attachments.push({ filename: cv.name, content })
    cvFile = { filename: cv.name, content, mimetype: cv.type }
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
  try {
    const { error } = await getResend().emails.send({
      from: 'Entrenuts Web <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
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

  if (!odooApplicantId && !emailSent) {
    return NextResponse.json({ error: 'No se pudo enviar la postulación.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, odooApplicantId })
}

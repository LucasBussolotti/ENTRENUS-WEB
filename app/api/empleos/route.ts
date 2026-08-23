import { NextResponse } from 'next/server'
import { getResend, CONTACT_EMAIL } from '@/lib/email'

const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_CV_SIZE = 5 * 1024 * 1024

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

  const attachments: { filename: string; content: Buffer }[] = []
  if (cv instanceof File && cv.size > 0) {
    if (!ALLOWED_CV_TYPES.includes(cv.type)) {
      return NextResponse.json({ error: 'Formato de CV no válido.' }, { status: 400 })
    }
    if (cv.size > MAX_CV_SIZE) {
      return NextResponse.json({ error: 'El CV supera los 5MB permitidos.' }, { status: 400 })
    }
    attachments.push({
      filename: cv.name,
      content: Buffer.from(await cv.arrayBuffer()),
    })
  }

  const { error } = await getResend().emails.send({
    from: 'Entrenuts Web <onboarding@resend.dev>',
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Nueva postulación laboral: ${nombre}`,
    text: `Nombre: ${nombre}\nDNI: ${dni}\nTeléfono: ${telefono}\nLocalidad: ${localidad}\nEmail: ${email}\nÁrea: ${area}`,
    attachments,
  })

  if (error) {
    return NextResponse.json({ error: 'No se pudo enviar la postulación.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

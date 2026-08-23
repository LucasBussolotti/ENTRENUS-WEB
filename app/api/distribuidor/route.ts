import { NextResponse } from 'next/server'
import { getResend, CONTACT_EMAIL } from '@/lib/email'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const nombre = body?.nombre
  const ubicacion = body?.ubicacion
  const zona = body?.zona
  const telefono = body?.telefono
  const email = body?.email

  if (
    typeof nombre !== 'string' || !nombre ||
    typeof ubicacion !== 'string' || !ubicacion ||
    typeof zona !== 'string' || !zona ||
    typeof telefono !== 'string' || !telefono ||
    typeof email !== 'string' || !email
  ) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }

  const { error } = await getResend().emails.send({
    from: 'Entrenuts Web <onboarding@resend.dev>',
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Nuevo interesado en ser distribuidor: ${nombre}`,
    text: `Nombre: ${nombre}\nUbicación: ${ubicacion}\nZona de cobertura: ${zona}\nTeléfono: ${telefono}\nEmail: ${email}`,
  })

  if (error) {
    return NextResponse.json({ error: 'No se pudo enviar el formulario.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

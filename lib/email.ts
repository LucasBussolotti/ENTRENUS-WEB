import { Resend } from 'resend'

let client: Resend | null = null

export function getResend() {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY)
  }
  return client
}

/**
 * Destino de los formularios. Antes era la constante 'tucorreo@entrenuts.com.ar',
 * un marcador de posición: todo lo que mandaba el sitio se iba a una casilla que
 * no existe, y como Resend acepta el request igual, el endpoint respondía ok.
 */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim() || 'contacto@entrenuts.com.ar'

/**
 * Remitente. 'onboarding@resend.dev' es el dominio de prueba de Resend y sólo
 * sirve para pruebas contra la casilla del titular de la cuenta; para entregar a
 * terceros hace falta un dominio propio verificado en Resend.
 */
export const MAIL_FROM = process.env.MAIL_FROM?.trim() || 'Entrenuts Web <onboarding@resend.dev>'

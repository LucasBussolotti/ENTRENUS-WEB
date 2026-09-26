import { Resend } from 'resend'

let client: Resend | null = null

export function getResend() {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY)
  }
  return client
}

const RECIPIENT_VARS = {
  // Postulaciones laborales
  contact: 'CONTACT_EMAIL',
  // Leads de "Quiero ser distribuidor": los atiende el área comercial
  distributor: 'DISTRIBUTOR_EMAIL',
} as const

/**
 * Remitente y destino salen sólo del entorno (.env.local o el hosting), sin
 * valores de respaldo a propósito: un default silencioso ya hizo que los
 * formularios respondieran ok mientras los mails iban a una casilla inexistente.
 */
export function getMailAddresses(recipient: keyof typeof RECIPIENT_VARS): { from: string; to: string } | null {
  const from = process.env.MAIL_FROM?.trim()
  const to = process.env[RECIPIENT_VARS[recipient]]?.trim()

  if (!from || !to) {
    console.error(`[email] Falta configurar MAIL_FROM o ${RECIPIENT_VARS[recipient]} en el entorno.`)
    return null
  }
  return { from, to }
}

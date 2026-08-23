import { Resend } from 'resend'

let client: Resend | null = null

export function getResend() {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY)
  }
  return client
}

export const CONTACT_EMAIL = 'tucorreo@entrenuts.com.ar'

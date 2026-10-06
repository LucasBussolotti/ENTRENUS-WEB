/** Eventos NDJSON que /api/nutibot envía al panel, uno por línea. */
export type NutibotEvent = { type: 'text'; text: string } | { type: 'reset' } | { type: 'refusal' } | { type: 'error' }

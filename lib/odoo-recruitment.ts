import { executeKw, getOdooConfig, OdooError } from '@/lib/odoo'

export type ApplicantCv = {
  filename: string
  content: Buffer
  mimetype: string
}

export type ApplicantInput = {
  nombre: string
  dni: string
  telefono: string
  localidad: string
  email: string
  areaLabel: string
  cv?: ApplicantCv | null
}

export type ApplicantResult = {
  applicantId: number
  attachmentId: number | null
}

const DEFAULT_JOB_NAME = 'Trabaja con Nosotros'

type FieldDefinition = { type?: string }

type ResolvedJob = { id: number; departmentId: number | null; companyId: number | null }

// Los caches de esquema tampoco vencían: si renombrás el puesto o actualizás la
// versión de Odoo, el proceso seguía usando lo resuelto la primera vez.
const SCHEMA_TTL_MS = 60 * 60 * 1000

let cachedJob: ResolvedJob | null = null
let cachedJobAt = 0
let cachedFields: Record<string, FieldDefinition> | null = null
let cachedFieldsAt = 0

function isFresh(timestamp: number): boolean {
  return Date.now() - timestamp < SCHEMA_TTL_MS
}

function jobName(): string {
  return process.env.ODOO_JOB_NAME?.trim() || DEFAULT_JOB_NAME
}

function asRecordArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? (value.filter((item) => item && typeof item === 'object') as Record<string, unknown>[]) : []
}

/** Los many2one llegan como [id, display_name] o como false si están vacíos. */
function many2oneId(value: unknown): number | null {
  if (Array.isArray(value) && typeof value[0] === 'number') return value[0]
  return null
}

async function resolveJob(): Promise<ResolvedJob> {
  if (cachedJob && isFresh(cachedJobAt)) return cachedJob

  const forcedId = Number(process.env.ODOO_JOB_ID?.trim())
  const domain = Number.isInteger(forcedId) && forcedId > 0
    ? [['id', '=', forcedId]]
    : [['name', 'ilike', jobName()]]

  const found = await executeKw(
    'hr.job',
    'search_read',
    [domain, ['id', 'name', 'department_id', 'company_id']],
    { limit: 1 },
  )
  const job = asRecordArray(found)[0]

  if (!job || typeof job.id !== 'number') {
    throw new OdooError(
      `No se encontró el puesto de trabajo "${jobName()}" en Odoo. Crealo en Reclutamiento o definí ODOO_JOB_ID.`,
    )
  }

  cachedJobAt = Date.now()
  cachedJob = {
    id: job.id,
    departmentId: many2oneId(job.department_id),
    companyId: many2oneId(job.company_id),
  }
  return cachedJob
}

async function getApplicantFields(): Promise<Record<string, FieldDefinition>> {
  if (cachedFields && isFresh(cachedFieldsAt)) return cachedFields

  // Los nombres cambian entre versiones: Odoo 18 usa applicant_notes y ya no tiene
  // el campo name; hasta la 17 eran description y name. Se piden todos y se usa el que exista.
  const candidates = [
    'name',
    'partner_name',
    'email_from',
    'partner_phone',
    'partner_mobile',
    'applicant_notes',
    'description',
    'job_id',
    'department_id',
    'candidate_id',
    'company_id',
  ]
  const result = await executeKw('hr.applicant', 'fields_get', [candidates, ['type']])

  cachedFieldsAt = Date.now()
  cachedFields = result && typeof result === 'object' ? (result as Record<string, FieldDefinition>) : {}
  return cachedFields
}

function buildNotes(input: ApplicantInput, isHtml: boolean): string {
  const lines = [
    `DNI: ${input.dni}`,
    `Teléfono: ${input.telefono}`,
    `Localidad: ${input.localidad}`,
    `Área de interés: ${input.areaLabel}`,
    `Email: ${input.email}`,
    'Origen: formulario de empleos del sitio web.',
  ]

  if (!isHtml) return lines.join('\n')
  return lines
    .map((line) => `<p>${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
    .join('')
}

/**
 * Desde Odoo 18 la persona vive en hr.candidate y hr.applicant.candidate_id es obligatorio.
 * Se reutiliza el candidato si ya existe uno con ese email, para no duplicar fichas.
 *
 * La compañía importa: Odoo no deja crear una postulación en una compañía distinta a la
 * del candidato, y el puesto puede no estar en la compañía por defecto del usuario del API.
 */
async function resolveCandidateId(input: ApplicantInput, companyId: number | null): Promise<number> {
  const domain: (string | (string | number | boolean)[])[] = [['email_from', '=ilike', input.email]]
  if (companyId) domain.push('|', ['company_id', '=', false], ['company_id', '=', companyId])

  const existing = await executeKw('hr.candidate', 'search_read', [domain, ['id']], { limit: 1 })
  const found = asRecordArray(existing)[0]
  if (found && typeof found.id === 'number') return found.id

  const values: Record<string, string | number> = {
    partner_name: input.nombre,
    email_from: input.email,
    partner_phone: input.telefono,
  }
  if (companyId) values.company_id = companyId

  const created = await executeKw('hr.candidate', 'create', [values])
  if (typeof created !== 'number') throw new OdooError('Odoo no devolvió el ID del candidato creado.')
  return created
}

/**
 * Crea una postulación (hr.applicant) en el puesto "Trabaja con Nosotros".
 *
 * No se envía stage_id a propósito: Odoo asigna la primera etapa del puesto,
 * que es la columna "Nuevo" del kanban de Reclutamiento.
 */
export async function createApplicant(input: ApplicantInput): Promise<ApplicantResult> {
  if (!getOdooConfig()) throw new OdooError('Faltan las variables de entorno de Odoo.')

  const [job, fields] = await Promise.all([resolveJob(), getApplicantFields()])

  const values: Record<string, string | number> = { job_id: job.id }

  if (fields.company_id && job.companyId) values.company_id = job.companyId
  if (fields.candidate_id) values.candidate_id = await resolveCandidateId(input, job.companyId)
  if (fields.partner_name) values.partner_name = input.nombre
  if (fields.email_from) values.email_from = input.email
  if (fields.partner_phone) values.partner_phone = input.telefono
  else if (fields.partner_mobile) values.partner_mobile = input.telefono
  if (fields.name) values.name = `${input.nombre} - ${input.areaLabel}`

  const notesField = fields.applicant_notes ? 'applicant_notes' : fields.description ? 'description' : null
  if (notesField) values[notesField] = buildNotes(input, fields[notesField].type === 'html')
  if (fields.department_id && job.departmentId) values.department_id = job.departmentId

  const created = await executeKw('hr.applicant', 'create', [values])
  const applicantId = typeof created === 'number' ? created : Array.isArray(created) ? Number(created[0]) : NaN

  if (!Number.isInteger(applicantId)) {
    throw new OdooError('Odoo no devolvió el ID de la postulación creada.')
  }

  let attachmentId: number | null = null
  if (input.cv) {
    const attachment = await executeKw('ir.attachment', 'create', [
      {
        name: input.cv.filename,
        datas: input.cv.content.toString('base64'),
        mimetype: input.cv.mimetype,
        res_model: 'hr.applicant',
        res_id: applicantId,
      },
    ])
    if (typeof attachment === 'number') attachmentId = attachment
  }

  return { applicantId, attachmentId }
}

/**
 * Diagnóstico de la conexión con Odoo (Reclutamiento): pnpm odoo:check
 *
 * Solo lee: verifica credenciales, puesto, compañía, etapas y campos.
 * La prueba de carga real se hace desde el formulario de /empleos, que usa
 * lib/odoo-recruitment.ts; este script no duplica esa lógica a propósito.
 */

import { executeKw, getOdooConfig, getServerVersion } from '../lib/odoo.ts'

const ok = (msg) => console.log(`  OK   ${msg}`)
const fail = (msg) => console.log(`  FALLA ${msg}`)

async function main() {
  const config = getOdooConfig()
  if (!config) {
    fail('Faltan variables en .env.local: ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY')
    process.exitCode = 1
    return
  }

  console.log(`\nOdoo: ${config.url}  ·  base: ${config.db}  ·  usuario: ${config.username}\n`)

  console.log(`0. Servidor (${config.url}/xmlrpc/2/common)`)
  const version = await getServerVersion()
  ok(`Odoo ${version.server_version ?? '(versión desconocida)'} responde XML-RPC`)

  console.log('\n1. Credenciales')
  const users = await executeKw('res.users', 'search_read', [[['login', '=', config.username]], ['name']], { limit: 1 })
  ok(`autenticado como "${users[0]?.name ?? config.username}"`)

  console.log('\n2. Puesto de trabajo')
  const jobName = process.env.ODOO_JOB_NAME?.trim() || 'Trabaja con Nosotros'
  const forcedId = Number(process.env.ODOO_JOB_ID?.trim())
  const domain = Number.isInteger(forcedId) && forcedId > 0 ? [['id', '=', forcedId]] : [['name', 'ilike', jobName]]
  const jobs = await executeKw('hr.job', 'search_read', [domain, ['id', 'name', 'department_id', 'company_id']], { limit: 5 })

  if (jobs.length === 0) {
    fail(`no existe un puesto que coincida con "${jobName}". Crealo en Reclutamiento o definí ODOO_JOB_ID.`)
    process.exitCode = 1
    return
  }
  const job = jobs[0]
  ok(`#${job.id} "${job.name}"`)
  ok(`compañía: ${job.company_id ? job.company_id[1] : 'sin asignar'} · departamento: ${job.department_id ? job.department_id[1] : 'sin asignar'}`)
  if (jobs.length > 1) {
    fail(`hay ${jobs.length} puestos que coinciden; se usaría el primero. Definí ODOO_JOB_ID para evitar ambigüedad.`)
  }

  console.log('\n3. Etapas del kanban (la primera es donde caen las postulaciones)')
  const stages = await executeKw(
    'hr.recruitment.stage',
    'search_read',
    [['|', ['job_ids', '=', false], ['job_ids', 'in', [job.id]]], ['id', 'name', 'sequence']],
    { order: 'sequence, id' },
  )
  stages.forEach((stage, index) => {
    console.log(`  ${index === 0 ? '->' : '  '} ${stage.name} (seq ${stage.sequence})`)
  })
  if (stages[0] && !/nuevo|new/i.test(stages[0].name)) {
    fail(`la primera etapa es "${stages[0].name}", no "Nuevo". Reordená las etapas en Odoo si hace falta.`)
  }

  console.log('\n4. Campos de hr.applicant que usa el formulario')
  const fields = await executeKw(
    'hr.applicant',
    'fields_get',
    [['name', 'partner_name', 'email_from', 'partner_phone', 'partner_mobile', 'applicant_notes', 'description', 'candidate_id', 'department_id'], ['type']],
  )
  for (const field of ['partner_name', 'email_from', 'partner_phone']) {
    if (fields[field]) ok(`${field} (${fields[field].type})`)
    else fail(`${field} no existe en esta versión de Odoo`)
  }
  const notesField = fields.applicant_notes ? 'applicant_notes' : fields.description ? 'description' : null
  if (notesField) ok(`${notesField} (${fields[notesField].type}) -> ahí van DNI, localidad y área`)
  else fail('no hay campo de notas (applicant_notes ni description): DNI, localidad y área no se guardarían')
  if (fields.candidate_id) ok('candidate_id -> se crea/reutiliza la ficha en hr.candidate (Odoo 18+)')

  console.log('\nTodo listo. Probá la carga real desde el formulario: pnpm dev -> /es/empleos\n')
}

main().catch((error) => {
  console.error(`\n  FALLA ${error.message}\n`)
  process.exitCode = 1
})

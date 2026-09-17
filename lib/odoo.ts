/**
 * Cliente mínimo del API externo de Odoo (XML-RPC).
 *
 * Se usa XML-RPC y no JSON-RPC porque es el endpoint documentado y estable en
 * todas las versiones de Odoo (incluido Odoo Online) y no necesita dependencias.
 */

type XmlRpcValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Buffer
  | XmlRpcValue[]
  | { [key: string]: XmlRpcValue }

type OdooConfig = {
  url: string
  db: string
  username: string
  apiKey: string
}

const REQUEST_TIMEOUT_MS = 20_000

export function getOdooConfig(): OdooConfig | null {
  const url = process.env.ODOO_URL?.trim().replace(/\/+$/, '')
  const db = process.env.ODOO_DB?.trim()
  const username = process.env.ODOO_USERNAME?.trim()
  const apiKey = process.env.ODOO_API_KEY?.trim()

  if (!url || !db || !username || !apiKey) return null
  return { url, db, username, apiKey }
}

export class OdooError extends Error {}

// ── Serialización XML-RPC ──

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function encodeValue(value: XmlRpcValue): string {
  if (value === null || value === undefined) return '<value><boolean>0</boolean></value>'
  if (typeof value === 'string') return `<value><string>${escapeXml(value)}</string></value>`
  if (typeof value === 'boolean') return `<value><boolean>${value ? 1 : 0}</boolean></value>`
  if (typeof value === 'number') {
    return Number.isInteger(value)
      ? `<value><int>${value}</int></value>`
      : `<value><double>${value}</double></value>`
  }
  if (Buffer.isBuffer(value)) return `<value><base64>${value.toString('base64')}</base64></value>`
  if (Array.isArray(value)) {
    return `<value><array><data>${value.map(encodeValue).join('')}</data></array></value>`
  }
  const members = Object.entries(value)
    .map(([key, member]) => `<member><name>${escapeXml(key)}</name>${encodeValue(member)}</member>`)
    .join('')
  return `<value><struct>${members}</struct></value>`
}

function buildRequest(method: string, params: XmlRpcValue[]): string {
  const body = params.map((param) => `<param>${encodeValue(param)}</param>`).join('')
  return `<?xml version="1.0"?><methodCall><methodName>${method}</methodName><params>${body}</params></methodCall>`
}

// ── Parseo de la respuesta ──

type XmlNode = { tag: string; text: string; children: XmlNode[] }

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }

function decodeEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-z]+);/g, (match, entity: string) => {
    if (entity.startsWith('#')) {
      const code = entity[1] === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
      return Number.isNaN(code) ? match : String.fromCodePoint(code)
    }
    return ENTITIES[entity] ?? match
  })
}

function parseXml(xml: string): XmlNode {
  const root: XmlNode = { tag: '#root', text: '', children: [] }
  const stack: XmlNode[] = [root]
  const tagPattern = /<(\/?)([A-Za-z0-9_:.-]+)([^>]*?)(\/?)>/g
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = tagPattern.exec(xml)) !== null) {
    const [, closing, tag, , selfClosing] = match
    const current = stack[stack.length - 1]
    current.text += decodeEntities(xml.slice(cursor, match.index))
    cursor = tagPattern.lastIndex

    if (closing) {
      if (stack.length > 1) stack.pop()
    } else if (selfClosing) {
      current.children.push({ tag, text: '', children: [] })
    } else {
      const node: XmlNode = { tag, text: '', children: [] }
      current.children.push(node)
      stack.push(node)
    }
  }

  return root
}

function findChild(node: XmlNode, tag: string): XmlNode | undefined {
  return node.children.find((child) => child.tag === tag)
}

function decodeValueNode(node: XmlNode): unknown {
  const typed = node.children[0]
  if (!typed) return node.text

  switch (typed.tag) {
    case 'string':
      return typed.text
    case 'int':
    case 'i4':
    case 'i8':
      return parseInt(typed.text, 10)
    case 'double':
      return parseFloat(typed.text)
    case 'boolean':
      return typed.text.trim() === '1'
    case 'base64':
      return typed.text.trim()
    case 'nil':
      return null
    case 'array': {
      const data = findChild(typed, 'data')
      if (!data) return []
      return data.children.filter((child) => child.tag === 'value').map(decodeValueNode)
    }
    case 'struct': {
      const result: Record<string, unknown> = {}
      for (const member of typed.children) {
        if (member.tag !== 'member') continue
        const name = findChild(member, 'name')
        const value = findChild(member, 'value')
        if (name && value) result[name.text] = decodeValueNode(value)
      }
      return result
    }
    default:
      return typed.text
  }
}

function parseResponse(xml: string): unknown {
  const response = findChild(parseXml(xml), 'methodResponse')
  if (!response) throw new OdooError('Respuesta XML-RPC inesperada de Odoo.')

  const fault = findChild(response, 'fault')
  if (fault) {
    const value = findChild(fault, 'value')
    const detail = value ? decodeValueNode(value) : null
    const faultString =
      detail && typeof detail === 'object' && 'faultString' in detail
        ? String((detail as Record<string, unknown>).faultString)
        : 'Error desconocido de Odoo.'
    // faultString es un traceback de Python: se conserva desde la excepción hasta el final.
    const lines = faultString.trim().split('\n').map((line) => line.trim()).filter(Boolean)
    const start = lines.findLastIndex((line) => /^[\w.]+(Error|Exception|Warning):/.test(line))
    const message = (start >= 0 ? lines.slice(start) : lines.slice(-1)).join(' ')
    throw new OdooError(message.slice(0, 400) || faultString)
  }

  const param = findChild(response, 'params')?.children.find((child) => child.tag === 'param')
  const value = param ? findChild(param, 'value') : undefined
  return value ? decodeValueNode(value) : null
}

async function call(
  endpoint: 'common' | 'object',
  method: string,
  params: XmlRpcValue[],
): Promise<unknown> {
  const config = getOdooConfig()
  if (!config) throw new OdooError('Faltan las variables de entorno de Odoo.')

  let response: Response
  try {
    response = await fetch(`${config.url}/xmlrpc/2/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml; charset=utf-8' },
      body: buildRequest(method, params),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch (cause) {
    throw new OdooError(`No se pudo conectar con Odoo (${config.url}).`, { cause })
  }

  if (!response.ok) {
    // El cuerpo suele ser HTML de nginx/Odoo: se limpia para que el motivo sea legible.
    const detail = (await response.text())
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 300)
    const hint = /\/(odoo|web)$/.test(config.url)
      ? ' Revisá ODOO_URL: tiene que ser la raíz del servidor, sin /odoo ni /web al final.'
      : ''
    throw new OdooError(
      `Odoo respondió ${response.status} en ${config.url}/xmlrpc/2/${endpoint}.${hint}${detail ? ` Detalle: ${detail}` : ''}`,
    )
  }

  return parseResponse(await response.text())
}

/** Ping sin credenciales: sirve para separar "no hablo con el servidor" de "credenciales mal". */
export async function getServerVersion(): Promise<Record<string, unknown>> {
  const result = await call('common', 'version', [])
  return result && typeof result === 'object' && !Array.isArray(result)
    ? (result as Record<string, unknown>)
    : {}
}

let cachedUid: number | null = null

async function authenticate(): Promise<number> {
  if (cachedUid !== null) return cachedUid

  const config = getOdooConfig()
  if (!config) throw new OdooError('Faltan las variables de entorno de Odoo.')

  const uid = await call('common', 'authenticate', [config.db, config.username, config.apiKey, {}])
  if (typeof uid !== 'number' || !uid) {
    throw new OdooError('Odoo rechazó las credenciales: revisá ODOO_DB, ODOO_USERNAME y ODOO_API_KEY.')
  }

  cachedUid = uid
  return uid
}

export async function executeKw(
  model: string,
  method: string,
  args: XmlRpcValue[],
  kwargs: Record<string, XmlRpcValue> = {},
): Promise<unknown> {
  const config = getOdooConfig()
  if (!config) throw new OdooError('Faltan las variables de entorno de Odoo.')
  const uid = await authenticate()
  return call('object', 'execute_kw', [config.db, uid, config.apiKey, model, method, args, kwargs])
}

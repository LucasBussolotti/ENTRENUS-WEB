import type { ReactNode } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

/*
 * Respuestas del modelo: párrafos, listas con "- ", **negrita** y enlaces
 * [texto](url). Se arma con nodos de React (nunca innerHTML) y sólo se enlazan
 * rutas internas del idioma actual y destinos conocidos; cualquier otra URL
 * queda como texto.
 */

const EXTERNAL_HOSTS = [
  'www.mercadolibre.com.ar',
  'articulo.mercadolibre.com.ar',
  'www.instagram.com',
  'www.tiktok.com',
  'www.facebook.com',
]

const INLINE = /\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*/g

const linkClass =
  'font-semibold text-[#B4500C] underline underline-offset-2 hover:text-[#2A2218] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E46A17]'

type LinkKind = 'internal' | 'external' | 'contact'

function classifyHref(href: string, locale: string): LinkKind | null {
  if (href === `/${locale}` || href.startsWith(`/${locale}/`) || href.startsWith(`/${locale}?`)) return 'internal'
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return 'contact'
  try {
    const url = new URL(href)
    return url.protocol === 'https:' && EXTERNAL_HOSTS.includes(url.hostname) ? 'external' : null
  } catch {
    return null
  }
}

interface InlineProps {
  text: string
  locale: string
  newTabLabel: string
  onNavigate: () => void
}

function renderInline({ text, locale, newTabLabel, onNavigate }: InlineProps): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0
    if (index > last) nodes.push(text.slice(last, index))
    const [whole, label, href, bold] = match

    if (bold) {
      nodes.push(<strong key={index}>{bold}</strong>)
    } else {
      const kind = classifyHref(href, locale)
      if (kind === 'internal') {
        nodes.push(
          <Link key={index} href={href} onClick={onNavigate} className={linkClass}>
            {label}
          </Link>,
        )
      } else if (kind === 'external') {
        nodes.push(
          <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {label}
            <ExternalLink size={12} aria-hidden="true" className="ml-0.5 inline align-baseline" />
            <span className="sr-only"> {newTabLabel}</span>
          </a>,
        )
      } else if (kind === 'contact') {
        nodes.push(
          <a key={index} href={href} className={linkClass}>
            {label}
          </a>,
        )
      } else {
        nodes.push(whole.startsWith('[') ? label : whole)
      }
    }
    last = index + whole.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

interface NutiBotMessageProps {
  text: string
  locale: string
  newTabLabel: string
  onNavigate: () => void
}

export function NutiBotMessage({ text, ...inline }: NutiBotMessageProps) {
  const blocks: ReactNode[] = []
  let list: string[] = []

  const flushList = () => {
    if (list.length === 0) return
    blocks.push(
      <ul key={`list-${blocks.length}`} className="m-0 list-disc space-y-1 pl-5">
        {list.map((item, i) => (
          <li key={i}>{renderInline({ text: item, ...inline })}</li>
        ))}
      </ul>,
    )
    list = []
  }

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    const item = /^[-*•]\s+(.*)$/.exec(line)
    if (item) {
      list.push(item[1])
      continue
    }
    flushList()
    if (line) blocks.push(<p key={`p-${blocks.length}`} className="m-0">{renderInline({ text: line, ...inline })}</p>)
  }
  flushList()

  return <div className="flex flex-col gap-2">{blocks}</div>
}

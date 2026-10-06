"use client"

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import {
  X,
  ChevronRight,
  RotateCcw,
  Info,
  ShoppingBag,
  Store,
  Mail,
  Phone,
  Handshake,
  Briefcase,
  LayoutGrid,
  ExternalLink,
  MessageCircleQuestionMark,
  SendHorizontal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CATALOG_TABS, type CatalogTabId } from '@/lib/data/catalog'
import { CONTACT, ML_STORE_URL } from '@/lib/data/contact'
import { BOT_PRODUCT_TOPICS, findFaq, topicFaqs, type BotTopic } from '@/lib/data/nutibot'
import type { NutibotEvent } from '@/lib/nutibot-events'
import { NutiBotMessage } from '@/components/NutiBotMessage'

type NodeRef =
  | { kind: 'home' | 'products' | 'buy' | 'contact' | 'distributors' | 'jobs' | 'chat' }
  | { kind: 'topic'; topic: BotTopic }
  | { kind: 'faq'; topic: BotTopic; faqId: string }

interface BotLink {
  href: string
  label: string
  type: 'internal' | 'external' | 'contact'
  icon?: LucideIcon
}

interface BotOption {
  id: string
  label: string
  to: NodeRef
  icon: LucideIcon
}

interface BotNode {
  message: string
  links: BotLink[]
  options: BotOption[]
}

interface Turn {
  from: 'user' | 'bot'
  text: string
  /** Respuesta escrita por el modelo (no un texto fijo del árbol de opciones) */
  ai?: boolean
}

// Coinciden con los topes de /api/nutibot
const MAX_HISTORY = 16
const MAX_QUESTION_CHARS = 500

interface NutiBotPanelProps {
  id: string
  open: boolean
  onClose: () => void
}

const WAVE_PATH =
  'M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 ' +
  'C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 ' +
  'C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,120 L0,120 Z'

const HOME: NodeRef = { kind: 'home' }

const linkClass =
  'inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#2A2218] px-4 py-2 text-[0.85rem] font-semibold text-white no-underline hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E46A17]'

export default function NutiBotPanel({ id, open, onClose }: NutiBotPanelProps) {
  const t = useTranslations('bot')
  const tCategories = useTranslations('productsPage.categories')
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : 'es'

  const [current, setCurrent] = useState<NodeRef>(HOME)
  const [turns, setTurns] = useState<Turn[]>(() => [{ from: 'bot', text: t('welcomeMessage') }])
  const [entered, setEntered] = useState(false)
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const inputId = useId()
  const requestRef = useRef<AbortController | null>(null)

  const logRef = useRef<HTMLDivElement>(null)
  const lastBotRef = useRef<HTMLParagraphElement>(null)
  const lastUserRef = useRef<HTMLDivElement>(null)

  const categoryLabel = (topic: CatalogTabId) => {
    const tab = CATALOG_TABS.find((item) => item.id === topic)
    return tab ? tCategories(tab.labelKey) : topic
  }

  const option = (optionId: string, label: string, to: NodeRef, icon: LucideIcon): BotOption => ({
    id: optionId,
    label,
    to,
    icon,
  })

  const backHome = option('home', t('optionBack'), HOME, RotateCcw)
  const storeLink: BotLink = { href: ML_STORE_URL, label: t('linkStore'), type: 'external' }

  const topicLinks = (topic: BotTopic): BotLink[] => {
    if (topic === 'company') return [{ href: `/${locale}/acerca_de`, label: t('linkAbout'), type: 'internal' }]
    const tab = CATALOG_TABS.find((item) => item.id === topic)
    const categoryLink: BotLink[] = tab
      ? [{ href: `/${locale}/productos/${tab.slug}`, label: t('linkCategory', { category: categoryLabel(topic) }), type: 'internal' }]
      : []
    return [...categoryLink, storeLink]
  }

  const topicOptions = (topic: BotTopic, answeredId?: string): BotOption[] => {
    const questions = topicFaqs(topic)
      .filter((faq) => faq.id !== answeredId)
      .map((faq) =>
        option(`faq-${faq.id}`, faq[lang].question, { kind: 'faq', topic, faqId: faq.id }, MessageCircleQuestionMark),
      )
    const otherProducts =
      topic === 'company' ? [] : [option('products', t('optionOtherProducts'), { kind: 'products' }, LayoutGrid)]
    return [...questions, ...otherProducts, backHome]
  }

  const buildNode = (ref: NodeRef): BotNode => {
    switch (ref.kind) {
      case 'home':
        return {
          message: t('welcomeMessage'),
          links: [],
          options: [
            option('products', t('optionProducts'), { kind: 'products' }, ShoppingBag),
            option('buy', t('optionBuy'), { kind: 'buy' }, Store),
            option('company', t('optionCompany'), { kind: 'topic', topic: 'company' }, Info),
            option('contact', t('optionContact'), { kind: 'contact' }, Mail),
            option('distributors', t('optionDistributors'), { kind: 'distributors' }, Handshake),
            option('jobs', t('optionJobs'), { kind: 'jobs' }, Briefcase),
          ],
        }
      case 'products':
        return {
          message: t('productsMessage'),
          links: [],
          options: [
            ...BOT_PRODUCT_TOPICS.map((topic) =>
              option(`topic-${topic}`, categoryLabel(topic), { kind: 'topic', topic }, ShoppingBag),
            ),
            backHome,
          ],
        }
      case 'topic': {
        if (ref.topic === 'company') {
          return { message: t('companyMessage'), links: topicLinks('company'), options: topicOptions('company') }
        }
        const category = categoryLabel(ref.topic)
        const hasQuestions = topicFaqs(ref.topic).length > 0
        return {
          message: t(hasQuestions ? 'categoryMessage' : 'categoryEmptyMessage', { category }),
          links: topicLinks(ref.topic),
          options: topicOptions(ref.topic),
        }
      }
      case 'faq': {
        const faq = findFaq(ref.faqId)
        return {
          message: faq ? faq[lang].answer : t('welcomeMessage'),
          links: topicLinks(ref.topic),
          options: topicOptions(ref.topic, ref.faqId),
        }
      }
      case 'buy':
        return {
          message: t('buyMessage'),
          links: [storeLink],
          options: [option('products', t('optionProducts'), { kind: 'products' }, ShoppingBag), backHome],
        }
      case 'contact':
        return {
          message: t('contactMessage'),
          links: [
            { href: `mailto:${CONTACT.email}`, label: CONTACT.email, type: 'contact', icon: Mail },
            { href: CONTACT.phone.href, label: CONTACT.phone.display, type: 'contact', icon: Phone },
          ],
          options: [backHome],
        }
      case 'distributors':
        return {
          message: t('distributorsMessage'),
          links: [{ href: `/${locale}/distribuidor`, label: t('linkDistributors'), type: 'internal' }],
          options: [backHome],
        }
      case 'jobs':
        return {
          message: t('jobsMessage'),
          links: [{ href: `/${locale}/empleos`, label: t('linkJobs'), type: 'internal' }],
          options: [backHome],
        }
      case 'chat':
        return {
          message: '',
          links: [],
          options: [option('contact', t('optionContact'), { kind: 'contact' }, Mail), backHome],
        }
    }
  }

  const node = buildNode(current)

  const choose = (selected: BotOption) => {
    const next = buildNode(selected.to)
    setTurns((prev) => [...prev, { from: 'user', text: selected.label }, { from: 'bot', text: next.message }])
    setCurrent(selected.to)
  }

  const reset = () => {
    requestRef.current?.abort()
    setPending(false)
    setInput('')
    setTurns([{ from: 'bot', text: t('welcomeMessage') }])
    setCurrent(HOME)
  }

  const ask = async (question: string) => {
    if (pending || !question) return

    // La API exige que la conversación empiece con el visitante: el saludo
    // inicial y cualquier texto previo del bot quedan afuera.
    const history = [...turns, { from: 'user' as const, text: question }]
      .filter((turn) => turn.text)
      .map((turn) => ({ role: turn.from === 'user' ? ('user' as const) : ('assistant' as const), content: turn.text }))
      .slice(-MAX_HISTORY)
    while (history[0]?.role === 'assistant') history.shift()

    const controller = new AbortController()
    requestRef.current = controller
    let answer = ''
    const show = (text: string) => {
      if (controller.signal.aborted) return
      answer = text
      setTurns((prev) => [...prev.slice(0, -1), { from: 'bot', text, ai: true }])
    }

    setTurns((prev) => [...prev, { from: 'user', text: question }, { from: 'bot', text: '', ai: true }])
    setCurrent({ kind: 'chat' })
    setInput('')
    setAnnouncement('')
    setPending(true)

    try {
      const response = await fetch('/api/nutibot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, messages: history }),
        signal: controller.signal,
      })
      if (!response.ok || !response.body) {
        show(t(response.status === 429 ? 'chatRateLimited' : 'chatError'))
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line) continue
          const event = JSON.parse(line) as NutibotEvent
          if (event.type === 'text') show(answer + event.text)
          else if (event.type === 'reset') show('')
          else if (event.type === 'refusal') show(t('chatRefusal'))
          else show(t('chatError'))
        }
      }
      if (!answer) show(t('chatError'))
    } catch {
      if (!controller.signal.aborted) show(t('chatError'))
    } finally {
      if (!controller.signal.aborted) {
        setPending(false)
        setAnnouncement(answer)
      }
    }
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void ask(input.trim())
  }

  useEffect(() => () => requestRef.current?.abort(), [])

  // Dos frames para que el navegador pinte el estado cerrado y la entrada anime
  useEffect(() => {
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  // Cada respuesta nueva queda arriba del área visible (así se lee desde el
  // principio aunque sea larga) y recibe el foco para que el lector de
  // pantalla la anuncie y el Tab siga por las opciones. Las respuestas escritas
  // no le sacan el foco al campo de texto: se anuncian por la región aria-live
  // cuando terminan de llegar.
  const turnCount = turns.length
  const lastTurnIsAi = turns.at(-1)?.ai === true
  useEffect(() => {
    if (!open) return
    const log = logRef.current
    const anchor = lastUserRef.current ?? lastBotRef.current
    if (log && anchor) log.scrollTo({ top: Math.max(anchor.offsetTop - 16, 0) })
    if (!lastTurnIsAi) lastBotRef.current?.focus({ preventScroll: true })
  }, [turnCount, lastTurnIsAi, open])

  const lastBotIndex = turns.findLastIndex((turn) => turn.from === 'bot')
  const lastUserIndex = turns.findLastIndex((turn) => turn.from === 'user')
  const visible = open && entered

  return (
    /* El alto se recorta contra el viewport (svh, no vh, por la barra de Safari iOS).
       `inert` la saca del orden de tabulación y del árbol de accesibilidad al cerrarse. */
    <div
      id={id}
      role="dialog"
      aria-modal="false"
      aria-label={t('chatbotLabel')}
      inert={!open}
      className={`fixed right-4 bottom-22 z-9999 flex h-[min(600px,calc(100svh-7.5rem))] w-[min(380px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl bg-[#FAF7F2] sm:right-6 sm:w-[min(380px,calc(100vw-3rem))] motion-safe:transition-all motion-safe:duration-[400ms] motion-safe:ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
        visible
          ? 'scale-100 opacity-100 shadow-[0_20px_40px_rgba(0,0,0,0.15)]'
          : 'pointer-events-none translate-y-10 scale-90 opacity-0 shadow-none'
      }`}
    >
      {/* Cabecera */}
      <div className="relative flex shrink-0 flex-col gap-3 bg-[var(--color-naranja)] px-4 pt-4 pb-8">
        <div className="z-1 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-white/20">
              <Image src="/images/LogoNuti.webp" alt="" width={406} height={297} className="h-4/5 w-4/5 object-contain" />
            </span>
            <div className="min-w-0">
              <p className="m-0 text-[1.1rem] leading-tight font-extrabold tracking-[-0.5px] text-white">Nuti</p>
              <p className="m-0 mt-0.5 text-[0.8rem] font-medium text-white">{t('status')}</p>
            </div>
          </div>

          <div className="z-1 flex shrink-0 items-center">
            <button
              type="button"
              onClick={reset}
              aria-label={t('resetChat')}
              className="flex size-11 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <RotateCcw size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('closeChat')}
              aria-controls={id}
              className="flex size-11 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-[22px] overflow-hidden leading-none"
        >
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block size-full" xmlns="http://www.w3.org/2000/svg">
            <path d={WAVE_PATH} fill="#FAF7F2" />
          </svg>
        </div>
      </div>

      {/* Conversación. El scroll vive acá dentro y no se propaga a la página. */}
      <div ref={logRef} className="relative flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-5 sm:p-6">
        {turns.map((turn, index) =>
          turn.from === 'bot' ? (
            <div key={index} className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E46A17]">
                <Image src="/images/LogoNuti.webp" alt="" width={406} height={297} className="h-[70%] w-[70%] object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                {turn.ai ? (
                  <div
                    aria-busy={pending && index === turns.length - 1}
                    className="rounded-[20px] rounded-tl-sm bg-white p-4 text-[0.9rem] leading-relaxed text-[#333333] shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
                  >
                    <span className="sr-only">{t('botSaid')} </span>
                    {turn.text ? (
                      <NutiBotMessage text={turn.text} locale={locale} newTabLabel={t('newTab')} onNavigate={onClose} />
                    ) : (
                      <p className="m-0 flex items-center gap-2 text-[#6B6358]">
                        <span aria-hidden="true" className="flex gap-1">
                          {[0, 150, 300].map((delay) => (
                            <span
                              key={delay}
                              className="size-1.5 rounded-full bg-[#E46A17] motion-safe:animate-bounce"
                              style={{ animationDelay: `${delay}ms` }}
                            />
                          ))}
                        </span>
                        {t('chatTyping')}
                      </p>
                    )}
                  </div>
                ) : (
                <p
                  ref={index === lastBotIndex ? lastBotRef : undefined}
                  tabIndex={index === lastBotIndex ? -1 : undefined}
                  className="m-0 rounded-[20px] rounded-tl-sm bg-white p-4 text-[0.9rem] leading-relaxed text-[#333333] shadow-[0_2px_10px_rgba(0,0,0,0.03)] outline-none"
                >
                  <span className="sr-only">{t('botSaid')} </span>
                  {turn.text}
                </p>
                )}
                {index === lastBotIndex && !turn.ai && node.links.length > 0 && (
                  <ul className="m-0 mt-2.5 flex list-none flex-wrap gap-2 p-0">
                    {node.links.map((link) => {
                      const Icon = link.icon
                      return (
                        <li key={link.href}>
                          {link.type === 'internal' ? (
                            <Link href={link.href} onClick={onClose} className={linkClass}>
                              {link.label}
                              <ChevronRight size={16} aria-hidden="true" />
                            </Link>
                          ) : link.type === 'external' ? (
                            <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                              {link.label}
                              <ExternalLink size={14} aria-hidden="true" />
                              <span className="sr-only"> {t('newTab')}</span>
                            </a>
                          ) : (
                            <a href={link.href} className={linkClass}>
                              {Icon && <Icon size={15} aria-hidden="true" />}
                              {link.label}
                            </a>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div key={index} ref={index === lastUserIndex ? lastUserRef : undefined} className="flex justify-end">
              <p className="m-0 max-w-[85%] rounded-[20px] rounded-tr-sm border border-[#F1DABF] bg-[#FDF1E5] px-4 py-2.5 text-[0.9rem] leading-snug text-[#2A2218]">
                <span className="sr-only">{t('youSaid')} </span>
                {turn.text}
              </p>
            </div>
          ),
        )}

        <hr className="-mx-5 my-1 border-0 border-t border-black/5 sm:-mx-6" />

        <div role="group" aria-label={t('optionsLabel')} className="flex flex-col gap-3">
          {node.options.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => choose(item)}
                disabled={pending}
                className="flex min-h-11 items-center gap-4 rounded-full border border-[#F1DABF] bg-white px-4 py-2.5 text-left shadow-[0_2px_5px_rgba(0,0,0,0.02)] disabled:cursor-not-allowed disabled:opacity-60 hover:border-[#E46A17]/40 hover:shadow-[0_4px_12px_rgba(228,106,23,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E46A17] motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FDF1E5]">
                  <Icon size={16} color="#E46A17" aria-hidden="true" />
                </span>
                <span className="flex-1 text-[0.9rem] leading-snug font-medium text-[#111111]">{item.label}</span>
                <ChevronRight size={18} color="#E46A17" aria-hidden="true" className="shrink-0" />
              </button>
            )
          })}
        </div>
      </div>

      <form onSubmit={submit} className="shrink-0 border-t border-black/5 px-4 pt-3 pb-3 sm:px-5">
        <div className="flex items-center gap-2">
          <label htmlFor={inputId} className="sr-only">
            {t('chatInputLabel')}
          </label>
          <input
            id={inputId}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={MAX_QUESTION_CHARS}
            placeholder={t('chatPlaceholder')}
            autoComplete="off"
            enterKeyHint="send"
            className="min-h-11 min-w-0 flex-1 rounded-full border border-[#F1DABF] bg-white px-4 text-base text-[#2A2218] placeholder:text-[#7A7266] focus-visible:border-[#E46A17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E46A17] sm:text-[0.9rem]"
          />
          <button
            type="submit"
            disabled={pending || !input.trim()}
            aria-label={t('chatSend')}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#E46A17] text-white transition-colors hover:bg-[#C85A10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E46A17] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#E46A17]"
          >
            <SendHorizontal size={18} aria-hidden="true" />
          </button>
        </div>
        <p className="m-0 mt-2 text-center text-[0.72rem] leading-snug text-[#6B6358]">{t('chatDisclaimer')}</p>
      </form>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  )
}

"use client"

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

const PANEL_ID = 'nutibot-panel'

// El panel, con sus textos y preguntas frecuentes, se descarga recién cuando
// alguien va a abrir el chat: no suma peso a cada página ni aparece en el HTML
// que leen los buscadores. Pasar el mouse o el foco por el botón lo precarga.
const loadPanel = () => import('./NutiBotPanel')
const NutiBotPanel = dynamic(loadPanel, { ssr: false })

export function NutiBot() {
  const t = useTranslations('bot')
  const locale = useLocale()

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)

  const openBot = () => {
    setMounted(true)
    setOpen(true)
  }

  const closeBot = () => {
    setOpen(false)
    launcherRef.current?.focus()
  }

  return (
    <>
      {/* key: al cambiar de idioma la conversación empieza de nuevo en el idioma nuevo */}
      {mounted && <NutiBotPanel key={locale} id={PANEL_ID} open={open} onClose={closeBot} />}

      {/* Botón flotante */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openBot())}
        onPointerEnter={() => void loadPanel()}
        onFocus={() => void loadPanel()}
        aria-label={open ? t('closeChat') : t('openChat')}
        aria-expanded={open}
        aria-controls={mounted ? PANEL_ID : undefined}
        className={`fixed right-4 bottom-4 z-10000 flex size-15 items-center justify-center rounded-full sm:right-6 sm:bottom-6 sm:size-[70px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E46A17] motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          open
            ? 'rotate-90 scale-90 bg-[#111111] shadow-[0_4px_15px_rgba(0,0,0,0.3)]'
            : 'bg-[#E46A17] shadow-[0_4px_20px_rgba(228,106,23,0.45)]'
        }`}
      >
        {open ? (
          <X size={26} color="#ffffff" aria-hidden="true" className="-rotate-90" />
        ) : (
          <Image src="/images/LogoNuti.webp" alt="" width={406} height={297} className="size-[85%] object-contain" />
        )}
      </button>
    </>
  )
}

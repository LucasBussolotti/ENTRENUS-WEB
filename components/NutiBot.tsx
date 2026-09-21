"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ChevronRight, RotateCcw, Info, ShoppingBag, Truck, Undo2, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

type FlowStep = 'inicio' | 'empresa' | 'productos' | 'pastas' | 'envios' | 'miel' | 'devoluciones' | 'valoraciones';

interface Option {
  key: string;
  next: FlowStep;
  icon?: LucideIcon;
}

interface Step {
  messageKey: string;
  options: Option[];
}

const PANEL_ID = 'nutibot-panel'

const WAVE_PATH =
  'M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 ' +
  'C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 ' +
  'C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,120 L0,120 Z'

const nutiFlowData: Record<FlowStep, Step> = {
  inicio: {
    messageKey: 'welcomeMessage',
    options: [
      { key: 'optionCompany', next: 'empresa', icon: Info },
      { key: 'optionProducts', next: 'productos', icon: ShoppingBag },
      { key: 'optionShipping', next: 'envios', icon: Truck },
      { key: 'optionReturns', next: 'devoluciones', icon: Undo2 },
      { key: 'optionRatings', next: 'valoraciones', icon: Star }
    ]
  },
  empresa: {
    messageKey: 'companyMessage',
    options: [ { key: 'optionBack', next: 'inicio', icon: RotateCcw } ]
  },
  productos: {
    messageKey: 'productsMessage',
    options: [
      { key: 'optionPastas', next: 'pastas', icon: ShoppingBag },
      { key: 'optionHoneyGhee', next: 'miel', icon: ShoppingBag },
      { key: 'optionBack', next: 'inicio', icon: RotateCcw }
    ]
  },
  pastas: {
    messageKey: 'pastasMessage',
    options: [ { key: 'optionBack', next: 'inicio', icon: RotateCcw } ]
  },
  envios: {
    messageKey: 'shippingMessage',
    options: [ { key: 'optionBack', next: 'inicio', icon: RotateCcw } ]
  },
  miel: {
    messageKey: 'honeyGheeMessage',
    options: [ { key: 'optionBack', next: 'inicio', icon: RotateCcw } ]
  },
  devoluciones: {
    messageKey: 'returnsMessage',
    options: [ { key: 'optionBack', next: 'inicio', icon: RotateCcw } ]
  },
  valoraciones: {
    messageKey: 'ratingsMessage',
    options: [ { key: 'optionBack', next: 'inicio', icon: RotateCcw } ]
  }
};

// La hora se calcula en los handlers y no al renderizar: el servidor no puede
// conocerla y cualquier valor inicial distinto de '' rompería la hidratación.
function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function NutiBot() {
  const t = useTranslations('bot');

  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<FlowStep>('inicio');
  const [currentTime, setCurrentTime] = useState('');

  const goToStep = (step: FlowStep) => {
    setCurrentStep(step);
    setCurrentTime(nowLabel());
  };

  const openBot = () => {
    setOpen(true);
    setCurrentTime(nowLabel());
  };

  const closeBot = () => {
    setOpen(false);
    setTimeout(() => setCurrentStep('inicio'), 300);
  };

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeBot()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const activeFlow = nutiFlowData[currentStep];

  return (
    <>
      {/* Ventana del chat.
          El alto se recorta contra el viewport (svh, no vh, por la barra de Safari iOS):
          con 600px fijos la cabecera quedaba fuera de pantalla en móviles cortos.
          `inert` la saca del orden de tabulación y del árbol de accesibilidad al cerrarse;
          `pointer-events-none` por sí solo no la ocultaba de los lectores de pantalla. */}
      <div
        id={PANEL_ID}
        role="dialog"
        aria-modal="false"
        aria-label={t('chatbotLabel')}
        inert={!open}
        className={`fixed right-4 bottom-22 z-9999 flex h-[min(600px,calc(100svh-7.5rem))] w-[min(380px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl bg-[#FAF7F2] sm:right-6 sm:w-[min(380px,calc(100vw-3rem))] motion-safe:transition-all motion-safe:duration-[400ms] motion-safe:ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          open
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
                <p className="m-0 text-[1.1rem] leading-tight font-extrabold tracking-[-0.5px] text-white">
                  Nuti
                </p>
                <span className="mt-0.5 flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-2 rounded-full bg-[#4ADE80]" />
                  <span className="text-[0.8rem] font-medium text-white/90">{t('online')}</span>
                </span>
              </div>
            </div>

            <div className="z-1 flex shrink-0 items-center">
              <button
                type="button"
                onClick={() => goToStep('inicio')}
                aria-label={t('resetChat')}
                className="flex size-11 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <RotateCcw size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={closeBot}
                aria-label={t('closeChat')}
                aria-controls={PANEL_ID}
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
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto overscroll-contain p-5 sm:p-6">
          <div>
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E46A17]">
                <Image src="/images/LogoNuti.webp" alt="" width={406} height={297} className="h-[70%] w-[70%] object-contain" />
              </span>
              <p
                aria-live="polite"
                className="m-0 rounded-[20px] rounded-tl-sm bg-white p-4 text-[0.9rem] leading-relaxed text-[#333333] shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
              >
                {t(activeFlow.messageKey)}
              </p>
            </div>
            {currentTime && (
              <p className="mt-2 ml-12 text-[0.7rem] text-[#8A8A8A]">{currentTime}</p>
            )}
          </div>

          <hr className="-mx-5 border-0 border-t border-black/5 sm:-mx-6" />

          <div className="flex flex-col gap-3.5">
            {activeFlow.options.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => goToStep(option.next)}
                  className="flex min-h-11 items-center gap-4 rounded-full border border-[#F1DABF] bg-white px-4 py-2.5 text-left shadow-[0_2px_5px_rgba(0,0,0,0.02)] hover:border-[#E46A17]/40 hover:shadow-[0_4px_12px_rgba(228,106,23,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E46A17] motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FDF1E5]">
                    {Icon && <Icon size={16} color="#E46A17" aria-hidden="true" />}
                  </span>
                  <span className="flex-1 text-[0.9rem] font-medium text-[#111111]">
                    {t(option.key)}
                  </span>
                  <ChevronRight size={18} color="#E46A17" aria-hidden="true" className="shrink-0" />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Botón flotante */}
      <button
        type="button"
        onClick={() => (open ? closeBot() : openBot())}
        aria-label={open ? t('closeChat') : t('openChat')}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        className={`fixed right-4 bottom-4 z-10000 flex size-15 items-center justify-center rounded-full sm:right-6 sm:bottom-6 sm:size-[70px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E46A17] motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          open
            ? 'rotate-90 scale-90 bg-[#111111] shadow-[0_4px_15px_rgba(0,0,0,0.3)]'
            : 'bg-[#E46A17] shadow-[0_4px_20px_rgba(228,106,23,0.45)]'
        }`}
      >
        {open ? (
          <X size={26} color="#ffffff" aria-hidden="true" className="-rotate-90" />
        ) : (
          <Image
            src="/images/LogoNuti.webp"
            alt=""
            width={406}
            height={297}
            className="size-[85%] object-contain"
          />
        )}
      </button>
    </>
  )
}

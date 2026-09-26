"use client"

import { useEffect, useRef } from 'react'
import { Star, Play, BadgeCheck, ShoppingBag } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Review {
  name: string
  dateKey: string
  rating: number
  textKey: string
}

interface Reel {
  titleKey: string
  /** Sin extensión: se sirven /web/<slug>.mp4 y su portada /web/<slug>.webp. */
  slug: string
  views: string
  link: string
}

// ─── REVIEWS SIMULANDO MERCADO LIBRE ───
const reviews: Review[] = [
  { name: 'Valentina M.', dateKey: 'review1Date', rating: 5, textKey: 'review1Text' },
  { name: 'Martín R.', dateKey: 'review2Date', rating: 5, textKey: 'review2Text' },
  { name: 'Lucía P.', dateKey: 'review3Date', rating: 5, textKey: 'review3Text' },
]

const REELS_DIR = '/images/REELS'

const instagramReels: Reel[] = [
  {
    titleKey: 'reel1Title',
    slug: 'REEL1',
    views: '12.4k',
    link: 'https://www.instagram.com/p/DWjgotjgFdr/',
  },
  {
    titleKey: 'reel2Title',
    slug: 'REEL3',
    views: '8.2k',
    link: 'https://www.instagram.com/entrenuts/',
  },
  {
    titleKey: 'reel3Title',
    slug: 'REEL5',
    views: '15.1k',
    link: 'https://www.instagram.com/entrenuts/',
  },
  {
    titleKey: 'reel4Title',
    slug: 'REEL7',
    views: '9.8k',
    link: 'https://www.instagram.com/entrenuts/',
  },
]

/**
 * Los MP4 venían a 1080x1920 y ~10.000 kb/s: 126 MB entre los cuatro. Recomprimidos
 * a 720x1280 quedaron en ~2 MB cada uno, así que la vista previa en movimiento
 * vuelve a ser viable también en touch, que es donde el hover no existe.
 *
 * Aun así no se descarga nada de entrada: `preload="none"` más el poster hacen que
 * el estado inicial sean ~28 KB de imagen, y el video recién se pide cuando la
 * tarjeta entra en pantalla. Se respeta el modo ahorro de datos y las conexiones
 * lentas, donde la portada estática ya cuenta la historia.
 */
function prefersStillImage() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection
  if (connection?.saveData) return true
  return connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
}

function ReelCard({ reel }: { reel: Reel }) {
  const t = useTranslations('reviews')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (prefersStillImage()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
          video.currentTime = 0
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [])

  return (
    <a
      href={reel.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-9/16 min-w-0 overflow-hidden rounded-2xl bg-[#1A1207] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-naranja)] md:min-w-[180px] md:flex-1 md:motion-safe:transition-[flex-grow] md:motion-safe:duration-500 md:hover:grow-[1.4]"
    >
      <video
        ref={videoRef}
        src={`${REELS_DIR}/${reel.slug}.mp4`}
        poster={`${REELS_DIR}/${reel.slug}.webp`}
        preload="none"
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        className="size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 to-transparent to-60%"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 p-4 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0"
      >
        <Play size={24} fill="white" color="white" className="ml-1" />
      </span>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 block p-4 sm:p-5">
        <span className="flex items-center gap-1 text-xs font-bold text-white/80">
          <Play size={12} fill="currentColor" aria-hidden="true" /> {reel.views}
        </span>
        <span className="mt-1 block text-sm leading-snug font-semibold text-white sm:text-base">
          {t(reel.titleKey)}
        </span>
      </span>
    </a>
  )
}

export function ReviewsSection() {
  const t = useTranslations('reviews')

  return (
    <section className="bg-footpage px-4 py-[clamp(4rem,8vw,7rem)] sm:px-6 lg:px-[clamp(2rem,5vw,4rem)]">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8 md:mb-12">
          <h2 className="font-display mb-1.5 text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] text-[#111111] uppercase">
            {t('sectionTitle')}
          </h2>
          {/* #7A6F64 sobre #e8ddca daba 3.6:1; #635B50 llega a 4.8:1 */}
          <p className="text-base text-[#635B50]">{t('sectionSub')}</p>
        </header>

        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mb-20">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="rounded-2xl border border-[#ebebeb] bg-white p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] sm:p-7"
            >
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="flex gap-0.5" aria-label={t('ratingAria', { count: r.rating })}>
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} size={16} fill="#ef7f17" color="#ef7f17" aria-hidden="true" />
                  ))}
                </span>
                <span className="flex shrink-0 items-center gap-1 text-[0.7rem] font-semibold text-[#6B6B6B]">
                  <ShoppingBag size={12} aria-hidden="true" /> Mercado Libre
                </span>
              </div>

              <p className="mb-6 text-[0.95rem] leading-relaxed text-[#333333]">{t(r.textKey)}</p>

              <footer className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[1.1rem] font-extrabold text-[#5C5C5C]"
                >
                  {r.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="text-[0.85rem] font-bold text-[#111111]">
                    {r.name}
                    <span className="ml-1 font-normal text-[#6B6B6B]">• {t(r.dateKey)}</span>
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[0.75rem] font-semibold text-[#00834A]">
                    <BadgeCheck size={14} aria-hidden="true" /> {t('verifiedPurchase')}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* En móvil los reels van en grilla de 2: en fila apilada cada uno medía
            ~555px de alto y los cuatro sumaban más de 2000px de scroll. */}
        <div className="grid grid-cols-2 gap-3 md:flex md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-4">
          {instagramReels.map((reel) => (
            <ReelCard key={reel.titleKey} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from 'react'
import { Play } from 'lucide-react'

export interface Reel {
  titleKey: string
  /** Sin extensión: se sirven /images/REELS/<slug>.mp4 y su portada /images/REELS/<slug>.webp. */
  slug: string
  views: string
  link: string
}

const REELS_DIR = '/images/REELS'

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

export function ReelCard({ reel, title }: { reel: Reel; title: string }) {
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
          {title}
        </span>
      </span>
    </a>
  )
}

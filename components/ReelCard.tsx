"use client"

import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'

export interface Reel {
  titleKey: string
  /** Sin extensión: se sirven /images/REELS/<slug>.mp4 y su portada /images/REELS/<slug>.webp. */
  slug: string
}

const REELS_DIR = '/images/REELS'

// Avisa a las demás tarjetas que una empezó a reproducirse: hay una sola activa a la vez.
const REEL_ACTIVATED = 'entrenuts:reel-activated'

/**
 * Los MP4 venían a 1080x1920 y ~10.000 kb/s: 126 MB entre los cuatro. Recomprimidos
 * a 720x1280 (y sin pista de audio) quedaron en ~2 MB cada uno, así que la vista
 * previa en movimiento vuelve a ser viable también en touch, donde no hay hover.
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

interface ReelCardProps {
  reel: Reel
  title: string
  /** Nombre accesible del botón, ej.: "Reproducir video: Tostada con pasta de maní" */
  playLabel: string
}

/**
 * Dos estados: vista previa (sin controles, en loop mientras se ve la tarjeta) y
 * reproducción (al hacer click arranca desde el principio, con los controles del
 * navegador, y vuelve a la vista previa al terminar o al salir de pantalla).
 */
export function ReelCard({ reel, title, playLabel }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // La reproducción arranca acá y no en el click: el cleanup de la pasada
    // anterior (vista previa) pausa el video justo después del click.
    if (active) {
      // Si algún día los MP4 traen audio, la reproducción pedida por el usuario lo usa
      video.muted = false
      video.currentTime = 0
      video.play().catch(() => {})
      video.focus({ preventScroll: true })
    } else {
      video.muted = true
      // Al volver a la vista previa el video queda oculto al lector: el foco pasa al botón
      if (document.activeElement === video) buttonRef.current?.focus({ preventScroll: true })
    }
    const still = prefersStillImage()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!active && !still) video.play().catch(() => {})
        } else if (active) {
          setActive(false)
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
  }, [active])

  useEffect(() => {
    const onActivated = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== reel.slug) setActive(false)
    }
    window.addEventListener(REEL_ACTIVATED, onActivated)
    return () => window.removeEventListener(REEL_ACTIVATED, onActivated)
  }, [reel.slug])

  const play = () => {
    window.dispatchEvent(new CustomEvent(REEL_ACTIVATED, { detail: reel.slug }))
    setActive(true)
  }

  return (
    <div className="group relative aspect-9/16 min-w-0 overflow-hidden rounded-2xl bg-[#1A1207] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-[var(--color-naranja)] md:min-w-[180px] md:flex-1 md:motion-safe:transition-[flex-grow] md:motion-safe:duration-500 md:hover:grow-[1.4]">
      <video
        ref={videoRef}
        src={`${REELS_DIR}/${reel.slug}.mp4`}
        poster={`${REELS_DIR}/${reel.slug}.webp`}
        preload="none"
        muted
        loop={!active}
        playsInline
        controls={active}
        aria-label={active ? title : undefined}
        aria-hidden={active ? undefined : true}
        tabIndex={active ? 0 : -1}
        onEnded={() => setActive(false)}
        className={`size-full object-cover focus-visible:outline-none ${
          active ? '' : 'motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105'
        }`}
      />

      {!active && (
        <button
          ref={buttonRef}
          type="button"
          onClick={play}
          aria-label={playLabel}
          className="absolute inset-0 block cursor-pointer text-left focus-visible:outline-none"
        >
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

          <span className="pointer-events-none absolute inset-x-0 bottom-0 block p-4 text-sm leading-snug font-semibold text-white sm:p-5 sm:text-base">
            {title}
          </span>
        </button>
      )}
    </div>
  )
}

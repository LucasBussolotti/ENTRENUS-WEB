"use client";

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { getImageProps } from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'

// ── AGREGAMOS ctaText y ctaHref ──
const SLIDES = [
  {
    image: '/images/PUFFS_NUEVO.webp',
    mobileImage: '/images/RESPONSIVE/SLIDER1.webp',
    bgColor: '#1A1207',
    accentColor: '#ef7f17',
    titleKey: 'slide1Title',
    // En desktop el título entra en una línea; en mobile puede partirse para no desbordar
    singleLineTitle: true,
    ctaKey: 'slide1Cta',
    ctaHref: '/productos',
  },
  {
    image: '/images/HERO_CEO.webp',
    mobileImage: '/images/RESPONSIVE/SLIDER2.webp',
    bgColor: '#0D0906',
    accentColor: '#D4A843',
    titleKey: 'slide2Title',
    ctaKey: 'slide2Cta',
    ctaHref: '/acerca_de',
  },
  {
    image: '/images/PRODSHERO3.jpeg',
    mobileImage: '/images/RESPONSIVE/SLIDER3.webp',
    bgColor: '#0B1209',
    accentColor: '#6B9E5E',
    titleKey: 'slide3Title',
    // Los productos llenan casi toda la foto: el título va en una línea sobre la franja libre inferior
    titleBelowProducts: true,
    ctaKey: null,
    ctaHref: '/acerca_de',
  },
]

export function HeroCarousel() {
  const t = useTranslations('hero')
  const locale = useLocale()

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 80, 
    dragFree: false,
    skipSnaps: false
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  // ── AUTOPLAY SIN ERRORES EN TYPESCRIPT ──
  useEffect(() => {
    if (!emblaApi) return
    // WCAG 2.2.2: quien pidió menos movimiento no recibe un carrusel que rota solo.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let intervalId: NodeJS.Timeout

    const startAutoplay = () => {
      clearInterval(intervalId) 
      intervalId = setInterval(() => {
        emblaApi.scrollNext()
      }, 5600) 
    }

    const stopAutoplay = () => {
      clearInterval(intervalId)
    }

    startAutoplay()

    emblaApi.on('pointerDown', stopAutoplay) 
    emblaApi.on('pointerUp', startAutoplay)  

    return () => {
      stopAutoplay()
      emblaApi.off('pointerDown', stopAutoplay)
      emblaApi.off('pointerUp', startAutoplay)
    }
  }, [emblaApi])

  return (
    /* En pantallas verticales se usan las versiones 9:16 de cada foto. El tope
       de 175vw deja la caja casi en 9:16 en un celular, así que `cover`
       prácticamente no recorta la foto vertical; con 100svh se perdía ~9% por
       lado y quedaban cortados los productos de los extremos. En desktop gana
       svh y el hero sigue a pantalla completa con la foto apaisada.

       -mb-px: con DPR fraccionario el borde inferior cae entre píxeles y el
       fondo oscuro del slide asomaba como una línea bajo la onda; la sección
       siguiente se solapa 1px y la tapa. */
    <section className="relative -mb-px h-[min(100svh,175vw)] min-h-[440px] overflow-hidden">
      <div ref={emblaRef} style={{ height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          {SLIDES.map((s, i) => {
            const titleText = t(s.titleKey)
            const ctaText = s.ctaKey ? t(s.ctaKey) : ''
            return (
            <div
              key={i}
              style={{
                flex: '0 0 100%',
                minWidth: 0,
                position: 'relative',
                background: s.bgColor,
              }}
            >
              {/* El primer slide es el elemento LCP de la home: carga eager y
                  con prioridad alta en vez de lazy-load. */}
              <HeroImage
                src={s.image}
                mobileSrc={s.mobileImage}
                eager={i === 0}
              />
              
              {/* ── CONTENEDOR DE TEXTO + BOTÓN (Abajo a la izquierda) ── */}
              {(titleText || ctaText) && (
                <div 
                  style={{ 
                    position: 'absolute',
                    inset: 0,
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'flex-end', 
                    alignItems: 'flex-start',
                    padding: '0 clamp(1.5rem, 5vw, 6rem)', 
                    paddingBottom: 'clamp(6rem, 12vh, 8rem)',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}
                >
                  {/* BOTÓN BLANCO CON SUBRAYADO ANIMADO Y FLECHA */}
                  {ctaText && (
                    <div style={{ 
                      marginBottom: '1.5rem', 
                      animation: selectedIndex === i ? 'fadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) 0.2s both' : 'none' 
                    }}>
                      <Link
                        href={`/${locale}${s.ctaHref}`}
                        style={{
                          pointerEvents: 'auto',
                          display: 'inline-flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start', 
                          textDecoration: 'none',
                          cursor: 'pointer',
                        }}
                        className="group transition-transform duration-300 ease-out hover:scale-105"
                      >
                        {/* ── CONTENEDOR FLEX PARA TEXTO + ÍCONO ── */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '1rem',
                              fontWeight: 800,
                              color: '#ffffff',
                              textAlign: 'left',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              margin: 0,
                              marginLeft: '0.25rem',
                              textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                            }}
                          >
                            {ctaText}
                          </p>
                          
                          {/* ── LA FAMOSA FLECHITA ── */}
                          <ArrowUpRight 
                            size={18} 
                            color="#ffffff" 
                            style={{ 
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
                              transition: 'transform 0.3s ease'
                            }} 
                            // Le agregamos un efectito para que se mueva un poco al pasar el mouse
                            className="group-hover:translate-x-1 group-hover:-translate-y-1" 
                          />
                        </div>
                        
                        {/* Animación de subrayado premium */}
                        <div 
                          style={{ 
                            height: '2px',
                            background: '#ffffff',
                            marginTop: '4px' 
                          }} 
                          className="w-0 transition-all duration-300 ease-out group-hover:w-full"
                        />
                      </Link>
                    </div>
                  )}

                  {/* TEXTO GIGANTE */}
                  {titleText && (
                    <h1 
                      className={`text-white font-black tracking-tight uppercase ${s.singleLineTitle || s.titleBelowProducts ? 'md:whitespace-nowrap' : ''}`}
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'clamp(1.1rem, min(5.8vw, 8svh), 4.5rem)',
                        lineHeight: 0.95,
                        maxWidth: s.titleBelowProducts || s.singleLineTitle ? 'none' : '850px',
                        textAlign: 'left',
                        textShadow: '0 4px 15px rgba(0,0,0,0.5)', 
                        animation: selectedIndex === i ? 'fadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) both' : 'none',
                        margin: 0,
                        whiteSpace: s.singleLineTitle ? undefined : 'pre-line',
                      }}
                    >
                      {titleText}
                    </h1>
                  )}
                </div>
              )}
            </div>
            )
          })}
        </div>
      </div>

      {/* Navegación por puntitos */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.875rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0px',
          zIndex: 20 
        }}
      >
        {/* El punto medía 8px: el área táctil ahora son 44px y el punto solo se dibuja. */}
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={t('goToSlide', { number: i + 1 })}
            aria-current={i === selectedIndex}
            className="flex size-11 cursor-pointer items-center justify-center border-none bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className={`block h-2 rounded-sm motion-safe:transition-all motion-safe:duration-[400ms] ${
                i === selectedIndex ? 'w-6 bg-[#ef7f17]' : 'w-2 bg-white/40'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Overlay de Onda inferior */}
      <div
        style={{
          position: 'absolute',
          bottom: '-1px', 
          left: 0,
          right: 0,
          height: '35px',
          zIndex: 10,
          pointerEvents: 'none',
          lineHeight: 0,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,15 
               C100,15 150,90 200,90 
               C250,90 300,15 400,15 
               C480,15 500,60 550,60 
               C600,60 620,15 700,15 
               C780,15 820,110 880,110 
               C940,110 980,15 1080,15 
               C1180,15 1220,80 1280,80 
               C1340,80 1380,15 1440,15 
               L1440,120 L0,120 Z"
            fill="var(--color-navbar)" 
          />
        </svg>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes fadeUp {
            from { opacity: 1; transform: none; }
            to { opacity: 1; transform: none; }
          }
        }
      `}</style>
    </section>
  )
}

type HeroImageProps = {
  src: string
  mobileSrc: string
  eager: boolean
}

/* Art direction con <picture>: el navegador descarga sólo la foto que
   corresponde a la orientación, no las dos. */
function HeroImage({ src, mobileSrc, eager }: HeroImageProps) {
  const common = {
    alt: '',
    fill: true,
    loading: eager ? 'eager' : 'lazy',
    fetchPriority: eager ? 'high' : 'auto',
    style: { objectFit: 'cover', opacity: 1 },
  } as const

  // La vertical llena la caja casi sin recorte, así que ocupa el ancho del viewport.
  const {
    props: { srcSet: mobileSrcSet, sizes: mobileSizes },
  } = getImageProps({ ...common, src: mobileSrc, sizes: '100vw' })

  /* La foto apaisada sólo se ve en pantallas horizontales, pero `cover` la
     escala por el alto en ventanas angostas y necesita más ancho que el viewport:
     con 100vw el navegador bajaba una variante chica y la ampliaba. */
  const { props } = getImageProps({
    ...common,
    src,
    sizes: '(max-width: 1280px) 120vw, 100vw',
  })

  return (
    <picture>
      <source media="(orientation: portrait)" srcSet={mobileSrcSet} sizes={mobileSizes} />
      <img {...props} alt="" />
    </picture>
  )
}

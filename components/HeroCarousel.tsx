"use client";

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ArrowUpRight } from 'lucide-react'

// ── AGREGAMOS ctaText y ctaHref ──
const SLIDES = [
  {
    image: '/images/HERO_BARRAS.jpeg',
    bgColor: '#1A1207',
    accentColor: '#ef7f17',
    titleText: 'Nuevas barritas proteicas', 
    ctaText: 'Conocé más', 
    ctaHref: '/productos',
  },
  {
    image: '/images/HERO_CEO.jpeg',
    bgColor: '#0D0906',
    accentColor: '#D4A843',
    titleText: 'Democratizando lo saludable', 
    ctaText: 'Conocenos', 
    ctaHref: '/acerca_de',
  },
  {
    image: '/images/RICOSALUDABLE.jpg',
    bgColor: '#0B1209',
    accentColor: '#6B9E5E',
    titleText: 'Hacemos rico\nlo saludable', 
    ctaText: '', 
    ctaHref: '/acerca_de',
  },
]

export function HeroCarousel() {
  const t = useTranslations('hero')
  
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
    <section style={{ position: 'relative', height: '100svh', minHeight: '560px', overflow: 'hidden' }}>
      <div ref={emblaRef} style={{ height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          {SLIDES.map((s, i) => (
            <div
              key={i}
              style={{
                flex: '0 0 100%',
                minWidth: 0,
                position: 'relative',
                background: s.bgColor,
              }}
            >
              <ImageWithFallback
                src={s.image}
                alt=""
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.75, 
                }}
              />
              
              {/* ── CONTENEDOR DE TEXTO + BOTÓN (Abajo a la izquierda) ── */}
              {(s.titleText || s.ctaText) && (
                <div 
                  style={{ 
                    position: 'absolute',
                    inset: 0,
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'flex-end', 
                    alignItems: 'flex-start',   
                    padding: '0 clamp(1.5rem, 5vw, 6rem)', 
                    paddingBottom: '8.5rem',    
                    pointerEvents: 'none',
                    zIndex: 10
                  }}
                >
                  {/* TEXTO GIGANTE */}
                  {s.titleText && (
                    <h1 
                      className="text-white font-black tracking-tight uppercase"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', 
                        lineHeight: 0.95,
                        maxWidth: '850px', 
                        textAlign: 'left',
                        textShadow: '0 4px 15px rgba(0,0,0,0.5)', 
                        animation: selectedIndex === i ? 'fadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) both' : 'none',
                        margin: 0,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {s.titleText}
                    </h1>
                  )}

                  {/* BOTÓN BLANCO CON SUBRAYADO ANIMADO Y FLECHA */}
                  {s.ctaText && (
                    <div style={{ 
                      marginTop: '1.5rem', 
                      animation: selectedIndex === i ? 'fadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) 0.2s both' : 'none' 
                    }}>
                      <Link
                        href={s.ctaHref}
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
                            {s.ctaText}
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navegación por puntitos */}
      <div
        style={{
          position: 'absolute',
          bottom: '4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 20 
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            style={{
              width: i === selectedIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === selectedIndex ? '#ef7f17' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'width 0.4s ease, background 0.4s ease',
              padding: 0,
            }}
          />
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
      `}</style>
    </section>
  )
}
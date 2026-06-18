"use client";

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ImageWithFallback } from './figma/ImageWithFallback'

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1704650312474-3981437230cb?w=1920&q=80',
    bgColor: '#1A1207',
    accentColor: '#ef7f17',
    tagKey: 'slide1Tag' as const,
    titleKey: 'slide1Title' as const,
    subKey: 'slide1Sub' as const,
    ctaKey: 'slide1Cta' as const,
    ctaHref: '/productos',
  },
  {
    image: '/images/HeroEjemplo.jpg',
    bgColor: '#0D0906',
    accentColor: '#D4A843',
    tagKey: 'slide2Tag' as const,
    titleKey: 'slide2Title' as const,
    subKey: 'slide2Sub' as const,
    ctaKey: 'slide2Cta' as const,
    ctaHref: '/productos',
  },
  {
    image: 'https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=1920&q=80',
    bgColor: '#0B1209',
    accentColor: '#6B9E5E',
    tagKey: 'slide3Tag' as const,
    titleKey: 'slide3Title' as const,
    subKey: 'slide3Sub' as const,
    ctaKey: 'slide3Cta' as const,
    ctaHref: '/quienes-somos',
  },
]

export function HeroCarousel() {
  const t = useTranslations('hero')
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
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

  // Autoplay per determinated seconds
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => emblaApi.scrollNext(), 7000)
    return () => clearInterval(interval)
  }, [emblaApi])

  const slide = SLIDES[selectedIndex]

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
                  opacity: 0.45,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(1.5rem, 5vw, 6rem)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ maxWidth: '700px' }}>

          {/* Title */}
          <h1
            key={`title-${selectedIndex}`}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.0,
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              animation: 'fadeUp 0.5s ease 0.08s both',
            }}
          >
            {t(SLIDES[selectedIndex].titleKey)} 
          </h1>

          {/* Subtitle */}
          <p
            key={`sub-${selectedIndex}`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.72)',
              marginBottom: '2rem',
              letterSpacing: '0.01em',
              animation: 'fadeUp 0.5s ease 0.16s both',
            }}
          >
              {t(SLIDES[selectedIndex].subKey)} 
            </p>

          {/* CTA */}
          <div style={{ pointerEvents: 'auto', animation: 'fadeUp 0.5s ease 0.24s both' }}>
            <Link
              href={SLIDES[selectedIndex].ctaHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: slide.accentColor,
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                padding: '0.85rem 1.8rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.01em',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              className="hover:scale-[1.03]"
            >
              {t(SLIDES[selectedIndex].ctaKey)} 
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>


      {/* Dot navigation */}
      <div
        style={{
          position: 'absolute',
          bottom: '4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
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
              transition: 'width 0.3s, background 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── OVERLAY DE ONDA (Misma onda que WaveDivider) ── */}
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
            /* Tu curva exacta, rellenando hacia ABAJO (L1440,120 L0,120 Z) */
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
            fill="var(--background)" 
          />
        </svg>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

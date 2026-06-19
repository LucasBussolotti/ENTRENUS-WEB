"use client";

import React from 'react';
import { useLocale } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

// ── DATOS DE CATEGORÍAS (Tus rutas locales originales) ──
const CATEGORIES = [
  { 
    id: 1, 
    titleEs: 'Pasta de Maní', 
    titleEn: 'Peanut Butter',
    image: '/images/PNG_NATURAL.png',
  },
  { 
    id: 2, 
    titleEs: 'Aceite de Coco ', 
    titleEn: 'Coconut Oil + MCT',
    image: '/images/PNG_ACNEUTRO360.png',
  },
  {
      id: 3,
      titleEs: 'Aceite MCT',
      titleEn: 'MCT Oil',
      image: '/images/PNG_MCT360.png',
  },
  { 
    id: 4, 
    titleEs: 'Barritas', 
    titleEn: 'Protein Bars',
    image: '/images/DISPLAY FRUTIDELI.png',
  },
  { 
    id: 5, 
    titleEs: 'Ghee', 
    titleEn: 'Ghee',
    image: '/images/PNG_GHEE300.png',
  },
  { 
    id: 6, 
    titleEs: 'Miel', 
    titleEn: 'Honey',
    image: '/images/PNG_MIEL LIQUIDA_500G.png',
  },
];

// ── COMPONENTE PRINCIPAL ──
export function ProductMosaic2() {
  const lang = useLocale();
  
  // Embla Carousel con movimiento continuo
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 1.5 })]
  );

  return (
    <section style={{ position: 'relative', background: 'var(--color-navbar)', padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* ── ENCABEZADO ── */}
        <div className="px-4 md:px-12 mb-8 md:mb-12">
          <h2
            className="text-center md:text-left"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              color: 'var(--color-naranja)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            {lang === 'es' ? 'Nuestros Productos' : 'Our Products'}
          </h2>
        </div>

        {/* ── EMBLA CAROUSEL (Tarjetas rediseñadas con Offwhite) ── */}
        <div className="overflow-hidden w-full px-4 md:px-12 cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="flex-[0_0_auto] w-[240px] md:w-[320px] h-[350px] md:h-[450px] mr-4 md:mr-6 relative rounded-[2rem] overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Imagen de Producto */}
                <ImageWithFallback 
                  src={cat.image} 
                  alt={lang === 'es' ? cat.titleEs : cat.titleEn} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradiente Offwhite (Beige/Crema) para limpiar la zona del texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-footpage)] via-[var(--color-footpage)]/70 to-transparent pointer-events-none opacity-30" />
                
                {/* Título de la Categoría */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 
                    className="text-2xl md:text-3xl font-black uppercase leading-tight tracking-tight"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontWeight: 900,
                      color: 'var(--text-dark)' /* Texto oscuro para contrastar */
                    }}
                  >
                    {lang === 'es' ? cat.titleEs : cat.titleEn}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── OVERLAY DE ONDA ── */}
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
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
          <path d="M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,120 L0,120 Z" fill="var(--color-footpage)" />
        </svg>
      </div>
    </section>
  );
}

export default ProductMosaic2;
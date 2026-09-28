"use client";

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

// ── DATOS DE CATEGORÍAS (Con escala personalizada por forma de envase) ──
const CATEGORIES = [
  { 
    id: 1, 
    labelKey: 'peanutButter',
    slug: 'pastas-de-mani',
    image: '/images/PASTAS/PNATURAL/PNATURAL-mosaico.webp',
    // La pasta es ancha, la agrandamos un poquito
    scaleClass: 'scale-110 group-hover:scale-125', 
  },
  { 
    id: 2, 
    labelKey: 'coconutOil',
    slug: 'aceite-de-coco',
    image: '/images/PASTAS/ACV/ACV-mosaico.webp',
    scaleClass: 'scale-105 group-hover:scale-110',
  },
  { 
    id: 3, 
    labelKey: 'mctOil',
    slug: 'aceite-mct',
    image: '/images/PNG_ACMCT250.webp',
    // La botella es muy alta, la achicamos para que no tape el texto
    scaleClass: 'scale-[0.85] group-hover:scale-95', 
  },
  { 
    id: 4, 
    labelKey: 'proteinBars',
    slug: 'barritas-proteicas',
    image: '/images/BARRITA NARANCHOC.webp',
    scaleClass: 'scale-100 group-hover:scale-105',
  },
  { 
    id: 5, 
    labelKey: 'ghee',
    slug: 'ghee',
    image: '/images/PASTAS/GHEE/GHEE-mosaico.webp',
    scaleClass: 'scale-110 group-hover:scale-125',
  },
  { 
    id: 6, 
    labelKey: 'honey',
    slug: 'miel',
    image: '/images/MIEL.webp',
    scaleClass: 'scale-100 group-hover:scale-110',
  },
  { 
    id: 7, 
    labelKey: 'proteinPuffs',
    slug: 'puffs-proteicos',
    image: '/images/PUFFS/QUESO/QUESO1.webp',
    // El lienzo es cuadrado y el envase ocupa poca parte: se agranda para igualar la altura del resto
    scaleClass: 'scale-[1.1] group-hover:scale-[1.18]',
  },
  { 
    id: 8, 
    labelKey: 'proteinPancakes',
    slug: 'pancakes-proteicos',
    image: '/images/PANCAKES/PANCAKES-mosaico.webp',
    scaleClass: 'scale-[0.75] group-hover:scale-[0.8]',
  },
];

// ── COMPONENTE PRINCIPAL ──
export function ProductMosaic2() {
  const t = useTranslations();
  const locale = useLocale();
  
  // El auto-scroll no arranca si el sistema pide menos movimiento (WCAG 2.2.2).
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [AutoScroll({ playOnInit: !prefersReducedMotion, stopOnInteraction: false, speed: 1.5 })]
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
            {t('products.sectionTitle')}
          </h2>
        </div>

        {/* ── EMBLA CAROUSEL ── */}
        <div className="overflow-hidden w-full px-4 md:px-12 cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex pb-4">
            {CATEGORIES.map((cat) => (
              // Embla cancela el click al terminar un arrastre, así que la tarjeta
              // puede ser enlace sin navegar al deslizar el carrusel.
              <Link
                key={cat.id} 
                href={`/${locale}/productos/${cat.slug}`}
                // Usamos relative y block para poder usar posiciones absolutas adentro
                className="flex-[0_0_auto] w-[200px] sm:w-[240px] md:w-[320px] h-[300px] sm:h-[350px] md:h-[450px] mr-3 sm:mr-4 md:mr-6 rounded-[2rem] bg-[#fcfbf9] overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300 relative block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)]"
              >
                
                {/* 1. Área de la Imagen (Ocupa de arriba hasta un poco antes del texto) */}
                <div className="absolute top-0 left-0 right-0 bottom-[4.5rem] p-4 flex items-center justify-center">
                  <ImageWithFallback 
                    src={cat.image} 
                    // El nombre ya está en el enlace: con alt se leía dos veces
                    alt="" 
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 320px"
                    
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    // Acá le inyectamos la escala personalizada que definimos arriba
                    className={`transition-transform duration-700 drop-shadow-md ${cat.scaleClass}`}
                  />
                </div>
                
                {/* 2. Área del Texto (Anclado rígidamente abajo) */}
                <div className="absolute bottom-0 left-0 right-0 h-[4.5rem] flex items-center justify-center px-3 sm:px-6">
                  <h3 
                    className="text-base sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[#111111] text-center text-balance"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t(`categories.${cat.labelKey}`)}
                  </h3>
                </div>

              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProductMosaic2;
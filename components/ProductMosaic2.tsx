"use client";

import React from 'react';
import { useLocale } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

// ── DATOS DE CATEGORÍAS (Con escala personalizada por forma de envase) ──
const CATEGORIES = [
  { 
    id: 1, 
    titleEs: 'Pasta de Maní', 
    titleEn: 'Peanut Butter',
    image: '/images/PASTAS/PNATURAL/PNATURAL-mosaico.webp',
    // La pasta es ancha, la agrandamos un poquito
    scaleClass: 'scale-110 group-hover:scale-125', 
  },
  { 
    id: 2, 
    titleEs: 'Aceite de Coco', 
    titleEn: 'Coconut Oil',
    image: '/images/PASTAS/ACV/ACV-mosaico.webp',
    scaleClass: 'scale-105 group-hover:scale-110',
  },
  { 
    id: 3, 
    titleEs: 'Aceite MCT', 
    titleEn: 'MCT Oil',
    image: '/images/PNG_ACMCT250.webp',
    // La botella es muy alta, la achicamos para que no tape el texto
    scaleClass: 'scale-[0.85] group-hover:scale-95', 
  },
  { 
    id: 4, 
    titleEs: 'Barritas', 
    titleEn: 'Protein Bars',
    image: '/images/BARRITA NARANCHOC.webp',
    scaleClass: 'scale-100 group-hover:scale-105',
  },
  { 
    id: 5, 
    titleEs: 'Ghee', 
    titleEn: 'Ghee',
    image: '/images/PASTAS/GHEE/GHEE-mosaico.webp',
    scaleClass: 'scale-110 group-hover:scale-125',
  },
  { 
    id: 6, 
    titleEs: 'Miel', 
    titleEn: 'Honey',
    image: '/images/MIEL.webp',
    scaleClass: 'scale-100 group-hover:scale-110',
  },
];

// ── COMPONENTE PRINCIPAL ──
export function ProductMosaic2() {
  const lang = useLocale();
  
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

        {/* ── EMBLA CAROUSEL ── */}
        <div className="overflow-hidden w-full px-4 md:px-12 cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex pb-4">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                // Usamos relative y block para poder usar posiciones absolutas adentro
                className="flex-[0_0_auto] w-[240px] md:w-[320px] h-[350px] md:h-[450px] mr-4 md:mr-6 rounded-[2rem] bg-[#fcfbf9] overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300 relative block"
              >
                
                {/* 1. Área de la Imagen (Ocupa de arriba hasta un poco antes del texto) */}
                <div className="absolute top-0 left-0 right-0 bottom-[4.5rem] p-4 flex items-center justify-center">
                  <ImageWithFallback 
                    src={cat.image} 
                    alt={lang === 'es' ? cat.titleEs : cat.titleEn} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    // Acá le inyectamos la escala personalizada que definimos arriba
                    className={`transition-transform duration-700 drop-shadow-md ${cat.scaleClass}`}
                  />
                </div>
                
                {/* 2. Área del Texto (Anclado rígidamente abajo) */}
                <div className="absolute bottom-0 left-0 right-0 h-[4.5rem] flex items-center justify-center px-6">
                  <h3 
                    className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#111111] text-center"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {lang === 'es' ? cat.titleEs : cat.titleEn}
                  </h3>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProductMosaic2;
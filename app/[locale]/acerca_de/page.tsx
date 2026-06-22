"use client";

import { useLocale, useTranslations } from 'next-intl';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'; // Ajustá la ruta si hace falta

export default function AboutPage() {
  const lang = useLocale();
  const t = useTranslations('about');

  return (
    <main style={{ background: 'var(--color-footpage)', minHeight: '100vh' }}>
      
      {/* ── 1. HERO IMAGE (Fundadores en el depósito) ── */}
      <section className="relative w-full h-[50vh] md:h-[75vh] min-h-[400px]">
        {/* Foto de fondo (A reemplazar por la foto real de los 3 fundadores) */}
        <ImageWithFallback
          src="/images/CEOS.jpg"
          alt="Fundadores Entrenuts"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />
        
        {/* Overlay oscuro sutil para que no quede quemada (opcional) */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Onda inferior color beige (Conecta con la sección de abajo) */}
        <div 
          className="h-[35px] md:h-[50px]" /* Altura ajustada para mantener la misma proporción del Navbar */
          style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, pointerEvents: 'none', overflow: 'hidden' }}
        >
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,120 L0,120 Z" 
              fill="var(--color-footpage)" 
            />
          </svg>
        </div>
      </section>

      {/* ── 2. SECCIÓN DE TEXTO (Historia) ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <h1 
          className="text-5xl md:text-7xl font-black mb-6 md:mb-8 leading-[0.9]"
          style={{ color: 'var(--color-naranja)', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}
        >
          {t('titleLine1')} <br />
          {t('titleLine2')}
        </h1>

        <div 
          className="text-lg md:text-xl md:leading-relaxed"
          style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
        >
          <p className="mb-4">
            Entrenuts es una <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}>empresa joven</strong> ubicada en la ciudad de Colón, Entre Ríos.
          </p>
          <p className="mb-4">
            Comenzó como un proyecto de amigos y en sólo <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}>3 años logró expandirse a nivel mundial.</strong>
          </p>
          <p className="mb-4">
            El primer día de producción fue el 20 de marzo de 2020, coincidiendo con el día en que se declaró la cuarentena obligatoria en Argentina.
          </p>
          <p className="mb-4">
            Trabajamos día a día en la mejora continua, <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}>creando nuevas oportunidades de trabajo y crecimiento.</strong>
          </p>
          <p>
            Actualmente el promedio de edad de los integrantes de la empresa es de 25 años. Nos enorgullece contar con un <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}>equipo joven, profesional y responsable.</strong>
          </p>
        </div>
      </section>

      {/* ── 3. GRILLA DE 3 FOTOS (Equipo y Fábrica) ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="aspect-[4/3] md:aspect-auto md:h-56 relative rounded-sm overflow-hidden shadow-sm">
            <ImageWithFallback src="/images/TODOSAFU.jpg" alt="Equipo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="aspect-[4/3] md:aspect-auto md:h-56 relative rounded-sm overflow-hidden shadow-sm">
            <ImageWithFallback src="/images/ARREGLITO.jpg" alt="Máquinas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="aspect-[4/3] md:aspect-auto md:h-56 relative rounded-sm overflow-hidden shadow-sm">
            <ImageWithFallback src="/images/FACHACRACK.jpg" alt="Operario" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ── 4. MISIÓN Y PILARES ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        
        {/* Títulos de Misión */}
        <div className="mb-8">
          <h2 
            className="text-3xl md:text-5xl font-black mb-1 leading-[0.95]"
            style={{ color: 'var(--color-naranja)', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}
          >
            {t('missionTitleLine1')} <br />
            {t('missionTitleLine2')}
          </h2>
          <h3 
            className="text-lg md:text-2xl font-bold tracking-tight"
            style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-body)', fontWeight: 700, lineHeight: 1.3 }}
          >
            {t('missionSubtitle')}
          </h3>
        </div>

        {/* 4 Pilares */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 pt-4 text-center">
          {[
            t('pillar1'),
            t('pillar2'),
            t('pillar3'),
            t('pillar4')
          ].map((pillar, index) => (
            <div key={index} className="flex items-start justify-center">
              <p 
                className="text-[10px] md:text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}
              >
                {pillar}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. IMAGEN INFERIOR FULL-WIDTH (Línea de producción) ── */}
      <section className="relative w-full h-[35vh] md:h-[60vh] min-h-[300px]">
        
        {/* Onda superior color beige (Conecta el fondo con la foto) */}
        <div 
          className="h-[35px] md:h-[50px]"
          style={{ position: 'absolute', top: '-1px', left: 0, right: 0, zIndex: 10, pointerEvents: 'none', overflow: 'hidden' }}
        >
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            {/* Fijate que acá rellenamos hacia arriba (L1440,0 L0,0) para que el beige baje sobre la foto */}
            <path 
              d="M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,0 L0,0 Z" 
              fill="var(--color-footpage)" 
            />
          </svg>
        </div>

        <ImageWithFallback
          src="/images/MAQUINAMANIS.jpg"
          alt="Línea de producción Entrenuts"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

    </main>
  );
}
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
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=2000"
          alt="Fundadores Entrenuts"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />
        
        {/* Overlay oscuro sutil para que no quede quemada (opcional) */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Onda inferior color beige (Conecta con la sección de abajo) */}
        <div 
          className="h-[60px] md:h-[100px]" 
          style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, pointerEvents: 'none', overflow: 'hidden' }}
        >
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path 
              d="M0,60 C240,120 480,120 720,60 C960,0 1200,0 1440,60 L1440,120 L0,120 Z" 
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
            <ImageWithFallback src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800" alt="Equipo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="aspect-[4/3] md:aspect-auto md:h-56 relative rounded-sm overflow-hidden shadow-sm">
            <ImageWithFallback src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=800" alt="Máquinas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="aspect-[4/3] md:aspect-auto md:h-56 relative rounded-sm overflow-hidden shadow-sm">
            <ImageWithFallback src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800" alt="Operario" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ── 4. MISIÓN Y PILARES ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        
        {/* Títulos de Misión */}
        <div className="mb-12">
          <h2 
            className="text-3xl md:text-5xl font-black mb-2 leading-tight"
            style={{ color: 'var(--color-naranja)', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}
          >
            {t('missionTitle')}
          </h2>
          <h3 
            className="text-lg md:text-2xl font-black tracking-tight"
            style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-display)' }}
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
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1587293852726-70cdb56c2836?q=80&w=2000"
          alt="Línea de producción Entrenuts"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

    </main>
  );
}
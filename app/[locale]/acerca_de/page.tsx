import { useTranslations } from 'next-intl';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'; 

export default function AboutPage() {
  const t = useTranslations('about');

  // Arreglo con tus 4 pilares traducidos
  const pillars = [
    t('pillar1'),
    t('pillar2'),
    t('pillar3'),
    t('pillar4')
  ];

  return (
    <main style={{ background: 'var(--color-footpage)', minHeight: '100vh' }}>
      
      {/* ── 1. HERO IMAGE (Fundadores en el depósito) ── */}
      <section className="relative w-full h-[50svh] md:h-[75svh] min-h-[320px] md:min-h-[400px]">
        <ImageWithFallback
          src="/images/CEOS.webp"
          alt={t('foundersAlt')}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />
        
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        <div 
          className="h-[35px] md:h-[50px]" 
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
      <section className="max-w-4xl mx-auto px-5 sm:px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <h1 
          className="text-[clamp(2.5rem,11vw,5.5rem)] md:text-7xl font-black mb-6 md:mb-8 leading-[0.9]"
          style={{ color: 'var(--color-naranja)', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}
        >
          {t('titleLine1')} <br />
          {t('titleLine2')}
        </h1>

        <div 
          className="text-lg md:text-xl md:leading-relaxed"
          style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
        >
          {(["body1", "body2", "body3", "body4", "body5"] as const).map((key, index, all) => (
            <p key={key} className={index < all.length - 1 ? "mb-4" : undefined}>
              {t.rich(key, {
                b: (chunks) => (
                  <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}>{chunks}</strong>
                )
              })}
            </p>
          ))}
        </div>
      </section>

      {/* ── VIDEO COMERCIAL ── */}
      {/* preload="none": son ~24MB y sólo se descargan si la persona le da play;
          hasta entonces se ve el poster. */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12 py-8">
        <video
          controls
          playsInline
          preload="none"
          poster="/images/REELS/COMERCIAL-poster.webp"
          aria-label={t('videoLabel')}
          className="block w-full aspect-video rounded-sm bg-black shadow-sm"
        >
          <source src="/images/REELS/COMERCIAL-web.mp4" type="video/mp4" />
          {t('videoFallback')}
        </video>
      </section>

      {/* ── 3. GRILLA DE 3 FOTOS (Equipo y Fábrica) ── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="aspect-[4/3] md:aspect-auto md:h-56 relative rounded-sm overflow-hidden shadow-sm">
            <ImageWithFallback src="/images/TODOSAFU.webp" alt={t('teamAlt')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="aspect-[4/3] md:aspect-auto md:h-56 relative rounded-sm overflow-hidden shadow-sm">
            <ImageWithFallback src="/images/ARREGLITO.webp" alt={t('machinesAlt')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="aspect-[4/3] md:aspect-auto md:h-56 relative rounded-sm overflow-hidden shadow-sm">
            <ImageWithFallback src="/images/FACHACRACK.webp" alt={t('operatorAlt')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ── 4. MISIÓN Y PILARES (CON CINTA INFINITA) ── */}
      <section className="w-full py-12 md:py-16 overflow-hidden">
        
        {/* Títulos de Misión (Centrados o alineados según prefieras, acá los dejé dentro del max-w) */}
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12 mb-10">
          <h2 
            className="text-[clamp(1.75rem,7vw,3rem)] md:text-5xl font-black mb-1 leading-[0.95]"
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

        {/* ── LA CINTA INFINITA (MARQUEE) ── */}
        <div className="relative w-full border-y border-[rgba(0,0,0,0.05)] py-6 md:py-8 bg-[rgba(255,255,255,0.2)]">
          <div 
            className="pillars-ticker flex w-max"
            style={{ animation: 'scroll-ticker 30s linear infinite' }}
          >
            {/* Multiplicamos el array por 4 para asegurar que cubra monitores ultrawide sin romperse */}
            {[...Array(4)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex items-center">
                {pillars.map((pillar, index) => (
                  <div key={index} className="flex items-center">
                    <p 
                      className="text-[11px] md:text-sm font-black uppercase tracking-[0.1em] whitespace-nowrap px-8 md:px-16"
                      style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-body)' }}
                    >
                      {pillar}
                    </p>
                    {/* Separador visual: un pequeño círculo */}
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-naranja)] opacity-80" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <style>{`
            @media (prefers-reduced-motion: reduce) {
              .pillars-ticker { animation: none !important; }
            }
            @keyframes scroll-ticker {
              0% { transform: translateX(0); }
              /* Como duplicamos el bloque 4 veces, para que sea un loop perfecto 
                 tiene que retroceder exactamente el 25% (un bloque entero) */
              100% { transform: translateX(-25%); } 
            }
          `}</style>
        </div>
      </section>

      {/* ── 5. IMAGEN INFERIOR FULL-WIDTH (Línea de producción) ── */}
      <section className="relative w-full h-[35svh] md:h-[60svh] min-h-[220px] md:min-h-[300px]">
        <div 
          className="h-[35px] md:h-[50px]"
          style={{ position: 'absolute', top: '-1px', left: 0, right: 0, zIndex: 10, pointerEvents: 'none', overflow: 'hidden' }}
        >
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path 
              d="M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,0 L0,0 Z" 
              fill="var(--color-footpage)" 
            />
          </svg>
        </div>

        <ImageWithFallback
          src="/images/MAQUINAMANIS.webp"
          alt={t('productionLineAlt')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

    </main>
  );
}
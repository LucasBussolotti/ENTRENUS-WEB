import { useTranslations } from 'next-intl';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CommunityCTA() {
  const t = useTranslations('community');

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#1A1207',
        marginTop: '-2px', /* Un margen negativo ínfimo por si queda alguna línea blanca suelta de 1px */
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
      }}
    >
      {/* Background image */}
      <ImageWithFallback
        src="images/ENSALADAMANI.jpg"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.2,
        }}
      />

      {/* ── EL TRUCO: Esfumado superior para fundir la foto con la onda de arriba ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '150px', /* Qué tan largo querés que sea el esfumado hacia abajo */
          background: 'linear-gradient(to bottom, #1A1207 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '680px', margin: '0 auto' }}>
        
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 5.5rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.0,
            marginTop: 30,
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        >
          {t('title')}
        </h2>

        {/* --- Botón / Texto a Instagram --- */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '2.5rem',
            marginBottom: '-2rem'
          }}
        >
          <a
            href="https://www.instagram.com/entrenuts/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            className="group transition-transform duration-300 ease-out hover:scale-105"
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
                fontWeight: 900,
                color: '#ef7f17', /* Naranja oficial */
                textAlign: 'center',
                textTransform: 'uppercase',
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                margin: 0,
              }}
            >
              {t('ctaLine1')} <br />
              {t('ctaLine2')}
            </p>
            
            {/* Animación de subrayado premium */}
            <div 
              style={{ 
                height: '3px',
                background: '#ef7f17', /* Naranja oficial */
                marginTop: '8px' 
              }} 
              className="w-0 transition-all duration-300 ease-out group-hover:w-full"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
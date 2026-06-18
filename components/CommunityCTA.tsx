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
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
      }}
    >
      {/* Background image */}
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?w=1600&q=70"
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

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
        
        {/* Etiqueta p vacía eliminada para limpiar el DOM */}

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 5.5rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.0,
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
              {/* Dividimos el texto en dos partes para mantener tu <br /> */}
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
import { Instagram } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function CommunityCTA() {
  const { t, lang } = useTranslation()

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
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#C8935A',
            marginBottom: '1.25rem',
          }}
        >
        </p>

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
          {t.community.title}
        </h2>

        {/* --- Botón / Texto a Instagram --- */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '2.5rem',    /* ¡Acá está la clave! Lo bajamos de 4rem a 7rem para centrarlo en el espacio en blanco */
            marginBottom: '-2rem'  /* Le damos un respiro abajo por las dudas */
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
                color: '#F27A18',
                textAlign: 'center',
                textTransform: 'uppercase',
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                margin: 0,
              }}
            >
              {lang === 'es' ? (
                <>
                  Encontrá estas recetas y más <br />
                  en @entrenuts
                </>
              ) : (
                <>
                  Find these recipes and more <br />
                  at @entrenuts
                </>
              )}
            </p>
            
            {/* Animación de subrayado premium */}
            <div 
              style={{ 
                height: '3px', /* Hice la línea un poquito más gruesa (3px en vez de 2px) para que acompañe el nuevo tamaño */
                background: '#F27A18', 
                marginTop: '8px' 
              }} 
              className="w-0 transition-all duration-300 ease-out group-hover:w-full"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

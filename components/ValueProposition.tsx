"use client";

import { useTranslations } from 'next-intl'

export function ValueProposition() {
  const t = useTranslations('quote')

  return (
    <section
      style={{
        background: '#111111', 
        paddingTop: 'clamp(4rem, 8vw, 6rem)',    
        paddingBottom: 'clamp(2rem, 4vw, 4rem)',  
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Texto principal */}
        <blockquote
          style={{
            fontFamily: 'var(--font-body)', 
            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', 
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.5,
            marginBottom: '2.5rem',
          }}
        >
          {t('text')}
        </blockquote>

        {/* Autor y bajada */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.3rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--color-naranja)', 
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            {t('author')}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '4rem', 
            }}
          >
            {t('tagline')}
          </p>
        </div>

        {/* Sellos PNG */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/images/SellosBlanco4.png" 
            alt="Sellos de calidad" 
            style={{ 
              height: '120px', 
              width: 'auto',
              maxWidth: '90%', 
              objectFit: 'contain',
              opacity: 0.85,
              display: 'block'
            }} 
          />
        </div>
      </div>
    </section>
  )
}
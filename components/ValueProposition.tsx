import { useTranslations } from 'next-intl'

export function ValueProposition() {
  // Con next-intl llamamos directo a la categoría (asegurate de tener "quote" en tus .json)
  const t = useTranslations('quote')

  return (
    <section
      style={{
        background: '#111111',
        /* Separamos los paddings para tener control independiente */
        paddingTop: 'clamp(5rem, 10vw, 7.6rem)',    /* Mantiene el espacio grande arriba */
        paddingBottom: 'clamp(2rem, 4vw, 4rem)',  /* Mucho menos espacio abajo */
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
        {/* Texto principal (Más grande y sin la línea naranja arriba) */}
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
          {/* Ahora llamamos a las claves directamente así: */}
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
              color: '#ef7f17', // <-- Corregido al naranja oficial de la marca
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
            /* En Next.js, las imágenes de la carpeta public se llaman desde la raíz (/) */
            src="images/SellosBlanco4.png" 
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
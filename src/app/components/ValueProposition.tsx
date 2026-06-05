import { useTranslation } from '../context/LanguageContext'

export function ValueProposition() {
  const { t } = useTranslation()

  return (
    <section
      style={{
        background: '#111111',
        /* Separamos los paddings para tener control independiente */
        paddingTop: 'clamp(5rem, 10vw, 7.6rem)',    /* Mantiene el espacio grande arriba */
        paddingBottom: 'clamp(2rem, 4vw, 4rem)',  /* <--- ACÁ ACHICAMOS: Mucho menos espacio abajo */
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
            fontFamily: 'var(--font-body)', // Ya está usando Founders Grotesk
            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', // Agrandamos los valores mínimo y máximo
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.5,
            marginBottom: '2.5rem',
          }}
        >
          {t.quote.text}
        </blockquote>

        {/* Autor y bajada */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.3rem', // Un poquito más grande
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#F27A18', // El naranja de la marca
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            {t.quote.author}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '4rem', // Le damos un buen respiro antes de los sellos
            }}
          >
            {t.quote.tagline}
          </p>
        </div>

        {/* Sellos PNG (Reemplaza a los viejos badges) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img 
            src="./SellosBlanco4.png" /* Ajustá esta ruta dependiendo de si la imagen está en /public o en /src/assets */
            alt="Sellos de calidad" 
            style={{ 
              height: '120px', /* Subimos el alto de 50px a 120px (podés jugar con 100px o 150px) */
              width: 'auto',
              maxWidth: '90%', /* Evita que se desborde la pantalla en celulares si la hacemos muy ancha */
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
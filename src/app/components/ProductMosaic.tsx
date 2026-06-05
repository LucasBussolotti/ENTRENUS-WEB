import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext'
import { products } from '../data/products'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function ProductMosaic() {
  const { t, lang } = useTranslation()

  // Seleccionamos solo los primeros 8 productos para el mosaico principal (como en la imagen)
  const featuredProducts = products.slice(0, 8)

  return (
    <section style={{ padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)', background: 'var(--background)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Título Naranja */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 900,
            color: '#ef7f17', 
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        >
          {t.products.sectionTitle}
        </h2>

        {/* Contenedor principal (El marco color arena de fondo) */}
        <div 
          style={{ 
            background: '#e8ddca', // Ajustá este hex si el arena de la marca es más claro/oscuro
            borderRadius: '24px', 
            padding: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          {/* Grilla de productos */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/productos/${product.id}`}
                style={{
                  background: '#FDF8EF', 
                  borderRadius: '16px',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  /* 1. Sacamos la transición de transform (escala) de la tarjeta entera */
                  transition: 'box-shadow 0.3s ease',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                }}
                /* 2. Agregamos la clase "group". Ya no agranda la caja, solo sube un poco la sombra */
                className="group hover:shadow-lg"
              >
                {/* Contenedor de la Imagen del producto */}
                <div 
                  /* 3. ACÁ ESTÁ LA MAGIA: Transición fluida y escala solo cuando el "group" (la tarjeta) tiene hover */
                  className="transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{ width: '100%', aspectRatio: '1/1', position: 'relative', marginBottom: '1rem' }}
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={lang === 'es' ? product.nameEs : product.nameEn}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.12))' 
                    }}
                  />
                </div>

                {/* Texto centrado */}
                <div style={{ textAlign: 'center' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)', 
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#111111',
                      lineHeight: 1.2,
                      marginBottom: '0.1rem',
                    }}
                  >
                    {lang === 'es' ? product.nameEs : product.nameEn}
                  </h3>
                  
                  {/* Variante (Natural, Crocante, etc) */}
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: '0.95rem', 
                      color: '#333333',
                      fontWeight: 400,
                      minHeight: '1.4rem' 
                    }}
                  >
                    {(lang === 'es' ? product.variantEs : product.variantEn) || '\u00A0'}
                  </p> 
                </div>
              </Link>
            ))}
          </div>

          {/* Botón Ver todos (Estilo Línea-Texto-Línea) */}
          <div 
            style={{ 
              marginTop: '4rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem',
              padding: '0 1rem'
            }}
          >
            {/* Línea izquierda */}
            <div style={{ flex: 1, height: '1px', background: 'rgba(17, 17, 17, 0.2)' }}></div>
            
            {/* Link central */}
            <Link
              to="/productos"
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#111111',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.02em',
                display: 'inline-block'
              }}
              className="transition-all duration-300 ease-out hover:scale-105 hover:text-[#ef7f17]"
            >
              {lang === 'es' ? 'Mostrar todo' : 'Show all'}
            </Link>

            {/* Línea derecha */}
            <div style={{ flex: 1, height: '1px', background: 'rgba(17, 17, 17, 0.2)' }}></div>
          </div>
        </div>

      </div>
    </section>
  )
}
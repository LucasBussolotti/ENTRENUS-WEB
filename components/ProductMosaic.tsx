"use client";

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { products } from '../lib/data/products'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function ProductMosaic() {
  const lang = useLocale()
  const t = useTranslations('products') 
  const featuredProducts = products.slice(0, 8)

  return (
    <section style={{ 
      position: 'relative', /* 👈 Vital para anclar la onda abajo */
      padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)', 
      background: 'var(--color-navbar)' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: 'var(--color-naranja)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            textAlign: 'left' 
          }}
        >
          {t('sectionTitle')}
        </h2>

        <div 
          style={{ 
            background: 'var(--color-footpage)', 
            borderRadius: '24px', 
            padding: 'clamp(1.5rem, 3vw, 2.5rem)', 
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
            zIndex: 2 /* Mantenemos las tarjetas por encima de la onda */
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1rem', 
            }}
          >
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${lang}/productos/${product.id}`}
                style={{
                  background: 'var(--color-navbar)', 
                  borderRadius: '16px',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                className="group hover:shadow-md hover:-translate-y-1"
              >
                <div
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

                <div style={{ textAlign: 'center' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: 'var(--text-dark)', 
                      lineHeight: 1.2,
                      marginBottom: '0.1rem',
                    }}
                  >
                    {lang === 'es' ? product.nameEs : product.nameEn}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--text-dark)', 
                      opacity: 0.8, 
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

          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--text-dark)', opacity: 0.15 }} />
            <Link
              href={`/${lang}/productos`}
              style={{
                fontSize: '1.3rem', 
                fontWeight: 900, 
                color: 'var(--text-dark)', 
                textDecoration: 'none',
                fontFamily: 'var(--font-display)', 
                letterSpacing: '0.01em',
                display: 'inline-block'
              }}
              className="transition-colors duration-300 ease-out hover:text-[color:var(--color-naranja)]"
            >
              {t('verTodos')}
            </Link>
            <div style={{ flex: 1, height: '1px', background: 'var(--text-dark)', opacity: 0.15 }} />
          </div>
        </div>
      </div>

      {/* ── OVERLAY DE ONDA (Anclada al fondo de esta sección, apuntando a la negra) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '-1px', 
          left: 0,
          right: 0,
          height: '35px',
          zIndex: 10,
          pointerEvents: 'none',
          lineHeight: 0,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,15 
               C100,15 150,90 200,90 
               C250,90 300,15 400,15 
               C480,15 500,60 550,60 
               C600,60 620,15 700,15 
               C780,15 820,110 880,110 
               C940,110 980,15 1080,15 
               C1180,15 1220,80 1280,80 
               C1340,80 1380,15 1440,15 
               L1440,120 L0,120 Z"
            fill="#111111" 
          />
        </svg>
      </div>
    </section>
  )
}
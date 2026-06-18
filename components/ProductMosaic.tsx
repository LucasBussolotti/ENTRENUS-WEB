"use client";

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { products } from '../lib/data/products'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function ProductMosaic() {
  const lang = useLocale()
  const featuredProducts = products.slice(0, 8)

  return (
    <section style={{ padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)', background: 'var(--background)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
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
          {lang === 'es' ? 'Nuestros Productos' : 'Our Products'}
        </h2>

        <div style={{ background: '#e8ddca', borderRadius: '24px', padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
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
                href={`/${lang}/productos/${product.id}`}
                style={{
                  background: '#FDF8EF',
                  borderRadius: '16px',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.3s ease',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                }}
                className="group hover:shadow-lg"
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
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#111111',
                      lineHeight: 1.2,
                      marginBottom: '0.1rem',
                    }}
                  >
                    {lang === 'es' ? product.nameEs : product.nameEn}
                  </h3>
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

          {/* Botón Ver todos */}
          <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 1rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(17, 17, 17, 0.2)' }} />
            <Link
              href={`/${lang}/productos`}
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
            <div style={{ flex: 1, height: '1px', background: 'rgba(17, 17, 17, 0.2)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
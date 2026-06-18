"use client"

import { ExternalLink, Clock } from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { PageHeader } from '@/components/WaveDivider'

const InstagramIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const recipes = [
  {
    title: 'Bowl de açaí con granola Entrenuts',
    titleEn: 'Açaí bowl with Entrenuts granola',
    image: 'https://images.unsplash.com/photo-1558021984-46774cdb0e83?w=800&q=80',
    time: '5 min',
    cat: 'Desayuno',
    catEn: 'Breakfast',
    desc: 'Una base de açaí congelado con granola original crujiente. El desayuno perfecto para empezar el día.',
    descEn: 'A frozen açaí base with crunchy original granola. The perfect breakfast to start the day.',
    igLink: 'https://www.instagram.com/entrenuts/',
  },
  {
    title: 'Tostada con pasta de maní y banana',
    titleEn: 'Toast with peanut butter and banana',
    image: 'https://images.unsplash.com/photo-1626697556426-8a55a8af4999?w=800&q=80',
    time: '3 min',
    cat: 'Snack',
    catEn: 'Snack',
    desc: 'La combinación clásica llevada al siguiente nivel. Pan integral, pasta de maní natural y banana en rodajas.',
    descEn: 'The classic combo taken to the next level. Whole grain bread, natural peanut butter and sliced banana.',
    igLink: 'https://www.instagram.com/entrenuts/',
  },
  {
    title: 'Smoothie proteico de cacao y maní',
    titleEn: 'Cacao and peanut protein smoothie',
    image: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=800&q=80',
    time: '5 min',
    cat: 'Post-entrenamiento',
    catEn: 'Post-workout',
    desc: 'Leche de almendras, pasta de maní con cacao y una barra proteica. El batido que tu cuerpo necesita.',
    descEn: 'Almond milk, cacao peanut butter and a protein bar. The shake your body needs.',
    igLink: 'https://www.instagram.com/entrenuts/',
  },
  {
    title: 'Cookies de avena y granola',
    titleEn: 'Oat and granola cookies',
    image: 'https://images.unsplash.com/photo-1616252576862-bd9abd7467f9?w=800&q=80',
    time: '20 min',
    cat: 'Postre',
    catEn: 'Dessert',
    desc: 'Avena, granola tropical y pasta de maní. Sin azúcar refinada, sin culpa. Perfectas para toda la familia.',
    descEn: 'Oats, tropical granola and peanut butter. No refined sugar, no guilt. Perfect for the whole family.',
    igLink: 'https://www.instagram.com/entrenuts/',
  },
  {
    title: 'Energy balls de maní y cacao',
    titleEn: 'Peanut butter and cacao energy balls',
    image: 'https://images.unsplash.com/photo-1621470626377-dd2757ae6216?w=800&q=80',
    time: '10 min',
    cat: 'Snack',
    catEn: 'Snack',
    desc: 'Dátiles, pasta de maní + cacao y frutos secos. El snack perfecto para llevar a todos lados.',
    descEn: 'Dates, cacao peanut butter and nuts. The perfect snack to take everywhere.',
    igLink: 'https://www.instagram.com/entrenuts/',
  },
  {
    title: 'Yogur con granola y frutos rojos',
    titleEn: 'Yogurt with granola and berries',
    image: 'https://images.unsplash.com/photo-1543158181-1274e5362710?w=800&q=80',
    time: '2 min',
    cat: 'Desayuno',
    catEn: 'Breakfast',
    desc: 'Yogur natural, granola original y frutos rojos frescos. Simple, rápido y delicioso.',
    descEn: 'Natural yogurt, original granola and fresh berries. Simple, quick and delicious.',
    igLink: 'https://www.instagram.com/entrenuts/',
  },
]

// 2. EXPORT DEFAULT (Obligatorio si este archivo es una página de Next.js)
export default function RecipesPage() {
  const { t, lang } = useTranslation()

  return (
    // 3. Cambié el fondo general al Crema Oficial para mantener la coherencia
    <div style={{ minHeight: '100vh', background: '#fff8ea' }}>
      <PageHeader
        title={t.recipesPage.title}
        subtitle={t.recipesPage.sub}
      />
      <div style={{ textAlign: 'center', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
        <a
          href="https://www.instagram.com/entrenuts/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#ef7f17', // 4. Actualizado al naranja oficial
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            borderBottom: '1.5px solid #ef7f17', // Naranja oficial
            paddingBottom: '2px',
          }}
        >
          <InstagramIcon size={14} />
        </a>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem clamp(1.5rem, 5vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {recipes.map((rec, i) => (
          <div
            key={i}
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              background: '#ffffff',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
              <ImageWithFallback
                src={rec.image}
                alt={lang === 'es' ? rec.title : rec.titleEn}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Clock size={11} color="rgba(255,255,255,0.8)" />
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {rec.time}
                </span>
              </div>
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  background: '#ef7f17', // Naranja oficial
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {lang === 'es' ? rec.cat : rec.catEn}
              </span>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#111111',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                {lang === 'es' ? rec.title : rec.titleEn}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.83rem',
                  color: '#7A6F64',
                  lineHeight: 1.55,
                  marginBottom: '1.25rem',
                }}
              >
                {lang === 'es' ? rec.desc : rec.descEn}
              </p>
              <a
                href={rec.igLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#111111',
                  textDecoration: 'none',
                  borderBottom: '1.5px solid #ef7f17', // Naranja oficial
                  paddingBottom: '1px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {/* 5. Corrección de texto hardcodeado */}
                {lang === 'es' ? 'Ver en Instagram' : 'View on Instagram'}
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
import { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext'
import { products, Product, ProductCategory } from '../data/products'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { PageHeader } from '../components/WaveDivider'

const FILTERS: { key: 'all' | ProductCategory; labelKey: 'filterAll' | 'filterPastas' | 'filterGranola' | 'filterBarras' | 'filterFrutos' }[] = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'pastas', labelKey: 'filterPastas' },
  { key: 'granola', labelKey: 'filterGranola' },
  { key: 'barras', labelKey: 'filterBarras' },
  { key: 'frutos', labelKey: 'filterFrutos' },
]

const TAG_FILTERS = ['SIN GLUTEN', 'VEGANO', 'KETO', 'SIN AZÚCAR AGREGADA']

function NutritionBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div style={{ marginBottom: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span style={{ fontSize: '0.72rem', color: '#7A6F64', fontFamily: 'var(--font-body)' }}>{label}</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#111111', fontFamily: 'var(--font-body)' }}>{value}g</span>
      </div>
      <div style={{ height: '4px', background: '#F0EBE3', borderRadius: '2px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.min((value / max) * 100, 100)}%`,
            background: color,
            borderRadius: '2px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <ImageWithFallback
          src={product.image}
          alt={lang === 'es' ? product.nameEs : product.nameEn}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {product.isNew && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: '#ffffff',
              background: '#C8935A',
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t.products.newTag}
          </span>
        )}
      </div>

      <div style={{ padding: '1.25rem' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {product.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#7A6F64',
                background: '#F0EBE3',
                padding: '0.15rem 0.5rem',
                borderRadius: '3px',
                fontFamily: 'var(--font-body)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 700,
            color: '#111111',
            marginBottom: '0.4rem',
          }}
        >
          {lang === 'es' ? product.nameEs : product.nameEn}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.83rem',
            color: '#7A6F64',
            lineHeight: 1.5,
            marginBottom: '1rem',
          }}
        >
          {lang === 'es' ? product.descEs : product.descEn}
        </p>

        {/* Nutrition toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#7A6F64',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'var(--font-body)',
            marginBottom: '0.75rem',
          }}
        >
          {t.productsPage.nutritionTitle}
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {expanded && (
          <div
            style={{
              background: '#F8F3EC',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#7A6F64', fontFamily: 'var(--font-body)' }}>Calorías / 100g</span>
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#111111',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {product.nutrition.calories} kcal
              </span>
            </div>
            <NutritionBar label="Proteínas" value={product.nutrition.protein} max={30} color="#4A7C59" />
            <NutritionBar label="Carbohidratos" value={product.nutrition.carbs} max={80} color="#C8935A" />
            <NutritionBar label="Grasas" value={product.nutrition.fat} max={60} color="#D4A843" />
            <NutritionBar label="Fibra" value={product.nutrition.fiber} max={20} color="#7A6F64" />
          </div>
        )}

        <a
          href={product.mlUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '7px',
            background: '#111111',
            color: '#ffffff',
            fontSize: '0.82rem',
            fontWeight: 600,
            padding: '0.7rem 1rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            transition: 'background 0.2s',
          }}
          className="hover:bg-[#C8935A]"
        >
          <ExternalLink size={14} />
          {t.productsPage.mlLink}
        </a>
      </div>
    </div>
  )
}

export function ProductsPage() {
  const { t } = useTranslation()
  const [category, setCategory] = useState<'all' | ProductCategory>('all')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = products.filter((p) => {
    const catOk = category === 'all' || p.category === category
    const tagOk = !activeTag || p.tags.includes(activeTag)
    return catOk && tagOk
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F8F3EC' }}>
      <PageHeader
        title={t.productsPage.title}
        subtitle={t.productsPage.sub}
        dark
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem clamp(1.5rem, 5vw, 4rem)' }}>
        {/* Filters */}
        <div style={{ marginBottom: '2rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#7A6F64',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t.productsPage.filterLabel}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {FILTERS.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  border: '1.5px solid',
                  borderColor: category === key ? '#111111' : 'rgba(0,0,0,0.12)',
                  background: category === key ? '#111111' : 'transparent',
                  color: category === key ? '#ffffff' : '#7A6F64',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t.products[labelKey]}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {TAG_FILTERS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  border: '1.5px solid',
                  borderColor: activeTag === tag ? '#C8935A' : 'rgba(0,0,0,0.10)',
                  background: activeTag === tag ? '#C8935A' : 'transparent',
                  color: activeTag === tag ? '#ffffff' : '#7A6F64',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

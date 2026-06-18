"use client";

import { Leaf, Users, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { WaveDivider } from '@/components/WaveDivider'

const CHAINS = ['Carrefour', 'Día', 'Coto', 'La Anónima', 'Vea', 'Jumbo', 'Walmart', 'Disco']

export default function AboutPage() {
  const t = useTranslations('aboutPage')

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '440px', overflow: 'hidden', background: '#111111' }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=1600&q=80"
          alt="Equipo Entrenuts"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.32 }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(1.5rem, 5vw, 6rem)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', fontWeight: 900, color: '#ffffff', marginBottom: '0.75rem', maxWidth: '620px', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1.0 }}>
            {t('title')}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', fontWeight: 400, color: 'rgba(255,255,255,0.65)', maxWidth: '520px', lineHeight: 1.65 }}>
            {t('sub')}
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <WaveDivider fromColor="#111111" toColor="#F8F3EC" height={36} />
        </div>
      </div>

      {/* Story */}
      <div style={{ background: '#F8F3EC', padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#C8935A', marginBottom: '1rem' }}>
              NUESTRA HISTORIA
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 400, color: '#111111', lineHeight: 1.45, marginBottom: '1.5rem' }}>
              {t('story1')}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#7A6F64', lineHeight: 1.7 }}>
              {t('story2')}
            </p>
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80"
              alt="Entrenuts team"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ background: '#ffffff', padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#111111', marginBottom: '2.5rem', textAlign: 'center', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            {t('valuesTitle')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { Icon: Leaf,   title: t('val1Title'), text: t('val1Text'), color: '#4A7C59' },
              { Icon: Users,  title: t('val2Title'), text: t('val2Text'), color: '#C8935A' },
              { Icon: MapPin, title: t('val3Title'), text: t('val3Text'), color: '#8B6914' },
            ].map(({ Icon, title, text, color }) => (
              <div key={title} style={{ background: '#F8F3EC', borderRadius: '14px', padding: '2rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: '#111111', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.87rem', color: '#7A6F64', lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* National presence */}
      <div style={{ background: '#111111', padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            {t('presenceTitle')}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.55)', marginBottom: '3rem' }}>
            {t('presenceSub')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {CHAINS.map((chain) => (
              <span key={chain} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.5rem 1.25rem', borderRadius: '6px', fontFamily: 'var(--font-body)' }}>
                {chain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
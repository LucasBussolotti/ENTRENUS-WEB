"use client";

import { useState } from 'react'
import { MapPin, Clock, ChevronRight, Send } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { PageHeader } from '@/components/WaveDivider'

const positions = [
  {
    titleEs: 'Coordinador/a de Marketing Digital',
    titleEn: 'Digital Marketing Coordinator',
    area: 'Marketing',
    type: 'Full-time',
    location: 'Colón, Entre Ríos',
    descEs: 'Buscamos a alguien apasionado/a por el marketing digital, redes sociales y el mundo del consumo saludable. Será responsable de gestionar nuestras redes, coordinar campañas y analizar métricas.',
    descEn: 'We are looking for someone passionate about digital marketing, social media and the healthy consumption world. You will manage our social networks, coordinate campaigns and analyze metrics.',
  },
  {
    titleEs: 'Operario/a de Producción',
    titleEn: 'Production Operator',
    area: 'Operaciones',
    type: 'Full-time',
    location: 'Colón, Entre Ríos',
    descEs: 'Responsable de las tareas de elaboración, envasado y control de calidad de nuestros productos. Experiencia en la industria alimentaria es un plus.',
    descEn: 'Responsible for manufacturing, packaging and quality control tasks. Experience in the food industry is a plus.',
  },
  {
    titleEs: 'Representante Comercial',
    titleEn: 'Sales Representative',
    area: 'Ventas',
    type: 'Full-time',
    location: 'Buenos Aires / Córdoba',
    descEs: 'Ampliar nuestra presencia en supermercados y distribuidores de la región. Se requiere experiencia en ventas a canal moderno.',
    descEn: 'Expand our presence in supermarkets and distributors in the region. Experience in modern channel sales required.',
  },
]

export default function EmploymentPage() {
  const t = useTranslations('employmentPage')
  const lang = useLocale()
  const [expanded, setExpanded] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <PageHeader title={t('title')} subtitle={t('sub')} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem clamp(1.5rem, 5vw, 4rem)' }}>

        {/* Open positions */}
        <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', fontWeight: 700, color: '#111111', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
          {t('openPositions')}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3.5rem' }}>
          {positions.map((pos, i) => (
            <div key={i} style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden', background: '#ffffff' }}>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: '#111111', marginBottom: '0.3rem' }}>
                    {lang === 'es' ? pos.titleEs : pos.titleEn}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#7A6F64', fontFamily: 'var(--font-body)' }}>
                      <MapPin size={11} />{pos.location}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#7A6F64', fontFamily: 'var(--font-body)' }}>
                      <Clock size={11} />{pos.type}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', color: '#C8935A', background: '#FFF4EB', padding: '0.15rem 0.5rem', borderRadius: '3px', fontFamily: 'var(--font-body)' }}>
                      {pos.area}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} color="#C8935A" style={{ transform: expanded === i ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>

              {expanded === i && (
                <div style={{ padding: '1rem 1.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#555', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    {lang === 'es' ? pos.descEs : pos.descEn}
                  </p>
                  
                  <a
                    href={`mailto:${t('contactEmail')}?subject=${lang === 'es' ? pos.titleEs : pos.titleEn}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', background: '#111111', padding: '0.6rem 1.25rem', borderRadius: '7px', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'background 0.2s' }}
                    className="hover:bg-[#C8935A]"
                  >
                    {t('applyNow')}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Spontaneous CV */}
        <div style={{ background: '#F8F3EC', borderRadius: '14px', padding: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600, color: '#111111', marginBottom: '0.5rem' }}>
            {t('noPosition')}
          </p>

          {sent ? (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#4A7C59', fontWeight: 600 }}>
              ✓ ¡Gracias! Nos pondremos en contacto pronto.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
              {[
                { key: 'name',  placeholder: 'Tu nombre', type: 'text'  },
                { key: 'email', placeholder: 'Tu email',  type: 'email' },
              ].map(({ key, placeholder, type }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  required
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'var(--font-body)', background: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                />
              ))}
              <textarea
                placeholder="¿Por qué querés sumarte a Entrenuts?"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'var(--font-body)', background: '#ffffff', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
              <button
                type="submit"
                style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', background: '#C8935A', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
              >
                <Send size={14} />
                {t('sendCV')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
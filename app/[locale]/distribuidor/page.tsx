"use client";

import { useState } from 'react'
import Link from 'next/link'
import { Lock, CheckCircle, Send } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { PageHeader } from '@/components/WaveDivider'

export default function DistributorPage() {
  const t = useTranslations('distributorPage')
  const lang = useLocale()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', message: '' })
  const [sent, setSent] = useState(false)

  const benefits = [
    'Acceso a toda la línea de productos Entrenuts',
    'Precios mayoristas competitivos',
    'Materiales de merchandising y POP',
    'Soporte comercial dedicado',
    'Acceso al área exclusiva de distribuidores',
  ]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      <PageHeader title={t('publicTitle')} subtitle={t('publicSub')} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem clamp(1.5rem, 5vw, 4rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        
        {/* Benefits */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 700, color: '#111111', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
            ¿Por qué distribuir Entrenuts?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle size={17} color="#C8935A" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#444', lineHeight: 1.5 }}>{b}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', background: '#111111', borderRadius: '12px', padding: '1.5rem', color: '#ffffff' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#C8935A', marginBottom: '0.5rem' }}>
              ¿YA ERES DISTRIBUIDOR?
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              Accedé al área exclusiva con tu contraseña.
            </p>
            <Link
              href={`/${lang}/distribuidor/privado`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', background: '#C8935A', padding: '0.6rem 1.25rem', borderRadius: '7px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}
            >
              <Lock size={13} />
              Ingresar al área privada
            </Link>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 700, color: '#111111', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
            Contactanos
          </h2>

          {sent ? (
            <div style={{ background: '#F0FAF4', border: '1px solid #4A7C59', borderRadius: '10px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={22} color="#4A7C59" />
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700, color: '#4A7C59' }}>¡Consulta enviada!</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#555' }}>Te contactaremos en las próximas 48 horas hábiles.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { key: 'name',  label: t('formName'),  type: 'text'  },
                { key: 'email', label: t('formEmail'), type: 'email' },
                { key: 'phone', label: t('formPhone'), type: 'tel'   },
                { key: 'city',  label: t('formCity'),  type: 'text'  },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#555', marginBottom: '0.3rem', fontFamily: 'var(--font-body)' }}>{label}</label>
                  <input
                    type={type}
                    required
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#555', marginBottom: '0.3rem', fontFamily: 'var(--font-body)' }}>{t('formMessage')}</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
              <button
                type="submit"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', background: '#111111', padding: '0.8rem 1.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', alignSelf: 'flex-start', transition: 'background 0.2s' }}
                className="hover:bg-[#C8935A]"
              >
                <Send size={14} />
                {t('formSend')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
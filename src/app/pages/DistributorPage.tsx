import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Lock, CheckCircle, Send, FileText, Package, Bell } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext'
import { PageHeader } from '../components/WaveDivider'

const DEMO_PASSWORD = 'entrenuts2026'

function PublicDistributor() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  })
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
      <PageHeader
        title={t.distributorPage.publicTitle}
        subtitle={t.distributorPage.publicSub}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '3rem clamp(1.5rem, 5vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
        }}
      >
        {/* Benefits */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#111111',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            ¿Por qué distribuir Entrenuts?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle size={17} color="#C8935A" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#444', lineHeight: 1.5 }}>
                  {b}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '2.5rem',
              background: '#111111',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#ffffff',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#C8935A',
                marginBottom: '0.5rem',
              }}
            >
              ¿YA ERES DISTRIBUIDOR?
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              Accedé al área exclusiva con tu contraseña.
            </p>
            <Link
              to="/distribuidor/privado"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#ffffff',
                background: '#C8935A',
                padding: '0.6rem 1.25rem',
                borderRadius: '7px',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              <Lock size={13} />
              Ingresar al área privada
            </Link>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#111111',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            Contactanos
          </h2>

          {sent ? (
            <div
              style={{
                background: '#F0FAF4',
                border: '1px solid #4A7C59',
                borderRadius: '10px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <CheckCircle size={22} color="#4A7C59" />
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700, color: '#4A7C59' }}>
                  ¡Consulta enviada!
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#555' }}>
                  Te contactaremos en las próximas 48 horas hábiles.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { key: 'name', label: t.distributorPage.formName, type: 'text' },
                { key: 'email', label: t.distributorPage.formEmail, type: 'email' },
                { key: 'phone', label: t.distributorPage.formPhone, type: 'tel' },
                { key: 'city', label: t.distributorPage.formCity, type: 'text' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#555',
                      marginBottom: '0.3rem',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    required
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      border: '1.5px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#555',
                    marginBottom: '0.3rem',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {t.distributorPage.formMessage}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.9rem',
                    border: '1.5px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  background: '#111111',
                  padding: '0.8rem 1.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  alignSelf: 'flex-start',
                  transition: 'background 0.2s',
                }}
                className="hover:bg-[#C8935A]"
              >
                <Send size={14} />
                {t.distributorPage.formSend}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function PrivateDistributor() {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === DEMO_PASSWORD) {
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (authenticated) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8F3EC' }}>
        {/* Header */}
        <div style={{ background: '#111111', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#C8935A',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-body)',
              }}
            >
              ÁREA EXCLUSIVA
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {t.distributorPage.privateArea}
            </h1>
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem clamp(1.5rem, 5vw, 4rem)' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: '#555',
              marginBottom: '2.5rem',
              lineHeight: 1.65,
            }}
          >
            {t.distributorPage.privateWelcome}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              { Icon: Package, title: 'Catálogo 2026', desc: 'Lista de precios y disponibilidad actualizada', color: '#C8935A' },
              { Icon: FileText, title: 'Materiales de Venta', desc: 'Flyers, displays y POP descargables', color: '#4A7C59' },
              { Icon: Bell, title: 'Novedades', desc: 'Lanzamientos y promociones exclusivas para distribuidores', color: '#8B6914' },
            ].map(({ Icon, title, desc, color }) => (
              <div
                key={title}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  padding: '1.75rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
                className="hover:scale-[1.02] hover:shadow-lg"
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: `${color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <Icon size={20} color={color} />
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
                  {title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: '#7A6F64', lineHeight: 1.5 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F3EC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '14px',
              background: '#F8F3EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <Lock size={22} color="#C8935A" />
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#111111',
              marginBottom: '0.4rem',
            }}
          >
            {t.distributorPage.privateTitle}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#7A6F64' }}>
            {t.distributorPage.privateSub}
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#555',
                marginBottom: '0.35rem',
                fontFamily: 'var(--font-body)',
              }}
            >
              {t.distributorPage.loginPassword}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: `1.5px solid ${error ? '#d4183d' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {error && (
              <p style={{ fontSize: '0.78rem', color: '#d4183d', marginTop: '0.3rem', fontFamily: 'var(--font-body)' }}>
                {t.distributorPage.loginWrong}
              </p>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#ffffff',
              background: '#111111',
              padding: '0.8rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'background 0.2s',
            }}
            className="hover:bg-[#C8935A]"
          >
            {t.distributorPage.loginEnter}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#7A6F64' }}>
          <span>¿No sos distribuidor? </span>
          <Link
            to="/distribuidor"
            style={{ color: '#C8935A', fontWeight: 600, textDecoration: 'none' }}
          >
            Conocé cómo serlo
          </Link>
        </p>
      </div>
    </div>
  )
}

export function DistributorPage() {
  const params = useParams()
  const isPrivate = params['*'] === 'privado'

  return (
    <div style={{ minHeight: '100vh' }}>
      {isPrivate ? <PrivateDistributor /> : <PublicDistributor />}
    </div>
  )
}

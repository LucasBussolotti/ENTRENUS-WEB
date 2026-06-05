import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X, Globe } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext'

const NAV_HEIGHT = 64
// Usamos una aproximación web al Pantone 7499 (Off-white/Crema) del manual
const DEFAULT_WAVE_COLOR = '#fff8ea' 

export function Navbar() {
  const { t, lang, setLang } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [distributorOpen, setDistributorOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Estado que controla el color dinámico de la onda y el fondo
  const [waveColor, setWaveColor] = useState(DEFAULT_WAVE_COLOR)

  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { href: '/', label: t.nav.inicio },
    { href: '/productos', label: t.nav.productos },
    { href: '/recetas', label: t.nav.recetas },
    { href: '/quienes-somos', label: t.nav.quienesSomos },
  ]


  // Cerrar dropdown al hacer clic afuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDistributorOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false)
    setDistributorOpen(false)
  }, [location.pathname])

  // Intersection Observer para cambiar el color según la sección
  useEffect(() => {
    const sections = document.querySelectorAll('section[data-wave-color]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const newColor = entry.target.getAttribute('data-wave-color') || DEFAULT_WAVE_COLOR;
          setWaveColor(newColor);
        }
      });
    }, { 
      threshold: 0.5, 
      rootMargin: `-${NAV_HEIGHT}px 0px 0px 0px` 
    });

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  const isHome = location.pathname === '/'

  return (
    <>
      <div style={{ height: isHome ? 0 : NAV_HEIGHT }} />

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          fontFamily: 'var(--font-body)',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.09)' : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        {/* Main nav bar */}
        <div
          style={{
            background: waveColor, // El fondo de la barra se ata al estado dinámico
            height: `${NAV_HEIGHT}px`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
            justifyContent: 'space-between',
            transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Transición suave
          }}
        >
          {/* Logo */}
          <Link 
            to="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none', 
              flexShrink: 0,
              marginLeft: '1rem',
              transform: 'translateY(4px)'
            }}
          >
            <img 
              src="/LOGO.png" 
              alt="Entrenuts" 
              style={{
                height: '75px', /* Ajustá este valor para que quede proporcional a la barra */
                width: 'auto',
                display: 'block'
              }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  fontSize: '1.2rem',
                  padding: '0.5rem 0.2rem', /* Le damos un pelín de aire a los costados */
                  lineHeight: 1.4,          /* <--- LA CLAVE: Le da techo a las letras para que no se corten al crecer */
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  fontFamily: 'var(--font-body)',
                  display: 'inline-block',
                }}
                className={`transition-all duration-300 ease-out hover:scale-[1.08] hover:text-[#ef7f17] ${
                  isActive(link.href) 
                    ? 'text-[#ef7f17] font-[700]' 
                    : 'text-[#333333] font-[400]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: lang + CTA (Separados) */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* 1. Selector de idioma (Bandera + Texto) */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px', // Este es el espacio entre la bandera y las letras
                background: 'rgba(0,0,0,0.06)', 
                border: 'none',
                padding: '0.35rem 0.75rem', // Lo hacemos apenas más ancho para que respire
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background 0.2s',
                height: '34px',
              }}
              className="hover:bg-black/10"
              title="Cambiar idioma"
            >
              {/* Imagen de la bandera */}
              <img 
                src={lang === 'es' ? 'https://flagcdn.com/w40/ar.png' : 'https://flagcdn.com/w40/us.png'} 
                alt={lang === 'es' ? 'Español' : 'English'}
                style={{
                  width: '20px', // La achiqué a 20px para que quede proporcionada con las letras
                  height: 'auto',
                  borderRadius: '2px',
                  display: 'block'
                }}
              />
              {/* Texto AR / US */}
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  color: '#222222',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  paddingTop: '2px' // Ajuste fino para que quede bien centrado con la bandera
                }}
              >
                {lang === 'es' ? 'AR' : 'US'}
              </span>
            </button>

            {/* 2. Botón Naranja Independiente */}
            <Link
              to="/distribuidor"
              style={{
                display: 'inline-block',
                fontSize: '1.1rem',
                color: '#ffffff',
                background: '#ef7f17',
                padding: '0.45rem 1.1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                textTransform: 'uppercase',
                lineHeight: 1,
                paddingTop: '0.6rem', 
                /* Eliminamos el 'transition: transform 0.2s' de acá para no pisar a Tailwind */
              }}
              /* Aplicamos exactamente la misma animación que a los links de texto */
              className="transition-all duration-300 ease-out hover:scale-[1.08] hover:shadow-md"
            >
              {lang === 'es' ? 'DISTRIBUIDORES' : 'DISTRIBUTORS'}
            </Link>
            
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              style={{ fontSize: '0.72rem', fontWeight: 500, color: '#888', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#111' }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Wave bottom (Misma onda que WaveDivider) ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '-35px', 
            left: 0,
            right: 0,
            height: '35px', 
            pointerEvents: 'none',
            lineHeight: 0,
            zIndex: -1,
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
              /* Tu curva exacta, rellenando hacia ARRIBA (L1440,0 L0,0 Z) */
              d="M0,15 
                 C100,15 150,90 200,90 
                 C250,90 300,15 400,15 
                 C480,15 500,60 550,60 
                 C600,60 620,15 700,15 
                 C780,15 820,110 880,110 
                 C940,110 980,15 1080,15 
                 C1180,15 1220,80 1280,80 
                 C1340,80 1380,15 1440,15 
                 L1440,0 L0,0 Z"
              fill={waveColor}
              style={{ transition: 'fill 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </svg>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              background: waveColor,
              borderTop: '1px solid rgba(0,0,0,0.05)',
              padding: '1rem 1.5rem 1.5rem',
              transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  display: 'block',
                  fontSize: '1.15rem', // Agrandado en mobile
                  fontWeight: isActive(link.href) ? 500 : 400,
                  color: isActive(link.href) ? '#ef7f17' : '#222222',
                  padding: '0.8rem 0',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {link.label}
              </Link>
            ))}
            {/* Botón Distribuidores Mobile */}
            <Link
              to="/distribuidor"
              style={{
                display: 'block',
                textAlign: 'center',
                fontSize: '1.2rem', 
                color: '#ffffff',
                background: '#ef7f17',
                padding: '0.9rem',
                borderRadius: '7px',
                marginTop: '0.75rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                textTransform: 'uppercase',
              }}
            >
              {lang === 'es' ? 'DISTRIBUIDORES' : 'DISTRIBUTORS'}
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
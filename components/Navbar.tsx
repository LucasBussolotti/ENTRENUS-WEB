"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

const NAV_HEIGHT = 64
const DEFAULT_WAVE_COLOR = '#fff8ea'

export function Navbar() {
  const t = useTranslations('nav')
  const lang = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
     { href: `/${lang}`, label: t('inicio') }, // Antes era t('inicio')
     { href: `/${lang}/productos`, label: t('productos') }, // Antes era t('productos')
     { href: `/${lang}/recetas`, label: t('recetas') }, // Antes era t('recetas')
     { href: `/${lang}/acerca_de`, label: t('quienesSomos') }, // Antes era t('quienesSomos')
     // Si tenés los de empleo y distribuidor en el nav, serían t('employment') y t('distributor')
   ]

  // Cambiar idioma — swapea el locale en la URL
  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es'
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(newPath)
  }

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Sombra al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === `/${lang}` : pathname.startsWith(href)

  const isHome = pathname === `/${lang}`

  return (
    <>
      <div style={{ height: isHome ? 0 : NAV_HEIGHT }} />

      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          fontFamily: 'var(--font-body)',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.09)' : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        <div
          style={{
            background: DEFAULT_WAVE_COLOR,
            height: `${NAV_HEIGHT}px`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
            justifyContent: 'space-between',
            transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Logo */}
          <Link href={`/${lang}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, marginLeft: '1rem', transform: 'translateY(4px)' }}>
            <img src="/images/LOGO.webp" alt="Entrenuts" style={{ height: '75px', width: 'auto', display: 'block' }} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '1.2rem',
                  padding: '0.5rem 0.2rem',
                  lineHeight: 1.4,
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  fontFamily: 'var(--font-body)',
                  display: 'inline-block',
                }}
                className={`transition-all duration-300 ease-out hover:scale-[1.08] hover:text-[#ef7f17] ${
                  isActive(link.href) ? 'text-[#ef7f17] font-[700]' : 'text-[#333333] font-[400]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: lang + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLang}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(0,0,0,0.06)', border: 'none',
                padding: '0.35rem 0.75rem', borderRadius: '6px',
                cursor: 'pointer', transition: 'background 0.2s', height: '34px',
              }}
              className="hover:bg-black/10"
              title="Cambiar idioma"
            >
              <img
                src={lang === 'es' ? 'https://flagcdn.com/w40/ar.png' : 'https://flagcdn.com/w40/us.png'}
                alt={lang === 'es' ? 'Español' : 'English'}
                style={{ width: '20px', height: 'auto', borderRadius: '2px', display: 'block' }}
              />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: '#222222', letterSpacing: '0.04em', lineHeight: 1, paddingTop: '2px' }}>
                {lang === 'es' ? 'AR' : 'US'}
              </span>
            </button>

            <Link
              href={`/${lang}/distribuidor`}
              style={{
                display: 'inline-block', fontSize: '1.1rem', color: '#ffffff',
                background: '#ef7f17', padding: '0.6rem 1.1rem', borderRadius: '6px',
                textDecoration: 'none', fontFamily: 'var(--font-body)',
                fontWeight: 700, textTransform: 'uppercase', lineHeight: 1,
              }}
              className="transition-all duration-300 ease-out hover:scale-[1.08] hover:shadow-md"
            >
              {lang === 'es' ? 'DISTRIBUIDORES' : 'DISTRIBUTORS'}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              style={{ fontSize: '0.72rem', fontWeight: 500, color: '#888', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
              aria-expanded={mobileOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#111' }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Wave bottom */}
        <div style={{ position: 'absolute', bottom: '-35px', left: 0, right: 0, height: '35px', pointerEvents: 'none', lineHeight: 0, zIndex: -1, overflow: 'hidden' }}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,0 L0,0 Z"
              fill={DEFAULT_WAVE_COLOR}
              style={{ transition: 'fill 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </svg>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: DEFAULT_WAVE_COLOR, borderTop: '1px solid rgba(0,0,0,0.05)', padding: '1rem 1.5rem 1.5rem', transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} className="lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'block', fontSize: '1.15rem',
                  fontWeight: isActive(link.href) ? 500 : 400,
                  color: isActive(link.href) ? '#ef7f17' : '#222222',
                  padding: '0.8rem 0', borderBottom: '1px solid rgba(0,0,0,0.04)',
                  textDecoration: 'none', fontFamily: 'var(--font-body)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${lang}/distribuidor`}
              style={{
                display: 'block', textAlign: 'center', fontSize: '1.2rem',
                color: '#ffffff', background: '#ef7f17', padding: '0.9rem',
                borderRadius: '7px', marginTop: '0.75rem', textDecoration: 'none',
                fontFamily: 'var(--font-display)', textTransform: 'uppercase',
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
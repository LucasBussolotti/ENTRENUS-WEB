"use client";

import { useEffect, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

const MOBILE_MENU_ID = 'navbar-mobile-menu'

const WAVE_PATH =
  'M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 ' +
  'C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 ' +
  'C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,0 L0,0 Z'

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true })
  return () => window.removeEventListener('scroll', onStoreChange)
}

function LanguageFlag({ lang }: { lang: string }) {
  return (
    <>
      {/* flagcdn es un CDN externo sin loader configurado en next.config */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lang === 'es' ? 'https://flagcdn.com/w40/ar.png' : 'https://flagcdn.com/w40/us.png'}
        alt=""
        width={20}
        height={14}
        className="block h-auto w-5 rounded-[2px]"
      />
      <span className="pt-0.5 text-[0.85rem] leading-none font-semibold tracking-[0.04em] text-[#222222]">
        {lang === 'es' ? 'AR' : 'US'}
      </span>
    </>
  )
}

export function Navbar() {
  const t = useTranslations('nav')
  const lang = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  // El menú guarda la ruta en la que se abrió en lugar de un booleano: al navegar,
  // pathname cambia y el menú se cierra solo, sin un efecto que sincronice estado.
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null)
  const mobileOpen = openedOnPath === pathname
  const closeMobile = () => setOpenedOnPath(null)

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  )

  const navLinks = [
    { href: `/${lang}`, label: t('inicio') },
    { href: `/${lang}/productos`, label: t('productos') },
    { href: `/${lang}/recetas`, label: t('recetas') },
    { href: `/${lang}/acerca_de`, label: t('quienesSomos') },
  ]

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es'
    router.push(pathname.replace(`/${lang}`, `/${newLang}`))
  }

  // El panel móvil ocupa el alto restante del viewport: hay que congelar el scroll
  // de la página o el fondo se desplaza por debajo del menú en iOS.
  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedOnPath(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === `/${lang}` : pathname.startsWith(href)

  const isHome = pathname === `/${lang}`

  return (
    <>
      {/* Reserva el alto de la barra fija. En home el hero pasa por debajo. */}
      {!isHome && <div aria-hidden="true" className="h-16 lg:h-20" />}

      <header
        style={{ fontFamily: 'var(--font-body)' }}
        className={`fixed inset-x-0 top-0 z-50 motion-safe:transition-shadow motion-safe:duration-300 ${
          scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.09)]' : 'shadow-none'
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-2 bg-[var(--color-navbar)] px-4 sm:px-6 lg:h-20 lg:px-8 xl:px-12">
          {/* Logo: alto proporcional a la barra en cada breakpoint, nunca la desborda */}
          <Link
            href={`/${lang}`}
            onClick={closeMobile}
            className="flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-naranja)]"
          >
            {/* sizes es obligatorio acá: sin él Next precarga la variante de 3840px
                para un logo que se muestra, como mucho, a 182px de ancho. */}
            <Image
              src="/images/LOGO.webp"
              alt="Entrenuts"
              width={1446}
              height={542}
              priority
              sizes="182px"
              className="block h-10 w-auto sm:h-11 lg:h-[3.75rem] xl:h-[4.25rem]"
            />
          </Link>

          {/* Navegación desktop: gaps y cuerpo ajustados para que a 1024px exactos no desborde */}
          <nav
            aria-label={t('inicio')}
            className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`inline-block rounded-sm px-1 py-2 text-base leading-snug tracking-[0.01em] whitespace-nowrap hover:text-[var(--color-naranja)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)] motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:scale-[1.08] xl:text-[1.2rem] ${
                  isActive(link.href)
                    ? 'font-bold text-[var(--color-naranja)]'
                    : 'font-normal text-[#333333]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones desktop */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t('changeLanguage')}
              className="flex h-11 items-center gap-2 rounded-md bg-black/6 px-3 transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)]"
            >
              <LanguageFlag lang={lang} />
            </button>

            <Link
              href={`/${lang}/distribuidor`}
              className="inline-flex h-11 items-center rounded-md bg-[var(--color-naranja)] px-4 text-base leading-none font-bold tracking-wide whitespace-nowrap text-white uppercase hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)] motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:scale-[1.08] xl:text-[1.1rem]"
            >
              {t('distribuidores')}
            </Link>
          </div>

          {/* Acciones móvil / tablet: ambos controles con área táctil de 44px */}
          <div className="flex shrink-0 items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t('changeLanguage')}
              className="flex h-11 items-center gap-1.5 rounded-md bg-black/6 px-2.5 transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)]"
            >
              <LanguageFlag lang={lang} />
            </button>
            <button
              type="button"
              onClick={() => setOpenedOnPath(mobileOpen ? null : pathname)}
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_MENU_ID}
              className="flex size-11 items-center justify-center rounded-md text-[#111111] transition-colors hover:bg-black/6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)]"
            >
              {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Onda decorativa: queda detrás de la barra y del panel abierto */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-[35px] -z-10 h-[35px] overflow-hidden leading-none"
        >
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="block size-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={WAVE_PATH} fill="var(--color-navbar)" />
          </svg>
        </div>

        {/* Panel móvil: scrollea dentro del viewport en lugar de crecer fuera de él */}
        {mobileOpen && (
          <div
            id={MOBILE_MENU_ID}
            className="max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain border-t border-black/5 bg-[var(--color-navbar)] px-6 pt-4 pb-6 lg:hidden"
          >
            <nav aria-label={t('openMenu')} className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`border-b border-black/5 py-3 text-[1.15rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)] ${
                    isActive(link.href)
                      ? 'font-medium text-[var(--color-naranja)]'
                      : 'font-normal text-[#222222]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href={`/${lang}/distribuidor`}
              onClick={closeMobile}
              style={{ fontFamily: 'var(--font-display)' }}
              className="mt-3 block rounded-[7px] bg-[var(--color-naranja)] px-4 py-3 text-center text-[1.2rem] text-white uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)]"
            >
              {t('distribuidores')}
            </Link>
          </div>
        )}
      </header>
    </>
  )
}

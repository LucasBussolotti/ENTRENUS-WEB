import type { Metadata } from 'next'

export const LOCALES = ['es', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'es'

// Sin barra final: las rutas se concatenan siempre con "/" inicial.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://entrenuts.com.ar').replace(/\/+$/, '')

export const SITE_NAME = 'Entrenuts'

export const SOCIAL_PROFILES = [
  'https://www.instagram.com/entrenuts/',
  'https://www.tiktok.com/@entrenuts',
  'https://www.facebook.com/Entrenuts/',
]

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** `path` es la ruta sin locale, con "/" inicial ("/" para la home). */
export function localizedPath(locale: Locale, path: string): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
}

/** Canonical propio y hreflang hacia la misma ruta en cada idioma. */
export function pageAlternates(locale: Locale, path: string): Metadata['alternates'] {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      es: localizedPath('es', path),
      en: localizedPath('en', path),
      'x-default': localizedPath(DEFAULT_LOCALE, path),
    },
  }
}

export const OG_LOCALES: Record<Locale, string> = { es: 'es_AR', en: 'en_US' }

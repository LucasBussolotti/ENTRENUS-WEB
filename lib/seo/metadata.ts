import type { Metadata } from 'next'
import { isLocale, localizedPath, OG_LOCALES, pageAlternates, SITE_NAME, type Locale } from '@/lib/seo/site'

// JPEG a propósito: varias redes sociales todavía no muestran og:image en WebP.
export const DEFAULT_OG_IMAGE = '/images/PRODSHERO3.jpeg'

interface PageMetadataInput {
  locale: Locale
  /** Ruta sin locale, con "/" inicial */
  path: string
  title: string
  description: string
  /** Ruta de imagen dentro de public/, con "/" inicial */
  image?: string
  /** El título ya incluye la marca: no se le agrega " | Entrenuts" */
  absoluteTitle?: boolean
}

/*
 * Open Graph y Twitter se arman completos en cada página: Next reemplaza (no
 * fusiona) el objeto openGraph del layout cuando una página define el suyo.
 */
export function pageMetadata({ locale, path, title, description, image, absoluteTitle }: PageMetadataInput): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  const images = [{ url: image ?? DEFAULT_OG_IMAGE }]
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: pageAlternates(locale, path),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      alternateLocale: locale === 'es' ? OG_LOCALES.en : OG_LOCALES.es,
      url: localizedPath(locale, path),
      title: socialTitle,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: images.map((i) => i.url),
    },
  }
}

/** Params de [locale] ya validados por el layout; esto solo estrecha el tipo. */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : 'es'
}

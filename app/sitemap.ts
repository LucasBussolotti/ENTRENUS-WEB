import type { MetadataRoute } from 'next'
import { getAllCatalogSlugs } from '@/lib/data/catalog'
import { CATALOG_KEYWORDS, SITEMAP_PRIORITY } from '@/lib/seo/keywords'
import { absoluteUrl, DEFAULT_LOCALE, LOCALES, localizedPath } from '@/lib/seo/site'

// /distribuidor/privado queda afuera: solo redirige a /distribuidor.
const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: '/', priority: 1 },
  { path: '/productos', priority: 0.9 },
  { path: '/recetas', priority: 0.6 },
  { path: '/acerca_de', priority: 0.6 },
  { path: '/distribuidor', priority: 0.5 },
  { path: '/empleos', priority: 0.4 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...STATIC_ROUTES,
    ...getAllCatalogSlugs().map((slug) => ({
      path: `/productos/${slug}`,
      priority: SITEMAP_PRIORITY[CATALOG_KEYWORDS[slug]?.priority ?? 'low'],
    })),
  ]

  return routes.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, absoluteUrl(localizedPath(l, path))])),
          'x-default': absoluteUrl(localizedPath(DEFAULT_LOCALE, path)),
        },
      },
    })),
  )
}

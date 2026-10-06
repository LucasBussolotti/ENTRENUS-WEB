import type { Faq } from '@/lib/data/faqs'
import type { Product } from '@/lib/data/products'
import { FLAVOR_PARAM, flavorSlug } from '@/lib/data/catalog'
import { absoluteUrl, localizedPath, SITE_NAME, SITE_URL, SOCIAL_PROFILES, type Locale } from '@/lib/seo/site'

type JsonLdObject = Record<string, unknown>

const ORGANIZATION_ID = `${SITE_URL}/#organization`

export function organizationJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/images/LOGO.webp'),
    sameAs: SOCIAL_PROFILES,
    // Único dato de ubicación aprobado en la planilla AEO ("nacida en Colón, Entre Ríos")
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Colón',
      addressRegion: 'Entre Ríos',
      addressCountry: 'AR',
    },
  }
}

export function websiteJsonLd(locale: Locale): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl(localizedPath(locale, '/')),
    inLanguage: locale,
    publisher: { '@id': ORGANIZATION_ID },
  }
}

export interface BreadcrumbItem {
  name: string
  /** Ruta localizada, p. ej. "/es/productos" */
  path: string
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Solo con las preguntas visibles en la página: Google exige que coincidan. */
export function faqPageJsonLd(items: Faq[], locale: Locale): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq[locale].question,
      acceptedAnswer: { '@type': 'Answer', text: faq[locale].answer },
    })),
  }
}

interface ProductJsonLdInput {
  name: string
  description: string
  path: string
  products: Product[]
  locale: Locale
}

/*
 * Sin `offers`: los mlUrl de products.ts apuntan a la tienda de Entrenuts en
 * Mercado Libre, no a cada publicación, y no sirven como oferta. Sin offers no hay fragmento enriquecido de producto, pero
 * el marcado sigue identificando marca, nombre e imágenes para buscadores y
 * motores de respuesta. Cuando haya URLs de publicación reales se agregan acá.
 */
export function productJsonLd({ name, description, path, products, locale }: ProductJsonLdInput): JsonLdObject {
  const images = products.flatMap((p) => p.images?.length ? p.images : [p.image]).map((src) => absoluteUrl(`/${src}`))
  const base: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': products.length > 1 ? 'ProductGroup' : 'Product',
    name,
    description,
    url: absoluteUrl(path),
    image: images,
    brand: { '@type': 'Brand', name: SITE_NAME },
    // El nodo Organization completo vive sólo en la home y Google no resuelve
    // @id entre páginas: sin nombre ni url la referencia quedaba vacía acá.
    manufacturer: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
    inLanguage: locale,
  }

  if (products.length > 1) {
    // schema.org no tiene una propiedad "flavor": para ese caso Google indica usar
    // el nombre, que ya distingue cada sabor ("Puffs proteicos Queso", …).
    const groupId = path.split('/').pop()
    return {
      ...base,
      productGroupID: groupId,
      variesBy: 'https://schema.org/name',
      hasVariant: products.map((p) => ({
        '@type': 'Product',
        inProductGroupWithID: groupId,
        name: `${name} ${locale === 'es' ? p.variantEs : p.variantEn}`.trim(),
        url: absoluteUrl(`${path}?${FLAVOR_PARAM}=${flavorSlug(p)}`),
        image: absoluteUrl(`/${p.images?.[0] ?? p.image}`),
      })),
    }
  }
  return base
}

import { FLAVOR_PARAM, flavorSlug, getPageProducts, getVariantColor, productName, productVariant, type ProductPage } from '@/lib/data/catalog'
import type { Locale } from '@/lib/seo/site'
import { localizedPath } from '@/lib/seo/site'

/**
 * Tarjetas de una ficha: una por producto. En las fichas que agrupan sabores
 * cada tarjeta abre la misma URL con su sabor elegido.
 */
export function productCards(page: ProductPage, locale: Locale, fallbackColor: string) {
  const items = getPageProducts(page)
  const href = localizedPath(locale, `/productos/${page.slug}`)
  return items.map((product) => ({
    key: product.id,
    href: items.length > 1 ? `${href}?${FLAVOR_PARAM}=${flavorSlug(product)}` : href,
    image: product.images?.[0] ?? product.image,
    name: productName(product, locale),
    detail: productVariant(product, locale),
    detailColor: getVariantColor(product, fallbackColor),
  }))
}

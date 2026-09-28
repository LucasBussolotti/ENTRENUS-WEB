import type { Locale } from '@/lib/seo/site'

/*
 * Keyword principal y prioridad por URL del catálogo, de
 * docs/seo/plantillas-marketing/01-seo-productos v2 (Catálogo 2026).xlsx.
 * No se emiten como <meta name="keywords"> (Google no la usa): guían títulos,
 * descripciones y encabezados en messages/*.json → seo.catalog.
 */

export type SeoPriority = 'high' | 'medium' | 'low'

export interface CatalogKeyword {
  keyword: Record<Locale, string>
  priority: SeoPriority
}

export const CATALOG_KEYWORDS: Record<string, CatalogKeyword> = {
  'pastas-de-mani': { keyword: { es: 'pasta de maní', en: 'peanut butter' }, priority: 'high' },
  'pasta-de-mani-natural': { keyword: { es: 'pasta de maní natural sin azúcar', en: 'natural peanut butter no sugar' }, priority: 'high' },
  'pasta-de-mani-crocante': { keyword: { es: 'pasta de maní crocante', en: 'crunchy peanut butter' }, priority: 'high' },
  'pasta-de-mani-cacao': { keyword: { es: 'pasta de maní con cacao', en: 'chocolate peanut butter' }, priority: 'medium' },
  'pasta-de-mani-stevia': { keyword: { es: 'pasta de maní con stevia', en: 'peanut butter with stevia' }, priority: 'medium' },
  'pasta-de-mani-coco': { keyword: { es: 'pasta de maní con coco', en: 'coconut peanut butter' }, priority: 'low' },
  protein: { keyword: { es: 'snacks proteicos', en: 'protein snacks' }, priority: 'high' },
  'untable-de-mani-proteico-cookies-and-cream': { keyword: { es: 'pasta de maní proteica', en: 'protein peanut butter' }, priority: 'high' },
  'untable-de-mani-proteico-salted-caramel': { keyword: { es: 'pasta de maní proteica salted caramel', en: 'salted caramel protein peanut butter' }, priority: 'medium' },
  'barritas-proteicas': { keyword: { es: 'barritas proteicas sin gluten', en: 'gluten-free protein bars' }, priority: 'high' },
  'barrita-proteica-choco-mani': { keyword: { es: 'barrita proteica vegana chocolate y maní', en: 'vegan chocolate peanut protein bar' }, priority: 'medium' },
  'barrita-proteica-naranchoc': { keyword: { es: 'barrita proteica vegana naranja y chocolate', en: 'vegan orange chocolate protein bar' }, priority: 'medium' },
  'barrita-proteica-frutilla-deli': { keyword: { es: 'barrita proteica de frutilla', en: 'strawberry protein bar' }, priority: 'low' },
  'barrita-proteica-lemon-pie': { keyword: { es: 'barrita proteica lemon pie', en: 'lemon pie protein bar' }, priority: 'low' },
  'puffs-proteicos': { keyword: { es: 'snack proteico horneado', en: 'baked protein snack' }, priority: 'high' },
  'pancakes-proteicos': { keyword: { es: 'premezcla pancakes proteicos sin gluten', en: 'gluten-free protein pancake mix' }, priority: 'high' },
  'aceite-de-coco': { keyword: { es: 'aceite de coco', en: 'coconut oil' }, priority: 'high' },
  'aceite-de-coco-neutro': { keyword: { es: 'aceite de coco neutro sin sabor', en: 'refined coconut oil' }, priority: 'high' },
  'aceite-de-coco-virgen': { keyword: { es: 'aceite de coco virgen sin refinar', en: 'unrefined virgin coconut oil' }, priority: 'high' },
  'aceite-mct': { keyword: { es: 'aceite MCT', en: 'MCT oil' }, priority: 'medium' },
  ghee: { keyword: { es: 'ghee manteca clarificada', en: 'ghee clarified butter' }, priority: 'medium' },
  miel: { keyword: { es: 'miel entrerriana', en: 'Argentine honey' }, priority: 'medium' },
  'miel-untable': { keyword: { es: 'miel cremosa untable', en: 'creamed honey' }, priority: 'medium' },
  'miel-liquida': { keyword: { es: 'miel pura líquida', en: 'pure liquid honey' }, priority: 'low' },
}

export const SITEMAP_PRIORITY: Record<SeoPriority, number> = { high: 0.8, medium: 0.6, low: 0.4 }

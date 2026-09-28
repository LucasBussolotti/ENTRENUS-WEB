import { products, type Product } from '@/lib/data/products'

/*
 * Estructura de URLs del catálogo (/productos/{slug}), según la planilla
 * docs/seo/plantillas-marketing/01-seo-productos. Los slugs se comparten entre
 * idiomas. Una ficha puede agrupar varios productos de products.ts cuando
 * marketing definió una sola URL para todos los sabores (Puffs, Pancakes).
 */

export type CatalogTabId = 'pastas' | 'aceites' | 'miel' | 'ghee' | 'barritas' | 'puffs' | 'pancakes'

export interface CatalogTab {
  id: CatalogTabId
  /** Clave dentro de productsPage.categories */
  labelKey: string
  color: string
  /** Página a la que lleva la pestaña */
  slug: string
}

export const CATALOG_TABS: CatalogTab[] = [
  { id: 'pastas', labelKey: 'peanutButters', color: '#ef7f17', slug: 'pastas-de-mani' },
  { id: 'aceites', labelKey: 'coconutOils', color: '#207a39', slug: 'aceite-de-coco' },
  { id: 'miel', labelKey: 'honey', color: '#f3bb29', slug: 'miel' },
  { id: 'ghee', labelKey: 'ghee', color: '#1a3445', slug: 'ghee' },
  { id: 'barritas', labelKey: 'proteinBars', color: '#325276', slug: 'barritas-proteicas' },
  { id: 'puffs', labelKey: 'proteinPuffs', color: '#008191', slug: 'puffs-proteicos' },
  { id: 'pancakes', labelKey: 'proteinPancakes', color: '#492b0a', slug: 'pancakes-proteicos' },
]

export interface CategoryPage {
  kind: 'category'
  slug: string
  /** Pestaña que se marca como activa. La categoría Protein no tiene pestaña propia. */
  tab?: CatalogTabId
  color: string
  productSlugs: string[]
}

export interface ProductPage {
  kind: 'product'
  slug: string
  tab: CatalogTabId
  /** Categoría para las migas de pan. Ghee no tiene categoría propia. */
  category?: string
  productIds: string[]
}

export type CatalogPage = CategoryPage | ProductPage

export const CATEGORY_PAGES: CategoryPage[] = [
  {
    kind: 'category',
    slug: 'pastas-de-mani',
    tab: 'pastas',
    color: '#ef7f17',
    productSlugs: [
      'pasta-de-mani-natural',
      'pasta-de-mani-crocante',
      'pasta-de-mani-stevia',
      'pasta-de-mani-cacao',
      'pasta-de-mani-coco',
      // Denominación legal "Untable de maní": en la web conviven con las pastas
      'untable-de-mani-proteico-cookies-and-cream',
      'untable-de-mani-proteico-salted-caramel',
    ],
  },
  {
    kind: 'category',
    slug: 'protein',
    color: '#325276',
    productSlugs: [
      'untable-de-mani-proteico-cookies-and-cream',
      'untable-de-mani-proteico-salted-caramel',
      'barrita-proteica-choco-mani',
      'barrita-proteica-naranchoc',
      'barrita-proteica-frutilla-deli',
      'barrita-proteica-lemon-pie',
      'puffs-proteicos',
      'pancakes-proteicos',
    ],
  },
  {
    kind: 'category',
    slug: 'barritas-proteicas',
    tab: 'barritas',
    color: '#325276',
    productSlugs: [
      'barrita-proteica-choco-mani',
      'barrita-proteica-naranchoc',
      'barrita-proteica-frutilla-deli',
      'barrita-proteica-lemon-pie',
    ],
  },
  {
    kind: 'category',
    slug: 'aceite-de-coco',
    tab: 'aceites',
    color: '#207a39',
    productSlugs: ['aceite-de-coco-neutro', 'aceite-de-coco-virgen', 'aceite-mct'],
  },
  {
    kind: 'category',
    slug: 'miel',
    tab: 'miel',
    color: '#f3bb29',
    productSlugs: ['miel-untable', 'miel-liquida'],
  },
]

export const PRODUCT_PAGES: ProductPage[] = [
  { kind: 'product', slug: 'pasta-de-mani-natural', tab: 'pastas', category: 'pastas-de-mani', productIds: ['pasta-mani-natural'] },
  { kind: 'product', slug: 'pasta-de-mani-crocante', tab: 'pastas', category: 'pastas-de-mani', productIds: ['pasta-mani-crocante'] },
  { kind: 'product', slug: 'pasta-de-mani-stevia', tab: 'pastas', category: 'pastas-de-mani', productIds: ['pasta-mani-stevia'] },
  { kind: 'product', slug: 'pasta-de-mani-cacao', tab: 'pastas', category: 'pastas-de-mani', productIds: ['pasta-mani-cacao'] },
  { kind: 'product', slug: 'pasta-de-mani-coco', tab: 'pastas', category: 'pastas-de-mani', productIds: ['pasta-mani-coco'] },
  { kind: 'product', slug: 'untable-de-mani-proteico-cookies-and-cream', tab: 'pastas', category: 'protein', productIds: ['pasta-mani-cc'] },
  { kind: 'product', slug: 'untable-de-mani-proteico-salted-caramel', tab: 'pastas', category: 'protein', productIds: ['pasta-mani-salted'] },
  { kind: 'product', slug: 'barrita-proteica-choco-mani', tab: 'barritas', category: 'barritas-proteicas', productIds: ['barras-proteicas-choco'] },
  { kind: 'product', slug: 'barrita-proteica-naranchoc', tab: 'barritas', category: 'barritas-proteicas', productIds: ['barras-proteicas-coco'] },
  { kind: 'product', slug: 'barrita-proteica-frutilla-deli', tab: 'barritas', category: 'barritas-proteicas', productIds: ['barras-proteicas-frutilla'] },
  { kind: 'product', slug: 'barrita-proteica-lemon-pie', tab: 'barritas', category: 'barritas-proteicas', productIds: ['barras-proteicas-lemon'] },
  {
    kind: 'product',
    slug: 'puffs-proteicos',
    tab: 'puffs',
    category: 'protein',
    productIds: ['puffs-queso', 'puffs-ceb-crema', 'puffs-mostaza-miel', 'puffs-barbacoa'],
  },
  {
    kind: 'product',
    slug: 'pancakes-proteicos',
    tab: 'pancakes',
    category: 'protein',
    productIds: ['premezcla-vainilla', 'premezcla-queso', 'premezcla-chocolate'],
  },
  { kind: 'product', slug: 'aceite-de-coco-neutro', tab: 'aceites', category: 'aceite-de-coco', productIds: ['aceite-coco-neutro'] },
  { kind: 'product', slug: 'aceite-de-coco-virgen', tab: 'aceites', category: 'aceite-de-coco', productIds: ['aceite-coco-virgen'] },
  { kind: 'product', slug: 'aceite-mct', tab: 'aceites', category: 'aceite-de-coco', productIds: ['aceite-coco-mct'] },
  { kind: 'product', slug: 'ghee', tab: 'ghee', productIds: ['ghee'] },
  { kind: 'product', slug: 'miel-untable', tab: 'miel', category: 'miel', productIds: ['miel-untable'] },
  { kind: 'product', slug: 'miel-liquida', tab: 'miel', category: 'miel', productIds: ['miel-liquida'] },
]

/**
 * Secciones de /productos, en el orden que pidió marketing. La categoría Protein
 * no tiene sección propia: sus fichas ya aparecen en Pastas, Barritas, Puffs y Pancakes.
 */
export const OVERVIEW_TABS: CatalogTabId[] = ['pastas', 'aceites', 'barritas', 'puffs', 'pancakes', 'miel', 'ghee']

const productsById = new Map(products.map((p) => [p.id, p]))

export function getCatalogPage(slug: string): CatalogPage | undefined {
  return CATEGORY_PAGES.find((c) => c.slug === slug) ?? PRODUCT_PAGES.find((p) => p.slug === slug)
}

export function getProductPage(slug: string): ProductPage | undefined {
  return PRODUCT_PAGES.find((p) => p.slug === slug)
}

export function getCategoryPage(slug: string): CategoryPage | undefined {
  return CATEGORY_PAGES.find((c) => c.slug === slug)
}

export function getTab(id: CatalogTabId): CatalogTab {
  const tab = CATALOG_TABS.find((t) => t.id === id)
  if (!tab) throw new Error(`Pestaña de catálogo desconocida: ${id}`)
  return tab
}

export function getPageProducts(page: ProductPage): Product[] {
  return page.productIds.map((id) => {
    const product = productsById.get(id)
    if (!product) throw new Error(`catalog.ts referencia un producto inexistente: ${id}`)
    return product
  })
}

/** Primera imagen de la ficha: se usa en tarjetas, miniaturas y Open Graph. */
export function getPageCover(page: ProductPage): string {
  const first = getPageProducts(page)[0]
  return first.images?.[0] ?? first.image
}

export function getAllCatalogSlugs(): string[] {
  return [...CATEGORY_PAGES.map((c) => c.slug), ...PRODUCT_PAGES.map((p) => p.slug)]
}

// Pisan el color del producto en el nombre de la variante (así se ven hoy las pastas).
const VARIANT_COLORS: Record<string, string> = {
  Crocante: '#d82e2e',
  Stevia: '#8cc63f',
  Cacao: '#5e3a24',
  Coco: '#00a9e0',
  Proteína: '#6b6b6b',
  Natural: '#ef7f17',
  'PROTEIN Cookies & Cream': '#800080',
  'PROTEIN Salted Caramel': '#ff8c00',
  'Cebolla a la crema': '#009aa6',
  'Mostaza y miel': '#f0b323',
  Barbacoa: '#8e2434',
  Vainilla: '#c9a227',
  Chocolate: '#4a3228',
}

export function getVariantColor(product: Product, fallback: string): string {
  return (product.variantEs && VARIANT_COLORS[product.variantEs]) || product.color || fallback
}

type Lang = 'es' | 'en'

export function productName(product: Product, lang: Lang): string {
  return lang === 'es' ? product.nameEs : product.nameEn
}

export function productVariant(product: Product, lang: Lang): string | undefined {
  return (lang === 'es' ? product.variantEs : product.variantEn) || undefined
}

/**
 * Las fichas que agrupan sabores (Puffs, Pancakes) tienen una sola URL; el sabor
 * se elige con ?sabor=cebolla-a-la-crema. El canonical sigue siendo la URL sin
 * parámetro, así que para Google es una única página.
 */
export const FLAVOR_PARAM = 'sabor'

export function flavorSlug(product: Product): string {
  return (product.variantEs || product.id)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Nombre de la ficha: con variante si es un solo producto, sin ella si agrupa sabores. */
export function pageDisplayName(page: ProductPage, lang: Lang): string {
  const items = getPageProducts(page)
  const name = productName(items[0], lang)
  const variant = items.length === 1 ? productVariant(items[0], lang) : undefined
  return variant ? `${name} ${variant}` : name
}

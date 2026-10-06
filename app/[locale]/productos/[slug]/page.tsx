import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import { ProductCard } from '@/components/catalog/ProductCard'
import { productCards } from '@/components/catalog/productCardProps'
import { FaqSection } from '@/components/FaqSection'
import { JsonLd } from '@/components/JsonLd'
import {
  getAllCatalogSlugs,
  getCatalogPage,
  getCategoryPage,
  getPageCover,
  getPageProducts,
  getProductPage,
  getTab,
  pageDisplayName,
  type CategoryPage,
  type ProductPage,
} from '@/lib/data/catalog'
import { getPublishedFaqs } from '@/lib/data/faqs'
import { productJsonLd, type BreadcrumbItem } from '@/lib/seo/jsonld'
import { pageMetadata, toLocale } from '@/lib/seo/metadata'
import { LOCALES, localizedPath, type Locale } from '@/lib/seo/site'
import { ProductDetail, ProductDetailWithFlavor, type SiblingPage } from '../ProductDetail'

type Params = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getAllCatalogSlugs().map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = toLocale(rawLocale)
  const page = getCatalogPage(slug)
  if (!page) return {}

  const t = await getTranslations({ locale, namespace: `seo.catalog.${slug}` })
  const coverPage = page.kind === 'product' ? page : getProductPage(page.productSlugs[0])!
  return pageMetadata({
    locale,
    path: `/productos/${slug}`,
    title: t('title'),
    description: t('description'),
    image: `/${getPageCover(coverPage)}`,
    noindex: page.kind === 'category' && page.noindex,
  })
}

export default async function CatalogSlugPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params
  const locale = toLocale(rawLocale)
  setRequestLocale(locale)
  const page = getCatalogPage(slug)
  if (!page) notFound()

  return page.kind === 'category' ? <CategoryView page={page} locale={locale} /> : <ProductView page={page} locale={locale} />
}

async function baseCrumbs(locale: Locale): Promise<BreadcrumbItem[]> {
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  return [
    { name: tNav('inicio'), path: localizedPath(locale, '/') },
    { name: tNav('productos'), path: localizedPath(locale, '/productos') },
  ]
}

async function CategoryView({ page, locale }: { page: CategoryPage; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'productsPage' })
  const tCategory = await getTranslations({ locale, namespace: `seo.catalog.${page.slug}` })
  const title = tCategory('h1')
  const pages = page.productSlugs.map((s) => getProductPage(s)!)

  return (
    <>
      <Breadcrumbs
        label={t('breadcrumbLabel')}
        className="mb-6"
        items={[...(await baseCrumbs(locale)), { name: title, path: localizedPath(locale, `/productos/${page.slug}`) }]}
      />

      <header className="mb-10 md:mb-12">
        <h1 className="font-display text-4xl leading-none font-black uppercase md:text-6xl" style={{ color: page.color }}>
          {title}
        </h1>
        {/* La descripción aprobada en el plan SEO (seo.catalog) también se muestra:
            sin ella la categoría era sólo una grilla, sin texto para buscadores. */}
        <p className="mt-4 text-base font-medium text-gray-600 md:text-lg">{tCategory('description')}</p>
      </header>

      <section aria-label={t('productsIn', { category: title })}>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {pages.flatMap((p) =>
            productCards(p, locale, page.color).map(({ key, ...card }) => (
              <li key={key}>
                <ProductCard {...card} badge={t('glutenFree')} />
              </li>
            )),
          )}
        </ul>
      </section>

      <FaqSection
        faqs={getPublishedFaqs(page.slug)}
        locale={locale}
        title={t('faqTitle')}
        accentColor={page.color}
        className="mt-16 max-w-3xl md:mt-20"
      />
    </>
  )
}

async function ProductView({ page, locale }: { page: ProductPage; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'productsPage' })
  const tMeta = await getTranslations({ locale, namespace: `seo.catalog.${page.slug}` })
  const tab = getTab(page.tab)
  const products = getPageProducts(page)
  const name = pageDisplayName(page, locale)
  const path = localizedPath(locale, `/productos/${page.slug}`)

  // Miniaturas: las demás fichas de la lista a la que lleva la pestaña
  const tabCategory = getCategoryPage(tab.slug)
  const siblings: SiblingPage[] = (tabCategory?.productSlugs ?? []).map((s) => {
    const sibling = getProductPage(s)!
    return {
      slug: sibling.slug,
      href: localizedPath(locale, `/productos/${sibling.slug}`),
      label: pageDisplayName(sibling, locale),
      image: getPageCover(sibling),
    }
  })

  const crumbs = await baseCrumbs(locale)
  if (page.category) {
    const tCategory = await getTranslations({ locale, namespace: `seo.catalog.${page.category}` })
    crumbs.push({ name: tCategory('h1'), path: localizedPath(locale, `/productos/${page.category}`) })
  }
  crumbs.push({ name, path })

  const detailProps = { products, color: tab.color, currentSlug: page.slug, siblings }

  return (
    <>
      <Breadcrumbs label={t('breadcrumbLabel')} className="mb-6" items={crumbs} />

      {products.length > 1 ? (
        // useSearchParams obliga a un Suspense en una página estática. El HTML del
        // servidor sale del fallback, así que es la ficha completa en su primer sabor.
        <Suspense fallback={<ProductDetail {...detailProps} />}>
          <ProductDetailWithFlavor {...detailProps} />
        </Suspense>
      ) : (
        <ProductDetail {...detailProps} />
      )}

      <FaqSection
        faqs={getPublishedFaqs(page.slug)}
        locale={locale}
        title={t('faqTitle')}
        accentColor={tab.color}
        className="mt-16 max-w-3xl md:mt-20"
      />

      <JsonLd data={productJsonLd({ name, description: tMeta('description'), path, products, locale })} />
    </>
  )
}

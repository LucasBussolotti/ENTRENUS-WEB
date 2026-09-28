import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import {
  getCategoryPage,
  getProductPage,
  getTab,
  OVERVIEW_TABS,
  type ProductPage,
} from '@/lib/data/catalog'
import { pageMetadata, toLocale } from '@/lib/seo/metadata'
import { localizedPath } from '@/lib/seo/site'
import { productCards } from '@/components/catalog/productCardProps'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = await getTranslations({ locale, namespace: 'seo.pages.productos' })
  return pageMetadata({ locale, path: '/productos', title: t('title'), description: t('description') })
}

interface OverviewSection {
  key: string
  title: string
  href: string
  color: string
  pages: ProductPage[]
}

export default async function ProductosPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale)
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'productsPage' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const tTabs = await getTranslations({ locale, namespace: 'productsPage.categories' })

  // Cada pestaña lleva a una categoría (grilla de fichas) o directo a una ficha (Puffs, Pancakes, Ghee)
  const sections: OverviewSection[] = OVERVIEW_TABS.map((id) => {
    const tab = getTab(id)
    const category = getCategoryPage(tab.slug)
    return {
      key: tab.slug,
      title: tTabs(tab.labelKey),
      href: localizedPath(locale, `/productos/${tab.slug}`),
      color: tab.color,
      pages: category ? category.productSlugs.map((s) => getProductPage(s)!) : [getProductPage(tab.slug)!],
    }
  })

  return (
    <>
      <Breadcrumbs
        label={t('breadcrumbLabel')}
        className="mb-6"
        items={[
          { name: tNav('inicio'), path: localizedPath(locale, '/') },
          { name: tNav('productos'), path: localizedPath(locale, '/productos') },
        ]}
      />

      <header className="mb-10 md:mb-14">
        <h1 className="font-display text-4xl leading-none font-black text-[var(--color-naranja)] uppercase md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-gray-600 md:text-lg">{t('sub')}</p>
      </header>

      <div className="flex flex-col gap-14 md:gap-20">
        {sections.map((section) => (
          <section key={section.key} aria-labelledby={`section-${section.key}`}>
            <h2 id={`section-${section.key}`} className="mb-6">
              <Link
                href={section.href}
                className="font-display group inline-flex items-center gap-2 rounded-sm text-2xl leading-none font-black uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:text-4xl"
                style={{ color: section.color }}
              >
                {section.title}
                <ArrowUpRight aria-hidden="true" className="size-6 motion-safe:transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 md:size-8" />
              </Link>
            </h2>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {section.pages.flatMap((page) =>
                productCards(page, locale, section.color).map(({ key, ...card }) => (
                  <li key={key}>
                    <ProductCard {...card} badge={t('glutenFree')} />
                  </li>
                )),
              )}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

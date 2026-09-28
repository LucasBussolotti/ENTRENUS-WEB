import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CatalogTabs } from '@/components/catalog/CatalogTabs'
import { CATALOG_TABS, CATEGORY_PAGES, PRODUCT_PAGES } from '@/lib/data/catalog'

export default async function ProductosLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'productsPage.categories' })

  const tabs = CATALOG_TABS.map((tab) => ({ id: tab.id, label: t(tab.labelKey), color: tab.color, slug: tab.slug }))
  const tabBySlug: Record<string, string> = {}
  for (const page of [...CATEGORY_PAGES, ...PRODUCT_PAGES]) {
    if (page.tab) tabBySlug[page.slug] = page.tab
  }

  return (
    <section className="w-full bg-[var(--color-navbar)] min-h-screen py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto relative">
        <CatalogTabs locale={locale} tabs={tabs} tabBySlug={tabBySlug} />
        {children}
      </div>
    </section>
  )
}

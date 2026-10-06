import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import { pageMetadata, toLocale } from '@/lib/seo/metadata'
import { localizedPath } from '@/lib/seo/site'
import { RecipesClient } from './RecipesClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = await getTranslations({ locale, namespace: 'seo.pages.recetas' })
  return pageMetadata({ locale, path: '/recetas', title: t('title'), description: t('description') })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale)
  setRequestLocale(locale)
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const tProducts = await getTranslations({ locale, namespace: 'productsPage' })

  return (
    <RecipesClient
      breadcrumbs={
        <Breadcrumbs
          label={tProducts('breadcrumbLabel')}
          className="mb-6"
          items={[
            { name: tNav('inicio'), path: localizedPath(locale, '/') },
            { name: tNav('recetas'), path: localizedPath(locale, '/recetas') },
          ]}
        />
      }
    />
  )
}

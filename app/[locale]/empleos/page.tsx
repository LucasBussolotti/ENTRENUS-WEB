import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageMetadata, toLocale } from '@/lib/seo/metadata'
import { EmploymentClient } from './EmploymentClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = await getTranslations({ locale, namespace: 'seo.pages.empleos' })
  return pageMetadata({ locale, path: '/empleos', title: t('title'), description: t('description') })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(toLocale((await params).locale))
  return <EmploymentClient />
}

import { HeroCarousel } from '@/components/HeroCarousel'
import { ProductMosaic2 } from '@/components/ProductMosaic2'
import { ValueProposition } from '@/components/ValueProposition'
import { ReviewsSection } from '@/components/ReviewsSection'
import { CommunityCTA } from '@/components/CommunityCTA'
import { WaveDivider } from '@/components/WaveDivider'
import { use } from 'react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JsonLd } from '@/components/JsonLd'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld'
import { pageMetadata, toLocale } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = await getTranslations({ locale, namespace: 'seo.pages.home' })
  return pageMetadata({ locale, path: '/', title: t('title'), description: t('description'), absoluteTitle: true })
}

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale(use(params).locale)
  setRequestLocale(locale)
  return (
    <div className="relative w-full flex flex-col overflow-x-clip">
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(locale)]} />
      <HeroCarousel />
      
      <ProductMosaic2 />
      
      {/* ── 1. Ahora primero van los REELS Y OPINIONES ── */}
      <WaveDivider fromColor="var(--color-navbar)" toColor="#e8ddca" height={40} />
      <ReviewsSection />
      
      {/* ── 2. Después va el MENSAJE / PROPUESTA DE VALOR ── */}
      <WaveDivider fromColor="#e8ddca" toColor="#111111" height={35} />
      <ValueProposition />
      
      {/* ── 3. Finalmente la comunidad ── */}
      <WaveDivider fromColor="#111111" toColor="#1A1207" height={40} />
      <CommunityCTA />
    </div>
  )
}
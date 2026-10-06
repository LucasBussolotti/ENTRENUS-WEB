import { ArrowUpRight, ShoppingBag, Star } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { ReelCard, type Reel } from '@/components/ReelCard'
import { productName, productVariant } from '@/lib/data/catalog'
import { products } from '@/lib/data/products'
import { reviews, type MarketplaceReview } from '@/lib/data/reviews'

// Videos propios en public/images/REELS: se reproducen dentro de la tarjeta.
const reels: Reel[] = [
  { titleKey: 'reel1Title', slug: 'REEL1' },
  { titleKey: 'reel2Title', slug: 'REEL3' },
  { titleKey: 'reel3Title', slug: 'REEL5' },
  { titleKey: 'reel4Title', slug: 'REEL7' },
]

function ReviewCard({ review }: { review: MarketplaceReview }) {
  const t = useTranslations('reviews')
  const lang = useLocale() === 'en' ? 'en' : 'es'
  const product = products.find((p) => p.id === review.productId)
  if (!product) throw new Error(`reviews.ts referencia un producto inexistente: ${review.productId}`)
  const variant = productVariant(product, lang)
  const name = variant ? `${productName(product, lang)} ${variant}` : productName(product, lang)

  return (
    <article className="flex w-full flex-col rounded-2xl border border-[#ebebeb] bg-white p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="flex gap-0.5" role="img" aria-label={t('ratingAria', { count: review.rating })}>
          {Array.from({ length: 5 }).map((_, s) => (
            <Star
              key={s}
              size={16}
              aria-hidden="true"
              fill={s < review.rating ? '#ef7f17' : 'none'}
              color={s < review.rating ? '#ef7f17' : '#C9C2B6'}
            />
          ))}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-[0.7rem] font-semibold text-[#6B6B6B]">
          <ShoppingBag size={12} aria-hidden="true" /> Mercado Libre
        </span>
      </div>

      {/* Texto original del comprador: siempre en español */}
      <p lang="es" className="mb-6 text-[0.95rem] leading-relaxed whitespace-pre-line text-[#333333]">
        {review.text}
      </p>

      <a
        href={review.listingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-auto inline-flex items-start gap-1 self-start rounded-sm text-[0.85rem] font-bold text-[#111111] no-underline hover:text-[var(--color-naranja)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)]"
      >
        <span>
          {name}
          <span className="sr-only"> — {t('listingLink')}</span>
        </span>
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="mt-px shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
        />
      </a>
    </article>
  )
}

export function ReviewsSection() {
  const t = useTranslations('reviews')

  return (
    <section className="bg-footpage px-4 py-[clamp(4rem,8vw,7rem)] sm:px-6 lg:px-[clamp(2rem,5vw,4rem)]">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8 md:mb-12">
          <h2 className="font-display mb-1.5 text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] text-[#111111] uppercase">
            {t('sectionTitle')}
          </h2>
          {/* #7A6F64 sobre #e8ddca daba 3.6:1; #635B50 llega a 4.8:1 */}
          <p className="text-base text-[#635B50]">{t('sectionSub')}</p>
        </header>

        <ul className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mb-20">
          {reviews.map((review) => (
            <li key={review.id} className="flex">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>

        {/* En móvil los reels van en grilla de 2: en fila apilada cada uno medía
            ~555px de alto y los cuatro sumaban más de 2000px de scroll. */}
        <div className="grid grid-cols-2 gap-3 md:flex md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-4">
          {reels.map((reel) => (
            <ReelCard
              key={reel.titleKey}
              reel={reel}
              title={t(reel.titleKey)}
              playLabel={t('playReel', { title: t(reel.titleKey) })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

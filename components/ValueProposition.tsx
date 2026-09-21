import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function ValueProposition() {
  const t = useTranslations('quote')

  return (
    <section className="bg-[#111111] px-[clamp(1.25rem,5vw,4rem)] pt-[clamp(4rem,8vw,6rem)] pb-[clamp(2rem,4vw,4rem)]">
      <div className="mx-auto max-w-[900px] text-center">
        <blockquote className="mb-8 text-[clamp(1.25rem,4vw,2.4rem)] leading-relaxed text-balance text-white/92 italic md:mb-10">
          {t('text')}
        </blockquote>

        <div>
          <p className="mb-2 text-[clamp(1rem,2.5vw,1.3rem)] font-bold tracking-[0.05em] text-naranja uppercase">
            {t('author')}
          </p>
          {/* white/50 sobre #111 daba 4.1:1; white/70 llega a ~7:1 */}
          <p className="mb-12 text-base text-white/70 md:mb-16">{t('tagline')}</p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/SellosBlanco5.webp"
            alt={t('sealsAlt')}
            width={1754}
            height={320}
            sizes="(max-width: 900px) 90vw, 900px"
            className="block h-auto max-h-[70px] w-auto max-w-[90%] object-contain opacity-85 sm:max-h-[95px] md:max-h-[120px]"
          />
        </div>
      </div>
    </section>
  )
}

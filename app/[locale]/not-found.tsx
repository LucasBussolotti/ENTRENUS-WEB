import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

// not-found no recibe params ni puede exportar metadata: el <title> va en el cuerpo
// y React lo sube al <head>. Next ya agrega noindex a las respuestas 404.
export default function NotFound() {
  const t = useTranslations('notFound')
  const locale = useLocale()

  return (
    <section className="flex min-h-[60svh] items-center bg-[var(--color-navbar)] px-4 py-20 md:px-8">
      <title>{`${t('title')} | Entrenuts`}</title>
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="font-display text-6xl leading-none font-black text-[var(--color-naranja)] md:text-8xl">404</p>
        <h1 className="font-display mt-4 text-3xl leading-none font-black text-[var(--text-dark)] uppercase md:text-5xl">
          {t('heading')}
        </h1>
        <p className="mt-4 max-w-xl text-base font-medium text-gray-600 md:text-lg">{t('text')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${locale}`}
            className="inline-flex min-h-12 items-center rounded-full bg-[var(--text-dark)] px-6 font-bold text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-dark)]"
          >
            {t('home')}
          </Link>
          <Link
            href={`/${locale}/productos`}
            className="inline-flex min-h-12 items-center rounded-full border-2 border-[var(--text-dark)] px-6 font-bold text-[var(--text-dark)] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-dark)]"
          >
            {t('products')}
          </Link>
        </div>
      </div>
    </section>
  )
}

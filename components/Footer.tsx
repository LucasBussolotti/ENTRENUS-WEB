import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

const CONTACT_LINES = [
  { text: 'Pte. Illia 124, Colón Entre Ríos', href: null },
  { text: 'contacto@entrenuts.com.ar', href: 'mailto:contacto@entrenuts.com.ar' },
  { text: 'venta@entrenuts.com.ar', href: 'mailto:venta@entrenuts.com.ar' },
  { text: '(3447) 469008', href: 'tel:+543447469008' },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/entrenuts/' },
  { label: 'Tiktok', href: 'https://www.tiktok.com/@entrenuts' },
  { label: 'Facebook', href: 'https://www.facebook.com/Entrenuts/?locale=es_LA' },
]

const linkClass =
  'inline-block rounded-sm py-1 text-base text-[#111111] no-underline hover:text-naranja hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-naranja'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  const companyLinks = [
    { to: '/acerca_de', label: t('quienesSomos') },
    { to: '/productos', label: t('productos') },
    { to: '/distribuidor', label: t('distribuidores') },
    { to: '/empleos', label: t('trabajaConNosotros') },
  ]

  return (
    <footer className="bg-footpage px-[clamp(1.25rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] text-[#111111]">
      {/* auto-fit + minmax ya resolvía bien el colapso; el mínimo baja de 200px a
          180px para que a 320px la columna no fuerce ancho extra. */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-8 md:gap-12">
        <div>
          <Image
            src="/images/LOGO.webp"
            alt={t('logoAlt')}
            width={1446}
            height={542}
            sizes="192px"
            className="mb-4 block h-12 w-auto sm:h-14 md:h-[4.5rem]"
          />
          <p className="text-lg leading-relaxed font-semibold text-balance sm:text-xl">
            {t('tagline')}
          </p>
        </div>

        <nav aria-labelledby="footer-empresa">
          <h2 id="footer-empresa" className="mb-3 text-xl font-bold">{t('empresa')}</h2>
          <ul className="list-none p-0">
            {companyLinks.map(({ to, label }) => (
              <li key={to}>
                <Link href={`/${locale}${to}`} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="footer-contacto">
          <h2 id="footer-contacto" className="mb-3 text-xl font-bold">{t('contacto')}</h2>
          <ul className="list-none p-0">
            {CONTACT_LINES.map(({ text, href }) => (
              <li key={text} className="break-words">
                {href ? (
                  <a href={href} className={linkClass}>{text}</a>
                ) : (
                  <span className="inline-block py-1 text-base">{text}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-redes">
          <h2 id="footer-redes" className="mb-3 text-xl font-bold">{t('redes')}</h2>
          <ul className="list-none p-0">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mx-auto mt-10 max-w-[1200px] text-sm">
        <p>{t('rights')}</p>
      </div>
    </footer>
  )
}

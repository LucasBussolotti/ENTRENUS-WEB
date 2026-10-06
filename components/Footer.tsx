import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { CONTACT } from '@/lib/data/contact'

const CONTACT_LINES = [
  { text: CONTACT.address, href: null },
  { text: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { text: CONTACT.phone.display, href: CONTACT.phone.href },
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
          {/* LOGO.webp trae márgenes transparentes que corrían el logo respecto del
              lema; esta versión está recortada al contorno, así que alto y márgenes
              reproducen el tamaño y la posición vertical que tenía. */}
          <Image
            src="/images/LOGO-recortado.webp"
            alt={t('logoAlt')}
            width={1099}
            height={190}
            sizes="150px"
            className="mt-3.5 mb-8 block h-[1.05rem] w-auto sm:mt-4 sm:mb-9 sm:h-[1.225rem] md:mt-5 md:mb-10 md:h-[1.575rem]"
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

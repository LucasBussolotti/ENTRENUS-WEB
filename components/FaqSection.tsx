import { ChevronDown } from 'lucide-react'
import type { Faq } from '@/lib/data/faqs'
import type { Locale } from '@/lib/seo/site'
import { faqPageJsonLd } from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/JsonLd'

interface FaqSectionProps {
  faqs: Faq[]
  locale: Locale
  title: string
  /** Color de acento de la sección (títulos e ícono) */
  accentColor?: string
  className?: string
}

/*
 * <details>/<summary>: se abre con teclado y lectores de pantalla sin JS, y la
 * respuesta queda en el HTML aunque esté cerrada, que es lo que leen buscadores
 * y motores de respuesta. El JSON-LD va junto para que siempre coincida con lo
 * visible.
 */
export function FaqSection({ faqs, locale, title, accentColor = 'var(--color-naranja)', className = '' }: FaqSectionProps) {
  if (faqs.length === 0) return null

  return (
    <section aria-labelledby="faq-title" className={className}>
      <h2
        id="faq-title"
        className="font-display mb-6 text-2xl leading-none font-black uppercase md:text-4xl"
        style={{ color: accentColor }}
      >
        {title}
      </h2>
      <div className="divide-y divide-black/10 border-y border-black/10">
        {faqs.map((faq) => (
          <details key={faq.id} className="group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-bold text-[var(--text-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:text-lg [&::-webkit-details-marker]:hidden">
              <span>{faq[locale].question}</span>
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180"
                style={{ color: accentColor }}
              />
            </summary>
            <p className="pb-5 text-base leading-relaxed text-gray-700 md:text-lg">{faq[locale].answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqPageJsonLd(faqs, locale)} />
    </section>
  )
}

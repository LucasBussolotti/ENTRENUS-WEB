import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbJsonLd, type BreadcrumbItem } from '@/lib/seo/jsonld'

interface BreadcrumbsProps {
  /** El último elemento es la página actual */
  items: BreadcrumbItem[]
  label: string
  className?: string
}

export function Breadcrumbs({ items, label, className = '' }: BreadcrumbsProps) {
  return (
    <>
      <nav aria-label={label} className={className}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-[#635B50]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="font-bold text-[var(--text-dark)]">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className="inline-flex min-h-6 items-center rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  )
}

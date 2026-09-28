import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { GlutenFreeBadge } from '@/components/catalog/GlutenFreeBadge'

interface ProductCardProps {
  href: string
  image: string
  name: string
  /** Segunda línea: sabor, o cantidad de sabores en las fichas que los agrupan */
  detail?: string
  detailColor: string
  /** Texto del sello "Sin gluten" */
  badge: string
}

export function ProductCard({ href, image, name, detail, detailColor, badge }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[1.5rem] bg-white p-4 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-safe:transition-shadow motion-safe:duration-300 hover:shadow-md md:p-5"
    >
      <div className="relative aspect-square w-full">
        <GlutenFreeBadge label={badge} height={40} className="absolute top-0 left-0 z-10" />
        {/* El nombre ya está en el enlace: la foto es decorativa */}
        <ImageWithFallback
          src={`/${image}`}
          alt=""
          sizes="(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 260px"
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
        />
      </div>
      <h3 className="font-display mt-4 text-lg leading-none font-black text-[var(--text-dark)] uppercase text-balance md:text-xl">
        {name}
      </h3>
      {detail && (
        <p className="font-display mt-1.5 text-base leading-tight font-black uppercase md:text-lg" style={{ color: detailColor }}>
          {detail}
        </p>
      )}
    </Link>
  )
}

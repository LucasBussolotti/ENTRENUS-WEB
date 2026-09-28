import Image from 'next/image'

interface GlutenFreeBadgeProps {
  /** Texto alternativo del sello ("Sin gluten") */
  label: string
  /** Alto en px. El archivo mide 57×63: por encima de eso se vería borroso. */
  height?: number
  className?: string
}

/*
 * Marketing confirmó (28/09) que toda la línea es sin gluten, por eso el sello va
 * en todos los productos. Es el sello "Sin gluten" de la marca, no el símbolo
 * oficial Sin TACC.
 */
export function GlutenFreeBadge({ label, height = 63, className = '' }: GlutenFreeBadgeProps) {
  return (
    <Image
      src="/images/MINISINGLUTEN.webp"
      alt={label}
      width={Math.round((height * 57) / 63)}
      height={height}
      // 1 KB: optimizarlo no ahorra nada y el servidor lo reescalaría sin necesidad
      unoptimized
      className={`block ${className}`}
    />
  )
}

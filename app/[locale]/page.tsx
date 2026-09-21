import { HeroCarousel } from '@/components/HeroCarousel'
import { ProductMosaic2 } from '@/components/ProductMosaic2'
import { ValueProposition } from '@/components/ValueProposition'
import { ReviewsSection } from '@/components/ReviewsSection'
import { CommunityCTA } from '@/components/CommunityCTA'
import { WaveDivider } from '@/components/WaveDivider'

export default function HomePage() {
  return (
    <div className="relative w-full flex flex-col overflow-x-clip">
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
import { HeroCarousel } from '@/components/HeroCarousel'
import { ProductMosaic2 } from '@/components/ProductMosaic2'
import { ValueProposition } from '@/components/ValueProposition'
import { ReviewsSection } from '@/components/ReviewsSection'
import { CommunityCTA } from '@/components/CommunityCTA'
import { WaveDivider } from '@/components/WaveDivider'

export default function HomePage() {
  return (
    <main className="relative w-full flex flex-col overflow-x-hidden">
      <HeroCarousel />
      
      <ProductMosaic2 />
      
      <WaveDivider fromColor="var(--color-navbar)" toColor="#111111" height={40} />
      <ValueProposition />
      
      <WaveDivider fromColor="#111111" toColor="#e8ddca" height={35} />
      <ReviewsSection />
      
      <WaveDivider fromColor="#e8ddca" toColor="#1A1207" height={40} />
      <CommunityCTA />
    </main>
  )
}
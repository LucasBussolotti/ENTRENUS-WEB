import { HeroCarousel } from '@/components/HeroCarousel'
import { ProductMosaic } from '@/components/ProductMosaic'
import { ValueProposition } from '@/components/ValueProposition'
import { ReviewsSection } from '@/components/ReviewsSection'
import { CommunityCTA } from '@/components/CommunityCTA'
import { WaveDivider } from '@/components/WaveDivider'

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      
      <ProductMosaic />
      
      <WaveDivider fromColor="var(--background)" toColor="#111111" height={40} />
      <ValueProposition />
      
      <WaveDivider fromColor="#111111" toColor="#e8ddca" height={40} />
      <ReviewsSection />
      
      <WaveDivider fromColor="#e8ddca" toColor="#1A1207" height={40} />
      <CommunityCTA />
    </>
  )
}
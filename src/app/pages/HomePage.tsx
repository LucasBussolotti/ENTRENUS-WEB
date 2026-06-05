import { HeroCarousel } from '../components/HeroCarousel'
import { ProductMosaic } from '../components/ProductMosaic'
import { ValueProposition } from '../components/ValueProposition'
import { ReviewsSection } from '../components/ReviewsSection'
import { CommunityCTA } from '../components/CommunityCTA'
import { WaveDivider } from '../components/WaveDivider'

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      
      <ProductMosaic /> {/* background: var(--background) */}
      
      {/* var(--background) → #111111 */}
      <WaveDivider fromColor="var(--background)" toColor="#111111" height={40} />
      <ValueProposition /> {/* background: #111111 */}
      
      {/* #111111 → #e8ddca */}
      <WaveDivider fromColor="#111111" toColor="#e8ddca" height={40} />
      <ReviewsSection /> {/* background: #e8ddca */}
      
      {/* #e8ddca → color del CommunityCTA */}
      <WaveDivider fromColor="#e8ddca" toColor="#1A1207" height={40} />
      <CommunityCTA />
    </>
  )
}
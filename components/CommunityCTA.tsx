import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { WaveDivider } from './WaveDivider';

export function CommunityCTA() {
  const t = useTranslations('community');

  return (
    <section
      className="relative overflow-hidden"
      /* Con DPR fraccionario los bordes de la sección caen entre píxeles y el
         recorte de overflow mezclaba en esa fila la foto y el azul del fondo:
         se veía una línea. En cada borde el fondo toma el color del vecino
         (la onda de arriba y el footer) y la foto arranca 2px más abajo, bajo
         el esfumado. */
      style={{
        background:
          'linear-gradient(to bottom, #1A1207 4px, var(--cta-community-blue) 4px calc(100% - 1px), var(--color-footpage) calc(100% - 1px))',
        marginTop: '-2px',
      }}
    >
      {/* En desktop el alto se limita al viewport (menos el header fijo) para que la foto entre en una sola vista */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-auto md:h-[min(56.25vw,calc(100svh-7rem))] md:min-h-[520px]">
        <div className="absolute inset-x-0 top-[2px] bottom-0">
          <Image
            src="/images/CTAFINAL2.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center md:object-[center_75%]"
          />
        </div>

        {/* Esfumado superior para fundir la foto con la onda de arriba */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[150px]"
          style={{ background: 'linear-gradient(to bottom, #1A1207 0%, transparent 100%)' }}
        />

        {/* Funde el piso azul de la foto con la franja del CTA, sin corte visible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%]"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--cta-community-blue))' }}
        />

        <h2
          className="absolute inset-x-0 top-[5%] sm:top-[9%] md:top-[7%] px-4 text-center text-balance lg:whitespace-nowrap uppercase text-white"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(1.75rem, 5.5vw, 7rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.12)',
          }}
        >
          {t('title')}
        </h2>
      </div>

      <div className="relative flex flex-col items-center gap-5 px-5 pt-4 pb-12 sm:gap-6 sm:px-6 md:pb-16 text-center">
        <p
          className="text-base sm:text-lg md:text-xl text-white/90 text-balance lg:whitespace-nowrap"
          style={{ fontFamily: 'var(--font-body)', lineHeight: 1.4 }}
        >
          {t('sub')}
        </p>

        <a
          href="https://www.instagram.com/entrenuts/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-4 sm:px-9 text-[var(--text-dark)] no-underline shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out motion-safe:hover:scale-[1.06] hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.7)] active:scale-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--cta-community-blue)]"
        >
          <span className="relative flex items-center gap-2">
            {/* paddingTop compensa que Founders Grotesk se asienta alto dentro de su caja de línea */}
            <span
              className="text-lg md:text-xl uppercase"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 800, letterSpacing: '0.05em', lineHeight: 1, paddingTop: '0.12em' }}
            >
              {t('cta')}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 md:size-6 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
            />
            {/* Mismo subrayado animado que los CTA del HeroCarousel; absoluto para no desplazar el texto */}
            <span
              aria-hidden="true"
              className="absolute left-0 -bottom-1.5 h-[2px] w-0 bg-[var(--text-dark)] transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full"
            />
          </span>
        </a>
      </div>

      <WaveDivider
        fromColor="var(--cta-community-blue)"
        toColor="var(--color-footpage)"
        height={40}
        overlapNext={false}
      />
    </section>
  );
}

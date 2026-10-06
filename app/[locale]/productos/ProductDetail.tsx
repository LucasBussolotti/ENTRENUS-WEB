"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { GlutenFreeBadge } from '@/components/catalog/GlutenFreeBadge';
import type { Product } from '@/lib/data/products';
import { FLAVOR_PARAM, flavorSlug, getVariantColor, productName, productVariant } from '@/lib/data/catalog';

/** Otra ficha de la misma categoría, para la tira de miniaturas */
export interface SiblingPage {
  slug: string
  href: string
  label: string
  image: string
}

interface ProductDetailProps {
  /** Productos de la ficha: uno, o varios sabores que comparten URL (Puffs, Pancakes) */
  products: Product[]
  color: string
  currentSlug: string
  siblings: SiblingPage[]
  /** Sabor con el que abre la ficha */
  initialIndex?: number
}

/** Abre la ficha en el sabor de ?sabor=, el de la tarjeta que se tocó en la grilla */
export function ProductDetailWithFlavor(props: ProductDetailProps) {
  const flavor = useSearchParams().get(FLAVOR_PARAM) ?? '';
  const index = props.products.findIndex((p) => flavorSlug(p) === flavor);
  // La key reinicia el sabor elegido al llegar desde otra tarjeta de la misma ficha
  return <ProductDetail key={flavor} {...props} initialIndex={Math.max(index, 0)} />;
}

export function ProductDetail({ products, color, currentSlug, siblings, initialIndex = 0 }: ProductDetailProps) {
  const lang = useLocale() === 'en' ? 'en' : 'es';
  const t = useTranslations('productsPage');

  const [selectedProductIndex, setSelectedProductIndex] = useState(initialIndex);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const selectProduct = (idx: number) => {
    setSelectedProductIndex(idx);
    setCurrentImageIndex(0);
  };

  const currentProduct = products[selectedProductIndex];
  const productImages: string[] = currentProduct.images?.length ? currentProduct.images : [currentProduct.image];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const scrollThumbs = (direction: 'left' | 'right') => {
    thumbsRef.current?.scrollBy({ left: direction === 'left' ? -180 : 180, behavior: 'smooth' });
  };

  const isEs = lang === 'es';
  const name = productName(currentProduct, lang);
  const variant = productVariant(currentProduct, lang);
  const productDesc = isEs ? currentProduct.descEs : currentProduct.descEn;
  const productBenefits = isEs ? currentProduct.benefits : currentProduct.benefitsEn;
  const productIdealFor = isEs ? currentProduct.idealFor : currentProduct.idealForEn;
  const productWhyChoose = isEs ? currentProduct.whyChoose : currentProduct.whyChooseEn;
  const productSizes = isEs ? currentProduct.sizes : currentProduct.sizesEn ?? currentProduct.sizes;

  // Varios sabores en la misma URL: las miniaturas cambian de sabor. Si no, llevan
  // a las otras fichas de la categoría.
  const hasVariants = products.length > 1;
  const showThumbs = hasVariants || siblings.length > 1;

  const thumbClassName =
    'relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white border-2 overflow-hidden shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:scale-105';
  const thumbStyle = (isSelected: boolean): React.CSSProperties => ({
    borderColor: isSelected ? color : 'transparent',
    opacity: isSelected ? 1 : 0.6,
  });
  const thumbImageStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'contain', padding: '6px' };

  return (
    <div className="bg-[#fcfbf9] rounded-[2rem] shadow-sm p-6 md:p-10 lg:p-16 flex flex-col relative transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

        {/* COLUMNA IZQUIERDA */}
        <div className="w-full lg:w-5/12 flex flex-col items-center justify-start h-full">

          {/* El alto acompaña al de la imagen en cada breakpoint */}
          <div className="relative flex h-[260px] w-full items-center justify-center md:h-[380px] lg:h-[420px]">
            {productImages.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label={t('prevImage')}
                className="absolute left-0 z-10 flex size-11 items-center justify-center rounded-md bg-gray-200/60 backdrop-blur-sm transition-colors hover:bg-gray-300/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <ChevronLeft size={24} aria-hidden="true" className="text-gray-700" />
              </button>
            )}

            {/* Todas las fotos del producto quedan montadas y sólo cambia la
                visible: antes cada flecha montaba una imagen nueva y recién ahí
                empezaba a descargarla, así que el hueco en blanco se notaba. */}
            <div key={`img-${selectedProductIndex}`} className="relative h-full w-full">
              {productImages.map((image, idx) => {
                const isCurrent = idx === currentImageIndex;
                return (
                  <div
                    key={image}
                    aria-hidden={!isCurrent}
                    className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-300 ${
                      isCurrent ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    {/* La caja mide como mucho 440px de ancho en desktop: con el
                        100vw por defecto se pedían variantes de hasta 3840px. */}
                    <ImageWithFallback
                      src={`/${image}`}
                      alt={isCurrent ? t('imageAlt', {
                        product: variant ? `${name} ${variant}` : name,
                        number: idx + 1,
                      }) : ''}
                      sizes="(max-width: 1023px) 80vw, 440px"
                      priority={idx === 0}
                      style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      className="transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>
                );
              })}
            </div>

            {productImages.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                aria-label={t('nextImage')}
                className="absolute right-0 z-10 flex size-11 items-center justify-center rounded-md bg-gray-200/60 backdrop-blur-sm transition-colors hover:bg-gray-300/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <ChevronRight size={24} aria-hidden="true" className="text-gray-700" />
              </button>
            )}
          </div>

          {/* GALERÍA DE MINIATURAS */}
          {showThumbs && (
            <div className="mt-8 md:mt-auto pt-6 w-full flex justify-center relative px-0 md:px-8">
              <div className="relative w-full max-w-[340px] md:max-w-[420px] flex items-center justify-center">

                <button
                  type="button"
                  onClick={() => scrollThumbs('left')}
                  aria-label={t('scrollThumbsLeft')}
                  className="absolute left-[-45px] z-10 hidden size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:text-gray-900 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-safe:hover:scale-105 md:flex"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>

                <div
                  ref={thumbsRef}
                  className="flex gap-3 md:gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide scroll-smooth w-full justify-start"
                >
                  {hasVariants
                    ? products.map((p, idx) => {
                        const isSelected = selectedProductIndex === idx;
                        const label = productVariant(p, lang) || productName(p, lang);
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => selectProduct(idx)}
                            aria-pressed={isSelected}
                            className={thumbClassName}
                            style={thumbStyle(isSelected)}
                            title={label}
                          >
                            <ImageWithFallback
                              src={`/${p.images?.[0] ?? p.image}`}
                              alt={label}
                              sizes="96px"
                              style={thumbImageStyle}
                            />
                          </button>
                        );
                      })
                    : siblings.map((sibling) => {
                        const isSelected = sibling.slug === currentSlug;
                        return (
                          <Link
                            key={sibling.slug}
                            href={sibling.href}
                            aria-current={isSelected ? 'page' : undefined}
                            className={thumbClassName}
                            style={thumbStyle(isSelected)}
                            title={sibling.label}
                          >
                            <ImageWithFallback
                              src={`/${sibling.image}`}
                              alt={sibling.label}
                              sizes="96px"
                              style={thumbImageStyle}
                            />
                          </Link>
                        );
                      })}
                </div>

                <button
                  type="button"
                  onClick={() => scrollThumbs('right')}
                  aria-label={t('scrollThumbsRight')}
                  className="absolute right-[-45px] z-10 hidden size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:text-gray-900 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-safe:hover:scale-105 md:flex"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>

              </div>
            </div>
          )}

        </div>

        {/* COLUMNA DERECHA */}
        <div className="w-full lg:w-7/12 flex flex-col justify-start text-[var(--text-dark)] pt-4">

          <h1
            className="text-3xl md:text-5xl font-black uppercase mb-4 leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span style={{ color, transition: 'color 0.3s' }}>
              {name}
            </span>

            {/* El segundo span es block: sin este espacio el texto del H1 queda
                "Pasta de maníNatural" para buscadores y lectores de pantalla. */}
            {variant && ' '}
            {variant && (
              <span
                className="block mt-2 transition-colors duration-300"
                style={{ color: getVariantColor(currentProduct, color) }}
              >
                {variant}
              </span>
            )}
          </h1>

          <GlutenFreeBadge label={t('glutenFree')} height={56} className="mb-5" />

          <p className="text-base md:text-lg mb-8 font-medium text-gray-600">
            {productDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 text-sm md:text-base">
            {productBenefits && productBenefits.length > 0 && (
              <div>
                <h2 className="font-bold mb-2 uppercase tracking-wide" style={{ color }}>{t('benefits')}</h2>
                <ul className="space-y-1.5 text-gray-700">
                  {productBenefits.map((ben: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color }}>•</span> {ben}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {productIdealFor && productIdealFor.length > 0 && (
              <div>
                <h2 className="font-bold mb-2 uppercase tracking-wide" style={{ color }}>{t('idealFor')}</h2>
                <ul className="space-y-1.5 text-gray-700">
                  {productIdealFor.map((ideal: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color }}>•</span> {ideal}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {productWhyChoose && productWhyChoose.length > 0 && (
              <div>
                <h2 className="font-bold mb-2 uppercase tracking-wide" style={{ color }}>{t('whyChoose')}</h2>
                <ul className="space-y-1.5 text-gray-700">
                  {productWhyChoose.map((why: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color }}>•</span> {why}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="font-bold mb-2 uppercase tracking-wide" style={{ color }}>{t('productInfo')}</h2>
              <ul className="space-y-1.5 text-gray-700">
                {variant && <li className="flex gap-2"><span style={{ color }}>•</span> {t('flavor', { value: variant })}</li>}
                {productSizes && <li className="flex gap-2"><span style={{ color }}>•</span> {t('sizes', { value: productSizes.join(' · ') })}</li>}
                <li className="flex gap-2"><span style={{ color }}>•</span> {t('storage')}</li>
              </ul>
            </div>
          </div>

          {/* ── BOTÓN COMPRAR ── */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <a
              href={currentProduct.mlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full sm:w-[260px] h-[60px] items-center justify-center rounded-full overflow-hidden shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(255,230,0,0.4)] transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-[#090080] sm:ml-8 lg:ml-12"
            >
              <div
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                style={{ backgroundColor: color }}
              />
              <div
                className="absolute inset-0 bg-[#FFE600] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                className="relative z-10 text-white font-black uppercase tracking-[0.05em] text-lg transition-all duration-300 group-hover:opacity-0 group-hover:scale-75"
                style={{ fontFamily: 'var(--font-body)', marginTop: '2px', marginLeft: '6px' }}
              >
                {t('buy')}
              </span>
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <ImageWithFallback
                    src="/images/LOGOMELI2.webp"
                    alt="Mercado Libre"
                    sizes="56px"
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

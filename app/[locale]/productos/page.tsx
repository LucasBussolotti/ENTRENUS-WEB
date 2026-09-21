"use client";

import React, { useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

// 👇 IMPORTÁ TUS PRODUCTOS DESDE LA RUTA CORRECTA
import { products } from '@/lib/data/products';

const CATEGORY_MAP: Record<string, string> = {
  "PASTAS DE MANÍ": "Pasta de maní",
  "ACEITES DE COCO": "Aceite de coco",
  "MIEL": "Miel",
  "GHEE": "Ghee",
  "BARRITAS PROTEICAS": "Barritas proteicas",
  "PUFFS PROTEICOS": "Puffs proteicos",
  "PANCAKES PROTEICOS": "Pancakes proteicos",
};

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  "PASTAS DE MANÍ": "peanutButters",
  "ACEITES DE COCO": "coconutOils",
  "MIEL": "honey",
  "GHEE": "ghee",
  "BARRITAS PROTEICAS": "proteinBars",
  "PUFFS PROTEICOS": "proteinPuffs",
  "PANCAKES PROTEICOS": "proteinPancakes",
};

const CATEGORY_COLORS: Record<string, string> = {
  "PASTAS DE MANÍ": "#ef7f17",
  "ACEITES DE COCO": "#207a39",
  "MIEL": "#f3bb29",
  "GHEE": "#1a3445",
  "BARRITAS PROTEICAS": "#325276",
  "PUFFS PROTEICOS": "#008191",
  "PANCAKES PROTEICOS": "#492b0a",
};

const VARIANT_COLORS: Record<string, string> = {
  "Crocante": "#d82e2e",   // Rojo
  "Stevia": "#8cc63f",     // Verde
  "Cacao": "#5e3a24",      // Marrón
  "Coco": "#00a9e0",       // Celeste
  "Proteína": "#6b6b6b",   // Gris
  "Natural": "#ef7f17",     // Naranja (o el color que prefieras)
  "PROTEIN Cookies & Cream": "#800080",  // Morado
  "PROTEIN Salted Caramel": "#ff8c00",  // Naranja oscuro
  "Cebolla a la crema": "#009aa6",  // Turquesa
  "Mostaza y miel": "#f0b323",     // Amarillo
  "Barbacoa": "#8e2434",           // Bordo
  "Vainilla": "#c9a227",           // Dorado
  "Chocolate": "#4a3228"           // Marron oscuro
};

const UI_CATEGORIES = Object.keys(CATEGORY_MAP);

export function ProductDetail() {
  const lang = useLocale();
  const t = useTranslations('productsPage');

  // ── ESTADOS Y REFS ──
  const [activeCategory, setActiveCategory] = useState("PASTAS DE MANÍ");
  const [selectedProductIndex, setSelectedProductIndex] = useState(0); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  
  // Referencias
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Los resets van en los handlers y no en efectos: así la selección se recalcula
  // en el mismo render del click, sin el re-render en cascada que provocaban.
  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    setSelectedProductIndex(0);
    setCurrentImageIndex(0);
  };

  const selectProduct = (idx: number) => {
    setSelectedProductIndex(idx);
    setCurrentImageIndex(0);
  };

  const filteredProducts = products.filter(
    (p) => p.nameEs === CATEGORY_MAP[activeCategory]
  );

  const currentProduct = filteredProducts[selectedProductIndex];

  const productImages: string[] = currentProduct
    ? (currentProduct.images && currentProduct.images.length > 0
        ? currentProduct.images
        : [currentProduct.image])
    : [];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // ── FUNCIÓN DE SCROLL PARA MINIATURAS ──
  const scrollThumbs = (direction: 'left' | 'right') => {
    if (thumbsRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      thumbsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isEs = lang === 'es';
  const productName = currentProduct ? (isEs ? currentProduct.nameEs : currentProduct.nameEn) : '';
  const productVariant = currentProduct ? (isEs ? currentProduct.variantEs : currentProduct.variantEn) : undefined;
  const productDesc = currentProduct ? (isEs ? currentProduct.descEs : currentProduct.descEn) : '';
  const productBenefits = currentProduct ? (isEs ? currentProduct.benefits : currentProduct.benefitsEn) : undefined;
  const productIdealFor = currentProduct ? (isEs ? currentProduct.idealFor : currentProduct.idealForEn) : undefined;
  const productWhyChoose = currentProduct ? (isEs ? currentProduct.whyChoose : currentProduct.whyChooseEn) : undefined;
  const productSizes = currentProduct ? (isEs ? currentProduct.sizes : currentProduct.sizesEn ?? currentProduct.sizes) : undefined;
  const activeColor = CATEGORY_COLORS[activeCategory];

  return (
    <section className="w-full bg-[var(--color-navbar)] min-h-screen py-8 md:py-16 px-4 md:px-8">

      <div className="max-w-[1200px] mx-auto relative">
        
        {/* ── 1. NAVEGACIÓN DE CATEGORÍAS ── */}
        {/* En móvil son 7 etiquetas: envueltas ocupaban ~8 renglones antes de mostrar
            un solo producto. Debajo de md pasan a una tira de scroll horizontal de una
            línea; desde md vuelve el bloque centrado con separadores. */}
        <div
          role="tablist"
          aria-label={t('categoriesLabel')}
          className="font-display -mx-4 mb-8 flex snap-x snap-mandatory items-center gap-x-4 overflow-x-auto scroll-smooth scrollbar-hide px-4 md:mx-0 md:mb-12 md:flex-wrap md:justify-center md:gap-x-6 md:gap-y-2 md:overflow-x-visible md:px-0 md:text-center"
        >
          {UI_CATEGORIES.map((cat, index) => {
            const isActive = activeCategory === cat;
            return (
              <React.Fragment key={cat}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectCategory(cat)}
                  className={`shrink-0 snap-start rounded-sm text-xl font-black tracking-tight whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:text-2xl md:whitespace-normal lg:text-4xl xl:text-5xl ${
                    isActive ? '' : 'text-[#7A7266] hover:text-[#4A443B]'
                  }`}
                  style={isActive ? { color: CATEGORY_COLORS[cat] } : {}}
                >
                  {t(`categories.${CATEGORY_LABEL_KEYS[cat]}`)}
                </button>
                {index < UI_CATEGORIES.length - 1 && (
                  <span aria-hidden="true" className="hidden text-2xl font-black text-[#C9C2B6] md:inline lg:text-4xl xl:text-5xl">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── 2. TARJETA PRINCIPAL DEL PRODUCTO ── */}
        {currentProduct ? (
        <div className="bg-[#fcfbf9] rounded-[2rem] shadow-sm p-6 md:p-10 lg:p-16 flex flex-col relative transition-all duration-300">
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* COLUMNA IZQUIERDA */}
            <div className="w-full lg:w-5/12 flex flex-col items-center justify-start h-full">
              
              {/* Contenedor de la Imagen 2D.
                  Tenía 420px fijos mientras la imagen medía 260px en móvil: eran 160px
                  de hueco muerto. Ahora el alto acompaña al del hijo en cada breakpoint. */}
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

                <div key={`img-${selectedProductIndex}-${currentImageIndex}`} className="relative h-full w-full animate-fade-in">
                  <ImageWithFallback
                    src={`/${productImages[currentImageIndex]}`} 
                    alt={t('imageAlt', {
                      product: productVariant ? `${productName} ${productVariant}` : productName,
                      number: currentImageIndex + 1,
                    })}
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    className="transition-transform duration-500 ease-in-out hover:scale-105"
                  />
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

              {/* 3. GALERÍA DE MINIATURAS (Flechas separadas) */}
              {filteredProducts.length > 1 && (
                <div className="mt-8 md:mt-auto pt-6 w-full flex justify-center relative px-0 md:px-8"> 
                  <div className="relative w-full max-w-[340px] md:max-w-[420px] flex items-center justify-center">
                    
                    {/* Flecha Izquierda (Más separada) */}
                    <button
                      type="button"
                      onClick={() => scrollThumbs('left')}
                      aria-label={t('scrollThumbsLeft')}
                      className="absolute left-[-45px] z-10 hidden size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:text-gray-900 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-safe:hover:scale-105 md:flex"
                    >
                      <ChevronLeft size={20} aria-hidden="true" />
                    </button>

                    {/* Contenedor deslizable */}
                    <div 
                      ref={thumbsRef}
                      className="flex gap-3 md:gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide scroll-smooth w-full justify-start"
                    >
                      {filteredProducts.map((p, idx) => {
                        const isSelected = selectedProductIndex === idx;
                        const thumbImage = p.images?.length ? p.images[0] : p.image;
                        
                        return (
                          <button
                            key={p.id || idx}
                            type="button"
                            onClick={() => selectProduct(idx)}
                            aria-pressed={isSelected}
                            className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white border-2 overflow-hidden shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:scale-105"
                            style={{
                              borderColor: isSelected ? activeColor : 'transparent',
                              opacity: isSelected ? 1 : 0.6
                            }}
                            title={isEs ? p.variantEs : p.variantEn}
                          >
                            <ImageWithFallback
                              src={`/${thumbImage}`}
                              alt={(isEs ? p.variantEs : p.variantEn) || (isEs ? p.nameEs : p.nameEn)}
                              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Flecha Derecha (Más separada) */}
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
                {/* Nombre de la categoría (Ej: PASTA DE MANÍ) */}
                <span style={{ color: activeColor, transition: 'color 0.3s' }}>
                  {productName}
                </span>

                {/* Variante del sabor con color dinámico (Ej: CROCANTE en rojo) */}
                {productVariant && (
                  <span 
                    className="block mt-2 transition-colors duration-300"
                    style={{ 
                      // Busca el color en el diccionario, si no existe usa el default
                      color: currentProduct.variantEs ? (VARIANT_COLORS[currentProduct.variantEs] || activeColor) : activeColor 
                    }}
                  >
                    {productVariant}
                  </span>
                )}
              </h1>
              
              <p className="text-base md:text-lg mb-8 font-medium text-gray-600">
                {productDesc}
              </p>

              {/* Se redujo el mb-10 a mb-5 para que la línea y el botón suban */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 text-sm md:text-base">
                {productBenefits && productBenefits.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2 uppercase tracking-wide" style={{ color: activeColor }}>{t('benefits')}</h3>
                    <ul className="space-y-1.5 text-gray-700">
                      {productBenefits.map((ben: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <span style={{ color: activeColor }}>•</span> {ben}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {productIdealFor && productIdealFor.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2 uppercase tracking-wide" style={{ color: activeColor }}>{t('idealFor')}</h3>
                    <ul className="space-y-1.5 text-gray-700">
                      {productIdealFor.map((ideal: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <span style={{ color: activeColor }}>•</span> {ideal}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {productWhyChoose && productWhyChoose.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2 uppercase tracking-wide" style={{ color: activeColor }}>{t('whyChoose')}</h3>
                    <ul className="space-y-1.5 text-gray-700">
                      {productWhyChoose.map((why: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <span style={{ color: activeColor }}>•</span> {why}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-bold mb-2 uppercase tracking-wide" style={{ color: activeColor }}>{t('productInfo')}</h3>
                  <ul className="space-y-1.5 text-gray-700">
                    {productVariant && <li className="flex gap-2"><span style={{ color: activeColor }}>•</span> {t('flavor', { value: productVariant })}</li>}
                    {productSizes && <li className="flex gap-2"><span style={{ color: activeColor }}>•</span> {t('weight', { value: productSizes[1] || productSizes[0] })}</li>}
                    <li className="flex gap-2"><span style={{ color: activeColor }}>•</span> {t('storage')}</li>
                  </ul>
                </div>
              </div>

              {/* ── BOTÓN COMPRAR ── */}
              {/* Se redujo pt-6 a pt-4 en el contenedor para subir el botón */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                {/* Se agregó sm:ml-8 lg:ml-12 a la etiqueta <a> para empujar el botón a la derecha */}
                <a 
                  href={currentProduct.mlUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative inline-flex w-full sm:w-[260px] h-[60px] items-center justify-center rounded-full overflow-hidden shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(255,230,0,0.4)] transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-[#090080] sm:ml-8 lg:ml-12"
                >
                  <div 
                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                    style={{ backgroundColor: activeColor }}
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
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
        ) : (
          /* Categoría sin productos cargados todavía: mantiene visible la navegación */
          <div className="bg-[#fcfbf9] rounded-[2rem] shadow-sm p-6 sm:p-10 md:p-16 flex flex-col items-center justify-center text-center min-h-[280px] md:min-h-[420px]">
            <h2
              className="font-display text-2xl sm:text-3xl md:text-5xl font-black uppercase mb-4 leading-none text-balance"
              style={{ color: activeColor }}
            >
              {t('comingSoonTitle')}
            </h2>
            <p className="text-base md:text-lg font-medium text-gray-600 max-w-md">
              {t('comingSoonText')}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in { animation: none; }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default ProductDetail;
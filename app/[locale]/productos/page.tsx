"use client";

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
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
};

const CATEGORY_COLORS: Record<string, string> = {
  "PASTAS DE MANÍ": "#ef7f17",
  "ACEITES DE COCO": "#207a39",
  "MIEL": "#f3bb29",
  "GHEE": "#1a3445",
  "BARRITAS PROTEICAS": "#325276",
};

const UI_CATEGORIES = Object.keys(CATEGORY_MAP);

export function ProductDetail() {
  const lang = useLocale();
  
  // ── ESTADOS ──
  const [activeCategory, setActiveCategory] = useState("PASTAS DE MANÍ");
  const [selectedProductIndex, setSelectedProductIndex] = useState(0); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);       

  useEffect(() => {
    setSelectedProductIndex(0);
    setCurrentImageIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProductIndex]);

  const filteredProducts = products.filter(
    (p) => p.nameEs === CATEGORY_MAP[activeCategory]
  );

  const currentProduct = filteredProducts[selectedProductIndex];

  if (!currentProduct) return null;

  const productImages = (currentProduct as any).images?.length > 0 
    ? (currentProduct as any).images 
    : [currentProduct.image];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const isEs = lang === 'es';
  const productName = isEs ? currentProduct.nameEs : currentProduct.nameEn;
  const productVariant = isEs ? currentProduct.variantEs : currentProduct.variantEn;
  const productDesc = isEs ? currentProduct.descEs : currentProduct.descEn;
  const activeColor = CATEGORY_COLORS[activeCategory];

  return (
    <section className="w-full bg-[var(--color-navbar)] min-h-screen py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto relative">
        
        {/* ── 1. NAVEGACIÓN DE CATEGORÍAS ── */}
        <div 
          className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 md:gap-x-6 mb-8 md:mb-12 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {UI_CATEGORIES.map((cat, index) => {
            const isActive = activeCategory === cat;
            return (
              <React.Fragment key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`text-2xl md:text-4xl lg:text-5xl font-black uppercase transition-colors tracking-tight ${
                    isActive ? '' : 'text-gray-300 hover:text-gray-400'
                  }`}
                  style={isActive ? { color: CATEGORY_COLORS[cat] } : {}}
                >
                  {cat}
                </button>
                {index < UI_CATEGORIES.length - 1 && (
                  <span className="text-gray-300 text-2xl md:text-4xl lg:text-5xl font-black hidden sm:inline">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── 2. TARJETA PRINCIPAL DEL PRODUCTO ── */}
        <div className="bg-[#fcfbf9] rounded-[2rem] shadow-sm p-6 md:p-10 lg:p-16 flex flex-col relative transition-all duration-300">
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* COLUMNA IZQUIERDA */}
            <div className="w-full lg:w-5/12 relative flex items-center justify-center min-h-[300px] md:min-h-[450px]">
              {productImages.length > 1 && (
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-0 z-10 p-2 bg-gray-200/60 hover:bg-gray-300/80 rounded-md transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft size={24} className="text-gray-600" />
                </button>
              )}

              <div key={selectedProductIndex} className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] animate-fade-in">
                <ImageWithFallback
                  src={`/${productImages[currentImageIndex]}`} 
                  alt={`${productName} ${productVariant || ''} - Vista ${currentImageIndex + 1}`}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  className="transition-transform duration-500 ease-in-out hover:scale-105"
                />
              </div>

              {productImages.length > 1 && (
                <button 
                  onClick={handleNextImage}
                  className="absolute right-0 z-10 p-2 bg-gray-200/60 hover:bg-gray-300/80 rounded-md transition-colors backdrop-blur-sm"
                >
                  <ChevronRight size={24} className="text-gray-600" />
                </button>
              )}
            </div>

            {/* COLUMNA DERECHA */}
            <div className="w-full lg:w-7/12 flex flex-col justify-start text-[var(--text-dark)] pt-4">
              <h1 
                className="text-3xl md:text-5xl font-black uppercase mb-4 transition-colors duration-300 leading-none"
                style={{ color: activeColor, fontFamily: 'var(--font-display)' }}
              >
                {productName} {productVariant && <span className="block mt-2">{productVariant}</span>}
              </h1>
              
              <p className="text-base md:text-lg mb-8 font-medium text-gray-600">
                {productDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-sm md:text-base">
                {currentProduct.benefits && currentProduct.benefits.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2 uppercase tracking-wide" style={{ color: activeColor }}>{isEs ? 'Beneficios' : 'Benefits'}</h3>
                    <ul className="space-y-1.5 text-gray-700">
                      {currentProduct.benefits.map((ben, i) => (
                        <li key={i} className="flex gap-2">
                          <span style={{ color: activeColor }}>•</span> {ben}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentProduct.idealFor && currentProduct.idealFor.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2 uppercase tracking-wide" style={{ color: activeColor }}>{isEs ? 'Ideal para:' : 'Ideal for:'}</h3>
                    <ul className="space-y-1.5 text-gray-700">
                      {currentProduct.idealFor.map((ideal, i) => (
                        <li key={i} className="flex gap-2">
                          <span style={{ color: activeColor }}>•</span> {ideal}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentProduct.whyChoose && currentProduct.whyChoose.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2 uppercase tracking-wide" style={{ color: activeColor }}>{isEs ? '¿Por qué elegirla?' : 'Why choose it?'}</h3>
                    <ul className="space-y-1.5 text-gray-700">
                      {currentProduct.whyChoose.map((why, i) => (
                        <li key={i} className="flex gap-2">
                          <span style={{ color: activeColor }}>•</span> {why}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-bold mb-2 uppercase tracking-wide" style={{ color: activeColor }}>{isEs ? 'Info. del producto' : 'Product Info'}</h3>
                  <ul className="space-y-1.5 text-gray-700">
                    {productVariant && <li className="flex gap-2"><span style={{ color: activeColor }}>•</span> Sabor: {productVariant}</li>}
                    {currentProduct.sizes && <li className="flex gap-2"><span style={{ color: activeColor }}>•</span> Peso: {currentProduct.sizes[1] || currentProduct.sizes[0]}</li>}
                    <li className="flex gap-2"><span style={{ color: activeColor }}>•</span> Conservar en lugar fresco.</li>
                  </ul>
                </div>
              </div>

              {/* ── BOTÓN COMPRAR (ESTÉTICO + EFECTO HOVER ML) ── */}
              <div className="mt-auto pt-6 border-t border-gray-200">
                <a 
                  href={currentProduct.mlUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative inline-flex w-full sm:w-[260px] h-[60px] items-center justify-center rounded-full overflow-hidden shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(255,230,0,0.4)] transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-[#090080]"
                >
                  {/* 1. Fondo original de la web (Naranja/Verde/etc) */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                    style={{ backgroundColor: activeColor }}
                  />
                  
                  {/* 2. Fondo amarillo de Mercado Libre */}
                  <div 
                    className="absolute inset-0 bg-[#FFE600] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* 3. Texto "COMPRAR" (Letras más separadas y tamaño ajustado para más elegancia) */}
                  <span 
                    className="relative z-10 text-white font-black uppercase tracking-[0.05em] text-lg transition-all duration-300 group-hover:opacity-0 group-hover:scale-75"
                    style={{ fontFamily: 'var(--font-body)', marginTop: '2px', marginLeft: '6px' /* El margin left compensa visualmente el tracking extra */ }}
                  >
                    {isEs ? 'Comprar' : 'Buy'}
                  </span>

                  {/* 4. Logo de Mercado Libre (Aparece en el centro) */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
                    <div className="w-14 h-14 flex items-center justify-center">
                      <ImageWithFallback 
                        src="/images/LOGOMELI2.png" 
                        alt="Mercado Libre" 
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* ── 3. GALERÍA DE MINIATURAS (Pegadita al botón) ── */}
          {filteredProducts.length > 1 && (
            <div className="mt-6 pt-6 w-full">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {filteredProducts.map((p, idx) => {
                  const isSelected = selectedProductIndex === idx;
                  const thumbImage = (p as any).images?.length > 0 ? (p as any).images[0] : p.image;
                  
                  return (
                    <button
                      key={p.id || idx}
                      onClick={() => setSelectedProductIndex(idx)}
                      className="relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl bg-white border-2 transition-all duration-200 overflow-hidden shadow-sm"
                      style={{
                        borderColor: isSelected ? activeColor : 'transparent',
                        opacity: isSelected ? 1 : 0.5
                      }}
                      title={isEs ? p.variantEs : p.variantEn}
                    >
                      <ImageWithFallback
                        src={`/${thumbImage}`}
                        alt={p.variantEs || p.nameEs}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
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
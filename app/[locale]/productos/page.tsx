"use client";

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
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
  const [selectedProductIndex, setSelectedProductIndex] = useState(0); // Controla el producto (sabor)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);       // Controla la foto del carrusel
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Al cambiar de categoría, reseteamos producto y foto
  useEffect(() => {
    setSelectedProductIndex(0);
    setCurrentImageIndex(0);
    setIsDropdownOpen(false);
  }, [activeCategory]);

  // Al cambiar de sabor (producto), reseteamos a la primera foto
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProductIndex]);

  // Filtramos los productos de la categoría seleccionada
  const filteredProducts = products.filter(
    (p) => p.nameEs === CATEGORY_MAP[activeCategory]
  );

  const currentProduct = filteredProducts[selectedProductIndex];

  if (!currentProduct) return null;

  // ── LÓGICA DE IMÁGENES (Galería del producto) ──
  // Si en el futuro agregás "images: ['foto1.png', 'foto2.png']" en tu products.ts, las usa. 
  // Si no, usa la "image" principal como única foto.
  const productImages = (currentProduct as any).images?.length > 0 
    ? (currentProduct as any).images 
    : [currentProduct.image];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Variables dinámicas de texto
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
        <div className="bg-[#fcfbf9] rounded-[2rem] shadow-sm p-6 md:p-10 lg:p-16 flex flex-col lg:flex-row gap-8 lg:gap-16 relative transition-all duration-300">
          
          {/* COLUMNA IZQUIERDA: Imagen y Flechas de Galería */}
          <div className="w-full lg:w-5/12 relative flex items-center justify-center min-h-[300px] md:min-h-[500px]">
            
            {/* Solo muestra flechas si el producto tiene más de 1 imagen */}
            {productImages.length > 1 && (
              <button 
                onClick={handlePrevImage}
                className="absolute left-0 z-10 p-2 bg-gray-200/60 hover:bg-gray-300/80 rounded-md transition-colors backdrop-blur-sm"
              >
                <ChevronLeft size={24} className="text-gray-600" />
              </button>
            )}

            <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px]">
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

          {/* COLUMNA DERECHA: Textos y Detalles */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center text-[var(--text-dark)]">
            
            <h1 
              className="text-xl md:text-2xl font-bold uppercase mb-2 transition-colors duration-300"
              style={{ color: activeColor }}
            >
              {productName} {productVariant && productVariant}
            </h1>
            <p className="text-sm md:text-base mb-6 font-medium text-gray-600">
              {productDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm md:text-base">
              {currentProduct.benefits && currentProduct.benefits.length > 0 && (
                <div>
                  <h3 className="font-bold mb-1" style={{ color: activeColor }}>{isEs ? 'Beneficios' : 'Benefits'}</h3>
                  <ul className="space-y-1 text-gray-700">
                    {currentProduct.benefits.map((ben, i) => (
                      <li key={i}>- {ben}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentProduct.idealFor && currentProduct.idealFor.length > 0 && (
                <div>
                  <h3 className="font-bold mb-1" style={{ color: activeColor }}>{isEs ? 'Ideal para consumir:' : 'Ideal for:'}</h3>
                  <ul className="space-y-1 text-gray-700">
                    {currentProduct.idealFor.map((ideal, i) => (
                      <li key={i}>- {ideal}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentProduct.whyChoose && currentProduct.whyChoose.length > 0 && (
                <div>
                  <h3 className="font-bold mb-1" style={{ color: activeColor }}>{isEs ? '¿Por qué elegirla?' : 'Why choose it?'}</h3>
                  <ul className="space-y-1 text-gray-700">
                    {currentProduct.whyChoose.map((why, i) => (
                      <li key={i}>- {why}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-bold mb-1" style={{ color: activeColor }}>{isEs ? 'Información del producto' : 'Product Info'}</h3>
                <ul className="space-y-1 text-gray-700">
                  {productVariant && <li>- Sabor: {productVariant}</li>}
                  {currentProduct.sizes && <li>- Peso por unidad: {currentProduct.sizes[1] || currentProduct.sizes[0]}</li>}
                  <li>- Conservar en lugar fresco y seco.</li>
                </ul>
              </div>
            </div>

            {/* ── BOTONES DE ACCIÓN (SELECTOR DE SABOR) ── */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto pt-6 border-t border-gray-200">
              
              <div className="relative w-full sm:w-auto">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={filteredProducts.length <= 1}
                  className={`w-full px-6 py-3 rounded-full border-2 border-gray-300 font-bold flex items-center justify-between sm:justify-center gap-3 transition-colors ${
                    filteredProducts.length > 1 ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-80 cursor-default'
                  }`}
                >
                  <span className="text-sm uppercase text-gray-700">
                    {isEs ? 'SABOR:' : 'TIPO:'} {productVariant || (isEs ? 'Original' : 'Original')}
                  </span>
                  {filteredProducts.length > 1 && (
                    <ChevronDown size={18} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {isDropdownOpen && (
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                )}

                {isDropdownOpen && filteredProducts.length > 1 && (
                  <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-20">
                    {filteredProducts.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProductIndex(idx);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-sm transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-0 ${
                          selectedProductIndex === idx ? 'font-black bg-gray-50' : 'font-medium text-gray-600'
                        }`}
                        style={{ color: selectedProductIndex === idx ? activeColor : 'inherit' }}
                      >
                        {isEs ? p.variantEs || 'Original' : p.variantEn || 'Original'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a 
                href={currentProduct.mlUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3 rounded-full text-white font-bold text-center transition-opacity shadow-md hover:opacity-90"
                style={{ backgroundColor: activeColor }}
              >
                {isEs ? 'Comprar en MercadoLibre' : 'Buy on MercadoLibre'}
              </a>
            </div>
          </div>
        </div>

        {/* ── 3. BANNER DE TAMAÑOS ── */}
        <div className="mt-6 flex flex-col items-center">
          <div 
            className="w-full rounded-[1.5rem] py-4 text-center shadow-md mb-4 transition-colors duration-500"
            style={{ backgroundColor: activeColor }}
          >
            <h2 
              className="text-white text-3xl md:text-4xl font-black uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {isEs ? 'TAMAÑOS' : 'SIZES'}
            </h2>
          </div>
          
          {currentProduct.sizes && (
            <div className="flex flex-wrap gap-4 justify-center">
              {currentProduct.sizes.map((size) => (
                <span 
                  key={size}
                  className="px-6 py-2 bg-[#fcfbf9] text-gray-800 font-bold rounded-full shadow-sm border border-gray-200"
                >
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default ProductDetail;
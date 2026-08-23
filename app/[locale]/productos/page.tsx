"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

// 👇 IMPORTÁ TUS PRODUCTOS DESDE LA RUTA CORRECTA
import { products } from '@/lib/data/products';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'camera-controls'?: boolean | string;
        'camera-orbit'?: string;
        'camera-target'?: string;
        'interaction-prompt'?: string;
        'shadow-intensity'?: string | number;
        exposure?: string | number;
        'environment-image'?: string;
        'skybox-image'?: string;
        loading?: 'auto' | 'lazy' | 'eager';
        poster?: string;
        suppressHydrationWarning?: boolean;
        [key: string]: any; 
      };
    }
  }
}

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

const VARIANT_COLORS: Record<string, string> = {
  "Crocante": "#d82e2e",   // Rojo
  "Stevia": "#8cc63f",     // Verde
  "Cacao": "#5e3a24",      // Marrón
  "Coco": "#00a9e0",       // Celeste
  "Proteína": "#6b6b6b",   // Gris
  "Natural": "#ef7f17",     // Naranja (o el color que prefieras)
  "PROTEIN Cookies & Cream": "#800080",  // Morado
  "PROTEIN Salted Caramel": "#ff8c00"  // Naranja oscuro
};

const UI_CATEGORIES = Object.keys(CATEGORY_MAP);

export function ProductDetail() {
  const lang = useLocale();
  
  // ── ESTADOS Y REFS ──
  const [activeCategory, setActiveCategory] = useState("PASTAS DE MANÍ");
  const [selectedProductIndex, setSelectedProductIndex] = useState(0); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const [isMounted, setIsMounted] = useState(false);
  
  const [activeView, setActiveView] = useState("front"); 
  
  // Referencias
  const modelRef = useRef<any>(null);
  const thumbsRef = useRef<HTMLDivElement>(null); // 👈 Nueva ref para el carrusel de miniaturas

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSelectedProductIndex(0);
    setCurrentImageIndex(0);
    setActiveView("front");
  }, [activeCategory]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setActiveView("front");
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

  // ── FUNCIÓN DE SCROLL PARA MINIATURAS ──
  const scrollThumbs = (direction: 'left' | 'right') => {
    if (thumbsRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      thumbsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // ── FUNCIONES DE CONTROL DE CÁMARA 3D ──
  const handleZoomNutrition = () => {
    if (modelRef.current) {
      modelRef.current.autoRotate = false;
      modelRef.current.setAttribute("camera-target", "0m -0.9m 0m");
      modelRef.current.setAttribute("camera-orbit", "170deg 90deg 10%");
      setActiveView("nutrition"); 
    }
  };

  const handleResetView = () => {
    if (modelRef.current) {
      modelRef.current.setAttribute("camera-target", "auto auto auto");
      modelRef.current.setAttribute("camera-orbit", "-90deg 75deg 105%");
      setActiveView("front"); 
    }
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
            <div className="w-full lg:w-5/12 flex flex-col items-center justify-start h-full">
              
              {/* Contenedor de la Imagen o Modelo 3D */}
              <div 
                className="relative w-full flex items-center justify-center"
                style={{ height: '420px' }}
              >
                {productImages.length > 1 && (
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-0 z-10 p-2 bg-gray-200/60 hover:bg-gray-300/80 rounded-md transition-colors backdrop-blur-sm"
                  >
                    <ChevronLeft size={24} className="text-gray-600" />
                  </button>
                )}

                {/* LÓGICA CONDICIONAL: 3D vs IMAGEN 2D */}
                {(currentProduct as any).model3d && currentImageIndex === 0 ? (
                  <div 
                    key={`3d-${selectedProductIndex}`} 
                    className="relative w-full animate-fade-in flex items-center justify-center" 
                    style={{ height: '100%' }} 
                  >
                    {isMounted && (
                      <model-viewer
                        ref={modelRef}
                        src={`/${(currentProduct as any).model3d}`}
                        alt={productName}
                        auto-rotate={false}
                        camera-controls={true}
                        camera-orbit="-90deg 75deg 105%" 
                        camera-target="auto auto auto"
                        interaction-prompt="none"
                        shadow-intensity="1"
                        exposure="1"
                        environment-image="neutral"
                        loading="eager"
                        poster={`/${currentProduct.image}`}
                        style={{ 
                          width: "100%", 
                          height: "420px", 
                          minHeight: "350px", 
                          display: "block",
                          margin: "0 auto"
                        }} 
                        suppressHydrationWarning={true}
                      ></model-viewer>
                    )}
                  </div>
                ) : (
                  <div key={`img-${selectedProductIndex}`} className="relative w-full h-[260px] md:h-[380px] lg:h-[420px] animate-fade-in">
                    <ImageWithFallback
                      src={`/${productImages[currentImageIndex]}`} 
                      alt={`${productName} ${productVariant || ''} - Vista ${currentImageIndex + 1}`}
                      style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      className="transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>
                )}

                {productImages.length > 1 && (
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-0 z-10 p-2 bg-gray-200/60 hover:bg-gray-300/80 rounded-md transition-colors backdrop-blur-sm"
                  >
                    <ChevronRight size={24} className="text-gray-600" />
                  </button>
                )}
              </div>

              {/* BOTONES DE CONTROL 3D */}
              {(currentProduct as any).model3d && currentImageIndex === 0 ? (
                <div className="mt-6 flex flex-wrap justify-center gap-8 animate-fade-in">
                  <button
                    onClick={handleResetView}
                    className="text-sm md:text-base font-black uppercase tracking-wider transition-colors duration-300 hover:opacity-70"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      color: activeView === 'front' ? activeColor : '#000000' 
                    }}
                  >
                    • {isEs ? 'Frente' : 'Front'}
                  </button>
                  <button
                    onClick={handleZoomNutrition}
                    className="text-sm md:text-base font-black uppercase tracking-wider transition-colors duration-300 hover:opacity-70"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      color: activeView === 'nutrition' ? activeColor : '#000000' 
                    }}
                  >
                    • {isEs ? 'Tabla Nutricional' : 'Nutrition Table'}
                  </button>
                </div>
              ) : null}

              {/* 3. GALERÍA DE MINIATURAS (Flechas separadas) */}
              {filteredProducts.length > 1 && (
                <div className="mt-8 md:mt-auto pt-6 w-full flex justify-center relative px-8"> 
                  {/* Se agregó px-8 arriba para darle espacio a las flechas y que no se corten */}
                  <div className="relative w-full max-w-[340px] md:max-w-[420px] flex items-center justify-center">
                    
                    {/* Flecha Izquierda (Más separada) */}
                    <button 
                      onClick={() => scrollThumbs('left')}
                      className="absolute left-[-30px] md:left-[-45px] z-10 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow hover:scale-105 transition-all text-gray-500 hover:text-gray-800"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* Contenedor deslizable */}
                    <div 
                      ref={thumbsRef}
                      className="flex gap-3 md:gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide scroll-smooth w-full justify-start"
                    >
                      {filteredProducts.map((p, idx) => {
                        const isSelected = selectedProductIndex === idx;
                        const thumbImage = (p as any).images?.length > 0 ? (p as any).images[0] : p.image;
                        
                        return (
                          <button
                            key={p.id || idx}
                            onClick={() => setSelectedProductIndex(idx)}
                            className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white border-2 transition-all duration-200 overflow-hidden shadow-sm hover:scale-105"
                            style={{
                              borderColor: isSelected ? activeColor : 'transparent',
                              opacity: isSelected ? 1 : 0.6
                            }}
                            title={isEs ? p.variantEs : p.variantEn}
                          >
                            <ImageWithFallback
                              src={`/${thumbImage}`}
                              alt={p.variantEs || p.nameEs}
                              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Flecha Derecha (Más separada) */}
                    <button 
                      onClick={() => scrollThumbs('right')}
                      className="absolute right-[-30px] md:right-[-45px] z-10 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow hover:scale-105 transition-all text-gray-500 hover:text-gray-800"
                    >
                      <ChevronRight size={20} />
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
                {currentProduct.benefits && currentProduct.benefits.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2 uppercase tracking-wide" style={{ color: activeColor }}>{isEs ? 'Beneficios' : 'Benefits'}</h3>
                    <ul className="space-y-1.5 text-gray-700">
                      {currentProduct.benefits.map((ben: string, i: number) => (
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
                      {currentProduct.idealFor.map((ideal: string, i: number) => (
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
                      {currentProduct.whyChoose.map((why: string, i: number) => (
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
                    {productVariant && <li className="flex gap-2"><span style={{ color: activeColor }}>•</span> {isEs ? 'Sabor:' : 'Flavor:'} {productVariant}</li>}
                    {currentProduct.sizes && <li className="flex gap-2"><span style={{ color: activeColor }}>•</span> {isEs ? 'Peso:' : 'Weight:'} {currentProduct.sizes[1] || currentProduct.sizes[0]}</li>}
                    <li className="flex gap-2"><span style={{ color: activeColor }}>•</span> {isEs ? 'Conservar en lugar fresco.' : 'Store in a cool place.'}</li>
                  </ul>
                </div>
              </div>

              {/* ── BOTÓN COMPRAR ── */}
              {/* Se redujo pt-6 a pt-4 en el contenedor para subir el botón */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                {/* Se agregó sm:ml-8 lg:ml-12 a la etiqueta <a> para empujar el botón a la derecha */}
                <a 
                  href={(currentProduct as any).mlUrl} 
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
                    {isEs ? 'Comprar' : 'Buy'}
                  </span>
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

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease-out forwards;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Oculta los bordes azules que a veces Chrome le pone al model-viewer al hacer clic */
        model-viewer {
          --poster-color: transparent;
        }
        model-viewer:focus-visible {
          outline: none;
        }
      `}</style>
    </section>
  );
}

export default ProductDetail;
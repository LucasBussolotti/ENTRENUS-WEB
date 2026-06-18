"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { ShoppingBag } from "lucide-react";
import { useLocale } from 'next-intl';
import { products } from '../lib/data/products';
import { ImageWithFallback } from './figma/ImageWithFallback'; 

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const AUTO_PLAY_INTERVAL = 2700;
const ITEM_HEIGHT = 70;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function ProductMosaic2() {
  const lang = useLocale();
  const featuredProducts = products.slice(0, 8);

  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % featuredProducts.length) + featuredProducts.length) % featuredProducts.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + featuredProducts.length) % featuredProducts.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = featuredProducts.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <section style={{ position: 'relative', background: 'var(--color-navbar)', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: 'var(--color-naranja)',
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        >
          {lang === 'es' ? 'Nuestros Productos' : 'Our Products'}
        </h2>

        <div 
          className="relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] lg:aspect-[21/9]"
          style={{ 
            background: 'var(--color-footpage)', 
            borderRadius: 'clamp(1.5rem, 4vw, 3rem)' 
          }}
        >
          
          {/* ── PANEL IZQUIERDO (Lista de botones) ── */}
          <div className="w-full lg:w-[45%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:pl-12">
            
            <div 
              className="absolute inset-x-0 top-0 h-16 md:h-24 z-40" 
              style={{ background: 'linear-gradient(to bottom, var(--color-footpage) 10%, transparent)' }} 
            />
            <div 
              className="absolute inset-x-0 bottom-0 h-16 md:h-24 z-40" 
              style={{ background: 'linear-gradient(to top, var(--color-footpage) 10%, transparent)' }} 
            />
            
            <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
              {featuredProducts.map((product, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(
                  -(featuredProducts.length / 2),
                  featuredProducts.length / 2,
                  distance
                );

                return (
                  <motion.div
                    key={product.id}
                    style={{
                      height: ITEM_HEIGHT,
                      width: "fit-content",
                    }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className="absolute flex items-center justify-start"
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={cn(
                        "relative flex items-center gap-4 px-5 md:px-8 py-3 md:py-4 rounded-full transition-all duration-500 text-left group border-2",
                        isActive
                          ? "shadow-md z-10"
                          : "border-transparent hover:border-[color:var(--text-dark)]/10"
                      )}
                      style={{
                        backgroundColor: isActive ? 'var(--color-naranja)' : 'transparent',
                        borderColor: isActive ? 'var(--color-naranja)' : '',
                        color: isActive ? '#ffffff' : 'var(--text-dark)',
                      }}
                    >
                      <div
                        className="flex items-center justify-center transition-colors duration-500"
                        style={{ opacity: isActive ? 1 : 0.4 }}
                      >
                        <ShoppingBag size={18} strokeWidth={2.5} />
                      </div>

                      <span 
                        style={{ fontFamily: 'var(--font-display)' }}
                        className="font-bold text-sm md:text-[16px] tracking-wide whitespace-nowrap uppercase"
                      >
                        {lang === 'es' ? product.nameEs : product.nameEn}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── LÍNEA DIVISORIA BIEN VISIBLE Y ELEGANTE ── */}
          {/* Vertical para Escritorio: Más gruesa (2px), centrada (h-[75%]), y con más opacidad (0.35) */}
          <div 
            className="hidden lg:block w-[2px] h-[75%] my-auto z-40"
            style={{ 
              background: 'linear-gradient(to bottom, transparent, var(--text-dark), transparent)',
              opacity: 0.35 
            }}
          />
          {/* Horizontal para Celulares: Centrada y adaptada al ancho */}
          <div 
            className="lg:hidden w-[75%] h-[2px] mx-auto my-4 z-40"
            style={{ 
              background: 'linear-gradient(to right, transparent, var(--text-dark), transparent)',
              opacity: 0.35 
            }}
          />

          {/* ── PANEL DERECHO (Imágenes de Productos) ── */}
          <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative flex items-center justify-center py-16 px-6 overflow-hidden">
            <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
              {featuredProducts.map((product, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={product.id}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -80 : isNext ? 80 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                      rotate: isPrev ? -4 : isNext ? 4 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    style={{ background: 'var(--color-navbar)' }}
                    className="absolute inset-0 rounded-[2rem] overflow-hidden border-[6px] md:border-8 border-[color:var(--color-footpage)] shadow-xl origin-center flex flex-col"
                  >
                    
                    <div className="flex-1 relative w-full h-full p-8 flex items-center justify-center transition-all duration-700">
                      <div className={cn(
                        "w-full h-full relative transition-all duration-700",
                        isActive ? "scale-100 grayscale-0 blur-0" : "scale-90 grayscale blur-[2px] opacity-60"
                      )}>
                        <ImageWithFallback
                          src={product.image}
                          alt={lang === 'es' ? product.nameEs : product.nameEn}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.15))'
                          }}
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-8 pt-24 flex flex-col justify-end pointer-events-none"
                          style={{
                            background: 'linear-gradient(to top, var(--color-navbar) 60%, transparent)'
                          }}
                        >
                          <p 
                            className="font-normal text-xl md:text-2xl leading-tight tracking-tight"
                            style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-display)', fontWeight: 800 }}
                          >
                            {(lang === 'es' ? product.variantEs : product.variantEn) || (lang === 'es' ? product.nameEs : product.nameEn)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── OVERLAY DE ONDA ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '-1px', 
          left: 0,
          right: 0,
          height: '35px',
          zIndex: 10,
          pointerEvents: 'none',
          lineHeight: 0,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,15 
               C100,15 150,90 200,90 
               C250,90 300,15 400,15 
               C480,15 500,60 550,60 
               C600,60 620,15 700,15 
               C780,15 820,110 880,110 
               C940,110 980,15 1080,15 
               C1180,15 1220,80 1280,80 
               C1340,80 1380,15 1440,15 
               L1440,120 L0,120 Z"
            fill="#111111" 
          />
        </svg>
      </div>
    </section>
  );
}

export default ProductMosaic2;
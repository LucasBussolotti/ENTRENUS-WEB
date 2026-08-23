"use client";

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Download, Play, X } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'; 

// ── DATOS DE PRUEBA (12 Ítems para una grilla perfecta) ──
const RECIPES = [
  { id: 1, title: 'Receta 1', coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 2, title: 'Receta 2', coverImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
  { id: 3, title: 'Receta 3', coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 4, title: 'Receta 4', coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
  { id: 5, title: 'Receta 5', coverImage: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 6, title: 'Receta 6', coverImage: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
  { id: 7, title: 'Receta 7', coverImage: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 8, title: 'Receta 8', coverImage: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
  { id: 9, title: 'Receta 9', coverImage: 'https://images.unsplash.com/photo-1484723091791-001e37b139db?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 10, title: 'Receta 10', coverImage: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
  { id: 11, title: 'Receta 11', coverImage: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 12, title: 'Receta 12', coverImage: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
];

export default function RecipesPage() {
  const lang = useLocale();
  const t = useTranslations('recipes'); 

  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <main style={{ background: 'var(--color-footpage)', minHeight: '100vh', paddingBottom: '4rem' }}>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* ── TÍTULO GIGANTE ── */}
        <h1 
          className="text-center w-full"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(4rem, 14vw, 11rem)', 
            color: 'var(--color-naranja)', 
            fontWeight: 900,
            lineHeight: 0.85,
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase'
          }}
        >
          {t('title')}
        </h1>

        {/* ── CONTENEDOR BLANCO / CREMA ── */}
        <div 
          style={{ 
            background: 'var(--color-navbar)', 
            borderRadius: 'clamp(1.5rem, 4vw, 2.5rem)', 
            padding: 'clamp(1rem, 3vw, 2.5rem)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)' 
          }}
        >
          {/* ── GRILLA DE RECETAS (Sin textos dinámicos, full imagen) ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {RECIPES.map((recipe) => {
              const isPlaying = playingId === recipe.id;

              return (
                <div 
                  key={recipe.id} 
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-black"
                  style={{ cursor: isPlaying ? 'default' : 'pointer' }}
                  onClick={() => {
                    if (!isPlaying) setPlayingId(recipe.id);
                  }}
                >
                  {isPlaying ? (
                    <div className="w-full h-full relative">
                      <video 
                        src={recipe.videoUrl} 
                        controls 
                        autoPlay 
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingId(null);
                        }}
                        aria-label={lang === 'es' ? 'Cerrar video' : 'Close video'}
                        className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-full hover:bg-black/80 transition-colors z-50"
                      >
                        <X size={16} color="white" />
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Imagen con tus textos ya diseñados */}
                      <ImageWithFallback
                        src={recipe.coverImage}
                        alt={recipe.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Solo dejamos los íconos de UI, eliminamos el gradiente y las etiquetas de texto */}
                      <div className="absolute top-3 left-3 bg-black/20 backdrop-blur-md p-1.5 rounded-md">
                        <Download size={14} color="white" />
                      </div>
                      <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-md p-1.5 rounded-md group-hover:scale-110 transition-transform duration-300">
                        <Play size={14} color="white" fill="white" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── TEXTO @ENTRENUTS ── */}
          <div className="mt-8 md:mt-12 mb-4 text-center">
            <p 
              className="text-lg md:text-xl font-black"
              style={{ color: 'var(--color-naranja)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.3 }}
            >
              {t('findMore')} <br className="hidden md:block" /> @ENTRENUTS
            </p>
          </div>
        </div>

        {/* ── CALL TO ACTION CREADORES ── */}
        <div className="mt-12 md:mt-16 text-center w-full px-4">
          <h4 
            className="text-[1.1rem] md:text-[1.35rem] mb-1"
            style={{ 
              color: 'var(--text-dark)', 
              fontFamily: 'var(--font-body)', 
              fontWeight: 700, 
              letterSpacing: '-0.01em'
            }}
          >
            {t('creatorTitle')}
          </h4>
          <p 
            className="text-[0.95rem] md:text-[1.1rem]"
            style={{ 
              color: 'var(--text-dark)', 
              fontFamily: 'var(--font-body)', 
              fontWeight: 400, 
              letterSpacing: '0.01em'
            }}
          >
            {t('creatorSubtitle')}
          </p>
        </div>

      </div>
    </main>
  );
}
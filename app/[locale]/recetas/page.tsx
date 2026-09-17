"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, Play, X } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface Recipe {
  id: number
  coverImage: string
  // Link del reel o post, ej.: https://www.instagram.com/reel/ABC123/
  reelUrl: string
}

// ── DATOS DE PRUEBA: reemplazar reelUrl por los links reales de cada reel ──
const INSTAGRAM_PROFILE = 'https://www.instagram.com/reel/DbMDOxYR0ii/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==';

const RECIPES: Recipe[] = [
  { id: 1, coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 2, coverImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 3, coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 4, coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 5, coverImage: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 6, coverImage: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 7, coverImage: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 8, coverImage: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 9, coverImage: 'https://images.unsplash.com/photo-1484723091791-001e37b139db?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 10, coverImage: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 11, coverImage: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
  { id: 12, coverImage: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80', reelUrl: INSTAGRAM_PROFILE },
];

function getInstagramEmbedUrl(url: string): string | null {
  const match = url.match(/instagram\.com\/(reels?|p)\/([\w-]+)/);
  if (!match) return null;
  const type = match[1] === 'p' ? 'p' : 'reel';
  return `https://www.instagram.com/${type}/${match[2]}/embed/`;
}

export default function RecipesPage() {
  const t = useTranslations('recipes');

  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeEmbedUrl = activeRecipe ? getInstagramEmbedUrl(activeRecipe.reelUrl) : null;

  useEffect(() => {
    if (activeRecipe && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [activeRecipe]);

  const cardClassName = "group relative block w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm hover:shadow-lg focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-naranja)] transition-all duration-300 bg-black cursor-pointer";

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
              const cardContent = (
                <>
                  {/* Imagen con tus textos ya diseñados */}
                  <ImageWithFallback
                    src={recipe.coverImage}
                    alt={t('recipeAlt', { number: recipe.id })}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute top-3 left-3 bg-black/20 backdrop-blur-md p-1.5 rounded-md">
                    <Download size={14} color="white" aria-hidden="true" />
                  </div>
                  <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-md p-1.5 rounded-md group-hover:scale-110 transition-transform duration-300">
                    <Play size={14} color="white" fill="white" aria-hidden="true" />
                  </div>
                </>
              );

              // Si el link no es un reel/post embebible (ej. el perfil), se abre en Instagram
              if (!getInstagramEmbedUrl(recipe.reelUrl)) {
                return (
                  <a
                    key={recipe.id}
                    href={recipe.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('watchReel', { number: recipe.id })}
                    className={cardClassName}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <button
                  key={recipe.id}
                  type="button"
                  onClick={() => setActiveRecipe(recipe)}
                  aria-label={t('watchReel', { number: recipe.id })}
                  className={cardClassName}
                >
                  {cardContent}
                </button>
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

      {/* ── MODAL DEL REEL ── */}
      {/* El iframe se desmonta al cerrar para cortar la reproducción */}
      <dialog
        ref={dialogRef}
        aria-label={activeRecipe ? t('reelTitle', { number: activeRecipe.id }) : undefined}
        onClose={() => setActiveRecipe(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-[400px] overflow-visible bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {activeRecipe && activeEmbedUrl && (
          <div className="relative">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={t('closeVideo')}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-black/80 p-2 transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={18} color="white" aria-hidden="true" />
            </button>

            <div className="overflow-hidden rounded-xl bg-white">
              <iframe
                src={activeEmbedUrl}
                title={t('reelTitle', { number: activeRecipe.id })}
                className="block h-[min(80vh,720px)] w-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <a
              href={activeRecipe.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center text-sm font-bold text-white underline underline-offset-4"
            >
              {t('viewOnInstagram')}
            </a>
          </div>
        )}
      </dialog>
    </main>
  );
}

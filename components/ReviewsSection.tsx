"use client"

import React, { useRef, useState } from 'react'
import { Star, Play, BadgeCheck, ShoppingBag } from 'lucide-react' // 👈 Sumamos iconos nuevos
import { useTranslations } from 'next-intl'
import { ImageWithFallback } from './figma/ImageWithFallback'

// ─── REVIEWS SIMULANDO MERCADO LIBRE ───
const reviews = [
  {
    name: 'Valentina M.',
    date: 'Hace 2 semanas',
    rating: 5,
    text: 'Súper recomendable!! Exquisito volveré a comprar sin dudas. Es imposible que no te guste, no conocía la marca!! riquísimo!!! 😋.',
  },
  {
    name: 'Martín R.',
    date: 'Hace 1 mes',
    rating: 5,
    text: 'Compré esta y con stevia, las dos me gustaron, pero en lo personal no hay con que darle a la natural.',
  },
  {
    name: 'Lucía P.',
    date: 'Hace 2 meses',
    rating: 5,
    text: 'Rica, saludable, sin azúcar agregada, la recomiendo. Me llego ayer a casa, muy bien presentada.',
  },
]

const instagramReels = [
  {
    title: 'Mouse Viral',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80',
    videoSrc: 'images/Reel1.mp4', 
    views: '12.4k',
    link: 'https://www.instagram.com/p/DWjgotjgFdr/', 
  },
  {
    title: 'Barritas en la Rutina',
    image: 'https://images.unsplash.com/photo-1558021984-46774cdb0e83?w=600&q=80',
    videoSrc: 'images/Reel2.mp4',
    views: '8.2k',
    link: 'https://www.instagram.com/entrenuts/',
  },
  {
    title: 'Pancakes Proteicos',
    image: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=600&q=80',
    videoSrc: 'images/Reel3.mp4',
    views: '15.1k',
    link: 'https://www.instagram.com/entrenuts/',
  },
  {
    title: 'Postre Banana Chocolate',
    image: 'https://images.unsplash.com/photo-1626697556426-8a55a8af4999?w=600&q=80',
    videoSrc: 'images/Reel4.mp4',
    views: '9.8k',
    link: 'https://www.instagram.com/entrenuts/',
  },
]

// ─── MINI COMPONENTE PARA CONTROLAR EL VIDEO EN HOVER ───
function ReelCard({ reel }: { reel: any }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Autoplay bloqueado", err))
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <a
      href={reel.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        flex: isHovered ? '1.4' : '1', 
        aspectRatio: '9/16', 
        transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)', 
        minWidth: '180px', 
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'block',
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <video
          ref={videoRef}
          src={reel.videoSrc}
          preload="metadata" 
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
            pointerEvents: 'none', 
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(4px)',
            borderRadius: '50%',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isHovered ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <Play size={24} fill="white" color="white" style={{ marginLeft: '4px' }} />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.25rem',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'var(--font-body)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Play size={12} fill="currentColor" /> {reel.views}
          </span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#ffffff',
              marginTop: '0.25rem',
              lineHeight: 1.3,
            }}
          >
            {reel.title}
          </p>
        </div>
      </div>
    </a>
  )
}

// ─── COMPONENTE PRINCIPAL ───
export function ReviewsSection() {
  const t = useTranslations('reviews')

  return (
    <section style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)', background: '#e8ddca' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900,
              color: '#111111',
              marginBottom: '0.6rem',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            {t('sectionTitle')}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#7A6F64' }}>
            {t('sectionSub')}
          </p>
        </div>

        {/* Reviews grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '5rem',
          }}
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff', // 👈 Fondo blanco para que parezca widget de ML
                borderRadius: '14px',
                padding: '1.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', // Sombra suave
                border: '1px solid #ebebeb'
              }}
            >
              {/* Encabezado de la Card: Estrellas y Tag de ML */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: r.rating }).map((_, s) => (
                    // Usamos el azul clásico de ML para las estrellas (o podés volver a tu naranja)
                    <Star key={s} size={16} fill="#3483FA" color="#3483FA" />
                  ))}
                </div>
                <span style={{ fontSize: '0.7rem', color: '#999', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShoppingBag size={12} /> Mercado Libre
                </span>
              </div>

              {/* Texto de la Review */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: '#333333',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                }}
              >
                {r.text}
              </p>

              {/* Pie de la Card: Inicial y Compra Verificada */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Círculo con la inicial (Estilo ML) */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>
                  {r.name.charAt(0)}
                </div>
                
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#111111',
                    }}
                  >
                    {r.name} <span style={{ color: '#999', fontWeight: 400, marginLeft: '4px' }}>• {r.date}</span>
                  </p>
                  
                  {/* Etiqueta Verde de ML */}
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: '0.75rem', 
                      color: '#00a650', // 👈 Verde oficial de ML 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      fontWeight: 600,
                      marginTop: '2px'
                    }}
                  >
                    <BadgeCheck size={14} /> Compra verificada
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Reels Flexbox Container */}
        <div
          style={{
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            width: '100%',
          }}
        >
          {instagramReels.map((reel, i) => (
            <ReelCard key={i} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  )
}
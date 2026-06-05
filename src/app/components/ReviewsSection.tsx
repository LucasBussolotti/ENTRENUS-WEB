import React, { useRef, useState } from 'react'
import { Star, Play } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext'
import { ImageWithFallback } from './figma/ImageWithFallback'

const reviews = [
  {
    name: 'Valentina M.',
    city: 'Buenos Aires',
    rating: 5,
    text: 'La pasta de maní natural es adictiva. Sin azúcar, sin aceites raros — finalmente una marca que cumple lo que promete.',
    avatar: 'https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=100&q=80',
  },
  {
    name: 'Martín R.',
    city: 'Córdoba',
    rating: 5,
    text: 'Las barras proteicas llegaron y ya las pido de nuevo. 14g de proteína y no saben a cartón. Increíble.',
    avatar: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?w=100&q=80',
  },
  {
    name: 'Lucía P.',
    city: 'Rosario',
    rating: 5,
    text: 'La granola original con yogur es mi desayuno hace tres meses. No hay vuelta atrás. Mis hijos la aman.',
    avatar: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=100&q=80',
  },
]

// Sumamos la propiedad "videoSrc" apuntando a tus archivos .mp4 locales
const instagramReels = [
  {
    title: 'Mouse Viral',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80',
    videoSrc: './Reel1.mp4', 
    views: '12.4k',
    link: 'https://www.instagram.com/p/DWjgotjgFdr/', 
  },
  {
    title: 'Smoothie Bowl Proteico',
    image: 'https://images.unsplash.com/photo-1558021984-46774cdb0e83?w=600&q=80',
    videoSrc: './Reel1.mp4',
    views: '8.2k',
    link: 'https://www.instagram.com/entrenuts/',
  },
  {
    title: 'Postre Keto en 5 minutos',
    image: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=600&q=80',
    videoSrc: './Reel1.mp4',
    views: '15.1k',
    link: 'https://www.instagram.com/entrenuts/',
  },
  {
    title: 'Snack con Aceite de Coco',
    image: 'https://images.unsplash.com/photo-1626697556426-8a55a8af4999?w=600&q=80',
    videoSrc: './Reel1.mp4',
    views: '9.8k',
    link: 'https://www.instagram.com/entrenuts/',
  },
]

// ─── MINI COMPONENTE PARA CONTROLAR EL VIDEO EN HOVER ───
function ReelCard({ reel }: { reel: any }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false) // <--- Estado para controlar el ancho

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
        /* ── CRECIMIENTO DIAGONAL PROPORCIONAL ── */
        flex: isHovered ? '1.4' : '1', // 1.4 lo hace un 40% más grande que los demás
        aspectRatio: '9/16', // <-- ESTA ES LA CLAVE: Fuerza a que siempre sea un rectángulo vertical
        transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)', // Anima tanto el ancho como el alto
        minWidth: '180px', // Evita que se aplasten en celulares
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'block',
        position: 'relative',
        // ¡Ojo! Ya no hay "height" fijo acá.
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        
        {/* Etiqueta de Video Nativa */}
        <video
          ref={videoRef}
          src={reel.videoSrc}
          /* ELIMINAMOS el poster={reel.image} */
          preload="metadata" /* <--- NUEVO: Carga el primer frame del video para usarlo de portada */
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
        
        {/* Sombra inferior para leer el texto */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
            pointerEvents: 'none', 
          }}
        />

        {/* Ícono de Play dinámico que desaparece al reproducir */}
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
          }}
          className="transition-opacity duration-300 group-hover:opacity-0"
        >
          <Play size={24} fill="white" color="white" style={{ marginLeft: '4px' }} />
        </div>

        {/* Textos inferiores */}
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
  const { t, lang } = useTranslation()

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
            {t.reviews.sectionTitle}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#7A6F64' }}>
            {t.reviews.sectionSub}
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
                background: '#F8F3EC',
                borderRadius: '14px',
                padding: '1.75rem',
              }}
            >
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={14} fill="#F27A18" color="#F27A18" />
                ))}
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: '#2A2218',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}
              >
                "{r.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ImageWithFallback
                  src={r.avatar}
                  alt={r.name}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#111111',
                    }}
                  >
                    {r.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#7A6F64' }}>
                    {r.city}
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
            alignItems: 'center', /* <-- NUEVO: Hace que el bloque crezca desde el centro hacia arriba y abajo */
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
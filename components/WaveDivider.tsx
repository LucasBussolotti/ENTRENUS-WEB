interface WaveDividerProps {
  fromColor?: string
  toColor?: string
  flip?: boolean
  height?: number
  /** Solapa 1px con la sección siguiente. Desactivar cuando la onda es el
      último hijo de un contenedor con overflow hidden: el px saldría del recorte. */
  overlapNext?: boolean
}

export function WaveDivider({ 
  fromColor = 'var(--background)', 
  toColor = 'transparent', 
  flip = false, 
  height = 80, // Reducimos el default a 80 para que no sea tan masivo
  overlapNext = true,
}: WaveDividerProps) {
  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        /* Con densidades de pantalla fraccionarias (DPR 2.75, zoom) los bordes
           caen entre píxeles y aparecían líneas de 1px. Por eso la onda pinta el
           color de abajo, el fondo es del color de cada vecino en su borde (el
           último px queda siempre bajo la onda, que baja hasta 110/120) y se
           solapa 1px con cada sección: en cada borde sólo se mezclan colores
           iguales. */
        background: `linear-gradient(to bottom, ${fromColor} calc(100% - 1px), ${toColor} calc(100% - 1px))`,
        lineHeight: 0,
        overflow: 'hidden',
        transform: flip ? 'scaleY(-1)' : 'none',
        marginTop: '-1px',
        marginBottom: overlapNext ? '-1px' : 0,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ width: '100%', height: `calc(${height}px + 2px)`, display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          /* Este es el trazado orgánico estilo "gotas" que armamos para el Navbar, 
             garantizando que toda la identidad visual use exactamente la misma onda */
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
          fill={toColor}
        />
      </svg>
    </div>
  )
}

export function PageHeader({
  tag,
  title,
  subtitle,
  dark = false,
}: {
  tag?: string
  title: string
  subtitle?: string
  dark?: boolean
}) {
  const bg = dark ? '#111111' : 'var(--background)'
  const waveFrom = bg
  const waveTo = dark ? 'var(--background)' : '#111111'

  return (
    <>
      <div
        style={{
          background: bg,
          padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem) clamp(2.5rem, 4vw, 3.5rem)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {tag && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: '#C8935A',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </p>
          )}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: dark ? '#ffffff' : '#111111',
              marginBottom: subtitle ? '0.75rem' : 0,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 1.0,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                fontWeight: 400,
                color: dark ? 'rgba(255,255,255,0.6)' : '#7A6F64',
                maxWidth: '520px',
                margin: '0 auto',
                lineHeight: 1.65,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <WaveDivider fromColor={waveFrom} toColor={waveTo} height={80} />
    </>
  )
}

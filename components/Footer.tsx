import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ background: '#e8ddca', color: '#111111', fontFamily: 'var(--font-body)', padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: '1rem', marginLeft: '-1.60rem' }}>
            <img 
              src="/images/LOGO.png"
              alt="Entrenuts Logo"
              style={{ height: '75px', width: 'auto', display: 'block' }}
            />
          </div>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111111', lineHeight: 1.5 }}>
            Hacemos rico lo saludable
          </p>
        </div>

        {/* Empresa */}
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111111', marginBottom: '1rem' }}>Empresa</h4>
          {[
            { to: '/acerca_de', label: '¿Quiénes somos?' },
            { to: '/productos', label: 'Productos' },
            { to: '/distribuidor', label: 'Distribuidores' },
            { to: '/empleos', label: 'Trabajá con nosotros' },
          ].map(({ to, label }) => (
            <Link key={to} href={to} style={{ display: 'block', fontSize: '1rem', color: '#111111', textDecoration: 'none', marginBottom: '0.4rem' }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Contacto */}
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111111', marginBottom: '1rem' }}>Contacto</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '1rem' }}>
            <span>Pte. Illia 124, Colón Entre Ríos</span>
            <span>contacto@entrenuts.com.ar</span>
            <span>venta@entrenuts.com.ar</span>
            <span>(3447) 469008</span>
          </div>
        </div>

        {/* Redes */}
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111111', marginBottom: '1rem' }}>Redes</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '1rem' }}>
            <a href="https://www.instagram.com/entrenuts/" target="_blank" rel="noopener noreferrer" style={{ color: '#111111', textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: '#111111', textDecoration: 'none' }}>Facebook</a>
            <a href="#" style={{ color: '#111111', textDecoration: 'none' }}>Twitter</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0.1rem auto 0', fontSize: '0.8rem', color: '#111111' }}>
        <p>©2026 Entrenuts. All rights reserved</p>
      </div>
    </footer>
  )
}
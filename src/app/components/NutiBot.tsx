import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext'

export function NutiBot() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  // The actual Microsoft Copilot Studio webchat URL would go here
  const WEBCHAT_URL = 'https://copilotstudio.microsoft.com/environments/Default/bots/entrenuts-nuti/webchat'

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.5rem',
            width: 'min(380px, calc(100vw - 2rem))',
            height: '520px',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            zIndex: 9999,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#111111',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#C8935A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                }}
              >
                🥜
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  Nuti
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
                  Entrenuts
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* iframe — replace src with real webchat URL */}
          <iframe
            src={WEBCHAT_URL}
            style={{ flex: 1, border: 'none', width: '100%' }}
            title="Nuti - Asistente Entrenuts"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        title={t.footer.chatbotLabel}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '70px',  /* Agrandamos de 56px a 64px */
          height: '70px', /* Agrandamos de 56px a 64px */
          borderRadius: '50%',
          background: open ? '#111111' : '#C8935A',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(200,147,90,0.45)',
          zIndex: 10000,
          transition: 'background 0.2s, transform 0.2s',
          transform: open ? 'rotate(0deg)' : 'rotate(0deg)',
        }}
        className="hover:scale-110"
      >
        {open ? (
          /* Mantenemos la cruz blanca cuando el chat está abierto */
          <X size={26} color="#ffffff" /> 
        ) : (
          /* Reemplazamos el MessageCircle por tu propia imagen */
          <img 
            src="./LogoNuti.png" /* <--- ACÁ: Poné el nombre exacto de tu imagen */
            alt="Abrir chat"
            style={{
              width: '60px', /* Podés subir o bajar este valor para que la imagen respire bien dentro del círculo */
              height: '60px',
              objectFit: 'contain'
            }}
          />
        )}
      </button>
    </>
  )
}

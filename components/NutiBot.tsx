"use client"

import { useState } from 'react'
import { X, ChevronRight, MessageCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

// 1. Definimos explícitamente los pasos que existen en nuestro bot
type FlowStep = 'inicio' | 'empresa' | 'productos' | 'pastas' | 'envios' | 'miel';

// Definición de tipos para el flujo
interface Option {
  key: string; // Clave de traducción (bot.[key])
  next: FlowStep; // Usamos el tipo exacto en lugar de adivinarlo
}

interface Step {
  messageKey: string; // Clave de traducción (bot.[key])
  options: Option[];
}

// 2. Movemos la data AFUERA del componente. 
// Como solo guarda strings (las claves), no necesita estar adentro y optimiza React.
const nutiFlowData: Record<FlowStep, Step> = {
  inicio: {
    messageKey: 'welcomeMessage',
    options: [
      { key: 'optionCompany', next: 'empresa' },
      { key: 'optionProducts', next: 'productos' },
      { key: 'optionShipping', next: 'envios' }
    ]
  },
  empresa: {
    messageKey: 'companyDescription',
    options: [
      { key: 'optionReturn', next: 'inicio' }
    ]
  },
  productos: {
    messageKey: 'productCategoriesMessage',
    options: [
      { key: 'optionMainPastas', next: 'pastas' },
      { key: 'optionMielGhee', next: 'miel' }, 
      { key: 'optionReturn', next: 'inicio' }
    ]
  },
  pastas: {
    messageKey: 'pastasDescription',
    options: [
      { key: 'optionReturn', next: 'inicio' }
    ]
  },
  envios: {
    messageKey: 'shippingDescription',
    options: [
      { key: 'optionReturn', next: 'inicio' }
    ]
  },
  miel: {
    messageKey: 'optionReturn', // <-- Acá iría tu clave de traducción para la miel
    options: [
      { key: 'optionReturn', next: 'inicio' }
    ]
  }
};

export function NutiBot() {
  const t = useTranslations('bot')
  const [open, setOpen] = useState(false)
  
  // Usamos FlowStep para el tipado del estado
  const [currentStep, setCurrentStep] = useState<FlowStep>('inicio');

  // Función para resetear el bot al estado inicial
  const resetBot = () => {
    setOpen(false);
    setCurrentStep('inicio');
  };

  // Función para manejar el clic en una opción
  const handleOptionClick = (nextStep: FlowStep) => {
    setCurrentStep(nextStep);
  };

  const activeFlow = nutiFlowData[currentStep];

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
          {/* Header (Mantenido exactamente igual) */}
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
              onClick={resetBot} // Cierra y resetea al inicio
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

          {/* ÁREA DE CHAT (Reemplaza el iframe) */}
          <div style={{ 
              flex: 1, 
              background: '#f1f5f9', // Un fondo suave de chat
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              overflowY: 'auto'
          }}>
            {/* Burbuja del mensaje de Nuti */}
            <div style={{ 
                background: '#ffffff', 
                padding: '1rem',
                borderRadius: '16px',
                borderTopLeftRadius: '0px',
                width: 'min(90%, 300px)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: '#111111',
                lineHeight: '1.4'
            }}>
              {t(activeFlow.messageKey)}
            </div>

            {/* Menú de opciones (Botonera) */}
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '0.75rem',
                marginTop: 'auto' // Empuja las opciones hacia abajo
            }}>
              {activeFlow.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.next)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid transparent',
                    borderColor: '#C8935A',
                    color: '#C8935A',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    boxShadow: '0 1px 3px rgba(200,147,90,0.15)',
                    transition: 'all 0.2s',
                    width: '100%',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#C8935A';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#C8935A';
                  }}
                >
                  {t(option.key)}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAB button (Mantenido exactamente igual) */}
      <button
        onClick={() => {
            if (open) {
              resetBot(); // Cierra y resetea al inicio si estaba abierto
            } else {
              setOpen(true);
            }
        }}
        title={t('chatbotLabel')} 
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '70px',  
          height: '70px', 
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
          <X size={26} color="#ffffff" /> 
        ) : (
          <img 
            src="/images/LogoNuti.png" 
            alt="Abrir chat"
            style={{
              width: '60px', 
              height: '60px',
              objectFit: 'contain'
            }}
          />
        )}
      </button>
    </>
  )
}
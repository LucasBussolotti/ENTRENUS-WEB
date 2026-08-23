"use client"

import { useState, useEffect } from 'react'
import { X, ChevronRight, RotateCcw, Info, ShoppingBag, Truck, Undo2, Star, Leaf } from 'lucide-react'
import { useTranslations } from 'next-intl'

type FlowStep = 'inicio' | 'empresa' | 'productos' | 'pastas' | 'envios' | 'miel' | 'devoluciones' | 'valoraciones';

interface Option {
  key: string; 
  next: FlowStep; 
  icon?: any; 
}

interface Step {
  messageKey: string; 
  options: Option[];
}

const nutiFlowData: Record<FlowStep, Step> = {
  inicio: {
    messageKey: '¡Hola! Soy Nuti 💛. ¿En qué te puedo ayudar hoy?',
    options: [
      { key: 'Sobre EntreNuts', next: 'empresa', icon: Info },
      { key: 'Nuestros Productos', next: 'productos', icon: ShoppingBag },
      { key: 'Envíos y Pagos', next: 'envios', icon: Truck },
      { key: 'Devoluciones', next: 'devoluciones', icon: Undo2 },
      { key: 'Valoraciones', next: 'valoraciones', icon: Star }
    ]
  },
  empresa: {
    messageKey: 'EntreNuts nació en 2020 en Colón, Entre Ríos. Nuestra misión es ofrecer alimentos saludables, naturales y de alta calidad.',
    options: [ { key: 'Volver al inicio', next: 'inicio', icon: RotateCcw } ]
  },
  productos: {
    messageKey: '¡Tenemos de todo! ¿Qué categoría te interesa?',
    options: [
      { key: 'Pastas de Maní', next: 'pastas', icon: ShoppingBag },
      { key: 'Miel y Ghee', next: 'miel', icon: ShoppingBag }, 
      { key: 'Volver al inicio', next: 'inicio', icon: RotateCcw }
    ]
  },
  pastas: {
    messageKey: 'Tenemos 6 sabores: Clásica, Crocante, Cacao, Coco, Stevia y Proteica (¡esta última tiene 14g de proteína cada 20g!). Son Sin TACC y aptas veganas.',
    options: [ { key: 'Volver al inicio', next: 'inicio', icon: RotateCcw } ]
  },
  envios: {
    messageKey: 'Hacemos envíos a todo el país. Podés comprar directamente desde nuestra tienda oficial en Mercado Libre.',
    options: [ { key: 'Volver al inicio', next: 'inicio', icon: RotateCcw } ]
  },
  miel: {
    messageKey: 'Nuestra Miel y Ghee son productos premium, ideales para darle un toque especial a tus desayunos y comidas.', 
    options: [ { key: 'Volver al inicio', next: 'inicio', icon: RotateCcw } ]
  },
  devoluciones: {
    messageKey: 'Si tu producto llegó dañado, contactanos por WhatsApp y te enviamos uno nuevo sin cargo.', 
    options: [ { key: 'Volver al inicio', next: 'inicio', icon: RotateCcw } ]
  },
  valoraciones: {
    messageKey: '¡Nuestros clientes nos aman! Tenemos 4.9 estrellas en Mercado Libre.', 
    options: [ { key: 'Volver al inicio', next: 'inicio', icon: RotateCcw } ]
  }
};

export function NutiBot() {
  const t = useTranslations('bot');
  
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<FlowStep>('inicio');
  const [currentTime, setCurrentTime] = useState('00:00');

  useEffect(() => {
    setIsMounted(true);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCurrentTime(time);
  }, [currentStep, open]);

  const resetBot = () => {
    setCurrentStep('inicio');
  };

  const closeBot = () => {
    setOpen(false);
    setTimeout(resetBot, 300); 
  };

  if (!isMounted) return null;

  const activeFlow = nutiFlowData[currentStep];

  return (
    <>
      {/* VENTANA DEL CHAT */}
      <div
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: '1.5rem',
          width: 'min(380px, calc(100vw - 2rem))',
          height: '600px', 
          background: '#FAF7F2', 
          borderRadius: '24px',
          zIndex: 9999,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(40px)',
          transformOrigin: 'bottom right',
          boxShadow: open ? '0 20px 40px rgba(0,0,0,0.15)' : '0 0 0 rgba(0,0,0,0)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* ENCABEZADO UNIFICADO (Color plano, sin reflejos, comprimido) */}
        <div
          style={{
            background: 'var(--color-naranja)',
            position: 'relative',
            padding: '1rem 1rem 2rem 1rem', // Comprimido arriba, con espacio abajo para la onda
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem', // Espacio reducido entre el título y el "Atención 24/7"
          }}
        >
          {/* Fila Superior: Info y Botones */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
            
            {/* Avatar y Estado */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px', // Un poco más chico para comprimir el alto
                  height: '40px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src="/images/LogoNuti.png" alt="Nuti" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px', margin: 0, lineHeight: 1.2 }}>
                  Nuti
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500, margin: 0 }}>
                    En línea
                  </p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div style={{ display: 'flex', gap: '0.2rem', zIndex: 1 }}>
              <button onClick={resetBot} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: '4px' }}>
                <RotateCcw size={18} />
              </button>
              <button onClick={closeBot} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: '4px' }}>
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Overlay de Onda inferior */}
          <div
            style={{
              position: 'absolute',
              bottom: '-1px', 
              left: 0,
              right: 0,
              height: '22px', 
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
                fill="#FAF7F2" 
              />
            </svg>
          </div>
        </div>

        {/* ÁREA DE CHAT Y OPCIONES */}
        <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#E46A17', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src="/images/LogoNuti.png" alt="Nuti" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
              </div>
              
              <div style={{ 
                  background: '#ffffff', 
                  padding: '1rem',
                  borderRadius: '20px',
                  borderTopLeftRadius: '4px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: '#333333',
                  lineHeight: '1.5'
              }}>
                {activeFlow.messageKey}
              </div>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#A0A0A0', marginLeft: '3.5rem', marginTop: '0.5rem' }}>
              {currentTime}
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '0 -1.5rem' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {activeFlow.options.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentStep(option.next)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #F1DABF', 
                    padding: '0.6rem 1rem',
                    borderRadius: '99px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(228,106,23,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.02)';
                  }}
                >
                  <span style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', 
                      background: '#FDF1E5', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                  }}>
                    {Icon && <Icon size={16} color="#E46A17" />}
                  </span>
                  
                  <span style={{ 
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500, color: '#111111', flex: 1, textAlign: 'left'
                  }}>
                    {option.key}
                  </span>
                  
                  <ChevronRight size={18} color="#E46A17" />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* BOTÓN FLOTANTE (FAB) */}
      <button
        onClick={() => {
            if (open) closeBot();
            else setOpen(true);
        }}
        title={t('chatbotLabel')} 
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '70px',  
          height: '70px', 
          borderRadius: '50%',
          background: open ? '#111111' : '#E46A17',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: open ? '0 4px 15px rgba(0,0,0,0.3)' : '0 4px 20px rgba(228,106,23,0.45)',
          zIndex: 10000,
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: open ? 'rotate(90deg) scale(0.9)' : 'rotate(0deg) scale(1)',
        }}
      >
        {open ? (
          <X size={26} color="#ffffff" style={{ transform: 'rotate(-90deg)' }} /> 
        ) : (
          <img src="/images/LogoNuti.png" alt="Abrir chat" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
        )}
      </button>
    </>
  )
}
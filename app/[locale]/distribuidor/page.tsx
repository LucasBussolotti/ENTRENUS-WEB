"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function DistribuidoresPage() {
  const t = useTranslations('distributorPage');

  const [leadForm, setLeadForm] = useState({
    nombre: '', ubicacion: '', zona: '', telefono: '', email: ''
  });
  
  const [loginForm, setLoginForm] = useState({
    usuario: '', password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/distribuidor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm),
      });
      if (!res.ok) throw new Error('request failed');
      alert(t('success'));
      setLeadForm({ nombre: '', ubicacion: '', zona: '', telefono: '', email: '' });
    } catch {
      alert(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", loginForm);
    // Aquí se autentica contra el backend
  };

  return (
    <div className="w-full min-h-screen bg-[#EBE5D9] font-body text-[#111111] pb-20">
      
      {/* ── HEADER ONDA (Ajustable a tu layout global) ── */}
      <div className="w-full h-[120px] relative overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-[40px]">
          <path d="M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,120 L0,120 Z" fill="#EBE5D9" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-8">
        
        {/* ── SECCIÓN SUPERIOR: FORMULARIOS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          
          {/* COLUMNA IZQUIERDA: QUIERO SER DISTRIBUIDOR */}
          <div className="flex flex-col">
            <h1 
              className="font-black uppercase text-[var(--color-naranja)] mb-2 leading-none"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
            >
              {t('leadTitle')}
            </h1>
            <p className="text-lg font-medium mb-10 text-gray-800 max-w-[90%] leading-tight">
              {t('leadSub')}
            </p>

            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-8">
              {[
                { label: t('formName'), key: 'nombre', type: 'text', placeholder: t('namePlaceholder') },
                { label: t('locationLabel'), key: 'ubicacion', type: 'text', placeholder: t('locationPlaceholder') },
                { label: t('coverageLabel'), key: 'zona', type: 'text', placeholder: t('coveragePlaceholder') },
                { label: t('formPhone'), key: 'telefono', type: 'tel', placeholder: t('phonePlaceholder') },
                { label: t('formEmail'), key: 'email', type: 'email', placeholder: t('emailPlaceholder') },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="font-black text-xl">{field.label}</label>
                  <input 
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#999999] focus:outline-none pb-2 text-lg transition-colors focus:border-[var(--color-naranja)]"
                    value={(leadForm as any)[field.key]}
                    onChange={(e) => setLeadForm({...leadForm, [field.key]: e.target.value})}
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--color-naranja)] text-white font-black text-2xl rounded-[1rem] py-4 mt-4 hover:bg-[#d45d0f] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('sending') : t('send')}
              </button>
            </form>
          </div>

          {/* COLUMNA DERECHA: YA SOY DISTRIBUIDOR (PRÓXIMAMENTE) */}
          <div className="flex items-start justify-center pt-2 lg:pt-8 group perspective-[1500px]">
            
            <div className="bg-[#FCFBF9] w-full max-w-[480px] rounded-[2rem] overflow-hidden shadow-lg transition-transform duration-700 ease-out transform-style-3d group-hover:rotate-y-[-5deg] group-hover:rotate-x-[2deg] flex flex-col">
              
              {/* 1. Ajustamos el padding: pt-10 px-10 pb-6 para reducir el espacio en blanco abajo */}
              <div className="pt-10 px-10 pb-6 md:pt-12 md:px-12 md:pb-8 flex flex-col items-center">
                <h2 className="font-black text-3xl md:text-4xl text-[var(--color-naranja)] mb-3 text-center">
                  {t('alreadyTitle')}
                </h2>
                <p className="text-center text-[#4A4A4A] font-medium mb-8 leading-snug">
                  {t.rich('alreadySub', { br: () => <br /> })}
                </p>

                <form className="w-full flex flex-col gap-6 opacity-60 pointer-events-none select-none">
                  <div className="flex flex-col gap-2 items-center">
                    <label className="font-black text-lg text-[#111111]">{t('username')}</label>
                    <input 
                      type="text"
                      disabled
                      className="w-full h-[55px] bg-[#EAE5D9] rounded-[1.25rem] px-4 text-center text-lg cursor-not-allowed border-none focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2 items-center">
                    <label className="font-black text-lg text-[#111111]">{t('loginPassword')}</label>
                    <input 
                      type="password"
                      disabled
                      className="w-full h-[55px] bg-[#EAE5D9] rounded-[1.25rem] px-4 text-center text-lg cursor-not-allowed border-none focus:outline-none"
                    />
                  </div>
                </form>
              </div>

              {/* ── BARRA INFERIOR NARANJA (Sin márgenes extra) ── */}
              <div className="w-full flex flex-col mt-auto">
                
                <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-[25px] md:h-[50px] block">
                  <path 
                    d="M0,25 C150,50 250,0 350,25 C450,50 480,10 500,25 L500,50 L0,50 Z" 
                    fill="#F97316" 
                  />
                </svg>

                {/* 2. El -mt-[1px] elimina la línea de corte visible en tu imagen */}
                <div className="w-full bg-[#F97316] py-5 md:py-6 flex items-center justify-center -mt-[15px]">
                  <span 
                    className="text-white font-black text-2xl md:text-3xl lg:text-3.2xl tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t('comingSoon')}
                  </span>
                </div>
                
              </div>

            </div>
          </div>

        </div>

        {/* ── SECCIÓN INFERIOR: DESCARGAR CATÁLOGO ── */}
        <div className="flex flex-col items-center justify-center mt-12 w-full">
          <div className="bg-[#FCFBF9] p-4 md:p-6 rounded-[2rem] w-full max-w-[800px] shadow-sm hover:shadow-md transition-shadow">
            
            {/* Convertimos el contenedor de la imagen en un enlace descargable */}
            <a 
              href="/catalogo/CATÁLOGO 2026.pdf" /* <-- REEMPLAZÁ CON LA RUTA REAL DE TU PDF */
              download="Catalogo_Entrenuts_2026.pdf"  /* <-- NOMBRE CON EL QUE SE GUARDARÁ EN LA PC DEL USUARIO */
              className="w-full aspect-[16/9] bg-black rounded-xl overflow-hidden flex items-center justify-center cursor-pointer relative group block"
            >
              <div className="text-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-white font-display text-4xl tracking-tight block">entrenuts</span>
                <span className="bg-[var(--color-naranja)] text-white font-black text-xs px-2 py-0.5 mt-1 inline-block transform -skew-x-12">{t('catalogLabel')}</span>
              </div>
              <p className="absolute bottom-4 text-gray-500 text-[10px]">www.entrenuts.com.ar | @entrenuts</p>
            </a>
            
            {/* Convertimos el botón en un enlace descargable */}
            <a 
              href="/catalogo/CATÁLOGO 2026.pdf" /* <-- MISMA RUTA ACÁ */
              download="CATÁLOGO 2026.pdf"
              className="w-full text-center mt-6 font-black text-xl text-[#111111] hover:text-[var(--color-naranja)] transition-colors block cursor-pointer"
            >
              {t('downloadCatalog')}
            </a>
            
          </div>
        </div>

      </div>

      <style>{`
        /* Clases utilitarias para el efecto 3D */
        .perspective-[1500px] {
          perspective: 1500px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-\\[-5deg\\] {
          transform: rotateY(-5deg);
        }
        .rotate-x-\\[2deg\\] {
          transform: rotateX(2deg);
        }
      `}</style>
    </div>
  );
}
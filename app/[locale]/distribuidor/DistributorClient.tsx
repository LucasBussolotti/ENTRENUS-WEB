"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { FormStatus, type FormStatusState } from '@/components/FormStatus';

// La URL del portal se configura por entorno, no se hardcodea: cambia según el
// proveedor y no tiene por qué vivir en el repositorio.
const PORTAL_URL = process.env.NEXT_PUBLIC_DISTRIBUTOR_PORTAL_URL?.trim();

export function DistributorClient() {
  const t = useTranslations('distributorPage');

  const [leadForm, setLeadForm] = useState({
    nombre: '', ubicacion: '', zona: '', telefono: '', email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatusState>(null);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/distribuidor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm),
      });

      if (!res.ok) {
        // El endpoint explica el motivo (email mal formado, cuota agotada…);
        // mostrarlo evita el clásico "algo salió mal" que no dice nada.
        const body = await res.json().catch(() => null);
        setStatus({ kind: 'error', message: body?.error || t('error') });
        return;
      }

      setStatus({ kind: 'success', message: t('success') });
      setLeadForm({ nombre: '', ubicacion: '', zona: '', telefono: '', email: '' });
    } catch {
      setStatus({ kind: 'error', message: t('error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#EBE5D9] font-body text-[#111111] pb-20">
      
      {/* ── HEADER ONDA (Ajustable a tu layout global) ── */}
      <div className="w-full h-[70px] md:h-[120px] relative overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-[40px]">
          <path d="M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,120 L0,120 Z" fill="#EBE5D9" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 pt-8">
        
        {/* ── SECCIÓN SUPERIOR: FORMULARIOS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 md:mb-24">
          
          {/* COLUMNA IZQUIERDA: QUIERO SER DISTRIBUIDOR */}
          <div className="flex flex-col">
            {/* El mínimo del clamp baja de 3rem: a 48px "SER DISTRIBUIDOR" desbordaba
                el viewport en ES a 360px y provocaba scroll horizontal en la página. */}
            <h1 className="font-display font-black uppercase text-naranja mb-2 leading-none text-[clamp(2rem,9vw,4.5rem)]">
              {t('leadTitle')}
            </h1>
            <p className="text-base sm:text-lg font-medium mb-8 md:mb-10 text-gray-800 max-w-prose leading-snug">
              {t('leadSub')}
            </p>

            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-8">
              {([
                { label: t('formName'), key: 'nombre', type: 'text', placeholder: t('namePlaceholder') },
                { label: t('locationLabel'), key: 'ubicacion', type: 'text', placeholder: t('locationPlaceholder') },
                { label: t('coverageLabel'), key: 'zona', type: 'text', placeholder: t('coveragePlaceholder') },
                { label: t('formPhone'), key: 'telefono', type: 'tel', placeholder: t('phonePlaceholder') },
                { label: t('formEmail'), key: 'email', type: 'email', placeholder: t('emailPlaceholder') },
              ] as { label: string; key: keyof typeof leadForm; type: string; placeholder: string }[]).map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="font-black text-xl">{field.label}</label>
                  <input 
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#6E6558] focus:outline-none pb-2 text-lg transition-colors focus:border-[var(--color-naranja)]"
                    value={leadForm[field.key]}
                    onChange={(e) => setLeadForm({...leadForm, [field.key]: e.target.value})}
                    required
                  />
                </div>
              ))}

              <FormStatus status={status} />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-12 bg-naranja text-white font-black text-xl sm:text-2xl rounded-[1rem] py-4 mt-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-naranja hover:bg-[#d45d0f] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('sending') : t('send')}
              </button>
            </form>
          </div>

          {/* COLUMNA DERECHA: YA SOY DISTRIBUIDOR (PRÓXIMAMENTE) */}
          <div className="flex items-start justify-center pt-2 lg:pt-8 group perspective-[1500px]">
            
            <div className="bg-[#FCFBF9] w-full max-w-[480px] rounded-[2rem] overflow-hidden shadow-lg transform-3d motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:rotate-y-[-5deg] motion-safe:group-hover:rotate-x-[2deg] flex flex-col">
              
              {/* 1. Ajustamos el padding: pt-10 px-10 pb-6 para reducir el espacio en blanco abajo */}
              <div className="pt-8 px-6 pb-6 sm:pt-10 sm:px-10 md:pt-12 md:px-12 md:pb-8 flex flex-col items-center">
                <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-naranja mb-3 text-center text-balance">
                  {t('alreadyTitle')}
                </h2>
                <p className="text-center text-[#4A4A4A] font-medium mb-8 leading-snug">
                  {t.rich('alreadySub', { br: () => <br /> })}
                </p>

                {PORTAL_URL ? (
                  <a
                    href={PORTAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-[1.25rem] bg-[#111111] px-6 text-lg font-black tracking-wide text-white uppercase no-underline transition-colors hover:bg-naranja focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-naranja"
                  >
                    {t('portalCta')}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                    />
                  </a>
                ) : (
                  <p className="min-h-14 w-full rounded-[1.25rem] bg-[#EAE5D9] px-6 py-4 text-center text-base font-bold text-[#4A4A4A]">
                    {t('portalUnavailable')}
                  </p>
                )}
              </div>

              {/* ── BARRA INFERIOR NARANJA (Sin márgenes extra) ── */}
              <div className="w-full flex flex-col mt-auto">

                <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-[25px] md:h-[50px] block" aria-hidden="true">
                  <path
                    d="M0,25 C150,50 250,0 350,25 C450,50 480,10 500,25 L500,50 L0,50 Z"
                    fill="#F97316"
                  />
                </svg>

                {/* 2. El -mt-[1px] elimina la línea de corte visible en tu imagen */}
                <div className="w-full bg-[#F97316] py-5 md:py-6 min-h-[68px] md:min-h-[80px] flex items-center justify-center -mt-[15px]">
                  {!PORTAL_URL && (
                    <span className="font-body text-white font-black text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase">
                      {t('portalComingSoon')}
                    </span>
                  )}
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
              href="/catalogo/CATALOGOD.pdf"
              download="CATALOGOD-Entrenuts-2026.pdf"
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
              href="/catalogo/CATALOGOD.pdf"
              download="CATALOGOD-Entrenuts-2026.pdf"
              className="w-full text-center mt-6 font-black text-xl text-[#111111] hover:text-[var(--color-naranja)] transition-colors block cursor-pointer"
            >
              {t('downloadCatalog')}
            </a>
            
          </div>
        </div>

      </div>


    </div>
  );
}
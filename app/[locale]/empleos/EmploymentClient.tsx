"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormStatus, type FormStatusState } from '@/components/FormStatus';

export function EmploymentClient() {
  const t = useTranslations('employmentPage');
  
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    localidad: '',
    email: '',
    area: '',
    cv: null as File | null
  });

  // ── ESTADOS NUEVOS PARA EL DRAG & DROP ──
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatusState>(null);

  // ── FUNCIÓN DE VALIDACIÓN DE SEGURIDAD Y PESO ──
  const validarArchivo = (file: File): boolean => {
    // Tipos MIME permitidos (PDF y Word)
    const tiposPermitidos = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    // Límite de peso: 5MB (en bytes)
    const pesoMaximo = 5 * 1024 * 1024; 

    if (!tiposPermitidos.includes(file.type)) {
      setStatus({ kind: 'error', message: t('invalidFormat') });
      return false;
    }

    if (file.size > pesoMaximo) {
      setStatus({ kind: 'error', message: t('fileTooLarge') });
      return false;
    }

    return true;
  };

  // ── MANEJADORES DE EVENTOS PARA EL ARCHIVO ──
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault(); 
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Aplicamos el seguro antes de guardarlo
      if (validarArchivo(file)) {
        setFormData({ ...formData, cv: file });
        setFileName(file.name);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Aplicamos el seguro antes de guardarlo
      if (validarArchivo(file)) {
        setFormData({ ...formData, cv: file });
        setFileName(file.name);
      } else {
        // Limpiamos el input si el archivo fue rechazado
        e.target.value = ''; 
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus(null);

    const payload = new FormData();
    payload.append('nombre', formData.nombre);
    payload.append('dni', formData.dni);
    payload.append('telefono', formData.telefono);
    payload.append('localidad', formData.localidad);
    payload.append('email', formData.email);
    payload.append('area', formData.area);
    if (formData.cv) payload.append('cv', formData.cv);

    try {
      const res = await fetch('/api/empleos', { method: 'POST', body: payload });

      if (!res.ok) {
        // El endpoint dice el motivo concreto (CV que no es PDF/Word, cuota
        // agotada, email mal formado); repetirlo evita un "algo salió mal".
        const body = await res.json().catch(() => null);
        setStatus({ kind: 'error', message: body?.error || t('error') });
        return;
      }

      setStatus({ kind: 'success', message: t('success') });
      setFormData({ nombre: '', dni: '', telefono: '', localidad: '', email: '', area: '', cv: null });
      setFileName('');
    } catch {
      setStatus({ kind: 'error', message: t('error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#EBE5D9]">
      
      {/* ── HERO SECTION (Imagen + Onda) ── */}
      <div className="relative w-full h-[40svh] md:h-[55svh] min-h-[350px]">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/EMPLEO.webp')" }}
        />
        {/* Superposición oscura sutil por si la imagen es muy brillante */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Onda inferior divisoria */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-10">
          <svg 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none" 
            className="w-full h-[35px] md:h-[45px]" 
            style={{ display: 'block' }}
          >
            <path 
              d="M0,15 C100,15 150,90 200,90 C250,90 300,15 400,15 C480,15 500,60 550,60 C600,60 620,15 700,15 C780,15 820,110 880,110 C940,110 980,15 1080,15 C1180,15 1220,80 1280,80 C1340,80 1380,15 1440,15 L1440,120 L0,120 Z" 
              fill="#EBE5D9"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* ── TÍTULO PRINCIPAL ── */}
        {/* Los mínimos del clamp bajan de 4.5rem/2.1rem: a 72px "TRABAJÁ" mide ~312px
            y desbordaba la pantalla en cualquier móvil de 360px o menos. */}
        <h1
          className="flex flex-col items-center justify-center text-center font-display font-black uppercase tracking-[-0.02em] text-naranja mb-16 md:mb-24"
        >
          <span className="leading-[0.85] text-[clamp(2.75rem,14vw,10.5rem)]">
            {t('titleLine1')}
          </span>
          <span className="leading-[0.9] mt-1 md:mt-2 text-[clamp(1.35rem,6.5vw,4.8rem)]">
            {t('titleLine2')}
          </span>
        </h1>

        {/* ── FORMULARIO ── */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 md:gap-y-12">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="flex flex-col gap-10">
            {/* Input: Nombre */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                {t('nameLabel')}
              </label>
              <input 
                type="text"
                placeholder={t('namePlaceholder')}
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#6E6558] focus:outline-none focus:border-[var(--color-naranja)] transition-colors pb-2 text-lg font-body"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required
              />
            </div>

            {/* Input: DNI */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                {t('dniLabel')}
              </label>
              <input 
                type="text"
                placeholder={t('dniPlaceholder')}
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#6E6558] focus:outline-none focus:border-[var(--color-naranja)] transition-colors pb-2 text-lg font-body"
                value={formData.dni}
                onChange={(e) => setFormData({...formData, dni: e.target.value})}
                required
              />
            </div>

            {/* Input: Teléfono */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                {t('phoneLabel')}
              </label>
              <input 
                type="tel"
                placeholder={t('phonePlaceholder')}
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#6E6558] focus:outline-none focus:border-[var(--color-naranja)] transition-colors pb-2 text-lg font-body"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                required
              />
            </div>

            {/* Input: Localidad/Provincia */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                {t('locationLabel')}
              </label>
              <input 
                type="text"
                placeholder={t('locationPlaceholder')}
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#6E6558] focus:outline-none focus:border-[var(--color-naranja)] transition-colors pb-2 text-lg font-body"
                value={formData.localidad}
                onChange={(e) => setFormData({...formData, localidad: e.target.value})}
                required
              />
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col gap-10">
            {/* Input: Email */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                {t('emailLabel')}
              </label>
              <input 
                type="email"
                placeholder={t('emailPlaceholder')}
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#6E6558] focus:outline-none focus:border-[var(--color-naranja)] transition-colors pb-2 text-lg font-body"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            {/* Select: Área de aplicación */}
            <div className="flex flex-col gap-2 relative">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                {t('areaLabel')}
              </label>
              <select 
                className={`w-full bg-transparent border-b-2 border-[#111111] focus:outline-none focus:border-[var(--color-naranja)] transition-colors pb-2 text-lg font-body appearance-none cursor-pointer ${formData.area ? 'text-[#111111]' : 'text-[#6E6558]'}`}
                required
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              >
                <option value="" disabled>{t('areaPlaceholder')}</option>
                <option value="produccion">{t('areaProduction')}</option>
                <option value="administracion">{t('areaAdministration')}</option>
                <option value="ventas">{t('areaSales')}</option>
                <option value="marketing">{t('areaMarketing')}</option>
                <option value="logistica">{t('areaLogistics')}</option>
              </select>
              {/* Ícono de flechita personalizado para el Select */}
              <div className="absolute right-2 bottom-3 pointer-events-none">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#6E6558" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Subida de CV con Drag & Drop */}
            <div className="flex flex-col gap-2 flex-grow">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                {t('cvLabel')}
              </label>
              <label 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-grow w-full rounded-[1rem] flex items-center justify-center cursor-pointer min-h-[120px] transition-all hover:shadow-md hover:-translate-y-0.5 border-2 ${
                  isDragging 
                    ? 'bg-[#d45d0f]/10 border-dashed border-[var(--color-naranja)] scale-[1.02]' 
                    : 'bg-[#FCFBF9] border-solid border-transparent'
                }`}
              >
                <span className="min-w-0 w-full text-center px-4 font-medium font-body text-lg">
                  {fileName ? (
                    <span className="text-[var(--color-naranja)] font-bold truncate block">
                      📄 {fileName}
                    </span>
                  ) : (
                    <span className="text-[#6E6558]">
                      {t.rich('cvDropzone', {
                        u: (chunks) => <span className="underline decoration-dashed underline-offset-4">{chunks}</span>
                      })}
                    </span>
                  )}
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <FormStatus status={status} />

            {/* Botón de Envío */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--color-naranja)] text-white font-black text-xl md:text-2xl rounded-[1rem] py-4 mt-auto hover:bg-[#d45d0f] transition-colors shadow-sm font-body tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('sending') : t('send')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
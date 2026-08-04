"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function EmploymentPage() {
  const t = useTranslations('employmentPage'); // Mantenemos el hook por si lo necesitas a futuro
  
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    localidad: '',
    email: '',
    area: '',
    cv: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá tu lógica para enviar el formulario a tu backend/email
    alert('¡Gracias por postularte!');
  };

  return (
    <div className="w-full min-h-screen bg-[#EBE5D9]">
      
      {/* ── HERO SECTION (Imagen + Onda) ── */}
      <div className="relative w-full h-[40vh] md:h-[55vh] min-h-[350px]">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/EMPLEO.jpg')" }} 
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

      <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
        
        {/* ── TÍTULO PRINCIPAL ── */}
        <h1 
          className="flex flex-col items-center justify-center text-center font-black uppercase text-[var(--color-naranja)] mb-16 md:mb-24"
          style={{ 
            fontFamily: 'var(--font-display)', 
            letterSpacing: '-0.02em'
          }}
        >
          {/* TRABAJÁ: Más grande y con su propio interlineado */}
          <span 
            className="leading-[0.85]" 
            style={{ fontSize: 'clamp(4.5rem, 14vw, 10.5rem)' }}
          >
            TRABAJÁ
          </span>
          
          {/* CON NOSOTROS: Más chico, y con un pequeño margen superior (mt-1) para que no choque */}
          <span 
            className="leading-[0.9] mt-1 md:mt-2" 
            style={{ fontSize: 'clamp(2.1rem, 6.5vw, 4.8rem)' }}
          >
            CON NOSOTROS
          </span>
        </h1>

        {/* ── FORMULARIO ── */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 md:gap-y-12">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="flex flex-col gap-10">
            {/* Input: Nombre */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                Nombre completo
              </label>
              <input 
                type="text"
                placeholder="Ingrese su nombre completo"
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#888888] focus:outline-none pb-2 text-lg font-body"
                required
              />
            </div>

            {/* Input: DNI */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                DNI
              </label>
              <input 
                type="text"
                placeholder="Ingrese su DNI"
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#888888] focus:outline-none pb-2 text-lg font-body"
                required
              />
            </div>

            {/* Input: Teléfono */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                Telefono
              </label>
              <input 
                type="tel"
                placeholder="Ingrese su número de telefono"
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#888888] focus:outline-none pb-2 text-lg font-body"
                required
              />
            </div>

            {/* Input: Localidad/Provincia */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                Localidad/Provincia
              </label>
              <input 
                type="text"
                placeholder="Ingrese su localidad/provincia"
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#888888] focus:outline-none pb-2 text-lg font-body"
                required
              />
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col gap-10">
            {/* Input: Email */}
            <div className="flex flex-col gap-2">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                Email
              </label>
              <input 
                type="email"
                placeholder="Ingrese su dirección de correo"
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#111111] placeholder-[#888888] focus:outline-none pb-2 text-lg font-body"
                required
              />
            </div>

            {/* Select: Área de aplicación */}
            <div className="flex flex-col gap-2 relative">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                ¿En qué área queres aplicar?
              </label>
              <select 
                className="w-full bg-transparent border-b-2 border-[#111111] text-[#888888] focus:outline-none pb-2 text-lg font-body appearance-none cursor-pointer"
                required
                defaultValue=""
              >
                <option value="" disabled>Seleccione la opción correcta</option>
                <option value="produccion">Producción</option>
                <option value="administracion">Administración</option>
                <option value="ventas">Ventas / Comercial</option>
                <option value="marketing">Marketing</option>
                <option value="logistica">Logística</option>
              </select>
              {/* Ícono de flechita personalizado para el Select */}
              <div className="absolute right-2 bottom-3 pointer-events-none">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Subida de CV */}
            <div className="flex flex-col gap-2 flex-grow">
              <label className="font-black text-xl md:text-2xl text-[#111111] font-body">
                Adjuntar CV
              </label>
              <label className="flex-grow w-full bg-[#FCFBF9] rounded-[1rem] flex items-center justify-center cursor-pointer min-h-[120px] transition-all hover:shadow-md hover:-translate-y-0.5">
                <span className="text-[#A0A0A0] font-medium font-body text-lg">Haz clic para subir tu CV</span>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </label>
            </div>

            {/* Botón de Envío */}
            <button 
              type="submit"
              className="w-full bg-[var(--color-naranja)] text-white font-black text-xl md:text-2xl rounded-[1rem] py-4 mt-auto hover:bg-[#d45d0f] transition-colors shadow-sm font-body tracking-wide"
            >
              Enviar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
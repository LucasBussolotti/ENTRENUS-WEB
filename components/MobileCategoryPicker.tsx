"use client";

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Triangle, X } from 'lucide-react';

interface CategoryOption {
  id: string
  label: string
}

interface MobileCategoryPickerProps {
  categories: CategoryOption[]
  activeId: string
  onSelect: (id: string) => void
  className?: string
}

export function MobileCategoryPicker({ categories, activeId, onSelect, className }: MobileCategoryPickerProps) {
  const t = useTranslations('productsPage');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const activeLabel = categories.find((c) => c.id === activeId)?.label ?? '';

  // Desde md este componente queda oculto (md:hidden), pero un dialog modal abierto
  // seguiría bloqueando la página sin verse, p. ej. al girar una tablet. Se cierra.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 48rem)');
    const closeOnDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) dialogRef.current?.close();
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const openPicker = () => {
    dialogRef.current?.showModal();
    // showModal enfoca el primer control (la X); arrancar en la categoría actual
    // deja al lector de pantalla y al teclado donde el usuario ya estaba.
    activeItemRef.current?.focus();
    setIsOpen(true);
  };

  const closePicker = () => dialogRef.current?.close();

  const choose = (id: string) => {
    onSelect(id);
    closePicker();
  };

  return (
    <div className={className}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={t('changeCategory', { category: activeLabel })}
        onClick={openPicker}
        className="mx-auto flex min-h-11 items-center gap-2.5 rounded-sm font-display text-[clamp(1.5rem,7vw,2.25rem)] leading-none font-black text-[var(--text-dark)] uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-naranja"
      >
        <Triangle aria-hidden="true" className="size-3.5 shrink-0 rotate-180 fill-naranja text-naranja" />
        {activeLabel}
      </button>

      {/* backdrop negro al 55%: con menos, el texto crema sobre la página clara
          desenfocada no llega al contraste 3:1 que exige el texto grande. */}
      <dialog
        ref={dialogRef}
        aria-label={t('categoriesLabel')}
        onClose={() => {
          setIsOpen(false);
          // El dialog devuelve el foco a lo que estaba enfocado antes, pero en móvil
          // tocar un botón no siempre lo enfoca: sin esto el foco caía en <body>.
          triggerRef.current?.focus();
        }}
        className="category-picker m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/55 backdrop:backdrop-blur-md"
      >
        {/* Tocar fuera de la lista cierra, como en el boceto: no hay otra acción en pantalla */}
        <div
          className="relative flex min-h-full flex-col items-center justify-center px-6 py-20"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePicker();
          }}
        >
          <button
            type="button"
            onClick={closePicker}
            aria-label={t('closeCategories')}
            className="absolute top-5 right-4 flex size-11 items-center justify-center rounded-full text-[var(--color-navbar)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navbar)]"
          >
            <X aria-hidden="true" className="size-7" />
          </button>

          <ul className="flex flex-col items-center gap-1 text-center">
            {categories.map((category) => {
              const isActive = category.id === activeId;
              return (
                <li key={category.id}>
                  <button
                    ref={isActive ? activeItemRef : undefined}
                    type="button"
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => choose(category.id)}
                    className={`rounded-sm px-2 py-1 font-display text-[clamp(1.4rem,6.8vw,2.75rem)] leading-[1.05] font-black text-balance text-[var(--color-navbar)] uppercase transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navbar)] ${
                      isActive ? 'underline decoration-naranja decoration-4 underline-offset-8' : ''
                    }`}
                  >
                    {category.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </dialog>

      <style>{`
        html:has(.category-picker[open]) { overflow: hidden; }

        @media (prefers-reduced-motion: no-preference) {
          .category-picker[open],
          .category-picker[open]::backdrop {
            animation: category-picker-in 0.2s ease-out;
          }
        }
        @keyframes category-picker-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

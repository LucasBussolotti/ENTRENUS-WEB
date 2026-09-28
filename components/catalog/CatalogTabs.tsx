"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MobileCategoryPicker } from '@/components/MobileCategoryPicker';

export interface CatalogTabLink {
  id: string
  label: string
  color: string
  slug: string
}

interface CatalogTabsProps {
  locale: string
  tabs: CatalogTabLink[]
  /** Pestaña que corresponde a cada slug del catálogo */
  tabBySlug: Record<string, string>
}

const ALL_ID = 'all';

export function CatalogTabs({ locale, tabs, tabBySlug }: CatalogTabsProps) {
  const t = useTranslations('productsPage');
  const pathname = usePathname();
  const router = useRouter();

  const base = `/${locale}/productos`;
  const currentSlug = pathname.startsWith(`${base}/`) ? pathname.slice(base.length + 1).split('/')[0] : '';
  const activeId = tabBySlug[currentSlug] ?? ALL_ID;

  // En /productos las secciones ya muestran todas las categorías
  if (!currentSlug) return null;

  const hrefFor = (id: string) => {
    const tab = tabs.find((item) => item.id === id);
    return tab ? `${base}/${tab.slug}` : base;
  };

  return (
    <>
      {/* En móvil las 7 etiquetas ocupaban ~8 renglones: ahí se muestra sólo la
          categoría activa y el resto se elige en un menú a pantalla completa. */}
      <MobileCategoryPicker
        categories={[{ id: ALL_ID, label: t('allProducts') }, ...tabs.map(({ id, label }) => ({ id, label }))]}
        activeId={activeId}
        onSelect={(id) => router.push(hrefFor(id))}
        className="mb-8 md:hidden"
      />

      <nav aria-label={t('categoriesLabel')} className="mb-12 hidden md:block">
        <ul className="font-display flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          {tabs.map((tab, index) => {
            const isActive = activeId === tab.id;
            return (
              <React.Fragment key={tab.id}>
                <li>
                  <Link
                    href={hrefFor(tab.id)}
                    aria-current={isActive ? (currentSlug === tab.slug ? 'page' : 'true') : undefined}
                    className={`rounded-sm text-2xl font-black tracking-tight uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current lg:text-4xl xl:text-5xl ${
                      isActive ? '' : 'text-[#7A7266] hover:text-[#4A443B]'
                    }`}
                    style={isActive ? { color: tab.color } : undefined}
                  >
                    {tab.label}
                  </Link>
                </li>
                {index < tabs.length - 1 && (
                  <li aria-hidden="true" className="text-2xl font-black text-[#C9C2B6] lg:text-4xl xl:text-5xl">|</li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

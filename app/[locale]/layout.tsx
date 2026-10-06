import React from 'react';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NutiBot } from '@/components/NutiBot';
import { SmoothScroll } from '@/components/SmoothScroll';
import '@/app/globals.css';
import localFont from 'next/font/local';
import { LOCALES, SITE_NAME, SITE_URL } from '@/lib/seo/site';
import { toLocale } from '@/lib/seo/metadata';

/*
 * Sólo viajan al navegador los textos de los componentes cliente. El resto
 * (seo, about, footer, reviews…) se usa en el servidor y mandarlo sumaba ~60 %
 * de peso a cada página. Si un componente cliente nuevo usa otro namespace, hay
 * que agregarlo acá o falla con MISSING_MESSAGE.
 */
const CLIENT_NAMESPACES = [
  'common',
  'nav',
  'hero',
  'bot',
  'products',
  'categories',
  'productsPage',
  'recipes',
  'employmentPage',
  'distributorPage',
] as const;

function pickClientMessages(messages: AbstractIntlMessages): AbstractIntlMessages {
  return Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]));
}

// Con los locales conocidos de antemano, las páginas se generan en el build y
// se sirven desde caché en vez de renderizarse en cada visita.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// 1. Cargamos Formiga (ExtraBold)
const fontDisplay = localFont({
  src: '../../public/fonts/Formiga-Extrabold.otf',
  weight: '800',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
});

// 2. Cargamos Founders Grotesk
const fontBody = localFont({
  src: [
    { path: '../../public/fonts/FoundersGrotesk-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/FoundersGrotesk-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/FoundersGrotesk-Bold.otf', weight: '700', style: 'normal' }
  ],
  variable: '--font-body',
  display: 'swap',
});

// Valores por defecto: cada página define su título, canonical y hreflang.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: toLocale(locale), namespace: 'seo' });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description: t('siteDescription'),
    applicationName: SITE_NAME,
    formatDetection: { telephone: false, email: false, address: false },
  };
}

// Unificamos todo en una sola función exportada por defecto
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  if (!hasLocale(LOCALES, locale)) notFound();
  setRequestLocale(locale);

  const messages = pickClientMessages(await getMessages());

  return (
    <html lang={locale}>
      <body 
        className={`${fontBody.variable} ${fontDisplay.variable}`} 
        style={{ fontFamily: 'var(--font-body)' }}
        suppressHydrationWarning={true}
      >
        <SmoothScroll />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <NutiBot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
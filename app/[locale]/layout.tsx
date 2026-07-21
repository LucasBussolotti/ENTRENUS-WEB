import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NutiBot } from '@/components/NutiBot';
import '@/app/globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';

const locales = ['es', 'en'];

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

// Unificamos todo en una sola función exportada por defecto
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body 
        className={`${fontBody.variable} ${fontDisplay.variable}`} 
        style={{ fontFamily: 'var(--font-body)' }}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <NutiBot />
        </NextIntlClientProvider>

        {/* 👇 REEMPLAZAR AQUÍ CON LA 'S' MAYÚSCULA */}
        <Script 
          type="module" 
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
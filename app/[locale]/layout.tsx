import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { NutiBot } from '@/components/NutiBot'
import '@/app/globals.css' 
import localFont from 'next/font/local'

const locales = ['es', 'en']

// 1. Cargamos Formiga (ExtraBold) para los títulos
const fontDisplay = localFont({
  src: '../../public/fonts/Formiga-Extrabold.otf',
  weight: '800',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
})

// 2. Cargamos toda la familia Founders Grotesk agrupada
const fontBody = localFont({
  src: [
    {
      path: '../../public/fonts/FoundersGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/FoundersGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/FoundersGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-body',
  display: 'swap',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()

  const isDistributorPrivate = false // Next.js maneja esto por pathname en el componente

  return (
    <NextIntlClientProvider messages={messages}>
      <div className={`${fontBody.variable} ${fontDisplay.variable}`} style={{ fontFamily: 'var(--font-body)' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <NutiBot />
      </div>
    </NextIntlClientProvider>
  )
}
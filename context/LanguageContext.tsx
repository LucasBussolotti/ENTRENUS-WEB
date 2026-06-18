"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'es' | 'en'

const translations = {
  es: {
    nav: {
      inicio: 'Inicio',
      productos: 'Productos',
      recetas: 'Recetas',
      quienesSomos: '¿Quiénes Somos?',
      empleo: 'Empleo',
      distribuidor: 'Distribuidor',
      soyDistribuidor: 'Soy Distribuidor',
      quieroSerDistribuidor: 'Quiero Ser Distribuidor',
      serDistribuidor: 'Ser Distribuidor',
    },
    hero: {
      slide1Tag: 'NUEVO PRODUCTO',
      slide1Title: '14g de proteína en 2 cucharadas',
      slide1Sub: 'Barras Proteicas — Las nuevas de Entrenuts',
      slide1Cta: 'Descubrí más',
      slide2Tag: 'NUESTRA MARCA',
      slide2Title: 'Hecho para que lo saludable sea un placer',
      slide2Sub: 'Tu Hábito de Placer Saludable',
      slide2Cta: 'Ver productos',
      slide3Tag: 'ENTRENUTS',
      slide3Title: 'Entre amigos, entre familia, entre sabor',
      slide3Sub: 'Nacidos en Entre Ríos, hechos para todo el país',
      slide3Cta: 'Quiénes somos',
    },
    products: {
      sectionTitle: 'Nuestros Productos',
      sectionSub: 'Descubrí productos nobles, ricos hechos con ingredientes reales.',
      filterAll: 'Todos',
      filterPastas: 'Pastas',
      filterGranola: 'Granola',
      filterBarras: 'Barras',
      filterFrutos: 'Frutos Secos',
      newTag: 'NUEVO',
      verProducto: 'Ver en Mercado Libre',
      verTodos: 'Ver todos los productos',
    },
    quote: {
      text: '"Lo saludable debe dejar de ser inaccesible, caro o sin sabor. Por eso creamos alimentos reales, simples y ricos, al alcance de todos. Nuestro propósito es claro: democratizar lo saludable para que todos vivan mejor."',
      author: 'EntreNuts',
      tagline: 'Hacemos rico lo saludable.',
    },
    reviews: {
      sectionTitle: 'Lo que dice nuestra comunidad',
      sectionSub: 'Recetas, reviews y momentos reales de quienes ya eligen Entrenuts.',
      recipesTitle: 'Recetas con Entrenuts',
    },
    community: {
      title: 'COME Y VIVÍ MÁS SALUDABLE',
      sub: 'Súmate a nuestra comunidad. Compartimos recetas, tips y novedades todos los días.',
      cta: 'Seguinos en Instagram',
    },
    footer: {
      tagline: 'Tu hábito de placer saludable.',
      empresa: 'Empresa',
      sobreNosotros: 'Sobre nosotros',
      productos: 'Productos',
      quieroDistribuidor: 'Quiero ser distribuidor',
      contacto: 'Contacto',
      direccion: 'Bv. Ferrari 715, Colón, Entre Ríos',
      rights: '© 2026 Entrenuts. Todos los derechos reservados.',
      chatbotLabel: 'Hablá con Nuti',
    },
    productsPage: {
      title: 'Nuestros Productos',
      sub: 'Alimentos reales, simples y ricos — hechos con ingredientes que podés leer.',
      nutritionTitle: 'Información Nutricional',
      filterLabel: 'Filtrar por:',
      mlLink: 'Comprar en Mercado Libre',
    },
    recipesPage: {
      title: 'Recetas con Entrenuts',
      sub: 'Inspiración real de nuestra comunidad. Seguinos en Instagram para más.',
      followIG: 'Ver más en @entrenuts',
    },
    aboutPage: {
      title: '¿Quiénes Somos?',
      sub: 'Una empresa familiar de Entre Ríos con un propósito claro: democratizar lo saludable.',
      story1: 'Entrenuts nació con una idea simple: hacer que comer bien sea un placer, no un sacrificio. Desde Colón, Entre Ríos, creamos productos naturales que combinan ingredientes reales con sabor de verdad.',
      story2: 'Hoy nuestros productos se encuentran en las principales cadenas de supermercados de Argentina. Seguimos siendo una empresa familiar, con el mismo compromiso de siempre: calidad, honestidad y sabor.',
      valuesTitle: 'Nuestros Valores',
      val1Title: 'Ingredientes Reales',
      val1Text: 'Nada de aditivos ni conservantes artificiales. Solo lo que la naturaleza tiene para dar.',
      val2Title: 'Democratizar lo Saludable',
      val2Text: 'Creemos que comer bien no debe ser un lujo. Por eso creamos productos accesibles para todos.',
      val3Title: 'Hecho en Argentina',
      val3Text: 'Producción local, con proveedores nacionales y el orgullo de las pampas.',
      presenceTitle: 'Presencia Nacional',
      presenceSub: 'Encontrá Entrenuts en las principales cadenas de supermercados.',
    },
    employmentPage: {
      title: 'Sumate al Equipo',
      sub: 'Buscamos personas apasionadas por la alimentación saludable y con ganas de crecer.',
      openPositions: 'Posiciones abiertas',
      noPosition: '¿No encontrás tu puesto ideal? Envianos tu CV igualmente.',
      sendCV: 'Enviar CV espontáneo',
      applyNow: 'Postularme',
      contactEmail: 'empleos@entrenuts.com.ar',
    },
    distributorPage: {
      publicTitle: 'Quiero Ser Distribuidor',
      publicSub: 'Sumá Entrenuts a tu catálogo. Trabajamos con distribuidores en todo el país.',
      privateTitle: 'Área Exclusiva',
      privateSub: 'Acceso para distribuidores activos de Entrenuts.',
      formName: 'Nombre completo',
      formEmail: 'Email',
      formPhone: 'Teléfono',
      formCity: 'Ciudad / Provincia',
      formMessage: 'Contanos sobre tu negocio',
      formSend: 'Enviar consulta',
      loginPassword: 'Contraseña',
      loginEnter: 'Ingresar',
      loginWrong: 'Contraseña incorrecta. Contactá a tu representante.',
      privateArea: 'Área de Distribuidores',
      privateWelcome: 'Bienvenido al área exclusiva. Aquí encontrarás catálogos, materiales y novedades.',
    },
  },
  en: {
    nav: {
      inicio: 'Home',
      productos: 'Products',
      recetas: 'Recipes',
      quienesSomos: 'About Us',
      empleo: 'Careers',
      distribuidor: 'Distributor',
      soyDistribuidor: "I'm a Distributor",
      quieroSerDistribuidor: 'Become a Distributor',
      serDistribuidor: 'Become a Distributor',
    },
    hero: {
      slide1Tag: 'NEW PRODUCT',
      slide1Title: '14g of protein in 2 tablespoons',
      slide1Sub: 'Protein Bars — New from Entrenuts',
      slide1Cta: 'Learn more',
      slide2Tag: 'OUR BRAND',
      slide2Title: 'Made to make healthy a pleasure',
      slide2Sub: 'Your Healthy Pleasure Habit',
      slide2Cta: 'See products',
      slide3Tag: 'ENTRENUTS',
      slide3Title: 'Among friends, family and flavor',
      slide3Sub: 'Born in Entre Ríos, made for the whole country',
      slide3Cta: 'About us',
    },
    products: {
      sectionTitle: 'Our Products',
      sectionSub: 'Discover noble, delicious products made with real ingredients.',
      filterAll: 'All',
      filterPastas: 'Pastes',
      filterGranola: 'Granola',
      filterBarras: 'Bars',
      filterFrutos: 'Nuts',
      newTag: 'NEW',
      verProducto: 'Buy on Mercado Libre',
      verTodos: 'View all products',
    },
    quote: {
      text: "\"Healthy food should no longer be inaccessible, expensive, or tasteless. That's why we create real, simple, and delicious food within everyone's reach. Our purpose is clear: to democratize healthy living so everyone can live better.\"",
      author: 'Entrenuts Founders',
      tagline: 'Your healthy pleasure habit, every day.',
    },
    reviews: {
      sectionTitle: 'What our community says',
      sectionSub: 'Recipes, reviews and real moments from those who already choose Entrenuts.',
      recipesTitle: 'Recipes with Entrenuts',
    },
    community: {
      title: 'EAT AND LIVE HEALTHIER',
      sub: 'Join our community. We share recipes, tips and news every day.',
      cta: 'Follow us on Instagram',
    },
    footer: {
      tagline: 'Your healthy pleasure habit.',
      empresa: 'Company',
      sobreNosotros: 'About us',
      productos: 'Products',
      quieroDistribuidor: 'Become a distributor',
      contacto: 'Contact',
      direccion: 'Bv. Ferrari 715, Colón, Entre Ríos',
      rights: '© 2026 Entrenuts. All rights reserved.',
      chatbotLabel: 'Chat with Nuti',
    },
    productsPage: {
      title: 'Our Products',
      sub: 'Real, simple, delicious food — made with ingredients you can read.',
      nutritionTitle: 'Nutritional Information',
      filterLabel: 'Filter by:',
      mlLink: 'Buy on Mercado Libre',
    },
    recipesPage: {
      title: 'Recipes with Entrenuts',
      sub: 'Real inspiration from our community. Follow us on Instagram for more.',
      followIG: 'See more at @entrenuts',
    },
    aboutPage: {
      title: 'Who Are We?',
      sub: 'A family company from Entre Ríos with a clear purpose: democratize healthy eating.',
      story1: 'Entrenuts was born with a simple idea: make eating well a pleasure, not a sacrifice. From Colón, Entre Ríos, we create natural products that combine real ingredients with genuine flavor.',
      story2: "Today our products are found in Argentina's main supermarket chains. We remain a family company, with the same commitment as always: quality, honesty, and flavor.",
      valuesTitle: 'Our Values',
      val1Title: 'Real Ingredients',
      val1Text: 'No artificial additives or preservatives. Only what nature has to offer.',
      val2Title: 'Democratize Healthy',
      val2Text: "We believe eating well should not be a luxury. That's why we create products accessible to everyone.",
      val3Title: 'Made in Argentina',
      val3Text: 'Local production, national suppliers, and the pride of the pampas.',
      presenceTitle: 'National Presence',
      presenceSub: "Find Entrenuts in Argentina's leading supermarket chains.",
    },
    employmentPage: {
      title: 'Join Our Team',
      sub: 'We look for passionate people who love healthy food and want to grow.',
      openPositions: 'Open positions',
      noPosition: "Don't find your ideal role? Send us your CV anyway.",
      sendCV: 'Send spontaneous CV',
      applyNow: 'Apply now',
      contactEmail: 'careers@entrenuts.com.ar',
    },
    distributorPage: {
      publicTitle: 'Become a Distributor',
      publicSub: 'Add Entrenuts to your catalog. We work with distributors across the country.',
      privateTitle: 'Exclusive Area',
      privateSub: 'Access for active Entrenuts distributors.',
      formName: 'Full name',
      formEmail: 'Email',
      formPhone: 'Phone',
      formCity: 'City / Province',
      formMessage: 'Tell us about your business',
      formSend: 'Send inquiry',
      loginPassword: 'Password',
      loginEnter: 'Enter',
      loginWrong: 'Wrong password. Contact your representative.',
      privateArea: 'Distributor Area',
      privateWelcome: 'Welcome to the exclusive area. Here you will find catalogs, materials and news.',
    },
  },
} as const

type TranslationSet = (typeof translations)['es']

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: TranslationSet
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const t = translations[lang] as unknown as TranslationSet
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}

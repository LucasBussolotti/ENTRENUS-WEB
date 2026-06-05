import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { NutiBot } from './components/NutiBot'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { RecipesPage } from './pages/RecipesPage'
import { AboutPage } from './pages/AboutPage'
import { EmploymentPage } from './pages/EmploymentPage'
import { DistributorPage } from './pages/DistributorPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  const isDistributorPrivate = pathname === '/distribuidor/privado'

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/recetas" element={<RecipesPage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/empleo" element={<EmploymentPage />} />
          <Route path="/distribuidor" element={<DistributorPage />} />
          <Route path="/distribuidor/*" element={<DistributorPage />} />
        </Routes>
      </main>
      {!isDistributorPrivate && <Footer />}
      <NutiBot />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Layout />
      </LanguageProvider>
    </BrowserRouter>
  )
}

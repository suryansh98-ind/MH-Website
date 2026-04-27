import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WaitlistModal from './components/WaitlistModal'
import CookieConsent from './components/CookieConsent'
import { WaitlistProvider } from './contexts/WaitlistContext'
import { CookieConsentProvider } from './contexts/CookieConsentContext'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import HowItWorksPage from './pages/HowItWorksPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <CookieConsentProvider>
    <WaitlistProvider>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Routes>
        </main>
        <Footer />
        <WaitlistModal />
        <CookieConsent />
      </div>
    </WaitlistProvider>
    </CookieConsentProvider>
  )
}

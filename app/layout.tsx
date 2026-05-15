import type { Metadata } from 'next'
import { Figtree, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'
import WaitlistModal from '@/src/components/WaitlistModal'
import CookieConsent from '@/src/components/CookieConsent'
import { WaitlistProvider } from '@/src/contexts/WaitlistContext'
import { CookieConsentProvider } from '@/src/contexts/CookieConsentContext'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'MyHormonz — Hormonal Intelligence on Your Phone',
  description:
    'Track and understand your hormones with AI-powered insights guided by Dr. Nisha Woods, PhD.',
  openGraph: {
    title: 'MyHormonz — Hormonal Intelligence on Your Phone',
    description:
      'Track and understand your hormones with AI-powered insights guided by Dr. Nisha Woods, PhD.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${playfairDisplay.variable}`}>
      <body>
        <CookieConsentProvider>
          <WaitlistProvider>
            <div className="min-h-screen bg-white overflow-x-hidden">
              <Navbar />
              <main>{children}</main>
              <Footer />
              <WaitlistModal />
              <CookieConsent />
            </div>
          </WaitlistProvider>
        </CookieConsentProvider>
      </body>
    </html>
  )
}

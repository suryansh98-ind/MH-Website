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

const SITE_URL = 'https://myhormonz.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'MyHormonz — Hormonal Intelligence on Your Phone for Everyone',
  description:
    'Track and understand your hormones with AI-powered insights guided by Dr. Nisha Jackson-Woods, Ph.D. — backed by 35+ years of clinical research.',
  openGraph: {
    title: 'MyHormonz — Hormonal Intelligence on Your Phone for Everyone',
    description:
      'Track and understand your hormones with AI-powered insights guided by Dr. Nisha Jackson-Woods, Ph.D. — backed by 35+ years of clinical research.',
    type: 'website',
    siteName: 'MyHormonz',
    url: SITE_URL,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MyHormonz — Hormonal Intelligence on your phone for everyone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyHormonz — Hormonal Intelligence on Your Phone for Everyone',
    description:
      'Track and understand your hormones with AI-powered insights guided by Dr. Nisha Jackson-Woods, Ph.D. — backed by 35+ years of clinical research.',
    images: ['/og-image.jpg'],
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'MyHormonz',
      legalName: 'Restorative Balance Group, LLC',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
      },
      description:
        'Hormonal intelligence on your phone for everyone — AI-powered insights guided by Dr. Nisha Jackson-Woods, Ph.D.',
      sameAs: [
        'https://www.instagram.com/myhormonz/',
        'https://www.youtube.com/@NishaJackson-mf5yu',
      ],
      founder: { '@id': `${SITE_URL}/#nisha` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#nisha`,
      name: 'Dr. Nisha Jackson-Woods',
      honorificSuffix: 'Ph.D.',
      jobTitle: 'Founder & Hormone Specialist',
      description:
        'Nationally recognized hormone expert with 35+ years of clinical experience, founder of OnePeak Medical and MyHormonz.',
      url: `${SITE_URL}/about`,
      worksFor: { '@id': `${SITE_URL}/#organization` },
      sameAs: ['https://www.youtube.com/@NishaJackson-mf5yu'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'MyHormonz',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'MobileApplication',
      name: 'MyHormonz',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'HealthApplication',
      description:
        'Track hormones, upload lab reports, and receive personalized educational insights — all on your phone.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/PreOrder',
      },
      creator: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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

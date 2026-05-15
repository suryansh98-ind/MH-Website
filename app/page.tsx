import type { Metadata } from 'next'
import HomePageClient from '@/src/page-components/HomePage'

export const metadata: Metadata = {
  title: 'MyHormonz — Hormonal Intelligence on Your Phone',
  description:
    'Track and understand your hormones with AI-powered insights guided by Dr. Nisha Woods, PhD.',
}

export default function HomePage() {
  return <HomePageClient />
}

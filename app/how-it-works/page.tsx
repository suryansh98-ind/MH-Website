import type { Metadata } from 'next'
import HowItWorksPageClient from '@/src/page-components/HowItWorksPage'

export const metadata: Metadata = {
  title: 'How It Works — MyHormonz',
  description:
    'Discover how MyHormonz helps you track hormones, understand lab results, and receive personalized insights guided by science and AI.',
}

export default function HowItWorksPage() {
  return <HowItWorksPageClient />
}

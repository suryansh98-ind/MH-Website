import type { Metadata } from 'next'
import AboutPageClient from '@/src/page-components/AboutPage'

export const metadata: Metadata = {
  title: 'About Dr. Nisha Jackson-Woods — MyHormonz',
  description:
    'Learn about Dr. Nisha Jackson-Woods, Ph.D., a nationally recognized hormone expert with over 35 years of clinical experience and the founder of MyHormonz.',
}

export default function AboutPage() {
  return <AboutPageClient />
}

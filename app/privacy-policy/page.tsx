import type { Metadata } from 'next'
import PrivacyPolicyPage from '../../src/page-components/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — MyHormonz',
  description:
    'Learn how MyHormonz collects, uses, and protects your personal and health data in connection with our services.',
}

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />
}

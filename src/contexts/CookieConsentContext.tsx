import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ConsentStatus = 'accepted' | 'rejected' | null

const COOKIE_KEY = 'mh_cookie_consent'

interface CookieConsentContextType {
  consent: ConsentStatus
  accept: () => void
  reject: () => void
  reset: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentStatus>(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (stored === 'accepted') return 'accepted'
    if (stored === 'rejected') return 'rejected'
    return null
  })

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setConsent('accepted')
  }

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, 'rejected')
    setConsent('rejected')
  }

  const reset = () => {
    localStorage.removeItem(COOKIE_KEY)
    setConsent(null)
  }

  return (
    <CookieConsentContext.Provider value={{ consent, accept, reject, reset }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used inside CookieConsentProvider')
  return ctx
}

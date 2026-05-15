'use client'

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
  // Start with null on server; hydrate from localStorage on the client
  const [consent, setConsent] = useState<ConsentStatus>(null)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(COOKIE_KEY) : null
    if (stored === 'accepted') setConsent('accepted')
    else if (stored === 'rejected') setConsent('rejected')
  }, [])

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

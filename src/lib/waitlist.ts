// ── Waitlist submission helper ──────────────────────────────────────────────
//
// POST the email to Google Apps Script web app.
// Replace the placeholder URL below once you deploy the script.

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9MqjPPA-2MSzVPXbxMxi104D13pgJqM1f1Q0cqrSeJhxcXx8uz16ZXJMbKjUk4LPF/exec'

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface SubmitResult {
  ok: boolean
  message: string
}

/**
 * Basic client-side email validation (mirrors the server-side regex).
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Submit an email to the waitlist Google Apps Script endpoint.
 *
 * Google Apps Script web-app redirects (302) on POST, so we use
 * `redirect: "follow"` and parse the final JSON response.
 * If the endpoint isn't configured yet the function throws.
 */
export async function submitEmail(email: string, source = 'website'): Promise<SubmitResult> {
  const trimmed = email.trim().toLowerCase()

  if (!isValidEmail(trimmed)) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain' }, // avoids CORS preflight
    body: JSON.stringify({ email: trimmed, source }),
  })

  if (!res.ok) {
    return { ok: false, message: 'Something went wrong. Please try again.' }
  }

  const data = await res.json()

  if (data.status === 'success') {
    return { ok: true, message: "You're on the list!" }
  }

  if (data.status === 'duplicate') {
    return { ok: true, message: "You're already on the list!" }
  }

  return { ok: false, message: data.message || 'Something went wrong.' }
}

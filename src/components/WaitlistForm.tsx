import { useState, useRef, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitEmail, isValidEmail, type SubmitStatus } from '../lib/waitlist'
import { EASE } from '../lib/animations'

// ── Asset URLs ──────────────────────────────────────────────────────────────
const USER_1 = '/assets/user-1.png'
const USER_2 = '/assets/user-2.png'
const USER_3 = '/assets/user-3.png'

// ── Types ───────────────────────────────────────────────────────────────────

interface WaitlistFormProps {
  /** Visual style — 'light' for white cards/modal, 'dark' for dark CTA section */
  variant?: 'light' | 'dark'
  /** Show title + subtitle + social proof (card style), or just the form row */
  compact?: boolean
  /** Source label sent with the email for analytics */
  source?: string
  /** Auto-focus the email input on mount */
  autoFocus?: boolean
}

// ── Component ───────────────────────────────────────────────────────────────

export default function WaitlistForm({
  variant = 'light',
  compact = false,
  source = 'website',
  autoFocus = false,
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const isDark = variant === 'dark'

  // Auto-focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(t)
    }
  }, [autoFocus])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const trimmed = email.trim()
    if (!trimmed) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }
    if (!isValidEmail(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setMessage('')

    try {
      const result = await submitEmail(trimmed, source)
      if (result.ok) {
        setStatus('success')
        setMessage(result.message)
      } else {
        setStatus('error')
        setMessage(result.message)
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  // ── Success state ─────────────────────────────────────────────────────────

  if (status === 'success') {
    return (
      <div className={compact ? '' : 'flex flex-col gap-2'}>
        {!compact && (
          <>
            <h3
              className={`font-figtree font-semibold text-[20px] ${
                isDark ? 'text-white' : 'text-[#1a1a2e]'
              }`}
            >
              Join the Waitlist
            </h3>
            <p
              className={`font-figtree text-[16px] tracking-[0.5px] ${
                isDark ? 'text-white/70' : 'text-[#6b7280]'
              }`}
            >
              First 1000 people get{' '}
              <span className="font-semibold text-[#e91e63]">1st month free!!</span>
            </p>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex items-center gap-3 py-4"
        >
          {/* Checkmark circle */}
          <div className="w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center shrink-0">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M1 7L6.5 12.5L17 1.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-figtree font-semibold text-[16px] ${
                isDark ? 'text-white' : 'text-[#1a1a2e]'
              }`}
            >
              {message}
            </span>
            <span
              className={`font-figtree text-[14px] ${
                isDark ? 'text-white/60' : 'text-[#6b7280]'
              }`}
            >
              We'll notify you when we launch.
            </span>
          </div>
        </motion.div>

        {!compact && (
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              <img src={USER_1} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src={USER_2} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src={USER_3} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
            </div>
            <span
              className={`font-figtree font-medium text-[14px] ${
                isDark ? 'text-white/70' : 'text-[#4b5563]'
              }`}
            >
              Join 2,000+ others
            </span>
          </div>
        )}
      </div>
    )
  }

  // ── Default / Error / Submitting state ────────────────────────────────────

  return (
    <div className={compact ? '' : 'flex flex-col gap-2'}>
      {!compact && (
        <>
          <h3
            className={`font-figtree font-semibold text-[20px] ${
              isDark ? 'text-white' : 'text-[#1a1a2e]'
            }`}
          >
            Join the Waitlist
          </h3>
          <p
            className={`font-figtree text-[16px] tracking-[0.5px] ${
              isDark ? 'text-white/70' : 'text-[#6b7280]'
            }`}
          >
            First 1000 people get{' '}
            <span className="font-semibold text-[#e91e63]">1st month free!!</span>
          </p>
        </>
      )}

      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${compact ? '' : 'pt-4'}`}>
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') { setStatus('idle'); setMessage('') }
          }}
          placeholder="Enter email address"
          disabled={status === 'submitting'}
          className={`flex-1 rounded-full h-[54px] px-5 font-figtree text-[16px] outline-none transition-colors duration-200 ${
            isDark
              ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40'
              : 'bg-[#f9fafb] border border-[#e5e7eb] text-[#1a1a2e] placeholder:text-[#6b7280] focus:border-primary'
          } ${status === 'error' ? (isDark ? 'border-red-400' : 'border-red-400') : ''} ${
            status === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        />
        <motion.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={status !== 'submitting' ? { scale: 1.04, boxShadow: '0 8px 20px -4px rgba(233,30,99,0.4)' } : {}}
          whileTap={status !== 'submitting' ? { scale: 0.97 } : {}}
          className={`font-figtree font-semibold text-[16px] h-[54px] px-6 rounded-full whitespace-nowrap flex items-center justify-center gap-2 ${
            isDark
              ? 'bg-[#e91e63] text-white shadow-[0px_20px_25px_-5px_rgba(233,30,99,0.4),0px_8px_10px_-6px_rgba(233,30,99,0.4)]'
              : 'bg-[#ca1670] text-white shadow-[0px_10px_15px_-3px_rgba(233,30,99,0.3),0px_4px_6px_-4px_rgba(233,30,99,0.3)]'
          } ${status === 'submitting' ? 'opacity-80 cursor-not-allowed' : ''}`}
        >
          {status === 'submitting' ? (
            <>
              <Spinner />
              Joining...
            </>
          ) : isDark ? (
            'Join Waitlist'
          ) : (
            'Get Early Access'
          )}
        </motion.button>
      </form>

      {/* Error message */}
      <AnimatePresence>
        {status === 'error' && message && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`font-figtree text-[13px] mt-2 ${
              isDark ? 'text-red-300' : 'text-red-500'
            }`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      {!compact && (
        <div className="flex items-center gap-4 pt-4">
          <div className="flex -space-x-2">
            <img src={USER_1} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
            <img src={USER_2} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
            <img src={USER_3} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
          </div>
          <span
            className={`font-figtree font-medium text-[14px] ${
              isDark ? 'text-white/70' : 'text-[#4b5563]'
            }`}
          >
            Join 2,000+ others
          </span>
        </div>
      )}
    </div>
  )
}

// ── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

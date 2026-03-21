import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWaitlist } from '../contexts/WaitlistContext'
import { backdropFade, modalScale } from '../lib/animations'
import WaitlistForm from './WaitlistForm'

export default function WaitlistModal() {
  const { isOpen, closeWaitlist } = useWaitlist()
  const modalRef = useRef<HTMLDivElement>(null)

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWaitlist()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeWaitlist])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          variants={backdropFade}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeWaitlist}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            ref={modalRef}
            variants={modalScale}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            className="relative bg-white border border-[#f3f4f6] rounded-3xl p-5 sm:p-6 md:p-8 w-[575px] max-w-full shadow-[0px_25px_50px_-12px_rgba(229,231,235,0.5)] z-10"
          >
            {/* Close button */}
            <button
              onClick={closeWaitlist}
              aria-label="Close waitlist modal"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] transition-colors duration-150 z-10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Shared WaitlistForm — full card with title, subtitle, social proof */}
            <WaitlistForm variant="light" source="modal" autoFocus />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

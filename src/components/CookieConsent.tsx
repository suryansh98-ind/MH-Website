import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '../lib/animations'
import { useCookieConsent } from '../contexts/CookieConsentContext'

const slideUp = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: { duration: 0.25, ease: EASE },
  },
}

export default function CookieConsent() {
  const { consent, accept, reject } = useCookieConsent()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show banner only if user hasn't responded yet
    if (consent === null) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [consent])

  const handleAccept = () => {
    accept()
    setVisible(false)
  }

  const handleReject = () => {
    reject()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-[90] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="max-w-[1280px] mx-auto bg-white border border-[#e5e7eb] rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0px_25px_50px_-12px_rgba(229,231,235,0.5)] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(233,30,99,0.08)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#e91e63" strokeWidth="1.5" />
                <circle cx="8" cy="10" r="1.5" fill="#e91e63" />
                <circle cx="14" cy="8" r="1" fill="#e91e63" />
                <circle cx="16" cy="14" r="1.5" fill="#e91e63" />
                <circle cx="10" cy="15" r="1" fill="#e91e63" />
                <circle cx="12" cy="12" r="0.75" fill="#e91e63" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="font-figtree text-[15px] sm:text-[16px] text-[#1f2937] leading-[1.5]">
                We use cookies to enhance your browsing experience and analyze site traffic.
                Rejecting will block third-party embeds (e.g. videos).{' '}
                <a
                  href="#"
                  className="text-[#e91e63] underline underline-offset-2 hover:text-[#b01460] transition-colors"
                  onClick={e => e.preventDefault()}
                >
                  Learn more
                </a>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReject}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full font-figtree font-semibold text-[14px] text-[#6b7280] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors duration-150 cursor-pointer"
              >
                Reject
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAccept}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full font-figtree font-semibold text-[14px] text-white bg-[#e91e63] hover:bg-[#b01460] transition-colors duration-150 cursor-pointer"
              >
                Accept
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

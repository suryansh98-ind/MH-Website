'use client'

import { motion } from 'framer-motion'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import { EASE } from '../lib/animations'

interface YoutubeEmbedProps {
  videoId: string
  title?: string
  className?: string
}

export default function YoutubeEmbed({ videoId, title = 'Video', className = '' }: YoutubeEmbedProps) {
  const { consent, accept } = useCookieConsent()

  // Accepted — load the real iframe
  if (consent === 'accepted') {
    return (
      <iframe
        className={`w-full h-full ${className}`}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  // Rejected or not yet decided — show blocked placeholder
  return (
    <div className={`w-full h-full bg-[#fde9f3] flex flex-col items-center justify-center gap-4 p-6 ${className}`}>
      {/* Cookie icon */}
      <div className="w-14 h-14 rounded-full bg-white border border-[rgba(233,30,99,0.15)] flex items-center justify-center shadow-sm">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#e91e63" strokeWidth="1.5" />
          <circle cx="8" cy="10" r="1.5" fill="#e91e63" />
          <circle cx="14" cy="8" r="1" fill="#e91e63" />
          <circle cx="16" cy="14" r="1.5" fill="#e91e63" />
          <circle cx="10" cy="15" r="1" fill="#e91e63" />
          <circle cx="12" cy="12" r="0.75" fill="#e91e63" />
        </svg>
      </div>

      {/* Message */}
      <div className="text-center max-w-[280px]">
        <p className="font-figtree font-semibold text-[15px] text-[#1a1a2e] mb-1">
          Video blocked
        </p>
        <p className="font-figtree text-[13px] text-[#6b7280] leading-[1.5]">
          This video is hosted by YouTube which uses cookies.
          Accept cookies to watch it here.
        </p>
      </div>

      {/* Accept button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={accept}
        transition={{ duration: 0.2, ease: EASE }}
        className="px-5 py-2.5 rounded-full font-figtree font-semibold text-[13px] text-white bg-[#e91e63] hover:bg-[#b01460] transition-colors duration-150 cursor-pointer"
      >
        Accept cookies &amp; watch
      </motion.button>

      {/* Watch on YouTube fallback */}
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-figtree text-[12px] text-[#6b7280] underline underline-offset-2 hover:text-[#e91e63] transition-colors"
      >
        Or watch on YouTube ↗
      </a>
    </div>
  )
}

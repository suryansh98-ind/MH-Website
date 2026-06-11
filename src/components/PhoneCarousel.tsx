'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../lib/animations'

const phones = [
  { src: '/assets/phone-track-mood.png', alt: 'Track Mood screen', label: 'Track Mood' },
  { src: '/assets/phone-upload-lab.png', alt: 'Upload Lab Reports screen', label: 'Upload Lab Reports' },
  { src: '/assets/phone-get-insights.png', alt: 'Get Insights screen', label: 'Get Insights' },
  { src: '/assets/phone-health.png', alt: 'Video Resources screen', label: 'Video Resources' },
  { src: '/assets/phone-sleep-article.png', alt: 'Health Blogs screen', label: 'Health Blogs' },
  { src: '/assets/phone-wellbeing-checkin.png', alt: 'Wellbeing Checkin screen', label: 'Wellbeing Checkin' },
  { src: '/assets/phone-ai-coach.png', alt: 'Ask Nisha Chatbot screen', label: 'Ask Nisha Chatbot' },
  { src: '/assets/phone-nutrition.png', alt: 'Log Your Food screen', label: 'Log Your Food' },
]

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

export default function PhoneCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const phoneWidth = isMobile ? 200 : 260
  const [scales, setScales] = useState<number[]>(() => phones.map(() => 1))
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScales = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const containerCenter = el.scrollLeft + el.offsetWidth / 2
    // Find the single phone closest to viewport center; only that one scales up.
    let closestIndex = 0
    let closestDistance = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const distance = Math.abs(containerCenter - childCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = i
      }
    }
    const activeScale = isMobile ? 1.15 : 1.1
    const newScales = Array.from(el.children).map((_, i) => (i === closestIndex ? activeScale : 1))
    setScales(newScales)
    setActiveIndex(closestIndex)
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 8)
  }, [isMobile])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    if (isMobile) {
      const centerChild = el.children[1] as HTMLElement
      if (centerChild) {
        el.scrollLeft = centerChild.offsetLeft - el.offsetWidth / 2 + centerChild.offsetWidth / 2
      }
    } else {
      el.scrollLeft = 0
    }
    updateScales()
    el.addEventListener('scroll', updateScales, { passive: true })
    return () => el.removeEventListener('scroll', updateScales)
  }, [isMobile, updateScales])

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    const step = phoneWidth + (isMobile ? 0 : 32)
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const padding = isMobile ? 'calc(50% - 100px)' : 'calc(50% - 130px)'

  return (
    <div className="relative w-full">
      {/* Desktop scroll buttons */}
      {!isMobile && (
        <>
          <motion.button
            aria-label="Scroll left"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-[#f3f4f6] shadow-card items-center justify-center transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <span className="font-figtree text-[20px] text-[#1a1a2e] leading-none -mt-0.5">&#8249;</span>
          </motion.button>
          <motion.button
            aria-label="Scroll right"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-[#f3f4f6] shadow-card items-center justify-center transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <span className="font-figtree text-[20px] text-[#1a1a2e] leading-none -mt-0.5">&#8250;</span>
          </motion.button>
        </>
      )}

      <div
        ref={scrollRef}
        className="w-full flex items-end overflow-x-auto snap-x snap-mandatory no-scrollbar pt-16 pb-2 scroll-smooth"
        style={{
          paddingInline: padding,
          gap: isMobile ? '0px' : '32px',
          maskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
        }}
      >
        {phones.map((phone, i) => {
          const isActive = i === activeIndex
          return (
            <div
              key={phone.label}
              className="shrink-0 snap-center flex flex-col items-center"
              style={{
                width: `${phoneWidth}px`,
                transform: `scale(${scales[i] ?? 1})`,
                transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                transformOrigin: 'bottom center',
              }}
            >
              <img src={phone.src} alt={phone.alt} className="w-full h-auto" />
              <p
                className={`font-junge italic mt-3 text-center transition-colors duration-300 ${
                  isMobile ? 'text-[14px]' : 'text-[16px]'
                } ${isActive ? 'text-[#e91e63] font-semibold' : 'text-[#4b5563]'}`}
              >
                {phone.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

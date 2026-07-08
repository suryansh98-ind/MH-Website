'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

const phones = [
  { src: '/assets/phone-sleep-article.png', alt: 'Health Blogs screen', label: 'Health Blogs' },
  { src: '/assets/phone-wellbeing-checkin.png', alt: 'Wellbeing Checkin screen', label: 'Wellbeing Checkin' },
  { src: '/assets/phone-get-insights.png', alt: 'Get Insights screen', label: 'Get Insights' },
  { src: '/assets/phone-upload-lab.png', alt: 'Upload Lab Reports screen', label: 'Upload Lab Reports' },
  { src: '/assets/phone-track-mood.png', alt: 'Track Mood screen', label: 'Track Mood' },
  { src: '/assets/phone-hormone-details.png', alt: 'Hormone Details screen', label: 'Hormone Details' },
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
    const containerRect = el.getBoundingClientRect()
    const viewportCenter = containerRect.left + containerRect.width / 2
    // Find the single phone closest to viewport center; only that one scales up.
    let closestIndex = 0
    let closestDistance = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement
      const childRect = child.getBoundingClientRect()
      const childCenter = childRect.left + childRect.width / 2
      const distance = Math.abs(viewportCenter - childCenter)
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
    const startIndex = isMobile ? 1 : Math.floor(phones.length / 2)

    const centerOnIndex = () => {
      const centerChild = el.children[startIndex] as HTMLElement
      if (!centerChild) return
      // Measure positions in viewport coords; account for current scrollLeft via +=.
      // Robust against the 100vw + negative-margin layout where `paddingInline: 50%`
      // resolves against the parent's width, not the element's rendered width.
      const containerRect = el.getBoundingClientRect()
      const childRect = centerChild.getBoundingClientRect()
      const childCenter = childRect.left + childRect.width / 2
      const viewportCenter = containerRect.left + containerRect.width / 2
      el.scrollLeft += childCenter - viewportCenter
      updateScales()
    }

    centerOnIndex()
    // Re-run after layout settles (handles late image loads / font swap)
    const timer = setTimeout(centerOnIndex, 150)

    el.addEventListener('scroll', updateScales, { passive: true })
    return () => {
      clearTimeout(timer)
      el.removeEventListener('scroll', updateScales)
    }
  }, [isMobile, updateScales])

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    const step = phoneWidth + (isMobile ? 0 : 32)
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // Use 50vw so the padding scales with viewport (the scroller is 100vw wide
   // via the negative-margin trick, but `50%` would resolve against the parent
   // and be too small — preventing the first/last item from snapping to center).
  const padding = isMobile ? 'calc(50vw - 100px)' : 'calc(50vw - 130px)'

  return (
    <div className="relative w-full">
      {/* Desktop scroll buttons — stay within parent's constrained width so they remain reachable */}
      {!isMobile && (
        <>
          <div className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              aria-label="Scroll left"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className="flex w-12 h-12 rounded-full bg-[#60346b] hover:bg-[#774184] hover:scale-110 active:scale-95 text-white border border-black/10 shadow-[0_8px_12px_rgba(0,0,0,0.25)] items-center justify-center transition-[transform,background-color] duration-200 ease-out"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              aria-label="Scroll right"
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className="flex w-12 h-12 rounded-full bg-[#60346b] hover:bg-[#774184] hover:scale-110 active:scale-95 text-white border border-black/10 shadow-[0_8px_12px_rgba(0,0,0,0.25)] items-center justify-center transition-[transform,background-color] duration-200 ease-out"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.25 10.5L8.75 7L5.25 3.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex items-end overflow-x-auto snap-x snap-mandatory no-scrollbar pt-16 pb-2 scroll-smooth"
        style={{
          width: '100vw',
          marginInline: 'calc(50% - 50vw)',
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
              <Image
                src={phone.src}
                alt={phone.alt}
                width={665}
                height={1310}
                sizes={isMobile ? '200px' : '260px'}
                className="w-full h-auto"
              />
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

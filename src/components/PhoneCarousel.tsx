'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { fadeInLeft, fadeInRight, fadeInUp, EASE } from '../lib/animations'

const phones = [
  { src: '/assets/phone-track-mood.png', alt: 'Track Mood screen', label: 'Track Mood', accent: false },
  { src: '/assets/phone-upload-lab.png', alt: 'Upload Lab Reports screen', label: 'Upload Lab Reports', accent: true },
  { src: '/assets/phone-get-insights.png', alt: 'Get Insights screen', label: 'Get Insights', accent: false },
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
  const [scales, setScales] = useState([0.78, 1, 0.78])
  const isMobile = useIsMobile()

  const updateScales = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const containerCenter = el.scrollLeft + el.offsetWidth / 2
    const newScales: number[] = []
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const distance = Math.abs(containerCenter - childCenter)
      const ratio = Math.min(distance / child.offsetWidth, 1)
      const scale = 1 - ratio * 0.22
      newScales.push(Math.round(scale * 1000) / 1000)
    }
    setScales(newScales)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || !isMobile) return
    const centerChild = el.children[1] as HTMLElement
    if (centerChild) {
      const scrollTarget = centerChild.offsetLeft - el.offsetWidth / 2 + centerChild.offsetWidth / 2
      el.scrollLeft = scrollTarget
    }
    updateScales()
    el.addEventListener('scroll', updateScales, { passive: true })
    return () => el.removeEventListener('scroll', updateScales)
  }, [isMobile, updateScales])

  // Desktop layout
  if (!isMobile) {
    return (
      <div className="w-full flex items-end gap-12 justify-center">
        <motion.div variants={fadeInLeft} whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }} className="flex flex-col items-center cursor-pointer">
          <div className="w-[280px]">
            <img src="/assets/phone-track-mood.png" alt="Track Mood screen" className="w-full h-auto" />
          </div>
          <p className="font-junge italic text-[16px] text-[#4b5563] -mt-6">Track Mood</p>
        </motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }} className="flex flex-col items-center -mb-8 cursor-pointer">
          <div className="w-[320px]">
            <img src="/assets/phone-upload-lab.png" alt="Upload Lab Reports screen" className="w-full h-auto" />
          </div>
          <p className="font-junge italic text-[16px] text-[#e91e63] font-semibold -mt-6">Upload Lab Reports</p>
        </motion.div>
        <motion.div variants={fadeInRight} whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }} className="flex flex-col items-center cursor-pointer">
          <div className="w-[280px]">
            <img src="/assets/phone-get-insights.png" alt="Get Insights screen" className="w-full h-auto" />
          </div>
          <p className="font-junge italic text-[16px] text-[#4b5563] -mt-6">Get Insights</p>
        </motion.div>
      </div>
    )
  }

  // Mobile coverflow carousel
  return (
    <div
      ref={scrollRef}
      className="w-full flex items-end overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
      style={{ paddingInline: 'calc(50% - 100px)', gap: '0px' }}
    >
      {phones.map((phone, i) => (
        <div
          key={phone.label}
          className="shrink-0 snap-center flex flex-col items-center"
          style={{
            width: '200px',
            transform: `scale(${scales[i] ?? 0.78})`,
            transition: 'transform 0.2s ease-out',
            transformOrigin: 'bottom center',
          }}
        >
          <img src={phone.src} alt={phone.alt} className="w-full h-auto" />
          <p className={`font-junge italic text-[14px] mt-1 ${phone.accent ? 'text-[#e91e63] font-semibold' : 'text-[#4b5563]'}`}>
            {phone.label}
          </p>
        </div>
      ))}
    </div>
  )
}

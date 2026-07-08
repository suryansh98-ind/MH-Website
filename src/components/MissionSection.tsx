'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, VIEWPORT } from '../lib/animations'
import { useWaitlist } from '../contexts/WaitlistContext'

export default function MissionSection() {
  const { openWaitlist } = useWaitlist()
  return (
    <section className="relative bg-gradient-to-t from-[#60346b] via-[#774184] to-[#8e4d9e] overflow-hidden py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-48">
      {/* Decorative ornaments */}
      <img src="/assets/ornament-5.png" alt="" aria-hidden className="hidden lg:block absolute -left-16 -top-10 w-36 h-36 rotate-[32deg] opacity-80 pointer-events-none select-none" />
      <img src="/assets/ornament-6.png" alt="" aria-hidden className="hidden lg:block absolute left-32 -top-8 w-11 h-11 rotate-[32deg] opacity-80 pointer-events-none select-none" />
      <img src="/assets/ornament-7.png" alt="" aria-hidden className="hidden lg:block absolute left-28 top-24 w-8 h-8 -rotate-[13deg] opacity-80 pointer-events-none select-none" />

      <img src="/assets/ornament-5.png" alt="" aria-hidden className="hidden lg:block absolute -right-10 top-4 w-64 h-64 rotate-[178deg] opacity-30 pointer-events-none select-none" />
      <img src="/assets/ornament-6.png" alt="" aria-hidden className="hidden lg:block absolute right-16 top-16 w-20 h-20 rotate-[178deg] opacity-30 pointer-events-none select-none" />
      <img src="/assets/ornament-7.png" alt="" aria-hidden className="hidden lg:block absolute right-24 top-56 w-16 h-16 rotate-[133deg] opacity-30 pointer-events-none select-none" />

      <img src="/assets/ornament-5.png" alt="" aria-hidden className="hidden lg:block absolute left-4 bottom-8 w-44 h-44 rotate-[32deg] opacity-20 pointer-events-none select-none" />
      <img src="/assets/ornament-6.png" alt="" aria-hidden className="hidden lg:block absolute left-56 bottom-16 w-12 h-12 rotate-[32deg] opacity-20 pointer-events-none select-none" />
      <img src="/assets/ornament-7.png" alt="" aria-hidden className="hidden lg:block absolute left-52 bottom-0 w-9 h-9 -rotate-[13deg] opacity-20 pointer-events-none select-none" />

      <div className="relative max-w-[896px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="font-junge text-[36px] md:text-[60px] text-white text-center leading-[40px] md:leading-[60px]"
          >
            Her Mission
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="font-figtree font-light text-[18px] md:text-[24px] text-white/90 text-center leading-7 md:leading-8"
          >
            To help people live longer, healthier, more vibrant lives by
            demystifying their own biology.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="pt-2 md:pt-4">
            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: '0 24px 48px -8px rgba(0,0,0,0.25)',
              }}
              whileTap={{ scale: 0.97 }}
              onClick={openWaitlist}
              className="bg-white text-primary font-figtree font-bold text-[16px] md:text-[18px] px-8 md:px-10 py-4 md:py-[18px] rounded-full shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              Join the Movement
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

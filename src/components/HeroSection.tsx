import { motion } from 'framer-motion'
import { EASE, staggerContainer, fadeInUp } from '../lib/animations'

const DR_NISHA = 'http://localhost:3845/assets/e6a6e288b2c0d097d9b6eb29c326703c832c5b18.png'
const ICON_BADGE = 'http://localhost:3845/assets/4d1dfd077d8839c92c1e6b24b0bdd5054845b40a.svg'
const ICON_ARROW = 'http://localhost:3845/assets/dba80be7f17919c19eebc59b2820ddcea0294192.svg'

export default function HeroSection() {
  return (
    <section className="relative min-h-0 lg:min-h-[888px] bg-white overflow-hidden flex items-center pt-16 md:pt-20">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-0 h-full w-1/2 opacity-30"
          style={{ background: 'linear-gradient(to left, #fdf2f8, transparent)' }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 w-full py-10 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Portrait */}
          <div className="relative flex-shrink-0 w-full lg:w-auto">
            {/* Glow */}
            <div className="absolute inset-[-16px] rounded-[9999px] bg-primary/10 blur-[32px] pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, x: -56 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: EASE }}
              className="relative rounded-3xl overflow-hidden shadow-hero w-full lg:w-[469px] aspect-[469/630]"
            >
              <img
                src={DR_NISHA}
                alt="Dr. Nisha Woods, PhD"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col gap-4 md:gap-6"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-primary-muted px-3 md:px-4 py-1.5 md:py-2 rounded-full self-start"
            >
              <img src={ICON_BADGE} alt="" className="w-3 h-3" />
              <span className="font-figtree font-bold text-primary text-[12px] md:text-[14px] tracking-[0.35px] uppercase">
                35+ Years of Wellness Excellence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="font-junge text-[36px] md:text-[61px] text-[#1f2937] leading-[1.2]"
            >
              Meet{' '}
              <span className="text-primary italic">Nisha Woods</span>,
              <br />
              PhD.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="font-figtree text-[16px] md:text-[20px] text-[#6b7280] leading-[1.5] max-w-[560px]"
            >
              Pioneer in functional medicine, hormone health educator,
              and founder of OnePeak Medical. Dr. Nisha Woods is dedicated to
              transforming healthcare by addressing underlying lifestyle factors,
              not just the symptoms.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 16px 32px -8px rgba(202,22,112,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-primary text-white font-figtree font-semibold text-[14px] md:text-[16px] px-6 md:px-8 py-3 md:py-[15px] rounded-full shadow-card transition-all duration-200"
              >
                Start Your Journey
                <img src={ICON_ARROW} alt="" className="w-2.5 h-2.5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, borderColor: '#ca1670', color: '#ca1670' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 bg-white border border-[#e5e7eb] text-[#1f2937] font-figtree font-semibold text-[14px] md:text-[16px] px-6 md:px-8 py-3 md:py-[15px] rounded-full transition-all duration-200"
              >
                View Publications
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

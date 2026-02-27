import { motion } from 'framer-motion'
import { EASE, staggerContainer, fadeInUp } from '../lib/animations'

const DR_NISHA = 'https://www.figma.com/api/mcp/asset/81b38d66-c836-461a-abc0-d52d9873417b'
const ICON_BADGE = 'https://www.figma.com/api/mcp/asset/870a1f7e-fbf1-4ac0-92d7-1484a5c074a5'
const ICON_ARROW = 'https://www.figma.com/api/mcp/asset/385fb849-a5ca-4a89-bf6f-e9ed81121718'
const ICON_BOOK = 'https://www.figma.com/api/mcp/asset/ca8b2fd6-d7a3-4c7c-8d00-17a21b7fa166'

export default function HeroSection() {
  return (
    <section className="relative min-h-[888px] bg-white overflow-hidden flex items-center pt-20">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-0 h-full w-1/2 opacity-30"
          style={{ background: 'linear-gradient(to left, #fdf2f8, transparent)' }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-8 w-full py-24">
        <div className="flex items-center gap-16">
          {/* Portrait */}
          <div className="relative flex-shrink-0">
            {/* Glow */}
            <div className="absolute inset-[-16px] rounded-[9999px] bg-primary/10 blur-[32px] pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, x: -56 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: EASE }}
              className="relative rounded-3xl overflow-hidden shadow-hero"
              style={{ width: 469, height: 630 }}
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
            className="flex-1 flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-primary-muted px-4 py-2 rounded-full self-start"
            >
              <img src={ICON_BADGE} alt="" className="w-3 h-3" />
              <span className="font-figtree font-bold text-primary text-[14px] tracking-[0.35px] uppercase">
                35+ Years of Clinical Excellence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="font-junge text-[61px] text-[#1f2937] leading-[1.2]"
            >
              Meet{' '}
              <span className="text-primary">Nisha Woods</span>,
              <br />
              PhD.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="font-figtree text-[20px] text-[#6b7280] leading-[1.5] max-w-[560px]"
            >
              Pioneer in functional medicine, hormone optimization specialist,
              and founder of OnePeak Medical. Dr. Nisha Woods is dedicated to
              transforming healthcare by treating the root cause, not just the
              symptoms.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 16px 32px -8px rgba(202,22,112,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-primary text-white font-figtree font-semibold text-[16px] px-8 py-[15px] rounded-full shadow-card transition-all duration-200"
              >
                Start Your Journey
                <img src={ICON_ARROW} alt="" className="w-2.5 h-2.5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, borderColor: '#ca1670', color: '#ca1670' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-white border border-[#e5e7eb] text-[#1f2937] font-figtree font-semibold text-[16px] px-8 py-[15px] rounded-full transition-all duration-200"
              >
                <img src={ICON_BOOK} alt="" className="w-4 h-3" />
                View Publications
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

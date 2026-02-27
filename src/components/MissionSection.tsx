import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, VIEWPORT } from '../lib/animations'

export default function MissionSection() {
  return (
    <section className="relative bg-primary overflow-hidden py-24 px-48">
      {/* Decorative blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-[32px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500 blur-[32px]" />
      </div>

      <div className="max-w-[896px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col items-center gap-8"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="font-junge text-[60px] text-white text-center leading-[60px]"
          >
            Her Mission
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="font-figtree font-light text-[24px] text-white/90 text-center leading-8"
          >
            To help people live longer, healthier, more vibrant lives by
            demystifying their own biology.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="pt-4">
            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: '0 24px 48px -8px rgba(0,0,0,0.25)',
              }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-primary font-figtree font-bold text-[18px] px-10 py-[18px] rounded-full shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              Join the Movement
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

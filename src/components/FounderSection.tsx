import { motion } from 'framer-motion'
import { fadeInUp, VIEWPORT } from '../lib/animations'

const ONEPEAK_LOGO = 'http://localhost:3845/assets/21c80c6a78ee7c21a716048f95eb6faf9cc5f505.png'

export default function FounderSection() {
  return (
    <section className="bg-[#fffdf9] py-16">
      <div className="max-w-[1280px] mx-auto px-8 flex flex-col items-center gap-9">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-figtree font-semibold text-primary text-[16px] uppercase tracking-[1.4px] text-center"
        >
          Founder &amp; Wellness Director Of
        </motion.p>

        {/* Logo + clinic name */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col items-center gap-3 opacity-70"
        >
          <img src={ONEPEAK_LOGO} alt="OnePeak Medical" className="h-14 w-auto" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-figtree text-[18px] text-[#1f2937]">OnePeak Medical</span>
            <span className="font-figtree text-[12px] text-[#6b7280]">Founder</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { fadeInUp, VIEWPORT } from '../lib/animations'

const ONEPEAK_LOGO = 'https://www.figma.com/api/mcp/asset/b4f1fede-cb13-4b29-a106-e130d58ff819'

export default function FounderSection() {
  return (
    <section className="bg-[#fde9f3] border-t border-b border-[#e5e7eb] py-16">
      <div className="max-w-[1280px] mx-auto px-8 flex flex-col items-center gap-9">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-figtree font-semibold text-primary text-[16px] uppercase tracking-[1.4px] text-center"
        >
          Founder &amp; Clinical Director Of
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

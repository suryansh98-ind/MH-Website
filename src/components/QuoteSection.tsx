import { motion } from 'framer-motion'
import { VIEWPORT } from '../lib/animations'

const QUOTE_OPEN = 'https://www.figma.com/api/mcp/asset/596efbe8-0efc-4b5e-984e-a78edb6ff83c'
const QUOTE_CLOSE = 'https://www.figma.com/api/mcp/asset/fa3fef5a-ec4b-418a-a9da-06eb95a8c50a'

export default function QuoteSection() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-12 overflow-hidden">
      <div className="max-w-[896px] mx-auto flex flex-col items-center gap-6">
        {/* Quote block */}
        <div className="relative w-full flex justify-center">
          {/* Opening quote mark */}
          <motion.img
            src={QUOTE_OPEN}
            alt=""
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-1 md:-left-2 -top-2 w-6 md:w-10 h-auto -rotate-180 scale-y-[-1]"
          />

          {/* Quote text */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-junge text-[28px] md:text-[60px] text-primary text-center leading-[36px] md:leading-[60px] px-6 md:px-8"
          >
            Balanced hormones don't just improve lifestyle. Balanced hormones
            save lives.
          </motion.h2>

          {/* Closing quote mark */}
          <motion.img
            src={QUOTE_CLOSE}
            alt=""
            initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-1 md:-right-2 bottom-0 w-6 md:w-10 h-auto"
          />
        </div>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="flex items-center gap-4 pt-4"
        >
          <div className="h-px w-10 md:w-16 bg-[#d1d5db]" />
          <span className="font-junge text-[16px] md:text-[18px] text-[#1f2937] text-center whitespace-nowrap">
            Dr. Nisha Woods, PhD
          </span>
          <div className="h-px w-10 md:w-16 bg-[#d1d5db]" />
        </motion.div>
      </div>
    </section>
  )
}

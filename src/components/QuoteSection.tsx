import { motion } from 'framer-motion'
import { VIEWPORT } from '../lib/animations'

const QUOTE_OPEN = 'http://localhost:3845/assets/44e0f22d091fa5884c2ae6a9c637a7633d2a2106.svg'
const QUOTE_CLOSE = 'http://localhost:3845/assets/4780dcc507f32714f3b62b4a6921465393b9fc0c.svg'

export default function QuoteSection() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-12 overflow-hidden">
      <div className="max-w-[896px] mx-auto flex flex-col items-center gap-6">
        {/* Quote block */}
        <div className="relative w-full flex justify-center px-4 md:px-4">
          {/* Opening quote mark */}
          <motion.div
            initial={{ opacity: 0, scaleX: -0.5, scaleY: 0.5 }}
            whileInView={{ opacity: 1, scaleX: -1, scaleY: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 md:left-0 -top-2 w-[24px] h-[15px] md:w-[40px] md:h-[25px]"
          >
            <img
              src={QUOTE_OPEN}
              alt=""
              className="w-full h-full"
            />
          </motion.div>

          {/* Quote text */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-junge text-[28px] md:text-[60px] text-primary text-center leading-[36px] md:leading-[64px] px-8 md:px-12"
          >
            Balanced hormones don't just improve your lifestyle.
            They change your life
          </motion.h2>

          {/* Closing quote mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 md:right-0 bottom-0 w-[24px] h-[15px] md:w-[40px] md:h-[25px]"
          >
            <img
              src={QUOTE_CLOSE}
              alt=""
              className="w-full h-full"
            />
          </motion.div>
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

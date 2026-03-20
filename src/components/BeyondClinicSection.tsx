import { motion } from 'framer-motion'
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp, VIEWPORT } from '../lib/animations'

const YOGA_IMG = '/assets/yoga.png'
const HIKING_IMG = '/assets/hiking.png'
const ICON_NATURE = '/assets/icon-nature.svg'
const ICON_HEART = '/assets/icon-heart.svg'
const ICON_LOOM = '/assets/icon-loom.svg'

export default function BeyondClinicSection() {
  return (
    <section className="bg-white py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#fafafa] rounded-2xl md:rounded-3xl p-6 md:p-16 flex flex-col md:flex-row gap-8 md:gap-12 items-center"
        >
          {/* Image grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex gap-3 md:gap-4 flex-1 w-full"
          >
            <motion.div
              variants={fadeInLeft}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35 }}
              className="flex-1 h-36 md:h-48 rounded-2xl md:rounded-3xl overflow-hidden"
            >
              <img
                src={YOGA_IMG}
                alt="Yoga and mindfulness"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.div>

            <motion.div
              variants={fadeInLeft}
              className="flex-1 flex flex-col pt-6 md:pt-8"
              transition={{ delay: 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                className="h-36 md:h-48 rounded-2xl md:rounded-3xl overflow-hidden"
              >
                <img
                  src={HIKING_IMG}
                  alt="Hiking in nature"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex-1 flex flex-col gap-2"
          >
            <motion.p
              variants={fadeInRight}
              className="font-figtree font-bold text-primary text-[13px] md:text-[14px] tracking-[1.4px] uppercase"
            >
              Beyond the Practice
            </motion.p>

            <motion.h3
              variants={fadeInRight}
              className="font-junge text-[28px] md:text-[36px] text-[#1f2937] leading-[34px] md:leading-[40px]"
            >
              Living the Principles
            </motion.h3>

            <motion.p
              variants={fadeInUp}
              className="font-figtree text-[15px] md:text-[16px] text-[#6b7280] leading-[24px] md:leading-[26px] pt-3 md:pt-4"
            >
              When she's not researching or supporting individuals, Nisha is an avid
              hiker in the Pacific Northwest. She believes that connection with
              nature is a fundamental pillar of hormonal health.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="font-figtree text-[15px] md:text-[16px] text-[#6b7280] leading-[24px] md:leading-[26px]"
            >
              "I don't just recommend these practices, I live them. From cold
              plunging in mountain lakes to prioritizing optimal sleep to knowing
              when to rest your mind next to a mountain lake."
            </motion.p>

            {/* Badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 md:gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm"
              >
                <img src={ICON_NATURE} alt="" className="w-3 h-3.5" />
                <span className="font-figtree font-medium text-[13px] md:text-[14px] text-[#1f2937]">
                  Nature Enthusiast
                </span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm"
              >
                <img src={ICON_HEART} alt="" className="w-3.5 h-3" />
                <span className="font-figtree font-medium text-[13px] md:text-[14px] text-[#1f2937]">
                  Mother of 2
                </span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-sm"
              >
                <img src={ICON_LOOM} alt="" className="w-3.5 h-3.5" />
                <span className="font-figtree font-medium text-[13px] md:text-[14px] text-[#1f2937]">
                  Loom Weaver
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

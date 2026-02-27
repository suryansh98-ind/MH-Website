import { motion } from 'framer-motion'
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp, VIEWPORT } from '../lib/animations'

const EDUCATOR_BG = 'https://www.figma.com/api/mcp/asset/883a8137-80e5-46b3-b170-82105577ba19'
const ICON_RADIO = 'https://www.figma.com/api/mcp/asset/73a22544-9e9e-4434-a783-bc6562402e90'
const ICON_TRAINING = 'https://www.figma.com/api/mcp/asset/4a1e02de-99c2-4c13-87e7-787cd8dd29c7'
const ICON_AUTHOR = 'https://www.figma.com/api/mcp/asset/73d54eea-6c3c-4bb9-91c9-433a8abfbe71'
const ICON_PLAY = 'https://www.figma.com/api/mcp/asset/de6a13b9-1450-41c8-9160-9f75b56bf537'

const items = [
  {
    icon: ICON_RADIO,
    iconSize: { width: 14, height: 19 },
    title: 'Host of Radio Show',
    body: 'She hosted a wellness radio show for 18 years and served as a television expert, helping the public with hormone balance and sustainable aging.',
  },
  {
    icon: ICON_TRAINING,
    iconSize: { width: 21, height: 17 },
    title: 'Physician Training Programs',
    body: 'Created the "Medical Provider Training Program" and certified hundreds of health professionals, raising hormone care standards.',
  },
  {
    icon: ICON_AUTHOR,
    iconSize: { width: 24, height: 12 },
    title: 'Author & Speaker',
    body: 'Nisha has authored three books on hormone balance and is writing her fourth about sympathetic overdrive and chronic stress.',
  },
]

export default function EducatorSection() {
  return (
    <section className="bg-white py-20 px-20">
      <div className="max-w-[1280px] mx-auto flex gap-16 items-center">
        {/* Left: list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex-1 flex flex-col gap-8"
        >
          <motion.h3
            variants={fadeInLeft}
            className="font-junge text-[30px] text-primary leading-[36px]"
          >
            Educator and National Voice
          </motion.h3>

          <div className="flex flex-col gap-8">
            {items.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-muted flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt=""
                      style={{ width: item.iconSize.width, height: item.iconSize.height }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-figtree font-bold text-[18px] text-[#1f2937] leading-[28px]">
                      {item.title}
                    </h4>
                    <p className="font-figtree text-[14px] text-[#6b7280] leading-[20px]">
                      {item.body}
                    </p>
                  </div>
                </div>
                {i < items.length - 1 && (
                  <div className="h-px bg-[#f3f4f6] mt-8" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: video card */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex-shrink-0 relative"
          style={{ width: 576 }}
        >
          {/* Background image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[40px] overflow-hidden border-2 border-white shadow-hero"
            style={{ height: 390 }}
          >
            <img
              src={EDUCATOR_BG}
              alt="Dr. Nisha Woods presenting"
              className="w-full h-full object-cover"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg"
            >
              <img src={ICON_PLAY} alt="Play" className="w-5 h-5 ml-1" />
            </motion.button>
          </motion.div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="absolute bottom-[-20px] left-5 right-[-16px] bg-white/95 backdrop-blur-sm border border-[#f3f4f6] rounded-2xl p-4 shadow-card flex items-center gap-3"
          >
            <img src={ICON_PLAY} alt="" className="w-5 h-5 flex-shrink-0" />
            <span className="font-figtree font-medium text-[14px] text-[#1f2937]">
              Watch her presenting her concept.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion, useScroll, useTransform } from 'framer-motion'

const LOGO_ICON = 'https://www.figma.com/api/mcp/asset/ba6bd9c0-9d61-4648-9797-28bf67720c57'

export default function Navbar() {
  const { scrollY } = useScroll()
  const shadow = useTransform(scrollY, [0, 40], ['0 0 0 0 rgba(0,0,0,0)', '0 1px 24px 0 rgba(0,0,0,0.08)'])
  const bg = useTransform(scrollY, [0, 40], ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.96)'])

  return (
    <motion.nav
      style={{ boxShadow: shadow, backgroundColor: bg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#f3f4f6]"
    >
      <div className="max-w-[1280px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={LOGO_ICON} alt="MyHormonz" className="h-10 w-auto" />
            <span className="font-junge text-[28px] text-[#1f2937] leading-none whitespace-nowrap">
              MyHormonz
            </span>
          </motion.div>

          {/* Nav links */}
          <motion.div
            className="flex items-center gap-10 font-figtree text-[20px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <a href="#" className="text-[#1f2937] hover:text-primary transition-colors duration-200">
              Home
            </a>
            <a href="#" className="text-primary font-medium">
              About Nisha
            </a>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 20px -4px rgba(202,22,112,0.4)' }}
          whileTap={{ scale: 0.97 }}
          className="bg-primary text-white font-figtree font-semibold text-[14px] px-6 py-2 rounded-full shadow-card transition-shadow duration-200"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  )
}

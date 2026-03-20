import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useWaitlist } from '../contexts/WaitlistContext'

const LOGO_ICON = '/assets/logo-icon.png'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openWaitlist } = useWaitlist()
  const { scrollY } = useScroll()
  const shadow = useTransform(scrollY, [0, 40], ['0 0 0 0 rgba(0,0,0,0)', '0 1px 24px 0 rgba(0,0,0,0.08)'])
  const bg = useTransform(scrollY, [0, 40], ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.96)'])
  const location = useLocation()
  const pathname = location.pathname

  return (
    <motion.nav
      style={{ boxShadow: shadow, backgroundColor: bg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#f3f4f6]"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src={LOGO_ICON} alt="MyHormonz" className="h-8 md:h-10 w-auto" />
            <span className="font-junge text-[22px] md:text-[28px] text-[#1f2937] leading-none whitespace-nowrap">
              MyHormonz
            </span>
          </Link>
        </motion.div>

        {/* Nav links + CTA – desktop */}
        <motion.div
          className="hidden md:flex items-center gap-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            to="/how-it-works"
            className={`font-figtree text-[16px] transition-colors duration-200 no-underline ${
              pathname === '/how-it-works' ? 'text-primary font-medium' : 'text-[#1f2937] hover:text-primary'
            }`}
          >
            How it works
          </Link>
          <Link
            to="/about"
            className={`font-figtree text-[16px] transition-colors duration-200 no-underline ${
              pathname === '/about' ? 'text-primary font-medium' : 'text-[#1f2937] hover:text-primary'
            }`}
          >
            About Nisha
          </Link>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 20px -4px rgba(202,22,112,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={openWaitlist}
            className="bg-primary text-white font-figtree font-semibold text-[14px] px-6 py-2.5 rounded-full shadow-card transition-shadow duration-200"
          >
            Join Waitlist
          </motion.button>
        </motion.div>

        {/* Hamburger – mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-[#1f2937] rounded-full origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-[#1f2937] rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-[#1f2937] rounded-full origin-center"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-[#f3f4f6]"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              <Link
                to="/how-it-works"
                onClick={() => setMenuOpen(false)}
                className={`font-figtree text-[18px] transition-colors no-underline ${
                  pathname === '/how-it-works' ? 'text-primary font-medium' : 'text-[#1f2937] hover:text-primary'
                }`}
              >
                How it works
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={`font-figtree text-[18px] transition-colors no-underline ${
                  pathname === '/about' ? 'text-primary font-medium' : 'text-[#1f2937] hover:text-primary'
                }`}
              >
                About Nisha
              </Link>
              <button
                onClick={() => { setMenuOpen(false); openWaitlist() }}
                className="self-start bg-primary text-white font-figtree font-semibold text-[14px] px-6 py-2 rounded-full shadow-card mt-2"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, VIEWPORT } from '../lib/animations'

const LOGO_ICON = 'https://www.figma.com/api/mcp/asset/ba6bd9c0-9d61-4648-9797-28bf67720c57'
const INSTAGRAM_ICON = 'https://www.figma.com/api/mcp/asset/ba8e8934-af33-4fa6-907a-e9707b420412'
const LINKEDIN_ICON = 'https://www.figma.com/api/mcp/asset/34fbfd43-d0a3-44e4-bb9d-b2917d8bc631'

function InstagramIcon() {
  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -2 }}
      className="relative w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
      style={{
        background:
          'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
      }}
    >
      <img src={INSTAGRAM_ICON} alt="Instagram" className="absolute inset-[18.75%] w-[62.5%] h-[62.5%]" />
    </motion.div>
  )
}

function LinkedInIcon() {
  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -2 }}
      className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer bg-[#1275b1] flex items-center justify-center"
    >
      <img src={LINKEDIN_ICON} alt="LinkedIn" className="w-[50%] h-[50%]" />
    </motion.div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] border-t border-[#e5e7eb] pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-4 gap-12 pb-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <img src={LOGO_ICON} alt="MyHormonz" className="h-[30px] w-auto" />
              <span className="font-junge text-[21px] text-[#1f2937]">MyHormonz</span>
            </div>
            <p className="font-figtree text-[14px] text-[#6b7280] leading-[20px]">
              Empowering you with the science of yourself.
            </p>
          </motion.div>

          {/* Discover */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <h5 className="font-figtree font-bold text-[16px] text-[#1f2937] leading-[24px]">
              Discover
            </h5>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="font-figtree text-[14px] text-[#6b7280] hover:text-primary transition-colors duration-200 leading-[20px]"
                >
                  MyHormonz App
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <h5 className="font-figtree font-bold text-[16px] text-[#1f2937] leading-[24px]">
              Connect
            </h5>
            <div className="flex items-center gap-2">
              <InstagramIcon />
              <LinkedInIcon />
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <h5 className="font-figtree font-bold text-[16px] text-[#1f2937] leading-[24px]">
              Legal
            </h5>
            <ul className="flex flex-col gap-2">
              {['Privacy Policy', 'Terms of Service', 'Medical Disclaimer'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-figtree text-[14px] text-[#6b7280] hover:text-primary transition-colors duration-200 leading-[20px]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-[#e5e7eb] pt-8 flex items-center justify-between">
          <span className="font-figtree text-[12px] text-[#6b7280] leading-[16px]">
            © 2026 MyHormonz. All rights reserved.
          </span>
          <span className="font-figtree text-[12px] text-[#6b7280] leading-[16px] text-right max-w-md">
            Disclaimer: Content is for educational purposes only and does not
            constitute medical advice.
          </span>
        </div>
      </div>
    </footer>
  )
}

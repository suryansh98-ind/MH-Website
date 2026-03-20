import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, VIEWPORT } from '../lib/animations'

const LOGO_ICON = 'http://localhost:3845/assets/101e180997fad529f22ae6cfbfe4d833d9bfe014.png'
const INSTAGRAM_ICON = 'http://localhost:3845/assets/a32b61aaa8b8d665a9f9aebca022f4aa34be786d.svg'
const LINKEDIN_ICON = 'http://localhost:3845/assets/76089209e96b4b9f0d379b4558e257d1786d1357.svg'

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
    <footer className="bg-[#fafafa] border-t border-[#e5e7eb] pt-12 md:pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-8 md:pb-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1 flex flex-col gap-4">
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
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h5 className="font-figtree font-bold text-[16px] text-[#1f2937] leading-[24px]">
              Legal
            </h5>
            <ul className="flex flex-col gap-2">
              {['Privacy Policy', 'Terms of Service', 'Health Information Disclaimer'].map((item) => (
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
        <div className="border-t border-[#e5e7eb] pt-6 md:pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
          <span className="font-figtree text-[12px] text-[#6b7280] leading-[16px]">
            &copy; 2026 MyHormonz. All rights reserved.
          </span>
          <span className="font-figtree text-[12px] text-[#6b7280] leading-[16px] md:text-right max-w-md">
            Disclaimer: Content is for educational purposes only and does not
            constitute medical advice.
          </span>
        </div>
      </div>
    </footer>
  )
}

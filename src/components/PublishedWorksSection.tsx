import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, VIEWPORT } from '../lib/animations'

const BOOK_1 = '/assets/book-1.png'
const BOOK_2 = '/assets/book-2.png'
const BOOK_3 = '/assets/book-3.png'

interface BookProps {
  src: string
  title: string
  badge: string
  href: string
  featured?: boolean
  delay?: number
}

function BookCard({ src, title, badge, href, featured = false, delay = 0 }: BookProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeInUp}
      custom={delay}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      whileTap={{ scale: 0.97 }}
      className={`flex flex-col items-center gap-3 md:gap-4 cursor-pointer no-underline ${featured ? 'w-full md:w-[322px]' : 'w-full md:w-64'}`}
    >
      <motion.div
        className={`
          w-full bg-white border-l-4 border-[#d1d5db] rounded-sm rounded-r-lg overflow-hidden
          ${featured ? 'shadow-[0px_25px_31px_-6px_rgba(0,0,0,0.1),0px_10px_12px_-8px_rgba(0,0,0,0.1)]' : 'shadow-book'}
        `}
        style={{ aspectRatio: '2/3' }}
        whileHover={{ boxShadow: '0 32px 60px -12px rgba(0,0,0,0.2)' }}
        transition={{ duration: 0.35 }}
      >
        <img src={src} alt={title} className="w-full h-full object-cover" />
      </motion.div>

      <div className="flex flex-col items-center gap-1 w-full">
        <h4 className="font-figtree font-bold text-[16px] md:text-[18px] text-[#1f2937] text-center leading-[24px] md:leading-[28px]">
          {title}
        </h4>
        <span className="font-figtree text-[13px] md:text-[14px] text-[#6b7280] text-center">
          {badge}
        </span>
      </div>
    </motion.a>
  )
}

export default function PublishedWorksSection() {
  return (
    <section id="publications" className="bg-[#fafafa] py-12 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3 mb-8 md:mb-12"
        >
          <h2 className="font-junge text-[28px] md:text-[36px] text-[#1a1a2e] text-center leading-[34px] md:leading-[40px]">
            Published Works
          </h2>
          <p className="font-figtree text-[15px] md:text-[16px] text-[#6b7280] text-center">
            Translating complex science into actionable guides for everyday living.
          </p>
        </motion.div>

        {/* Books grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-8 lg:gap-[72px]"
        >
          {/* Side books aligned to center vertically */}
          <div className="flex items-center justify-center md:self-stretch w-[180px] sm:w-[200px] md:w-auto">
            <BookCard
              src={BOOK_1}
              title="The Hormone Survival Guide For Perimenopause"
              badge="National Bestseller"
              href="https://www.amazon.com/Hormone-Survival-Guide-Perimenopause-Naturally/dp/0974206709?ref_=ast_author_dp&th=1&psc=1"
              delay={0}
            />
          </div>

          {/* Featured center book */}
          <div className="flex justify-center w-[200px] sm:w-[240px] md:w-auto">
            <BookCard
              src={BOOK_2}
              title="Brilliant Burnout"
              badge="New Release"
              href="https://www.amazon.com/Brilliant-Burnout-Successful-Rewiring-Hormones-ebook/dp/B07NSFLLC5?ref_=ast_author_dp&th=1&psc=1"
              featured
              delay={0.1}
            />
          </div>

          <div className="flex items-center justify-center md:self-stretch w-[180px] sm:w-[200px] md:w-auto">
            <BookCard
              src={BOOK_3}
              title="Surviving The Teenage Hormone Takeover"
              badge="National Bestseller"
              href="https://www.amazon.com/Surviving-Teenage-Hormone-Takeover-Guide/dp/0849913128?ref_=ast_author_dp&th=1&psc=1"
              delay={0.2}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, VIEWPORT } from '../lib/animations'

const LAB_RESEARCH = '/assets/lab-research.png'

export default function PioneerSection() {
  return (
    <section className="bg-[#fafafa] py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col gap-6 w-full md:w-[373px] flex-shrink-0"
          >
            <motion.div variants={fadeInLeft} className="flex flex-col gap-0">
              <h2 className="font-junge text-[28px] md:text-[36px] text-[#1f2937] leading-[32px] md:leading-[40px]">
                A Pioneer in
              </h2>
              <h2 className="font-junge text-[28px] md:text-[36px] text-primary italic leading-[32px] md:leading-[40px]">
                Functional Wellness
              </h2>
            </motion.div>

            <motion.div
              variants={fadeInLeft}
              className="h-1 w-20 bg-primary rounded-full"
            />

            <motion.div
              variants={fadeInLeft}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden shadow-card h-48 md:h-64 relative"
            >
              <img
                src={LAB_RESEARCH}
                alt="Lab research"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>

          {/* Right content – two columns on desktop, single on mobile */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 flex-1 items-start">
            {/* Column 1 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="flex flex-col gap-6 flex-1"
            >
              <motion.p variants={fadeInUp} className="font-figtree text-[15px] md:text-[16px] text-[#6b7280] leading-[24px] md:leading-[26px]">
                Nisha Woods began her career frustrated by the limitations of
                conventional healthcare approaches. She noticed that many individuals,
                especially women, were being dismissed with "normal" lab results despite
                suffering from debilitating fatigue, brain fog, and weight gain.
              </motion.p>
              <motion.p variants={fadeInUp} className="font-figtree text-[15px] md:text-[16px] text-[#6b7280] leading-[24px] md:leading-[26px]">
                Driven to find answers, she pursued advanced degrees in
                functional wellness and hormone health. Her research revealed a
                critical gap in how hormonal health is traditionally evaluated
                focusing on disease markers rather than optimization markers.
              </motion.p>
            </motion.div>

            {/* Column 2 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="flex flex-col gap-6 flex-1"
            >
              <motion.p variants={fadeInRight} className="font-figtree text-[15px] md:text-[16px] text-[#6b7280] leading-[24px] md:leading-[26px]">
                Today, Dr. Woods is recognized globally for her personalized
                approaches that combine cutting edge assessments with holistic
                lifestyle guidance. She doesn't just support individuals; she
                empowers them to understand their own biology.
              </motion.p>

              <motion.div
                variants={fadeInRight}
                className="border-l-4 border-primary pl-5"
              >
                <p className="font-junge text-[16px] md:text-[18px] text-[#1f2937] leading-[26px] md:leading-[28px]">
                  "The human body has an incredible capacity to thrive when given
                  the right tools. My job is to help you understand what's needed
                  and provide those tools."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

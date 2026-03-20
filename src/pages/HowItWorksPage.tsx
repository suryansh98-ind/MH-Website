import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn, VIEWPORT, EASE } from '../lib/animations'
import { useWaitlist } from '../contexts/WaitlistContext'

// ── Asset URLs ──────────────────────────────────────────────────────────────
const ICON_HORMONE = '/assets/icon-hormone.svg'
const ICON_CHECK   = '/assets/icon-check.svg'
const ICON_METAB   = '/assets/icon-metabolism.svg'
const ICON_SLEEP   = '/assets/icon-sleep.svg'
const ICON_BRAIN   = '/assets/icon-ai.svg'
const ICON_CLARITY = '/assets/icon-clarity.svg'
const ICON_BODY    = '/assets/icon-body.svg'
const ICON_ACTION  = '/assets/icon-action.svg'
const DR_NISHA_HIW = '/assets/dr-nisha-hiw.png'
const ICON_RESEARCH = '/assets/icon-research.svg'

// ── Reusable sub-components ─────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="font-figtree font-bold text-[12px] text-[#e91e63] tracking-[2.4px] uppercase text-center">
      {children}
    </span>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  items: string[]
}

function FeatureCard({ icon, title, description, items }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-[#f9fafb] rounded-[32px] p-8 md:p-10 flex gap-6"
    >
      <div className="bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-16 h-16 flex items-center justify-center shrink-0">
        <img src={icon} alt="" className="w-[22px] h-[22px]" />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-junge font-semibold text-[24px] text-[#1a1a2e] leading-[32px]">
            {title}
          </h3>
          <p className="font-figtree text-[16px] text-[#4b5563] leading-[1.5] tracking-[0.5px]">
            {description}
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <img src={ICON_CHECK} alt="" className="w-3 h-4 mt-0.5 shrink-0" />
              <span className="font-figtree font-medium text-[14px] text-[#1a1a2e] tracking-[0.5px] leading-[1.2]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

interface WhyCardProps {
  icon: string
  title: string
  description: string
}

function WhyCard({ icon, title, description }: WhyCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE } }}
      className="bg-white border border-[#f3f4f6] rounded-3xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center gap-6 flex-1"
    >
      <div className="bg-[rgba(233,30,99,0.1)] rounded-full w-16 h-16 flex items-center justify-center">
        <img src={icon} alt="" className="w-6 h-5" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-junge font-semibold text-[20px] text-[#1a1a2e] text-center leading-[28px]">
          {title}
        </h3>
        <p className="font-figtree text-[14px] text-[#4b5563] text-center leading-[1.5]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

interface StepProps {
  number: number
  title: string
  description: string
  active?: boolean
  onHover: () => void
  onLeave: () => void
}

function Step({ number, title, description, active = false, onHover, onLeave }: StepProps) {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col items-center w-[176px] cursor-pointer" onMouseEnter={onHover} onMouseLeave={onLeave}>
      {/* Number circle */}
      <div
        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
          active
            ? 'bg-[#e91e83] shadow-[0px_10px_15px_-3px_rgba(233,30,99,0.2),0px_4px_6px_-4px_rgba(233,30,99,0.2)]'
            : 'bg-white border-2 border-[rgba(233,30,99,0.2)]'
        }`}
      >
        <span
          className={`font-figtree font-bold text-[16px] transition-colors duration-300 ${
            active ? 'text-white' : 'text-[#e91e83]'
          }`}
        >
          {number}
        </span>
      </div>
      {/* Title & description */}
      <h3 className={`font-junge font-bold text-[18px] text-center leading-[28px] mb-3 transition-colors duration-300 ${
        active ? 'text-[#e91e83]' : 'text-[#1a1a2e]'
      }`}>
        {title}
      </h3>
      <p className="font-figtree text-[14px] text-[#4b5563] text-center leading-[20px]">
        {description}
      </p>
    </motion.div>
  )
}

const journeyStepsData = [
  { number: 1, title: 'Notice', description: 'Log how you feel easily and spot the initial signs.' },
  { number: 2, title: 'Learn', description: 'Upload labs for personalized education.' },
  { number: 3, title: 'Adapt', description: 'Get insights based on your data.' },
  { number: 4, title: 'Act', description: 'Follow guidance and watch your score rise.' },
  { number: 5, title: 'Optimize', description: 'Sustain energy, clarity, and well-being.' },
]

function JourneySteps() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-6">
      {journeyStepsData.map((step) => (
        <Step
          key={step.number}
          {...step}
          active={hoveredStep === null ? step.number === 1 : hoveredStep === step.number}
          onHover={() => setHoveredStep(step.number)}
          onLeave={() => setHoveredStep(null)}
        />
      ))}
    </div>
  )
}

// ── Wellness concerns data ──────────────────────────────────────────────────
const CONCERNS = [
  'Fatigue', 'Brain Fog', 'Stress Overload', 'Weight Resistance',
  'Sleep Issues', 'Mood Swings', 'Low Libido',
]

// ── Main page component ────────────────────────────────────────────────────

export default function HowItWorksPage() {
  const { openWaitlist } = useWaitlist()
  return (
    <>
      {/* ─── Section 1: Hero Header ─────────────────────────────────────── */}
      <section
        className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-4 md:px-8 py-20"
        style={{
          background: 'radial-gradient(ellipse 900px 800px at 70% 30%, rgba(233,30,99,0.08) 0%, rgba(233,30,99,0) 70%), linear-gradient(to bottom, #ffffff 0%, #fffdf9 100%)',
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[896px] mx-auto flex flex-col items-center gap-8 px-4 md:px-8"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-junge font-semibold text-[40px] md:text-[72px] text-[#1a1a2e] text-center leading-[1] md:leading-[72px] md:whitespace-nowrap"
          >
            How MyHormonz{' '}
            <em className="font-medium italic text-[#e91e63]">Works</em>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-figtree text-[18px] md:text-[20px] text-[#4b5563] text-center leading-[1.5] tracking-[0.5px] max-w-[672px]"
          >
            Track hormones, understand lab results, and receive insights based on
            your inputs—guided by science, research and AI.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 8px 20px -4px rgba(233,30,99,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={openWaitlist}
                className="bg-[#ca1670] text-white font-figtree font-semibold text-[16px] h-[54px] px-8 rounded-full shadow-[0px_10px_15px_-3px_rgba(233,30,99,0.3),0px_4px_6px_-4px_rgba(233,30,99,0.3)]"
              >
                Explore the App
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#1a1a2e] font-figtree font-semibold text-[16px] h-[54px] px-8 rounded-full border border-[#e5e7eb] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              >
                See Features
              </motion.button>
            </div>
            <p className="font-figtree text-[12px] text-[#4b5563] italic tracking-[0.5px] text-center">
              Disclaimer - Insights provided are educational and not medical advice.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Section 2: Know Yourself ───────────────────────────────────── */}
      <section className="bg-[#fffdf9] border-b border-[#f3f4f6] pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-[896px] mx-auto px-4 md:px-8 pt-16 flex flex-col items-center gap-4"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-junge font-semibold text-[26px] md:text-[30px] text-[#1a1a2e] text-center leading-[36px]"
          >
            Know your hormones. Know yourself.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-figtree text-[16px] text-[#4b5563] text-center leading-[26px] max-w-[672px]"
          >
            Your body communicates through how you feel. What feels like an isolated
            issue is often a vital clue to your hormone wellness patterns. We help
            you connect the dots.
          </motion.p>
        </motion.div>

        {/* Concerns ticker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <SectionLabel>Common wellness concerns we address</SectionLabel>
          <div className="w-full border-t border-b border-[rgba(233,30,99,0.1)] bg-[#fffdf9] py-4 overflow-hidden">
            <motion.div
              className="flex items-center gap-10 w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ x: { duration: 20, ease: 'linear', repeat: Infinity } }}
            >
              {/* Duplicate the list for seamless loop */}
              {[...CONCERNS, ...CONCERNS].map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className="font-figtree font-medium text-[16px] md:text-[18px] text-[#e91e63] whitespace-nowrap"
                >
                  • {c}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Section 3: Resources & Tools ───────────────────────────────── */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-4 mb-12 md:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Comprehensive Support</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-junge font-semibold text-[32px] md:text-[48px] text-[#1a1a2e] text-center leading-[1]"
            >
              Resources and Tools for Achieving Balance
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <FeatureCard
              icon={ICON_HORMONE}
              title="Hormone & Lab Intelligence"
              description="Stop guessing what your numbers mean. We translate complex data into clear 'wellness insights."
              items={['Lab Result Insights', 'Holistic Hormonal Wellness']}
            />
            <FeatureCard
              icon={ICON_METAB}
              title="Metabolism & Body Composition"
              description="Align your lifestyle with your hormones to support healthy, sustainable physical changes."
              items={[
                'Weight Loss Support',
                'Macro Tracking Guidance',
                'Cycle-Synced Performance',
                'Selfie-Based Body Fat Estimates',
              ]}
            />
            <FeatureCard
              icon={ICON_SLEEP}
              title="Stress & Sleep"
              description="Manage your cortisol and optimize recovery for vital hormonal repair."
              items={[
                'Cortisol Awareness Tools',
                'Nervous System Calming Techniques',
                'Deep Sleep Insights',
                'Recovery Optimization',
              ]}
            />
            <FeatureCard
              icon={ICON_BRAIN}
              title="Brain & Longevity"
              description="Clear the fog, find your emotional balance, and create a foundation for lasting vitality."
              items={[
                'Brain Clarity & Focus',
                'Mood Wellness',
                'Healthy Aging Strategies',
                'Sustained Vitality Practices',
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Section 4: Why This Matters ────────────────────────────────── */}
      <section className="bg-[#fffdf9] py-16 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-[768px] mx-auto px-4 md:px-8 flex flex-col items-center gap-6"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] text-center leading-[1]"
          >
            Why This Matters
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-figtree text-[16px] md:text-[18px] text-[#4b5563] text-center leading-[29px]"
          >
            For too long, people have been told their lab results are "normal" while
            still feeling terrible. We believe "normal" isn't the same as "optimal."
            MyHormonz empowers you to understand your labs better, bridging the gap
            between lab data and how you actually feel every day.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-junge font-bold text-[18px] md:text-[20px] text-[#e91e63] italic text-center leading-[28px]"
          >
            This is your path to Live Personally Optimized.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── Section 5: Journey to Optimization ─────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-4 mb-12 md:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>The Process</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-junge font-semibold text-[32px] md:text-[48px] text-[#1a1a2e] text-center leading-[1]"
            >
              Your journey to Optimization
            </motion.h2>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative"
          >
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-[#f3f4f6]" />

            <JourneySteps />
          </motion.div>
        </div>
      </section>

      {/* ─── Section 6: Why Choose Us ───────────────────────────────────── */}
      <section className="bg-[#fffdf9] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] text-center leading-[1] mb-12 md:mb-16"
          >
            Why Choose Us
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col md:flex-row gap-8"
          >
            <WhyCard
              icon={ICON_CLARITY}
              title="Clarity Over Complexity"
              description="We distill confusing complex terminology into plain language so you understand exactly your wellness data."
            />
            <WhyCard
              icon={ICON_BODY}
              title="Whole Body Perspective"
              description="We look at the interconnected web of your hormones, not just isolated numbers, for true holistic wellness."
            />
            <WhyCard
              icon={ICON_ACTION}
              title="Actionable, Not Overwhelming"
              description="Small, daily steps that fit into your life, designed to create massive shifts in how you feel over time."
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Section 7: Expert Guidance ─────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-[1216px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20"
        >
          {/* Photo */}
          <motion.div variants={scaleIn} className="relative flex-1 w-full max-w-[568px]">
            <div className="aspect-square rounded-[32px] overflow-hidden shadow-hero">
              <img
                src={DR_NISHA_HIW}
                alt="Dr. Nisha Woods"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Research Backed badge */}
            <div className="absolute -bottom-4 -right-4 md:-right-6 bg-white border border-[#f3f4f6] rounded-2xl px-4 py-3 shadow-hero flex items-center gap-3">
              <img src={ICON_RESEARCH} alt="" className="w-[22px] h-[21px]" />
              <span className="font-junge font-extrabold text-[18px] text-[#1a1a2e] whitespace-nowrap">
                Research Backed
              </span>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div variants={fadeInUp} className="flex-1 flex flex-col gap-8">
            <SectionLabel>Expert Guidance</SectionLabel>

            <h2 className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] leading-[1.2]">
              You're Not Alone With Your{' '}
              <em className="font-medium italic text-[#e91e63]">Labs</em>
              <span className="text-[#e91e63]">.</span>
            </h2>

            <div className="flex flex-col gap-6">
              <p className="font-figtree text-[16px] md:text-[18px] text-[#4b5563] leading-[29px]">
                Created by Dr. Nisha Jackson-Woods, Ph.D., NP, a nationally
                recognized hormone expert with over 35 years of clinical
                experience, MyHormonz brings science-backed insights directly to
                your phone.
              </p>
              <p className="font-figtree text-[16px] md:text-[18px] text-[#4b5563] leading-[29px]">
                Our mission is to eliminate the guesswork about what hormones do in
                the human body and how to work with your healthcare provider to get
                the most optimal levels and balance with all your hormones, brain,
                body and longevity.
              </p>
            </div>

            <div className="border-t border-[#f3f4f6] pt-4 flex flex-col">
              <span className="font-junge font-semibold text-[24px] text-[#1a1a2e] leading-[32px]">
                Dr. Nisha Jackson-Woods, Ph.D.
              </span>
              <span className="font-figtree font-medium text-[16px] text-[#6b7280] leading-[24px]">
                Founder
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

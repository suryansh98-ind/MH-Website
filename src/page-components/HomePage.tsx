'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn, VIEWPORT, EASE } from '../lib/animations'
import WaitlistForm from '../components/WaitlistForm'
import YoutubeEmbed from '../components/YoutubeEmbed'

const PhoneCarousel = dynamic(() => import('../components/PhoneCarousel'), { ssr: false })

// ── Asset URLs ──────────────────────────────────────────────────────────────
const ICON_HORMONE = '/assets/icon-hormone.svg'
const ICON_TRACK = '/assets/icon-track.svg'
const ICON_LAB = '/assets/icon-lab.svg'
const ICON_AI = '/assets/icon-ai.svg'
const ICON_LONGEVITY = '/assets/icon-longevity.svg'
const IMG_LAB_EQUIP = '/assets/lab-equipment.png'
const IMG_DR_NISHA = '/assets/dr-nisha-home.png'
const ICON_RESEARCH = '/assets/icon-research.svg'
const IMG_VIDEO = '/assets/video-bg.png'
const IMG_MINDFULNESS = '/assets/mindfulness.png'
const IMG_WELLNESS = '/assets/wellness.png'

// ── Reusable sub-components ─────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="font-figtree font-bold text-[12px] text-[#e91e63] tracking-[1.2px] uppercase">
      {children}
    </span>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE } }}
      className="bg-[#f9fafb] rounded-[32px] p-8 flex flex-col gap-6 flex-1 min-w-[220px]"
    >
      <div className="bg-[rgba(233,30,99,0.05)] rounded-2xl w-14 h-14 flex items-center justify-center">
        <img src={icon} alt="" className="w-[25px] h-[25px]" />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="font-junge font-semibold text-[20px] text-[#1a1a2e] leading-[28px]">
          {title}
        </h3>
        <p className="font-figtree text-[14px] text-[#4b5563] leading-[1.5] tracking-[0.5px]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

interface ProcessStepProps {
  number: number
  title: string
  description: string
  active?: boolean
  onHover: () => void
}

function ProcessStep({ number, title, description, active = false, onHover }: ProcessStepProps) {
  return (
    <div className="flex gap-8 items-start cursor-pointer" onMouseEnter={onHover}>
      <div
        className={`relative z-10 w-[37px] h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
          active
            ? 'bg-[#e91e83] shadow-[0px_10px_15px_-3px_rgba(233,30,99,0.2),0px_4px_6px_-4px_rgba(233,30,99,0.2)]'
            : 'bg-white border-2 border-[rgba(233,30,99,0.2)]'
        }`}
      >
        <span className={`font-figtree font-bold text-[16px] transition-colors duration-300 ${active ? 'text-white' : 'text-[#e91e83]'}`}>
          {number}
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-junge font-semibold text-[24px] text-[#1a1a2e] leading-[32px]">{title}</h3>
        <p className="font-figtree text-[16px] text-[#4b5563] leading-[1.5] tracking-[0.5px]">{description}</p>
      </div>
    </div>
  )
}

const processStepsData = [
  { number: 1, title: 'Notice', description: 'Track symptoms, lifestyle factors, and gather your lab data. Start seeing the patterns.' },
  { number: 2, title: 'Learn', description: 'Understand how your hormones influence your energy, mood, weight, and sleep.' },
  { number: 3, title: 'Adapt', description: 'Receive insights tailored to your unique hormonal profile to make informed changes.' },
  { number: 4, title: 'Act', description: 'Take informed steps backed by science to work directly with your own health care provider.' },
  { number: 5, title: 'Optimize', description: 'Sustain energy, clarity, and well-being over the long term.' },
]

function ProcessSteps() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  return (
    <div
      className="relative flex flex-col gap-10"
      onMouseLeave={() => setHoveredStep(null)}
    >
      {/* Vertical line */}
      <div className="absolute left-[18px] top-2 bottom-2 w-[2px] bg-[#f3f4f6]" />
      {processStepsData.map((step) => (
        <motion.div key={step.number} variants={fadeInUp}>
          <ProcessStep
            {...step}
            active={hoveredStep === null ? step.number === 1 : hoveredStep === step.number}
            onHover={() => setHoveredStep(step.number)}
          />
        </motion.div>
      ))}
    </div>
  )
}


// ── Main page component ────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ─── Section 1: Hero ──────────────────────────────────────────── */}
      <section
        className="min-h-[60vh] md:min-h-[70vh] flex items-center px-4 md:px-8 lg:px-20 pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 900px 800px at 70% 30%, rgba(233,30,99,0.06) 0%, rgba(233,30,99,0) 70%), linear-gradient(to bottom, #ffffff 0%, #fffdf9 100%)',
        }}
      >
        <div className="max-w-[1280px] mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 flex-1"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-[rgba(233,30,99,0.05)] border border-[rgba(233,30,99,0.1)] rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e91e63]" />
                <span className="font-figtree font-bold text-[12px] text-[#e91e63] tracking-[1.2px] uppercase">
                  Launching Late 2026
                </span>
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="font-junge font-semibold text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-[#1a1a2e] leading-[1.1] break-words"
            >
              Hormonal Intelligence{' '}
              <em className="font-medium italic text-[#e91e63]">on your phone for everyone.</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="font-figtree text-[18px] md:text-[20px] text-[#4b5563] leading-[1.5] tracking-[0.5px] max-w-[512px]"
            >
              Track and monitor individual hormones, and receive educational insights based on your inputs — guided by research, science, and functionally trained AI.
            </motion.p>

            {/* Waitlist Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-[#f3f4f6] rounded-3xl p-5 sm:p-6 md:p-8 w-full max-w-[575px] shadow-[0px_25px_50px_-12px_rgba(229,231,235,0.5)]"
            >
              <WaitlistForm variant="light" source="homepage-hero" />
            </motion.div>
          </motion.div>

          {/* Right — Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end lg:-mt-12 xl:-mt-16"
          >
            <div className="relative w-[300px] sm:w-[360px] md:w-[400px] lg:w-[440px] xl:w-[480px] lg:mr-8 xl:mr-12">
              {/* Phone blur glow */}
              <div className="absolute -inset-16 bg-[rgba(233,30,99,0.06)] rounded-full blur-[50px]" />
              <Image
                src="/assets/phone-hero.png"
                alt="Hormones app screen"
                width={1219}
                height={1500}
                priority
                sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, (max-width: 1024px) 400px, (max-width: 1280px) 440px, 480px"
                className="relative w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Features ──────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-20"
          >
            {/* Heading */}
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.h2
                variants={fadeInUp}
                className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] leading-[1.15] md:leading-[48px]"
              >
                Pocket-Sized Hormonal{'\n'}Intelligence
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="font-figtree text-[18px] md:text-[20px] text-[#4b5563] leading-[28px] tracking-[0.5px] max-w-[672px]"
              >
                A smarter, simpler way to understand your body — powered by research, science, and intelligent technology.
              </motion.p>
            </div>

            {/* Cards */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
            >
              <FeatureCard icon={ICON_HORMONE} title="Hormone Lab Insights" description="Upload your hormone labs and get each value explained in plain language." />
              <FeatureCard icon={ICON_TRACK} title="Track On The Go" description="Log how you feel and mood changes anywhere. Visualize trends." />
              <FeatureCard icon={ICON_AI} title="Nisha's AI Wellness Coach" description="Your AI assistant identifies patterns to support learning and maintaining levels." />
              <FeatureCard icon={ICON_LONGEVITY} title="Longevity Guidance" description="Daily tips on Weight, Mood, Sleep, Diet, Stress, and Wellness." />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 3: Sneak Peek ────────────────────────────────────── */}
      <section className="bg-[#fffdf9] py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-12"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div variants={fadeInUp}>
                <SectionLabel>Sneak Peek</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] text-center leading-[1]"
              >
                Designed for Clarity
              </motion.h2>
            </div>

            {/* Phone mockups — coverflow carousel on mobile, row on desktop */}
            <PhoneCarousel />
          </motion.div>
        </div>
      </section>

      {/* ─── Section 4: Research ───────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            {/* Left — Images */}
            <motion.div variants={fadeInLeft} className="flex-1 flex gap-4 relative">
              <div className="flex-1 pt-20">
                <div className="aspect-square rounded-3xl shadow-book overflow-hidden">
                  <Image src={IMG_LAB_EQUIP} alt="Lab equipment" width={512} height={512} sizes="(max-width: 1024px) 100vw, 500px" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-square rounded-3xl shadow-book overflow-hidden">
                  <Image src={IMG_DR_NISHA} alt="Dr. Nisha Jackson-Woods" width={368} height={552} sizes="(max-width: 1024px) 100vw, 500px" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Research Backed badge */}
              <div className="absolute bottom-14 right-0 md:right-[-12px] bg-white border border-[#f3f4f6] rounded-xl md:rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 flex items-center gap-1.5 sm:gap-2 md:gap-3 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <img src={ICON_RESEARCH} alt="" className="w-[14px] h-[13px] sm:w-[18px] sm:h-[17px] md:w-[22px] md:h-[21px]" />
                <span className="font-junge font-extrabold text-[12px] sm:text-[14px] md:text-[18px] text-[#1a1a2e] whitespace-nowrap">Research Backed</span>
              </div>
            </motion.div>

            {/* Right — Text */}
            <motion.div
              variants={staggerContainer}
              className="flex-1 flex flex-col gap-8"
            >
              <motion.div variants={fadeInUp}>
                <SectionLabel>Research Foundation</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] leading-[1.2] md:leading-[60px]"
              >
                You&apos;re not alone with your <em className="font-medium italic text-[#e91e63]">hormone labs.</em>
              </motion.h2>
              <motion.div variants={fadeInUp} className="flex flex-col gap-6">
                <p className="font-figtree text-[18px] text-[#4b5563] leading-[1.5] tracking-[0.5px]">
                  Lab reports can feel confusing, overwhelming, or contradictory—especially when symptoms don&apos;t seem to match the numbers.
                </p>
                <p className="font-figtree text-[18px] text-[#4b5563] leading-[1.5] tracking-[0.5px]">
                  &quot;MyHormonz&quot; helps you understand what steps you can take to move towards optimal balance, combining your hormones and lifestyle habits.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 5: Hormone Strategist ────────────────────────────── */}
      <section className="bg-[#ca1670] py-16 md:py-24">
        <div className="max-w-[1024px] mx-auto px-4 md:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-12"
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.h2
                variants={fadeInUp}
                className="font-junge font-semibold text-[36px] md:text-[48px] text-white leading-[1.15] md:leading-[48px]"
              >
                Meet Your Hormone Strategist
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="font-figtree text-[18px] md:text-[20px] text-white/80 leading-[1.5] tracking-[0.5px] max-w-[672px]"
              >
                Watch how this platform can educate you about hormones and personalizing your own path to optimal health.
              </motion.p>
            </div>
            {/* Embedded YouTube video */}
            <motion.div
              variants={scaleIn}
              className="relative w-full max-w-[831px] rounded-[40px] border-[3px] border-white overflow-hidden shadow-hero"
            >
              <YoutubeEmbed
                videoId="ag4fqJR9Xrc"
                title="Dr. Nisha Jackson-Woods video"
                className="aspect-video"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 6: Process ────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            {/* Left — Steps */}
            <motion.div variants={staggerContainer} className="flex-1 flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <motion.div variants={fadeInUp}>
                  <SectionLabel>The Process</SectionLabel>
                </motion.div>
                <motion.h2
                  variants={fadeInUp}
                  className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] leading-[1.15] md:leading-[48px]"
                >
                  Your Path to{'\n'}Hormonal Harmony
                </motion.h2>
              </div>
              <ProcessSteps />
            </motion.div>

            {/* Right — Images */}
            <motion.div
              variants={fadeInRight}
              className="flex-1 flex gap-4 justify-center"
            >
              <div className="flex-1 max-w-[276px] pt-6 md:pt-12">
                <div className="aspect-[276/400] rounded-3xl shadow-hero overflow-hidden">
                  <Image src={IMG_MINDFULNESS} alt="Mindfulness" width={541} height={812} sizes="(max-width: 1024px) 50vw, 276px" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 max-w-[276px]">
                <div className="aspect-[276/400] rounded-3xl shadow-hero overflow-hidden">
                  <Image src={IMG_WELLNESS} alt="Wellness" width={521} height={811} sizes="(max-width: 1024px) 50vw, 276px" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 7: CTA ───────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-8 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE }}
            className="bg-[#1a1a2e] rounded-[48px] p-8 md:p-12 flex flex-col lg:flex-row items-stretch gap-12 overflow-hidden relative min-h-[460px]"
          >
            {/* Right — couple photo (transparent PNG sits crisply on the navy bg) */}
            <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[50%]">
              <Image
                src="/assets/cta-illustration.png"
                alt="Couple smiling and playing music together"
                fill
                sizes="(max-width: 1280px) 50vw, 600px"
                className="object-contain object-bottom"
              />
            </div>

            {/* Pink blur overlay — sits over the image area */}
            <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-[rgba(233,30,99,0.1)] blur-[50px] pointer-events-none" />

            {/* Left content */}
            <div className="flex-1 flex flex-col gap-8 relative z-10 lg:max-w-[55%]">
              <h2 className="font-junge font-semibold text-[32px] sm:text-[40px] md:text-[60px] text-white leading-[1.2]">
                Secure Your Early Access{' '}
                <em className="font-medium italic text-[#e91e63]">Before We Launch.</em>
              </h2>
              <p className="font-figtree text-[18px] text-white/70 leading-[1.5] tracking-[0.5px] max-w-[512px]">
                Join the MyHormonz waitlist now. Founding waitlist members get their first month free when we go live in late 2026.
              </p>
              <div className="max-w-[480px]">
                <WaitlistForm variant="dark" compact source="homepage-cta" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 8: Stats ─────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#f3f4f6] py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
          >
            {[
              { value: '2,000+', label: 'Early Supporters' },
              { value: 'Late 2026', label: 'Target Launch' },
              { value: '35+ Years', label: 'of Clinical Experience' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <span className="font-junge font-semibold text-[36px] md:text-[48px] text-[#e91e63] leading-[48px]">
                  {stat.value}
                </span>
                <span className="font-figtree font-medium text-[12px] text-[#6b7280] tracking-[1.2px] uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

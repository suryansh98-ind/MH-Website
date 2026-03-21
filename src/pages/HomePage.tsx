import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn, VIEWPORT, EASE } from '../lib/animations'
import WaitlistForm from '../components/WaitlistForm'

// ── Asset URLs ──────────────────────────────────────────────────────────────
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
  onLeave: () => void
}

function ProcessStep({ number, title, description, active = false, onHover, onLeave }: ProcessStepProps) {
  return (
    <div className="flex gap-8 items-start cursor-pointer" onMouseEnter={onHover} onMouseLeave={onLeave}>
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
]

function ProcessSteps() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  return (
    <div className="relative flex flex-col gap-10">
      {/* Vertical line */}
      <div className="absolute left-[18px] top-2 bottom-2 w-[2px] bg-[#f3f4f6]" />
      {processStepsData.map((step) => (
        <motion.div key={step.number} variants={fadeInUp}>
          <ProcessStep
            {...step}
            active={hoveredStep === null ? step.number === 1 : hoveredStep === step.number}
            onHover={() => setHoveredStep(step.number)}
            onLeave={() => setHoveredStep(null)}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ── Phone Coverflow Carousel (mobile) ──────────────────────────────────────

const phones = [
  { src: '/assets/phone-track-mood.png', alt: 'Track Mood screen', label: 'Track Mood', accent: false },
  { src: '/assets/phone-upload-lab.png', alt: 'Upload Lab Reports screen', label: 'Upload Lab Reports', accent: true },
  { src: '/assets/phone-get-insights.png', alt: 'Get Insights screen', label: 'Get Insights', accent: false },
]

function PhoneCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scales, setScales] = useState([0.78, 1, 0.78]) // initial: center is active
  const isMobile = useIsMobile()

  const updateScales = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const containerCenter = el.scrollLeft + el.offsetWidth / 2
    const newScales: number[] = []

    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const distance = Math.abs(containerCenter - childCenter)
      // Normalize: 0 at center, 1 when one full item width away
      const ratio = Math.min(distance / child.offsetWidth, 1)
      // Scale: 1.0 at center → 0.78 at edges (22% reduction)
      const scale = 1 - ratio * 0.22
      newScales.push(Math.round(scale * 1000) / 1000)
    }
    setScales(newScales)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || !isMobile) return

    // Scroll to center phone on mount
    const centerChild = el.children[1] as HTMLElement
    if (centerChild) {
      const scrollTarget = centerChild.offsetLeft - (el.offsetWidth / 2) + (centerChild.offsetWidth / 2)
      el.scrollLeft = scrollTarget
    }

    updateScales()
    el.addEventListener('scroll', updateScales, { passive: true })
    return () => el.removeEventListener('scroll', updateScales)
  }, [isMobile, updateScales])

  // Desktop: simple row layout (unchanged from original design)
  if (!isMobile) {
    return (
      <div className="w-full flex items-end gap-12 justify-center">
        <motion.div variants={fadeInLeft} whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }} className="flex flex-col items-center gap-0 cursor-pointer">
          <div className="w-[280px]">
            <img src="/assets/phone-track-mood.png" alt="Track Mood screen" className="w-full h-auto" />
          </div>
          <p className="font-junge italic text-[16px] text-[#4b5563]">Track Mood</p>
        </motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }} className="flex flex-col items-center gap-0 -mb-8 cursor-pointer">
          <div className="w-[320px]">
            <img src="/assets/phone-upload-lab.png" alt="Upload Lab Reports screen" className="w-full h-auto" />
          </div>
          <p className="font-junge italic text-[16px] text-[#e91e63] font-semibold">Upload Lab Reports</p>
        </motion.div>
        <motion.div variants={fadeInRight} whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }} className="flex flex-col items-center gap-0 cursor-pointer">
          <div className="w-[280px]">
            <img src="/assets/phone-get-insights.png" alt="Get Insights screen" className="w-full h-auto" />
          </div>
          <p className="font-junge italic text-[16px] text-[#4b5563]">Get Insights</p>
        </motion.div>
      </div>
    )
  }

  // Mobile: coverflow carousel
  // Container uses real paddingInline so side phones physically peek from edges.
  // Item width 200px → at scale 0.78 the visual width is ~156px, leaving ~45px visible on each side.
  return (
    <div
      ref={scrollRef}
      className="w-full flex items-end overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
      style={{ paddingInline: 'calc(50% - 100px)', gap: '0px' }}
    >
      {phones.map((phone, i) => (
        <div
          key={phone.label}
          className="shrink-0 snap-center flex flex-col items-center"
          style={{
            width: '200px',
            transform: `scale(${scales[i] ?? 0.78})`,
            transition: 'transform 0.2s ease-out',
            transformOrigin: 'bottom center',
          }}
        >
          <img src={phone.src} alt={phone.alt} className="w-full h-auto" />
          <p className={`font-junge italic text-[14px] mt-1 ${phone.accent ? 'text-[#e91e63] font-semibold' : 'text-[#4b5563]'}`}>
            {phone.label}
          </p>
        </div>
      ))}
    </div>
  )
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

// ── Main page component ────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ─── Section 1: Hero ──────────────────────────────────────────── */}
      <section
        className="min-h-[60vh] md:min-h-[70vh] flex items-center px-4 md:px-8 lg:px-20 py-16 md:py-24 overflow-hidden"
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
            className="flex flex-col gap-8 flex-1"
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
              className="font-junge font-semibold text-[36px] sm:text-[48px] md:text-[72px] text-[#1a1a2e] leading-[1.1]"
            >
              Hormonal{'\n'}Intelligence{' '}
              <em className="font-medium italic text-[#e91e63]">on your phone.</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="font-figtree text-[18px] md:text-[20px] text-[#4b5563] leading-[1.5] tracking-[0.5px] max-w-[512px]"
            >
              Track and highlight individual hormones, receive educational insights based on your inputs - guided by research, science, and functional trained AI.
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
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px]">
              {/* Phone blur glow */}
              <div className="absolute -inset-16 bg-[rgba(233,30,99,0.06)] rounded-full blur-[50px]" />
              <img
                src="/assets/phone-hero.png"
                alt="Hormones app screen"
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
                A smarter, simpler way to understand your body—powered by research & science and intelligent technology.
              </motion.p>
            </div>

            {/* Cards */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
            >
              <FeatureCard icon={ICON_TRACK} title="Track On The Go" description="Log how you feel and mood changes anywhere. Visualize trends." />
              <FeatureCard icon={ICON_LAB} title="Lab Report Insights" description="Upload lab results for clear, friendly explanations." />
              <FeatureCard icon={ICON_AI} title="AI Coach" description="Your AI assistant identifies patterns to support learning and maintaining levels." />
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
                  <img src={IMG_LAB_EQUIP} alt="Lab equipment" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-square rounded-3xl shadow-book overflow-hidden">
                  <img src={IMG_DR_NISHA} alt="Dr. Nisha Woods" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Research Backed badge */}
              <div className="absolute bottom-14 right-0 md:right-[-12px] bg-white border border-[#f3f4f6] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <img src={ICON_RESEARCH} alt="" className="w-[22px] h-[21px]" />
                <span className="font-junge font-extrabold text-[18px] text-[#1a1a2e]">Research Backed</span>
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
                You&apos;re not alone with your <em className="font-medium italic text-[#e91e63]">labs.</em>
              </motion.h2>
              <motion.div variants={fadeInUp} className="flex flex-col gap-6">
                <p className="font-figtree text-[18px] text-[#4b5563] leading-[1.5] tracking-[0.5px]">
                  Lab reports can feel confusing, overwhelming, or contradictory—especially when symptoms don&apos;t seem to match the numbers.
                </p>
                <p className="font-figtree text-[18px] text-[#4b5563] leading-[1.5] tracking-[0.5px]">
                  &quot;MyHormonz&quot; helps you in what steps you can take to move towards optimal balance combining your hormones and lifestyle habits
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
            {/* Video thumbnail */}
            <motion.div
              variants={scaleIn}
              className="relative w-full max-w-[831px] rounded-[40px] border-[3px] border-white overflow-hidden shadow-hero"
            >
              <img src={IMG_VIDEO} alt="Dr. Nisha Woods video" className="w-full aspect-[831/563] object-cover" />
              {/* Play button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 m-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="ml-0.5">
                  <path d="M4 2L14 8L4 14V2Z" fill="#e91e83" />
                </svg>
              </motion.button>
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
                  <img src={IMG_MINDFULNESS} alt="Mindfulness" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 max-w-[276px]">
                <div className="aspect-[276/400] rounded-3xl shadow-hero overflow-hidden">
                  <img src={IMG_WELLNESS} alt="Wellness" className="w-full h-full object-cover" />
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
            className="bg-[#1a1a2e] rounded-[48px] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative"
          >
            {/* Pink blur overlay */}
            <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-[rgba(233,30,99,0.1)] blur-[50px]" />

            {/* Left content */}
            <div className="flex-1 flex flex-col gap-8 relative z-10">
              <h2 className="font-junge font-semibold text-[32px] sm:text-[40px] md:text-[60px] text-white leading-[1.2]">
                Secure Your Early Access{' '}
                <em className="font-medium italic text-[#e91e63]">Before We Launch.</em>
              </h2>
              <p className="font-figtree text-[18px] text-white/70 leading-[1.5] tracking-[0.5px] max-w-[512px]">
                Join the MyHormonz waitlist now. First 1000 people get first month free!! access when we go live late 2026.
              </p>
              <div className="max-w-[480px]">
                <WaitlistForm variant="dark" compact source="homepage-cta" />
              </div>
            </div>

            {/* Right — Illustration */}
            <div className="flex-1 relative z-10 hidden lg:flex items-center justify-center">
              <img
                src="/assets/cta-illustration.png"
                alt="Woman interacting with phone app"
                className="w-full max-w-[488px] h-auto object-contain"
              />
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
              { value: '2,000+', label: 'Waitlist Members' },
              { value: 'Late 2026', label: 'Target Launch' },
              { value: '3 Months', label: 'Free for Founders' },
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

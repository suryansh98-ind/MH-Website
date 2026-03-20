import { motion } from 'framer-motion'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn, VIEWPORT, EASE } from '../lib/animations'

// ── Asset URLs ──────────────────────────────────────────────────────────────
const USER_1 = 'http://localhost:3845/assets/42570059d606c38751f68f99d1df63333eaaa965.png'
const USER_2 = 'http://localhost:3845/assets/894646cf76171116304d4cf79ca695c96fcecceb.png'
const USER_3 = 'http://localhost:3845/assets/4728dfae7561989cd6a44e8e17cba16e5bfa0a39.png'
const ICON_TRACK = 'http://localhost:3845/assets/d2fdea4f88a6473a73e01b0cea1927d99bdd7d2b.svg'
const ICON_LAB = 'http://localhost:3845/assets/a419804230dbc617033168517196e08777506d1e.svg'
const ICON_AI = 'http://localhost:3845/assets/a9dd1ee1abf682ad58057fc7381477c5f53a1933.svg'
const ICON_LONGEVITY = 'http://localhost:3845/assets/9d91dbff513d21e47fa8ce9ae2f136a5e94506b2.svg'
const IMG_LAB_EQUIP = 'http://localhost:3845/assets/3d21cd9cb23b21472fb46e90ca034c0fe93f826e.png'
const IMG_DR_NISHA = 'http://localhost:3845/assets/89c822e2dacaed9d22747c63a09aa3f3aec91d38.png'
const ICON_RESEARCH = 'http://localhost:3845/assets/df711f1c0bcc6f359396e5da54dfde29bd10158c.svg'
const IMG_VIDEO = 'http://localhost:3845/assets/753e2faa2d96d24f409861139db0aaea56f0db5d.png'
const IMG_MINDFULNESS = 'http://localhost:3845/assets/53bd70f748238279ac846712590e782a9e5609af.png'
const IMG_WELLNESS = 'http://localhost:3845/assets/ecc3fe659d5c8b895c1ce38955ceca37af341a35.png'

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
  filled?: boolean
}

function ProcessStep({ number, title, description, filled = false }: ProcessStepProps) {
  return (
    <div className="flex gap-8 items-start">
      <div
        className={`relative z-10 w-[37px] h-12 rounded-full flex items-center justify-center shrink-0 ${
          filled
            ? 'bg-[#e91e63] shadow-[0px_10px_15px_-3px_rgba(233,30,99,0.2),0px_4px_6px_-4px_rgba(233,30,99,0.2)]'
            : 'bg-white border-2 border-[rgba(233,30,99,0.2)]'
        }`}
      >
        <span className={`font-figtree font-bold text-[16px] ${filled ? 'text-white' : 'text-[#e91e63]'}`}>
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

// ── Main page component ────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ─── Section 1: Hero ──────────────────────────────────────────── */}
      <section
        className="min-h-[60vh] md:min-h-[70vh] flex items-center px-4 md:px-8 lg:px-20 py-16 md:py-24"
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
              className="font-junge font-semibold text-[48px] md:text-[72px] text-[#1a1a2e] leading-[1.1]"
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
              className="bg-white border border-[#f3f4f6] rounded-3xl p-8 flex flex-col gap-2 w-[575px] max-w-full shadow-[0px_25px_50px_-12px_rgba(229,231,235,0.5)]"
            >
              <h3 className="font-figtree font-semibold text-[20px] text-[#1a1a2e]">Join the Waitlist</h3>
              <p className="font-figtree text-[16px] text-[#6b7280] tracking-[0.5px]">
                First 1000 people get <span className="font-semibold text-[#e91e63]">1st month free!!</span>
              </p>
              <div className="flex gap-3 pt-4">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 bg-[#f9fafb] border border-[#e5e7eb] rounded-full h-[54px] px-5 font-figtree text-[16px] text-[#6b7280] outline-none focus:border-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 20px -4px rgba(233,30,99,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#ca1670] text-white font-figtree font-semibold text-[16px] h-[54px] px-6 rounded-full shadow-[0px_10px_15px_-3px_rgba(233,30,99,0.3),0px_4px_6px_-4px_rgba(233,30,99,0.3)] whitespace-nowrap"
                >
                  Get Early Access
                </motion.button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  <img src={USER_1} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                  <img src={USER_2} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                  <img src={USER_3} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                </div>
                <span className="font-figtree font-medium text-[14px] text-[#4b5563]">Join 2,000+ others</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-[420px]">
              {/* Phone blur glow */}
              <div className="absolute -inset-16 bg-[rgba(233,30,99,0.06)] rounded-full blur-[50px]" />
              <img
                src="/assets/phone-hero.png"
                alt="Hormones app screen"
                className="relative w-[420px] h-auto object-contain"
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
                className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] leading-[48px]"
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

            {/* Phone mockups */}
            <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-12">
              {/* Phone 1 — Track Mood */}
              <motion.div variants={fadeInLeft} className="flex flex-col items-center gap-0">
                <div className="relative w-[280px]">
                  <span className="absolute -top-2 -right-2 bg-[#e91e63] text-white font-figtree font-semibold text-[10px] px-3 py-1 rounded-md z-10">Preview</span>
                  <img src="/assets/phone-track-mood.png" alt="Track Mood screen" className="w-full h-auto" />
                </div>
                <p className="font-junge italic text-[16px] text-[#4b5563]">Track Mood</p>
              </motion.div>

              {/* Phone 2 — Upload Lab Reports (taller, center) */}
              <motion.div variants={fadeInUp} className="flex flex-col items-center gap-0 md:-mb-8">
                <div className="relative w-[320px]">
                  <span className="absolute -top-2 -right-2 bg-[#e91e63] text-white font-figtree font-semibold text-[10px] px-3 py-1 rounded-md z-10">Preview</span>
                  <img src="/assets/phone-upload-lab.png" alt="Upload Lab Reports screen" className="w-full h-auto" />
                </div>
                <p className="font-junge italic text-[16px] text-[#e91e63] font-semibold">Upload Lab Reports</p>
              </motion.div>

              {/* Phone 3 — Get Insights */}
              <motion.div variants={fadeInRight} className="flex flex-col items-center gap-0">
                <div className="relative w-[280px]">
                  <span className="absolute -top-2 -right-2 bg-[#e91e63] text-white font-figtree font-semibold text-[10px] px-3 py-1 rounded-md z-10">Preview</span>
                  <img src="/assets/phone-get-insights.png" alt="Get Insights screen" className="w-full h-auto" />
                </div>
                <p className="font-junge italic text-[16px] text-[#4b5563]">Get Insights</p>
              </motion.div>
            </div>
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
              <div className="absolute bottom-14 right-[-12px] bg-white border border-[#f3f4f6] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
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
                className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] leading-[60px]"
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
                className="font-junge font-semibold text-[36px] md:text-[48px] text-white leading-[48px]"
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 m-auto w-12 h-12 bg-white/10 border border-[#f8b9d9] rounded-xl flex items-center justify-center backdrop-blur-sm"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 2L14 8L4 14V2Z" fill="white" />
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
                  className="font-junge font-semibold text-[36px] md:text-[48px] text-[#1a1a2e] leading-[48px]"
                >
                  Your Path to{'\n'}Hormonal Harmony
                </motion.h2>
              </div>
              <div className="relative flex flex-col gap-10">
                {/* Vertical line */}
                <div className="absolute left-[18px] top-2 bottom-2 w-[2px] bg-[#f3f4f6]" />
                <motion.div variants={fadeInUp}>
                  <ProcessStep number={1} title="Notice" description="Track symptoms, lifestyle factors, and gather your lab data. Start seeing the patterns." filled />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ProcessStep number={2} title="Learn" description="Understand how your hormones influence your energy, mood, weight, and sleep." />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ProcessStep number={3} title="Adapt" description="Receive insights tailored to your unique hormonal profile to make informed changes." />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ProcessStep number={4} title="Act" description="Take informed steps backed by science to work directly with your own health care provider." />
                </motion.div>
              </div>
            </motion.div>

            {/* Right — Images */}
            <motion.div
              variants={fadeInRight}
              className="flex-1 flex gap-4 justify-center"
            >
              <div className="flex-1 max-w-[276px] pt-12">
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
              <h2 className="font-junge font-semibold text-[40px] md:text-[60px] text-white leading-[1.2]">
                Secure Your Early Access{' '}
                <em className="font-medium italic text-[#e91e63]">Before We Launch.</em>
              </h2>
              <p className="font-figtree text-[18px] text-white/70 leading-[1.5] tracking-[0.5px] max-w-[512px]">
                Join the MyHormonz waitlist now. First 1000 people get first month free!! access when we go live late 2026.
              </p>
              <div className="flex gap-4 max-w-[480px]">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full h-[58px] px-6 font-figtree text-[16px] text-white/40 placeholder:text-white/40 outline-none focus:border-white/40"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#e91e63] text-white font-figtree font-semibold text-[16px] h-[58px] px-8 rounded-full shadow-[0px_20px_25px_-5px_rgba(233,30,99,0.4),0px_8px_10px_-6px_rgba(233,30,99,0.4)]"
                >
                  Join Waitlist
                </motion.button>
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

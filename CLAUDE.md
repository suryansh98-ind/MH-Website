# MyHormonz Website — CLAUDE.md

## Project Overview
Multi-page marketing website for **MyHormonz**, featuring **Dr. Nisha Jackson-Woods, Ph.D.** Built from Figma designs with four routes: Home, About, How It Works, and Privacy Policy. Migrated from Vite + React Router to **Next.js 14 (App Router)** for improved SEO and static prerendering. Live on Vercel from the `main` branch (push to `main` = auto-deploy to production).

## Name Convention
**Sitewide standard:** "Dr. Nisha Jackson-Woods, Ph.D." for formal mentions, image alts, attributions, and metadata. Body text after the first mention may use "Dr. Jackson-Woods" or "she." Navbar uses "About Nisha" (casual first-name label is intentional).

## Tech Stack
- **Next.js 14** (App Router) — SSG/SSR, file-based routing, per-page metadata
- **React 18** + **TypeScript** — component framework
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion 11** — micro-animations
- **`next/font/google`** — Figtree & Playfair Display (replaces Google Fonts `<link>` tags)

## Dev Commands

Node is managed via **nvm**. Always prepend the node bin path before running npm commands.

```bash
# Start dev server
export PATH="/Users/suryanshthakur/.nvm/versions/node/v20.20.0/bin:$PATH"
cd "/Users/suryanshthakur/MH website"
npm run dev          # http://localhost:3000

# Production build
npm run build        # next build

# Preview production build
npm run start        # next start (port 3000)
```

## Project Structure

```
app/
  layout.tsx                  # Root layout — fonts, providers, Navbar, Footer, modals
  page.tsx                    # Route: / — exports metadata, renders <HomePageClient />
  about/
    page.tsx                  # Route: /about — exports metadata, renders <AboutPageClient />
  how-it-works/
    page.tsx                  # Route: /how-it-works — exports metadata, renders <HowItWorksPageClient />
  privacy-policy/
    page.tsx                  # Route: /privacy-policy — exports metadata, renders <PrivacyPolicyPageClient />

src/
  page-components/
    HomePage.tsx              # 'use client' — landing page (hero, features, sneak peek, CTA)
    AboutPage.tsx             # 'use client' — about Dr. Nisha Jackson-Woods (bio, publications, mission)
    HowItWorksPage.tsx        # 'use client' — 7 sections explaining the app
    PrivacyPolicyPage.tsx     # 'use client' — full privacy policy + US Consumer Health Data Notice
  components/
    Navbar.tsx                # 'use client' — sticky glassmorphism navbar, next/link
    Footer.tsx                # 'use client' — 4-column footer, next/link
    WaitlistForm.tsx          # 'use client' — inline email form (light/dark variants)
    WaitlistModal.tsx         # 'use client' — popup dialog via WaitlistContext
    PhoneCarousel.tsx         # 'use client' — horizontal carousel (8 phones), shared mobile/desktop
    CookieConsent.tsx         # 'use client' — slide-up banner (Accept/Reject)
    YoutubeEmbed.tsx          # 'use client' — iframe gated by cookie consent
    HeroSection.tsx           # About page: Dr. Nisha portrait + bio
    PioneerSection.tsx        # About page: 3-col functional medicine story
    QuoteSection.tsx          # About page: large centred pink quote
    FounderSection.tsx        # About page: OnePeak Medical pink band
    EducatorSection.tsx       # 'use client' — icon list + YoutubeEmbed
    PublishedWorksSection.tsx # About page: three books (centre one featured)
    BeyondClinicSection.tsx   # About page: image grid + lifestyle text
    MissionSection.tsx        # About page: full-width pink CTA
  contexts/
    WaitlistContext.tsx       # Global open/close state for WaitlistModal
    CookieConsentContext.tsx  # Global Accept/Reject cookie preference (localStorage)
  lib/
    animations.ts             # Shared Framer Motion variants & constants
    waitlist.ts               # Google Sheets waitlist submission helper
public/
  assets/                     # PNGs + SVGs (phone mockups, portraits, icons, book covers,
                              # lifestyle photos, social icons, etc.)
```

## Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | `HomePage` | Landing page with hero, features, sneak peek, 5-step Process, CTA, stats |
| `/about` | `AboutPage` | About Dr. Nisha Jackson-Woods — bio, publications, mission |
| `/how-it-works` | `HowItWorksPage` | How the app works — 7 sections |
| `/privacy-policy` | `PrivacyPolicyPage` | Full privacy policy + US Consumer Health Data Notice appendix |

- `app/layout.tsx` renders Navbar, Footer, WaitlistModal, and CookieConsent on every page
- Page files in `app/` are **server components** — they export `metadata` and render a `'use client'` page component
- Internal links use `next/link` `<Link href="...">` — never `<a href>` for internal routes
- `usePathname()` from `next/navigation` used in Navbar for active link detection (replaces `useLocation`)
- `WaitlistModal` is mounted once in `app/layout.tsx` and opened globally via `useWaitlist()` from `WaitlistContext`
- "View Publications" button on About page scrolls to `#publications` anchor

## `'use client'` Rules (Next.js App Router)

- All interactive components, context consumers, and anything using hooks (`useState`, `useEffect`, etc.) must have `'use client'` at the top
- `app/layout.tsx` wraps everything in `CookieConsentProvider` and `WaitlistProvider`
- `PhoneCarousel` is imported with `next/dynamic({ ssr: false })` to avoid hydration mismatches caused by its `window.matchMedia` logic

## Cookie Consent

- `CookieConsentContext` (`src/contexts/CookieConsentContext.tsx`) manages `consent: 'accepted' | 'rejected' | null`
- Initialized to `null` on server; reads `localStorage` in `useEffect` — **never** in `useState` initialiser (avoids SSR crash)
- Persisted under the key `mh_cookie_consent` in `localStorage`
- `CookieConsent` component slides up after 1.5 s if no prior preference
- `YoutubeEmbed` checks consent:
  - `accepted` → renders `<iframe>`
  - `rejected` or `null` → renders a pink placeholder with "Accept cookies & watch" button and "Watch on YouTube ↗" fallback

## Design Tokens

| Token | Value |
|-------|-------|
| Primary pink | `#ca1670` |
| Accent pink | `#e91e63` |
| Primary hover | `#b01460` |
| Primary muted (10%) | `rgba(202,22,112,0.1)` |
| Primary light bg | `#fde9f3` |
| Dark heading text | `#1a1a2e` |
| Dark body text | `#1f2937` |
| Muted text | `#6b7280` |
| Secondary muted | `#4b5563` |
| Surface light | `#fafafa` |
| Warm background | `#fffdf9` |
| Card background | `#f9fafb` |
| Border | `#e5e7eb` |

## Typography
- **Playfair Display** (serif, via `next/font/google`) — used as the `junge` font family alias for headings, quotes, logo
- **Figtree** (sans-serif, via `next/font/google`) — body, labels, buttons
- Fonts are loaded in `app/layout.tsx` as CSS variables (`--font-playfair`, `--font-figtree`) and mapped in `tailwind.config.js`
- Do **not** add Google Fonts `<link>` tags to `index.html` — use `next/font` only
- Label style: uppercase, `tracking-[1.2px]` or `tracking-[2.4px]`, `text-[12px]`, bold, pink

## Animation System (`src/lib/animations.ts`)

All animation variants live here. Import from this file — do not define one-off variants inline.

```ts
fadeInUp       // opacity 0→1, y 32→0
fadeInLeft     // opacity 0→1, x -48→0
fadeInRight    // opacity 0→1, x 48→0
scaleIn        // opacity 0→1, scale 0.92→1
staggerContainer  // stagger 120ms between children
staggerFast       // stagger 80ms between children
VIEWPORT       // { once: true, amount: 0.18 } — standard viewport config
EASE           // [0.22, 1, 0.36, 1] — custom cubic-bezier
```

**Pattern for scroll-triggered sections:**
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={VIEWPORT}
>
  <motion.p variants={fadeInUp}>...</motion.p>
</motion.div>
```

## Hover Step Interactions

Both the **"The Process"** section (`HomePage` → `ProcessSteps`) and the **"Your Journey to Optimization"** section (`HowItWorksPage` → `JourneySteps`) show numbered steps that highlight on hover.

**Pattern:** `onMouseLeave` (which resets `hoveredStep` to `null`) lives on the **container div**, not on individual steps. This prevents a flicker to the default (step 1) state when the cursor moves through the gap between steps.

```tsx
// ✅ Correct — reset only when leaving the entire group
<div onMouseLeave={() => setHoveredStep(null)}>
  {steps.map(step => <Step onMouseEnter={() => setHoveredStep(step.number)} />)}
</div>

// ❌ Wrong — resets between every step causing 1→2→1→3→1→4 flicker
<Step onMouseLeave={() => setHoveredStep(null)} />
```

## Image Assets
- **Static assets** (phone mockups, illustrations, icons, photos): Stored in `public/assets/` and referenced via `/assets/filename.png` (or `.svg`).
- **Phone mockups**: All must use **iPhone 15/16 aspect ratio (~0.508, ~946×1864 source)**. Use `sips -Z <max-dim>` (not `sips -z H W`) to preserve aspect when resizing — forcing different dimensions distorts the screen.
- **Figma MCP assets** (if re-fetching): File key `XmwoM03rktuP9LrowfejYM`, Node ID `4184:14901`. URLs expire after 7 days.
- **Video embeds**: `EducatorSection` and the HomePage video block use `<YoutubeEmbed videoId="ag4fqJR9Xrc" />` — gated by cookie consent.
- **Favicon / app icons**: Next.js auto-detects icon files placed directly in `app/`:
  - `app/icon.png` (512×512) — browser tab favicon
  - `app/apple-icon.png` (180×180) — iOS home-screen icon
  Do **not** add manual `<link rel="icon">` tags in `layout.tsx` — Next.js generates them automatically. To replace, drop new files at these exact paths and rebuild.

## SEO / Social
- **OG image**: `public/og-image.jpg` (1200×630, JPEG ≤ 600 KB so WhatsApp accepts it). Referenced from `openGraph.images` and `twitter.images` in `app/layout.tsx`.
- **Title length target**: 50–60 chars. **Description length target**: 110–160 chars. Below those, opengraph.xyz flags as suboptimal.
- **Sitemap**: `app/sitemap.ts` — Next.js generates `/sitemap.xml` from this. Add new routes here.
- **Robots**: `app/robots.ts` — generates `/robots.txt`. Allows all, points to sitemap, disallows `/api/` and `/_next/`.
- **Base URL** (used in `sitemap.ts` and `robots.ts`): `https://myhormonz.com`. Update if the domain changes.
- **Vercel config**: `vercel.json` sets `framework: "nextjs"` so Vercel always uses the Next.js preset (avoids the old Vite leftover settings interfering).

## PhoneCarousel (`src/components/PhoneCarousel.tsx`)
Used on the homepage sneak peek section to showcase **8 app screens** in a horizontal scrolling carousel.

- **Layout**: shared between mobile and desktop — both use `overflow-x-auto snap-x snap-mandatory` so users can swipe/scroll. Desktop gets prev/next arrow buttons (◀ / ▶); mobile gets touch swipe only.
- **Active state**: the phone closest to viewport center is the "active" one. Active phone scales up (1.1× desktop / 1.15× mobile) with a 0.45s cubic-bezier transition. All others stay at scale 1.0. The active phone's label also flips to pink + semibold (`text-[#e91e63] font-semibold`) with a 0.3s color transition.
- **Centered binary scaling**: scaling is binary, not a gradient — only ONE phone (closest to center) scales up at a time. Implemented via `closestIndex` in `updateScales`.
- **Fade mask edges**: `mask-image: linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)` on the scroll container fades phones into the background at the left/right edges instead of hard-clipping. Both `maskImage` and `WebkitMaskImage` are required.
- **Top padding** (`pt-16`) on the scroll container reserves room for the scaled-up phone to grow upward without being clipped.
- **Arrow scroll step**: one phone per click — `el.scrollBy({ left: phoneWidth + gap })`. Don't multiply.
- **No hover effect**: phone wrappers are plain `<div>` (not `<motion.div>` with `whileHover`) — hover lift conflicts with the "centered = active" mental model.
- **Phones array**: in render order, with file paths and labels. The middle/featured phone is not hard-coded; whichever is centered gets the active style.

## Waitlist
- Form component: `WaitlistForm` accepts `variant="light" | "dark"`, optional `compact` boolean, and a `source` string (e.g. `"homepage-hero"`) for attribution.
- Submissions go to a Google Sheets Web App endpoint via `src/lib/waitlist.ts`.
- Global popup: any component can call `useWaitlist().openWaitlist()` to trigger `WaitlistModal`.
- Copy convention: pre-launch, never imply users/customers exist. Use **"Founding waitlist members get their first month free"** for the perk and **"Join 2,000+ already on the waitlist"** for social proof.

## Process / Journey Steps
The 5-step user journey is consistent between the homepage **"The Process"** section and the how-it-works **"Your journey to optimization"** section:
1. **Notice** — track symptoms and gather lab data
2. **Learn** — understand hormone influence
3. **Adapt** — receive tailored insights
4. **Act** — take informed steps with a provider
5. **Optimize** — sustain energy, clarity, and well-being

Keep these in sync if either set changes.

## Footer
- **Legal:** only "Privacy Policy" (links to `/privacy-policy`). Terms of Service and Health Information Disclaimer have been removed until written.
- **Social icons:** Instagram and YouTube only. Both are clickable `<motion.a>` elements with `target="_blank"` and `rel="noopener noreferrer"`. URLs live as module-level constants at the top of `Footer.tsx` (`INSTAGRAM_URL`, `YOUTUBE_URL`).
- YouTube icon is a simple white play triangle (`/assets/icon-youtube.svg`) on a red rounded-square background.

## Tailwind Config (`tailwind.config.js`)
- Content paths include `./app/**/*.{js,ts,jsx,tsx}` and `./src/page-components/**/*.{js,ts,jsx,tsx}`
- `fontFamily.junge` → `['var(--font-playfair)', 'serif']`
- `fontFamily.figtree` → `['var(--font-figtree)', 'sans-serif']`
- `colors.primary`, `colors.primary-dark`, `colors.primary-light`, `colors.primary-muted`
- `boxShadow.book`, `boxShadow.card`, `boxShadow.hero`

## Conventions
- One component per file, named after the page section it represents.
- Page-level client components live in `src/page-components/`, section components in `src/components/`.
- Static images referenced via `/assets/filename` path strings (not imported).
- Hover interactions: `whileHover={{ scale: 1.04 }}` + `whileTap={{ scale: 0.97 }}` on interactive elements.
- Buttons always use `rounded-full` (pill shape).
- Max content width: `max-w-[1280px] mx-auto px-8`.
- Do **not** use absolute positioning for layout — use flex/grid.
- Smooth scroll to anchor IDs for in-page navigation: `element.scrollIntoView({ behavior: 'smooth' })`.
- Horizontal marquees (e.g. `HowItWorksPage` concerns strip): triplicate the source list and animate `x: ['0%', '-33.333%']` for a seamless loop.
- Responsive typography for large headings: `text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] xl:text-[72px]`.

## Layout alignment convention

To keep navbar and section content on the same vertical guide at every viewport width, use this nesting pattern (padding on outer wrapper, max-width on inner div):

```tsx
// ✅ Correct — navbar / section both use this shape
<nav className="px-4 md:px-8 lg:px-20">
  <div className="max-w-[1280px] mx-auto ...">{children}</div>
</nav>

// ❌ Wrong — padding inside the max-w container offsets content from sections
<nav>
  <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-20">...</div>
</nav>
```

When viewport > 1280 + 160 px, the second form pushes content further right than the first because `max-w` + `mx-auto` centers the box, then padding eats into that centered box. Always put padding on the outer element (the full-bleed wrapper).

## Hero spacing (HomePage)

The hero section uses **asymmetric padding** so the LAUNCHING badge has breathing room from the fixed navbar:

```tsx
className="... pt-28 md:pt-36 pb-16 md:pb-24 ..."
```

The inner stagger container uses `gap-6` (not `gap-8`) so the LAUNCHING badge sits visually close to the heading. Keep these together — increasing the gap loosens the vertical rhythm.

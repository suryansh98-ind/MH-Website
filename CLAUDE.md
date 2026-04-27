# MyHormonz Website — CLAUDE.md

## Project Overview
Multi-page marketing website for **MyHormonz**, featuring Dr. Nisha Woods, PhD. Built from Figma designs with three routes: Home, About, and How It Works.

## Tech Stack
- **React 18** + **TypeScript** — component framework
- **React Router 6** — client-side routing
- **Vite 5** — dev server and build tool (SPA history fallback enabled)
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion 11** — micro-animations

## Dev Commands

Node is managed via **nvm**. Always prepend the node bin path or load nvm before running npm commands.

```bash
# Start dev server
export PATH="/Users/suryanshthakur/.nvm/versions/node/v20.20.0/bin:$PATH"
cd "/Users/suryanshthakur/MH website"
npm run dev          # http://localhost:5173

# Type check
npm run build        # tsc + vite build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  main.tsx                    # Entry point — wraps App with BrowserRouter + WaitlistProvider
  App.tsx                     # Routes: /, /about, /how-it-works + ScrollToTop
  index.css                   # Tailwind directives + base styles
  lib/
    animations.ts             # Shared Framer Motion variants & constants
    waitlist.ts               # Google Sheets waitlist submission helper
  contexts/
    WaitlistContext.tsx       # Global state for opening/closing WaitlistModal
  pages/
    HomePage.tsx              # Landing page — hero, features, sneak peek, CTA
    AboutPage.tsx             # About Nisha — wraps all About section components
    HowItWorksPage.tsx        # How it works — 7 sections explaining the app
  components/
    Navbar.tsx                # Sticky glassmorphism navbar, React Router Links
    WaitlistForm.tsx          # Inline email form — posts to Google Sheets (light/dark variants)
    WaitlistModal.tsx         # Popup waitlist dialog, opened via WaitlistContext
    HeroSection.tsx           # Dr. Nisha portrait + bio, hero CTAs (About page)
    PioneerSection.tsx        # 3-col layout — functional medicine story
    QuoteSection.tsx          # Large centred pink quote with decorative marks
    FounderSection.tsx        # OnePeak Medical pink-tinted band
    EducatorSection.tsx       # Icon list + embedded YouTube video card
    PublishedWorksSection.tsx  # Three books, centre one featured/larger (id="publications")
    BeyondClinicSection.tsx   # Image grid + lifestyle text in rounded card
    MissionSection.tsx        # Full-width pink CTA section
    Footer.tsx                # 4-column footer with social icons, React Router Links
public/
  assets/                     # PNGs + SVGs (phone mockups, portraits, icons, book covers,
                              # lifestyle photos, social icons, etc.) — see folder for full list
```

## Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | `HomePage` | Landing page with hero, features, sneak peek, CTA |
| `/about` | `AboutPage` | About Dr. Nisha — bio, publications, mission |
| `/how-it-works` | `HowItWorksPage` | How the app works — 7 sections |

- `ScrollToTop` component resets scroll on route change
- Navbar and Footer are shared across all routes
- Internal links use React Router `<Link>` (not `<a href>`)
- "View Publications" button on About page scrolls to `#publications` section
- `WaitlistModal` is mounted once at the app root and opened globally via `useWaitlist()` from `WaitlistContext`

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
- **Junge** (serif) — headings, quotes, logo. Loaded from Google Fonts.
- **Figtree** (sans-serif) — body, labels, buttons. Loaded from Google Fonts.
- Both fonts are in `index.html` via `<link>` tags — do **not** install them as npm packages.
- Label style: uppercase, `tracking-[1.2px]` or `tracking-[2.4px]`, `text-[12px]`, bold, pink.

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

## Image Assets
- **Figma MCP assets**: Stored as `const` URL strings at the top of each component file. These expire after 7 days — re-fetch from Figma when needed.
  - File key: `XmwoM03rktuP9LrowfejYM`
  - Node ID: `4184:14901`
- **Static assets** (phone mockups, illustrations, icons, photos): Stored in `public/assets/` and referenced via `/assets/filename.png` (or `.svg`).
- **Video embeds**: `EducatorSection` and the HomePage video block use a YouTube iframe (`https://www.youtube.com/embed/ag4fqJR9Xrc`) — no thumbnail/play-button overlay.

## Waitlist
- Form component: `WaitlistForm` accepts `variant="light" | "dark"` and a `source` string (e.g. `"homepage-hero"`) for attribution.
- Submissions go to a Google Sheets Web App endpoint via `src/lib/waitlist.ts`.
- Global popup: any component can call `useWaitlist().open()` to trigger `WaitlistModal`.

## Tailwind Config
Custom extensions in `tailwind.config.js`:
- `fontFamily.junge`, `fontFamily.figtree`
- `colors.primary`, `colors.primary-dark`, `colors.primary-light`, `colors.primary-muted`
- `boxShadow.book`, `boxShadow.card`, `boxShadow.hero`

## Conventions
- One component per file, named after the page section it represents.
- Page components live in `src/pages/`, section components in `src/components/`.
- Images go as `const` URLs at the top of the component file that uses them.
- Static images (phone mockups, illustrations) go in `public/assets/`.
- Hover interactions: `whileHover={{ scale: 1.04 }}` + `whileTap={{ scale: 0.97 }}` on interactive elements.
- Buttons always use `rounded-full` (pill shape).
- Max content width: `max-w-[1280px] mx-auto px-8`.
- Do **not** use absolute positioning for layout — use flex/grid.
- Internal navigation uses React Router `<Link>` — never `<a href>` for internal routes.
- Smooth scroll to anchor IDs for in-page navigation (e.g., `scrollIntoView({ behavior: 'smooth' })`).
- Horizontal marquees (e.g. `HowItWorksPage` concerns strip): triplicate the source list and animate `x: ['0%', '-33.333%']` for a seamless loop.
- Responsive typography for large headings scales across breakpoints, e.g. hero H1 uses `text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] xl:text-[72px]` to avoid overflow on small screens.

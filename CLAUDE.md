# MyHormonz Website — CLAUDE.md

## Project Overview
About Us page for **MyHormonz**, featuring Dr. Nisha Woods, PhD. Single-page React app built from a Figma design.

## Tech Stack
- **React 18** + **TypeScript** — component framework
- **Vite 5** — dev server and build tool
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
  main.tsx                  # Entry point
  App.tsx                   # Root — composes all sections in order
  index.css                 # Tailwind directives + base styles
  lib/
    animations.ts           # Shared Framer Motion variants & constants
  components/
    Navbar.tsx              # Sticky glassmorphism navbar, scroll-reactive
    HeroSection.tsx         # Dr. Nisha portrait + bio, hero CTAs
    PioneerSection.tsx      # 3-col layout — functional medicine story
    QuoteSection.tsx        # Large centred pink quote with decorative marks
    FounderSection.tsx      # OnePeak Medical pink-tinted band
    EducatorSection.tsx     # Icon list + video card with floating caption
    PublishedWorksSection.tsx  # Three books, centre one featured/larger
    BeyondClinicSection.tsx # Image grid + lifestyle text in rounded card
    MissionSection.tsx      # Full-width pink CTA section
    Footer.tsx              # 4-column footer with social icons
```

## Design Tokens

| Token | Value |
|-------|-------|
| Primary pink | `#ca1670` |
| Primary hover | `#b01460` |
| Primary muted (10%) | `rgba(202,22,112,0.1)` |
| Primary light bg | `#fde9f3` |
| Dark text | `#1f2937` |
| Muted text | `#6b7280` |
| Surface light | `#fafafa` |
| Border | `#e5e7eb` |

## Typography
- **Junge** (serif) — headings, quotes, logo. Loaded from Google Fonts.
- **Figtree** (sans-serif) — body, labels, buttons. Loaded from Google Fonts.
- Both fonts are in `index.html` via `<link>` tags — do **not** install them as npm packages.

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
All images are sourced from Figma MCP asset URLs (expire after 7 days). They are stored as `const` strings at the top of each component file. When assets expire, replace the URLs by re-fetching from Figma:
- File key: `XmwoM03rktuP9LrowfejYM`
- Node ID: `4184:14901`

## Tailwind Config
Custom extensions in `tailwind.config.js`:
- `fontFamily.junge`, `fontFamily.figtree`
- `colors.primary`, `colors.primary-dark`, `colors.primary-light`, `colors.primary-muted`
- `boxShadow.book`, `boxShadow.card`, `boxShadow.hero`

## Conventions
- One component per file, named after the page section it represents.
- Images go as `const` URLs at the top of the component file that uses them.
- Hover interactions: `whileHover={{ scale: 1.04 }}` + `whileTap={{ scale: 0.97 }}` on interactive elements.
- Buttons always use `rounded-full` (pill shape).
- Max content width: `max-w-[1280px] mx-auto px-8`.
- Do **not** use absolute positioning for layout — use flex/grid.

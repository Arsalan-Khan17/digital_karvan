# Digital Karvan — Next.js Rebuild Prompt for Claude Code

> Copy and paste this entire prompt into Claude Code to execute the full website rebuild.

---

## OVERVIEW

You are rebuilding the entire Digital Karvan website (digitalkarvan.com) from scratch in Next.js 14 (App Router). The redesign must be sleek, modern, and professional — black and gray color palette, cinematic animations, pixel-perfect layout, and full sub-route coverage. This is a complete production-ready frontend build.

---

## TECH STACK

- Next.js 14 with App Router (TypeScript)
- Tailwind CSS for styling
- Framer Motion for all animations
- Lucide React for icons
- next/font for typography (use Geist or Inter)
- next/image for all images
- React Hook Form for forms
- Install all necessary packages

---

## COLOR SYSTEM & DESIGN TOKENS

Define these as Tailwind custom colors in `tailwind.config.ts`:

| Token | Value |
|---|---|
| `bg-primary` | `#000000` (pure black) |
| `bg-secondary` | `#0a0a0a` (near black) |
| `bg-card` | `#111111` |
| `bg-elevated` | `#1a1a1a` |
| `border-subtle` | `#222222` |
| `border-default` | `#333333` |
| `text-primary` | `#ffffff` |
| `text-secondary` | `#a1a1aa` (zinc-400) |
| `text-muted` | `#52525b` (zinc-600) |
| `accent` | `#ffffff` (white as accent) |
| `accent-glow` | `rgba(255,255,255,0.08)` |

**Typography scale:**
- Display: 72–96px, font-weight 800, tight letter-spacing
- H1: 56px, font-weight 700
- H2: 40px, font-weight 700
- H3: 28px, font-weight 600
- Body: 16px, line-height 1.7
- Small: 14px

---

## FILE & FOLDER STRUCTURE

Create this full structure under `/app`:

```
/app
  layout.tsx                    ← Root layout with navbar + footer
  page.tsx                      ← Home page
  /services
    page.tsx                    ← Services listing
    /[slug]
      page.tsx                  ← Individual service detail
  /portfolio
    page.tsx                    ← Portfolio grid with filter
    /[slug]
      page.tsx                  ← Individual project case study
  /contact
    page.tsx                    ← Contact page with full form
  /about
    page.tsx                    ← About/team page
  /careers
    page.tsx                    ← Careers page
  /blog
    page.tsx                    ← Blog listing
    /[slug]
      page.tsx                  ← Blog post page
  /privacy-policy
    page.tsx
  /terms-and-conditions
    page.tsx
  /cookie-policy
    page.tsx

/components
  /layout
    Navbar.tsx
    Footer.tsx
    MobileMenu.tsx
  /ui
    Button.tsx
    Badge.tsx
    Card.tsx
    AnimatedText.tsx
    GradientText.tsx
    SectionHeading.tsx
    Divider.tsx
  /home
    Hero.tsx
    Mission.tsx
    ServicesPreview.tsx
    PortfolioPreview.tsx
    CoreValues.tsx
    Team.tsx
    Testimonials.tsx
    PartnersMarquee.tsx
    BlogPreview.tsx
    QuoteForm.tsx
  /services
    ServiceCard.tsx
    ServiceDetail.tsx
  /portfolio
    PortfolioGrid.tsx
    PortfolioFilter.tsx
    ProjectCard.tsx
    CaseStudyHero.tsx
  /contact
    ContactForm.tsx
    ContactInfo.tsx

/lib
  data.ts          ← All static data (services, portfolio, team, testimonials)
  utils.ts
```

---

## NAVBAR

**File:** `components/layout/Navbar.tsx`

- Fixed at top, starts transparent, transitions to `bg-black/95` with `backdrop-blur` on scroll
- Logo: "Digital Karvan" in white, bold — left aligned
- Nav links: Home, Services (with dropdown), Portfolio, About, Contact — right aligned
- Services dropdown shows: Website Design & Dev, Branding & Identity, Maintenance & Support, Consultation & Guidance
- Active link has a white underline indicator
- On mobile: hamburger icon → full-screen slide-down overlay menu with staggered link animations
- Subtle bottom border: `border-b border-white/5` when scrolled
- Smooth enter animation on page load (fade + translate-y)

---

## FOOTER

**File:** `components/layout/Footer.tsx`

- Full-width dark footer, `bg-[#080808]`
- 4-column grid: Brand column (logo + description + newsletter input), Quick Links, Services, Contact Info
- Newsletter: email input + subscribe button, styled as a single-line inline form
- Bottom bar: © 2025 Digital Karvan · Privacy Policy · Terms · Cookies
- Office addresses:
  - **UK:** Charter Avenue, Coventry, +44 737 7259 354
  - **UAE:** Leehove 40, 2678 MC De Lier, Netherlands, +31 174 705 811
- Email: contact@digitalkarvan.com
- Social icons row (LinkedIn, Twitter/X, Instagram placeholders)
- Subtle top border line
- Fade-in animation on scroll into view

---

## HOME PAGE

**File:** `app/page.tsx`

Build these sections in order:

### Section 1 — Hero

- Full-viewport height
- Large centered display text: *"Where Integrity, Excellence, and Collaboration Drive Digital Innovation."*
- Font size: `clamp(48px, 7vw, 96px)`, font-weight 800
- Animated word-by-word reveal using Framer Motion (`staggerChildren`)
- Subtitle below in `text-secondary`: *"We craft transformative digital solutions that empower brands to achieve market leadership."*
- Two CTA buttons side by side:
  - **"Get a Quote"** — white filled
  - **"View Our Work"** — ghost with border
- Buttons have hover: `scale(1.02)` + brightness change
- Bottom of hero: animated scroll indicator (bouncing chevron)
- Background: pure black with a very subtle radial gradient glow at center (`rgba(255,255,255,0.03)`)
- Optional: animated floating particles or grid dot pattern using CSS

### Section 2 — Marquee / Ticker

- Horizontal scrolling marquee between sections
- Repeating text: `INTEGRITY · EXCELLENCE · COLLABORATION · DIGITAL INNOVATION · MODERN SOLUTIONS ·`
- Text in `text-muted`, uppercase, letter-spacing wide
- Runs infinitely, no pause on hover
- Thin `border-top` and `border-bottom` in `border-subtle`

### Section 3 — Mission

- Left: large headline "Our Mission" + 2 paragraphs of mission text
- Right: stylized image block (use placeholder or gradient card if no image)
- Mission text: *"At Digital Karvan, we are driven by an unwavering commitment to integrity, excellence, and collaboration. Our mission is to craft transformative digital solutions that empower brands to achieve market leadership. With a focus on innovation, we provide tailored web and app development services that meet the unique needs of each client, ensuring their digital presence stands out. Through seamless user experiences and cutting-edge technology, we enable businesses to thrive in the ever-evolving digital ecosystem."*
- Animate: left content slides in from left, right image from right on scroll

### Section 4 — Services Preview

- Section heading: "Our Services"
- 4 service cards in a 2×2 grid (horizontal scroll on mobile):
  1. Website Design & Development
  2. Branding & Identity Design
  3. Website Maintenance & Support
  4. Consultation & Technical Guidance
- Each card: dark `bg-card`, Lucide icon, title, short description, "Learn more →" link
- Cards have: `border border-border-default`, hover: `border-white/30 + bg-elevated + translateY(-4px)` transition
- "Explore all services →" CTA button below grid

### Section 5 — Portfolio Preview

- Section heading: "Selected Work"
- 3-column grid showing the 8 most recent projects:
  1. LMS
  2. OVB Holdings AG Case Study
  3. Smartflyer Website & Portal
  4. AI Video Automation – PoC
  5. Sales Performance Dashboard – PowerBI
  6. Bank of Khyber Dashboard
  7. AI Voice Cloning Technology
  8. DocExtract
- Each project card: full-bleed image/gradient, category badge top-left, title, date
- Hover: `scale(1.02)` + overlay with "View Project →" centered
- Staggered fade-in animation on scroll
- "View all projects →" CTA

### Section 6 — Core Values

- 3 columns: Integrity, Excellence, Collaboration
- Each: large number (01, 02, 03) in `text-muted`, bold title, description paragraph
- **Integrity:** Unwavering honesty and transparency, steadfast commitment to meeting deadlines
- **Excellence:** Talented team delivering top-quality solutions and innovative results, consistently exceeding client expectations
- **Collaboration:** Fostering strong partnerships, working closely as a unified team to understand the client vision
- Animated: stagger reveal on scroll

### Section 7 — Team

- Heading: "Meet Our Team"
- 4 team cards in a row:
  | Name | Role | Note |
  |---|---|---|
  | Anna Oldman | Art Director | |
  | Oscar Freeman | Frontend Dev | |
  | Emma Newman | Founder | ★ marked as founder |
  | Lisa Trueman | UI/UX Designer | |
- Cards: circular avatar image placeholder, name, role, subtle hover lift
- Subheading: *"We are talented individuals passionate about bringing ideas to life."*

### Section 8 — Testimonials

- Section heading: "What Our Clients Say"
- Horizontal scroll carousel (auto-playing) with pause on hover
- 7 testimonials:
  | Name | Source |
  |---|---|
  | Sarah Newman | Envato market |
  | Emma Trueman | Envato market |
  | Oscar Freeman | Envato market |
  | Lisa Trueman | Envato market |
  | Alex Newman | Envato market |
  | Dave Freeman | Envato market |
  | Bruce Newman | Envato market |
- Each card: large quote marks, testimonial text, name, source
- Dark card background, white text
- Framer Motion drag-to-scroll or custom auto-scroll

### Section 9 — Partners Marquee

- Scrolling logo strip (infinite scroll left)
- Use placeholder SVG rectangles for partner logos (styled as pill shapes)

### Section 10 — Blog Preview

- 2 blog post cards:
  - "Hello World!" – May 27, 2024
  - "How to Become a Graphic Designer in 10 Simple Steps" – Dec 2, 2023
- Simple card layout: category badge, date, title, "Read more →"
- "View all posts →" link

### Section 11 — Quote Form

- Full-width dark section
- Heading: *"Your Trusted Partner in Modern Software Solutions"*
- Subtext: *"From startups to enterprise teams — we build, optimize, and scale digital products that drive real results."*
- Form fields (use React Hook Form):
  - First Name, Last Name (row)
  - Email, Phone (row — phone has country code selector: PK, US, UK, IN, etc.)
  - Company Name, Company URL (row)
  - Budget (select): `$5000` / `$5000–$10K` / `$10K–$15K` / `$20K–$50K`
  - Region (select): North America / South America / Europe / Asia / Africa / Australia
  - Services (multi-checkbox): Remote IT Resources, AI Engineering, Custom Software Dev, Web Dev, Mobile App Dev, Other
  - Project Details (textarea)
  - Submit button: full-width white button
- Fields: `bg-[#111] border border-[#333] rounded-lg`, focus: `border-white/50 outline-none`
- Subtle glow on focused field

---

## SERVICES PAGE

**File:** `app/services/page.tsx`

- Hero: *"This Is What We Do Best"* — full-width heading, animated reveal
- 4 service blocks in alternating left/right layout:

  **1. Website Design & Development**
  Features: UI/UX Design, Responsive Web Design, Web App Development, CMS

  **2. Branding & Identity Design**
  Features: UX Audits, Design Thinking, Methodologies, Wireframing

  **3. Website Maintenance & Support**
  Features: Regular Updates, Performance Monitoring, Bug Fixes, Backup & Security

  **4. Consultation & Technical Guidance**
  Features: Expert digital strategy, technical problem-solving, emerging technology advisory

- Each service has a "Learn More" button → `/services/[slug]`
- Bottom CTA: *"Ready to bring your ideas to life? Contact us"*

---

## SERVICE DETAIL PAGE

**File:** `app/services/[slug]/page.tsx`

**Slugs:** `website-development`, `branding-identity`, `maintenance-support`, `consultation`

Each page includes:
- Hero with service name + category tag
- Overview section
- Approach section: "Our Approach and Work Specifics" with bullet points
- Features/deliverables grid
- CTA section at bottom: "Start your project →"
- Breadcrumb: Home > Services > [Service Name]

---

## PORTFOLIO PAGE

**File:** `app/portfolio/page.tsx`

- Hero: *"Designing a Better World Today"*
- Filter bar: All | Technology | Website (filters by category tag)
- Masonry/grid layout: 3 columns desktop, 2 tablet, 1 mobile
- All 8 projects displayed:

  | Project | Category | Date |
  |---|---|---|
  | DocExtract | Technology, Website | Mar 10, 2026 |
  | AI Voice Cloning Technology | Technology, Website | Mar 10, 2026 |
  | Bank of Khyber Dashboard | Technology | Mar 10, 2026 |
  | Sales Performance Dashboard (PowerBI) | Technology | Mar 8, 2026 |
  | AI Video Automation PoC | Technology, Website | Mar 4, 2026 |
  | Smartflyer Website & Portal | Website | Jul 27, 2025 |
  | OVB Holdings AG Case Study | Technology | Nov 14, 2023 |
  | LMS | Technology, Website | Nov 14, 2023 |

- Each card: thumbnail placeholder (gradient colored by category), category badge(s), date, project name, hover overlay with "View Project →"
- Animate: stagger fade-in, filter transitions use Framer Motion layout animations

---

## PORTFOLIO ITEM PAGE

**File:** `app/portfolio/[slug]/page.tsx`

- Full-width hero image/gradient
- Breadcrumb
- Project metadata: client, category, date, technologies used
- Case study sections: Overview, Challenge, Solution, Results
- Screenshot/mockup placeholder area
- "Next Project →" navigation
- Back to portfolio link

---

## CONTACT PAGE

**File:** `app/contact/page.tsx`

- Hero: *"Get In Touch"* with animated heading
- Two-column layout:
  - **Left:** Contact info cards
    - 📍 UK: Charter Avenue, Coventry, +44 737 7259 354
    - 📍 UAE: Leehove 40, 2678 MC De Lier, Netherlands, +31 174 705 811
    - ✉️ contact@digitalkarvan.com
    - Social links
  - **Right:** Contact form
    - Fields: Name, Email, Subject, Message
    - Submit button
    - Privacy disclaimer: *"We promise not to disclose your personal information to third parties."*
- FAQ accordion section below (3–4 questions, Framer Motion animated open/close)

---

## ABOUT PAGE

**File:** `app/about/page.tsx`

- Hero: *"Who We Are"* with mission statement
- Mission paragraph (full text)
- Core values section (same as homepage, more detailed)
- Team grid (same 4 members, slightly larger cards)
- Company stats row:
  - 50+ Projects Delivered
  - 3+ Years Experience
  - 20+ Happy Clients
  - 2 Global Offices
- "Partner with us" CTA at bottom

---

## BLOG PAGE

**File:** `app/blog/page.tsx`

- Hero: *"Insights & Articles"*
- Blog card grid (2 columns)
- Cards: thumbnail placeholder, category badge, date, title, excerpt, "Read More →"
- Pagination placeholder

---

## BLOG POST PAGE

**File:** `app/blog/[slug]/page.tsx`

- Article layout: centered, max-width 720px
- Breadcrumb
- Category + date header
- Large title
- Author info
- Article body (placeholder content)
- Related posts at bottom

---

## LEGAL PAGES

**Files:** `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`

- Clean article layout, dark background
- Table of contents sidebar on desktop
- Section headings + body copy
- Last updated date

---

## CAREERS PAGE

**File:** `app/careers/page.tsx`

- Hero: *"Join Our Team"*
- Subheading: *"We're always looking for talented people"*
- 2–3 placeholder job listing cards (role, location, type)
- "Apply" button links to `/contact` with subject pre-filled
- Culture section: 3 value props (Remote-friendly, Fast-paced, Innovation-driven)

---

## ANIMATIONS — GLOBAL RULES

Use Framer Motion throughout. All animations must feel premium:

| Animation | Spec |
|---|---|
| Page transitions | Fade in + `translateY(10px → 0)` over 0.4s on route change |
| Scroll reveals | `whileInView` + `viewport={{ once: true, margin: "-100px" }}` |
| Stagger children | `delayChildren: 0.1`, `staggerChildren: 0.08` |
| Hover — cards | `scale(1.02)` |
| Hover — buttons | `scale(1.03)` |
| Hover — links | Underline slide-in from left |
| Hero text | Word-by-word or character-by-character reveal on mount |
| Marquee | CSS `@keyframes marquee` infinite linear scroll |
| Navbar | Transparent → frosted glass on scroll |
| Stats | Count-up animation when entering viewport |
| Form fields | Focus ring glow animation |

Create a reusable `<AnimatedSection>` wrapper component that accepts `children` and wraps them in a Framer Motion div with standard scroll-reveal behavior.

---

## DATA FILE

**File:** `lib/data.ts`

Export typed arrays for:

```typescript
services[]       // id, slug, title, icon, shortDescription, fullDescription, features[]
projects[]       // id, slug, title, category[], date, imageUrl, description, challenge, solution
team[]           // id, name, role, isFounder, imageUrl
testimonials[]   // id, name, source, text
blogPosts[]      // id, slug, title, category, date, excerpt, imageUrl
navLinks[]       // with nested dropdowns
```

---

## RESPONSIVE DESIGN

All layouts must be fully responsive:

| Breakpoint | Behavior |
|---|---|
| Mobile `< 768px` | Single column, hamburger menu, stacked sections |
| Tablet `768–1024px` | 2 columns where applicable |
| Desktop `> 1024px` | Full layout as designed |

Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

---

## PERFORMANCE

- All images: use `next/image` with proper `width` and `height`
- Lazy load below-fold images
- Fonts: use `next/font/google` with `display: swap`
- No layout shift on load

---

## REUSABLE COMPONENTS TO BUILD

| Component | Description |
|---|---|
| `<Button variant="primary\|ghost\|outline">` | Reusable button with hover animations |
| `<Badge>` | Pill-shaped category label (e.g., "Technology", "Website") |
| `<SectionHeading>` | Animated section title + subtitle combo |
| `<AnimatedSection>` | Scroll-reveal wrapper |
| `<GradientCard>` | Card with subtle gradient border on hover via CSS pseudo-elements |
| `<Marquee>` | Infinite horizontal text scroller |

---

## IMPORTANT RULES

- **No external UI libraries** — no shadcn, no MUI, no Radix — build everything custom with Tailwind + Framer Motion
- All text content must **exactly match** the original website (copy-accurate)
- All slugs must match the original URL structure as closely as possible
- Every internal link must use Next.js `<Link>` component
- **No dead links** — every navigation item must route to a real page
- Use TypeScript throughout — no `any` types
- ESLint must pass
- `npm run build` must succeed before finishing

---

## SETUP COMMANDS

Run in order:

```bash
npx create-next-app@latest digital-karvan --typescript --tailwind --app --no-src-dir
cd digital-karvan
npm install framer-motion lucide-react react-hook-form
```

---

## BUILD ORDER

Execute in this sequence:

1. `tailwind.config.ts` — custom colors + fonts
2. `globals.css` — base styles, marquee keyframes, scrollbar styling
3. `lib/data.ts` — all static data
4. Root `layout.tsx` — Navbar + Footer
5. `app/page.tsx` — Home page (all 11 sections)
6. `app/services/page.tsx` + `app/services/[slug]/page.tsx`
7. `app/portfolio/page.tsx` + `app/portfolio/[slug]/page.tsx`
8. `app/contact/page.tsx`
9. `app/about/page.tsx`
10. `app/blog/page.tsx` + `app/blog/[slug]/page.tsx`
11. `app/careers/page.tsx`
12. Legal pages: `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`
13. All shared UI components in `/components`

---

> **Goal:** The final result must look like it was built by a senior design agency — dark, minimal, typographically powerful, and animated with purpose. Every page must be navigable, every link must work, and the overall experience must feel polished and production-ready.

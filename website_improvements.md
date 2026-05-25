# Digital Karvan — UX/UI Improvement Prompts for an AI Agent

> Source site: https://dev.digitalkarvan.com/
> Audit date: 24 May 2026
> Stack assumed: modern frontend (Next.js / React / Tailwind likely, based on portfolio).
> Format: each task is a stand-alone prompt. Pass them one at a time to your AI agent.

---

## How to use this file

Each prompt is structured as:

- **Role** — who the agent should act as
- **Context** — what currently exists on the site
- **Why it matters** — the research-backed rationale
- **Task** — exactly what to build/change
- **Constraints** — non-negotiables (a11y, perf, brand)
- **Acceptance criteria** — definition of done
- **Sources** — citations the agent can reference

Run prompts in the order presented (Sprint 1 → Sprint 4). Each is independently shippable.

---

# 🚀 SPRINT 1 — Trust & Conversion (Week 1–2)

---

## Prompt 1.1 — Fix "0+" Counter Fallback

**Role:** You are a senior frontend engineer.

**Context:** The homepage has animated stat counters ("Projects Delivered", "Happy Clients", "Years of Craft"). They currently render as `0+` on first paint and only animate to their real values when scrolled into view. This means users — and any SSR/bots — see `0+ Happy Clients`, which directly undermines trust.

**Why it matters:** Edelman Trust Barometer 2024 and Cialdini's social-proof research show quantified credibility is the single biggest pre-engagement trust signal in B2B. NN/g ("Animation for Attention and Comprehension", Pernice 2014) warns animation should garnish, never replace, content. Pre-zero values are also a CLS (Cumulative Layout Shift) risk per web.dev Core Web Vitals.

**Task:**
1. Refactor counter components so the final value is rendered server-side as the static fallback (e.g. `50+`, `20+`, `3+`).
2. Use `IntersectionObserver` to optionally animate from a lower starting number to the final value when the element enters the viewport.
3. Respect `@media (prefers-reduced-motion: reduce)` — skip animation, show final value immediately.
4. Ensure no layout shift occurs during animation (reserve width with `min-width` or `tabular-nums`).

**Constraints:**
- No `0+` may ever appear in the DOM, even momentarily.
- Must work without JavaScript (SSR fallback shows final number).
- CLS contribution ≤ 0.01.

**Acceptance criteria:**
- View-source / curl shows final values in HTML.
- Lighthouse CLS for the page stays under 0.1.
- With `prefers-reduced-motion: reduce`, no count-up animation runs.

**Sources:**
- web.dev/cls
- NN/g, "Animation for Attention" (Pernice, 2014)
- WCAG 2.3.3 Animation from Interactions

---

## Prompt 1.2 — Replace Text-Only Client Names with a Logo Bar

**Role:** Senior frontend engineer + designer.

**Context:** The "Trusted by" band lists eight company names as plain text (DocExtract, VoiceAI Studios, Bank of Khyber, Smartflyer Travel, OVB Holdings AG, MediaGen Corp, EduTech Institute, Enterprise Sales Corp). There are no actual logos.

**Why it matters:** Baymard Institute B2B research and CXL's hero-area meta-analysis both find that a logo bar near the hero lifts lead-form starts by 16–24%. NN/g "Trust on the Web" (Fessenden, 2021) lists logo bars as a primary credibility cue.

**Task:**
1. Build a `<LogoBar />` component that accepts an array of `{ name, src, href, permissionGranted }`.
2. Render logos in monochrome (CSS filter or pre-prepared SVG) at consistent optical weight.
3. Add subtle infinite scroll/marquee (pause on hover, pause on `prefers-reduced-motion`).
4. Mark up with `<ul>`/`<li>` and `aria-label="Clients we've worked with"`.
5. Only render logos for which `permissionGranted === true`.

**Constraints:**
- SVG only (no PNG).
- Tap-targets ≥ 44×44 if logos link out (WCAG 2.5.5).
- Lazy-load if below the fold.

**Acceptance criteria:**
- All eight (or however many are permission-cleared) logos appear in a calm, monochrome row.
- Marquee pauses for reduced-motion users.
- Lighthouse a11y score unchanged or improved.

**Sources:**
- Baymard Institute B2B usability research
- NN/g, "Trust on the Web" (Fessenden, 2021)
- WCAG 2.5.5 Target Size

---

## Prompt 1.3 — Replace Team Initials with Real Photos & Bios

**Role:** Senior frontend engineer.

**Context:** The "Meet Our Team" section uses single-letter avatars (A, M, S, T) for the four team members.

**Why it matters:** Princeton's Todorov & Willis (2006) found trustworthiness is judged from faces in ~100ms. Stanford Web Credibility Project (B.J. Fogg) lists "showing real people" in its top five credibility factors.

**Task:**
1. Create a `<TeamMember />` component accepting `{ name, role, photo, bio, linkedin }`.
2. Use `next/image` (or equivalent) with `loading="lazy"`, `sizes`, and explicit `width`/`height` to prevent CLS.
3. Provide meaningful `alt` text ("Portrait of Azam Tariq, Co-Founder & Managing Director").
4. Add a 2–3 sentence bio and a LinkedIn icon-link per member.
5. Photos should be square, 1:1, neutral background, consistent treatment (b&w or warm-toned).

**Constraints:**
- Photo file size ≤ 60 KB each (WebP/AVIF).
- Keyboard-focusable LinkedIn links with visible focus ring.

**Acceptance criteria:**
- All four team members display a real photo, name, role, bio, and LinkedIn link.
- No CLS contribution.
- Alt text passes a screen-reader read-through.

**Sources:**
- Todorov & Willis, "First Impressions" (Psychological Science, 2006)
- Stanford Web Credibility Project, B.J. Fogg
- WCAG 1.1.1 Non-text Content

---

## Prompt 1.4 — Add Third-Party Validation Widget (Clutch / DesignRush / G2)

**Role:** Frontend engineer.

**Context:** No third-party review platform is currently embedded.

**Why it matters:** G2 Buyer Behavior Report 2024: 92% of B2B buyers are more likely to purchase after a trusted review. BrightLocal 2024: 87% read reviews before engaging. CXL's 2023 agency-website study found verified review widgets are the strongest external credibility signal.

**Task:**
1. Register Digital Karvan on at least one of: Clutch.co, DesignRush, G2.
2. Once verified, embed the official widget on the homepage (between Portfolio and Testimonials) and on the Contact page above the form.
3. If embed is blocked, render a static "As reviewed on Clutch — 5.0 ★" badge linking to the profile, fetched server-side.

**Constraints:**
- No third-party script may block the main thread > 50ms.
- Load widget via `next/script` with `strategy="lazyOnload"`.

**Acceptance criteria:**
- A verified review badge appears on Home and Contact.
- Total Blocking Time impact ≤ 50ms.

**Sources:**
- G2 Buyer Behavior Report 2024
- BrightLocal Consumer Review Survey 2024

---

## Prompt 1.5 — Shorten the Contact Form (Progressive Disclosure)

**Role:** Conversion-focused frontend engineer.

**Context:** The current "Get a Free Quote" form has ~10 fields (First Name, Last Name, Email, Phone, Company Name, Company Website, Budget, Region, Services Needed, Project Details).

**Why it matters:** HubSpot's 2024 form-analytics study (40,000+ forms): reducing 11 fields → 4 fields lifted conversion ~120%. Luke Wroblewski's "Web Form Design" documents progressive disclosure as the canonical solution.

**Task:**
1. Build a two-step form.
   - **Step 1 (visible by default):** Name, Email, "How can we help?" (textarea).
   - **Step 2 (revealed after Step 1 submit OR after user types in Step 1):** Phone (optional), Company, Website (optional), Budget, Region, Services.
2. Use `aria-required="true"` on required fields and visually mark optional fields with "(optional)".
3. Add inline validation with positive confirmation ("Looks good") — NN/g "Inline Validation" (Sherwin, 2014) found a 22% error-rate reduction.
4. Mobile inputs must use correct `type` and `inputmode` (`type="email"`, `type="tel"`, etc.).
5. After submit, redirect to a dedicated `/thanks` page with: confirmation, expected response time, calendar link, links to 2–3 case studies.

**Constraints:**
- No CAPTCHA on Step 1 (use honeypot or Cloudflare Turnstile invisible mode).
- WCAG 2.2 AA: labels associated, errors `aria-describedby`'d.

**Acceptance criteria:**
- Step 1 shows only 3 fields.
- Form submissions tracked as GA4 conversion events.
- `/thanks` page exists and is reachable only post-submit.

**Sources:**
- Luke Wroblewski, "Web Form Design" (Rosenfeld, 2008)
- HubSpot Form Analytics Study 2024
- NN/g, "Inline Validation in Forms" (Sherwin, 2014)

---

## Prompt 1.6 — Add a Low-Commitment "Book a Discovery Call" CTA

**Role:** Frontend engineer.

**Context:** Every CTA on the site funnels to the long quote form. There is no low-commitment option for top-of-funnel visitors.

**Why it matters:** Drift's 2023 B2B Conversational Marketing Report: offering 2+ contact paths lifts conversion 25–40%. Forrester B2B Buyer Journey 2023: 67% of buying happens pre-sales contact.

**Task:**
1. Integrate Cal.com or Calendly.
2. Add a secondary CTA "Book a 20-min discovery call" next to "Get a Free Quote" in the hero and in the footer.
3. Open the scheduler in an accessible modal (`role="dialog"`, focus-trapped, `Escape` to close).

**Constraints:**
- Modal must trap focus (WCAG 2.4.3 Focus Order).
- Scheduler script lazy-loaded only on modal open.

**Acceptance criteria:**
- Calendar opens on click, focus is trapped, Escape closes.
- Booking confirmation triggers a GA4 conversion event.

**Sources:**
- Drift 2023 B2B Conversational Marketing Report
- Forrester B2B Buyer Journey Report 2023

---

# ⚡ SPRINT 2 — Performance & Accessibility (Week 3–4)

---

## Prompt 2.1 — Calm the Hero Background & Tighten the Headline

**Role:** UI engineer + copywriter.

**Context:** The hero displays "Where Integrity, Excellence, and Collaboration Drive Digital Innovation." over a dense, animated SVG of wireframe polyhedra and a starfield. At 1440×900 the headline animates in such that "Excellence" briefly clips the right edge. CTAs sometimes fall below the fold on 1366×768.

**Why it matters:** Lindgaard et al. (Behaviour & IT, 2006): users judge visual appeal in ~50ms. NN/g "Decorative Animations" (Loranger, 2017) warns competing focal points slow comprehension. CXL hero studies: reducing visual noise lifts primary-CTA CTR 10–30%.

**Task:**
1. Replace the headline with a shorter benefit-led variant. Default option:
   > "We design and build digital products that grow ambitious businesses."
   Move "Integrity, Excellence, Collaboration" to the About page as the values section header.
2. Reduce SVG background opacity 40–60% behind the text area, or apply a radial-gradient mask centred on the headline.
3. Ensure both CTAs ("Get a Free Quote", "Book a discovery call") render above the fold at viewport ≥ 1366×768.
4. Constrain headline `max-width` so no word clips on any viewport ≥ 320px.
5. Move stat counters out of the hero into a dedicated band below.

**Constraints:**
- Maintain dark cosmic brand aesthetic.
- LCP element must be the headline `<h1>` and must render < 2.5s on a Moto G simulated 4G connection.

**Acceptance criteria:**
- Headline never clips on viewports 320–2560px.
- Both CTAs visible at 1366×768.
- Lighthouse LCP < 2.5s on mobile.

**Sources:**
- Lindgaard et al., Behaviour & IT, 2006
- NN/g, "Decorative Animations" (Loranger, 2017)
- web.dev/lcp

---

## Prompt 2.2 — Honour `prefers-reduced-motion` Globally

**Role:** Accessibility-focused frontend engineer.

**Context:** Hero polyhedra animation, scrolling marquees ("Design • Build • Launch…"), counter animations, and parallax effects appear to run regardless of OS-level motion preferences.

**Why it matters:** WCAG 2.3.3 Animation from Interactions (AAA). Vestibular-disorder users can experience nausea from parallax/auto-motion. WebAIM Million 2024 lists motion-related issues as a growing category.

**Task:**
1. Add a global SCSS/CSS mixin or Tailwind plugin: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; } }`.
2. For component-level animations driven by JS (Framer Motion, GSAP), read `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and disable.
3. For the hero canvas/SVG animation, render a static frame when reduced-motion is on.
4. For marquees, replace with a static comma-separated list.

**Constraints:**
- No animations may run when reduced-motion is set.
- Functionality must remain identical.

**Acceptance criteria:**
- Toggling "Reduce motion" in OS settings stops all animations on reload.
- axe DevTools reports no motion-related violations.

**Sources:**
- WCAG 2.3.3
- web.dev/prefers-reduced-motion

---

## Prompt 2.3 — Add Skip-Link & Visible Focus Styles

**Role:** Accessibility engineer.

**Context:** No skip-link exists. Keyboard `Tab` focus indicators are not visually obvious on dark backgrounds.

**Why it matters:** WCAG 2.4.1 Bypass Blocks (A) and 2.4.7 Focus Visible (AA). WebAIM Million 2024: focus-visibility failures are in the top three accessibility issues.

**Task:**
1. Insert a `<a href="#main" class="skip-link">Skip to main content</a>` as the first focusable element. Style it visually hidden until focused, then visible at top-left.
2. Add `id="main"` to the primary `<main>` element.
3. Define a global `:focus-visible` style: 2px solid outline in a high-contrast colour (e.g. white on dark, with 2px offset).
4. Audit all interactive elements (buttons, links, form fields, custom widgets) for focus visibility.

**Constraints:**
- Outline must achieve ≥ 3:1 contrast against adjacent colours (WCAG 1.4.11).
- Skip-link must appear within 1 Tab key press from page load.

**Acceptance criteria:**
- Tabbing through the page shows a visible focus ring on every interactive element.
- Lighthouse a11y score ≥ 95.

**Sources:**
- WCAG 2.4.1, 2.4.7, 1.4.11
- WebAIM Million 2024

---

## Prompt 2.4 — Contrast Audit & Fix

**Role:** Designer + frontend engineer.

**Context:** Secondary grey body text and "OUR MISSION" / "WHAT GUIDES US" eyebrow labels may not meet 4.5:1 contrast on the dark background.

**Why it matters:** WCAG 1.4.3 Contrast (Minimum, AA). WebAIM Million 2024: 81% of homepages fail contrast — the single most common a11y failure.

**Task:**
1. Audit every text/background pair using WebAIM's Contrast Checker or `axe DevTools`.
2. Brighten body text to a token like `#E5E5E5` against `#0A0A0A` (verify ≥ 4.5:1).
3. Eyebrow labels should also meet 4.5:1 if rendered at ≤ 18.66px (or 3:1 if ≥ 24px / 18.66px bold).
4. Verify pink accent (`~#E63956`) on dark — likely passes for large text but verify for body usage.
5. Add a design-token system to lock approved colour pairs.

**Constraints:**
- Brand pink/red hue may not shift more than ΔE 5.
- All body text ≥ 4.5:1, all UI essential text ≥ 3:1.

**Acceptance criteria:**
- axe DevTools reports zero contrast violations.
- A documented colour-token table lives in the design system.

**Sources:**
- WCAG 1.4.3
- WebAIM Contrast Checker
- WebAIM Million 2024

---

## Prompt 2.5 — Core Web Vitals Pass

**Role:** Performance engineer.

**Context:** Hero has a heavy animated SVG/canvas. Page likely has render-blocking webfonts and unoptimised animation paint cost.

**Why it matters:** Google CWV research: pages passing all three CWV thresholds see ~24% lower bounce rate. Deloitte "Milliseconds Make Millions" (2020): 0.1s mobile improvement → 8.4% retail / 10.1% travel conversion lift.

**Task:**
1. Run Lighthouse (mobile, throttled 4G, Moto G) and PageSpeed Insights on `/`.
2. Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.
3. Self-host fonts with `font-display: swap`, subset Latin-only, preload the LCP font.
4. Lazy-load all components below the fold via `next/dynamic` (services, portfolio, testimonials, blog, footer).
5. Pause hero animations when `document.visibilityState === 'hidden'`.
6. Add `<link rel="preconnect">` for any required third parties (analytics, Cal.com).
7. Convert any future raster images to AVIF with WebP/JPEG fallback via `<picture>`.

**Constraints:**
- No regression on visual fidelity.
- No third-party script may load before user interaction unless essential.

**Acceptance criteria:**
- PageSpeed Insights mobile score ≥ 90 Performance.
- All three CWV in green on field data (CrUX) after 28 days.

**Sources:**
- web.dev/vitals
- Deloitte, "Milliseconds Make Millions" (2020)
- Harry Roberts, csswizardry.com font-loading articles

---

## Prompt 2.6 — Mobile Navigation Accessibility

**Role:** Accessibility-focused frontend engineer.

**Context:** Mobile hamburger menu was not fully audited.

**Why it matters:** StatCounter 2024: ~60% global traffic is mobile. WCAG 2.1.2 No Keyboard Trap. W3C ARIA Authoring Practices Guide (APG): Disclosure pattern.

**Task:**
1. Hamburger button: `aria-expanded`, `aria-controls`, `aria-label="Open navigation"`.
2. Opening menu: focus moves to first item, focus is trapped while open.
3. `Escape` closes the menu and returns focus to the hamburger button.
4. Tap-targets ≥ 44×44 CSS pixels.
5. Test on iPhone SE (375px), iPhone 15 (393px), Pixel 8 (412px).

**Acceptance criteria:**
- VoiceOver and TalkBack announce open/close states correctly.
- Keyboard-only user can fully navigate the mobile menu.

**Sources:**
- W3C ARIA APG, Disclosure pattern
- WCAG 2.1.2, 2.5.5

---

# 📝 SPRINT 3 — Content, SEO & IA (Week 5–6)

---

## Prompt 3.1 — Build Out Case-Study Detail Pages

**Role:** Frontend engineer + content strategist.

**Context:** Homepage shows six portfolio cards with quantified outcomes but no individual case-study pages.

**Why it matters:** Edelman B2B 2024: quantified case studies are the most persuasive sales asset. Forrester 2023: 67% of B2B buying happens pre-sales. Long-form case studies also drive long-tail SEO.

**Task:**
1. For each portfolio item, create a `/work/[slug]` page with sections:
   - Hero (client, sector, year, outcome headline)
   - The challenge (200–400 words)
   - The approach (process diagram + 300–600 words)
   - The outcome (quantified metrics, ideally a chart or comparison)
   - Tech stack
   - Pull-quote testimonial from client
   - Next/Prev case study
2. Each page ≥ 1,000 words.
3. Embed `CreativeWork` and `BreadcrumbList` JSON-LD.
4. Add OG image generated from a template per case study (`/og/[slug].png`).

**Constraints:**
- All client content must be permission-cleared.
- Each page must pass Lighthouse SEO ≥ 95.

**Acceptance criteria:**
- All six case-study pages live and indexable.
- Each has unique meta title, description, OG image.

**Sources:**
- Edelman Trust Barometer 2024
- Schema.org CreativeWork

---

## Prompt 3.2 — Refresh or Retire the Blog

**Role:** Content strategist.

**Context:** Blog has two posts; latest is May 2024 (a year old). Showing a stale blog signals inactivity.

**Why it matters:** NN/g and Baymard B2B vendor-selection research: blog posts older than 6 months are a credibility flag. HubSpot 2024: companies publishing 11+ posts/month get 3.5× the traffic of 0–1.

**Task:** Choose ONE:
- **Option A — Commit:** publish 2 substantive posts per month for the next 6 months. Build an editorial calendar with topics around the audience's questions ("How to brief a web agency", "What does a £15k website include").
- **Option B — Retire:** remove "Insights & Articles" from the homepage and from primary nav. Move the two existing posts under a "Notes" page linked only from the footer.

**Acceptance criteria:**
- Either a populated, dated content pipeline OR the blog removed from primary navigation.

**Sources:**
- HubSpot State of Marketing 2024
- NN/g, "Empty States" (2017)

---

## Prompt 3.3 — Add an FAQ Section

**Role:** Frontend engineer + content writer.

**Context:** No FAQ exists. Buyers must guess at price, timeline, IP, contract terms.

**Why it matters:** Forrester 2023: 67% of B2B decision-making happens before sales contact. Schema.org `FAQPage` markup also wins rich snippets.

**Task:**
1. Add an FAQ section on the homepage (above the contact form) and a dedicated `/faq` page.
2. Minimum 8 Q&As covering: typical project cost ranges, timelines, who owns the IP, what tech stack you use, do you offer fixed-price or T&M, what's your process, how do you handle revisions, what happens after launch.
3. Implement as an accordion using `<details>`/`<summary>` (zero JS, accessible by default).
4. Add `FAQPage` JSON-LD.

**Acceptance criteria:**
- 8+ Q&As live with valid schema (validate via Google Rich Results Test).

**Sources:**
- Schema.org FAQPage
- Forrester B2B Buyer Journey 2023

---

## Prompt 3.4 — Implement Structured Data (JSON-LD)

**Role:** SEO engineer.

**Context:** No structured data is detectable.

**Why it matters:** Google's documentation: structured data unlocks rich results, knowledge-panel candidacy, and assistant integrations.

**Task:** Inject the following JSON-LD blocks into `<head>` via the appropriate Next.js mechanism (`<Script type="application/ld+json">`):
1. `Organization` (global, in root layout).
2. `LocalBusiness` × 2 (one per office: UK Coventry and UAE Dubai).
3. `Service` × 4 (one per service card).
4. `BreadcrumbList` on every non-home page.
5. `FAQPage` on the FAQ page.
6. `CreativeWork` on each case-study page.

**Constraints:**
- Validate every block in Google's Rich Results Test before deploy.
- Keep `Organization` social profiles up to date (LinkedIn, GitHub, X, Dribbble).

**Acceptance criteria:**
- Rich Results Test passes for every page.
- Search Console "Enhancements" reports no critical errors.

**Sources:**
- developers.google.com/search/docs/appearance/structured-data
- schema.org

---

## Prompt 3.5 — Meta Descriptions, Open Graph & Twitter Cards

**Role:** SEO engineer.

**Context:** Meta descriptions and social-share metadata are missing or generic.

**Why it matters:** Backlinko 11.8M-SERP study (2023): pages with compelling meta descriptions get ~5.8% higher CTR.

**Task:**
1. Write unique `<title>` (≤ 60 chars) and `<meta name="description">` (≤ 155 chars) per page.
2. Add Open Graph: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`.
3. Add Twitter Card: `twitter:card="summary_large_image"`, `twitter:image`, `twitter:title`, `twitter:description`.
4. For dynamic pages (case studies, blog), generate OG images at build time.

**Acceptance criteria:**
- Every page passes opengraph.xyz and cards-dev.twitter.com previews.
- No duplicate titles/descriptions across pages.

**Sources:**
- Backlinko 2023 SERP study
- ogp.me

---

## Prompt 3.6 — Sitemap, Robots, Search Console

**Role:** SEO engineer.

**Context:** Sitemap and robots.txt presence not confirmed.

**Task:**
1. Generate `/sitemap.xml` (dynamic, includes all routes).
2. Add `/robots.txt` allowing all and pointing to the sitemap.
3. Verify the production domain in Google Search Console and Bing Webmaster Tools.
4. Submit the sitemap.

**Acceptance criteria:**
- Sitemap returns 200 and lists all canonical URLs.
- Search Console shows successful sitemap submission.

**Sources:**
- developers.google.com/search/docs/crawling-indexing/sitemaps

---

## Prompt 3.7 — Typography Scale & Line-Length

**Role:** Designer.

**Context:** Body paragraphs in About exceed 85 characters per line at 1440px (ideal is 50–75).

**Why it matters:** Bringhurst, "Elements of Typographic Style".
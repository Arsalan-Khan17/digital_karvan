/**
 * Single source of truth for site-wide SEO values.
 *
 * IMPORTANT: pick ONE canonical host (apex vs www) and make sure your DNS/host
 * 308-redirects the other to it. Everything below derives from `url`.
 */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://digitalkarvan.com",
  name: "Digital Karvan",
  title: "Digital Karvan — Design, Build, Launch Digital Products",
  description:
    "Digital Karvan is a digital product agency. We design, build, and ship software, AI systems, data platforms, and brand identities that turn visitors into customers.",
  locale: "en_GB",
  email: "contact@digitalkarvan.com",
  phone: "+44 737 7259 354",
  ogImage: "/og-image.png", // 1200×630
  socials: [
    "https://www.linkedin.com/company/digitalkarvan",
    "https://x.com/digitalkarvan",
    "https://www.instagram.com/digitalkarvan",
    "https://www.facebook.com/digitalkarvan",
  ],
} as const;

/** Absolute URL helper — sitemaps and JSON-LD must use absolute URLs. */
export const abs = (path = "/") => new URL(path, SITE.url).toString();

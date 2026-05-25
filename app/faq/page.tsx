import type { Metadata } from "next";
import FAQ from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about Digital Karvan's web design, pricing, timelines, IP ownership, and process.",
  alternates: { canonical: "https://digitalkarvan.com/faq" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://digitalkarvan.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FAQ",
      item: "https://digitalkarvan.com/faq",
    },
  ],
};

export default function FAQPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-bg-secondary border-b border-border-subtle py-3"
      >
        <div className="max-w-3xl mx-auto px-5 text-sm text-text-muted flex items-center gap-2">
          <a
            href="/"
            className="hover:text-text-primary transition-colors"
          >
            Home
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-text-primary">
            FAQ
          </span>
        </div>
      </nav>

      <FAQ />
    </main>
  );
}

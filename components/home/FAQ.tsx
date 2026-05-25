"use client";

const faqs = [
  {
    q: "What does a typical project cost?",
    a: "We tailor pricing to your project scope. A professional website typically starts from £5,000, with branding projects from £2,500. Complex web applications and enterprise projects range from £15,000–£50,000+. We always provide a detailed, transparent quote before any work begins — no hidden fees.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines depend on complexity. A brochure website: 4–6 weeks. A brand identity project: 3–5 weeks. A custom web application: 8–16 weeks. We agree a detailed timeline before kick-off and keep you updated throughout.",
  },
  {
    q: "Who owns the IP and code after delivery?",
    a: "You do. Once the project is paid in full, you own 100% of the deliverables — code, designs, brand assets, everything. We retain no licensing rights over work we produce for you.",
  },
  {
    q: "Do you offer fixed-price or time-and-materials contracts?",
    a: "Both. Most projects are scoped and quoted at a fixed price so you know exactly what you'll pay. For ongoing or evolving projects, we offer T&M engagements with transparent monthly reporting.",
  },
  {
    q: "What tech stack do you use?",
    a: "We choose technology based on your project's needs. For websites and web apps, we typically use Next.js, React, and Tailwind CSS. For branding, we deliver print-ready vector assets in Figma, Adobe Illustrator, and PDF. We always recommend the right tool for the job — not the one we're comfortable with by default.",
  },
  {
    q: "What does your process look like?",
    a: "We follow five stages: Discovery → Design → Development → Testing → Launch. Every project starts with a discovery call to understand your goals, constraints, and audience. You'll receive a project proposal and timeline before we begin.",
  },
  {
    q: "How do you handle revisions?",
    a: "All projects include defined revision rounds — typically two rounds for design and one for development. We keep feedback structured and time-boxed to maintain momentum. Additional revisions beyond scope are quoted transparently.",
  },
  {
    q: "What happens after the website launches?",
    a: "We offer Website Maintenance & Support packages that cover updates, security monitoring, backups, performance checks, and priority bug fixes. We don't disappear post-launch — we're a long-term partner for your digital growth.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Frequently Asked Questions
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Everything you need to know
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Can&apos;t find an answer?{" "}
            <a
              href="mailto:hello@digitalkarvan.com"
              className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Email us at hello@digitalkarvan.com
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div>
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group border-b border-border-subtle py-5 first:border-t first:border-border-subtle"
            >
              <summary className="flex justify-between items-center cursor-pointer text-base font-semibold text-text-primary list-none gap-4 [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <span
                  className="shrink-0 w-6 h-6 rounded-full border border-border-default flex items-center justify-center text-text-muted text-sm transition-colors group-open:border-accent group-open:text-accent"
                  aria-hidden="true"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:block">−</span>
                </span>
              </summary>
              <div className="pt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Marquee from "@/components/ui/Marquee";

const partners = [
  "DocExtract",
  "VoiceAI Studios",
  "Bank of Khyber",
  "Smartflyer Travel",
  "OVB Holdings AG",
  "MediaGen Corp",
  "EduTech Institute",
  "Enterprise Sales Corp",
];

function PartnerLogo({ name }: { name: string }) {
  return (
    <div className="mx-5 sm:mx-8 flex items-center justify-center">
      <div className="flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-border-subtle bg-bg-card">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-bg-elevated border border-border-default shrink-0" />
        <span className="text-xs sm:text-sm font-medium text-text-muted whitespace-nowrap">{name}</span>
      </div>
    </div>
  );
}

export default function PartnersMarquee() {
  return (
    <section className="py-10 md:py-14 bg-bg-secondary border-y border-border-subtle overflow-hidden">
      <div className="mb-6 md:mb-8 text-center">
        <p className="text-xs font-medium text-text-muted uppercase tracking-widest">
          Trusted By
        </p>
      </div>
      <Marquee>
        {partners.map((name) => (
          <PartnerLogo key={name} name={name} />
        ))}
      </Marquee>
    </section>
  );
}

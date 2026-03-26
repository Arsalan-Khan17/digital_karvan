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
    <div className="mx-8 flex items-center justify-center">
      <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-border-subtle bg-bg-card">
        <div className="w-6 h-6 rounded bg-bg-elevated border border-border-default" />
        <span className="text-sm font-medium text-text-muted whitespace-nowrap">{name}</span>
      </div>
    </div>
  );
}

export default function PartnersMarquee() {
  return (
    <section className="py-16 bg-bg-secondary border-y border-border-subtle overflow-hidden">
      <div className="mb-8 text-center">
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

"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const partners = [
  { name: "DocExtract", abbrev: "DE", permissionGranted: true, href: null as string | null },
  { name: "VoiceAI Studios", abbrev: "VA", permissionGranted: true, href: null as string | null },
  { name: "Bank of Khyber", abbrev: "BOK", permissionGranted: true, href: null as string | null },
  { name: "Smartflyer Travel", abbrev: "SF", permissionGranted: true, href: null as string | null },
  { name: "OVB Holdings AG", abbrev: "OVB", permissionGranted: true, href: null as string | null },
  { name: "MediaGen Corp", abbrev: "MG", permissionGranted: true, href: null as string | null },
  { name: "EduTech Institute", abbrev: "ETI", permissionGranted: true, href: null as string | null },
  { name: "Enterprise Sales Corp", abbrev: "ESC", permissionGranted: true, href: null as string | null },
];

const visiblePartners = partners.filter((p) => p.permissionGranted);

function Client({ name, abbrev }: { name: string; abbrev: string }) {
  return (
    <span className="client inline-flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">
      <span className="w-[34px] h-[34px] shrink-0 border border-border-default rounded-[9px] grid place-items-center text-[0.64rem] font-semibold text-accent-soft">
        {abbrev}
      </span>
      <b className="font-semibold text-[1.05rem] text-text-primary">{name}</b>
    </span>
  );
}

export default function PartnersMarquee() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      aria-label="Clients we've worked with"
      className="py-[clamp(3rem,7vh,5rem)] border-y border-border-subtle overflow-hidden bg-bg-primary"
    >
      <p className="text-center text-[0.74rem] font-semibold tracking-[0.28em] uppercase text-text-muted mb-9">
        Trusted by ambitious teams
      </p>

      {reduced ? (
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-5 px-6" aria-label="Client logos">
          {visiblePartners.map((p) => (
            <li key={p.name}>
              <Client name={p.name} abbrev={p.abbrev} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="overflow-hidden">
          <div className="dk-marquee gap-14">
            <ul className="flex items-center gap-14 pr-14" aria-label="Client logos">
              {visiblePartners.map((p) => (
                <li key={p.name}>
                  <Client name={p.name} abbrev={p.abbrev} />
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-14 pr-14" aria-hidden="true">
              {visiblePartners.map((p) => (
                <li key={`dup-${p.name}`}>
                  <Client name={p.name} abbrev={p.abbrev} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

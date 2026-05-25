"use client";

import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "DocExtract", abbrev: "DE", permissionGranted: true, href: null },
  { name: "VoiceAI Studios", abbrev: "VA", permissionGranted: true, href: null },
  { name: "Bank of Khyber", abbrev: "BOK", permissionGranted: true, href: null },
  { name: "Smartflyer Travel", abbrev: "SF", permissionGranted: true, href: null },
  { name: "OVB Holdings AG", abbrev: "OVB", permissionGranted: true, href: null },
  { name: "MediaGen Corp", abbrev: "MG", permissionGranted: true, href: null },
  { name: "EduTech Institute", abbrev: "ETI", permissionGranted: true, href: null },
  { name: "Enterprise Sales Corp", abbrev: "ESC", permissionGranted: true, href: null },
];

const visiblePartners = partners.filter((p) => p.permissionGranted);

function LogoCard({ name, abbrev }: { name: string; abbrev: string }) {
  return (
    <div
      className="mx-4 sm:mx-6 flex items-center justify-center"
      style={{ filter: "grayscale(1)", transition: "filter 0.3s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0) brightness(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(1)")}
    >
      <div className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl border border-border-subtle bg-bg-card min-w-[120px]">
        <span className="text-lg font-black text-text-primary tracking-tight leading-none">{abbrev}</span>
        <span className="text-[10px] text-text-muted whitespace-nowrap font-medium tracking-wide">{name}</span>
      </div>
    </div>
  );
}

export default function PartnersMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const animationStyle = {
    animationPlayState: isPaused ? "paused" : "running",
  } as React.CSSProperties;

  const logoList = (ariaHidden?: boolean) => (
    <ul
      role="list"
      aria-label={ariaHidden ? undefined : "Client logos"}
      aria-hidden={ariaHidden ? true : undefined}
      className="flex items-center"
    >
      {visiblePartners.map(({ name, abbrev, href }) => (
        <li key={name}>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="inline-flex min-w-[44px] min-h-[44px] items-center justify-center"
            >
              <LogoCard name={name} abbrev={abbrev} />
            </a>
          ) : (
            <LogoCard name={name} abbrev={abbrev} />
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Clients we've worked with"
      className="py-10 md:py-14 bg-bg-secondary border-y border-border-subtle overflow-hidden"
    >
      <div className="mb-6 md:mb-8 text-center">
        <p className="text-xs font-medium text-text-muted uppercase tracking-widest">
          Trusted By
        </p>
      </div>

      {reducedMotion ? (
        <div className="flex justify-center">
          {logoList()}
        </div>
      ) : (
        <div
          className="flex"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex animate-marquee" style={animationStyle}>
            {logoList()}
          </div>
          <div className="flex animate-marquee" style={animationStyle} aria-hidden="true">
            {logoList(true)}
          </div>
        </div>
      )}
    </section>
  );
}

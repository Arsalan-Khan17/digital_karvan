"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const pad = (n: number) => String(n).padStart(3, "0");

// Reference copy as sensible defaults — shaped so it can be lifted into the CMS later.
interface Phase {
  title: string;
  body: string;
  feat: string[];
  visualTag: string;
  visualSub: string;
}

const PHASES: Phase[] = [
  {
    title: "Discover & Strategy",
    body: "We embed in your world — your goals, your audience, your constraints — and shape a clear plan before a single pixel is placed. Less guesswork, more direction.",
    feat: ["Research", "Goals", "Audit", "Roadmap"],
    visualTag: "Strategy",
    visualSub: "discover · align · plan",
  },
  {
    title: "Design & Prototype",
    body: "Brand, experience, and interface design brought to life as interactive prototypes you can actually feel — refined together until it's unmistakably right.",
    feat: ["UX", "UI Design", "Branding", "Prototype"],
    visualTag: "Design",
    visualSub: "ux · ui · prototype",
  },
  {
    title: "Build & Engineer",
    body: "Production-grade, performant code — accessible, responsive, and built to scale. The same rigour on a brochure site as on a complex platform.",
    feat: ["Frontend", "Backend", "CMS", "QA"],
    visualTag: "Build",
    visualSub: "engineer · test · ship",
  },
  {
    title: "Launch & Grow",
    body: "We ship, measure, and iterate — turning a launch into lasting momentum. Your success is the only metric that matters to us.",
    feat: ["Deploy", "Analytics", "SEO", "Iterate"],
    visualTag: "Grow",
    visualSub: "launch · measure · iterate",
  },
];

function Glyph({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <svg className="glyph" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="var(--accent)" strokeWidth="2" />
          <circle cx="20" cy="20" r="7" stroke="var(--accent-soft)" strokeWidth="2" />
          <circle cx="20" cy="20" r="2.5" fill="var(--accent-bright)" />
        </svg>
      );
    case 1:
      return (
        <svg className="glyph" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="6" y="6" width="28" height="20" rx="3" stroke="var(--accent)" strokeWidth="2" />
          <rect x="11" y="11" width="11" height="3" rx="1.5" fill="var(--accent-bright)" />
          <rect x="11" y="17" width="18" height="2.4" rx="1.2" fill="var(--accent-soft)" />
          <rect x="14" y="30" width="12" height="3" rx="1.5" fill="var(--accent)" />
        </svg>
      );
    case 2:
      return (
        <svg className="glyph" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M15 13 L8 20 L15 27" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25 13 L32 20 L25 27" stroke="var(--accent-soft)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="22" y1="10" x2="18" y2="30" stroke="var(--accent-bright)" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className="glyph" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 6 C26 12 28 20 20 34 C12 20 14 12 20 6 Z" stroke="var(--accent)" strokeWidth="2" fill="none" />
          <circle cx="20" cy="17" r="3.4" fill="var(--accent-bright)" />
          <path d="M14 30 l-3 5 M26 30 l3 5" stroke="var(--accent-soft)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function Process() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Drive the active phase from a centered viewport band (reference: rootMargin -45%).
  useEffect(() => {
    if (reduced) return;
    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!steps.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const idx = steps.indexOf(en.target as HTMLDivElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [reduced]);

  // Entrance reveal for the header + sticky panel.
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".proc-head > div > *, .proc-head .ix", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".proc-head", start: "top 85%", once: true },
      });
      gsap.from(".proc-sticky", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proc-sticky", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="process" id="process">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="proc-head">
          <div>
            <span className="eyebrow">How We Work</span>
            <h2 className="sec-title text-[clamp(2rem,4.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-text-primary mt-6">
              From idea to <em>impact</em>, in four phases.
            </h2>
          </div>
          <span className="ix">process_ 001 / 004</span>
        </div>

        <div className="proc-body">
          {/* Sticky visual side */}
          <div className="proc-sticky">
            <div className="proc-index">
              <span className="big">{String(active + 1).padStart(2, "0")}</span>
              <span className="meta">phase_ {pad(active + 1)} / {pad(PHASES.length)}</span>
            </div>
            <div className="proc-visual">
              {PHASES.map((p, i) => (
                <div key={p.title} className={`pv${i === active ? " active" : ""}`}>
                  <Glyph i={i} />
                  <div className="pv-tag">{p.visualTag}</div>
                  <div className="pv-sub">{p.visualSub}</div>
                </div>
              ))}
            </div>
            <div className="proc-rail">
              <span className="fill" style={{ width: `${((active + 1) / PHASES.length) * 100}%` }} />
            </div>
          </div>

          {/* Stepping content side */}
          <div className="proc-steps">
            {PHASES.map((p, i) => (
              <div
                key={p.title}
                ref={(el) => { stepRefs.current[i] = el; }}
                className={`proc-step${reduced || i === active ? " active" : ""}`}
              >
                <div className="si">phase_ {pad(i + 1)} / {pad(PHASES.length)}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="feat">
                  {p.feat.map((f) => (
                    <span key={f} className="tag">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

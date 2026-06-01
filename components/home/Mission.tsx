"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const highlights = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 3, suffix: "+", label: "Years of Craft" },
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statNumRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return; // static, fully-visible (JSX keeps the final stat values)

      // Motion users see the count-up from 0 (set pre-paint to avoid a flash);
      // reduced-motion users keep the final value rendered in JSX.
      statNumRefs.current.forEach((el) => {
        if (el) el.textContent = "0";
      });

      const reveal = (target: gsap.TweenTarget, start = "top 84%", extra: gsap.TweenVars = {}) =>
        gsap.from(target, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: target as Element, start, once: true },
          ...extra,
        });

      // Left column reveals (heading handled by scramble below)
      reveal(".m-eyebrow");
      reveal(".m-mini", "top 86%", { stagger: 0.12 });
      // Right column reveals
      reveal(".m-lede");
      reveal(".m-body", "top 86%", { stagger: 0.12 });
      reveal(".m-cta");

      // Heading: text-decode / scramble reveal (preserves the accent <em>)
      if (headingRef.current) {
        const segs = Array.from(headingRef.current.querySelectorAll<HTMLElement>("[data-scramble]"));
        const texts = segs.map((s) => s.textContent || "");
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            segs.forEach((s, i) => {
              gsap.to(s, {
                duration: 1 + i * 0.2,
                ease: "none",
                scrambleText: { text: texts[i], chars: "01<>/#%&*", speed: 1 },
              });
            });
          },
        });
      }

      // Mini-stat counters
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          highlights.forEach((stat, i) => {
            const el = statNumRefs.current[i];
            if (!el) return;
            const counter = { val: 0 };
            gsap.to(counter, {
              val: stat.value,
              duration: 1.6,
              delay: i * 0.12,
              ease: "power2.out",
              onUpdate: () => { el.textContent = String(Math.round(counter.val)); },
            });
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="bg-bg-secondary border-y border-border-subtle py-[clamp(4.5rem,11vh,9rem)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-[clamp(2rem,5vw,5rem)] items-start">
          {/* Left */}
          <div>
            <span className="m-eyebrow eyebrow">Our Mission</span>
            <h2
              ref={headingRef}
              className="sec-title text-[clamp(2rem,4.4vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.02em] text-text-primary mt-6"
            >
              <span data-scramble>Building digital</span>{" "}
              <em data-scramble>excellence</em>
              <span data-scramble>, one project at a time.</span>
            </h2>

            <div ref={statsRef} className="flex flex-wrap gap-x-10 gap-y-6 mt-9">
              {highlights.map((stat, i) => (
                <div key={stat.label} className="m-mini">
                  <p className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-normal leading-none tracking-[-0.02em] text-text-primary tabular-nums">
                    <span ref={(el) => { statNumRefs.current[i] = el; }}>{stat.value}</span>
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="m-lede text-[clamp(1.45rem,2.4vw,2.1rem)] leading-[1.34] tracking-[-0.01em] text-text-primary">
              We believe exceptional digital experiences are built on a foundation of{" "}
              <em className="text-accent not-italic">trust, craftsmanship, and genuine partnership.</em>
            </p>
            <p className="m-body text-text-secondary text-[1.04rem] leading-[1.75] mt-7 max-w-[54ch]">
              We embed ourselves in each client&apos;s world — understanding their challenges, their audience, and
              the outcomes that actually matter — before a single line of code is written or a pixel placed.
            </p>
            <p className="m-body text-text-secondary text-[1.04rem] leading-[1.75] mt-5 max-w-[54ch]">
              Our team spans design, engineering, and strategy. We bring the same rigour to a two-page brochure
              site as we do to a complex enterprise platform. Because good work doesn&apos;t scale down — it
              either meets the standard or it doesn&apos;t.
            </p>
            <Link href="/about" className="m-cta btn mt-8">
              <span className="lbl">Our story &amp; values</span>
              <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

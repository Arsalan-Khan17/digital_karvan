"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useTheme } from "@/components/ThemeProvider";
import { useIntroReady } from "@/hooks/useIntroReady";
import { useMagnetic } from "@/hooks/useMagnetic";
import LaptopScene from "./LaptopScene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const stats = [
  { value: 50, suffix: "+", label: "Projects" },
  { value: 20, suffix: "+", label: "Clients" },
  { value: 3, suffix: "+", label: "Years" },
  { value: 2, suffix: "", label: "Offices" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const artWrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statNumRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const cta1 = useMagnetic<HTMLAnchorElement>(0.3);
  const cta2 = useMagnetic<HTMLAnchorElement>(0.3);

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ready = useIntroReady();

  // ── Copy / headline intro (synced to the preloader curtain) + scroll-exit ──
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const copyBits = [pillRef.current, leadRef.current, actionsRef.current];

      if (reduced) return; // static, fully-visible

      if (!ready) {
        // Hide until the curtain lifts (runs in useLayoutEffect → no flash).
        gsap.set(headlineRef.current, { autoAlpha: 0 });
        gsap.set(copyBits, { opacity: 0, y: 24 });
        return;
      }

      // Split the headline into masked lines (auto-fits the column at any size)
      // and rise them into view; copy fades up just after.
      const split = SplitText.create(headlineRef.current, { type: "lines", mask: "lines" });
      gsap.set(headlineRef.current, { autoAlpha: 1 });
      gsap.fromTo(split.lines, { yPercent: 120 }, { yPercent: 0, duration: 1.05, ease: "expo.out", stagger: 0.09 });
      gsap.fromTo(
        copyBits,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.35 }
      );

      // Scroll-exit parallax: the scene drifts/scales/fades, copy lifts slightly.
      const st = {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true as const,
      };
      gsap.to(artWrapRef.current, { yPercent: -14, scale: 0.94, opacity: 0.55, ease: "none", scrollTrigger: st });
      gsap.to(copyRef.current, { yPercent: -6, ease: "none", scrollTrigger: st });
      gsap.to(gridRef.current, { yPercent: 6, ease: "none", scrollTrigger: st });
      gsap.to(glowRef.current, { yPercent: 16, ease: "none", scrollTrigger: st });
    },
    { scope: containerRef, dependencies: [ready] }
  );

  // ── Stat counters (count up when in view; reduced motion shows finals) ──
  useEffect(() => {
    const container = statsRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (animated || !entries[0].isIntersecting) return;
        animated = true;
        observer.disconnect();
        stats.forEach((stat, i) => {
          const el = statNumRefs.current[i];
          if (!el) return;
          const counter = { val: 0 };
          gsap.to(counter, {
            val: stat.value,
            duration: 1.6,
            delay: i * 0.12,
            ease: "power2.out",
            onUpdate() {
              el.textContent = String(Math.round(counter.val));
            },
          });
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Recompute pinned/scrubbed triggers once the hero scene is laid out.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden pt-24 pb-8 lg:pt-28 lg:pb-10 bg-bg-primary"
    >
      {/* Background: subdued Three.js backdrop + grid + brand glow */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-45">
          <HeroScene isDark={isDark} />
        </div>
        <div ref={gridRef} className="hero-grid" />
        <div
          ref={glowRef}
          className="absolute -right-[6vw] -top-[8vw] w-[56vw] h-[56vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(225,29,72,0.30), rgba(225,29,72,0) 62%)",
            filter: "blur(18px)",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center w-full">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-center">
        {/* Copy */}
        <div ref={copyRef} className="order-2 lg:order-1">
          <span
            ref={pillRef}
            className="inline-flex items-center gap-2.5 border border-border-default rounded-full px-3.5 py-1.5 text-sm text-text-secondary mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </span>

          <h1
            ref={headlineRef}
            className="hero-headline font-normal leading-[1.06] tracking-[-0.02em] text-[clamp(2.3rem,5vw,4.5rem)] text-text-primary max-w-[15ch]"
          >
            We design &amp; build digital products that grow <em>ambitious</em> businesses.
          </h1>

          <p ref={leadRef} className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-[46ch] mt-6">
            We partner with ambitious businesses — from startups to enterprise — to design and build websites,
            brand identities, and digital products that convert visitors into customers and ideas into growth.
          </p>

          <div ref={actionsRef} className="flex flex-wrap gap-3 mt-8">
            <Link ref={cta1} href="/contact" className="btn btn--solid">
              <span className="lbl">Get a Free Quote</span>
              <span className="arr">→</span>
            </Link>
            <Link ref={cta2} href="/portfolio" className="btn">
              <span className="lbl">View Our Work</span>
            </Link>
          </div>
        </div>

        {/* Animated scene */}
        <div ref={artWrapRef} className="order-1 lg:order-2 w-full max-w-[420px] sm:max-w-[460px] mx-auto lg:max-w-none">
          <LaptopScene />
        </div>
        </div>
      </div>

      {/* Stats strip */}
      <div
        ref={statsRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-10 lg:mt-6 shrink-0"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border-subtle">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="py-4 sm:py-6 pr-4 border-r border-border-subtle last:border-r-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r [&:nth-child(even)]:pl-5 sm:[&:nth-child(3)]:pl-5"
            >
              <p className="text-[clamp(2rem,4vw,3.2rem)] font-normal leading-none tracking-[-0.02em] text-text-primary tabular-nums">
                <span ref={(el) => { statNumRefs.current[i] = el; }}>{stat.value}</span>
                <span className="text-accent">{stat.suffix}</span>
              </p>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-text-muted mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

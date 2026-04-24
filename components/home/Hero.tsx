"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, ScrambleTextPlugin, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const HEADLINE = "Where Integrity, Excellence, and Collaboration Drive Digital Innovation.";

const stats = [
  { value: 50, suffix: "+", label: "Projects" },
  { value: 20, suffix: "+", label: "Clients" },
  { value: 3,  suffix: "+", label: "Years" },
  { value: 2,  suffix: "",  label: "Offices" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const statNumRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useGSAP(() => {
    if (!headlineRef.current) return;

    const split = SplitText.create(headlineRef.current, {
      type: "words,chars",
      mask: "chars",
    });

    const tl = gsap.timeline({ defaults: { ease: "back.out(1.6)" } });

    // Badge: scramble in
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, scale: 0.7, rotationX: -40 },
      { opacity: 1, scale: 1, rotationX: 0, duration: 0.7, ease: "back.out(2)" },
      0
    );

    // Headline chars fly in with 3-axis spin
    tl.from(
      split.chars,
      {
        opacity: 0,
        y: 80,
        rotationX: -90,
        scaleX: 0.4,
        transformOrigin: "50% 0%",
        duration: 0.55,
        stagger: { amount: 0.9, from: "start" },
        ease: "back.out(1.8)",
      },
      0.15
    );

    // Subtitle wipe-in from left
    tl.fromTo(
      subtitleRef.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.8, ease: "power4.out" },
      0.8
    );

    // CTA buttons bounce up
    if (ctaRef.current) {
      tl.from(
        ctaRef.current.children,
        {
          opacity: 0,
          y: 40,
          scale: 0.85,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(2)",
        },
        1.1
      );
    }

    // Stats counter cascade
    tl.from(
      statsRef.current,
      { opacity: 0, y: 30, duration: 0.5, ease: "power3.out" },
      1.35
    ).add(() => {
      stats.forEach((stat, i) => {
        const el = statNumRefs.current[i];
        if (!el) return;
        gsap.to({ val: 0 }, {
          val: stat.value,
          duration: 1.8,
          delay: i * 0.15,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = String(Math.round(this.targets()[0].val));
          },
        });
      });
    }, 1.35);

    // Scroll indicator bob
    tl.from(
      scrollRef.current,
      { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" },
      1.9
    );
    gsap.to(scrollRef.current, {
      y: 8,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.5,
    });

    // Parallax on scroll
    gsap.to(headlineRef.current, {
      yPercent: -25,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

  }, { scope: containerRef });

  // Magnetic hover on CTA buttons
  useEffect(() => {
    const btns = ctaRef.current?.querySelectorAll("a, button");
    if (!btns) return;
    const cleanups: (() => void)[] = [];

    btns.forEach((btn) => {
      const el = btn as HTMLElement;
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;
        gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 lg:pt-20 bg-bg-primary"
    >
      <HeroScene isDark={isDark} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 60%, transparent 100%)"
            : "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.30) 55%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(225,29,72,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 text-center">

        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-default bg-bg-card text-text-secondary text-xs sm:text-sm mb-9 md:mb-12 opacity-0"
          style={{ transformOrigin: "center" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
          Digital Agency — UK &amp; UAE
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-[2.1rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.12] text-text-primary"
          style={{ perspective: "600px" }}
        >
          {HEADLINE}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-7 md:mt-9 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed opacity-0"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          We partner with ambitious businesses — from startups to enterprise — to design
          and build websites, brand identities, and digital products that convert visitors
          into customers and ideas into growth.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Button variant="primary" size="lg" href="/contact">
            Get a Free Quote
          </Button>
          <Button variant="ghost" size="lg" href="/portfolio">
            View Our Work
          </Button>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-14 flex items-center justify-center flex-wrap opacity-0"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <div className="w-px h-7 bg-border-default mx-6 sm:mx-10 shrink-0 hidden sm:block" />
              )}
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-text-primary tabular-nums">
                  <span ref={(el) => { statNumRefs.current[i] = el; }}>0</span>
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="text-xs text-text-muted mt-0.5 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[9px] text-text-muted uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown size={14} className="text-text-muted" />
      </div>
    </section>
  );
}

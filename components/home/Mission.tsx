"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const highlights = [
  { value: 50, suffix: "+", label: "Projects Delivered", description: "Across web, branding, AI, and enterprise data" },
  { value: 20, suffix: "+", label: "Happy Clients", description: "From funded startups to FTSE-listed institutions" },
  { value: 3,  suffix: "+", label: "Years of Craft", description: "Consistent delivery since our first engagement" },
];

export default function Mission() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const statNumRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardsRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Left column — reveal with clip
    gsap.fromTo(
      leftRef.current,
      { clipPath: "inset(0 0 100% 0)", opacity: 1 },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 80%", once: true },
      }
    );

    // Heading chars stagger
    if (headingRef.current) {
      const split = SplitText.create(headingRef.current, { type: "words", mask: "words" });
      gsap.from(split.words, {
        y: "100%",
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 82%", once: true },
      });
    }

    // Body paragraphs
    const paras = bodyRef.current?.querySelectorAll("p");
    if (paras) {
      gsap.from(Array.from(paras), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: bodyRef.current, start: "top 82%", once: true },
      });
    }

    // Stats counter
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        highlights.forEach((stat, i) => {
          const el = statNumRefs.current[i];
          if (!el) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 1.8,
            delay: i * 0.12,
            ease: "power2.out",
            onUpdate: () => { el.textContent = String(Math.round(obj.val)); },
            onComplete: () => { el.textContent = String(stat.value); },
          });
        });
      },
    });

    // Right cards — fly in with 3D rotation
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.from(Array.from(cards), {
        opacity: 0,
        y: 60,
        rotationX: 25,
        rotationY: -15,
        scale: 0.9,
        transformOrigin: "50% 50% -80px",
        duration: 0.8,
        stagger: { amount: 0.4, from: "start" },
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: cardsRef.current, start: "top 78%", once: true },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-bg-secondary relative overflow-hidden">
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(225,29,72,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div ref={leftRef} style={{ clipPath: "inset(0 0 100% 0)" }}>
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
              Our Mission
            </p>
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight"
              style={{ perspective: "500px" }}
            >
              Building Digital Excellence,{" "}
              <span className="text-accent">One Project</span> at a Time
            </h2>

            <div ref={bodyRef}>
              <p className="mt-6 text-text-secondary leading-relaxed text-base sm:text-lg">
                At Digital Karvan, we believe exceptional digital experiences are built on a
                foundation of trust, craftsmanship, and genuine partnership. We embed ourselves
                in each client&apos;s world — understanding their challenges, their audience,
                and the outcomes that actually matter — before a single line of code is written
                or a pixel placed.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed text-sm sm:text-base">
                Our team spans design, engineering, and strategy. We bring the same level of
                rigour and dedication to a two-page brochure site as we do to a complex
                enterprise platform. Because good work doesn&apos;t scale down — it either
                meets the standard or it doesn&apos;t.
              </p>
            </div>

            <div ref={statsRef} className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              {highlights.map((stat, i) => (
                <div key={stat.label} className="group">
                  <p className="text-2xl sm:text-3xl font-bold text-text-primary tabular-nums">
                    <span ref={(el) => { statNumRefs.current[i] = el; }}>0</span>
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-text-primary mt-1">{stat.label}</p>
                  <p className="text-xs text-text-muted mt-0.5 hidden sm:block">{stat.description}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-sm text-text-secondary hover:text-text-primary transition-colors group"
            >
              Our story &amp; values
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right — visual cards */}
          <div>
            <div ref={cardsRef} className="grid grid-cols-2 gap-4" style={{ perspective: "800px" }}>
              {/* Large top card */}
              <div className="col-span-2 p-6 rounded-2xl bg-bg-card border border-border-subtle glow-card transition-all duration-300 group">
                <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">What we do</p>
                <p className="text-text-primary font-semibold leading-snug">
                  End-to-end digital solutions — from brand identity to complex web applications.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Web Development", "Branding", "UI/UX Design", "AI & Data", "Maintenance"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-bg-elevated border border-border-default text-text-secondary group-hover:border-accent/20 group-hover:text-text-primary transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom-left */}
              <div className="p-5 rounded-2xl bg-bg-elevated border border-border-subtle flex flex-col justify-between min-h-[140px] glow-card transition-all duration-300">
                <p className="text-xs text-text-muted">Offices</p>
                <div>
                  <p className="text-sm font-semibold text-text-primary">United Kingdom</p>
                  <p className="text-xs text-text-muted mt-0.5">Coventry, England</p>
                  <p className="text-sm font-semibold text-text-primary mt-3">UAE</p>
                  <p className="text-xs text-text-muted mt-0.5">Dubai Region</p>
                </div>
              </div>

              {/* Bottom-right — accent card */}
              <div className="relative p-5 rounded-2xl bg-accent/10 border border-accent/20 flex flex-col justify-between min-h-[140px] overflow-hidden group">
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                <p className="relative text-xs text-text-muted">Response time</p>
                <div className="relative">
                  <p className="text-4xl font-bold text-accent" style={{ textShadow: "0 0 20px rgba(225,29,72,0.4)" }}>24h</p>
                  <p className="text-xs text-text-secondary mt-1">
                    We respond to every enquiry within one business day, guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

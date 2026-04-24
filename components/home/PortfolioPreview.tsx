"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const featured = projects.slice(0, 6);

export default function PortfolioPreview() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Heading (above the pinned section — standard reveal)
    const h2 = headingRef.current?.querySelector("h2");
    if (h2) {
      const split = SplitText.create(h2, { type: "words", mask: "words" });
      gsap.from(split.words, {
        y: "110%", opacity: 0, duration: 0.65, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: h2, start: "top 86%", once: true },
      });
    }

    const mm = gsap.matchMedia();

    // ── Desktop: snapping full-screen panels ────────────────────
    mm.add("(min-width: 768px)", () => {
      const track   = trackRef.current;
      const section = sectionRef.current;
      const dot     = indicatorRef.current;
      if (!track || !section) return;

      const panelCount = featured.length;
      const slideTotal = track.clientHeight - window.innerHeight;

      // Slide track upward — one 100vh step per panel
      const scrollTween = gsap.to(track, {
        y: -slideTotal,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          end: () => "+=" + slideTotal,
          snap: {
            snapTo: 1 / (panelCount - 1),
            duration: { min: 0.25, max: 0.5 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
          // Animate the progress dot
          onUpdate: (self) => {
            if (dot) gsap.set(dot, { top: `${self.progress * 100}%` });
          },
        },
      });

      // Per-panel: decorative number parallax counter-moves
      const panels = track.querySelectorAll(".portfolio-panel");
      panels.forEach((panel, i) => {
        const num = panel.querySelector(".deco-number");
        if (!num) return;
        gsap.to(num, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            containerAnimation: scrollTween,
            trigger: panel,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });

      return () => {};
    });

    // ── Mobile: stagger reveal grid ─────────────────────────────
    mm.add("(max-width: 767px)", () => {
      const cards = sectionRef.current?.querySelectorAll(".mobile-card");
      if (cards) {
        gsap.from(Array.from(cards), {
          opacity: 0, y: 50, scale: 0.95,
          duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-bg-secondary">

      {/* ── Section label + link (always visible, above pin) ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-8">
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Our Work</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary" style={{ overflow: "hidden" }}>
              Selected Work
            </h2>
          </div>
          <Link href="/portfolio" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group shrink-0">
            Full portfolio <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Mobile grid ─────────────────────────────────────── */}
      <div className="md:hidden px-5 sm:px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {featured.map((p, i) => (
          <Link key={p.id} href={`/portfolio/${p.slug}`} className="mobile-card block group">
            <div className="rounded-2xl overflow-hidden bg-bg-card border border-border-subtle glow-card">
              <div className={`aspect-video bg-gradient-to-br ${p.imageGradient} relative`}>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 text-white text-xs font-medium">View <ArrowUpRight size={13}/></span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1.5 mb-2">{p.categories.slice(0, 2).map(c => <Badge key={c}>{c}</Badge>)}</div>
                <h3 className="font-semibold text-text-primary text-sm leading-snug">{p.title}</h3>
                <p className="text-xs text-text-muted mt-1">{p.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Desktop: pinned full-screen showcase ─────────────── */}
      <div className="hidden md:block" style={{ height: "100vh", overflow: "hidden", position: "relative" }}>

        {/* Progress indicator — thin line + scrubbing dot on the right */}
        <div className="absolute right-6 lg:right-8 top-[10%] bottom-[10%] z-30 flex flex-col items-center pointer-events-none">
          <div className="relative flex-1 w-px bg-white/10">
            <div
              ref={indicatorRef}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white"
              style={{ top: "0%", boxShadow: "0 0 8px 2px rgba(255,255,255,0.6)", transform: "translateX(-50%)" }}
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {featured.map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
            ))}
          </div>
        </div>

        {/* Sliding track — 6 × 100vh panels stacked */}
        <div
          ref={trackRef}
          style={{ height: `${featured.length * 100}vh` }}
        >
          {featured.map((p, i) => (
            <div
              key={p.id}
              className="portfolio-panel relative overflow-hidden"
              style={{ height: "100vh" }}
            >
              {/* Full-bleed gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${p.imageGradient}`} />

              {/* Dark overlay for legibility */}
              <div className="absolute inset-0 bg-black/72" />

              {/* Giant decorative number — slow parallax target */}
              <div
                className="deco-number absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
                aria-hidden="true"
                style={{
                  fontSize: "clamp(10rem, 22vw, 20rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.035)",
                  letterSpacing: "-0.05em",
                  right: "-2vw",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Rotating accent ring */}
              <div
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  width: "min(55vw, 55vh)",
                  height: "min(55vw, 55vh)",
                  transform: "translate(-50%, -50%)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "50%",
                  animation: `spin ${20 + i * 4}s linear infinite`,
                }}
                aria-hidden="true"
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{ background: "rgba(225,29,72,0.7)", boxShadow: "0 0 10px 3px rgba(225,29,72,0.5)" }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center px-8 sm:px-12 lg:px-16 max-w-6xl mx-auto">
                <div className="max-w-xl">

                  {/* Index + category row */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-bold text-white/30 tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-white/10 max-w-[60px]" />
                    <div className="flex flex-wrap gap-2">
                      {p.categories.map(c => (
                        <span key={c} className="text-xs font-medium text-white/50 uppercase tracking-widest">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-white leading-[1.08] mb-5"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                    {p.description}
                  </p>

                  {/* Metrics row */}
                  {p.metrics?.length > 0 && (
                    <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
                      {p.metrics.slice(0, 3).map(m => (
                        <div key={m.label}>
                          <p className="text-lg font-bold text-white tabular-nums">{m.value}</p>
                          <p className="text-xs text-white/35 mt-0.5 leading-snug max-w-[120px]">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="inline-flex items-center gap-2.5 text-sm font-medium text-white border border-white/25 hover:border-white/60 hover:bg-white/8 rounded-full px-6 py-3 transition-all duration-250 group"
                  >
                    View Case Study
                    <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Bottom bar: date + tech stack */}
              <div className="absolute bottom-0 left-0 right-0 z-10 px-8 sm:px-12 lg:px-16 pb-8 flex items-end justify-between">
                <p className="text-xs text-white/25 max-w-xl mx-auto">{p.date}</p>
                <div className="flex flex-wrap gap-2 justify-end max-w-xs">
                  {p.technologies?.slice(0, 4).map(t => (
                    <span key={t} className="text-[10px] text-white/30 border border-white/10 rounded px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

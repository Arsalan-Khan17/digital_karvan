"use client";

import { useRef } from "react";
import Link from "next/link";
import { Monitor, Palette, Shield, Lightbulb, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import TiltCard from "@/components/ui/TiltCard";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const iconMap: Record<string, React.ReactNode> = {
  Monitor:    <Monitor size={22} />,
  Palette:    <Palette size={22} />,
  Shield:     <Shield size={22} />,
  Lightbulb:  <Lightbulb size={22} />,
};

const featureLimit = 3;

const cardAccents = [
  "group-hover:bg-rose-500/[0.06]",
  "group-hover:bg-violet-500/[0.05]",
  "group-hover:bg-blue-500/[0.04]",
  "group-hover:bg-rose-500/[0.06]",
];

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const ring2Ref   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Heading reveal ──────────────────────────────────────────
    if (headingRef.current) {
      const h2   = headingRef.current.querySelector("h2");
      const meta = headingRef.current.querySelector("p");

      if (h2) {
        const split = SplitText.create(h2, { type: "words", mask: "words" });
        gsap.from(split.words, {
          y: "110%",
          opacity: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: h2, start: "top 87%", once: true },
        });
      }
      if (meta) {
        gsap.from(meta, {
          opacity: 0, y: 18, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 87%", once: true },
        });
      }
    }

    // ── Card flip-in ─────────────────────────────────────────────
    // Each card flips in around its left edge (rotationY 90 → 0)
    if (gridRef.current) {
      const cards = Array.from(gridRef.current.querySelectorAll(".service-card"));

      gsap.set(cards, {
        opacity: 0,
        rotationY: 90,
        transformOrigin: "left center",
        transformPerspective: 900,
      });

      ScrollTrigger.batch(cards, {
        start: "top 86%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            rotationY: 0,
            duration: 0.75,
            stagger: 0.13,
            ease: "back.out(1.3)",
          });
        },
      });

      // Icon spin-in on card entry + continuous idle rotation
      const icons = Array.from(gridRef.current.querySelectorAll(".service-icon"));
      icons.forEach((icon, i) => {
        const el = icon as HTMLElement;

        // Spin 360 when card enters
        ScrollTrigger.create({
          trigger: cards[i] as Element,
          start: "top 86%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { rotation: -180, scale: 0.5, opacity: 0 },
              {
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 0.7,
                delay: i * 0.13 + 0.2,
                ease: "back.out(1.8)",
              }
            );
            // Idle slow rotation after entry
            gsap.to(el, {
              rotation: 360,
              duration: 18 + i * 3,
              repeat: -1,
              ease: "none",
              delay: i * 0.13 + 1,
            });
          },
        });

        // Hover: spin faster
        const parent = el.closest(".service-card-inner") as HTMLElement;
        if (parent) {
          parent.addEventListener("mouseenter", () => {
            gsap.to(el, { rotation: "+=360", duration: 0.55, ease: "power2.out" });
          });
        }
      });
    }

    // ── Large decorative ring — slow continuous spin ─────────────
    if (ringRef.current) {
      // Continuous rotation
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      // Parallax drift on scroll
      gsap.to(ringRef.current, {
        y: -120,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }

    // ── Inner ring — counter-rotate ───────────────────────────────
    if (ring2Ref.current) {
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-bg-primary relative overflow-hidden">

      {/* ── Decorative rotating rings ── */}
      <div
        className="absolute -top-40 -right-40 pointer-events-none"
        style={{ width: 600, height: 600 }}
        aria-hidden="true"
      >
        {/* Outer slow ring */}
        <div
          ref={ringRef}
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(225,29,72,0.12)",
            boxShadow: "0 0 60px rgba(225,29,72,0.04) inset",
          }}
        >
          {/* Bright arc segment */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent/70"
            style={{ boxShadow: "0 0 12px 4px rgba(225,29,72,0.5)" }}
          />
        </div>

        {/* Inner counter-rotate ring */}
        <div
          ref={ring2Ref}
          className="absolute inset-[80px] rounded-full"
          style={{ border: "1px dashed rgba(225,29,72,0.08)" }}
        >
          <div
            className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-accent/40"
            style={{ boxShadow: "0 0 8px 3px rgba(225,29,72,0.3)" }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

        {/* ── Heading ── */}
        <div
          ref={headingRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14"
        >
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary"
              style={{ overflow: "hidden" }}
            >
              Our Services
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group shrink-0"
          >
            All services
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── Cards grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
          style={{ perspective: "1000px" }}
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              className="service-card h-full"
            >
              <TiltCard maxTilt={7} scale={1.015} className="h-full">
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <div
                    className={`service-card-inner group relative p-6 sm:p-7 rounded-2xl bg-bg-card border border-border-subtle overflow-hidden transition-colors duration-300 h-full flex flex-col glow-card`}
                  >
                    {/* Hover background fill */}
                    <div
                      className={`absolute inset-0 ${cardAccents[i % cardAccents.length]} transition-colors duration-500 pointer-events-none`}
                      aria-hidden="true"
                    />
                    {/* Top edge highlight */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Icon with orbit ring */}
                    <div className="relative w-14 h-14 mb-5 shrink-0 flex items-center justify-center">
                      {/* Orbit ring around icon */}
                      <div
                        className="absolute inset-0 rounded-full border border-dashed border-accent/20 group-hover:border-accent/40 transition-colors duration-300"
                        aria-hidden="true"
                      />
                      <div
                        className="service-icon w-11 h-11 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/[0.08] transition-colors duration-300"
                        style={{ opacity: 0 }}
                      >
                        {iconMap[service.icon]}
                      </div>
                    </div>

                    {/* Service number */}
                    <span className="absolute top-5 right-5 text-4xl font-black text-text-primary/[0.04] tabular-nums select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="relative text-base sm:text-lg font-semibold text-text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="relative text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                      {service.shortDescription}
                    </p>

                    {/* Feature tags */}
                    <div className="relative flex flex-wrap gap-2 mb-5">
                      {service.features.slice(0, featureLimit).map((feat) => (
                        <span
                          key={feat}
                          className="px-2.5 py-1 rounded-full text-xs bg-bg-primary border border-border-subtle text-text-muted"
                        >
                          {feat}
                        </span>
                      ))}
                      {service.features.length > featureLimit && (
                        <span className="px-2.5 py-1 rounded-full text-xs bg-bg-primary border border-border-subtle text-text-muted">
                          +{service.features.length - featureLimit} more
                        </span>
                      )}
                    </div>

                    <span className="relative flex items-center gap-2 text-sm text-text-secondary group-hover:text-accent transition-colors">
                      Learn more
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

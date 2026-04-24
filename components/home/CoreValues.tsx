"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "@/components/ui/TiltCard";

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We say what we mean and do what we say. No scope surprises, no hidden trade-offs, no over-promising. Our clients trust us precisely because we tell them the truth — even when it is not what they want to hear.",
    accent: "from-rose-500/20 to-transparent",
    color: "#e11d48",
  },
  {
    number: "02",
    title: "Excellence",
    description:
      "We hold ourselves to a standard that goes beyond the brief. Every component, every interaction, every line of copy is reviewed against the question: is this genuinely the best it can be? Mediocre work does not leave our studio.",
    accent: "from-violet-500/15 to-transparent",
    color: "#8b5cf6",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "The best digital work is co-created. We embed ourselves in our clients' thinking, share our process openly, and treat their business goals as our own. A great outcome is a shared outcome — we only succeed when you do.",
    accent: "from-rose-500/20 to-transparent",
    color: "#e11d48",
  },
];

export default function CoreValues() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const numberRefs  = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    // Heading split reveal
    if (headingRef.current) {
      const heading = headingRef.current.querySelector("h2");
      const sub     = headingRef.current.querySelector("p:last-child");
      const label   = headingRef.current.querySelector("p:first-child");

      if (heading) {
        const split = SplitText.create(heading, { type: "words,chars", mask: "chars" });
        gsap.from(split.chars, {
          y: "110%",
          opacity: 0,
          rotationZ: (i) => (i % 2 === 0 ? -8 : 8),
          duration: 0.6,
          stagger: { amount: 0.5, from: "start" },
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: heading, start: "top 84%", once: true },
        });
      }

      gsap.from([label, sub], {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 84%", once: true },
      });
    }

    // Cards: stagger in with 3-axis transform
    if (gridRef.current) {
      const cards = Array.from(gridRef.current.children);
      gsap.from(cards, {
        opacity: 0,
        y: 100,
        rotationY: 35,
        rotationX: 10,
        scale: 0.85,
        transformOrigin: "50% 100% -60px",
        duration: 0.9,
        stagger: { amount: 0.35, from: "start" },
        ease: "back.out(1.3)",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      });
    }

    // Big number count-up on scroll
    numberRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = i + 1;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1,
        delay: i * 0.2,
        ease: "power2.out",
        onUpdate: () => {
          if (el) el.textContent = String(Math.round(obj.val)).padStart(2, "0");
        },
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    });

    // Ambient parallax on the background blob
    const blob = sectionRef.current?.querySelector(".aurora-blob");
    if (blob) {
      gsap.to(blob, {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-bg-primary border-t border-border-subtle relative overflow-hidden"
    >
      <div
        className="aurora-blob absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(225,29,72,0.07) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-10 md:mb-14">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            What Guides Us
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary"
            style={{ perspective: "600px" }}
          >
            Our Core Values
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            Three principles that govern how we work, who we hire, and how we show up for our clients.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6" style={{ perspective: "1200px" }}>
          {values.map((value, i) => (
            <TiltCard key={value.number} maxTilt={8} scale={1.015}>
              <div className="group relative p-6 sm:p-8 rounded-2xl border border-border-subtle bg-bg-card overflow-hidden transition-all duration-300 glow-card h-full">
                <div
                  className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${value.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${value.color}44` }}
                  aria-hidden="true"
                />
                <span
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className="relative text-5xl sm:text-6xl font-bold text-text-primary/[0.07] block mb-5 tabular-nums"
                >
                  {value.number}
                </span>
                <h3 className="relative text-lg sm:text-xl font-semibold text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="relative text-text-secondary text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WORDS_TOP    = ["Design", "•", "Build", "•", "Launch", "•", "Grow", "•", "Iterate", "•"];
const WORDS_BOTTOM = ["Strategy", "•", "Identity", "•", "Code", "•", "Data", "•", "AI", "•"];

export default function ScrollMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef     = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Top row drifts left as you scroll down
    gsap.to(topRef.current, {
      xPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Bottom row drifts right (opposite)
    gsap.to(bottomRef.current, {
      xPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: sectionRef });

  const dupTop    = [...WORDS_TOP,    ...WORDS_TOP,    ...WORDS_TOP];
  const dupBottom = [...WORDS_BOTTOM, ...WORDS_BOTTOM, ...WORDS_BOTTOM];

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-14 bg-bg-primary border-y border-border-subtle overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top strip */}
      <div ref={topRef} className="flex gap-8 mb-3 will-change-transform">
        {dupTop.map((word, i) => (
          <span
            key={i}
            className={`text-5xl sm:text-6xl lg:text-7xl font-black whitespace-nowrap ${
              word === "•" ? "text-accent" : "text-text-primary/10"
            }`}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Bottom strip */}
      <div ref={bottomRef} className="flex gap-8 will-change-transform">
        {dupBottom.map((word, i) => (
          <span
            key={i}
            className={`text-5xl sm:text-6xl lg:text-7xl font-black whitespace-nowrap ${
              word === "•" ? "text-accent/60" : "text-text-primary/[0.07]"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}

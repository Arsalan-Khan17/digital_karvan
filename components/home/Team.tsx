"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { team } from "@/lib/data";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Heading SplitText reveal
    if (headingRef.current) {
      const h2 = headingRef.current.querySelector("h2");
      if (h2) {
        const split = SplitText.create(h2, { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          y: "100%",
          opacity: 0,
          rotationZ: (i) => (i % 3 === 0 ? -12 : i % 3 === 1 ? 8 : -6),
          duration: 0.55,
          stagger: { amount: 0.4, from: "center" },
          ease: "back.out(2)",
          scrollTrigger: { trigger: h2, start: "top 86%", once: true },
        });
      }
      gsap.from(headingRef.current.querySelectorAll("p"), {
        opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 86%", once: true },
      });
    }

    // Team cards — radial burst from center
    if (gridRef.current) {
      const cards = Array.from(gridRef.current.children);
      const cx = cards.length / 2;

      gsap.from(cards, {
        opacity: 0,
        scale: 0.5,
        rotationY: (i) => (i < cx ? -40 : 40),
        y: (i) => (i < cx ? -60 : 60),
        transformOrigin: "center 50%",
        duration: 0.8,
        stagger: { amount: 0.5, from: "center" },
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      });

      // Orbiting accent ring on each avatar
      const avatars = gridRef.current.querySelectorAll(".avatar-ring");
      avatars.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: 360,
          duration: 8 + i * 1.5,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-10 md:mb-14">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            The People Behind the Work
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary"
            style={{ perspective: "500px", overflow: "hidden" }}
          >
            Meet Our Team
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            A small, focused team of designers, engineers, and strategists who are genuinely
            invested in the success of every project they touch.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8"
          style={{ perspective: "1000px" }}
        >
          {team.map((member, i) => (
            <div key={member.id} className="text-center">
              {/* Avatar with orbiting ring */}
              <div className="relative mx-auto w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4">
                {/* Spinning conic ring */}
                <div
                  className="avatar-ring absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(225,29,72,0.6) 300deg, rgba(251,113,133,0.3) 330deg, transparent 360deg)",
                  }}
                />
                <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-bg-elevated to-bg-card border border-border-default flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-text-primary/30">
                    {member.name.charAt(0)}
                  </span>
                  {member.isFounder && (
                    <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-semibold whitespace-nowrap">
                      Co-Founder
                    </span>
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-text-primary text-sm sm:text-base">{member.name}</h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

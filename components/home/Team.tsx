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
            <div key={member.id} className="text-center flex flex-col items-center p-4 rounded-2xl bg-bg-card border border-border-subtle hover:border-border-default transition-colors">
              {/* Avatar with orbiting ring */}
              <div className="relative mx-auto w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4">
                {/* Spinning conic ring */}
                <div
                  className="avatar-ring absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(225,29,72,0.6) 300deg, rgba(251,113,133,0.3) 330deg, transparent 360deg)",
                  }}
                />
                <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-bg-elevated to-bg-card border border-border-default flex items-center justify-center overflow-hidden">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-xl sm:text-2xl font-bold text-text-primary/30">
                      {member.name.charAt(0)}
                    </span>
                  )}
                  {member.isFounder && (
                    <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-semibold whitespace-nowrap">
                      Co-Founder
                    </span>
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-text-primary text-sm sm:text-base">{member.name}</h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">{member.role}</p>
              <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-3">{member.bio}</p>
              {member.linkedin !== null && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex items-center gap-1 mt-3 text-xs text-text-muted hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 min-h-[44px] min-w-[44px] justify-center rounded-md"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

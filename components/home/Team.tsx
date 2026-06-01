"use client";

import { useRef } from "react";
import Image from "next/image";
import { team } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".t-head > *", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".t-head", start: "top 85%", once: true },
      });
      gsap.from(".member", {
        opacity: 0,
        y: 36,
        scale: 0.92,
        duration: 0.7,
        ease: "back.out(1.4)",
        stagger: { amount: 0.4, from: "center" },
        // Clear the inline transform once revealed so it doesn't override the
        // CSS :hover lift (inline styles beat stylesheet :hover rules).
        clearProps: "transform",
        scrollTrigger: { trigger: ".team-grid", start: "top 84%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section ref={sectionRef} id="team" className="py-[clamp(4.5rem,11vh,9rem)] bg-bg-primary">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="t-head flex justify-between items-end gap-6 flex-wrap mb-[clamp(2.4rem,5vh,4rem)]">
          <div>
            <span className="eyebrow">The People Behind the Work</span>
            <h2 className="sec-title text-[clamp(2rem,4.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-text-primary mt-6">
              Meet Our <em>Team</em>
            </h2>
          </div>
          <p className="text-text-muted max-w-[38ch] text-[0.98rem] leading-relaxed">
            A small, focused team of designers, engineers, and strategists genuinely invested in every project they touch.
          </p>
        </div>

        <div className="team-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[clamp(0.9rem,1.5vw,1.2rem)]">
          {team.map((member) => (
            <div key={member.id} className="member">
              <div className="avatar">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={74}
                    height={74}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  member.name.charAt(0)
                )}
              </div>
              <h4>{member.name}</h4>
              <div className="role">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

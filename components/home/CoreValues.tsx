"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We say what we mean and do what we say. No scope surprises, no hidden trade-offs, no over-promising. Our clients trust us because we tell them the truth — even when it isn't what they want to hear.",
  },
  {
    number: "02",
    title: "Excellence",
    description:
      "We hold ourselves to a standard beyond the brief. Every component, interaction, and line of copy is reviewed against one question: is this genuinely the best it can be? Mediocre work doesn't leave our studio.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "The best digital work is co-created. We embed ourselves in our clients' thinking, share our process openly, and treat their goals as our own. A great outcome is a shared outcome — we only succeed when you do.",
  },
];

export default function CoreValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".v-head > *", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".v-head", start: "top 85%", once: true },
      });
      gsap.from(".value", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".values-grid", start: "top 82%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="values"
      className="py-[clamp(4.5rem,11vh,9rem)] bg-bg-primary border-t border-border-subtle"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="v-head flex justify-between items-end gap-6 flex-wrap mb-[clamp(2.4rem,5vh,4rem)]">
          <div>
            <span className="eyebrow">What Guides Us</span>
            <h2 className="sec-title text-[clamp(2rem,4.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-text-primary mt-6">
              Our Core <em>Values</em>
            </h2>
          </div>
          <p className="text-text-muted max-w-[34ch] text-[0.98rem] leading-relaxed">
            Three principles that govern how we work, who we hire, and how we show up for our clients.
          </p>
        </div>

        <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-[clamp(1.4rem,3vw,2.5rem)]">
          {values.map((value) => (
            <div key={value.number} className="value">
              <span className="vno">{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

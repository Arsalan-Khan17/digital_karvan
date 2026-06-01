"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const count = testimonials.length;

  // Auto-advance (motion only)
  useEffect(() => {
    if (reduced || count < 2) return;
    const id = window.setInterval(() => setCurrent((c) => (c + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [reduced, count]);

  // Crossfade the quote body whenever it changes
  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(bodyRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    },
    { dependencies: [current], scope: sectionRef }
  );

  // Entrance reveal
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".q-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-[clamp(4.5rem,11vh,9rem)] bg-bg-primary">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
        <span className="quote-mark" aria-hidden="true">&ldquo;</span>
        <span className="q-reveal eyebrow relative z-10">Client Stories</span>

        <div ref={bodyRef} className="relative z-10 mt-7">
          <blockquote className="quote-body font-normal text-[clamp(1.5rem,3.2vw,2.9rem)] leading-[1.32] tracking-[-0.01em] max-w-[24ch] text-text-primary">
            {t.text}
          </blockquote>
          <div className="flex items-center gap-4 mt-9">
            <span
              className="w-[54px] h-[54px] shrink-0 rounded-full grid place-items-center font-medium text-white"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-bright))" }}
              aria-hidden="true"
            >
              {t.name.charAt(0)}
            </span>
            <div>
              <b className="font-semibold text-text-primary">{t.name}</b>
              <span className="block text-text-muted text-[0.88rem]">{t.source}</span>
            </div>
          </div>
        </div>

        {count > 1 && (
          <div className="relative z-10 flex gap-2 mt-10">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setCurrent(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === current}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-7 bg-accent" : "w-1.5 bg-border-default hover:bg-text-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

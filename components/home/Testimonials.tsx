"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export default function Testimonials() {
  const [current, setCurrent]   = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const blobRef    = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [isPaused, next]);

  useGSAP(() => {
    // Heading reveal
    if (headingRef.current) {
      const h2 = headingRef.current.querySelector("h2");
      if (h2) {
        const split = SplitText.create(h2, { type: "words", mask: "words" });
        gsap.from(split.words, {
          y: "110%",
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: h2, start: "top 86%", once: true },
        });
      }
    }

    // Background blob parallax
    gsap.to(blobRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    // Section fade-in
    const cardArea = sectionRef.current?.querySelector(".testimonial-card-area");
    if (cardArea) {
      gsap.from(cardArea, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardArea,
          start: "top 85%",
          once: true,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-bg-primary relative overflow-hidden">
      {/* Parallax blob */}
      <div
        ref={blobRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(225,29,72,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-10 md:mb-14">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Client Stories
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary"
            style={{ overflow: "hidden" }}
          >
            What Our Clients Say
          </h2>
        </div>

        <div
          className="testimonial-card-area relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40, scale: 0.97 }}
                animate={{ opacity: 1, x: 0,  scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.97 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-8 md:p-12 rounded-2xl bg-bg-card border border-border-subtle"
              >
                <Quote size={32} className="text-text-primary/10 mb-5" />
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-full bg-bg-elevated border border-border-default flex items-center justify-center text-sm font-bold text-text-primary/40 shrink-0">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-sm sm:text-base">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs sm:text-sm text-text-muted">{testimonials[current].source}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-5 sm:mt-6">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:border-text-primary/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-accent w-6" : "bg-border-default w-2"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2.5 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:border-text-primary/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

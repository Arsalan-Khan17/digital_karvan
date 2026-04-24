"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const h2 = wrapRef.current?.querySelector("h2");
    if (!h2) return;
    const split = SplitText.create(h2, { type: "words", mask: "words" });
    gsap.from(split.words, {
      y: "110%",
      opacity: 0,
      duration: 0.65,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: { trigger: h2, start: "top 88%", once: true },
    });
    if (subtitle) {
      const p = wrapRef.current?.querySelector("p");
      if (p) {
        gsap.from(p, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: wrapRef.current, start: "top 88%", once: true },
        });
      }
    }
  }, { scope: wrapRef });

  return (
    <div
      ref={wrapRef}
      className={`${centered ? "text-center" : ""} ${className}`}
    >
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight"
        style={{ overflow: "hidden" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

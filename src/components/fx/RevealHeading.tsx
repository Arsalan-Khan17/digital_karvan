"use client";

import { createElement, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Heading whose words rise into view from behind a clipping mask, staggered —
 * a polished GSAP entrance. Words are rendered in the markup (SSR-friendly);
 * GSAP only animates them. Falls back to fully visible with reduced motion / no JS.
 */
export function RevealHeading({
  text,
  as = "h2",
  className = "",
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const words = ref.current?.querySelectorAll(".rw-inner");
      if (!words || !words.length) return;
      gsap.from(words, {
        yPercent: 120,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  const words = text.split(" ");

  return createElement(
    as,
    { ref, className },
    words.map((w, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <span className="rw-inner inline-block will-change-transform">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      </span>
    )),
  );
}

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EASE = "power2.out";

/**
 * Global, attribute-driven animation engine. Renders nothing — it scans the
 * DOM once after mount and wires up subtle, play-once reveals:
 *   [data-anim]          → single element fades + rises in
 *   [data-anim-stagger]  → its direct children reveal in sequence
 *   [data-countup]       → number counts up from 0 to its value
 *   [data-process]       → step circles reveal in order
 *   [data-anim-line]     → connector line draws (scaleX 0 → 1)
 */
export function ScrollFX() {
  useGSAP(() => {
    // Respect reduced-motion: CSS already shows everything; skip animating.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveal = (els: Element[] | NodeListOf<Element>, opts: gsap.TweenVars = {}) =>
      gsap.to(els as Element[], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: EASE,
        ...opts,
      });

    // 1. Single elements
    gsap.utils.toArray<HTMLElement>("[data-anim]").forEach((el) => {
      reveal([el], {
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // 2. Staggered groups
    gsap.utils.toArray<HTMLElement>("[data-anim-stagger]").forEach((group) => {
      const items = gsap.utils.toArray<HTMLElement>(group.children);
      reveal(items, {
        stagger: 0.09,
        duration: 0.6,
        scrollTrigger: { trigger: group, start: "top 85%", once: true },
      });
    });

    // 3. Count-up numbers
    gsap.utils.toArray<HTMLElement>("[data-countup]").forEach((el) => {
      const raw = el.getAttribute("data-countup") || el.textContent || "";
      const m = raw.match(/^(\D*)(\d[\d,]*)(.*)$/);
      if (!m) return;
      const prefix = m[1];
      const target = parseInt(m[2].replace(/,/g, ""), 10);
      const suffix = m[3];
      const counter = { v: 0 };
      el.textContent = `${prefix}0${suffix}`;
      gsap.to(counter, {
        v: target,
        duration: 1.5,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(counter.v)}${suffix}`;
        },
      });
    });

    // 4. Process sequence: steps reveal in order, connector lines draw
    gsap.utils.toArray<HTMLElement>("[data-process]").forEach((wrap) => {
      const steps = gsap.utils.toArray<HTMLElement>(wrap.querySelectorAll("[data-process-step]"));
      const lines = gsap.utils.toArray<HTMLElement>(wrap.querySelectorAll("[data-anim-line]"));
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: "top 75%", once: true },
      });
      tl.to(steps, { opacity: 1, y: 0, duration: 0.5, stagger: 0.18, ease: EASE });
      if (lines.length) {
        tl.to(lines, { scaleX: 1, duration: 0.5, stagger: 0.18, ease: "power1.inOut" }, 0.15);
      }
    });

    ScrollTrigger.refresh();
  });

  return null;
}

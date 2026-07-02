"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sitewide smooth/inertial scrolling (Lenis), driven by GSAP's ticker so it
 * stays perfectly in sync with every ScrollTrigger on the page. Renders nothing.
 * Skipped entirely for users who prefer reduced motion (native scroll).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const raf = (time: number) => lenis.raf(time * 1000); // gsap ticker is in seconds
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Positions may shift once smooth scroll takes over.
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

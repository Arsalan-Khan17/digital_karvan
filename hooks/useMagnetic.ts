"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouch } from "@/hooks/useIsTouch";

/**
 * Magnetic hover: the element eases toward the cursor while hovered and springs
 * back on leave. Disabled on touch / coarse pointers. Returns a ref to attach.
 *
 * @param strength fraction of the cursor offset to follow (reference uses ~0.3)
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength * 1.3);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [isTouch, strength]);

  return ref;
}

export default useMagnetic;

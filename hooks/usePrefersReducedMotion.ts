"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting and keeps it live.
 *
 * Returns `false` on the server and for the first client render (motion
 * allowed by default), then reconciles on mount. Components must never leave
 * content hidden-by-opacity for reduced-motion users — animate from a visible
 * baseline or skip the animation entirely when this returns `true`.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default usePrefersReducedMotion;

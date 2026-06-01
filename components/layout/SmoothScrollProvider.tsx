"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ScrollTarget = number | string | HTMLElement;

interface SmoothScrollContextValue {
  /** Imperatively scroll to a target. Uses Lenis when active, native fallback otherwise. */
  scrollTo: (target: ScrollTarget, options?: Record<string, unknown>) => void;
  /** Pause scrolling (used by the preloader / mobile menu to lock the page). */
  stop: () => void;
  /** Resume scrolling. */
  start: () => void;
  /** The live Lenis instance, or null when smooth scroll is disabled (reduced motion / SSR). */
  getLenis: () => Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
  getLenis: () => null,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();

  // ---- Create Lenis and wire it to GSAP's ticker + ScrollTrigger (§4) ----
  useEffect(() => {
    if (reduced) return; // reduced motion → native scroll, no Lenis

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Recompute pinned/scrubbed triggers once fonts are ready (avoids drift)
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      gsap.ticker.remove(ticker);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // ---- Reset scroll position + recompute triggers on route change ----
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    // Let the new route paint, then recompute pin/scrub distances
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const scrollTo = useCallback<SmoothScrollContextValue["scrollTo"]>(
    (target, options) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target as never, options as never);
        return;
      }
      // Native fallback (reduced motion / not yet initialised)
      if (typeof window === "undefined") return;
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
      } else {
        const el =
          typeof target === "string" ? document.querySelector(target) : target;
        el?.scrollIntoView({ behavior: "auto" });
      }
    },
    []
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, stop, start, getLenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

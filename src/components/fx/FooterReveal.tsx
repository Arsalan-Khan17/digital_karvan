"use client";

import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/sections/Footer";

/**
 * "Curtain" footer reveal: the footer is pinned to the bottom of the viewport
 * *behind* the page content (lower z-index). A spacer equal to the footer's
 * height is added to the normal flow so the page can scroll that much further —
 * as the content scrolls up, it uncovers the fixed footer underneath.
 *
 * Must be rendered as the last child of the content wrapper (which is
 * `position: relative; z-index: 10` and made of opaque sections).
 */
export function FooterReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Curtain spacer — only on lg, where the footer is pinned behind content
          and fits the viewport. Hidden on mobile (footer is taller than the
          screen there, so it flows normally instead). */}
      <div aria-hidden className="pointer-events-none hidden lg:block" style={{ height }} />
      {/* Mobile: normal in-flow footer (fully scrollable).
          lg+: pinned curtain behind the content (-z-10 in the z-10 wrapper). */}
      <div ref={ref} className="relative lg:fixed lg:inset-x-0 lg:bottom-0 lg:-z-10">
        <Footer />
      </div>
    </>
  );
}

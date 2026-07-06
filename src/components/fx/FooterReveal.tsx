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
      {/* reserves scroll space so the content can lift off the footer;
          pointer-events-none so the revealed footer stays interactive */}
      <div aria-hidden className="pointer-events-none" style={{ height }} />
      {/* pinned behind the content (-z-10 within the z-10 content wrapper) */}
      <div ref={ref} className="fixed inset-x-0 bottom-0 -z-10">
        <Footer />
      </div>
    </>
  );
}

"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Mobile: horizontal snap-slider with dot indicators. sm+: plain grid (dots
 * hidden). The grid/slider classes live here; cards are passed as children.
 */
export function ServicesSlider({ children, count }: { children: ReactNode; count: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const t = trackRef.current;
    if (!t || t.children.length < 2) return t?.clientWidth || 1;
    return (t.children[1] as HTMLElement).offsetLeft - (t.children[0] as HTMLElement).offsetLeft;
  };

  const onScroll = () => {
    const t = trackRef.current;
    if (t) setActive(Math.round(t.scrollLeft / step()));
  };

  const go = (i: number) =>
    trackRef.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <>
      <div
        ref={trackRef}
        onScroll={onScroll}
        data-anim-stagger
        className="mt-12 -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* Dot indicators — mobile only */}
      <div className="mt-6 flex justify-center gap-2 sm:hidden">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to service ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? "w-6 bg-brand-magenta" : "w-2 bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </>
  );
}

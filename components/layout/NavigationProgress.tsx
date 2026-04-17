"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { animate } from "animejs";

export default function NavigationProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pendingNav = useRef(false);
  const prevPath = useRef<string | null>(null);

  // Detect clicks on internal <a> tags → start the bar
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      // Ignore: hash links, external URLs, mailto/tel, same page
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        /^https?:\/\//.test(href)
      )
        return;

      const bar = barRef.current;
      const glow = glowRef.current;
      if (!bar || !glow) return;

      pendingNav.current = true;

      // Reset & show
      bar.style.width = "0%";
      bar.style.opacity = "1";
      glow.style.opacity = "1";

      // Fill to ~75 % — stalls until page arrives
      animate(bar, {
        width: ["0%", "75%"],
        duration: 700,
        ease: "outExpo",
      });
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // pathname changes = navigation complete → finish and hide the bar
  const pathname = usePathname();
  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname;
      return;
    }
    if (!pendingNav.current || pathname === prevPath.current) return;

    prevPath.current = pathname;
    pendingNav.current = false;

    const bar = barRef.current;
    const glow = glowRef.current;
    if (!bar || !glow) return;

    // Rush to 100 %
    animate(bar, {
      width: "100%",
      duration: 180,
      ease: "outSine",
      onComplete: () => {
        // Fade out
        animate([bar, glow], {
          opacity: 0,
          duration: 280,
          ease: "outSine",
          delay: 80,
          onComplete: () => {
            bar.style.width = "0%";
          },
        });
      },
    });
  }, [pathname]);

  return (
    <>
      {/* Bar */}
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9995] pointer-events-none h-[2.5px]"
        style={{
          width: "0%",
          opacity: 0,
          background: "linear-gradient(90deg, #e11d48 0%, #fb7185 60%, #fda4af 100%)",
        }}
      />
      {/* Trailing glow dot */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed top-0 z-[9994] pointer-events-none"
        style={{
          width: 80,
          height: 6,
          opacity: 0,
          right: "calc(100% - var(--bar-right, 75%))",
          background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(225,29,72,0.8) 0%, transparent 100%)",
          filter: "blur(4px)",
          transform: "translateY(-2px)",
        }}
      />
    </>
  );
}

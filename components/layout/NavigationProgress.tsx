"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export default function NavigationProgress() {
  const barRef     = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const pendingNav = useRef(false);
  const prevPath   = useRef<string | null>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        /^https?:\/\//.test(href)
      ) return;

      const bar  = barRef.current;
      const glow = glowRef.current;
      if (!bar || !glow) return;

      pendingNav.current = true;
      tweenRef.current?.kill();

      gsap.set([bar, glow], { opacity: 1 });
      gsap.set(bar, { width: "0%" });

      tweenRef.current = gsap.to(bar, {
        width: "75%",
        duration: 0.7,
        ease: "power2.out",
      });
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname;
      return;
    }
    if (!pendingNav.current || pathname === prevPath.current) return;

    prevPath.current = pathname;
    pendingNav.current = false;

    const bar  = barRef.current;
    const glow = glowRef.current;
    if (!bar || !glow) return;

    tweenRef.current?.kill();

    const tl = gsap.timeline();
    tl.to(bar, { width: "100%", duration: 0.18, ease: "power2.in" })
      .to([bar, glow], { opacity: 0, duration: 0.28, ease: "power2.out", delay: 0.08 })
      .set(bar, { width: "0%" });
  }, [pathname]);

  return (
    <>
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
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed top-0 z-[9994] pointer-events-none"
        style={{
          width: 80,
          height: 6,
          opacity: 0,
          right: "calc(100% - 75%)",
          background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(225,29,72,0.8) 0%, transparent 100%)",
          filter: "blur(4px)",
          transform: "translateY(-2px)",
        }}
      />
    </>
  );
}

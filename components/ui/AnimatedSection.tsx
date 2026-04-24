"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade" | "clip";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars =
      direction === "clip"
        ? { clipPath: "inset(0 0 100% 0)", opacity: 1 }
        : direction === "left"
        ? { x: -60, opacity: 0 }
        : direction === "right"
        ? { x: 60, opacity: 0 }
        : direction === "fade"
        ? { opacity: 0 }
        : { y: 50, opacity: 0 };

    const toVars: gsap.TweenVars =
      direction === "clip"
        ? { clipPath: "inset(0 0 0% 0)", opacity: 1 }
        : direction === "left" || direction === "right"
        ? { x: 0, opacity: 1 }
        : direction === "fade"
        ? { opacity: 1 }
        : { y: 0, opacity: 1 };

    gsap.fromTo(el, fromVars, {
      ...toVars,
      duration: 0.8,
      delay,
      ease: direction === "clip" ? "power4.out" : "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

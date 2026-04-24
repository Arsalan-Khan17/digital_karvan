"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimatedLogo() {
  const dRef      = useRef<HTMLSpanElement>(null);
  const igitalRef = useRef<HTMLSpanElement>(null);
  const kRef      = useRef<HTMLSpanElement>(null);
  const arvanRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1px)", () => {
      // Collapse "igital" and "arvan" as user scrolls past 500px
      const collapseIgital = gsap.to(igitalRef.current, {
        maxWidth: 0,
        opacity: 0,
        paddingRight: 0,
        ease: "power3.out",
        paused: true,
      });
      const collapseArvan = gsap.to(arvanRef.current, {
        maxWidth: 0,
        opacity: 0,
        paddingRight: 0,
        ease: "power3.out",
        paused: true,
      });

      // D drifts right, K drifts left + gets heavier
      const driftD = gsap.to(dRef.current, {
        x: 3,
        ease: "power3.out",
        paused: true,
      });
      const driftK = gsap.to(kRef.current, {
        x: -3,
        fontWeight: 700,
        ease: "power3.out",
        paused: true,
      });

      ScrollTrigger.create({
        start: 500,
        end: 750,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          collapseIgital.progress(p);
          collapseArvan.progress(p);
          driftD.progress(p);
          driftK.progress(p);
        },
      });

      return () => {
        collapseIgital.kill();
        collapseArvan.kill();
        driftD.kill();
        driftK.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <Link
      href="/"
      className="flex items-center tracking-tight text-2xl select-none"
      style={{ lineHeight: 1 }}
    >
      <span ref={dRef} className="font-bold text-accent inline-block">D</span>
      <span
        ref={igitalRef}
        className="font-bold text-accent overflow-hidden whitespace-nowrap"
        style={{ maxWidth: "5rem", display: "inline-block" }}
      >
        igital
      </span>

      <span ref={kRef} className="text-text-primary ml-1.5 inline-block">K</span>
      <span
        ref={arvanRef}
        className="font-normal text-text-primary overflow-hidden whitespace-nowrap"
        style={{ maxWidth: "4.5rem", display: "inline-block" }}
      >
        arvan
      </span>
    </Link>
  );
}

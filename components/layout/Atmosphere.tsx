"use client";

import { useEffect, useRef } from "react";
import { useIsTouch } from "@/hooks/useIsTouch";

/**
 * Cinematic background layers from the design reference:
 *  - `.grain`     animated film-grain overlay (CSS only)
 *  - `.bg-fx`     fixed radial brand-glow gradients (CSS only)
 *  - `.spotlight` soft rose glow that eases toward the cursor (pointer-fine only)
 *
 * All layers are pointer-events:none and aria-hidden. The spotlight is disabled
 * on touch / coarse-pointer devices.
 */
export default function Atmosphere() {
  const spotRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) return;
    const spot = spotRef.current;
    if (!spot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      spot.style.opacity = "1";
    };
    const onLeave = () => {
      spot.style.opacity = "0";
    };

    const loop = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      spot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="bg-fx" aria-hidden="true" />
      <div ref={spotRef} className="spotlight" aria-hidden="true" />
    </>
  );
}

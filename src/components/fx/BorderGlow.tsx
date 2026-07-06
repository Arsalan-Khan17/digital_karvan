"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** glow colour (any CSS colour) */
  color?: string;
  /** border ring thickness in px */
  thickness?: number;
  /** width of the directional cone, in degrees */
  cone?: number;
  /** outer glow blur in px */
  glow?: number;
};

/**
 * Pointer-following border glow (reactbits "Border Glow" style). Drop it as a
 * child of any `position: relative` element with a border-radius — it reads its
 * parent, tracks the pointer, and lights up the border in the pointer's
 * direction. Adds nothing to the parent's layout (absolute, pointer-events-none).
 */
export function BorderGlow({
  color = "#f5318a",
  thickness = 2.5,
  cone = 90,
  glow = 10,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      const angle =
        (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) *
          180) /
          Math.PI +
        90; // conic gradients start at the top → offset by 90°
      el.style.setProperty("--bg-angle", `${angle}deg`);
      el.style.setProperty("--bg-opacity", "1");
    };
    const onLeave = () => el.style.setProperty("--bg-opacity", "0");

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const half = cone / 2;

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        padding: thickness,
        background: `conic-gradient(from var(--bg-angle, 0deg) at 50% 50%, ${color} 0deg, transparent ${half}deg, transparent ${
          360 - half
        }deg, ${color} 360deg)`,
        // mask to just the border ring
        WebkitMask:
          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        filter: `drop-shadow(0 0 ${glow}px ${color})`,
        opacity: "var(--bg-opacity, 0)",
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}
    />
  );
}

"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";

const SPRING: SpringOptions = { mass: 0.1, stiffness: 150, damping: 12 };
const BASE = 40; // resting box size (matches the old h-10 w-10)
const MAG = 64; // magnified size under the cursor
const DIST = 140; // px of horizontal influence on each side

const LABELS: Record<string, string> = {
  facebook: "Facebook",
  x: "X",
  linkedin: "LinkedIn",
  upwork: "Upwork",
  instagram: "Instagram",
};

function DockIcon({ name, mouseX }: { name: string; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  // signed horizontal distance from the cursor to this icon's centre
  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: BASE };
    return val - rect.x - BASE / 2;
  });

  const size = useSpring(
    useTransform(mouseDistance, [-DIST, 0, DIST], [BASE, MAG, BASE]),
    SPRING,
  );
  const iconSize = useTransform(size, (v) => v * 0.4); // icon scales with the box

  return (
    <motion.a
      ref={ref}
      href="#"
      aria-label={name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: size, height: size }}
      className="relative flex shrink-0 items-center justify-center rounded-xl bg-brand-gradient"
    >
      {/* Label fades up on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[11px] font-medium text-neutral-900 shadow-lg"
          >
            {LABELS[name] ?? name}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.img
        src={`/images/socials/${name}.svg`}
        alt={name}
        style={{ height: iconSize }}
        className="w-auto object-contain"
      />
    </motion.a>
  );
}

export function SocialDock({ socials }: { socials: string[] }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-center gap-3"
      style={{ height: MAG }} // reserve the magnified height so nothing reflows
    >
      {socials.map((s) => (
        <DockIcon key={s} name={s} mouseX={mouseX} />
      ))}
    </div>
  );
}

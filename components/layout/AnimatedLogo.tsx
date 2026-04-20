"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Link from "next/link";

const SCROLL_START = 500;  // ~after hero
const SCROLL_END   = 750;

function useTextCollapse(scrollY: MotionValue<number>) {
  const ref = useRef<HTMLSpanElement>(null);
  const [naturalWidth, setNaturalWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) setNaturalWidth(ref.current.scrollWidth);
  }, []);

  const width = useTransform(scrollY, [SCROLL_START, SCROLL_END], [naturalWidth, 6]);
  const opacity = useTransform(scrollY, [SCROLL_START, SCROLL_END * 0.95], [1, 0]);

  return { ref, width, opacity };
}

export default function AnimatedLogo() {
  const { scrollY } = useScroll();

  const middle = useTextCollapse(scrollY);
  const suffix = useTextCollapse(scrollY);

  const dX = useTransform(scrollY, [SCROLL_START, SCROLL_END], [0, 3]);
  const kX = useTransform(scrollY, [SCROLL_START, SCROLL_END], [0, -3]);
  const kWeight = useTransform(scrollY, [SCROLL_START, SCROLL_END], [400, 700]);


  return (
    <Link
      href="/"
      className="flex items-center tracking-tight overflow-hidden text-xl select-none"
      style={{ lineHeight: 1 }}
    >
      {/* D — bold, always accent red */}
      <motion.span className="font-bold text-accent" style={{ x: dX }}>D</motion.span>

      {/* "igital" — bold, accent red, collapses on scroll */}
      <motion.span
        ref={middle.ref}
        className="font-bold text-accent overflow-hidden whitespace-nowrap"
        style={{ width: middle.width, opacity: middle.opacity }}
      >
        igital
</motion.span>

      {/* K — normal weight by default, animates to bold on scroll */}
      <motion.span className="text-text-primary" style={{ x: kX, fontWeight: kWeight }}>K</motion.span>

      {/* "arvan" — normal weight, collapses on scroll */}
      <motion.span
        ref={suffix.ref}
        className="font-normal text-text-primary overflow-hidden whitespace-nowrap"
        style={{ width: suffix.width, opacity: suffix.opacity }}
      >
        arvan
      </motion.span>
    </Link>
  );
}

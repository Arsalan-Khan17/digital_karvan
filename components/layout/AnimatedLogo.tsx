"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Link from "next/link";

const SCROLL_START = 500;
const SCROLL_END   = 750;

function CollapsingText({
  children,
  scrollY,
  className = "",
}: {
  children: React.ReactNode;
  scrollY: MotionValue<number>;
  className?: string;
}) {
  const columns = useTransform(scrollY, [SCROLL_START, SCROLL_END], ["1fr", "0fr"]);
  const opacity  = useTransform(scrollY, [SCROLL_START, SCROLL_START + 80], [1, 0]);

  return (
    <motion.span
      className="grid overflow-hidden"
      style={{ gridTemplateColumns: columns }}
    >
      <motion.span
        className={`overflow-hidden whitespace-nowrap min-w-0 ${className}`}
        style={{ opacity }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export default function AnimatedLogo() {
  const { scrollY } = useScroll();

  const dX      = useTransform(scrollY, [SCROLL_START, SCROLL_END], [0, 3]);
  const kX      = useTransform(scrollY, [SCROLL_START, SCROLL_END], [0, -3]);
  const kWeight = useTransform(scrollY, [SCROLL_START, SCROLL_END], [400, 700]);

  return (
    <Link
      href="/"
      className="flex items-center tracking-tight text-2xl select-none"
      style={{ lineHeight: 1 }}
    >
      <motion.span className="font-bold text-accent" style={{ x: dX }}>D</motion.span>

      <CollapsingText scrollY={scrollY} className="font-bold text-accent">
        igital
      </CollapsingText>

      <motion.span className="text-text-primary ml-1.5" style={{ x: kX, fontWeight: kWeight }}>K</motion.span>

      <CollapsingText scrollY={scrollY} className="font-normal text-text-primary">
        arvan
      </CollapsingText>
    </Link>
  );
}

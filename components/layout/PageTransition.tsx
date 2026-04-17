"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Framer Motion variant — exit animations don't fire reliably in Next.js App Router
// (the component unmounts before the exit can play), so we animate entry only.
// Using `key={pathname}` forces a fresh mount → re-triggers the enter animation
// on every route change.

const variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="hidden"
      animate="visible"
      style={{ minHeight: "100%", display: "contents" }}
    >
      {children}
    </motion.div>
  );
}

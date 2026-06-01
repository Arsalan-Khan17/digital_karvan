"use client";

import Link from "next/link";

/**
 * Brand wordmark from the design reference: a pulsing rose dot followed by
 * "Digital" (ink) + "Karvan" (rose). `onDark` forces light ink over dark heroes
 * (e.g. transparent navbar on portfolio detail pages in light mode).
 */
export default function AnimatedLogo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Digital Karvan — home"
      className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight select-none"
      style={{ lineHeight: 1 }}
    >
      <span className="brand-dot" aria-hidden="true" />
      <span className={onDark ? "text-white" : "text-text-primary"}>
        Digital<span className="text-accent">Karvan</span>
      </span>
    </Link>
  );
}

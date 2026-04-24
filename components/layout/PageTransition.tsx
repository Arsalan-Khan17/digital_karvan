"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

// Each route change remounts this component via key={pathname}.
// useGSAP fires on mount → plays the enter animation once.
// No color overlay, no curtain — just a clean blur-dissolve.

function PageEnter({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, y: 16, filter: "blur(8px)", scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
        clearProps: "filter,transform",
      }
    );
  }, { scope: wrapRef });

  return (
    <div ref={wrapRef} style={{ minHeight: "100%", display: "contents" }}>
      {children}
    </div>
  );
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <PageEnter key={pathname}>{children}</PageEnter>;
}

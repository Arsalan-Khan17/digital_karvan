"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/* Replace each label with the exported client logo SVG when available. */
const logos = [
  "Bank of Khyber",
  "GetFeedback",
  "Programa",
  "UserZoom",
  "Demodesk",
  "StackAdapt",
  "hotjar",
];

export function LogoStrip() {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Track holds two copies; shift by -50% for a seamless loop.
      gsap.to(track.current, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: track },
  );

  return (
    <section className="overflow-hidden border-y border-black/5 bg-[#fafafa] py-7">
      <div ref={track} className="flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {logos.map((name) => (
              <li
                key={name}
                className="px-10 text-[17px] font-semibold whitespace-nowrap text-neutral-400 transition hover:text-neutral-600"
              >
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Placeholder } from "@/components/ui/Placeholder";

/** photo: drop a real image path here later (e.g. "/images/client-sarah.jpg") */
type Testimonial = { quote: string; name: string; role: string; photo?: string };

const testimonials: Testimonial[] = [
  {
    quote:
      "Digital Karvan helped us turn our idea into a clean, modern, and functional digital product. Their team understood our goals, guided us through every step, and delivered with great attention to detail.",
    name: "Sarah M",
    role: "CEO - WorkAI Solutions",
  },
  {
    quote:
      "From strategy to launch the process was seamless. They shipped faster than any agency we have worked with, and the quality never slipped. A genuine long-term partner.",
    name: "David R",
    role: "Founder - Northwind Labs",
  },
];

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  const last = testimonials.length - 1;
  const atStart = active === 0;
  const atEnd = active === last;
  // bounded (non-looping): clamp to [0, last]
  const go = (delta: number) =>
    setActive((i) => Math.min(last, Math.max(0, i + delta)));

  // photo layout constants — active image is ~30% taller than the others
  const AW = 280;
  const AH = 460;
  const NW = 240;
  const NH = 354;

  const quoteRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        quoteRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    },
    { dependencies: [active] },
  );

  return (
    <section id="testimonials" className="overflow-x-clip bg-white py-20 lg:py-28">
      <Container>
        <div data-anim>
          <Badge>What our clients say about us</Badge>
          <h2 className="mt-6 text-[34px] font-bold tracking-tight text-black sm:text-[40px]">
            Client&rsquo;s Testimonials
          </h2>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Quote card */}
          <div className="rounded-[24px] bg-[#f3f3f3] p-10 text-neutral-900">
            <Image
              src="/images/testimonial_commas.svg"
              alt=""
              width={105}
              height={82}
              className="h-12 w-auto"
            />
            <div ref={quoteRef}>
              <p className="mt-6 text-[22px] leading-relaxed text-neutral-700">{t.quote}</p>
              <div className="mt-10">
                <div className="text-[26px] font-semibold">{t.name}</div>
                <div className="mt-1 text-[15px] text-neutral-500">{t.role}</div>
              </div>
            </div>
          </div>

          {/* Photos + controls */}
          <div className="flex flex-col">
            {/* All cards stay mounted; only transform/size/filter transition,
                so the row morphs smoothly with no reflow / shake. The active
                card is tallest, on top, overlaps the content (left) by 10px
                and the next card by 40%. */}
            <div className="relative z-20 h-[460px] lg:-ml-[42px]">
              {testimonials.map((item, i) => {
                const rel = i - active;
                const isActive = rel === 0;
                const x = rel < 0 ? -180 : rel === 0 ? 0 : 184 + (rel - 1) * 144;
                const z = rel === 0 ? 50 : rel > 0 ? 40 - rel : 0;
                return (
                  <div
                    key={item.name}
                    className="absolute left-0 top-1/2 overflow-hidden rounded-2xl transition-all duration-500 ease-out will-change-transform"
                    style={{
                      width: isActive ? AW : NW,
                      height: isActive ? AH : NH,
                      transform: `translate(${x}px, -50%)`,
                      zIndex: z,
                      opacity: rel < 0 ? 0 : 1,
                      pointerEvents: rel < 0 ? "none" : "auto",
                      filter: isActive ? "none" : "grayscale(1)",
                      boxShadow: isActive
                        ? "0 30px 60px -20px rgba(0,0,0,0.4)"
                        : "none",
                    }}
                  >
                    {item.photo ? (
                      <Image
                        src={item.photo}
                        alt={item.name}
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    ) : (
                      <Placeholder
                        label="Client photo"
                        hint={isActive ? item.name : "add photo"}
                        variant={isActive ? "brand" : "neutral"}
                        className="h-full w-full"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={atStart}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-neutral-500"
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={atEnd}
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <Arrow dir="right" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

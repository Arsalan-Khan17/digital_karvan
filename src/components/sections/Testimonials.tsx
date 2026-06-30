"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Placeholder } from "@/components/ui/Placeholder";

type Testimonial = { quote: string; name: string; role: string };

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
  const go = (delta: number) => setActive((i) => (i + delta + testimonials.length) % testimonials.length);

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
    <section id="testimonials" className="bg-white py-20 lg:py-28">
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
            <div className="grid flex-1 grid-cols-2 gap-4">
              <Placeholder label="Client photo" hint="add photo" className="h-full min-h-[340px]" />
              <Placeholder label="Client photo" hint="add photo" className="h-full min-h-[340px]" />
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition hover:text-neutral-900"
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg transition hover:-translate-y-0.5"
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

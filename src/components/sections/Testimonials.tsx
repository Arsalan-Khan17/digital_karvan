"use client";

import { useEffect, useRef, useState } from "react";
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
    photo:"/images/testimonials/active.png"
  },
  {
    quote:
      "From strategy to launch the process was seamless. They shipped faster than any agency we have worked with, and the quality never slipped. A genuine long-term partner.",
    name: "David R",
    role: "Founder - Northwind Labs",
    photo:"/images/testimonials/next-1.png"
  },
  {
    quote:
      "From stuality never slipped. A genuine long-term partner.",
    name: "Touseef",
    role: "Founder - DK",
    photo:"/images/testimonials/next-2.png"
  },
  
];

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

/** interval: auto-advance delay in ms — tweak to taste (default 4.5s). */
export function Testimonials({ interval = 2000 }: { interval?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[active];
  const n = testimonials.length;
  // looping: wraps around in both directions
  const go = (delta: number) => setActive((i) => (i + delta + n) % n);

  // Auto-advance every `interval` ms; pauses on hover, resets on manual nav.
  useEffect(() => {
    if (paused || n <= 1) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % n), interval);
    return () => window.clearInterval(id);
  }, [paused, n, interval, active]);

  // Card size: base is the ACTIVE size (450×630); side cards scale down to
  // ~430 tall via transform (no width/height animation → no reflow glitch).
  const AW = 450;
  const AH = 630;
  const INACTIVE_SCALE = 430 / AH; // ≈0.683 → renders ~430px tall
  const SPREAD = 250; // horizontal distance between ring positions

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

  // Original layout kept: active on the left, upcoming cards stacked to the
  // RIGHT, just-left card fades near center. Only transforms animate, and the
  // incoming card rotates upright + forward — a 3D swing, no reflow glitch.
  const photosRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const firstRun = useRef(true);
  useGSAP(
    () => {
      const dur = firstRun.current ? 0 : 0.7;
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const rel = (i - active + n) % n; // 0 = active, then rightward
        const isActive = rel === 0;
        const isLeaving = n > 1 && rel === n - 1; // just-left card fades out

        gsap.set(el, {
          zIndex: isActive ? 100 : 100 - rel * 10,
          boxShadow: isActive
            ? "0 30px 60px -20px rgba(0,0,0,0.45)"
            : "0 20px 45px -28px rgba(0,0,0,0.4)",
        });
        gsap.to(el, {
          yPercent: -50,
          x: isActive ? 0 : isLeaving ? 110 : 184 + (rel - 1) * SPREAD,
          z: isActive ? 0 : -180 - (rel - 1) * 120, // deeper = further right
          rotationY: isActive || isLeaving ? 0 : -28, // upcoming angled on the ring
          scale: isActive ? 1 : INACTIVE_SCALE,
          autoAlpha: isLeaving ? 0 : 1,
          // colour is part of the animation — desaturate inactive cards over the
          // same duration as the move, so nothing recolours before it settles.
          filter: isActive ? "grayscale(0)" : "grayscale(1)",
          duration: dur,
          ease: "power3.inOut",
        });
      });
      firstRun.current = false;
    },
    { dependencies: [active], scope: photosRef },
  );

  return (
    <section
      id="testimonials"
      className="overflow-x-clip bg-white py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <div data-anim>
          <Badge>What our clients say about us</Badge>
          <h2 className="mt-6 text-[34px] font-bold tracking-tight text-black sm:text-[40px]">
            Client&rsquo;s Testimonials
          </h2>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Quote card — 430px tall, pushed down 100px so it centers on the
              active image's midline (which is 200px taller). */}
          <div className="rounded-[24px] bg-[#f3f3f3] p-10 text-neutral-900 lg:mt-[100px] lg:h-[430px]">
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
            {/* All cards stay mounted; GSAP animates only transforms on a 3D
                ring (perspective), so cards rotate around smoothly with no
                reflow. Active is centered/upright/largest; neighbours angle
                back on either side. */}
            <div
              ref={photosRef}
              className="relative z-20 h-[630px] lg:-ml-[42px]"
              style={{ perspective: 1600, transformStyle: "preserve-3d" }}
            >
              {testimonials.map((item, i) => {
                return (
                  <div
                    key={item.name}
                    ref={(el) => {
                      cardsRef.current[i] = el;
                    }}
                    onClick={() => setActive(i)}
                    className="absolute left-0 top-1/2 cursor-pointer overflow-hidden rounded-2xl will-change-transform"
                    style={{ width: AW, height: AH }}
                  >
                    {item.photo ? (
                      <Image
                        src={item.photo}
                        alt={item.name}
                        fill
                        sizes="450px"
                        className="object-cover"
                      />
                    ) : (
                      <Placeholder
                        label="Client photo"
                        hint={item.name}
                        variant="brand"
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
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:text-neutral-900"
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

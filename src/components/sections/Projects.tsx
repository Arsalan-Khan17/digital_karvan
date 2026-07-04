"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { projects as portfolio } from "@/data/portfolio";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export function Projects() {
  const [active, setActive] = useState(0);
  const project = portfolio[active];
  const index = String(active + 1).padStart(2, "0");

  const slideRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  // Content + image move as one: slide both OUT together, swap the data while
  // hidden, then slide both IN together from the opposite side.
  const go = (delta: number) => {
    if (animating.current) return;
    animating.current = true;
    const D = 48; // slide distance in px
    const targets = [slideRef.current, imageRef.current];
    gsap
      .timeline({ onComplete: () => (animating.current = false) })
      .to(targets, { x: -delta * D, autoAlpha: 0, duration: 0.28, ease: "power2.in" })
      .add(() => setActive((i) => (i + delta + portfolio.length) % portfolio.length))
      .set(targets, { x: delta * D }) // jump to entry side while hidden
      .to(targets, { x: 0, autoAlpha: 1, duration: 0.42, ease: "power2.out" });
  };

  return (
    <section id="work" className="bg-white pb-0">
      <Container>
        <Badge>Projects</Badge>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6 pb-12" data-anim>
          <div className="max-w-2xl">
            <h2 className="text-[34px] font-bold tracking-tight text-black sm:text-[38px]">
              Projects We&rsquo;ve Brought To Life
            </h2>
            <p className="mt-4 text-[18px] text-neutral-500">
              We build digital products that solve real problems and support
              business growth. Each project reflects our focus on strategy,
              design, quality, and reliable execution.
            </p>
          </div>
          <Button variant="dark" href="/portfolio" className="rounded-2xl">
            View full portfolio
          </Button>
        </div>
      </Container>

      {/* Slider band */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#f7eaea] to-[#f4dede]">
        {/* Full-section overlay: sits over the gradient, below the content */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/projects-overlay.svg')" }}
        />
        <Container className="relative z-10 grid min-h-[520px] items-center gap-8 py-16 lg:grid-cols-2">
          {/* Fixed height so the band (and the arrows) never shift between slides */}
          <div ref={slideRef} className="relative z-10 flex flex-col justify-center lg:h-[720px]">
            {/* Numeral now in normal flow so the gap to the content is real */}
            <span className="pointer-events-none mb-10 select-none text-[160px] font-bold leading-none text-white/70">
              {index}
            </span>
            <span className="inline-flex w-fit rounded-full bg-black px-5 py-2 text-[14px] font-medium text-white">
              {project.tags[0]}
            </span>
            <h3 className="mt-6 max-w-md text-[42px] font-bold leading-[1.05] tracking-tight text-black line-clamp-2 sm:text-[56px]">
              {project.title}
            </h3>
            <p className="mt-5 max-w-md text-[18px] leading-relaxed text-neutral-600 line-clamp-3">
              {project.overview}
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-y border-black/10 py-5">
              {project.metrics.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="mb-2 text-[22px] font-bold text-black">{s.value}</div>
                  <div className="text-[13px] leading-tight text-neutral-500">{s.label}</div>
                </div>
              ))}
            </div>

            <Button
              variant="gradient"
              href={`/portfolio/${project.slug}`}
              className="mt-8 w-fit rounded-2xl"
            >
              Read case study
            </Button>
          </div>

          {/* Right — cover image, slides in sync with the content */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-25px_rgba(0,0,0,0.4)] ring-1 ring-black/5"
            >
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="absolute bottom-12 right-0 z-20 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-400 shadow transition hover:text-neutral-900"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg transition hover:-translate-y-0.5"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}

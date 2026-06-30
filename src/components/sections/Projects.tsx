"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type Project = {
  index: string;
  tag: string;
  title: string;
  desc: string;
  stats: { label: string; value: string }[];
};

const projects: Project[] = [
  {
    index: "01",
    tag: "Web Project",
    title: "Smartflyer Website & Portal",
    desc: "A premium travel website and agent portal for Smartflyer, a luxury travel concierge service.",
    stats: [
      { label: "Conversion rate increase", value: "45%" },
      { label: "Bounce rate reduction", value: "-60%" },
      { label: "Saved per booking (admin)", value: "3 Hrs" },
    ],
  },
  {
    index: "02",
    tag: "Mobile App",
    title: "Fintrack Finance App",
    desc: "A cross-platform personal finance app with real-time insights and automated budgeting.",
    stats: [
      { label: "Monthly active users", value: "120k" },
      { label: "App store rating", value: "4.8" },
      { label: "Onboarding time", value: "-40%" },
    ],
  },
];

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export function Projects() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const go = (delta: number) => setActive((i) => (i + delta + projects.length) % projects.length);

  const slideRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        slideRef.current,
        { autoAlpha: 0, x: 24 },
        { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" },
      );
    },
    { dependencies: [active] },
  );

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
          <Button variant="dark" href="#work" className="rounded-2xl">
            View full portfolio
          </Button>
        </div>
      </Container>

      {/* Slider band */}
      <div className="bg-gradient-to-b from-[#f7eaea] to-[#f4dede]">
        <Container className="relative grid min-h-[520px] gap-8 py-16 lg:grid-cols-2">
          <span className="pointer-events-none absolute left-0 top-8 select-none text-[160px] font-bold leading-none text-white/70">
            {project.index}
          </span>

          <div ref={slideRef} className="relative z-10 flex flex-col justify-center">
            <span className="inline-flex w-fit rounded-full bg-black px-5 py-2 text-[14px] font-medium text-white">
              {project.tag}
            </span>
            <h3 className="mt-6 max-w-md text-[42px] font-bold leading-[1.05] tracking-tight text-black sm:text-[56px]">
              {project.title}
            </h3>
            <p className="mt-5 max-w-md text-[18px] text-neutral-600">{project.desc}</p>

            <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-y border-black/10 py-5">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[13px] leading-tight text-neutral-500">{s.label}</div>
                  <div className="mt-2 text-[22px] font-bold text-black">{s.value}</div>
                </div>
              ))}
            </div>

            <Button variant="gradient" href="#work" className="mt-8 w-fit rounded-2xl">
              Read case study
            </Button>
          </div>

          <div className="absolute bottom-12 right-0 z-10 flex items-center gap-3">
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

"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Placeholder } from "@/components/ui/Placeholder";

type Member = { name: string; role: string; bio: string };

const members: Member[] = [
  {
    name: "Touseef Khattak",
    role: "CEO & Co-Founder",
    bio: "Experienced in both frontend and backend development, he builds secure, scalable, and high-performing web applications that support business growth.",
  },
  {
    name: "Ayesha Khan",
    role: "Head of Design",
    bio: "Leads product and brand design with a focus on clean, user-centered experiences that turn complex ideas into intuitive interfaces.",
  },
];

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export function Team() {
  const [active, setActive] = useState(0);
  const m = members[active];
  const go = (delta: number) => setActive((i) => (i + delta + members.length) % members.length);

  const bioRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        bioRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    },
    { dependencies: [active] },
  );

  return (
    <section id="team" className="bg-white py-16 lg:py-20">
      <Container>
        <div className="overflow-hidden rounded-[28px] bg-[#f4f4f4] p-8 sm:p-12" data-anim>
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left */}
            <div>
              <Badge>Our Team</Badge>
              <h2 className="mt-6 text-[30px] font-bold tracking-tight text-black sm:text-[34px]">
                The Experts Behind Digital Karvan
              </h2>

              <div className="mt-12" ref={bioRef}>
                <h3 className="text-[30px] font-bold text-black sm:text-[34px]">{m.name}</h3>
                <p className="mt-2 text-[14px] font-semibold uppercase tracking-widest text-neutral-500">
                  {m.role}
                </p>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed text-neutral-600">{m.bio}</p>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 sm:justify-start">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous member"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-400 shadow transition hover:text-neutral-900"
                >
                  <Arrow dir="left" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next member"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  <Arrow dir="right" />
                </button>
              </div>
            </div>

            {/* Right — team photo */}
            <div className="relative">
              <Placeholder label="Team photo (overhead)" hint="add team image" className="h-[360px] w-full" />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[56px] font-bold tracking-wide text-black/10 sm:text-[96px]">
                OUR TEAM
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

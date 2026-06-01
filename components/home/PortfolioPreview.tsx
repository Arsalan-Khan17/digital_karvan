"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { projects } from "@/lib/data";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useIsTouch } from "@/hooks/useIsTouch";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const featured = projects.slice(0, 6);
const pad2 = (n: number) => String(n).padStart(2, "0");

export default function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!reduced) {
        gsap.from(".pf-head > div > *", {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".pf-head", start: "top 85%", once: true },
        });
      }

      // Desktop + motion: pin the stage and translate the track sideways as the
      // user scrolls vertically. matchMedia auto-reverts on resize/unmount.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const stage = stageRef.current;
        if (!track || !stage) return;
        const distance = () => track.scrollWidth - window.innerWidth + 80;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });

      // Recompute pin distances once fonts load (avoids drift).
      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  // 3D tilt on each card (fine pointer + motion only).
  useEffect(() => {
    if (reduced || isTouch) return;
    const cards = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>(".pf-card") ?? []);
    const cleanups: Array<() => void> = [];
    const MAX = 8;
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${(px * MAX).toFixed(2)}deg) rotateX(${(-py * MAX).toFixed(2)}deg) translateY(-4px)`;
      };
      const onLeave = () => {
        card.style.transform = "";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [reduced, isTouch]);

  return (
    <section ref={sectionRef} id="work" className="portfolio">
      <div className="pf-head max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-[clamp(4.5rem,11vh,9rem)]">
        <div className="flex justify-between items-end gap-6 flex-wrap">
          <div>
            <span className="eyebrow">Our Work</span>
            <h2 className="sec-title text-[clamp(2rem,4.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-text-primary mt-6">
              Selected <em>Work</em>
            </h2>
          </div>
          <Link href="/portfolio" className="btn">
            <span className="lbl">Full portfolio</span>
            <span className="arr">→</span>
          </Link>
        </div>
      </div>

      <div ref={stageRef} className="pf-stage">
        <div ref={trackRef} className="pf-track">
          {featured.map((p, i) => (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="pf-card">
              <div className="pf-meta">
                <span className="cat">{p.categories.join(" · ")}</span>
                <span>
                  {pad2(i + 1)} / {pad2(featured.length)}
                </span>
              </div>
              <h3>{p.title}</h3>
              <p className="blurb">{p.description}</p>
              <div className="pf-metrics">
                {p.metrics.slice(0, 3).map((m) => (
                  <div key={m.label} className="m">
                    <div className="v">{m.value}</div>
                    <div className="k">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="pf-foot">
                <div className="stack">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="pf-view">View case →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pf-hint max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-[clamp(3rem,6vh,5rem)]">
        <span>Scroll to explore →</span>
        <span className="ln" />
        <span>{pad2(featured.length)} projects</span>
      </div>
    </section>
  );
}

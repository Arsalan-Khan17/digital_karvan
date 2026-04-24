"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import { gsap, useGSAP } from "@/lib/gsap";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.7,
      delay: (index % 3) * 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 88%", once: true },
    });

    // Scale on hover via GSAP for silky feel
    const el = cardRef.current?.querySelector(".card-inner") as HTMLElement;
    if (!el) return;
    const enter = () => gsap.to(el, { scale: 1.025, duration: 0.35, ease: "power2.out" });
    const leave = () => gsap.to(el, { scale: 1,     duration: 0.4,  ease: "power3.out" });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, { scope: cardRef });

  return (
    <div ref={cardRef}>
      <Link href={`/portfolio/${project.slug}`}>
        <div className="card-inner group rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-text-primary/20 transition-colors duration-300">
          <div
            className={`aspect-video bg-gradient-to-br ${project.imageGradient} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                View Project
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.categories.map((cat) => (
                <Badge key={cat}>{cat}</Badge>
              ))}
            </div>
            <h3 className="font-semibold text-text-primary leading-snug mb-1">{project.title}</h3>
            <p className="text-xs text-text-muted">{project.date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

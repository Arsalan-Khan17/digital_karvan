"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { animate, stagger, onScroll } from "animejs";

const highlights = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across web, branding, AI, and enterprise data",
  },
  {
    value: 20,
    suffix: "+",
    label: "Happy Clients",
    description: "From funded startups to FTSE-listed institutions",
  },
  {
    value: 3,
    suffix: "+",
    label: "Years of Craft",
    description: "Consistent delivery since our first engagement",
  },
];

export default function Mission() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(highlights.map(() => 0));
  const animated = useRef(false);

  useEffect(() => {
    const container = statsRef.current;
    if (!container) return;

    // Use IntersectionObserver to trigger anime.js counters when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || animated.current) return;
        animated.current = true;

        const objs = highlights.map((h) => ({ val: 0, target: h.value }));

        objs.forEach((obj, i) => {
          animate(obj, {
            val: [0, obj.target],
            duration: 1600,
            ease: "outExpo",
            delay: i * 120,
            onUpdate: () => {
              setCounters((prev) => {
                const next = [...prev];
                next[i] = Math.floor(obj.val);
                return next;
              });
            },
            onComplete: () => {
              setCounters((prev) => {
                const next = [...prev];
                next[i] = obj.target;
                return next;
              });
            },
          });
        });

        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background accent blob */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(225,29,72,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              Building Digital Excellence,{" "}
              <span className="text-accent">One Project</span> at a Time
            </h2>
            <p className="mt-6 text-text-secondary leading-relaxed text-base sm:text-lg">
              At Digital Karvan, we believe exceptional digital experiences are built on a
              foundation of trust, craftsmanship, and genuine partnership. We embed ourselves
              in each client&apos;s world — understanding their challenges, their audience,
              and the outcomes that actually matter — before a single line of code is written
              or a pixel placed.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed text-sm sm:text-base">
              Our team spans design, engineering, and strategy. We bring the same level of
              rigour and dedication to a two-page brochure site as we do to a complex
              enterprise platform. Because good work doesn&apos;t scale down — it either
              meets the standard or it doesn&apos;t.
            </p>

            {/* Animated stats */}
            <div ref={statsRef} className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              {highlights.map((stat, i) => (
                <div key={stat.label} className="group">
                  <p className="text-2xl sm:text-3xl font-bold text-text-primary tabular-nums">
                    <span>{counters[i]}</span>
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-text-primary mt-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5 hidden sm:block">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-sm text-text-secondary hover:text-text-primary transition-colors group"
            >
              Our story &amp; values
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — visual cards */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large top card */}
              <div className="col-span-2 p-6 rounded-2xl bg-bg-card border border-border-subtle glow-card transition-all duration-300 group">
                <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">
                  What we do
                </p>
                <p className="text-text-primary font-semibold leading-snug">
                  End-to-end digital solutions — from brand identity to complex web applications.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Web Development", "Branding", "UI/UX Design", "AI & Data", "Maintenance"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs bg-bg-elevated border border-border-default text-text-secondary group-hover:border-accent/20 group-hover:text-text-primary transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Bottom-left */}
              <div className="p-5 rounded-2xl bg-bg-elevated border border-border-subtle flex flex-col justify-between min-h-[140px] glow-card transition-all duration-300">
                <p className="text-xs text-text-muted">Offices</p>
                <div>
                  <p className="text-sm font-semibold text-text-primary">United Kingdom</p>
                  <p className="text-xs text-text-muted mt-0.5">Coventry, England</p>
                  <p className="text-sm font-semibold text-text-primary mt-3">UAE</p>
                  <p className="text-xs text-text-muted mt-0.5">Dubai Region</p>
                </div>
              </div>

              {/* Bottom-right — accent card */}
              <div className="relative p-5 rounded-2xl bg-accent/10 border border-accent/20 flex flex-col justify-between min-h-[140px] overflow-hidden group">
                {/* Animated glow pulse */}
                <div
                  className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <p className="relative text-xs text-text-muted">Response time</p>
                <div className="relative">
                  <p className="text-4xl font-bold text-accent" style={{ textShadow: "0 0 20px rgba(225,29,72,0.4)" }}>
                    24h
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    We respond to every enquiry within one business day, guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

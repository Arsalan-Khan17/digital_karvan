"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import Button from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const words = [
  "Where", "Integrity,", "Excellence,", "and",
  "Collaboration", "Drive", "Digital", "Innovation.",
];

const stats = [
  { value: 50, suffix: "+", label: "Projects" },
  { value: 20, suffix: "+", label: "Clients" },
  { value: 3,  suffix: "+", label: "Years" },
  { value: 2,  suffix: "",  label: "Offices" },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!active || done.current) return;
    done.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [active, setActive] = useState(false);
  const count = useCountUp(value, active);
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.5 }}
      onAnimationComplete={() => setActive(true)}
    >
      <p className="text-2xl sm:text-3xl font-bold text-text-primary tabular-nums">
        {count}<span className="text-accent">{suffix}</span>
      </p>
      <p className="text-xs text-text-muted mt-0.5 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}

export default function Hero() {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const els = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!els.length) return;
    animate(els, {
      opacity: [0, 1],
      translateY: ["36px", "0px"],
      duration: 550,
      delay: stagger(65, { start: 300 }),
      ease: "outExpo",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 lg:pt-20 bg-bg-primary">
      {/* Three.js 3D background — transparent canvas, page bg shows through */}
      <HeroScene isDark={isDark} />

      {/* Readability overlay — subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 60%, transparent 100%)"
            : "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.30) 55%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(225,29,72,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-default bg-bg-card text-text-secondary text-xs sm:text-sm mb-9 md:mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
          Digital Agency — UK &amp; UAE
        </motion.div>

        {/* Headline animated with anime.js */}
        <h1 className="text-[2.1rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.12] text-text-primary">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className="inline-block mr-[0.28em] opacity-0"
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-7 md:mt-9 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
        >
          We partner with ambitious businesses — from startups to enterprise — to design
          and build websites, brand identities, and digital products that convert visitors
          into customers and ideas into growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.35 }}
        >
          <Button variant="primary" size="lg" href="/contact">
            Get a Free Quote
          </Button>
          <Button variant="ghost" size="lg" href="/portfolio">
            View Our Work
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-14 flex items-center justify-center flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <div className="w-px h-7 bg-border-default mx-6 sm:mx-10 shrink-0 hidden sm:block" />
              )}
              <StatItem {...stat} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <span className="text-[9px] text-text-muted uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}

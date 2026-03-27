"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

const words = [
  "Where",
  "Integrity,",
  "Excellence,",
  "and",
  "Collaboration",
  "Drive",
  "Digital",
  "Innovation.",
];

const stats = [
  { value: "50+", label: "Projects" },
  { value: "20+", label: "Clients" },
  { value: "3+", label: "Years" },
  { value: "2", label: "Offices" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-bg-primary overflow-hidden pt-16 lg:pt-20">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-red-500/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-default bg-bg-card text-text-secondary text-xs sm:text-sm mb-8 md:mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
          Digital Agency — UK &amp; UAE
        </motion.div>

        {/* Word-by-word headline */}
        <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] text-text-primary">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-2 sm:mr-3 md:mr-4"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          We partner with ambitious businesses — from startups to enterprise — to
          design and build websites, brand identities, and digital products that
          convert visitors into customers and ideas into growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <Button variant="primary" size="lg" href="/contact">
            Get a Free Quote
          </Button>
          <Button variant="ghost" size="lg" href="/portfolio">
            View Our Work
          </Button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          className="mt-12 md:mt-16 flex items-center justify-center gap-4 sm:gap-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span className="text-[10px] text-text-muted uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}

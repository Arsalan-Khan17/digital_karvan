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

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-bg-primary overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-500/[0.07] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-default bg-bg-card text-text-secondary text-sm mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          Digital Agency
        </motion.div>

        {/* Word-by-word reveal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3 md:mr-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          We partner with ambitious businesses to design and build exceptional digital
          experiences that drive real results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <Button variant="primary" size="lg" href="/contact">
            Get a Quote
          </Button>
          <Button variant="ghost" size="lg" href="/portfolio">
            View Our Work
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <span className="text-xs text-text-muted uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We say what we mean and do what we say. No scope surprises, no hidden trade-offs, no over-promising. Our clients trust us precisely because we tell them the truth — even when it is not what they want to hear.",
    accent: "from-rose-500/20 to-transparent",
  },
  {
    number: "02",
    title: "Excellence",
    description:
      "We hold ourselves to a standard that goes beyond the brief. Every component, every interaction, every line of copy is reviewed against the question: is this genuinely the best it can be? Mediocre work does not leave our studio.",
    accent: "from-violet-500/15 to-transparent",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "The best digital work is co-created. We embed ourselves in our clients' thinking, share our process openly, and treat their business goals as our own. A great outcome is a shared outcome — we only succeed when you do.",
    accent: "from-rose-500/20 to-transparent",
  },
];

export default function CoreValues() {
  return (
    <section className="py-16 md:py-24 bg-bg-primary border-t border-border-subtle relative overflow-hidden">
      {/* Subtle aurora background blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(225,29,72,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            What Guides Us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Our Core Values
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            Three principles that govern how we work, who we hire, and how we show up for our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard maxTilt={8} scale={1.015}>
                <div className="group relative p-6 sm:p-8 rounded-2xl border border-border-subtle bg-bg-card overflow-hidden transition-all duration-300 glow-card h-full">
                  {/* Corner gradient accent */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${value.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    aria-hidden="true"
                  />
                  {/* Animated border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(225,29,72,0.25)",
                    }}
                    aria-hidden="true"
                  />

                  <span className="relative text-5xl sm:text-6xl font-bold text-text-primary/[0.07] block mb-5">
                    {value.number}
                  </span>
                  <h3 className="relative text-lg sm:text-xl font-semibold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="relative text-text-secondary text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We operate with complete transparency and honesty in everything we do. Our clients trust us because we always deliver on our promises and communicate openly.",
  },
  {
    number: "02",
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards of quality. Every pixel, every line of code, every strategy is crafted with precision and care for maximum impact.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "The best results emerge from true partnership. We work alongside our clients as an extension of their team, sharing knowledge and building together.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-24 bg-bg-primary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            What Guides Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Our Core Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              className="p-8 rounded-2xl border border-border-subtle bg-bg-card hover:border-white/20 hover:bg-bg-elevated transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-5xl font-bold text-white/10 block mb-6">{value.number}</span>
              <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

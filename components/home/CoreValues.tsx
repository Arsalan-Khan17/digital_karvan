"use client";

import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We say what we mean and do what we say. No scope surprises, no hidden trade-offs, no over-promising. Our clients trust us precisely because we tell them the truth — even when it is not what they want to hear.",
  },
  {
    number: "02",
    title: "Excellence",
    description:
      "We hold ourselves to a standard that goes beyond the brief. Every component, every interaction, every line of copy is reviewed against the question: is this genuinely the best it can be? Mediocre work does not leave our studio.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "The best digital work is co-created. We embed ourselves in our clients' thinking, share our process openly, and treat their business goals as our own. A great outcome is a shared outcome — we only succeed when you do.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-16 md:py-24 bg-bg-primary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              className="p-6 sm:p-8 rounded-2xl border border-border-subtle bg-bg-card hover:border-text-primary/20 hover:bg-bg-elevated transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-4xl sm:text-5xl font-bold text-text-primary/10 block mb-5">
                {value.number}
              </span>
              <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

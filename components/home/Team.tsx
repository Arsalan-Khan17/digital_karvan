"use client";

import { motion } from "framer-motion";
import { team } from "@/lib/data";

const teamExtras: Record<string, string> = {
  "Anna Oldman": "Visual storytelling, brand systems & editorial design",
  "Oscar Freeman": "React, Next.js, performance engineering",
  "Emma Newman": "Product strategy, client partnerships & growth",
  "Lisa Trueman": "User research, interaction design & prototyping",
};

export default function Team() {
  return (
    <section className="py-16 md:py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            The People Behind the Work
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Meet Our Team
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            A small, focused team of designers, engineers, and strategists who are genuinely
            invested in the success of every project they touch.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Avatar */}
              <div className="relative mx-auto w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-bg-elevated to-bg-card border border-border-default flex items-center justify-center mb-4">
                <span className="text-xl sm:text-2xl font-bold text-text-primary/30">
                  {member.name.charAt(0)}
                </span>
                {member.isFounder && (
                  <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-semibold">
                    Founder
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-text-primary text-sm sm:text-base">{member.name}</h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">{member.role}</p>
              <p className="text-xs text-text-muted mt-2 leading-snug px-1 hidden sm:block">
                {teamExtras[member.name]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

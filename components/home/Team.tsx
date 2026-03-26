"use client";

import { motion } from "framer-motion";
import { team } from "@/lib/data";

export default function Team() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            The People Behind the Work
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Meet Our Team
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Avatar */}
              <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-bg-elevated to-bg-card border border-border-default flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white/30">
                  {member.name.charAt(0)}
                </span>
                {member.isFounder && (
                  <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-white text-black text-xs font-semibold">
                    Founder
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

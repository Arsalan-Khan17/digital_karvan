"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Building Digital Excellence, One Project at a Time
            </h2>
            <p className="mt-6 text-text-secondary leading-relaxed text-lg">
              At Digital Karvan, we believe that great digital experiences are built on a
              foundation of trust, craftsmanship, and genuine partnership. We work closely with
              our clients to understand their unique challenges and deliver solutions that not
              only meet their needs today but scale with them into the future.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Our team combines technical expertise with creative vision to produce work that
              stands out in a crowded digital landscape. From startups to enterprise, we bring
              the same level of dedication to every engagement.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "20+", label: "Happy Clients" },
                { value: "3+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-br from-bg-elevated to-bg-card border border-border-subtle">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8">
                  <p className="text-5xl font-bold text-white/10 select-none">DK</p>
                  <div className="mt-8 space-y-3">
                    {["Integrity", "Excellence", "Collaboration"].map((val) => (
                      <div
                        key={val}
                        className="px-6 py-3 rounded-full border border-border-default bg-bg-elevated/50 text-text-secondary text-sm"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

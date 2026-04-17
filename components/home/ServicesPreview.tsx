"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Monitor, Palette, Shield, Lightbulb, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import TiltCard from "@/components/ui/TiltCard";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={22} />,
  Palette: <Palette size={22} />,
  Shield: <Shield size={22} />,
  Lightbulb: <Lightbulb size={22} />,
};

const featureLimit = 3;

// Subtle per-card accent colors
const cardAccents = [
  "group-hover:bg-rose-500/[0.06]",
  "group-hover:bg-violet-500/[0.05]",
  "group-hover:bg-blue-500/[0.04]",
  "group-hover:bg-rose-500/[0.06]",
];

export default function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-bg-primary relative overflow-hidden">
      {/* Subtle background pulse */}
      <div
        className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(225,29,72,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
              Our Services
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group shrink-0"
          >
            All services
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltCard maxTilt={7} scale={1.015} className="h-full">
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <div
                    className={`group relative p-6 sm:p-7 rounded-2xl bg-bg-card border border-border-subtle overflow-hidden transition-all duration-300 h-full flex flex-col glow-card`}
                  >
                    {/* Background accent that appears on hover */}
                    <div
                      className={`absolute inset-0 ${cardAccents[i % cardAccents.length]} transition-colors duration-500 pointer-events-none`}
                      aria-hidden="true"
                    />
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Icon */}
                    <div className="relative w-11 h-11 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/[0.08] transition-all duration-300 mb-5 shrink-0">
                      {iconMap[service.icon]}
                    </div>

                    <h3 className="relative text-base sm:text-lg font-semibold text-text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="relative text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                      {service.shortDescription}
                    </p>

                    {/* Feature tags */}
                    <div className="relative flex flex-wrap gap-2 mb-5">
                      {service.features.slice(0, featureLimit).map((feat) => (
                        <span
                          key={feat}
                          className="px-2.5 py-1 rounded-full text-xs bg-bg-primary border border-border-subtle text-text-muted"
                        >
                          {feat}
                        </span>
                      ))}
                      {service.features.length > featureLimit && (
                        <span className="px-2.5 py-1 rounded-full text-xs bg-bg-primary border border-border-subtle text-text-muted">
                          +{service.features.length - featureLimit} more
                        </span>
                      )}
                    </div>

                    <span className="relative flex items-center gap-2 text-sm text-text-secondary group-hover:text-accent transition-colors">
                      Learn more
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

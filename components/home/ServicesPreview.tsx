"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Monitor, Palette, Shield, Lightbulb, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={22} />,
  Palette: <Palette size={22} />,
  Shield: <Shield size={22} />,
  Lightbulb: <Lightbulb size={22} />,
};

// Show first 3 features from each service
const featureLimit = 3;

export default function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={`/services/${service.slug}`} className="block h-full">
                <div className="group p-6 sm:p-7 rounded-2xl bg-bg-card border border-border-subtle hover:border-text-primary/20 hover:bg-bg-elevated transition-all duration-300 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:border-text-primary/20 transition-colors mb-5 shrink-0">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                    {service.shortDescription}
                  </p>
                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
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
                  <span className="flex items-center gap-2 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    Learn more
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

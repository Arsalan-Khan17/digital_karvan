"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Monitor, Palette, Shield, Lightbulb, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={24} />,
  Palette: <Palette size={24} />,
  Shield: <Shield size={24} />,
  Lightbulb: <Lightbulb size={24} />,
};

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Services
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors group"
          >
            Explore all services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <motion.div
                className="group p-8 rounded-2xl bg-bg-card border border-border-subtle hover:border-white/20 hover:bg-bg-elevated transition-all duration-300 h-full"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center text-text-secondary group-hover:text-white group-hover:border-white/20 transition-colors mb-6">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors group/link"
                >
                  Learn more
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

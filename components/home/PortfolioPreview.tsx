"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import Badge from "@/components/ui/Badge";

export default function PortfolioPreview() {
  const featured = projects.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-bg-secondary">
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
              Our Work
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
              Selected Work
            </h2>
            <p className="mt-3 text-text-secondary text-sm sm:text-base max-w-xl">
              A cross-section of client engagements — from AI-powered platforms to
              enterprise dashboards and brand-led websites.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group shrink-0"
          >
            All projects
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link href={`/portfolio/${project.slug}`} className="block">
                <div className="group rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-text-primary/20 hover:shadow-lg transition-all duration-300">
                  {/* Gradient thumbnail */}
                  <div
                    className={`aspect-[16/9] bg-gradient-to-br ${project.imageGradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white font-medium text-sm">
                        View Case Study
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.categories.map((cat) => (
                        <Badge key={cat}>{cat}</Badge>
                      ))}
                    </div>
                    <h3 className="text-text-primary font-semibold text-base leading-snug mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <p className="text-xs text-text-muted">{project.date}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

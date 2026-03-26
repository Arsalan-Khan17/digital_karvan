"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import Badge from "@/components/ui/Badge";

export default function PortfolioPreview() {
  return (
    <section className="py-24 bg-bg-secondary">
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
              Our Work
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Selected Work
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors group"
          >
            View all projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={`/portfolio/${project.slug}`}>
                <motion.div
                  className="group relative rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Image placeholder with gradient */}
                  <div
                    className={`aspect-video bg-gradient-to-br ${project.imageGradient} relative overflow-hidden`}
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white font-medium">
                        View Project
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.categories.map((cat) => (
                        <Badge key={cat}>{cat}</Badge>
                      ))}
                    </div>
                    <h3 className="text-white font-semibold leading-snug mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-muted">{project.date}</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import Badge from "@/components/ui/Badge";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link href={`/portfolio/${project.slug}`}>
        <motion.div
          className="group rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-white/20 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Image */}
          <div
            className={`aspect-video bg-gradient-to-br ${project.imageGradient} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                View Project
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
          {/* Info */}
          <div className="p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.categories.map((cat) => (
                <Badge key={cat}>{cat}</Badge>
              ))}
            </div>
            <h3 className="font-semibold text-white leading-snug mb-1">{project.title}</h3>
            <p className="text-xs text-text-muted">{project.date}</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

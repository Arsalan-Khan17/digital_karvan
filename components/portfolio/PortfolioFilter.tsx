"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

const categories = ["All", "Technology", "Website"];

export default function PortfolioFilter() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 sm:gap-3 mb-8 md:mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`relative px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full transition-colors ${
              active === cat
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary border border-border-default hover:border-text-primary/30"
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="portfolio-filter-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

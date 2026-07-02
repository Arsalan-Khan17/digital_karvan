"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { projects, portfolioFilters } from "@/data/portfolio";
import { clsx } from "@/lib/clsx";

function ArrowUpRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function PortfolioGrid() {
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  );

  return (
    <section className="bg-white pb-24">
      <Container>
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {portfolioFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={clsx(
                "rounded-full px-5 py-2.5 text-[14px] font-medium transition",
                filter === f
                  ? "bg-brand-gradient text-white"
                  : "border border-black/10 text-neutral-700 hover:border-black/30 hover:text-black",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
              >
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-black/8 bg-white transition-shadow duration-300 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.3)]"
                >
                  {/* Cover */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <Image
                      src={p.logo}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-neutral-900 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight />
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-neutral-100 px-3 py-1 text-[12px] font-medium text-neutral-600"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="ml-auto text-[12px] text-neutral-400">{p.date}</span>
                    </div>
                    <h3 className="mt-4 text-[20px] font-semibold text-black transition-colors group-hover:text-brand-magenta">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-neutral-500">
                      {p.overview}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import PortfolioFilter from "@/components/portfolio/PortfolioFilter";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Digital Karvan's portfolio of websites, technology solutions, and digital experiences.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
            Our Work
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
            Designing a Better World Today
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed">
            A selection of projects we have delivered for clients across multiple industries
            and geographies.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <PortfolioFilter />
        </div>
      </section>
    </>
  );
}

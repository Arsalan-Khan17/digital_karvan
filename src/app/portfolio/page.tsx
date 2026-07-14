import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { ScrollFX } from "@/components/fx/ScrollFX";
import { FooterReveal } from "@/components/fx/FooterReveal";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A selection of projects we have delivered for clients across multiple industries and geographies.",
  alternates: { canonical: "/portfolio" },
  openGraph: { url: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <ScrollFX />
      <div className="relative z-10 bg-white">
        <Header />
        <main>
          <PortfolioHero />
          {/* <PortfolioShowcase /> */}
          <PortfolioGrid />
        </main>
        <FooterReveal />
      </div>
    </>
  );
}

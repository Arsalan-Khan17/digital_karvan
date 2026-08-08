import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
// Team section hidden until team images/content are ready
// import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutCta } from "@/components/about/AboutCta";
import { ScrollFX } from "@/components/fx/ScrollFX";
import { FooterReveal } from "@/components/fx/FooterReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Digital Karvan is a digital agency founded on the belief that exceptional digital work requires integrity, excellence, and genuine collaboration.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <ScrollFX />
      <div className="relative z-10 bg-white">
        <Header />
        <main>
          <AboutHero />
          <AboutStory />
          <AboutValues />
          {/* <AboutTeam /> */}
          <AboutCta />
        </main>
        <FooterReveal />
      </div>
    </>
  );
}

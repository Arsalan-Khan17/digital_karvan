import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesList } from "@/components/services/ServicesList";
import { ServicesCta } from "@/components/services/ServicesCta";
import { ScrollFX } from "@/components/fx/ScrollFX";
import { FooterReveal } from "@/components/fx/FooterReveal";

export const metadata: Metadata = {
  title: "Services — Digital Karvan",
  description:
    "From strategy to execution, we provide end-to-end digital services that help businesses grow, connect, and thrive in the digital world.",
};

export default function ServicesPage() {
  return (
    <>
      <ScrollFX />
      <div className="relative z-10 bg-white">
        <Header />
        <main>
          <ServicesHero />
          <ServicesList />
          <ServicesCta />
        </main>
        <FooterReveal />
      </div>
    </>
  );
}

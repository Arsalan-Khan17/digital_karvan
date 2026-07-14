import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactBody } from "@/components/contact/ContactBody";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { ScrollFX } from "@/components/fx/ScrollFX";
import { FooterReveal } from "@/components/fx/FooterReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ScrollFX />
      <div className="relative z-10 bg-white">
        <Header />
        <main>
          <ContactHero />
          <ContactBody />
          <ContactFaq />
        </main>
        <FooterReveal />
      </div>
    </>
  );
}

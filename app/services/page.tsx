import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import ServiceCard from "@/components/services/ServiceCard";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover what Digital Karvan does best: website design & development, branding, maintenance, and consultation.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
            What We Offer
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-text-primary leading-tight max-w-3xl">
            This Is What We Do Best
          </h1>
          <p className="mt-6 text-base sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
            From strategy to execution, we provide end-to-end digital services that help
            businesses grow, connect, and thrive in the digital world.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-12 md:py-16 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-text-secondary mb-10 text-lg">
            Let us discuss how we can help you achieve your digital goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white hover:bg-red-700 font-medium rounded-full transition-colors"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

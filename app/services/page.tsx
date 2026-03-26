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
      <section className="pt-32 pb-16 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
            What We Offer
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
            This Is What We Do Best
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed">
            From strategy to execution, we provide end-to-end digital services that help
            businesses grow, connect, and thrive in the digital world.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-text-secondary mb-10 text-lg">
            Let us discuss how we can help you achieve your digital goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

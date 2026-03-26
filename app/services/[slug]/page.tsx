import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { services } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-text-secondary">{service.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-16 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            {service.title}
          </h1>
          <p className="mt-6 text-xl text-text-secondary max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
              <p className="text-text-secondary leading-relaxed text-lg">
                {service.fullDescription}
              </p>

              {/* Approach */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Our Approach</h2>
                <div className="space-y-4">
                  {service.approach.map((step, i) => (
                    <div
                      key={step}
                      className="flex items-start gap-4 p-5 rounded-xl bg-bg-card border border-border-subtle"
                    >
                      <div className="w-8 h-8 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-medium text-white">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: features */}
            <div>
              <div className="p-6 rounded-2xl bg-bg-card border border-border-subtle sticky top-24">
                <h3 className="text-lg font-semibold text-white mb-5">What&apos;s Included</h3>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-white/60 shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-text-secondary mb-8">
            Let us talk about how {service.title} can transform your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

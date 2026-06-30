import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { ServicesCta } from "@/components/services/ServicesCta";
import { ScrollFX } from "@/components/fx/ScrollFX";
import { FooterReveal } from "@/components/fx/FooterReveal";
import { services, getService } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service — Digital Karvan" };
  return {
    title: `${service.title} — Digital Karvan`,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <ScrollFX />
      <div className="relative z-10 bg-white">
        <Header />
        <ServiceDetail service={service} />
        <ServicesCta />
        <FooterReveal />
      </div>
    </>
  );
}

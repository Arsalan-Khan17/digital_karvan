import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { PortfolioDetail } from "@/components/portfolio/PortfolioDetail";
import { ServicesCta } from "@/components/services/ServicesCta";
import { ScrollFX } from "@/components/fx/ScrollFX";
import { FooterReveal } from "@/components/fx/FooterReveal";
import { projects, getProject } from "@/data/portfolio";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project — Digital Karvan" };
  return {
    title: `${project.title} — Digital Karvan`,
    description: project.overview,
  };
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <ScrollFX />
      <div className="relative z-10 bg-white">
        <Header />
        <PortfolioDetail project={project} />
        <ServicesCta />
        <FooterReveal />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { PortfolioDetail } from "@/components/portfolio/PortfolioDetail";
import { ServicesCta } from "@/components/services/ServicesCta";
import { ScrollFX } from "@/components/fx/ScrollFX";
import { FooterReveal } from "@/components/fx/FooterReveal";
import { projects, getProject } from "@/data/portfolio";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { abs } from "@/lib/site";

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
  if (!project) return { title: "Project" };
  const path = `/portfolio/${project.slug}`;
  return {
    title: project.title, // root layout appends "— Digital Karvan"
    description: project.overview,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: abs(path),
      title: project.title,
      description: project.overview,
      images: [{ url: project.cover, alt: project.title }],
    },
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
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />
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

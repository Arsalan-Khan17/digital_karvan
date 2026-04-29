import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, User, Tag, CheckCircle2 } from "lucide-react";
import { projects } from "@/lib/data";
import Badge from "@/components/ui/Badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Digital Karvan`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const styleMainImage = {
    backgroundSize: "cover",
    backgroundImage: `url(${project.mainImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={`relative min-h-[70vh] flex flex-col justify-end bg-gradient-to-br ${project.imageGradient} overflow-hidden`}>
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* breadcrumb */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-0">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-white/70">{project.title}</span>
          </nav>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.categories.map((cat) => (
              <Badge key={cat}>{cat}</Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mb-8">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <User size={14} className="text-accent" />
              {project.client}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-accent" />
              {project.date}
            </span>
            <span className="flex items-center gap-2">
              <Tag size={14} className="text-accent" />
              {project.categories.join(", ")}
            </span>
          </div>
        </div>
      </section>

      {/* ── Metrics bar ──────────────────────────────────── */}
      <section className="bg-bg-card border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="py-8 px-6 border-r border-border-subtle last:border-r-0 odd:border-r md:border-r text-center [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(4n)]:border-r-0"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-1">{metric.value}</p>
                <p className="text-sm text-text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────────────── */}
      <section className="py-14 md:py-20 lg:py-28 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* text */}
            <div className="lg:col-span-2">
              <p className="text-xs font-medium text-accent uppercase tracking-widest mb-4">Overview</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-8">About this project</h2>
              <div className="space-y-5">
                {project.overviewParagraphs.map((para, i) => (
                  <p key={i} className="text-text-secondary leading-relaxed text-lg">{para}</p>
                ))}
              </div>
            </div>

            {/* sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-bg-card border border-border-subtle">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">Project Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs text-text-muted mb-1">Client</dt>
                    <dd className="text-sm font-medium text-text-primary">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text-muted mb-1">Delivered</dt>
                    <dd className="text-sm font-medium text-text-primary">{project.date}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text-muted mb-1">Category</dt>
                    <dd className="flex flex-wrap gap-1.5 mt-1">
                      {project.categories.map((cat) => (
                        <Badge key={cat}>{cat}</Badge>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text-muted mb-2">Technologies</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-full bg-bg-elevated border border-border-default text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hero mockup placeholder ───────────────────────── */}
      <section className="bg-bg-primary px-5 sm:px-6 lg:px-8 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div style={styleMainImage}
            className={`rounded-3xl aspect-video w-full bg-gradient-to-br ${project.imageGradient} border border-border-subtle flex items-center justify-center`}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 rounded-full bg-white/20" />
              </div>
              <p className="text-text-primary/30 text-sm">Project Screenshot</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Challenge ────────────────────────────────────── */}
      <section className="py-14 md:py-20 lg:py-28 bg-bg-secondary border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs font-medium text-accent uppercase tracking-widest mb-4">The Challenge</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-6 leading-snug">
                {project.challenge}
              </h2>
              <p className="text-text-secondary leading-relaxed text-lg">
                {project.challengeDetail}
              </p>
            </div>

            {/* decorative block */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl bg-accent/5 border border-accent/10" />
              <div className="relative p-8 rounded-2xl bg-bg-card border border-border-default">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-6">Key Challenges</p>
                <ul className="space-y-4">
                  {project.keyFeatures.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution ─────────────────────────────────────── */}
      <section className="py-14 md:py-20 lg:py-28 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* features grid */}
            <div className="order-2 lg:order-1">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-6">What we delivered</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-bg-card border border-border-subtle"
                  >
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-medium text-accent uppercase tracking-widest mb-4">The Solution</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-6 leading-snug">
                {project.solution}
              </h2>
              <p className="text-text-secondary leading-relaxed text-lg">
                {project.solutionDetail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Second mockup ────────────────────────────────── */}
      <section className="bg-bg-primary px-5 sm:px-6 lg:px-8 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`rounded-2xl aspect-video bg-gradient-to-tl ${project.imageGradient} border border-border-subtle flex items-center justify-center opacity-70`}
            >
              <p className="text-text-primary/20 text-sm">UI Screenshot 1</p>
            </div>
            <div
              className={`rounded-2xl aspect-video bg-gradient-to-br ${project.imageGradient} border border-border-subtle flex items-center justify-center opacity-50`}
            >
              <p className="text-text-primary/20 text-sm">UI Screenshot 2</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────── */}
      <section className="py-14 md:py-20 lg:py-28 bg-bg-secondary border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
            <p className="text-xs font-medium text-accent uppercase tracking-widest mb-4">Results</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-6">{project.results}</h2>
            <p className="text-text-secondary leading-relaxed text-lg">{project.resultsDetail}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-bg-card border border-border-subtle text-center hover:border-accent/30 transition-colors"
              >
                <p className="text-3xl font-bold text-accent mb-2">{metric.value}</p>
                <p className="text-sm text-text-muted leading-snug">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="py-14 md:py-20 lg:py-28 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-medium text-accent uppercase tracking-widest mb-4">Our Approach</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">How we got there</h2>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border-subtle hidden md:block" />

            <div className="space-y-8">
              {project.process.map((step, i) => (
                <div key={i} className="flex gap-6 md:gap-10 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-bg-card border border-border-default flex items-center justify-center text-sm font-bold text-accent relative z-10">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{step.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-14 md:py-20 lg:py-28 bg-bg-secondary border-y border-border-subtle">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-text-primary mb-6">
            Have a project in mind?
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
            We would love to hear about it. Let&apos;s talk about how Digital Karvan can help bring your vision to life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-red-700 transition-colors text-sm"
            >
              Start a project
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border-default text-text-secondary rounded-full hover:border-text-primary/30 hover:text-text-primary transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── Next / Prev projects ─────────────────────────── */}
      <section className="bg-bg-primary border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-subtle">
            {/* prev */}
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="group flex flex-col gap-3 py-10 px-0 md:pr-12 hover:bg-transparent transition-colors"
            >
              <span className="flex items-center gap-2 text-xs text-text-muted uppercase tracking-widest">
                <ArrowLeft size={12} />
                Previous project
              </span>
              <span className="text-xl md:text-2xl font-bold text-text-secondary group-hover:text-text-primary transition-colors">
                {prevProject.title}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {prevProject.categories.map((cat) => (
                  <Badge key={cat}>{cat}</Badge>
                ))}
              </div>
            </Link>

            {/* next */}
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="group flex flex-col gap-3 py-10 px-0 md:pl-12 text-right hover:bg-transparent transition-colors items-end"
            >
              <span className="flex items-center gap-2 text-xs text-text-muted uppercase tracking-widest">
                Next project
                <ArrowRight size={12} />
              </span>
              <span className="text-xl md:text-2xl font-bold text-text-secondary group-hover:text-text-primary transition-colors">
                {nextProject.title}
              </span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {nextProject.categories.map((cat) => (
                  <Badge key={cat}>{cat}</Badge>
                ))}
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

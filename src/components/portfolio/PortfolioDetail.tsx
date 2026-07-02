import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { projects, type Project } from "@/data/portfolio";

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M4 12.5l5 5L20 6" />
    </svg>
  );
}

function Narrative({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div data-anim>
      <span className="text-[13px] font-semibold uppercase tracking-widest text-brand-magenta">
        {label}
      </span>
      <h2 className="mt-3 text-[26px] font-bold tracking-tight text-black sm:text-[30px]">{title}</h2>
      <p className="mt-4 text-[17px] leading-relaxed text-neutral-600">{body}</p>
    </div>
  );
}

export function PortfolioDetail({ project }: { project: Project }) {
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-16" style={{ backgroundImage: "var(--page-wash)" }}>
        <Container>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-neutral-500 transition hover:text-neutral-900"
          >
            <span className="rotate-180"><ArrowRight /></span>
            All Work
          </Link>

          <div className="mt-8 max-w-3xl" data-anim>
            {/* Client logo lockup */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-black/8 bg-white px-5 py-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]">
              <div className="relative h-9 w-32">
                <Image
                  src={project.logo}
                  alt={`${project.client} logo`}
                  fill
                  sizes="128px"
                  className="object-contain object-left"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full bg-neutral-900 px-4 py-1.5 text-[13px] font-medium text-white">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-[40px] font-bold leading-[1.05] tracking-tight text-black sm:text-[52px]">
              {project.title}
            </h1>
            <p className="mt-5 text-[18px] leading-relaxed text-neutral-600 lg:text-[19px]">
              {project.overview}
            </p>
          </div>

          {/* Cover */}
          <div className="mt-12 overflow-hidden rounded-[28px] border border-black/8" data-anim>
            <div className="relative aspect-[16/9] w-full bg-neutral-100">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Metrics */}
      <section className="bg-black py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4" data-anim-stagger>
            {project.metrics.map((m) => (
              <div key={m.label} className="px-2 text-center lg:text-left">
                <div className="text-brand-gradient text-[44px] font-bold leading-none sm:text-[52px]">
                  {m.value}
                </div>
                <div className="mt-3 text-[15px] text-neutral-400">{m.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Narrative + sidebar */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-12">
              <Narrative label="The Challenge" title="The problem we solved" body={project.challenge} />
              <Narrative label="The Solution" title="What we built" body={project.solution} />
              {project.results && (
                <Narrative label="Results" title="The impact" body={project.results} />
              )}

              {project.deliverables && (
                <div data-anim>
                  <span className="text-[13px] font-semibold uppercase tracking-widest text-brand-magenta">
                    {project.deliverables.heading}
                  </span>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {project.deliverables.items.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-[16px] text-neutral-700">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white">
                          <Check />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="h-fit lg:sticky lg:top-28" data-anim>
              <div className="rounded-[24px] border border-black/8 bg-[#f7f7f7] p-7">
                <dl className="flex flex-col gap-5">
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-widest text-neutral-400">Client</dt>
                    <dd className="mt-1 text-[16px] font-medium text-black">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-widest text-neutral-400">Delivered</dt>
                    <dd className="mt-1 text-[16px] font-medium text-black">{project.date}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-widest text-neutral-400">Category</dt>
                    <dd className="mt-1 text-[16px] font-medium text-black">{project.tags.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-widest text-neutral-400">Technologies</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[13px] font-medium text-neutral-700">
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
                <Button href="/#contact" variant="gradient" className="mt-7 w-full rounded-2xl">
                  Start a similar project
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="bg-white pb-20 lg:pb-24">
          <Container>
            <div className="flex flex-col gap-7">
              {project.gallery.map((src, i) => (
                <div key={src} className="overflow-hidden rounded-[28px] border border-black/8" data-anim>
                  <div className="relative aspect-[16/9] w-full bg-neutral-100">
                    <Image
                      src={src}
                      alt={`${project.title} — view ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Other projects */}
      <section className="bg-white pb-20 lg:pb-24">
        <Container>
          <div data-anim>
            <Badge>More</Badge>
            <h2 className="mt-6 text-[30px] font-bold tracking-tight text-black sm:text-[34px]">
              Explore more work
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3" data-anim-stagger>
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/portfolio/${o.slug}`}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-black/8 bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.3)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={o.cover}
                    alt={o.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[17px] font-semibold text-black transition-colors group-hover:text-brand-magenta">
                    {o.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-magenta transition group-hover:gap-3">
                    View project
                    <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

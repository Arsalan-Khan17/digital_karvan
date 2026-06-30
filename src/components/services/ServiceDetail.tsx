import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { services, type Service } from "@/data/services";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M4 12.5l5 5L20 6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-white py-20 lg:py-24"
        style={{ backgroundImage: "var(--page-wash)" }}
      >
        <Container>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-neutral-500 transition hover:text-neutral-900"
          >
            <span className="rotate-180">
              <ArrowRight />
            </span>
            All Services
          </Link>

          <div className="mt-8 max-w-3xl" data-anim>
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white">
              {service.icon}
            </span>
            <h1 className="mt-7 text-[40px] font-bold leading-[1.05] tracking-tight text-black sm:text-[52px]">
              {service.title}
            </h1>
            <p className="mt-6 text-[18px] leading-relaxed text-neutral-600 lg:text-[19px]">
              {service.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/#contact" variant="gradient" className="rounded-2xl">
                Request a free quote
              </Button>
              <Button href="/#contact" variant="dark" className="rounded-2xl">
                Get in Touch
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div data-anim>
            <Badge>What&rsquo;s Included</Badge>
            <h2 className="mt-6 text-[30px] font-bold tracking-tight text-black sm:text-[34px]">
              Capabilities we bring
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-anim-stagger>
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white px-5 py-4 text-[16px] font-medium text-neutral-800"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white">
                  <Check />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-black py-20 lg:py-24">
        <Container>
          <div className="text-center" data-anim>
            <Badge tone="dark">Our Process</Badge>
            <h2 className="mt-6 text-[30px] font-bold tracking-tight text-white sm:text-[36px]">
              How we deliver
            </h2>
          </div>
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5" data-process>
            {service.process.map((step, i) => (
              <li key={step} className="relative text-center" data-process-step>
                <div className="flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-[15px] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < service.process.length - 1 && (
                    <span className="absolute left-[calc(50%+1.75rem)] top-6 hidden h-px w-[calc(100%-3.5rem)] bg-white/15 lg:block" data-anim-line />
                  )}
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-white">{step}</h3>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Other services */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div data-anim>
            <Badge>More</Badge>
            <h2 className="mt-6 text-[30px] font-bold tracking-tight text-black sm:text-[34px]">
              Explore other services
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3" data-anim-stagger>
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group flex flex-col rounded-[24px] border border-black/8 bg-white p-7 transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.3)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  {o.icon}
                </span>
                <h3 className="mt-5 text-[18px] font-semibold text-black">{o.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-magenta transition group-hover:gap-3">
                  Learn more
                  <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

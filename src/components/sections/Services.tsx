import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
    </svg>
  );
}
function ChipIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
    </svg>
  );
}
function DesignIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 3v18M4 7.5l8 4.5 8-4.5" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 109 9h-9V3z" />
      <path d="M12 3v9h9" opacity="0.5" />
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

const services = [
  { title: "Software Engineering", desc: "Scalable backends, performant frontends, and native mobile apps built for long-term growth.", icon: <CodeIcon /> },
  { title: "AI & Intelligent System", desc: "Integrating LLMs and custom machine learning models into your core business workflows.", icon: <ChipIcon /> },
  { title: "Data & Analytics", desc: "Unlocking insights with custom data pipelines and real-time visualization dashboards.", icon: <ChartIcon /> },
  { title: "Product Designing", desc: "UX-led design systems that ensure your product looks as good as it functions.", icon: <DesignIcon /> },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <Container>
        <div data-anim-stagger>
          <Badge>Our Services</Badge>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-5">
            <div>
              <h2 className="text-[34px] font-bold tracking-tight text-black sm:text-[38px]">
                What We Do?
              </h2>
              <p className="mt-3 max-w-xl text-[18px] text-neutral-500">
                Interdisciplinary expertise unified under a single mission: your
                product&rsquo;s success.
              </p>
            </div>
            <Link
              href="#services"
              className="rounded-2xl bg-black px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-neutral-800"
            >
              View All Services
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-anim-stagger>
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative flex flex-col overflow-hidden rounded-[22px] border border-black/8 bg-white p-7 text-neutral-900 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_rgba(214,43,121,0.65)]"
            >
              {/* gradient revealed on hover */}
              <span
                aria-hidden
                className="bg-brand-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative flex flex-1 flex-col">
                <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white">
                  <span
                    aria-hidden
                    className="bg-brand-gradient absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <span className="relative text-white transition-colors duration-300 group-hover:text-neutral-900">
                    {s.icon}
                  </span>
                </span>

                <h3 className="mt-16 border-t border-black/10 pt-5 text-[22px] font-semibold transition-colors duration-300 group-hover:border-white/25 group-hover:text-white">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-white/90">
                  {s.desc}
                </p>

                <button
                  type="button"
                  className="mt-7 inline-flex items-center justify-between gap-3 rounded-xl bg-neutral-100 px-5 py-3 text-[15px] font-medium text-neutral-900 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white"
                >
                  Get a quote
                  <ArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

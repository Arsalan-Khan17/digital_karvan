import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { clsx } from "@/lib/clsx";

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
  { title: "Software Engineering", desc: "Scalable backends, performant frontends, and native mobile apps built for long-term growth.", icon: <CodeIcon />, active: true },
  { title: "AI & Intelligent System", desc: "Integrating LLMs and custom machine learning models into your core business workflows.", icon: <ChipIcon /> },
  { title: "Data & Analytics", desc: "Unlocking insights with custom data pipelines and real-time visualization dashboards.", icon: <ChartIcon /> },
  { title: "Product Designing", desc: "UX-led design systems that ensure your product looks as good as it functions.", icon: <DesignIcon /> },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <Container>
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.title}
              className={clsx(
                "flex flex-col rounded-[22px] p-7",
                s.active
                  ? "bg-brand-gradient text-white shadow-[0_28px_60px_-22px_rgba(214,43,121,0.65)]"
                  : "border border-black/8 bg-white text-neutral-900",
              )}
            >
              <span
                className={clsx(
                  "flex h-14 w-14 items-center justify-center rounded-2xl",
                  s.active ? "bg-white text-neutral-900" : "bg-brand-gradient text-white",
                )}
              >
                {s.icon}
              </span>

              <h3 className={clsx("mt-16 border-t pt-5 text-[22px] font-semibold", s.active ? "border-white/25" : "border-black/10")}>
                {s.title}
              </h3>
              <p className={clsx("mt-3 flex-1 text-[15px] leading-relaxed", s.active ? "text-white/90" : "text-neutral-500")}>
                {s.desc}
              </p>

              <button
                type="button"
                className={clsx(
                  "mt-7 inline-flex items-center justify-between gap-3 rounded-xl px-5 py-3 text-[15px] font-medium transition",
                  s.active ? "bg-white/20 text-white hover:bg-white/30" : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
                )}
              >
                Get a quote
                <ArrowRight />
              </button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

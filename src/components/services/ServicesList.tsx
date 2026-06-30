import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { services } from "@/data/services";

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

export function ServicesList() {
  return (
    <section id="services-list" className="bg-white py-20 lg:py-24">
      <Container>
        <div data-anim>
          <Badge>Our Services</Badge>
          <h2 className="mt-6 max-w-2xl text-[34px] font-bold tracking-tight text-black sm:text-[38px]">
            End-to-end services, under one roof
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2" data-anim-stagger>
          {services.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col rounded-[28px] border border-black/8 bg-white p-8 transition-shadow duration-300 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.25)] lg:p-10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                {s.icon}
              </span>
              <h3 className="mt-6 text-[24px] font-semibold text-black">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-neutral-500">{s.description}</p>

              {/* Capabilities */}
              <div className="mt-7">
                <p className="text-[13px] font-semibold uppercase tracking-widest text-neutral-400">
                  What&rsquo;s included
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[15px] text-neutral-700">
                      <span className="text-brand-magenta">
                        <Check />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="mt-7 border-t border-black/8 pt-6">
                <p className="text-[13px] font-semibold uppercase tracking-widest text-neutral-400">
                  Our process
                </p>
                <ol className="mt-4 flex flex-col gap-3">
                  {s.process.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-[15px] text-neutral-700">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-[12px] font-bold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <Link
                href={`/services/${s.slug}`}
                className="mt-8 inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-brand-magenta transition hover:gap-3"
              >
                Learn more
                <ArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ServicesSlider } from "@/components/sections/ServicesSlider";
import { services } from "@/data/services";

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <Container>
        <div data-anim-stagger>
          <Badge>Our Services</Badge>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-5">
            <div>
              <h2 className="text-[34px] font-bold tracking-tight text-black sm:text-[38px]">
                What We Do
              </h2>
              <p className="mt-3 max-w-xl text-[18px] text-neutral-500">
                Five disciplines, one team, one mission: shipping a product your
                customers rely on.
              </p>
            </div>
            <Link
              href="/services"
              className="rounded-2xl bg-black px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-neutral-800"
            >
              View All Services
            </Link>
          </div>
        </div>

        {/* Mobile: horizontal snap-slider with dots. sm+: grid. */}
        <ServicesSlider count={services.length}>
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative flex w-[370px] max-w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-black/8 bg-white p-7 text-neutral-900 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_rgba(214,43,121,0.65)] sm:w-auto sm:max-w-none sm:shrink"
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
                  {s.tagline}
                </p>

                <Link
                  href={`/services/${s.slug}`}
                  className="mt-7 inline-flex items-center justify-between gap-3 rounded-xl bg-neutral-100 px-5 py-3 text-[15px] font-medium text-neutral-900 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white"
                >
                  Get a Quote
                  <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </ServicesSlider>
      </Container>
    </section>
  );
}

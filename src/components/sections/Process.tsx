import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const steps = [
  { n: "01", title: "Strategy", desc: "We define the right direction for your product and business goals." },
  { n: "02", title: "Design", desc: "We craft clean, user-focused experiences that people love to use." },
  { n: "03", title: "Build", desc: "We develop scalable digital products with reliable technology." },
  { n: "04", title: "Test", desc: "We test every detail to ensure quality, performance, & confidence." },
  { n: "05", title: "Launch", desc: "We launch your product smoothly and prepare it for growth." },
];

export function Process() {
  return (
    <section id="process" className="bg-black py-20 lg:py-28">
      <Container>
        <div className="text-center" data-anim>
          <Badge tone="dark">The Karvan Way</Badge>
          <h2 className="mt-6 text-[34px] font-bold tracking-tight text-white sm:text-[40px]">
            We Travel The Journey With You
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[18px] leading-relaxed text-neutral-400">
            We travel the journey with you from idea to impact. Together, we
            design, build, and launch digital products that grow your business.
          </p>
        </div>

        <div className="mt-14 rounded-[32px] bg-[#0c0c0c] p-7 ring-1 ring-white/5 sm:p-12">
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4" data-process>
            {steps.map((step, i) => (
              <li key={step.n} className="relative text-center" data-process-step>
                <div className="flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-[15px] font-semibold text-white">
                    {step.n}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="absolute left-[calc(50%+1.75rem)] top-6 hidden h-px w-[calc(100%-3.5rem)] bg-white/15 lg:block" data-anim-line />
                  )}
                </div>
                <h3 className="mt-5 text-[22px] font-semibold text-white">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-[14rem] text-[15px] leading-relaxed text-neutral-400">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>

          {/* Holographic banner */}
          <div className="mt-12 overflow-hidden rounded-[22px]">
            <Image
              src="/images/journey-banner.png"
              alt="Holographic gradient banner"
              width={1200}
              height={200}
              className="h-44 w-full object-cover sm:h-56"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button variant="dark" href="#contact" className="rounded-2xl border border-white/15 bg-neutral-900">
            Schedule a consultation
          </Button>
          <Button variant="gradient" href="#contact" className="rounded-2xl">
            Request a free quote
          </Button>
        </div>
      </Container>
    </section>
  );
}

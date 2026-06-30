import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const reasons = [
  {
    n: "01",
    title: "Modern AI Fluency",
    desc: "We build with the current generation of AI tooling, so your product ships with capabilities a freelancer or legacy shop simply can't match.",
  },
  {
    n: "02",
    title: "Reliability",
    desc: "Predictable timelines, clear communication, and code built to last. Agency-grade dependability without the agency overhead.",
  },
  {
    n: "03",
    title: "Full-Stack Range",
    desc: "Design, frontend, backend, and infrastructure under one roof. No handoffs, no gaps, no one team blaming another.",
  },
  {
    n: "04",
    title: "Long-Term Partnership",
    desc: "We stay past launch, iterating and maintaining the product with you, instead of disappearing once the invoice clears.",
  },
];

export function WhyWorkWithUs() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="text-center" data-anim>
          <Badge>Why Work Us</Badge>
          <h2 className="mt-6 text-[34px] font-bold tracking-tight text-black sm:text-[40px]">
            A Long-Term Partner, Not A Vendor
          </h2>
        </div>

        <div className="mt-12 rounded-[28px] border border-black/8 bg-gradient-to-br from-white via-white to-[#f6e8f2] p-9 sm:p-14">
          <div className="grid gap-x-16 gap-y-12 sm:grid-cols-2" data-anim-stagger>
            {reasons.map((r) => (
              <div key={r.n} className="flex gap-6">
                <span className="text-brand-gradient text-[44px] font-bold leading-none">
                  {r.n}
                </span>
                <div className="pt-1">
                  <h3 className="text-[24px] font-semibold text-black">{r.title}</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

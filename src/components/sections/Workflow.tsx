import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BorderGlow } from "@/components/fx/BorderGlow";

const beforeItems = [
  "Endless back-and-forth between design and code",
  "Unpredictable timelines and missed deadlines",
  "Technical debt compounding every sprint",
  "Inconsistent UX across platforms",
];

const afterItems = [
  "Zero-friction Handoff: Code-first design",
  "Guaranteed weekly delivery cycles",
  "Production-grade, scalable infrastructure",
  "Unified design system across every touchpoint",
];

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 12.5l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Workflow() {
  return (
    <section className="relative bg-white py-20 lg:py-28" style={{ backgroundImage: "var(--page-wash)" }}>
      <Container>
        <div className="text-center" data-anim>
          <Badge>Workflow</Badge>
          <h2 className="mt-6 text-[34px] font-bold tracking-tight text-black sm:text-[38px]">
            From Stuck To Shipped
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[18px] leading-relaxed text-neutral-500">
            We bridge the gap between fragmented ideas and production-ready
            reality with a streamlined execution model.
          </p>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-2" data-anim-stagger>
          {/* Before */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#f3f3f3] p-9 sm:p-11">
            <BorderGlow />
            <Image
              src="/images/workflow-image-1.png"
              alt=""
              width={420}
              height={420}
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 object-cover"
            />
            <h3 className="relative text-[30px] font-bold text-black sm:text-[34px]">
              Before Digital Karvan
            </h3>
            <ul className="relative mt-8 space-y-4">
              {beforeItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[17px] text-neutral-700">
                  <span className="shrink-0 text-black">
                    <PlusIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="dark" className="mt-10 rounded-2xl">
              Discuss your problem
            </Button>
          </div>

          {/* After */}
          <div className="relative overflow-hidden rounded-[28px] bg-black p-9 sm:p-11">
            <BorderGlow />
            <Image
              src="/images/workflow-image-2.png"
              alt=""
              width={420}
              height={420}
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 object-cover"
            />
            <h3 className="relative text-[30px] font-bold text-white sm:text-[34px]">
              After Digital Karvan
            </h3>
            <ul className="relative mt-8 space-y-4">
              {afterItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[17px] text-neutral-200">
                  <span className="shrink-0 text-brand-pink">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="gradient" className="mt-10 rounded-2xl">
              Book a call now!
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

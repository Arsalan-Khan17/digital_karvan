import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BulbIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.6.6 1 1.3 1 2.1V16h6v-.4c0-.8.4-1.5 1-2.1A6 6 0 0012 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GroupIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.2" />
      <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5M15 19c0-1.8.6-3.2 2-4" strokeLinecap="round" />
    </svg>
  );
}

const chips = [
  { icon: <ClockIcon />, label: "Fast Delivery" },
  { icon: <BulbIcon />, label: "Modern Technologies" },
  { icon: <GroupIcon />, label: "100% Client Retention" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white" style={{ backgroundImage: "var(--page-wash)" }}>
      <Container className="grid items-center gap-10 pb-12 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-10">
        {/* Left */}
        <div className="order-2 lg:order-1" data-anim-stagger>
          <h1 className="max-w-[640px] text-[42px] font-bold leading-[1.05] tracking-tight text-black sm:text-[56px] lg:text-[67px]">
            We Build Digital Products That Grow Ambitious Businesses.
          </h1>

          <p className="mt-7 max-w-[560px] text-[18px] leading-relaxed text-neutral-600 lg:text-[19px]">
            We partner with ambitious businesses — from startups to enterprise —
            to design and build websites, brand identities, and digital products
            that convert visitors into customers and ideas into growth.
          </p>

          {/* Feature chips */}
          <ul className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
            {chips.map((chip) => (
              <li key={chip.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-neutral-900 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
                  {chip.icon}
                </span>
                <span className="text-[15px] font-medium text-neutral-800">{chip.label}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#contact" variant="dark" className="rounded-2xl">
              Schedule a consultation
            </Button>
            <Button href="#contact" variant="gradient" className="rounded-2xl">
              Request a free quote
            </Button>
          </div>

          {/* Trusted by */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["from-rose-300 to-amber-200", "from-sky-300 to-indigo-300", "from-emerald-200 to-teal-300"].map((g, i) => (
                <span key={i} className={`h-11 w-11 rounded-full border-[3px] border-white bg-gradient-to-br ${g} shadow`} />
              ))}
            </div>
            <p className="text-[15px] leading-tight text-neutral-500">
              <span className="font-semibold text-neutral-900">Trusted by</span>
              <br />
              founders shipping software &amp; AI
            </p>
          </div>
        </div>

        {/* Right — torus */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end" data-anim>
          <Image
            src="/images/hero-section-vector.svg"
            alt="Abstract 3D torus"
            width={540}
            height={625}
            priority
            className="h-auto w-full max-w-[520px]"
          />
        </div>
      </Container>
    </section>
  );
}

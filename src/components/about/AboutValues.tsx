import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6L12 16.9 6.6 19.6l1.2-6L3.3 9.4l6.1-.8L12 3z" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.2" />
      <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5M15 19c0-1.8.6-3.2 2-4" />
    </svg>
  );
}

const values = [
  {
    icon: <ShieldIcon />,
    title: "Integrity",
    desc: "Operating with transparency and honest communication throughout every client engagement.",
  },
  {
    icon: <StarIcon />,
    title: "Excellence",
    desc: "Maintaining the highest quality standards across all elements of our work.",
  },
  {
    icon: <PeopleIcon />,
    title: "Collaboration",
    desc: "Functioning as an extension of client teams through genuine partnership.",
  },
];

export function AboutValues() {
  return (
    <section className="bg-black py-20 lg:py-24">
      <Container>
        <div className="text-center" data-anim>
          <Badge tone="dark">Our Values</Badge>
          <h2 className="mt-6 text-[30px] font-bold tracking-tight text-white sm:text-[38px]">
            The principles we work by
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3" data-anim-stagger>
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-[24px] border border-white/10 bg-neutral-950 p-8 transition hover:border-white/25"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                {v.icon}
              </span>
              <h3 className="mt-6 text-[22px] font-semibold text-white">{v.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-neutral-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const stats = [
  { value: "50+", label: "Projects Delivered", sub: "AI, web, branding & enterprise" },
  { value: "3+", label: "Years of Craft", sub: "Consistent delivery since inception" },
  { value: "20+", label: "Happy Clients", sub: "From startups to global institutions" },
];

export function AboutStory() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-anim>
            <Badge>Our Mission</Badge>
            <h2 className="mt-6 text-[30px] font-bold tracking-tight text-black sm:text-[36px]">
              Innovative work, measurable impact
            </h2>
          </div>
          <p className="text-[18px] leading-relaxed text-neutral-600" data-anim>
            We exist to help businesses succeed digitally through innovative,
            high-quality digital solutions that create real, measurable impact for
            our clients and their customers. Founded by design, development, and
            strategy experts, we employ a multidisciplinary approach that combines
            technical rigour with creative thinking.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 sm:grid-cols-3" data-anim-stagger>
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-8 py-10">
              <div
                className="text-brand-gradient text-[56px] font-bold leading-none sm:text-[64px]"
                data-countup={s.value}
              >
                {s.value}
              </div>
              <div className="mt-6 text-[18px] font-semibold text-black">{s.label}</div>
              <div className="mt-1 text-[15px] text-neutral-500">{s.sub}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

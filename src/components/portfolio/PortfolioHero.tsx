import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function PortfolioHero() {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 lg:py-24"
      style={{ backgroundImage: "var(--page-wash)" }}
    >
      <Container>
        <div className="max-w-3xl" data-anim>
          <Badge>Our Work</Badge>
          <h1 className="mt-6 text-[42px] font-bold leading-[1.05] tracking-tight text-black sm:text-[56px] lg:text-[64px]">
            Designing a Better World Today
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-neutral-600 lg:text-[19px]">
            A selection of projects we have delivered for clients across multiple
            industries and geographies.
          </p>
        </div>
      </Container>
    </section>
  );
}

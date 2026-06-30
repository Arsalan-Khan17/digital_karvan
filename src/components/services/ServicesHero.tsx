import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ServicesHero() {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 lg:py-28"
      style={{ backgroundImage: "var(--page-wash)" }}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center" data-anim>
          <Badge>What We Offer</Badge>
          <h1 className="mt-6 text-[42px] font-bold leading-[1.05] tracking-tight text-black sm:text-[56px] lg:text-[64px]">
            This Is What We Do Best
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-neutral-600 lg:text-[19px]">
            From strategy to execution, we provide end-to-end digital services
            that help businesses grow, connect, and thrive in the digital world.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="#services-list" variant="dark" className="rounded-2xl">
              Explore our services
            </Button>
            <Button href="/#contact" variant="gradient" className="rounded-2xl">
              Request a free quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { RevealHeading } from "@/components/fx/RevealHeading";

export function AboutHero() {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 lg:py-24"
      style={{ backgroundImage: "var(--page-wash)" }}
    >
      <Container>
        <div data-anim>
          <Badge>About Us</Badge>
        </div>
        <RevealHeading
          as="h1"
          text="Who We Are"
          className="mt-6 text-[48px] font-bold leading-[1.02] tracking-tight text-black sm:text-[64px] lg:text-[76px]"
        />
        <p className="mt-7 max-w-3xl text-[20px] leading-relaxed text-neutral-700 lg:text-[24px]" data-anim>
          Digital Karvan is a digital agency founded on the belief that
          exceptional digital work requires{" "}
          <span className="text-brand-gradient font-semibold">
            integrity, excellence, and genuine collaboration
          </span>
          .
        </p>
      </Container>
    </section>
  );
}

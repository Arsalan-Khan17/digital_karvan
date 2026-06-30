import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { RevealHeading } from "@/components/fx/RevealHeading";

export function ContactHero() {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 lg:py-24"
      style={{ backgroundImage: "var(--page-wash)" }}
    >
      <Container>
        <div data-anim>
          <Badge>Get In Touch</Badge>
        </div>
        <RevealHeading
          as="h1"
          text="Let's Talk"
          className="mt-6 text-[48px] font-bold leading-[1.02] tracking-tight text-black sm:text-[64px] lg:text-[80px]"
        />
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-neutral-600 lg:text-[19px]" data-anim>
          Have a project in mind? We&rsquo;d love to hear from you. Send us a
          message and we&rsquo;ll get back to you within 24 hours.
        </p>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutCta() {
  return (
    <section className="bg-white pb-20 lg:pb-28">
      <Container>
        <div
          className="overflow-hidden rounded-[32px] bg-brand-gradient px-8 py-14 text-center sm:px-12 lg:py-20"
          data-anim
        >
          <h2 className="mx-auto max-w-2xl text-[32px] font-bold leading-tight tracking-tight text-white sm:text-[44px]">
            Ready to build something exceptional together?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[18px] leading-relaxed text-white/90">
            Let&rsquo;s start a conversation.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/contact" variant="light" className="rounded-2xl">
              Get in Touch
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

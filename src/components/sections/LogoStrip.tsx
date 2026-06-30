import { Container } from "@/components/ui/Container";

/* Replace each label with the exported client logo SVG when available. */
const logos = [
  "Bank of Khyber",
  "GetFeedback",
  "Programa",
  "UserZoom",
  "Demodesk",
  "StackAdapt",
  "hotjar",
];

export function LogoStrip() {
  return (
    <section className="border-y border-black/5 bg-[#fafafa]">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-7">
        {logos.map((name) => (
          <span
            key={name}
            className="text-[17px] font-semibold text-neutral-400 transition hover:text-neutral-600"
          >
            {name}
          </span>
        ))}
      </Container>
    </section>
  );
}

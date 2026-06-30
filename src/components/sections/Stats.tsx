import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const stats = [
  { value: "100", label: "Projects Delivered" },
  { value: "2020", label: "Serving Since" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "10", label: "Industries Served" },
];

export function Stats() {
  return (
    <section className="relative bg-white py-20 lg:py-24" style={{ backgroundImage: "var(--page-wash)" }}>
      <Container>
        <div data-anim>
          <Badge>Our Numbers</Badge>
          <h2 className="mt-6 text-[34px] font-bold tracking-tight text-black sm:text-[38px]">
            Numbers That Build Trust,
          </h2>
          <p className="mt-3 max-w-2xl text-[18px] text-neutral-500">
            Interdisciplinary expertise unified under a single mission: your
            product&rsquo;s success.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4" data-anim-stagger>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-2 py-6 ${i > 0 ? "lg:border-l lg:border-black/10 lg:pl-10" : ""}`}
            >
              <div
                className="text-[64px] font-bold leading-none tracking-tight text-black sm:text-[84px]"
                data-countup={s.value}
              >
                {s.value}
              </div>
              <div className="mt-10 text-[18px] text-neutral-500">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

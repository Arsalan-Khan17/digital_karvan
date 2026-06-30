import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const team = [
  { name: "Azam Tariq", role: "Co-Founder, Managing Partner" },
  { name: "Ayaan Khan", role: "Business Development Strategy Head" },
  { name: "Touseef Ahmad", role: "Full-Stack Engineer" },
  { name: "Muhammad Arsalan Khan", role: "Full-Stack Developer" },
  { name: "Shaheryar Khan", role: "Lead AI & Full-Stack Engineer" },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function AboutTeam() {
  return (
    <section id="team" className="bg-white py-20 lg:py-24">
      <Container>
        <div data-anim>
          <Badge>Our Team</Badge>
          <h2 className="mt-6 text-[30px] font-bold tracking-tight text-black sm:text-[38px]">
            The people behind the work
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-anim-stagger>
          {team.map((m) => (
            <div
              key={m.name}
              className="group flex items-center gap-5 rounded-[24px] border border-black/8 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.3)]"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-[20px] font-bold text-white">
                {initials(m.name)}
              </span>
              <div>
                <h3 className="text-[18px] font-semibold text-black transition-colors group-hover:text-brand-magenta">
                  {m.name}
                </h3>
                <p className="mt-1 text-[14px] text-neutral-500">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

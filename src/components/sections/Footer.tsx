import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    heading: "Company",
    links: ["About Us", "Who we are", "Case Studies", "Careers"],
  },
  {
    heading: "Services",
    links: ["Mobile Development", "UI/UX Designing", "Web Development", "Quality Assurance"],
  },
  {
    heading: "Others",
    links: ["Agreement Policy", "Term & Conditions", "Support Center"],
  },
];

const socials = ["Facebook", "X", "TikTok", "Upwork", "Instagram"];

function SocialIcon({ name }: { name: string }) {
  // Simplified glyphs; swap for brand SVGs if needed.
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-[12px] font-bold text-white">
      {name[0]}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-6 text-[15px] leading-relaxed text-neutral-400">
              We offer various IT services to help our clients stay ahead in the
              constantly evolving technology landscape and achieve their goals.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[18px] font-semibold text-white">{col.heading}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-[15px] text-neutral-400 transition hover:text-white">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-[14px] text-neutral-500">© 2026 Digital Karvan. All rights reserved.</p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <Link key={s} href="#" aria-label={s}>
                <SocialIcon name={s} />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

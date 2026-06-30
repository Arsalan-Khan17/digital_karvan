"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const navItems: { label: string; href: string; hasMenu?: boolean }[] = [
  { label: "Services", href: "#services", hasMenu: true },
  { label: "Industries", href: "#industries", hasMenu: true },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
];

function Chevron() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="mt-0.5">
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md">
      <Container className="flex h-[88px] items-center justify-between gap-6">
        <Link href="#top" aria-label="Digitalkarvan home">
          <Image
            src="/images/logo-header.svg"
            alt="Digitalkarvan"
            width={199}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 xl:flex">
          {navItems.map((item, i) => (
            <div key={item.label} className="flex items-center gap-6">
              <Link
                href={item.href}
                className="flex items-center gap-1 text-[15px] font-medium text-neutral-900 transition-colors hover:text-brand-magenta"
              >
                {item.label}
                {item.hasMenu && <Chevron />}
              </Link>
              {i < 2 && <span className="h-4 w-px bg-black/15" />}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-7 xl:flex">
          <Link
            href="#testimonials"
            className="text-[15px] font-medium text-neutral-900 transition-colors hover:text-brand-magenta"
          >
            Testimonials
          </Link>
          <Button href="#contact" variant="gradient" className="rounded-xl px-6 py-3">
            Contact Us
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 xl:hidden"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-black transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-black transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-black transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </Container>

      {open && (
        <div className="border-t border-black/5 bg-white xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {[...navItems, { label: "Testimonials", href: "#testimonials" }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100"
              >
                {item.label}
              </Link>
            ))}
            <Button href="#contact" variant="gradient" className="mt-2 w-full">
              Contact Us
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}

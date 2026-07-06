"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

const otherNav = [
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/#process" },
  { label: "Team", href: "/#team" },
];

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className={`mt-0.5 ${className}`}>
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide on scroll down, reveal on scroll up (kept visible near the top and
  // while the mobile menu is open).
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-transform duration-300 will-change-transform ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Container className="flex h-[88px] items-center justify-between gap-6">
        <Link href="/" aria-label="Digitalkarvan home">
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
          {/* Services dropdown */}
          <div className="group relative flex items-center gap-6">
            <Link
              href="/services"
              className="flex items-center gap-1 text-[15px] font-medium text-neutral-900 transition-colors hover:text-brand-magenta"
            >
              Services
              <Chevron className="transition-transform group-hover:rotate-180" />
            </Link>
            {/* dropdown */}
            <div className="invisible absolute left-0 top-full z-50 pt-4 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
              <div className="w-80 rounded-2xl border border-black/8 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)]">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-neutral-50"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white [&_svg]:h-[18px] [&_svg]:w-[18px]">
                      {s.icon}
                    </span>
                    <span className="text-[14px] font-medium text-neutral-800">{s.title}</span>
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="mt-1 block rounded-xl px-3 py-3 text-[14px] font-semibold text-brand-magenta transition hover:bg-neutral-50"
                >
                  View all services →
                </Link>
              </div>
            </div>
            <span className="h-4 w-px bg-black/15" />
          </div>

          {otherNav.map((item, i) => (
            <div key={item.label} className="flex items-center gap-6">
              <Link
                href={item.href}
                className="flex items-center gap-1 text-[15px] font-medium text-neutral-900 transition-colors hover:text-brand-magenta"
              >
                {item.label}
              </Link>
              {i === 0 && <span className="h-4 w-px bg-black/15" />}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-7 xl:flex">
          <Link
            href="/#testimonials"
            className="text-[15px] font-medium text-neutral-900 transition-colors hover:text-brand-magenta"
          >
            Testimonials
          </Link>
          <Button href="/contact" variant="gradient" className="rounded-xl px-6 py-3">
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

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-black/5 bg-white xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {/* Services with expandable submenu */}
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center justify-between rounded-lg px-2 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100"
            >
              Services
              <Chevron className={servicesOpen ? "rotate-180" : ""} />
            </button>
            {servicesOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-black/10 pl-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2.5 text-[15px] text-neutral-700 hover:bg-neutral-100"
                  >
                    {s.title}
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-[15px] font-semibold text-brand-magenta hover:bg-neutral-100"
                >
                  View all services →
                </Link>
              </div>
            )}

            {[...otherNav, { label: "Testimonials", href: "/#testimonials" }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" variant="gradient" className="mt-2 w-full">
              Contact Us
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}

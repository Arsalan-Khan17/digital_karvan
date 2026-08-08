"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

const overlayVars: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.25, when: "afterChildren" } },
};
const containerVars: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const itemVars: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 22, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

const otherNav = [
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/#process" },
  // Team section hidden until team images/content are ready
  // { label: "Team", href: "/#team" },
];

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className={`mt-0.5 ${className}`}>
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-magenta">
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-magenta">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const openRef = useRef(false);

  // Hide on scroll down, reveal on scroll up (kept visible near the top and
  // never while the mobile menu is open).
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      if (openRef.current) return; // don't hide the header while the menu is open
      const y = window.scrollY;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the header (logo + close button) visible when the menu opens.
  // NOTE: we deliberately do NOT set overflow:hidden or call lenis.stop() —
  // either one breaks the header's `position: sticky` (it would drop to its
  // document position, off-screen, once the page is scrolled). Background
  // scroll is contained by `data-lenis-prevent` + `overscroll-contain` on the
  // overlay instead.
  useEffect(() => {
    openRef.current = open;
    if (open) setHidden(false);
  }, [open]);

  return (
    <>
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
    </header>

      {/* Mobile menu — full-screen overlay with staggered reveal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            data-lenis-prevent
            variants={overlayVars}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-x-0 bottom-0 top-[88px] z-40 overflow-y-auto overscroll-contain bg-white xl:hidden"
          >
            <motion.div
              variants={containerVars}
              className="mx-auto flex min-h-full w-full max-w-[1264px] flex-col gap-1 px-5 py-6 sm:px-6"
            >
              {/* Services with expandable submenu */}
              <motion.div variants={itemVars}>
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100"
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
              </motion.div>

              {[...otherNav, { label: "Testimonials", href: "/#testimonials" }].map((item) => (
                <motion.div key={item.label} variants={itemVars}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Bottom: CTA + contact details */}
              <motion.div variants={itemVars} className="mt-auto pt-6">
                <Button href="/contact" variant="gradient" className="w-full">
                  Contact Us
                </Button>
                <div className="mt-6 flex flex-col gap-1 border-t border-black/10 pt-5">
                  <a
                    href="tel:+447377259354"
                    className="flex items-center gap-3 rounded-lg px-2 py-3 text-[15px] font-medium text-neutral-800 hover:bg-neutral-100"
                  >
                    <PhoneIcon />
                    +44 737 7259 354
                  </a>
                  <a
                    href="mailto:contact@digitalkarvan.com"
                    className="flex items-center gap-3 rounded-lg px-2 py-3 text-[15px] font-medium text-neutral-800 hover:bg-neutral-100"
                  >
                    <MailIcon />
                    contact@digitalkarvan.com
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

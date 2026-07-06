"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { clsx } from "@/lib/clsx";

const faqs = [
  {
    q: "How long does a typical website project take?",
    a: "Most website projects take between 4–12 weeks depending on scope and complexity. We provide a detailed timeline during our initial consultation.",
  },
  {
    q: "Do you work with clients outside the UK?",
    a: "Yes, absolutely. We work with clients across the UK, UAE, Europe, and beyond. All our processes are designed to work remotely.",
  },
  {
    q: "What is your typical pricing?",
    a: "Pricing varies based on project requirements. Small websites start from £3,000 while comprehensive solutions can range from £15,000 upwards. We provide detailed quotes after understanding your needs.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes, we offer maintenance and support packages to keep your website secure, fast, and up-to-date after launch.",
  },
];

export function ContactFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-white pt-12 pb-24" style={{ backgroundImage: "var(--page-wash)" }}>
      <Container>
        <div className="text-center" data-anim>
          <Badge>FAQ</Badge>
          <h2 className="mt-6 text-[34px] font-bold tracking-tight text-black sm:text-[38px]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl" data-anim>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-start gap-5 py-6 text-left"
                >
                  <span className="flex-1 text-[18px] font-semibold text-black">{item.q}</span>
                  <span className="mt-1 text-[24px] leading-none text-brand-magenta">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                <div
                  className={clsx(
                    "grid overflow-hidden text-[16px] leading-relaxed text-neutral-500 transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
                  )}
                >
                  <span className="overflow-hidden">{item.a}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

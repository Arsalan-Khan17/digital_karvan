"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { clsx } from "@/lib/clsx";

const tabs: Record<string, { q: string; a: string }[]> = {
  "About Us": [
    { q: "What is Digital Karvan?", a: "Digital Karvan is a digital product agency. We help businesses design, build, test, and launch modern software, from marketing websites to full-scale platforms." },
    { q: "What does Digital Karvan do?", a: "We provide software development, AI and intelligent systems, data and analytics, branding and design, and technical consultation. Most clients engage us to take a product from idea to launch, though we also join existing teams to accelerate delivery." },
    { q: "Why choose Digital Karvan?", a: "Because we combine full-stack range with genuine accountability. One team owns your strategy, design, and code, delivers on weekly cycles, and stays involved after launch." },
    { q: "What makes Digital Karvan different?", a: "We operate as a product partner, not a task taker. We bring modern AI fluency, a unified design system approach, and a 100% client retention record that reflects how we work." },
    { q: "Do you help from idea to launch?", a: "Yes. Our five-step process covers strategy, design, build, test, and launch, and we continue to support your product as it grows." },
  ],
  "Our Services": [
    { q: "Software Development", a: "Web apps, mobile apps, and the backends that power them — engineered to hold up as you grow." },
    { q: "AI & Intelligent Systems", a: "LLMs, chatbots, and workflow automation embedded directly into the workflows that run your business." },
    { q: "Data & Analytics", a: "Data pipelines, warehousing, and Power BI dashboards that turn raw data into decisions you can defend." },
    { q: "Branding & Design", a: "Brand identity, UI/UX, and graphics — interfaces that are as intuitive to use as they are polished to look at." },
    { q: "Consultation & Technical Guidance", a: "Straight answers and a clear plan — stack selection, architecture reviews, and audits, even if you never build with us." },
  ],
  Support: [
    { q: "How do I contact support?", a: "Reach us anytime via the contact form and we'll respond within one business day." },
    { q: "Do you offer SLAs?", a: "Yes — enterprise clients get dedicated SLAs and priority response." },
    { q: "What about post-launch fixes?", a: "Ongoing maintenance is included in our long-term partnership plans." },
    { q: "Can you take over an existing product?", a: "Absolutely — we regularly inherit and stabilize legacy codebases." },
    { q: "How is billing handled?", a: "Transparent monthly cycles, no hidden agency overhead." },
  ],
};

const tabNames = Object.keys(tabs);

export function Faq() {
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const [openIndex, setOpenIndex] = useState(0);
  const items = tabs[activeTab];

  return (
    <section className="relative bg-white py-16 lg:py-20" style={{ backgroundImage: "var(--page-wash)" }}>
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        {/* Left */}
        <div data-anim>
          <Badge>Know More</Badge>
          <h2 className="mt-6 text-[34px] font-bold tracking-tight text-black sm:text-[38px]">
            Frequently Asked Questions
          </h2>

          {/* Tabs */}
          <div className="mt-7 inline-flex rounded-full bg-neutral-100 p-1">
            {tabNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setActiveTab(name);
                  setOpenIndex(0);
                }}
                className={clsx(
                  "rounded-full px-5 py-2.5 text-[14px] font-medium transition",
                  activeTab === name ? "bg-brand-gradient text-white" : "text-neutral-700 hover:text-black",
                )}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="mt-8">
            {items.map((item, i) => {
              const open = openIndex === i;
              return (
                <div key={item.q} className="border-b border-black/10">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-start gap-5 py-5 text-left"
                  >
                    <span
                      className={clsx(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[15px] font-bold tabular-nums",
                        open ? "bg-black text-white" : "bg-neutral-100 text-neutral-400",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[18px] font-semibold text-black">{item.q}</span>
                      <span
                        className={clsx(
                          "grid overflow-hidden text-[15px] leading-relaxed text-neutral-500 transition-all duration-300",
                          open ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <span className="overflow-hidden">{item.a}</span>
                      </span>
                    </span>
                    <span className="mt-1 text-[22px] leading-none text-brand-magenta">{open ? "–" : "+"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — 3D D logo (hidden on mobile) */}
        <div className="hidden items-center justify-center sm:flex" style={{ alignSelf: 'flex-end' }} data-anim>
          <Image
            src="/images/faq-section-logo.svg"
            alt="Digital Karvan 3D logo"
            width={566}
            height={566}
            className="h-auto w-full max-w-[460px]"
          />
        </div>
      </Container>
    </section>
  );
}

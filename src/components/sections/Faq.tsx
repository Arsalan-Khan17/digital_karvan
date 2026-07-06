"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { clsx } from "@/lib/clsx";

const tabs: Record<string, { q: string; a: string }[]> = {
  "About Us": [
    { q: "What is Digital Karvan?", a: "Digital Karvan is a digital product agency that helps businesses design, build, test, and launch modern digital solutions." },
    { q: "What does Digital Karvan do?", a: "We deliver software engineering, AI systems, data & analytics, and product design under one roof." },
    { q: "Why choose Digital Karvan?", a: "Predictable timelines, modern AI-native tooling, and a full-stack team that stays with you past launch." },
    { q: "What makes Digital Karvan different?", a: "Code-first design and zero-friction handoff mean fewer gaps between idea and shipped product." },
    { q: "Do you help from idea to launch?", a: "Yes — from strategy and design through build, test, and launch, we travel the whole journey with you." },
  ],
  "Our Services": [
    { q: "Software Engineering", a: "Scalable backends, performant frontends, and native mobile apps built for long-term growth." },
    { q: "AI & Intelligent Systems", a: "Integrating LLMs and custom machine learning models into your core business workflows." },
    { q: "Data & Analytics", a: "Custom data pipelines and real-time visualization dashboards." },
    { q: "Product Designing", a: "UX-led design systems that ensure your product looks as good as it functions." },
    { q: "Maintenance & Growth", a: "We stay past launch, iterating and maintaining the product with you." },
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

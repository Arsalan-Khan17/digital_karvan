"use client";

import { useRef } from "react";
import Link from "next/link";
import { services } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";

const FEATURE_LIMIT = 3;

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".s-head > *", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".s-head", start: "top 86%", once: true },
      });

      gsap.from(".svc", {
        opacity: 0,
        y: 32,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".svc-list", start: "top 84%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="services" className="py-[clamp(4.5rem,11vh,9rem)] bg-bg-primary">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="s-head flex justify-between items-end gap-6 flex-wrap mb-[clamp(2.4rem,5vh,4rem)]">
          <div>
            <span className="eyebrow">What We Do</span>
            <h2 className="sec-title text-[clamp(2rem,4.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-text-primary mt-6">
              Our <em>Services</em>
            </h2>
          </div>
          <Link href="/services" className="btn">
            <span className="lbl">All services</span>
            <span className="arr">→</span>
          </Link>
        </div>

        <div className="svc-list">
          {services.map((service, i) => (
            <Link key={service.id} href={`/services/${service.slug}`} className="svc">
              <span className="no">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{service.title}</h3>
              </div>
              <div>
                <p className="desc">{service.shortDescription}</p>
                <div className="tags">
                  {service.features.slice(0, FEATURE_LIMIT).map((feat) => (
                    <span key={feat} className="tag">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
              <span className="go" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

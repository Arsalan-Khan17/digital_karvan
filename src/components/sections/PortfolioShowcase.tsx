"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { projects as portfolio } from "@/data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const items = portfolio.slice(0, 5); // matches the reference's 5 slides
const N = items.length;
const pad = (i: number) => String(i + 1).padStart(2, "0");
const SHOW = "inset(0% 0% 0% 0%)";
const HIDE = "inset(0% 0% 100% 0%)"; // clipped from the bottom → wipes down to reveal

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 7h10m0 0L6.5 2M12 7l-5.5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PortfolioShowcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);
  const prevRef = useRef(0);
  const firstRun = useRef(true);

  // Scroll driver: a plain ScrollTrigger reads progress across the tall section
  // (the inner is pinned by CSS `sticky`). It derives the active index and
  // feeds the per-tab progress underline. Desktop only.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const exact = self.progress * N;
            const idx = Math.min(N - 1, Math.floor(exact));
            const intra = exact - idx;
            setActive(idx);
            barRefs.current.forEach((el, i) => {
              if (el) el.style.width = (i < idx ? 1 : i === idx ? intra : 0) * 100 + "%";
            });
          },
        });
        stRef.current = st;
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Image clip-wipe + text crossfade whenever the active index changes.
  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 1023px)").matches) return;
      const prev = prevRef.current;

      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        if (firstRun.current) {
          gsap.set(el, { clipPath: i === active ? SHOW : HIDE, zIndex: i === active ? 20 : 10 });
        } else if (i === active) {
          gsap.fromTo(
            el,
            { clipPath: HIDE },
            { clipPath: SHOW, duration: 0.7, ease: "power3.inOut", zIndex: 20 },
          );
        } else if (i === prev) {
          gsap.set(el, { clipPath: SHOW, zIndex: 15 });
        } else {
          gsap.set(el, { zIndex: 10 });
        }
      });

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        if (firstRun.current) {
          gsap.set(el, { autoAlpha: i === active ? 1 : 0, y: i === active ? 0 : 24 });
        } else if (i === active) {
          gsap.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" });
        } else {
          gsap.to(el, { autoAlpha: 0, y: -16, duration: 0.3, ease: "power2.in" });
        }
      });

      firstRun.current = false;
      prevRef.current = active;
    },
    { dependencies: [active], scope: sectionRef },
  );

  const jumpTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    st.scroll(st.start + ((i + 0.5) / N) * (st.end - st.start));
  };

  return (
    <>
      {/* ---------- Desktop: pinned, scroll-driven clip-wipe slider ---------- */}
      <section
        ref={sectionRef}
        className="relative hidden bg-white lg:block"
        style={{ height: `${(N + 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative mx-auto h-full max-w-[1440px] px-[6vw]">
            <Badge className="absolute top-[12vh] flex items-center gap-3">What we do</Badge>

            {/* Text items (center-left) — crossfade */}
            <div className="absolute top-1/4 w-[40%] -translate-y-1/2">
              {items.map((p, i) => (
                <div
                  key={p.slug}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                >
                  <div className="mb-6 flex items-center gap-3 text-[13px] text-neutral-400">
                    <span className="tabular-nums">{pad(i)}</span>
                    <span className="h-px w-8 bg-neutral-300" />
                    <span className="uppercase tracking-[0.14em]">{p.tags[0]}</span>
                  </div>
                  <h3 className="max-w-xl text-[38px] font-bold leading-[1.1] tracking-tight text-black">
                    {p.title}
                  </h3>
                  <p className="mt-6 max-w-md text-[17px] leading-relaxed text-neutral-500 line-clamp-4">
                    {p.overview}
                  </p>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-[14px] font-medium text-white transition hover:-translate-y-0.5"
                  >
                    <Arrow />
                    More information
                  </Link>
                </div>
              ))}
            </div>

            {/* Images (right) — tall, clip-path wipe */}
            <div className="shadow-[0_30px_60px_-25px_rgba(0,0,0,0.4)] absolute right-[6vw] top-1/4 h-[60vh] w-[50%] overflow-hidden rounded-[6px] bg-neutral-100">
              {items.map((p, i) => (
                <div
                  key={p.slug}
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  className="absolute inset-0"
                  style={{ clipPath: HIDE }}
                >
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="26vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>

            {/* Nav tabs with progress underline (bottom-left) */}
            <div className="absolute bottom-[10vh] flex w-[40%] flex-wrap gap-x-8 gap-y-2">
              {items.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className={`relative pb-3 text-left text-[15px] transition-colors ${
                    active === i ? "text-black" : "text-neutral-400 hover:text-neutral-700"
                  }`}
                >
                  {p.client}
                  <span className="absolute inset-x-0 bottom-0 block h-[2px] bg-neutral-200">
                    <span
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className="block h-full w-0 bg-black"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Mobile: simple stacked list (no scroll-hijack) ---------- */}
      <section className="bg-white py-16 lg:hidden">
        <Container>
          <Badge>Our Work</Badge>
          <h2 className="mt-5 text-[30px] font-bold tracking-tight text-black">What we do</h2>
          <div className="mt-10 space-y-12">
            {items.map((p, i) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="block">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <Image src={p.cover} alt={p.title} fill sizes="100vw" className="object-cover object-top" />
                </div>
                <div className="mt-5 flex items-center gap-3 text-[13px] text-neutral-400">
                  <span className="tabular-nums">{pad(i)}</span>
                  <span className="h-px w-8 bg-neutral-300" />
                  <span className="uppercase tracking-[0.14em]">{p.tags[0]}</span>
                </div>
                <h3 className="mt-3 text-[26px] font-bold leading-tight tracking-tight text-black">
                  {p.title}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-neutral-500 line-clamp-3">
                  {p.overview}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-black">
                  <Arrow />
                  More information
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

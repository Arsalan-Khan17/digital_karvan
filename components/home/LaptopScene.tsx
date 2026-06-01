"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntroReady } from "@/hooks/useIntroReady";
import { useIsTouch } from "@/hooks/useIsTouch";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The hero "person at a laptop" scene. Ported from the design reference:
 *  - part-by-part assembly intro (desk → chair → laptop → body → head → …),
 *    gated on the preloader curtain via useIntroReady so it reveals in sync;
 *  - idle loops (typing hands, blink, caret, screen scroll, coffee steam,
 *    glow pulse, orbit rings) once the intro settles;
 *  - cursor gaze (head follows pointer), 3D scene tilt, and float depth
 *    parallax — engaged only after the intro settles, and only on fine pointers.
 * Reduced motion → fully static, visible scene.
 */
export default function LaptopScene() {
  const ref = useRef<HTMLDivElement>(null);
  const trackReady = useRef(false);
  const ready = useIntroReady();
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  // ── Assembly intro + idle loops ──────────────────────────────
  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) return; // reduced motion → static, fully-visible scene

      const PARTS = ["#desk", "#chair", "#laptop", "#body", "#head", "#hands", "#coffee", "#sparks"];
      if (!ready) {
        // Hidden until the curtain lifts (runs in useLayoutEffect → no flash).
        gsap.set([...PARTS, ".float"], { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          trackReady.current = true;
        },
      });
      tl.fromTo("#desk", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo("#chair", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.45")
        .fromTo(
          "#laptop",
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, transformOrigin: "50% 100%", duration: 0.7, ease: "back.out(1.6)" },
          "-=0.35"
        )
        .fromTo("#body", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.45")
        .fromTo(
          "#head",
          { y: -30, opacity: 0, scale: 0.7 },
          { y: 0, opacity: 1, scale: 1, transformOrigin: "50% 60%", duration: 0.7, ease: "back.out(2)" },
          "-=0.35"
        )
        .fromTo("#hands", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .fromTo("#coffee", { opacity: 0, x: 14 }, { opacity: 1, x: 0, duration: 0.4 }, "-=0.3")
        .fromTo(
          "#sparks",
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(2)" },
          "-=0.3"
        )
        .fromTo(
          ".float",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        );

      // Idle loops start after the assembly finishes (delay = its duration) so
      // they don't fight the entrance tweens. Created synchronously → reverted
      // by useGSAP's context on cleanup/re-run.
      const aDur = tl.duration();
      gsap.to("#hands", { y: "+=2.5", duration: 0.16, yoyo: true, repeat: -1, ease: "sine.inOut", delay: aDur });
      gsap.to("#caret", { opacity: 0, duration: 0.5, yoyo: true, repeat: -1, ease: "steps(1)", delay: aDur });
      gsap.to("#screenContent", { y: "-=3", duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: aDur });
      gsap.to("#steam", { opacity: 0.9, y: "-=4", duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: aDur });
      gsap.to(".scene-glow", { opacity: 0.6, scale: 1.06, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: aDur });
      gsap
        .timeline({ repeat: -1, repeatDelay: 3.2, delay: aDur })
        .to("#eyes", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.08 })
        .to("#eyes", { scaleY: 1, duration: 0.08 });
    },
    { scope: ref, dependencies: [ready, reduced] }
  );

  // ── Pointer tracking: gaze, scene tilt, float depth parallax ──
  useEffect(() => {
    if (reduced || isTouch) return;
    const root = ref.current;
    if (!root) return;

    const sceneTilt = root.querySelector<HTMLElement>(".scene-tilt");
    const head = root.querySelector<SVGGElement>("#head");
    const floats = Array.from(root.querySelectorAll<HTMLElement>(".float")).map((el) => ({
      el,
      d: parseFloat(el.dataset.depth || "16"),
    }));

    let gx: ((value: number) => void) | null = null;
    let gy: ((value: number) => void) | null = null;
    let gr: ((value: number) => void) | null = null;
    if (head) {
      gsap.set(head, { svgOrigin: "240 232" });
      gx = gsap.quickTo(head, "x", { duration: 0.6, ease: "power3" });
      gy = gsap.quickTo(head, "y", { duration: 0.6, ease: "power3" });
      gr = gsap.quickTo(head, "rotation", { duration: 0.6, ease: "power3" });
    }

    let nx = 0, ny = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      nx = e.clientX / window.innerWidth - 0.5;
      ny = e.clientY / window.innerHeight - 0.5;
    };
    const loop = () => {
      cx += (nx - cx) * 0.08;
      cy += (ny - cy) * 0.08;
      if (trackReady.current) {
        if (sceneTilt) {
          sceneTilt.style.transform = `rotateX(${(-cy * 7).toFixed(2)}deg) rotateY(${(cx * 10).toFixed(2)}deg)`;
        }
        if (gx && gy && gr) {
          gx(cx * 12);
          gy(cy * 9);
          gr(cx * 5);
        }
        for (const f of floats) {
          f.el.style.transform = `translate3d(${(cx * f.d).toFixed(1)}px, ${(cy * f.d).toFixed(1)}px, 0)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced, isTouch]);

  return (
    <div className="hero-art" ref={ref} aria-hidden="true">
      <div className="scene-tilt">
        <div className="scene-glow" />
        <div className="scene-ring" />
        <div className="scene-ring two" />

        <svg className="figure" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e11d48" stopOpacity=".55" />
              <stop offset="1" stopColor="#ff2357" stopOpacity=".15" />
            </linearGradient>
          </defs>

          {/* chair back */}
          <g id="chair">
            <rect x="178" y="150" width="124" height="150" rx="40" className="sk-soft" />
            <rect x="190" y="162" width="100" height="128" rx="32" fill="var(--sk-chair)" />
          </g>

          {/* desk */}
          <g id="desk">
            <rect x="44" y="372" width="392" height="16" rx="8" className="sk-soft" />
            <rect x="60" y="388" width="10" height="40" rx="4" className="sk-soft" />
            <rect x="410" y="388" width="10" height="40" rx="4" className="sk-soft" />
          </g>

          {/* body + arms */}
          <g id="body">
            <path d="M150 372 q0 -78 90 -78 q90 0 90 78 Z" className="sk-body" />
            <path d="M168 312 C150 330 140 350 150 366" className="sk-line" />
            <path d="M312 312 C330 330 340 350 330 366" className="sk-line" />
            <rect x="232" y="284" width="16" height="26" rx="8" className="sk-soft" />
            <path d="M214 308 q26 -16 52 0" className="sk-acc-stroke" fill="none" strokeWidth="6" strokeLinecap="round" />
          </g>

          {/* hands */}
          <g id="hands">
            <rect id="handL" x="166" y="356" width="34" height="16" rx="8" className="sk-soft" />
            <rect id="handR" x="280" y="356" width="34" height="16" rx="8" className="sk-soft" />
          </g>

          {/* head */}
          <g id="head">
            <circle cx="240" cy="232" r="40" className="sk-skin" />
            <path d="M202 224 q4 -44 38 -44 q34 0 38 44 q-18 -16 -38 -16 q-20 0 -38 16 Z" className="sk-soft" />
            <g id="eyes">
              <circle cx="227" cy="232" r="3.4" fill="var(--sk-eye)" />
              <circle cx="253" cy="232" r="3.4" fill="var(--sk-eye)" />
            </g>
            <path d="M231 248 q9 7 18 0" stroke="var(--text-primary)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="214" y="226" width="20" height="14" rx="5" fill="none" stroke="var(--accent)" strokeWidth="2.4" />
            <rect x="246" y="226" width="20" height="14" rx="5" fill="none" stroke="var(--accent)" strokeWidth="2.4" />
            <line x1="234" y1="232" x2="246" y2="232" stroke="var(--accent)" strokeWidth="2.4" />
          </g>

          {/* laptop */}
          <g id="laptop">
            <rect x="158" y="350" width="164" height="16" rx="5" className="sk-soft" />
            <rect x="170" y="262" width="140" height="92" rx="8" className="sk-screen" />
            <rect x="178" y="270" width="124" height="76" rx="5" className="sk-screenglow" />
            <g id="screenContent">
              <rect x="186" y="280" width="60" height="6" rx="3" className="code-a" />
              <rect x="186" y="294" width="92" height="5" rx="2.5" className="code-l" />
              <rect x="186" y="305" width="74" height="5" rx="2.5" className="code-l" />
              <rect x="186" y="316" width="50" height="5" rx="2.5" className="code-a" />
              <rect x="252" y="324" width="42" height="14" rx="3" fill="rgba(255,255,255,.10)" />
              <rect id="caret" className="caret" x="240" y="316" width="2.4" height="6" rx="1" />
            </g>
          </g>

          {/* coffee */}
          <g id="coffee">
            <rect x="356" y="350" width="26" height="22" rx="4" className="sk-soft" />
            <path d="M382 354 h6 a6 6 0 0 1 0 12 h-6" fill="none" stroke="var(--border-default)" strokeWidth="3" />
            <g id="steam" opacity="0">
              <path d="M363 344 q4 -6 0 -12" stroke="var(--accent-soft)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <path d="M373 344 q-4 -6 0 -12" stroke="var(--accent-soft)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* accent sparkles */}
          <g id="sparks">
            <path d="M120 200 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" className="sk-acc-br" opacity=".8" />
            <path d="M360 210 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5 Z" className="sk-acc" opacity=".7" />
            <circle cx="110" cy="320" r="4" className="sk-acc-br" />
          </g>
        </svg>

        {/* floating UI cards */}
        <div className="float code" data-depth="26">
          <div className="float-bob">
            <div className="win">
              <i />
              <i />
              <i />
            </div>
            <pre>
              <span className="k">const</span> growth = <span className="s">build</span>(idea);
              {"\n"}
              <span className="k">return</span> growth.<span className="s">launch</span>();
            </pre>
          </div>
        </div>

        <div className="float metric" data-depth="-34">
          <div className="float-bob">
            <div className="tiny">Conversion</div>
            <div className="big" style={{ color: "var(--accent-soft)" }}>
              +45% <span style={{ fontSize: ".8rem" }}>▲</span>
            </div>
            <svg className="spark" viewBox="0 0 54 20">
              <polyline points="0,16 10,12 20,14 30,7 42,9 54,2" fill="none" stroke="var(--accent-bright)" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="float status" data-depth="20">
          <div className="float-bob">
            <div className="big" style={{ fontSize: ".85rem" }}>
              <span className="dot" /> Deployed to production
            </div>
          </div>
        </div>

        <div className="float rating" data-depth="-22">
          <div className="float-bob">
            <div className="stars">★★★★★</div>
            <div className="tiny" style={{ marginTop: ".2rem" }}>
              20+ happy clients
            </div>
          </div>
        </div>

        <div className="scene-cap">crafted, shipped &amp; growing</div>
      </div>
    </div>
  );
}

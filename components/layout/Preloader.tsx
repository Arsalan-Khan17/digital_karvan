"use client";

import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { signalIntroReady } from "@/lib/introGate";

// Timing (ms). Curtain begins at COUNT_DUR + POST_COUNT (~2180); the hero intro
// is signalled HERO_LEAD later (~2350 total) so it reveals as the curtain rises.
const COUNT_DUR = 2000;
const POST_COUNT = 180;
const HERO_LEAD = 170;
const CURTAIN_DUR = 800;

const STATES: [number, string][] = [
  [0, "Initialising"],
  [30, "Loading assets"],
  [62, "Composing layout"],
  [88, "Finishing touches"],
];

export default function Preloader() {
  const { stop, start } = useSmoothScroll();
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(STATES[0][1]);
  const [revealing, setRevealing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const fillRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // Read reduced motion synchronously (avoids a counter flash for those users).
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      signalIntroReady();
      setHidden(true);
      return;
    }

    // Lock scroll while the curtain is down.
    document.body.classList.add("lock");
    stop();

    const timers: number[] = [];
    let rafId = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - t0) / COUNT_DUR, 1);
      // easeInOutQuad
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const v = Math.round(e * 100);
      setCount(v);
      if (fillRef.current) fillRef.current.style.width = v + "%";
      for (let i = STATES.length - 1; i >= 0; i--) {
        if (v >= STATES[i][0]) {
          setStatus(STATES[i][1]);
          break;
        }
      }

      if (p < 1) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Count done → lift the curtain, release scroll, then time the hero in.
      timers.push(
        window.setTimeout(() => {
          setRevealing(true);
          document.body.classList.remove("lock");
          start();
          timers.push(window.setTimeout(() => signalIntroReady(), HERO_LEAD));
          timers.push(window.setTimeout(() => setHidden(true), CURTAIN_DUR + 60));
        }, POST_COUNT)
      );
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach((t) => clearTimeout(t));
      document.body.classList.remove("lock");
    };
    // stop/start are stable (useCallback); run-once is enforced by startedRef.
  }, [stop, start]);

  if (hidden) return null;

  return (
    <div className={`preloader${revealing ? " is-done" : ""}`} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__brand">
          Digital<span>Karvan</span>
        </div>
        <div className="preloader__count">
          <span>{count}</span>
          <span className="preloader__pct">/ 100</span>
        </div>
        <div className="preloader__bar">
          <span ref={fillRef} />
        </div>
        <div className="preloader__tag">
          <span>Designing the experience</span>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}

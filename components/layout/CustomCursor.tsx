"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on pointer-fine devices (desktop)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let ringX = dotX;
    let ringY = dotY;
    let raf: number;
    const isHovering = { current: false };

    const onMouseMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const onMouseEnterEl = () => {
      isHovering.current = true;
      ringRef.current?.classList.add("is-hovering");
    };
    const onMouseLeaveEl = () => {
      isHovering.current = false;
      ringRef.current?.classList.remove("is-hovering");
    };

    const attachListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select, label").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterEl);
        el.addEventListener("mouseleave", onMouseLeaveEl);
      });
    };
    attachListeners();

    // Re-attach on DOM mutations (e.g. dropdowns opening)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      ringX += (dotX - ringX) * 0.13;
      ringY += (dotY - ringY) * 0.13;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
    };
    tick();

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

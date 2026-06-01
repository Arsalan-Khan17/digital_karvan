"use client";

import { useEffect, useState } from "react";

/**
 * True on touch / coarse-pointer devices (no fine hover). Use it to disable
 * pointer-tracking effects — cursor gaze, scene tilt, magnetic CTAs, spotlight —
 * which are meaningless (and janky) without a precise hovering pointer.
 *
 * Returns `false` on the server / first client render, then reconciles on mount.
 */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isTouch;
}

export default useIsTouch;

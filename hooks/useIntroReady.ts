"use client";

import { useEffect, useState } from "react";
import { isIntroReady, onIntroReady } from "@/lib/introGate";

/**
 * Returns `true` once the preloader curtain begins lifting (or immediately on
 * subsequent client navigations / reduced motion). Hero-style intro animations
 * use this to start exactly in sync with the curtain.
 */
export function useIntroReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isIntroReady()) {
      setReady(true);
      return;
    }
    return onIntroReady(() => setReady(true));
  }, []);

  return ready;
}

export default useIntroReady;

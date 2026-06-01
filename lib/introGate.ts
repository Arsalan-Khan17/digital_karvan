/**
 * Tiny pub/sub gate that lets the Preloader tell the Hero (and any other
 * intro-timed animation) exactly when to start — i.e. the moment the preloader
 * curtain begins lifting. Decoupled from the React tree so mount order and
 * route doesn't matter.
 *
 * Module state persists across client-side navigations (so the intro doesn't
 * replay), and resets on a hard reload (so the preloader + intro run again).
 */

let ready = false;
const subscribers = new Set<() => void>();

/** Called by the Preloader when the curtain begins to lift. */
export function signalIntroReady(): void {
  if (ready) return;
  ready = true;
  subscribers.forEach((cb) => cb());
  subscribers.clear();
}

export function isIntroReady(): boolean {
  return ready;
}

/** Subscribe to the ready signal. Fires immediately if already ready. Returns an unsubscribe fn. */
export function onIntroReady(cb: () => void): () => void {
  if (ready) {
    cb();
    return () => {};
  }
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

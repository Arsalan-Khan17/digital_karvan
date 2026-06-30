import { clsx } from "@/lib/clsx";

/**
 * "Digitalkarvan" wordmark + tagline (CSS approximation of the brand mark).
 * Swap for the exported logo SVG when available.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  /** dark = black text (light bg), light = white text (dark bg) */
  tone?: "dark" | "light";
}) {
  return (
    <span className={clsx("inline-flex flex-col leading-none", className)}>
      <span className="flex items-baseline text-[26px] font-bold tracking-tight">
        <span className="text-brand-gradient">D</span>
        <span className={tone === "dark" ? "text-black" : "text-white"}>igital</span>
        <span
          className={clsx(
            "italic -skew-x-6",
            tone === "dark" ? "text-black" : "text-white",
          )}
        >
          karvan
        </span>
      </span>
      <span
        className={clsx(
          "mt-1 text-[8px] font-medium tracking-[0.18em]",
          tone === "dark" ? "text-neutral-500" : "text-neutral-400",
        )}
      >
        Smart Tech. Simple Solutions.
      </span>
    </span>
  );
}

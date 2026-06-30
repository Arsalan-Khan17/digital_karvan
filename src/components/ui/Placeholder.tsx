import { clsx } from "@/lib/clsx";

type PlaceholderProps = {
  /** Label shown in the centre, e.g. "3D Torus render" */
  label: string;
  /** Extra hint, e.g. "1200×1200 PNG" */
  hint?: string;
  className?: string;
  /** "brand" = gradient fill, "neutral" = grey fill */
  variant?: "brand" | "neutral" | "dark";
  rounded?: boolean;
};

/**
 * Visual stand-in for an asset that will be exported from Figma later.
 * Replace each <Placeholder /> with <Image /> once the real assets exist.
 */
export function Placeholder({
  label,
  hint,
  className,
  variant = "neutral",
  rounded = true,
}: PlaceholderProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden text-center",
        rounded && "rounded-[var(--radius-card)]",
        variant === "brand" && "bg-brand-gradient",
        variant === "neutral" &&
          "bg-neutral-200 [background-image:repeating-linear-gradient(45deg,rgba(0,0,0,0.04)_0px,rgba(0,0,0,0.04)_10px,transparent_10px,transparent_20px)]",
        variant === "dark" &&
          "bg-neutral-900 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_10px,transparent_10px,transparent_20px)]",
        className,
      )}
    >
      <div className="px-4 py-3">
        <span
          className={clsx(
            "block text-xs font-semibold uppercase tracking-widest sm:text-sm",
            variant === "brand"
              ? "text-white/90"
              : variant === "dark"
                ? "text-white/70"
                : "text-neutral-500",
          )}
        >
          {label}
        </span>
        {hint && (
          <span
            className={clsx(
              "mt-1 block text-[10px] tracking-wide",
              variant === "brand"
                ? "text-white/70"
                : variant === "dark"
                  ? "text-white/40"
                  : "text-neutral-400",
            )}
          >
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

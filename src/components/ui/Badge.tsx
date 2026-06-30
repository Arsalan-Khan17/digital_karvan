import { clsx } from "@/lib/clsx";

/**
 * Skewed eyebrow label with a soft gradient under-glow, as used above every
 * section heading (e.g. "OUR SERVICES", "WORKFLOW", "PROJECTS").
 */
export function Badge({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  /** light = on white sections, dark = on black sections */
  tone?: "light" | "dark";
}) {
  return (
    <span className={clsx("relative inline-flex", className)}>
      {/* gradient glow underlay */}
      <span
        aria-hidden
        className="bg-brand-gradient absolute inset-0 -skew-x-10 rounded-md opacity-90 blur-[2px]"
      />
      <span
        className={clsx(
          "eyebrow relative rounded-md px-4 py-1.5",
          tone === "light" ? "text-black" : "text-white",
        )}
      >
        <span>{children}</span>
      </span>
    </span>
  );
}

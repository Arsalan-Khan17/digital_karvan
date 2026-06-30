import { clsx } from "@/lib/clsx";

/**
 * Section eyebrow label: black uppercase text, a gradient "[" bracket on the
 * left (coral → pink → purple), and a soft pink background that fades to
 * transparent toward the right.
 */
export function Badge({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  /** light = on white sections, dark = on black sections (keeps text legible) */
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={clsx(
        "relative inline-flex items-center overflow-hidden rounded-[4px] py-2.5 pl-5 pr-9",
        className,
      )}
    >
      {/* fading background */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            tone === "dark"
              ? "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,232,243,0.7) 45%, rgba(255,255,255,0) 88%)"
              : "linear-gradient(to right, rgba(245,49,138,0.22) 0%, rgba(245,49,138,0.08) 45%, rgba(245,49,138,0) 85%)",
        }}
      />

      {/* gradient "[" bracket: vertical spine + top & bottom arms */}
      <span aria-hidden className="absolute left-0 top-0 bottom-0 w-[5px] rounded-sm bg-gradient-to-b from-[#ff6a66] via-[#f5318a] to-[#8a2be2]" />
      <span aria-hidden className="absolute left-0 top-0 h-[5px] w-6 rounded-sm bg-[#ff6a66]" />
      <span aria-hidden className="absolute left-0 bottom-0 h-[5px] w-6 rounded-sm bg-[#8a2be2]" />

      {/* label */}
      <span className="relative text-[14px] font-bold uppercase tracking-[0.16em] text-black">
        {children}
      </span>
    </span>
  );
}

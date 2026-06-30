import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "gradient" | "dark" | "light" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-[15px] font-medium transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  gradient:
    "bg-brand-gradient text-white shadow-[0_14px_34px_-12px_rgba(214,43,121,0.7)]",
  dark: "bg-black text-white hover:bg-neutral-800",
  light: "bg-white text-neutral-900 hover:bg-neutral-100",
  outline: "border border-black/15 text-neutral-900 hover:bg-black/[0.04]",
};

export function Button({
  children,
  href,
  variant = "gradient",
  className,
  type = "button",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}) {
  const classes = clsx(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}

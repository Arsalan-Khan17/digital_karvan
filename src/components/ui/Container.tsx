import { clsx } from "@/lib/clsx";

/**
 * Centered content wrapper. Source design is 1440px wide with ~88px gutters,
 * giving a ~1264px content column.
 */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1264px] px-5 sm:px-6 lg:px-0", className)}>
      {children}
    </div>
  );
}

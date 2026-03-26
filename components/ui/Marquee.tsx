"use client";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Marquee({ children, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="animate-marquee flex whitespace-nowrap">
        <span className="flex">{children}</span>
        <span className="flex">{children}</span>
      </div>
    </div>
  );
}

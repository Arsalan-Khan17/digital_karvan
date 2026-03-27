"use client";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Marquee({ children, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* translate3d forces a GPU compositing layer — prevents flicker on Safari */}
      <div className="animate-marquee flex whitespace-nowrap [transform:translate3d(0,0,0)]">
        <span className="flex">{children}</span>
        <span className="flex">{children}</span>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

interface ButtonProps {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function ButtonInner({
  classes,
  disabled,
  children,
}: {
  classes: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (disabled) return;
    const el = spanRef.current;
    if (!el) return;
    const onEnter = () => gsap.to(el, { scale: 1.05, duration: 0.3, ease: "back.out(2)" });
    const onLeave = () => gsap.to(el, { scale: 1,    duration: 0.4, ease: "elastic.out(1, 0.4)" });
    const onDown  = () => gsap.to(el, { scale: 0.97, duration: 0.1, ease: "power2.in" });
    const onUp    = () => gsap.to(el, { scale: 1.03, duration: 0.25, ease: "back.out(2)" });

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown",  onDown);
    el.addEventListener("mouseup",    onUp);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown",  onDown);
      el.removeEventListener("mouseup",    onUp);
    };
  }, { scope: spanRef });

  return <span ref={spanRef} className={classes}>{children}</span>;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-colors cursor-pointer";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary: "bg-accent text-white hover:bg-red-700",
    ghost:   "bg-transparent text-text-primary border border-text-primary/30 hover:border-text-primary hover:bg-text-primary/5",
    outline: "bg-transparent text-text-primary border border-text-primary/30 hover:border-text-primary hover:bg-text-primary/5",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const inner = <ButtonInner classes={classes} disabled={disabled}>{children}</ButtonInner>;

  if (href) return <Link href={href}>{inner}</Link>;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-flex">
      {inner}
    </button>
  );
}

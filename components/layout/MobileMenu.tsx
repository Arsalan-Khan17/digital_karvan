"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Sun, Moon } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import { gsap } from "@/lib/gsap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const menuRef    = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLUListElement>(null);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const list = listRef.current;
    if (!menu || !list) return;

    tlRef.current?.kill();
    tlRef.current = gsap.timeline();

    if (isOpen) {
      gsap.set(menu, { display: "flex", x: "100%", opacity: 1 });
      tlRef.current
        .to(menu, { x: "0%", duration: 0.45, ease: "power4.out" })
        .from(
          list.children,
          {
            opacity: 0,
            x: -24,
            duration: 0.35,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.2"
        );
    } else {
      tlRef.current
        .to(list.children, {
          opacity: 0,
          x: 24,
          duration: 0.2,
          stagger: 0.04,
          ease: "power2.in",
        })
        .to(menu, { x: "100%", duration: 0.35, ease: "power4.in" }, "-=0.15")
        .set(menu, { display: "none" });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50 bg-bg-primary flex flex-col"
      style={{
        display: "none",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border-subtle shrink-0">
        <Link href="/" className="text-lg sm:text-xl font-bold text-text-primary" onClick={onClose}>
          Digital Karvan
        </Link>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2.5 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={onClose}
            className="p-2.5 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-6">
        <ul ref={listRef} className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className={`block text-2xl font-medium py-3.5 border-b border-border-subtle transition-colors ${
                  pathname === link.href ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <ul className="pl-4 mt-1.5 space-y-1">
                  {link.dropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block text-base text-text-muted py-2.5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-5 sm:px-6 py-6 border-t border-border-subtle shrink-0">
        <Link
          href="/contact"
          onClick={onClose}
          className="block w-full text-center py-4 bg-accent text-white font-medium rounded-full hover:bg-red-700 transition-colors"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}

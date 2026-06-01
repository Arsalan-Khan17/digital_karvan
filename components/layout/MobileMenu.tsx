"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import Link from "next/link";
import { X, Sun, Moon } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import { gsap } from "@/lib/gsap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  id?: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function MobileMenu({ isOpen, onClose, pathname, id, triggerRef }: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const menuRef      = useRef<HTMLDivElement>(null);
  const listRef      = useRef<HTMLUListElement>(null);
  const tlRef        = useRef<gsap.core.Timeline | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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
        // fromTo (not from): the close tween may have left the links at
        // opacity:0 (incl. StrictMode's mount double-invoke), and `from`
        // would animate "from 0 to the current 0" — a no-op. fromTo pins
        // the end state so links always become visible.
        .fromTo(
          list.children,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.2"
        );
      // Move focus to first nav link after animation completes
      const focusTimer = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 450);
      return () => clearTimeout(focusTimer);
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
        .set(menu, { display: "none", onComplete: () => {
          triggerRef?.current?.focus();
        }});
    }
  }, [isOpen]);

  // Focus trap — keep Tab key inside the menu while open, Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const menu = menuRef.current;
      if (!menu) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef?.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const focusable = Array.from(
          menu.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  return (
    <div
      id={id}
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 bg-bg-primary flex flex-col"
      style={{
        display: "none",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border-subtle shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg sm:text-xl font-semibold text-text-primary"
          onClick={onClose}
        >
          <span className="brand-dot" aria-hidden="true" />
          Digital<span className="text-accent">Karvan</span>
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
            className="p-3 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-6">
        <ul ref={listRef} className="space-y-1">
          {navLinks.map((link, index) => (
            <li key={link.href}>
              <Link
                href={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={onClose}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`block text-3xl sm:text-4xl font-medium py-3.5 border-b border-border-subtle transition-colors hover:text-accent ${
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
                        className="block text-base text-text-muted py-2.5 transition-colors hover:text-accent"
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
          className="block w-full text-center py-4 bg-gradient-to-r from-accent to-accent-bright text-white font-semibold rounded-full shadow-[0_10px_36px_-10px_rgba(225,29,72,0.8)] transition-shadow hover:shadow-[0_12px_44px_-8px_rgba(225,29,72,0.9)]"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}

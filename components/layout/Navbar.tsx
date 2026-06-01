"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, Sun, Moon } from "lucide-react";
import { navLinks } from "@/lib/data";
import MobileMenu from "./MobileMenu";
import AnimatedLogo from "./AnimatedLogo";
import { useTheme } from "@/components/ThemeProvider";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Portfolio detail pages (/portfolio/<slug>) render a permanently dark hero
  // behind the transparent navbar. While still transparent, force light text.
  const hasDarkHero = /^\/portfolio\/[^/]+\/?$/.test(pathname);
  const onDark = hasDarkHero && !scrolled;

  // iOS Safari scroll lock — overflow:hidden alone doesn't work on iOS
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const idleLinkClass = onDark
    ? "text-white/70 hover:text-white"
    : "text-text-secondary hover:text-text-primary";
  const activeLinkClass = onDark ? "text-white" : "text-text-primary";
  const iconBtnClass = onDark
    ? "text-white/80 hover:text-white"
    : "text-text-secondary hover:text-text-primary";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-[padding,background,border-color] duration-400 ${
          scrolled ? "border-b border-border-subtle py-2" : "border-b border-transparent py-3.5"
        }`}
        style={
          scrolled
            ? {
                backgroundColor: "var(--navbar-bg)",
                backdropFilter: "blur(14px) saturate(140%)",
                WebkitBackdropFilter: "blur(14px) saturate(140%)",
              }
            : undefined
        }
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <AnimatedLogo onDark={onDark} />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                if (link.dropdown) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        className={`line-draw${isActive ? " active" : ""} flex items-center gap-1 text-sm font-medium transition-colors ${
                          isActive ? activeLinkClass : idleLinkClass
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-bg-card border border-border-default rounded-xl overflow-hidden shadow-2xl"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors border-b border-border-subtle last:border-0"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`line-draw${isActive ? " active" : ""} text-sm font-medium transition-colors ${
                      isActive ? activeLinkClass : idleLinkClass
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + theme toggle + hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 transition-colors rounded-lg hover:bg-bg-elevated ${iconBtnClass}`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link
                ref={ctaRef}
                href="/contact"
                className="hidden lg:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-accent to-accent-bright shadow-[0_8px_30px_-10px_rgba(225,29,72,0.7)] transition-shadow hover:shadow-[0_10px_36px_-8px_rgba(225,29,72,0.85)] will-change-transform"
              >
                Get a Quote
              </Link>
              <button
                id="mobile-menu-btn"
                ref={hamburgerRef}
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden p-2.5 min-h-[44px] min-w-[44px] transition-colors ${iconBtnClass}`}
                aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu-panel"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        id="mobile-menu-panel"
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        triggerRef={hamburgerRef}
      />
    </>
  );
}

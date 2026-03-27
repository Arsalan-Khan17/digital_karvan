"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, Sun, Moon } from "lucide-react";
import { navLinks } from "@/lib/data";
import MobileMenu from "./MobileMenu";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      <motion.header
        // Use --navbar-bg (explicit rgba) instead of bg-bg-primary/95 which relies on
        // color-mix() + CSS variables — unreliable on older Safari versions.
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md border-b border-border-subtle"
            : "bg-transparent"
        }`}
        style={scrolled ? { backgroundColor: "var(--navbar-bg)" } : undefined}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-text-primary tracking-tight">
              Digital Karvan
            </Link>

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
                        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                          isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
                      )}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-bg-card border border-border-default rounded-xl overflow-hidden shadow-2xl"
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
                  <div key={link.href} className="relative">
                    <Link
                      href={link.href}
                      className={`text-sm font-medium transition-colors ${
                        isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent" />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA + theme toggle + hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center px-5 py-2 text-sm font-medium bg-accent text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Get a Quote
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

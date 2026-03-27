"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Sun, Moon } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-bg-primary flex flex-col"
          // Safe area top/bottom for notched iPhones (requires viewport-fit=cover)
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border-subtle shrink-0">
            <Link
              href="/"
              className="text-lg sm:text-xl font-bold text-text-primary"
              onClick={onClose}
            >
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

          {/* Nav links — overscroll-contain prevents scroll chaining to body on iOS */}
          <nav className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-6">
            <motion.ul
              className="space-y-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { delayChildren: 0.05, staggerChildren: 0.07 } },
                hidden: {},
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block text-2xl font-medium py-3.5 border-b border-border-subtle transition-colors ${
                      pathname === link.href
                        ? "text-text-primary"
                        : "text-text-secondary"
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
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          {/* CTA — extra bottom padding handled via safe-area on the container */}
          <div className="px-5 sm:px-6 py-6 border-t border-border-subtle shrink-0">
            <Link
              href="/contact"
              onClick={onClose}
              className="block w-full text-center py-4 bg-accent text-white font-medium rounded-full hover:bg-red-700 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

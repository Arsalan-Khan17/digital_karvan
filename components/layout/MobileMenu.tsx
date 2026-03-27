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
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
            <Link href="/" className="text-xl font-bold text-text-primary" onClick={onClose}>
              Digital Karvan
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <motion.ul
              className="space-y-2"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    delayChildren: 0.1,
                    staggerChildren: 0.08,
                  },
                },
                hidden: {},
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block text-2xl font-medium py-3 border-b border-border-subtle transition-colors ${
                      pathname === link.href
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <ul className="pl-4 mt-2 space-y-2">
                      {link.dropdown.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="block text-base text-text-muted hover:text-text-primary py-2 transition-colors"
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

          <div className="px-6 py-8 border-t border-border-subtle">
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

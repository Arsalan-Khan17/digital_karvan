"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Dark is the brand default. The blocking inline script in layout.tsx sets the
  // `.dark` class on <html> before paint (no FOUC); here we sync React state to it.
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("theme") as Theme | null;
      const next: Theme = stored === "light" ? "light" : "dark";
      setTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
    } catch {
      // localStorage may be blocked in private browsing on iOS Safari
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Silently fail if localStorage is unavailable
    }
  };

  // Suppress rendering the toggle UI until mounted to prevent hydration mismatch
  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : "dark", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

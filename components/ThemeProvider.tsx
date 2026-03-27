"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with "light" to match SSR — avoids hydration mismatch flash on Safari
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "dark" || stored === "light") {
        setTheme(stored);
        if (stored === "dark") {
          document.documentElement.classList.add("dark");
        }
      }
    } catch {
      // localStorage may be blocked in private browsing on iOS Safari
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
    <ThemeContext.Provider value={{ theme: mounted ? theme : "light", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

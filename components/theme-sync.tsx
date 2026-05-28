"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "system" | "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  cycle: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- must read localStorage after mount to avoid SSR mismatch
      setModeState(stored);
    }
  }, []);

  useEffect(() => {
    const apply = () => {
      let dark: boolean;
      if (mode === "dark") dark = true;
      else if (mode === "light") dark = false;
      else dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      document.documentElement.classList.toggle("dark", dark);
      setIsDark(dark);
    };

    apply();

    if (mode === "system") {
      const m = window.matchMedia("(prefers-color-scheme: dark)");
      m.addEventListener("change", apply);
      return () => m.removeEventListener("change", apply);
    }
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    if (m === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", m);
  }, []);

  const cycle = useCallback(() => {
    setMode(mode === "system" ? "light" : mode === "light" ? "dark" : "system");
  }, [mode, setMode]);

  const value = useMemo(() => ({ mode, setMode, cycle, isDark }), [mode, setMode, cycle, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

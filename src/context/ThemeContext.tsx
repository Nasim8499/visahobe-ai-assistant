import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
  auroraEnabled: boolean;
  setAuroraEnabled: (enabled: boolean) => void;
  auroraIntensity: number;
  setAuroraIntensity: (value: number) => void;
};

const ThemeContext = createContext<Ctx | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [auroraEnabled, setAuroraEnabledState] = useState(true);
  const [auroraIntensity, setAuroraIntensityState] = useState(62);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("vh-theme")) as Theme | null;
    const storedAurora = typeof window !== "undefined" ? localStorage.getItem("vh-aurora-enabled") : null;
    const storedIntensity = typeof window !== "undefined" ? localStorage.getItem("vh-aurora-intensity") : null;

    if (stored === "light" || stored === "dark") setThemeState(stored);
    if (storedAurora === "true" || storedAurora === "false") setAuroraEnabledState(storedAurora === "true");
    if (storedIntensity) {
      const value = Number(storedIntensity);
      if (!Number.isNaN(value)) setAuroraIntensityState(Math.min(100, Math.max(0, value)));
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("vh-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("aurora-off", !auroraEnabled);
    root.style.setProperty("--aurora-intensity", String(auroraIntensity / 100));
    localStorage.setItem("vh-aurora-enabled", String(auroraEnabled));
    localStorage.setItem("vh-aurora-intensity", String(auroraIntensity));
  }, [auroraEnabled, auroraIntensity]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggle = () => setThemeState((p) => (p === "light" ? "dark" : "light"));
  const setAuroraEnabled = (enabled: boolean) => setAuroraEnabledState(enabled);
  const setAuroraIntensity = (value: number) => setAuroraIntensityState(Math.min(100, Math.max(0, value)));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle, auroraEnabled, setAuroraEnabled, auroraIntensity, setAuroraIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

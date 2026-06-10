import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light";
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
  const [auroraEnabled, setAuroraEnabledState] = useState(true);
  const [auroraIntensity, setAuroraIntensityState] = useState(76);

  useEffect(() => {
    const storedAurora = typeof window !== "undefined" ? localStorage.getItem("vh-aurora-enabled") : null;
    const storedIntensity = typeof window !== "undefined" ? localStorage.getItem("vh-aurora-intensity") : null;

    if (storedAurora === "true" || storedAurora === "false") setAuroraEnabledState(storedAurora === "true");
    if (storedIntensity) {
      const value = Number(storedIntensity);
      if (!Number.isNaN(value)) setAuroraIntensityState(Math.min(100, Math.max(0, value)));
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    localStorage.setItem("vh-theme", "light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("aurora-off", !auroraEnabled);
    root.style.setProperty("--aurora-intensity", String(auroraIntensity / 100));
    localStorage.setItem("vh-aurora-enabled", String(auroraEnabled));
    localStorage.setItem("vh-aurora-intensity", String(auroraIntensity));
  }, [auroraEnabled, auroraIntensity]);

  const setTheme = () => undefined;
  const toggle = () => undefined;
  const setAuroraEnabled = (enabled: boolean) => setAuroraEnabledState(enabled);
  const setAuroraIntensity = (value: number) => setAuroraIntensityState(Math.min(100, Math.max(0, value)));

  return (
    <ThemeContext.Provider value={{ theme: "light", setTheme, toggle, auroraEnabled, setAuroraEnabled, auroraIntensity, setAuroraIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "@/context/ThemeContext";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  const { auroraEnabled } = useTheme();

  useEffect(() => {
    const updateVisibility = () => setTabActive(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    window.addEventListener("blur", updateVisibility);
    window.addEventListener("focus", updateVisibility);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      window.removeEventListener("blur", updateVisibility);
      window.removeEventListener("focus", updateVisibility);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full bg-background">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden aurora-shell"
        data-active={auroraEnabled && tabActive ? "true" : "false"}
      >
        <div className="absolute inset-0 bg-gradient-soft" />
        {auroraEnabled && (
          <>
            <div className="aurora-layer aurora-1" />
            <div className="aurora-layer aurora-2" />
            <div className="aurora-layer aurora-3" />
            <div className="aurora-layer aurora-4" />
          </>
        )}
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenu={() => setOpen(true)} />
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

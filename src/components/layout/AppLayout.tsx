import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex min-h-screen w-full bg-background">
      {/* Gemini-style dynamic animated aurora background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft" />
        <div className="aurora-layer aurora-1" />
        <div className="aurora-layer aurora-2" />
        <div className="aurora-layer aurora-3" />
        <div className="absolute inset-0 grid-bg opacity-25" />
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

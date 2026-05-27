import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex min-h-screen w-full bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="glow-orb animate-float-glow absolute -top-32 -right-32 h-96 w-96 rounded-full" />
        <div className="glow-orb animate-float-glow absolute bottom-0 left-1/3 h-80 w-80 rounded-full" style={{ animationDelay: "3s" }} />
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

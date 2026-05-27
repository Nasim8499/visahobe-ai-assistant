import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, MessageSquare, Folder, BookOpen, Cpu, KeyRound,
  Building2, Image as ImageIcon, Code2, BarChart3, Settings, X
} from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { to: "/", label: "Assistant", icon: Sparkles },
  { to: "/chat-history", label: "Chat History", icon: MessageSquare },
  { to: "/my-stuff", label: "My Stuff", icon: Folder },
  { to: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { to: "/ai-models", label: "AI Models", icon: Cpu },
  { to: "/api-keys", label: "API Keys", icon: KeyRound },
  { to: "/company-profile", label: "Company Profile", icon: Building2 },
  { to: "/image-generator", label: "Image Generator", icon: ImageIcon },
  { to: "/code-assistant", label: "Code Assistant", icon: Code2 },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const { pathname } = useLocation();

  const content = (
    <div className="flex h-full flex-col gap-2 overflow-y-auto bg-sidebar p-4">
      <div className="mb-2 flex items-center justify-between px-2">
        <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-gradient-hero shadow-glow">
            <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">VisaHOBe</span>
            <span className="text-[10px] text-muted-foreground">AI Assistant</span>
          </div>
        </NavLink>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <Icon className={cn("relative h-4 w-4 shrink-0", active && "text-primary")} />
              <span className="relative">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-sidebar-border bg-gradient-card p-4 shadow-soft">
        <p className="text-xs font-medium">VisaHOBe Agency</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Digital Marketing • Visa Content • Recruitment
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        {content}
      </aside>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", !open && "pointer-events-none")}>
        <div
          onClick={onClose}
          className={cn(
            "absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <motion.aside
          initial={false}
          animate={{ x: open ? 0 : "-100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 240 }}
          className="absolute left-0 top-0 h-full w-72 border-r border-sidebar-border bg-sidebar shadow-xl"
        >
          {content}
        </motion.aside>
      </div>
    </>
  );
}

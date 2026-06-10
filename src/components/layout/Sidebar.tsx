import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, MessageSquarePlus, Search, Library, Gem, BookOpen, Plus, FileText, Pin, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAIN_ITEMS = [
  { to: "/", label: "New chat", icon: MessageSquarePlus },
  { to: "/chat-history", label: "Search chats", icon: Search },
  { to: "/my-stuff", label: "Library", icon: Library },
  { to: "/knowledge-base", label: "Gems", icon: Gem },
];

const NOTEBOOKS = ["Visa document workflow", "A4 print templates", "Passport OCR review"];
const RECENTS = ["Preview Project Files", "VisaHOBe Platform", "Employment Contract", "Serbia Submission", "Singapore Visa Submission", "Australia Checklist", "Client QA Review"];

interface Props { open: boolean; onClose: () => void; }

export default function Sidebar({ open, onClose }: Props) {
  const { pathname } = useLocation();
  const content = (
    <div className="flex h-full flex-col overflow-y-auto bg-sidebar px-3 py-4">
      <div className="mb-4 flex items-center justify-between px-1">
        <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-hero shadow-glow"><Sparkles className="h-4 w-4 text-white" /></div>
          <span className="text-lg font-semibold tracking-tight">VisaHOBe</span>
        </NavLink>
        <button onClick={onClose} className="rounded-full p-1.5 text-muted-foreground hover:bg-sidebar-accent lg:hidden" aria-label="Close sidebar"><X className="h-4 w-4" /></button>
      </div>

      <nav className="space-y-1">
        {MAIN_ITEMS.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return <NavLink key={item.to} to={item.to} onClick={onClose} className={cn("group relative flex items-center gap-3 rounded-full px-3 py-2.5 text-sm transition-smooth", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/85 hover:bg-sidebar-accent/70")}>
            {active && <motion.span layoutId="gemini-active-pill" className="absolute inset-0 rounded-full bg-sidebar-accent" transition={{ type: "spring", bounce: 0.18, duration: 0.45 }} />}
            <Icon className="relative h-4 w-4" /><span className="relative font-medium">{item.label}</span>
          </NavLink>;
        })}
      </nav>

      <section className="mt-7 space-y-2">
        <p className="px-3 text-xs font-medium text-muted-foreground">Notebooks</p>
        <button className="flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm text-sidebar-foreground/85 hover:bg-sidebar-accent/70"><Plus className="h-4 w-4" /> New notebook</button>
        {NOTEBOOKS.map((n) => <button key={n} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-sidebar-foreground/85 hover:bg-sidebar-accent/70"><BookOpen className="h-4 w-4 shrink-0" /><span className="truncate">{n}</span></button>)}
      </section>

      <section className="mt-7 space-y-1">
        <p className="px-3 pb-1 text-xs font-medium text-muted-foreground">Recents</p>
        {RECENTS.map((r) => <button key={r} className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-sidebar-foreground/85 hover:bg-sidebar-accent/70"><FileText className="h-4 w-4 shrink-0" /><span className="truncate">{r}</span><Pin className="ml-auto h-3 w-3 opacity-45 group-hover:opacity-100" /></button>)}
      </section>

      <div className="mt-auto flex items-center gap-3 rounded-2xl px-2 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-hero text-xs font-bold text-white">VH</div>
        <div className="min-w-0"><p className="truncate text-sm font-semibold">VisaHOBe AI Agent</p><p className="text-xs text-muted-foreground">A4 visa docs</p></div>
        <NavLink to="/settings" className="ml-auto rounded-full p-2 hover:bg-sidebar-accent"><Settings className="h-4 w-4" /></NavLink>
      </div>
    </div>
  );
  return <>
    <aside className="hidden w-[296px] shrink-0 border-r border-sidebar-border/70 bg-sidebar lg:block">{content}</aside>
    <div className={cn("fixed inset-0 z-50 lg:hidden", !open && "pointer-events-none")}>
      <div onClick={onClose} className={cn("absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity", open ? "opacity-100" : "opacity-0")} />
      <motion.aside initial={false} animate={{ x: open ? 0 : "-100%" }} transition={{ type: "spring", damping: 30, stiffness: 250 }} className="absolute left-0 top-0 h-full w-[min(86vw,320px)] border-r border-sidebar-border bg-sidebar shadow-xl">{content}</motion.aside>
    </div>
  </>;
}

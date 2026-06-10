import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Paperclip, Image as ImageIcon, FileText, Mic, ArrowUp,
  Wand2, Code2, Mail, Megaphone, Languages, Lightbulb,
  Briefcase, Users, Search, FileSignature, Rows3, LayoutGrid, Grid2x2, Printer, Minimize2, Maximize2, Eye
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { visaKnowledge } from "@/data/visaKnowledge";

const QUICK_CHIPS = [
  { icon: Briefcase, label: "Prepare A4 visa checklist", short: "Visa" },
  { icon: FileSignature, label: "Draft cover letter structure", short: "Cover" },
  { icon: Users, label: "Client document QA", short: "QA" },
  { icon: Mail, label: "Client follow-up message", short: "Email" },
  { icon: Search, label: "Country workflow checklist", short: "Country" },
  { icon: Lightbulb, label: "Missing document review", short: "Review" },
];

const PROMPT_CARDS = [
  { title: "Visa Documents", short: "Docs", desc: "A4-ready pack", icon: FileSignature, accent: "from-cyan-500/20 to-blue-500/20" },
  { title: "Passport Intake", short: "OCR", desc: "Verify data", icon: Briefcase, accent: "from-blue-500/20 to-violet-500/20" },
  { title: "Client QA", short: "QA", desc: "Review gaps", icon: Search, accent: "from-violet-500/20 to-fuchsia-500/20" },
  { title: "Recruitment", short: "Hire", desc: "Worker pipeline", icon: Users, accent: "from-fuchsia-500/20 to-pink-500/20" },
];

type PromptStyle = "segmented" | "pill" | "compact" | "icons";

export default function Assistant() {
  const { chats, activeChatId, newChat, addMessage } = useApp();
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [promptStyle, setPromptStyle] = useState<PromptStyle>(
    () => (localStorage.getItem("visahobe.promptStyle") as PromptStyle) || "segmented"
  );
  const [compact, setCompact] = useState<boolean>(
    () => localStorage.getItem("visahobe.compact") === "1"
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeChat?.messages.length, thinking]);

  useEffect(() => {
    localStorage.setItem("visahobe.promptStyle", promptStyle);
  }, [promptStyle]);
  useEffect(() => {
    localStorage.setItem("visahobe.compact", compact ? "1" : "0");
    document.documentElement.classList.toggle("compact", compact);
  }, [compact]);

  const createPreviewResponse = (content: string) => {
    const pack = visaKnowledge.documentPacks.slice(0, 5).join(" · ");
    const countries = visaKnowledge.countries.slice(0, 6).join(", ");
    return [
      `VisaHOBe Brain Mushroom is using the company visa-document knowledge base for: "${content}".`,
      "",
      "A4-ready consultant output structure:",
      "1. Applicant summary from verified client data only.",
      "2. Passport and identity field review.",
      "3. Required supporting document checklist.",
      "4. Cover letter / explanation structure.",
      "5. Consultant QA notes before submission.",
      "",
      `Default document pack: ${pack}.`,
      `Active workflow countries include: ${countries}, and more.`,
      "",
      "Compliance: this assistant must not create fake records, forged evidence, or misleading visa materials. It prepares lawful review drafts only. Use A4 PDF for print-ready consultant review."
    ].join("\n");
  };

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    let id = activeChatId;
    if (!id) id = newChat();
    addMessage(id, { role: "user", content });
    setInput("");
    setThinking(true);
    setTimeout(() => {
      addMessage(id!, {
        role: "assistant",
        content: createPreviewResponse(content),
      });
      setThinking(false);
    }, 650);
  };

  const hasChat = activeChat && activeChat.messages.length > 0;

  const printPDF = () => {
    document.documentElement.classList.add("print-a4");
    setTimeout(() => {
      window.print();
      setTimeout(() => document.documentElement.classList.remove("print-a4"), 500);
    }, 50);
  };

  const styleOptions = useMemo(
    () => [
      { id: "segmented" as const, icon: Rows3, label: "Segmented" },
      { id: "pill" as const, icon: LayoutGrid, label: "Pills" },
      { id: "compact" as const, icon: Grid2x2, label: "Cards" },
      { id: "icons" as const, icon: Sparkles, label: "Icons" },
    ],
    []
  );

  return (
    <div className={cn("mx-auto flex w-full max-w-5xl flex-col px-4 sm:px-6", "h-[calc(100vh-3.5rem)]")}>
      {!hasChat ? (
        <div id="assistant-printable" className={cn("flex flex-1 flex-col items-center justify-center text-center", compact ? "py-3" : "py-8")}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn("relative", compact ? "mb-3" : "mb-6")}
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-hero blur-3xl opacity-40 animate-pulse-soft" />
            <div className={cn("flex items-center justify-center rounded-2xl bg-gradient-hero shadow-glow", compact ? "h-12 w-12" : "h-16 w-16")}>
              <Sparkles className={cn("text-white", compact ? "h-5 w-5" : "h-7 w-7")} />
            </div>
          </motion.div>
          <h1 className={cn("font-semibold tracking-tight", compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-5xl")}>
            Hi, I'm <span className="text-gradient">VisaHOBe AI</span>
          </h1>
          {!compact && (
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Company-only Brain Mushroom for lawful visa documents, A4 print-ready consultant packs, passport intake, recruitment workflow, and client QA review.
            </p>
          )}

          <div className={cn("mt-5 grid w-full gap-3 print:hidden sm:grid-cols-3", compact ? "hidden" : "")}> 
            <div className="rounded-2xl border border-border bg-card/80 p-4 text-left shadow-card backdrop-blur">
              <p className="text-xs font-semibold text-primary">Brain Mushroom</p>
              <p className="mt-1 text-xs text-muted-foreground">VisaHOBe company knowledge base connected for visa-document workflows.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 p-4 text-left shadow-card backdrop-blur">
              <p className="text-xs font-semibold text-primary">A4 by default</p>
              <p className="mt-1 text-xs text-muted-foreground">Every output is prepared for review, printing, and PDF export.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 p-4 text-left shadow-card backdrop-blur">
              <p className="text-xs font-semibold text-primary">Verified data only</p>
              <p className="mt-1 text-xs text-muted-foreground">No fake records, no forged evidence, no misleading documents.</p>
            </div>
          </div>

          <div className={cn("flex w-full flex-wrap items-center justify-center gap-2 print:hidden", compact ? "mt-4" : "mt-6")}>
            <div className="inline-flex items-center rounded-full border border-border bg-card/80 p-1 shadow-card backdrop-blur">
              {styleOptions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setPromptStyle(s.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-smooth",
                    promptStyle === s.id ? "bg-gradient-hero text-white shadow-glow" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <s.icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setCompact((v) => !v)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-card hover:text-foreground">
              {compact ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              {compact ? "Cozy" : "Compact"}
            </button>
            <button onClick={printPDF} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-card hover:text-foreground">
              <Printer className="h-3 w-3" /> A4 PDF
            </button>
            <button onClick={() => send("Create a Gemini-style site preview for VisaHOBe A4 visa document workflow")} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-card hover:text-foreground">
              <Eye className="h-3 w-3" /> Site Preview
            </button>
          </div>

          <div className={cn("w-full", compact ? "mt-4" : "mt-6")}>
            <PromptShortcuts style={promptStyle} compact={compact} onPick={send} />
          </div>
        </div>
      ) : (
        <div ref={scrollRef} id="assistant-printable" className={cn("flex-1 space-y-4 overflow-y-auto", compact ? "py-3" : "py-6")}>
          {activeChat!.messages.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%] whitespace-pre-wrap text-sm", m.role === "user" ? "rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-card" : "text-foreground")}>
                {m.content}
              </div>
            </motion.div>
          ))}
          <AnimatePresence>
            {thinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: "120ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-500" style={{ animationDelay: "240ms" }} />
                </span>
                Preparing A4-ready visa document preview...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className={cn("sticky bottom-0 print:hidden", compact ? "pb-2 pt-1" : "pb-4 pt-2")}>
        {!compact && (
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK_CHIPS.map((c) => (
              <button key={c.label} onClick={() => send(c.label)} className="flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition-smooth hover:bg-secondary hover:text-foreground">
                <c.icon className="h-3 w-3" /> {c.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative rounded-3xl border border-border bg-card p-2 shadow-card">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-hero opacity-20 blur-xl" />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask VisaHOBe AI for A4 visa documents, checklist, cover letter, passport review..."
            rows={compact ? 1 : 2}
            className="block w-full resize-none rounded-2xl bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <IconBtn label="Attach"><Paperclip className="h-4 w-4" /></IconBtn>
              <IconBtn label="Image"><ImageIcon className="h-4 w-4" /></IconBtn>
              <IconBtn label="File"><FileText className="h-4 w-4" /></IconBtn>
              <IconBtn label="Mic"><Mic className="h-4 w-4" /></IconBtn>
            </div>
            <button onClick={() => send()} disabled={!input.trim()} className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-hero text-white shadow-glow transition-smooth hover:scale-105 disabled:opacity-40">
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
        {!compact && <p className="mt-2 text-center text-[11px] text-muted-foreground">VisaHOBe company preview — API keys will enable live model responses while keeping A4 document mode.</p>}
      </div>
    </div>
  );
}

function PromptShortcuts({ style, compact, onPick }: { style: PromptStyle; compact: boolean; onPick: (text: string) => void; }) {
  if (style === "segmented") {
    return (
      <div className="mx-auto w-full overflow-x-auto">
        <div className="mx-auto inline-flex min-w-full items-stretch divide-x divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:min-w-0">
          {PROMPT_CARDS.map((c) => (
            <button key={c.title} onClick={() => onPick(`${c.title}: ${c.desc}`)} className="group relative flex-1 px-3 py-2.5 text-center text-xs font-medium transition-smooth hover:bg-secondary">
              <div className="flex items-center justify-center gap-1.5"><c.icon className="h-3.5 w-3.5 text-primary" /><span className="sm:hidden">{c.short}</span><span className="hidden sm:inline">{c.title}</span></div>
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (style === "icons") {
    return <div className="flex flex-wrap justify-center gap-3">{PROMPT_CARDS.map((c) => <button key={c.title} onClick={() => onPick(`${c.title}: ${c.desc}`)} className="group flex w-20 flex-col items-center gap-1.5 rounded-2xl border border-border bg-card p-3 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-glow"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-glow"><c.icon className="h-4 w-4" /></div><span className="text-[11px] font-medium">{c.short}</span></button>)}</div>;
  }
  if (style === "compact") {
    return <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{PROMPT_CARDS.map((c) => <button key={c.title} onClick={() => onPick(`${c.title}: ${c.desc}`)} className={cn("group relative overflow-hidden rounded-xl border border-border bg-card text-left shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-glow", compact ? "p-2.5" : "p-3")}><div className={cn("absolute inset-0 -z-10 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-90", c.accent)} /><div className="flex items-center gap-2"><c.icon className="h-3.5 w-3.5 text-primary" /><span className="text-xs font-semibold">{c.title}</span></div>{!compact && <p className="mt-1 text-[11px] text-muted-foreground">{c.desc}</p>}</button>)}</div>;
  }
  return <div className="flex flex-wrap justify-center gap-2">{PROMPT_CARDS.map((c) => <button key={c.title} onClick={() => onPick(`${c.title}: ${c.desc}`)} className="group relative overflow-hidden rounded-full border border-border bg-card px-4 py-2 text-xs font-medium shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-glow"><div className={cn("absolute inset-0 -z-10 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-90", c.accent)} /><span className="font-semibold">{c.title}</span>{!compact && <span className="ml-1.5 text-muted-foreground">· {c.desc}</span>}</button>)}</div>;
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return <button title={label} className="rounded-lg p-2 hover:bg-secondary" type="button">{children}</button>;
}

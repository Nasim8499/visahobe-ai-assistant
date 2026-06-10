import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Paperclip, Image as ImageIcon, FileText, Mic, ArrowUp,
  Wand2, Code2, Mail, Megaphone, Languages, Lightbulb
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const QUICK_CHIPS = [
  { icon: Wand2, label: "Write marketing copy" },
  { icon: Megaphone, label: "Ad campaign ideas" },
  { icon: Mail, label: "Draft cold email" },
  { icon: Languages, label: "Translate to Arabic" },
  { icon: Code2, label: "Generate landing code" },
  { icon: Lightbulb, label: "Brainstorm SEO topics" },
];

const PROMPT_CARDS = [
  { title: "Visa Content", desc: "Guides & FAQs", accent: "from-cyan-500/20 to-blue-500/20" },
  { title: "Recruitment", desc: "Hiring funnel", accent: "from-blue-500/20 to-violet-500/20" },
  { title: "SEO Cluster", desc: "Keyword map", accent: "from-violet-500/20 to-fuchsia-500/20" },
  { title: "Documents", desc: "Offers & forms", accent: "from-fuchsia-500/20 to-pink-500/20" },
];

export default function Assistant() {
  const { chats, activeChatId, newChat, addMessage } = useApp();
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeChat?.messages.length, thinking]);

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
        content:
          "This is a frontend preview response. Connect your AI provider in API Keys to enable live answers from " +
          "Gemini, ChatGPT, Claude or Mistral. I'd happily help you with: " +
          `"${content}".`,
      });
      setThinking(false);
    }, 1100);
  };

  const hasChat = activeChat && activeChat.messages.length > 0;

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-5xl flex-col px-4 sm:px-6">
      {!hasChat ? (
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-hero blur-3xl opacity-40 animate-pulse-soft" />
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-hero shadow-glow">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Hi, I'm <span className="text-gradient">VisaHOBe AI</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Your agency-grade assistant for digital marketing, visa content, recruitment campaigns and automation.
          </p>

          <div className="mt-8 flex w-full flex-wrap justify-center gap-2">
            {PROMPT_CARDS.map((c) => (
              <button
                key={c.title}
                onClick={() => send(c.title + ": " + c.desc)}
                className={cn(
                  "group relative overflow-hidden rounded-full border border-border bg-card px-4 py-2 text-xs font-medium shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-glow"
                )}
              >
                <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-90", c.accent)} />
                <span className="font-semibold">{c.title}</span>
                <span className="ml-1.5 text-muted-foreground">· {c.desc}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto py-6">
          {activeChat!.messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-card",
                  m.role === "user"
                    ? "bg-gradient-hero text-white"
                    : "border border-border bg-card text-card-foreground"
                )}
              >
                {m.content}
              </div>
            </motion.div>
          ))}
          <AnimatePresence>
            {thinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-card"
              >
                <span className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: "120ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-500" style={{ animationDelay: "240ms" }} />
                </span>
                Thinking...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="sticky bottom-0 pb-4 pt-2">
        <div className="mb-3 flex flex-wrap gap-2">
          {QUICK_CHIPS.map((c) => (
            <button
              key={c.label}
              onClick={() => send(c.label)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition-smooth hover:bg-secondary hover:text-foreground"
            >
              <c.icon className="h-3 w-3" />
              {c.label}
            </button>
          ))}
        </div>

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
            placeholder="Ask VisaHOBe AI anything..."
            rows={2}
            className="block w-full resize-none rounded-2xl bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <IconBtn label="Attach"><Paperclip className="h-4 w-4" /></IconBtn>
              <IconBtn label="Image"><ImageIcon className="h-4 w-4" /></IconBtn>
              <IconBtn label="File"><FileText className="h-4 w-4" /></IconBtn>
              <IconBtn label="Mic"><Mic className="h-4 w-4" /></IconBtn>
            </div>
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-hero text-white shadow-glow transition-smooth hover:scale-105 disabled:opacity-40"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Frontend preview — connect API keys for live responses.
        </p>
      </div>
    </div>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      title={label}
      className="rounded-lg p-2 hover:bg-secondary"
      type="button"
    >
      {children}
    </button>
  );
}

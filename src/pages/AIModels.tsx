import PageContainer from "@/components/layout/PageContainer";
import { useApp } from "@/context/AppContext";
import { Check, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export const MODELS = [
  { id: "gemini", name: "Google Gemini", desc: "Fast multimodal reasoning", color: "from-cyan-500 to-blue-500" },
  { id: "openai", name: "OpenAI ChatGPT", desc: "General-purpose GPT family", color: "from-emerald-500 to-teal-500" },
  { id: "claude", name: "Claude AI", desc: "Long context, careful writing", color: "from-orange-500 to-amber-500" },
  { id: "mistral", name: "Mistral AI", desc: "Open weights, low latency", color: "from-violet-500 to-fuchsia-500" },
];

export default function AIModels() {
  const { selectedModel, setSelectedModel, apiKeys } = useApp();
  return (
    <PageContainer title="AI Models" subtitle="Choose the default model for your conversations.">
      <div className="grid gap-4 sm:grid-cols-2">
        {MODELS.map((m) => {
          const active = selectedModel === m.id;
          const hasKey = !!apiKeys[m.id];
          return (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-card p-5 text-left shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-glow",
                active ? "border-primary" : "border-border"
              )}
            >
              <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", m.color)} />
              <div className="flex items-start justify-between">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white", m.color)}>
                  <Cpu className="h-4 w-4" />
                </div>
                {active && (
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                    <Check className="h-3 w-3" /> Selected
                  </span>
                )}
              </div>
              <p className="mt-4 text-base font-semibold">{m.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.desc}</p>
              <p className={cn("mt-3 text-[11px] font-medium", hasKey ? "text-emerald-500" : "text-muted-foreground")}>
                {hasKey ? "● API key configured" : "○ No key — add one in API Keys"}
              </p>
            </button>
          );
        })}
      </div>
    </PageContainer>
  );
}

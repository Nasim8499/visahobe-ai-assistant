import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { useApp } from "@/context/AppContext";
import { MODELS } from "./AIModels";
import { Copy, Eye, EyeOff, KeyRound, Trash2, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ApiKeys() {
  const { apiKeys, setApiKey, clearApiKey, selectedModel, setSelectedModel } = useApp();
  const [show, setShow] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const copyEnv = () => {
    const env = MODELS.map((m) => `${m.id.toUpperCase()}_API_KEY=${apiKeys[m.id] ?? ""}`).join("\n");
    navigator.clipboard.writeText(env);
    toast.success(".env copied to clipboard");
  };

  return (
    <PageContainer
      title="API Keys"
      subtitle="Stored only in this browser session. Never use these in production frontends."
      actions={
        <button
          onClick={copyEnv}
          className="flex items-center gap-2 rounded-full bg-gradient-hero px-4 py-2 text-xs font-medium text-white shadow-glow"
        >
          <Copy className="h-3.5 w-3.5" /> Copy .env
        </button>
      }
    >
      <div className="mb-4 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
        ⚠ Production API keys must be stored server-side (e.g. Lovable Cloud secrets). Keys here are local state only.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MODELS.map((m) => {
          const k = apiKeys[m.id] ?? "";
          const draft = drafts[m.id] ?? k;
          const isSelected = selectedModel === m.id;
          return (
            <div key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white", m.color)}>
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{m.name}</p>
                    <p className={cn("text-[11px]", k ? "text-emerald-500" : "text-muted-foreground")}>
                      {k ? "Active" : "Empty"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModel(m.id)}
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-medium",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {isSelected ? (
                    <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Selected</span>
                  ) : (
                    "Select"
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={show[m.id] ? "text" : "password"}
                  placeholder={`Paste ${m.name} API key...`}
                  value={draft}
                  onChange={(e) => setDrafts({ ...drafts, [m.id]: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 pr-10 text-xs outline-none focus:border-primary"
                />
                <button
                  onClick={() => setShow({ ...show, [m.id]: !show[m.id] })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                  type="button"
                >
                  {show[m.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    setApiKey(m.id, draft);
                    toast.success(`${m.name} key saved`);
                  }}
                  className="flex-1 rounded-xl bg-gradient-hero py-2 text-xs font-medium text-white shadow-glow"
                >
                  Save Key
                </button>
                <button
                  onClick={() => {
                    clearApiKey(m.id);
                    setDrafts({ ...drafts, [m.id]: "" });
                    toast(`${m.name} key cleared`);
                  }}
                  className="rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}

import PageContainer from "@/components/layout/PageContainer";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Check, Sparkles, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { theme, setTheme, auroraEnabled, setAuroraEnabled, auroraIntensity, setAuroraIntensity } = useTheme();

  const themes = [
    { id: "light", label: "Gemini White", desc: "Clean white UI with soft dynamic color glow", icon: Sun },
    { id: "dark", label: "Dark", desc: "Readable deep mode with balanced aurora colors", icon: Moon },
  ] as const;

  return (
    <PageContainer title="Settings" subtitle="Personalize your VisaHOBe AI experience.">
      <h3 className="mb-3 text-sm font-semibold">Appearance</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {themes.map((t) => {
          const active = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-card p-5 text-left shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-glow",
                active ? "border-primary" : "border-border"
              )}
            >
              <div className={cn(
                "absolute inset-0 -z-10 opacity-60",
                t.id === "light" ? "bg-gradient-to-br from-white via-sky-50 to-violet-50" : "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
              )} />
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-glow">
                  <t.icon className="h-4 w-4" />
                </div>
                {active && (
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                    <Check className="h-3 w-3" /> Active
                  </span>
                )}
              </div>
              <p className="mt-4 text-base font-semibold">{t.label} Theme</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
            </button>
          );
        })}
      </div>

      <h3 className="mb-3 mt-10 text-sm font-semibold">Gemini Background</h3>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-glow">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Animated aurora effect</p>
              <p className="mt-1 text-xs text-muted-foreground">Turn this off for a static white, print-focused look.</p>
            </div>
          </div>
          <button
            onClick={() => setAuroraEnabled(!auroraEnabled)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-smooth",
              auroraEnabled ? "bg-gradient-hero text-white shadow-glow" : "bg-secondary text-muted-foreground"
            )}
          >
            {auroraEnabled ? "Aurora On" : "Static White"}
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-background/60 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Background intensity
            </div>
            <span className="rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground">{auroraIntensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={auroraIntensity}
            onChange={(event) => setAuroraIntensity(Number(event.target.value))}
            className="w-full accent-primary"
          />
          <p className="mt-3 text-xs text-muted-foreground">Recommended: 45–65 for Gemini-style white, 25–45 for dark mode readability.</p>
        </div>
      </div>

      <h3 className="mb-3 mt-10 text-sm font-semibold">PDF & Knowledge Defaults</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm font-semibold">A4-first document mode</p>
          <p className="mt-1 text-xs text-muted-foreground">Assistant responses and document packs are designed for consultant review and A4 print export.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm font-semibold">VisaHOBe Brain Mushroom</p>
          <p className="mt-1 text-xs text-muted-foreground">Company-only knowledge rules are stored in the repository knowledge base for visa document workflows.</p>
        </div>
      </div>

      <h3 className="mb-3 mt-10 text-sm font-semibold">About</h3>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <p className="text-sm font-medium">VisaHOBe AI Assistant</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Built for VisaHOBe company operations — frontend preview, A4 visa document workflow, and backend-ready AI integration.
        </p>
      </div>
    </PageContainer>
  );
}

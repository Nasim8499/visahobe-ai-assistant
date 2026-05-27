import PageContainer from "@/components/layout/PageContainer";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "light", label: "Light", desc: "Clean white neutral expressive UI", icon: Sun },
    { id: "dark", label: "Dark", desc: "Deep navy with neural gradients", icon: Moon },
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
                "absolute inset-0 -z-10 opacity-50",
                t.id === "light" ? "bg-gradient-to-br from-white via-blue-50 to-violet-50" : "bg-gradient-to-br from-slate-900 via-indigo-950 to-fuchsia-950"
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

      <h3 className="mb-3 mt-10 text-sm font-semibold">About</h3>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <p className="text-sm font-medium">VisaHOBe AI Assistant</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Built for VisaHOBe Digital Marketing Agency — frontend preview, ready for backend integration.
        </p>
      </div>
    </PageContainer>
  );
}

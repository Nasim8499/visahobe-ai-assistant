import PageContainer from "@/components/layout/PageContainer";
import { useApp } from "@/context/AppContext";
import { MODELS } from "./AIModels";
import { Activity, MessageSquare, KeyRound, Cpu } from "lucide-react";

export default function Analytics() {
  const { chats, apiKeys, selectedModel } = useApp();
  const totalMessages = chats.reduce((s, c) => s + c.messages.length, 0);
  const activeKeys = Object.values(apiKeys).filter(Boolean).length;
  const selected = MODELS.find((m) => m.id === selectedModel);

  const stats = [
    { icon: MessageSquare, label: "Total Chats", value: chats.length },
    { icon: Activity, label: "Messages Exchanged", value: totalMessages },
    { icon: KeyRound, label: "Active API Keys", value: `${activeKeys} / ${MODELS.length}` },
    { icon: Cpu, label: "Current Model", value: selected?.name ?? "—" },
  ];

  const usage = MODELS.map((m) => ({ ...m, pct: apiKeys[m.id] ? 25 + Math.floor(Math.random() * 60) : 0 }));

  return (
    <PageContainer title="Analytics" subtitle="A quick view of your assistant usage.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-glow">
              <s.icon className="h-4 w-4" />
            </div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <p className="text-sm font-semibold">Model Usage</p>
          <p className="text-xs text-muted-foreground">Estimated share by configured providers</p>
          <div className="mt-5 space-y-4">
            {usage.map((u) => (
              <div key={u.id}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{u.name}</span>
                  <span className="text-muted-foreground">{u.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${u.color}`}
                    style={{ width: `${u.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card">
          <p className="text-sm font-semibold">Active Configuration</p>
          <div className="mt-6 flex items-center justify-center">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(hsl(var(--cyan))_0deg,hsl(var(--primary))_120deg,hsl(var(--violet))_240deg,hsl(var(--fuchsia))_360deg)]" />
              <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-card">
                <p className="text-3xl font-semibold">{activeKeys}</p>
                <p className="text-[10px] text-muted-foreground">active keys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

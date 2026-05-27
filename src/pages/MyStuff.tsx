import PageContainer from "@/components/layout/PageContainer";
import { Image as ImageIcon, Palette, FileText, Video } from "lucide-react";

const SECTIONS = [
  { icon: ImageIcon, title: "Generated Images", count: 12, desc: "AI-created visuals for campaigns" },
  { icon: Palette, title: "Canvas Creations", count: 5, desc: "Brand banners & social posts" },
  { icon: FileText, title: "Marketing Documents", count: 23, desc: "Briefs, decks, contracts" },
  { icon: Video, title: "Video Ideas", count: 8, desc: "Reels, ads and short-form scripts" },
];

export default function MyStuff() {
  return (
    <PageContainer title="My Stuff" subtitle="Everything you've created in one place.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SECTIONS.map((s) => (
          <button
            key={s.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-glow"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-hero opacity-10 blur-2xl group-hover:opacity-30" />
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-glow">
              <s.icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-semibold">{s.count}</p>
            <p className="mt-1 text-sm font-medium">{s.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
        <p className="text-sm text-muted-foreground">
          Open a category above to view items. Storage will sync once a backend is connected.
        </p>
      </div>
    </PageContainer>
  );
}

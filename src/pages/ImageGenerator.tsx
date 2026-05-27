import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Image as ImageIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";

const STYLES = ["Photoreal", "Cinematic", "3D Render", "Illustration", "Minimal", "Studio"];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast.success("Connect an image model to render this prompt.");
    }, 1100);
  };

  return (
    <PageContainer title="Image Generator" subtitle="Describe a visual, pick a style, and generate.">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <label className="text-xs font-medium text-muted-foreground">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic recruitment office, soft cinematic light, neon accents..."
            rows={4}
            className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />

          <div className="mt-4">
            <label className="text-xs font-medium text-muted-foreground">Style</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-smooth " +
                    (style === s
                      ? "bg-gradient-hero text-white shadow-glow"
                      : "border border-border text-muted-foreground hover:bg-secondary")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={!prompt.trim() || generating}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-hero py-3 text-sm font-medium text-white shadow-glow disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            {generating ? "Generating..." : "Generate Image"}
          </button>
        </div>

        <div className="flex aspect-square items-center justify-center rounded-3xl border border-dashed border-border bg-gradient-soft">
          <div className="text-center">
            <ImageIcon className="mx-auto mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Preview will appear here</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

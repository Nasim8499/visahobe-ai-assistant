import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Code2, Copy } from "lucide-react";
import { toast } from "sonner";

const LANGS = ["TypeScript", "JavaScript", "Python", "Go", "Rust", "SQL"];

export default function CodeAssistant() {
  const [lang, setLang] = useState("TypeScript");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("// Your generated code will appear here.");

  const generate = () => {
    if (!prompt.trim()) return;
    setOutput(`// Sample ${lang} placeholder for: ${prompt}\n// Connect an AI model to generate real code.\nfunction example() {\n  return "VisaHOBe AI";\n}`);
  };

  return (
    <PageContainer title="Code Assistant" subtitle="Generate snippets, refactors and boilerplate.">
      <div className="grid gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex flex-wrap gap-2">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={
                  "rounded-full px-3 py-1.5 text-xs font-medium " +
                  (lang === l ? "bg-gradient-hero text-white shadow-glow" : "border border-border hover:bg-secondary")
                }
              >
                {l}
              </button>
            ))}
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Describe what to build in ${lang}...`}
            rows={3}
            className="mt-4 w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={generate}
            className="mt-3 flex items-center gap-2 rounded-xl bg-gradient-hero px-4 py-2 text-xs font-medium text-white shadow-glow"
          >
            <Code2 className="h-4 w-4" /> Generate Code
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-[hsl(224_40%_8%)] p-5 text-xs text-zinc-100">
          <button
            onClick={() => {
              navigator.clipboard.writeText(output);
              toast.success("Copied");
            }}
            className="absolute right-3 top-3 rounded-lg bg-white/10 p-1.5 text-white/70 hover:bg-white/20"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono">{output}</pre>
        </div>
      </div>
    </PageContainer>
  );
}

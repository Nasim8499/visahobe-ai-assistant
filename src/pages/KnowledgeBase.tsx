import PageContainer from "@/components/layout/PageContainer";
import { Upload, FolderOpen, Download, Plus } from "lucide-react";

export default function KnowledgeBase() {
  return (
    <PageContainer
      title="Knowledge Base"
      subtitle="Upload reference docs to enrich AI responses with your agency knowledge."
      actions={
        <button className="flex items-center gap-2 rounded-full bg-gradient-hero px-4 py-2 text-xs font-medium text-white shadow-glow">
          <Plus className="h-4 w-4" /> Add Source
        </button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Card icon={Upload} title="Upload Files" desc="PDF, DOCX, TXT, Markdown — drag & drop ready." cta="Choose files" />
        <Card icon={FolderOpen} title="Manage Sources" desc="Group sources into collections per client." cta="Open library" />
        <Card icon={Download} title="Export Dataset" desc="Download knowledge as JSON for fine-tuning." cta="Export" />
      </div>

      <div className="mt-8 rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center">
        <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Drop files here to upload — ready to wire to your backend storage.
        </p>
      </div>
    </PageContainer>
  );
}

function Card({ icon: Icon, title, desc, cta }: { icon: any; title: string; desc: string; cta: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-glow">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      <button className="mt-4 w-full rounded-xl border border-border bg-background py-2 text-xs font-medium hover:bg-secondary">
        {cta}
      </button>
    </div>
  );
}

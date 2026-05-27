import PageContainer from "@/components/layout/PageContainer";
import { Building2, Globe, Megaphone, Briefcase, Users, Search, Zap, FileSignature } from "lucide-react";

const SERVICES = [
  { icon: Megaphone, title: "Digital Marketing", desc: "Strategy, branding, content, social." },
  { icon: Globe, title: "Visa Consultancy Content", desc: "Destination guides, applications, FAQs." },
  { icon: Users, title: "Worker Recruitment Marketing", desc: "Funnels for blue-collar & skilled hires." },
  { icon: Search, title: "SEO", desc: "Technical SEO, content clusters, link strategy." },
  { icon: Briefcase, title: "Paid Ads", desc: "Meta, Google, TikTok performance campaigns." },
  { icon: Zap, title: "Automation", desc: "Workflows, CRMs, chatbot integrations." },
  { icon: FileSignature, title: "Document Generation", desc: "Offer letters, contracts, applications." },
];

export default function CompanyProfile() {
  return (
    <PageContainer title="Company Profile" subtitle="VisaHOBe Digital Marketing Agency">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card sm:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-hero opacity-30 blur-3xl" />
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-hero text-white shadow-glow">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">VisaHOBe Digital Marketing Agency</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              A modern agency bridging digital marketing and global mobility — helping recruitment companies,
              visa consultancies and brands grow with content, ads and AI-powered automation.
            </p>
          </div>
        </div>
      </div>

      <h3 className="mt-10 mb-4 text-lg font-semibold">Services</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-glow">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-glow">
              <s.icon className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold">{s.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

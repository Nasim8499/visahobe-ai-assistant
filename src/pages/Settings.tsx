import PageContainer from "@/components/layout/PageContainer";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
export default function Settings() {
 const {theme,setTheme,auroraEnabled,setAuroraEnabled,auroraIntensity,setAuroraIntensity}=useTheme();
 return <PageContainer title="Settings" subtitle="Your workspace preferences.">
  <h2 className="mb-4 text-sm font-semibold">Appearance</h2><div className="grid gap-4 sm:grid-cols-2">{([{id:'light',label:'Light',icon:Sun},{id:'dark',label:'Dark',icon:Moon}] as const).map(t=><Button key={t.id} variant="ghost" onClick={()=>setTheme(t.id)} aria-pressed={theme===t.id} className={cn('h-auto justify-between rounded-lg border bg-card p-6',theme===t.id&&'border-primary')}><span className="flex items-center gap-3"><t.icon className="text-primary" />{t.label}</span>{theme===t.id&&<Check className="text-primary" />}</Button>)}</div>
  <div className="mt-9 space-y-6"><div className="flex items-center justify-between border-b pb-5"><label htmlFor="dynamic" className="text-sm font-medium">Dynamic background</label><Switch id="dynamic" checked={auroraEnabled} onCheckedChange={setAuroraEnabled} /></div><div><div className="mb-4 flex justify-between text-sm"><label id="intensity-label">Background intensity</label><span className="text-muted-foreground">{auroraIntensity}%</span></div><Slider aria-labelledby="intensity-label" value={[auroraIntensity]} min={0} max={100} step={1} onValueChange={([value])=>setAuroraIntensity(value)} /></div></div>
  <div className="mt-10 border-t pt-6"><h2 className="text-sm font-semibold">Document defaults</h2><div className="mt-4 flex justify-between text-sm"><span className="text-muted-foreground">Paper size</span><span>A4 · 210 × 297 mm</span></div><div className="mt-4 flex justify-between text-sm"><span className="text-muted-foreground">Approval</span><span>Human review required</span></div><div className="mt-4 flex justify-between text-sm"><span className="text-muted-foreground">AI connection</span><span>Preview only</span></div></div>
 </PageContainer>;
}

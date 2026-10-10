import { Menu, Plus, Moon, Sun, ChevronDown, Layers, Radio } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useApp } from "@/context/AppContext";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Header({ onMenu }: { onMenu: () => void }) {
 const { theme, toggle, auroraEnabled, setAuroraEnabled } = useTheme();
 const { newChat } = useApp();
 const { workspaces, workspaceId, selectWorkspace } = useWorkspace();
 const navigate = useNavigate();
 return <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-border/60 bg-background/85 px-4 backdrop-blur-xl sm:px-8">
  <Button variant="ghost" size="icon" onClick={onMenu} className="lg:hidden" aria-label="Open sidebar"><Menu /></Button>
  <Layers className="hidden h-4 w-4 text-muted-foreground sm:block" />
  <Select value={workspaceId} onValueChange={selectWorkspace}><SelectTrigger aria-label="Select workspace" className="h-9 w-[155px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none sm:w-[180px]"><SelectValue /></SelectTrigger><SelectContent>{workspaces.map(w=><SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>)}</SelectContent></Select>
  <span className="hidden border-l pl-4 text-xs text-muted-foreground md:block">Workspace</span>
  <div className="ml-auto flex items-center gap-1 sm:gap-2">
   <span className="mr-2 hidden items-center gap-1.5 text-xs text-muted-foreground md:flex"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Preview mode</span>
   <Button variant="ghost" size="icon-sm" title="Toggle animated background" aria-label="Toggle animated background" onClick={()=>setAuroraEnabled(!auroraEnabled)}><Radio className={auroraEnabled ? "text-primary" : "text-muted-foreground"} /></Button>
   <Button variant="ghost" size="icon-sm" title="Switch appearance" aria-label="Switch appearance" onClick={toggle}>{theme === "light" ? <Moon /> : <Sun />}</Button>
   <Button size="sm" className="ml-1 rounded-lg" onClick={()=>{newChat(); navigate('/');}}><Plus /><span className="hidden sm:inline">New chat</span></Button>
  </div>
 </header>;
}

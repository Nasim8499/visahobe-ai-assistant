import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, History, FolderOpen, BookOpen, Settings, X, Plus, Layers, Image, Code2, ChartNoAxesCombined, Building2, KeyRound, Cpu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/context/WorkspaceContext";
import { cn } from "@/lib/utils";
import mascot from "@/assets/visa-assistant.png";
const navigation = [ {to:'/',label:'AI team',icon:MessageSquare}, {to:'/chat-history',label:'Conversations',icon:History}, {to:'/my-stuff',label:'My library',icon:FolderOpen}, {to:'/knowledge-base',label:'Knowledge',icon:BookOpen} ];
const tools = [{to:'/image-generator',label:'Image studio',icon:Image},{to:'/code-assistant',label:'Code assistant',icon:Code2},{to:'/ai-models',label:'AI models',icon:Cpu},{to:'/api-keys',label:'API keys',icon:KeyRound},{to:'/analytics',label:'Analytics',icon:ChartNoAxesCombined},{to:'/company-profile',label:'Company',icon:Building2}];
export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
 const { pathname } = useLocation(); const navigate = useNavigate();
 const { workspaces, workspaceId, selectWorkspace, addWorkspace } = useWorkspace();
 const [creating,setCreating] = useState(false); const [name,setName] = useState('');
 const link = (item: typeof navigation[number]) => <Button key={item.to} asChild variant="ghost" className={cn('h-10 w-full justify-start rounded-lg px-3 font-normal', pathname===item.to && 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold')}><NavLink to={item.to} onClick={onClose}><item.icon className="h-4 w-4" />{item.label}</NavLink></Button>;
 const content = <div className="flex h-full flex-col overflow-y-auto bg-sidebar px-4 py-5">
  <div className="mb-8 flex items-center gap-2"><img src={mascot} width={1024} height={1024} className="h-10 w-10 object-contain" alt="VisaHOBe" /><div><p className="text-lg font-bold">VisaHOBe<span className="text-primary">.</span></p><p className="text-[10px] text-muted-foreground">YOUR AI WORKSPACE</p></div><Button size="icon-sm" variant="ghost" onClick={onClose} aria-label="Close sidebar" className="ml-auto lg:hidden"><X /></Button></div>
  <p className="mb-2 px-3 text-[10px] font-semibold uppercase text-muted-foreground">Workspace</p><nav className="space-y-1">{navigation.map(link)}</nav>
  <div className="mb-2 mt-7 flex items-center justify-between px-3"><p className="text-[10px] font-semibold uppercase text-muted-foreground">Your spaces</p><Button size="icon-xs" variant="ghost" aria-label="Add workspace" title="Add workspace" onClick={()=>setCreating(true)}><Plus /></Button></div>
  <div className="space-y-1">{workspaces.map(w=><Button key={w.id} variant="ghost" className="h-9 w-full justify-start overflow-hidden px-3 text-xs font-normal" onClick={()=>{selectWorkspace(w.id);navigate('/');onClose();}}><Layers className={workspaceId===w.id?'text-primary':'text-muted-foreground'} /><span className="truncate">{w.name}</span>{workspaceId===w.id && <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}</Button>)}</div>
  <p className="mb-2 mt-7 px-3 text-[10px] font-semibold uppercase text-muted-foreground">Tools & agency</p><nav className="space-y-0.5">{tools.map(link)}</nav>
  <div className="mt-auto pt-8"><Button asChild variant="ghost" className="w-full justify-start px-3"><NavLink to="/settings" onClick={onClose}><Settings />Settings</NavLink></Button><div className="mt-4 flex items-center gap-3 border-t px-2 pt-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">VH</span><div><p className="text-xs font-semibold">VisaHOBe Agency</p><p className="mt-0.5 text-[10px] text-muted-foreground">Personal workspace</p></div></div></div>
 </div>;
 return <><aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-sidebar-border lg:block">{content}</aside>{open && <div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-foreground/25 backdrop-blur-sm" onClick={onClose} /><aside className="absolute inset-y-0 left-0 w-[min(85vw,280px)] shadow-soft">{content}</aside></div>}
 <Dialog open={creating} onOpenChange={setCreating}><DialogContent><DialogHeader><DialogTitle>New workspace</DialogTitle><DialogDescription>Session workspace</DialogDescription></DialogHeader><form onSubmit={e=>{e.preventDefault();addWorkspace(name);setName('');setCreating(false);navigate('/');}} className="space-y-4"><Input aria-label="Workspace name" placeholder="Workspace name" value={name} onChange={e=>setName(e.target.value)} maxLength={40} autoFocus /><Button type="submit" disabled={!name.trim()}>Create workspace</Button></form></DialogContent></Dialog>
 </>;
}

import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, FileText, Printer, ShieldCheck, Rows3, Grid2x2, LayoutGrid, Minimize2, Maximize2, Copy, Globe2, Users, Megaphone } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useWorkspace } from "@/context/WorkspaceContext";
import { AGENTS } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse, MessageActions, MessageAction } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import mascot from "@/assets/visa-assistant.png";

type PromptStyle = 'segmented' | 'pill' | 'compact' | 'icons';
export default function Assistant() {
 const { chats, activeChatId, newChat, addMessage } = useApp();
 const { agentId, selectAgent, workspaceId } = useWorkspace();
 const agent = AGENTS.find(a=>a.id===agentId) ?? AGENTS[0];
 const activeChat = chats.find(c=>c.id===activeChatId);
 const [input,setInput] = useState('');
 const [pending,setPending] = useState<string[]>([]);
 const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
 const thinking = !!activeChatId && pending.includes(activeChatId);
 const [compact,setCompact] = useState(()=>localStorage.getItem('visahobe.compact')==='1');
 const [style,setStyle] = useState<PromptStyle>(()=>{ const value=localStorage.getItem('visahobe.promptStyle');return value==='pill'||value==='compact'||value==='icons'?value:'segmented'; });
 useEffect(()=>{localStorage.setItem('visahobe.promptStyle',style);},[style]);
 useEffect(()=>{localStorage.setItem('visahobe.compact',compact?'1':'0');document.documentElement.classList.toggle('compact',compact);},[compact]);
 useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
 useEffect(()=>setInput(''),[agentId,workspaceId,activeChatId]);
 const send = (text: string) => {
  const content=text.trim(); if(!content || thinking) return;
  const id=activeChatId ?? newChat(); const name=agent.name; const role=agent.role;
  addMessage(id,{role:'user',content});setInput('');setPending(p=>[...p,id]);
  timers.current.push(setTimeout(()=>{
   addMessage(id,{role:'assistant',content:`### ${name} · ${role}\n\n**Preview draft — not live AI output.**\n\nRequested task: ${content}\n\n### Review checklist\n1. Collect the verified client details and relevant source documents.\n2. Identify missing information for this ${role.toLowerCase()} task.\n3. Prepare a consultant-reviewed draft with clear assumptions.\n4. Verify official sources, dates and requirements before use.\n5. Obtain human approval for submissions, payments, legal actions and partner verification.\n\n**Consultant note:** This is a sample workflow structure, not completed research or a submitted case. No client records or external services have been accessed.`});
   setPending(p=>p.filter(x=>x!==id));
  },850));
 };
 const hasChat=!!activeChat?.messages.length;
 const styles=[{id:'segmented',icon:Rows3,label:'Segmented'},{id:'pill',icon:LayoutGrid,label:'Pills'},{id:'compact',icon:Grid2x2,label:'Cards'},{id:'icons',icon:FileText,label:'Icons'}] as const;
 const shortcuts=[{label:'Visa checklist',icon:Globe2,prompt:'Prepare an A4 visa document checklist'},{label:'Cover letter',icon:FileText,prompt:'Draft a cover letter structure'},{label:'Client review',icon:Users,prompt:'Review missing client documents'},{label:'Campaign plan',icon:Megaphone,prompt:'Plan a recruitment marketing campaign'}];
 return <div className={cn('assistant-shell mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-4 pb-7 pt-7 sm:px-8 lg:px-10',compact&&'pt-4')}>
  <div className="print:hidden flex flex-wrap items-center justify-between gap-3"><div><p className="mb-1 text-xs text-muted-foreground">Your agency, together.</p><h1 className="text-2xl font-semibold">AI team</h1></div><div className="flex items-center gap-2"><span className="hidden text-xs text-muted-foreground sm:inline">6 specialists</span><span className="flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-[11px] text-muted-foreground"><ShieldCheck className="h-3 w-3 text-primary" />Human-led</span></div></div>
  <section className="print:hidden"><div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6',compact&&'gap-2')}>
   {AGENTS.map(a=><Button key={a.id} variant="ghost" aria-label={`Select ${a.name}`} aria-pressed={agentId===a.id} onClick={()=>selectAgent(a.id)} data-selected={agentId===a.id} className={cn(a.color,'agent-tile h-auto min-w-0 flex-col items-start gap-0 rounded-lg border bg-card p-3 text-left shadow-card transition-smooth hover:-translate-y-0.5 hover:bg-card',compact?'py-2':'py-4')}>
    <div className="mb-3 flex w-full items-center justify-between"><span className="agent-avatar grid h-9 w-9 place-items-center rounded-xl text-base font-semibold">{a.initial}</span><ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" /></div><span className="text-sm font-semibold">{a.name}</span><span className="mt-1 text-[11px] font-normal text-muted-foreground">{a.role}</span>
   </Button>)}
  </div></section>
  {!hasChat ? <section className="flex flex-col items-center pt-1 text-center print:hidden">
   <img src={mascot} width={1024} height={1024} alt="VisaHOBe travel assistant" className={cn('object-contain',compact?'h-20 w-20':'h-32 w-32')} />
   <p className="mt-1 text-[11px] font-medium uppercase text-primary">{agent.specialty}</p>
   <h2 className={cn('mt-3 font-semibold',compact?'text-2xl':'text-3xl sm:text-4xl')}>A little help. A lot of possibility.</h2>
   <p className="mt-3 text-sm text-muted-foreground">What are we working on, with {agent.name}?</p>
  </section> : <Conversation key={activeChatId} id="assistant-printable" className="h-[430px] min-h-[300px] flex-none"><ConversationContent className="gap-6 px-0"><div className="mb-2 border-b pb-3"><h2 className="text-lg font-semibold">{agent.name} · {agent.role}</h2><p className="text-xs text-muted-foreground">Consultant review draft · A4</p></div>{activeChat?.messages.map(m=><Message key={m.id} from={m.role}><MessageContent className={m.role==='user'?'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground whitespace-pre-wrap':''}>{m.role==='assistant'?<MessageResponse>{m.content}</MessageResponse>:m.content}</MessageContent>{m.role==='assistant'&&<MessageActions className="print:hidden"><MessageAction tooltip="Copy response" onClick={()=>{navigator.clipboard.writeText(m.content).then(()=>toast.success('Response copied')).catch(()=>toast.error('Copy unavailable'));}}><Copy className="h-3.5 w-3.5" /></MessageAction></MessageActions>}</Message>)}{thinking&&<Shimmer>Preparing preview draft…</Shimmer>}</ConversationContent><ConversationScrollButton /></Conversation>}
  <section className="mx-auto w-full max-w-[780px] print:hidden">
   <PromptInput onSubmit={({text})=>send(text)} className="rounded-xl bg-card shadow-card [&>[data-slot=input-group]]:rounded-xl [&>[data-slot=input-group]]:border-border [&>[data-slot=input-group]]:bg-card">
    <PromptInputTextarea value={input} onChange={e=>setInput(e.target.value)} aria-label={`Message ${agent.name}`} placeholder={`Ask ${agent.name} anything about ${agent.role.toLowerCase()}…`} className={cn('px-5 pt-5 text-sm',compact?'min-h-16':'min-h-[88px]')} />
    <PromptInputFooter className="px-4 pb-3"><div className="flex items-center gap-2 text-xs text-muted-foreground"><span className={cn(agent.color,'agent-avatar grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold')}>{agent.initial}</span>{agent.name}<span className="border-l pl-2 text-[10px]">Preview</span></div><PromptInputSubmit status={thinking?'submitted':'ready'} disabled={!input.trim()||thinking} className="h-9 w-9 shrink-0 rounded-lg" aria-label="Send message">{!thinking&&<ArrowUp className="h-4 w-4" />}</PromptInputSubmit></PromptInputFooter>
   </PromptInput>
   <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-1 rounded-lg bg-muted/70 p-1">{styles.map(s=><Button key={s.id} variant="ghost" size="icon-xs" title={s.label} aria-label={`${s.label} shortcuts`} aria-pressed={style===s.id} onClick={()=>setStyle(s.id)} className={cn('h-7 w-8 rounded-md',style===s.id&&'bg-card text-primary shadow-sm')}><s.icon className="h-3.5 w-3.5" /></Button>)}</div><div className="flex gap-1"><Button size="icon-sm" variant="ghost" title={compact?'Cozy mode':'Compact mode'} aria-label="Toggle compact mode" aria-pressed={compact} onClick={()=>setCompact(v=>!v)}>{compact?<Maximize2 />:<Minimize2 />}</Button><Button size="sm" variant="ghost" className="text-xs text-muted-foreground" disabled={!hasChat} onClick={()=>window.print()}><Printer />A4 PDF</Button></div></div>
   <div className={cn('mt-3',style==='segmented'?'flex divide-x overflow-hidden rounded-lg border bg-card':style==='compact'?'grid grid-cols-2 gap-2 sm:grid-cols-4':'flex flex-wrap gap-2')}>
    {shortcuts.map(s=><Button key={s.label} variant="ghost" disabled={thinking} title={s.label} onClick={()=>send(s.prompt)} className={cn('h-9 min-w-0 text-[11px] font-normal text-muted-foreground',style==='segmented'?'flex-1 gap-1 rounded-none px-1':style==='pill'?'rounded-full border bg-card px-3':style==='compact'?'justify-start rounded-lg border bg-card px-3':'h-10 w-10 rounded-lg border bg-card p-0')} aria-label={s.label}><s.icon className="h-3.5 w-3.5" />{style!=='icons'&&<span className="truncate">{s.label}</span>}</Button>)}
   </div>
   {!compact&&<div className="mt-5 flex flex-col gap-1 border-t pt-4">{agent.prompts.map(p=><Button key={p} variant="ghost" disabled={thinking} className="h-auto justify-between whitespace-normal py-2 text-left text-xs font-normal text-muted-foreground" onClick={()=>send(p)}>{p}<ArrowUpRight className="shrink-0" /></Button>)}</div>}
   <p className="mt-5 text-center text-[10px] text-muted-foreground">Preview responses · Session-only conversations · Verify all visa requirements before use.</p>
  </section>
 </div>;
}

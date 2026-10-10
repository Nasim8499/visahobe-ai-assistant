import { createContext, useContext, useState, type ReactNode } from "react";
import type { AgentId } from "@/data/agents";

type Workspace = { id: string; name: string };
type WorkspaceState = {
  workspaces: Workspace[];
  workspaceId: string;
  agentId: AgentId;
  selectWorkspace: (id: string) => void;
  selectAgent: (id: AgentId) => void;
  addWorkspace: (name: string) => void;
};
const Context = createContext<WorkspaceState | undefined>(undefined);
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: "agency", name: "Agency HQ" }, { id: "visa", name: "Visa operations" }, { id: "marketing", name: "Marketing studio" },
  ]);
  const [workspaceId, selectWorkspace] = useState("agency");
  const [agentId, selectAgent] = useState<AgentId>("dola");
  const addWorkspace = (name: string) => {
    if (!name.trim()) return;
    const id = crypto.randomUUID();
    setWorkspaces((current) => [...current, { id, name: name.trim().slice(0, 40) }]);
    selectWorkspace(id);
  };
  return <Context.Provider value={{ workspaces, workspaceId, agentId, selectWorkspace, selectAgent, addWorkspace }}>{children}</Context.Provider>;
}
export function useWorkspace() {
  const context = useContext(Context);
  if (!context) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return context;
}
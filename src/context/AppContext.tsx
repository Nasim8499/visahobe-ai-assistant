import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useWorkspace } from "./WorkspaceContext";

export type Message = { id: string; role: "user" | "assistant"; content: string; createdAt: number };
export type Chat = { id: string; title: string; messages: Message[]; createdAt: number; workspaceId: string; agentId: string };

export type ApiKey = { provider: string; key: string };
type AppCtx = {
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  newChat: () => string;
  addMessage: (chatId: string, msg: Omit<Message, "id" | "createdAt">) => void;
  deleteChat: (id: string) => void;
  apiKeys: Record<string, string>;
  setApiKey: (provider: string, key: string) => void;
  clearApiKey: (provider: string) => void;
  selectedModel: string;
  setSelectedModel: (m: string) => void;
};

const Ctx = createContext<AppCtx | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeIds, setActiveIds] = useState<Record<string, string | null>>({});
  const { workspaceId, agentId, selectWorkspace, selectAgent } = useWorkspace();
  const scope = `${workspaceId}:${agentId}`;
  const activeChatId = activeIds[scope] ?? null;
  const setActiveChatId = (id: string | null) => {
    const chat = chats.find((c) => c.id === id);
    if (chat) {
      selectWorkspace(chat.workspaceId);
      selectAgent(chat.agentId as Parameters<typeof selectAgent>[0]);
      setActiveIds((current) => ({ ...current, [`${chat.workspaceId}:${chat.agentId}`]: id }));
    } else setActiveIds((current) => ({ ...current, [scope]: id }));
  };
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [selectedModel, setSelectedModel] = useState<string>("gemini");

  const newChat = useCallback(() => {
    const id = crypto.randomUUID();
    const chat: Chat = { id, title: "New Chat", messages: [], createdAt: Date.now(), workspaceId, agentId };
    setChats((c) => [chat, ...c]);
    setActiveIds((current) => ({ ...current, [scope]: id }));
    return id;
  }, [workspaceId, agentId, scope]);

  const addMessage: AppCtx["addMessage"] = (chatId, msg) => {
    setChats((cs) =>
      cs.map((c) =>
        c.id === chatId
          ? {
              ...c,
              title: c.messages.length === 0 && msg.role === "user" ? msg.content.slice(0, 40) : c.title,
              messages: [...c.messages, { ...msg, id: crypto.randomUUID(), createdAt: Date.now() }],
            }
          : c
      )
    );
  };

  const deleteChat = (id: string) => {
    setChats((c) => c.filter((x) => x.id !== id));
    setActiveIds((current) => Object.fromEntries(Object.entries(current).map(([key, value]) => [key, value === id ? null : value])));
  };

  const setApiKey = (p: string, k: string) => setApiKeys((s) => ({ ...s, [p]: k }));
  const clearApiKey = (p: string) =>
    setApiKeys((s) => {
      const n = { ...s };
      delete n[p];
      return n;
    });

  return (
    <Ctx.Provider
      value={{
        chats,
        activeChatId,
        setActiveChatId,
        newChat,
        addMessage,
        deleteChat,
        apiKeys,
        setApiKey,
        clearApiKey,
        selectedModel,
        setSelectedModel,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
};

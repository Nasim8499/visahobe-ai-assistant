import { useApp } from "@/context/AppContext";
import PageContainer from "@/components/layout/PageContainer";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Trash2 } from "lucide-react";

export default function ChatHistory() {
  const { chats, setActiveChatId, deleteChat } = useApp();
  const navigate = useNavigate();

  return (
    <PageContainer title="Chat History" subtitle="Browse and continue previous conversations.">
      {chats.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-3">
          {chats.map((c) => (
            <div
              key={c.id}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card transition-smooth hover:shadow-glow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white">
                <MessageSquare className="h-4 w-4" />
              </div>
              <button
                className="flex-1 text-left"
                onClick={() => {
                  setActiveChatId(c.id);
                  navigate("/");
                }}
              >
                <p className="text-sm font-medium">{c.title}</p>
                <p className="text-xs text-muted-foreground">
                  {c.messages.length} messages • {new Date(c.createdAt).toLocaleString()}
                </p>
              </button>
              <button
                onClick={() => deleteChat(c.id)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center">
      <MessageSquare className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">No chats yet. Start a new conversation from the Assistant.</p>
    </div>
  );
}

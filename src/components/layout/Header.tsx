import { Menu, Moon, Sun, Plus, Sparkles, Eye } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onMenu: () => void;
}

export default function Header({ onMenu }: Props) {
  const { theme, toggle, auroraEnabled, setAuroraEnabled } = useTheme();
  const { newChat } = useApp();
  const navigate = useNavigate();

  const handleNewChat = () => {
    newChat();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/60 bg-background/80 px-3 backdrop-blur-xl sm:px-6">
      <button onClick={onMenu} className="rounded-lg p-2 hover:bg-secondary lg:hidden" aria-label="Open sidebar">
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2 lg:hidden">
        <div className="h-7 w-7 rounded-lg bg-gradient-hero shadow-glow" />
        <span className="text-sm font-semibold">VisaHOBe AI</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button onClick={() => navigate("/")} className="hidden items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-medium text-foreground shadow-card backdrop-blur transition-smooth hover:-translate-y-0.5 hover:shadow-glow md:flex">
          <Eye className="h-3.5 w-3.5 text-primary" /> Preview
        </button>
        <button onClick={() => setAuroraEnabled(!auroraEnabled)} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-2 text-xs font-medium text-muted-foreground shadow-card backdrop-blur transition-smooth hover:text-foreground" aria-label="Toggle animated background">
          <Sparkles className={auroraEnabled ? "h-3.5 w-3.5 text-primary" : "h-3.5 w-3.5"} />
          <span className="hidden sm:inline">{auroraEnabled ? "Aurora" : "Static"}</span>
        </button>
        <button onClick={handleNewChat} className="hidden items-center gap-2 rounded-full bg-gradient-hero px-4 py-2 text-xs font-medium text-white shadow-glow transition-smooth hover:opacity-90 sm:flex">
          <Plus className="h-3.5 w-3.5" /> New Chat
        </button>
        <button onClick={toggle} className="rounded-lg p-2 hover:bg-secondary" aria-label="Toggle theme">
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}

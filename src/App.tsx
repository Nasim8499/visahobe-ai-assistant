import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider } from "./context/AppContext";
import AppLayout from "./components/layout/AppLayout";
import Assistant from "./pages/Assistant";
import ChatHistory from "./pages/ChatHistory";
import MyStuff from "./pages/MyStuff";
import KnowledgeBase from "./pages/KnowledgeBase";
import AIModels from "./pages/AIModels";
import ApiKeys from "./pages/ApiKeys";
import CompanyProfile from "./pages/CompanyProfile";
import ImageGenerator from "./pages/ImageGenerator";
import CodeAssistant from "./pages/CodeAssistant";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Assistant />} />
                <Route path="/chat-history" element={<ChatHistory />} />
                <Route path="/my-stuff" element={<MyStuff />} />
                <Route path="/knowledge-base" element={<KnowledgeBase />} />
                <Route path="/ai-models" element={<AIModels />} />
                <Route path="/api-keys" element={<ApiKeys />} />
                <Route path="/company-profile" element={<CompanyProfile />} />
                <Route path="/image-generator" element={<ImageGenerator />} />
                <Route path="/code-assistant" element={<CodeAssistant />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

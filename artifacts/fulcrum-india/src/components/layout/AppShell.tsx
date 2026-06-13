import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { DemoSwitcher } from "./DemoSwitcher";
import { useAuth } from "@/context/AuthContext";
import { Bell, Menu } from "lucide-react";

interface AppShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function AppShell({ children, title, subtitle }: AppShellProps) {
  const { session, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  // If not logged in, just render children (for landing/login pages)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen w-full max-w-full overflow-hidden">
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="md:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              {title && <h1 className="text-lg font-bold leading-tight truncate max-w-[200px] sm:max-w-xs">{title}</h1>}
              {subtitle && <span className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-xs">{subtitle}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-card-hover text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive border-2 border-card"></span>
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {session.name.charAt(0)}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
      <DemoSwitcher />
    </div>
  );
}

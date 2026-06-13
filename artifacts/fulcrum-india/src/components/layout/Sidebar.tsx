import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  MapPin,
  FileText,
  Landmark,
  ClipboardList,
  MessageSquare,
  BookOpen,
  Trophy,
  Settings,
  LogOut,
  Users,
  BarChart,
  Bell,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { session, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isEntrepreneur = session?.role === "entrepreneur";
  const isAdmin = session?.role === "admin" || session?.role === "superadmin";

  const entrepreneurLinks = [
    { href: "/journey", icon: MapPin, label: "My Journey" },
    { href: "/documents", icon: FileText, label: "Documents", badge: "3/5" },
    { href: "/schemes", icon: Landmark, label: "Schemes", badge: "8" },
    { href: "/applications", icon: ClipboardList, label: "Applications" },
    { href: "/builders", icon: Users, label: "Builders" },
    { href: "/messages", icon: MessageSquare, label: "Messages", badge: "2" },
    { href: "/knowledge", icon: BookOpen, label: "Knowledge" },
    { href: "/impact", icon: Trophy, label: "Impact" },
  ];

  const adminLinks = [
    { href: "/admin", icon: BarChart, label: "Command Center" },
    { href: "/admin/map", icon: MapPin, label: "Live Map" },
    { href: "/admin/builders", icon: Users, label: "Builders" },
    { href: "/admin/entrepreneurs", icon: Users, label: "Entrepreneurs" },
    { href: "/admin/schemes", icon: Landmark, label: "Schemes" },
    { href: "/admin/alerts", icon: Bell, label: "Alerts", badge: "12" },
  ];

  const links = isAdmin ? adminLinks : entrepreneurLinks;

  return (
    <div className={cn(
      "w-64 bg-card border-r border-border flex flex-col fixed inset-y-0 left-0 z-40 overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6 flex items-center justify-between">
        <Link href={isAdmin ? "/admin" : "/journey"} onClick={onClose} className="flex items-center gap-2 text-xl font-black tracking-tight">
          <img src="/favicon.svg" alt="Fulcrum Logo" className="w-8 h-8 rounded-md shadow-sm" />
          <span>Fulcrum<span className="text-primary">-India</span></span>
        </Link>
        <button onClick={onClose} className="md:hidden p-1 rounded-md text-muted-foreground hover:bg-muted">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 px-4 py-2 space-y-1">
        {links.map((link) => {
          const isActive = location === link.href;
          const Icon = link.icon;
          
          return (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-card-hover hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {link.label}
                {link.badge && (
                  <span className={cn(
                    "ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {link.badge}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <div className="space-y-1 mb-4">
          <button
            onClick={toggleTheme}
            data-testid="button-theme-toggle-sidebar"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <Link href="/settings">
            <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-card-hover hover:text-foreground transition-all cursor-pointer">
              <Settings className="w-5 h-5" />
              Settings
            </span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {session && (
          <div className="flex items-center gap-3 px-3 py-2 bg-background/50 rounded-xl border border-border/50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              {session.name.charAt(0)}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-bold truncate">{session.name}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">
                {session.role}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

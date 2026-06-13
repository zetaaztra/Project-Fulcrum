import { AuthSessionRole } from "@workspace/api-client-react";
import { useAuth } from "@/context/AuthContext";
import { ChevronRight, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DemoSwitcher() {
  const { session, switchRole, logout } = useAuth();

  if (!session) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-4 py-2 rounded-full shadow-lg shadow-primary/10 transition-all text-sm font-medium backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Explore as: {session.role.charAt(0).toUpperCase() + session.role.slice(1)}
          <ChevronRight className="w-4 h-4 ml-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-md border-border">
          <DropdownMenuLabel>Switch Demo Role</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => switchRole("entrepreneur" as any)} className="flex items-center justify-between cursor-pointer">
            <div className="flex flex-col">
              <span className="font-medium">Entrepreneur</span>
              <span className="text-xs text-muted-foreground">Lakshmi Devi</span>
            </div>
            {session.role === "entrepreneur" && <span className="text-primary text-xs font-bold">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchRole("builder" as any)} className="flex items-center justify-between cursor-pointer">
            <div className="flex flex-col">
              <span className="font-medium">Builder</span>
              <span className="text-xs text-muted-foreground">Murugan S.</span>
            </div>
            {session.role === "builder" && <span className="text-primary text-xs font-bold">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchRole("coordinator" as any)} className="flex items-center justify-between cursor-pointer">
            <div className="flex flex-col">
              <span className="font-medium">Coordinator</span>
              <span className="text-xs text-muted-foreground">Priya</span>
            </div>
            {session.role === "coordinator" && <span className="text-primary text-xs font-bold">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchRole("admin" as any)} className="flex items-center justify-between cursor-pointer">
            <div className="flex flex-col">
              <span className="font-medium">Admin</span>
              <span className="text-xs text-muted-foreground">System Admin</span>
            </div>
            {session.role === "admin" && <span className="text-primary text-xs font-bold">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive focus:bg-destructive/10 cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

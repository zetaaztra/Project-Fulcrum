import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-muted/20 border border-border rounded-2xl flex items-center justify-center mb-6">
        <Settings className="w-10 h-10 text-muted-foreground animate-spin-slow" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Settings</h2>
      <p className="text-muted-foreground">
        Account configuration and notification preferences will be available here in the next release.
      </p>
    </div>
  );
}

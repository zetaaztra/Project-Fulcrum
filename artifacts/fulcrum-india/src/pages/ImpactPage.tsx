import { Trophy } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mb-6">
        <Trophy className="w-10 h-10 text-accent" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Impact Tracking</h2>
      <p className="text-muted-foreground">
        Your impact dashboard is currently being generated. Soon you'll be able to see your contribution to the community and local economy.
      </p>
    </div>
  );
}

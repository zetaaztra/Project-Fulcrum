import { Construction } from "lucide-react";

export default function KnowledgePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Knowledge Base is building...</h2>
      <p className="text-muted-foreground">
        We're compiling the most comprehensive library of resources, SOPs, and guides for Indian entrepreneurship. Check back soon.
      </p>
    </div>
  );
}

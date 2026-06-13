import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const docs = [
  { id: 1, name: "Aadhaar Card", desc: "Front and back of Aadhaar card", status: "verified", icon: "🪪" },
  { id: 2, name: "PAN Card", desc: "Permanent Account Number card", status: "verified", icon: "📄" },
  { id: 3, name: "Address Proof", desc: "Utility bill, ration card, or voter ID", status: "verified", icon: "🏠" },
  { id: 4, name: "Bank Statement", desc: "Last 6 months bank statement", status: "needs_reupload", icon: "🏦", note: "⚠️ Builder note: Please re-upload — photo is too dark" },
  { id: 5, name: "Passport Photo", desc: "White background, 3.5 x 4.5 cm", status: "not_uploaded", icon: "📸" },
];

export default function DocumentsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Your Documents</h1>
        <p className="text-muted-foreground mt-1">Upload all required documents to proceed with your application.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-end mb-4">
          <div className="font-bold">Document Progress</div>
          <div className="text-primary font-bold">3 of 5 completed</div>
        </div>
        <div className="h-3 bg-background rounded-full overflow-hidden border border-border">
          <div className="h-full bg-gradient-to-r from-primary to-success w-[60%] rounded-full"></div>
        </div>
      </div>

      <div className="space-y-4">
        {docs.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-card border rounded-2xl p-5 flex items-center gap-5 transition-colors ${
              doc.status === 'not_uploaded' ? 'border-dashed border-border opacity-70' : 
              doc.status === 'needs_reupload' ? 'border-warning shadow-[0_0_15px_rgba(249,115,22,0.1)]' : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl border border-border flex-shrink-0">
              {doc.icon}
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-base">{doc.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{doc.desc}</p>
              {doc.note && <p className="text-xs font-bold text-warning mt-2">{doc.note}</p>}
            </div>

            <div className="flex items-center gap-4">
              {doc.status === 'verified' && (
                <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Verified
                </span>
              )}
              {doc.status === 'needs_reupload' && (
                <>
                  <span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Needs Re-upload
                  </span>
                  <Button size="sm" variant="outline" className="border-warning text-warning hover:bg-warning/10 font-bold">
                    Re-upload <UploadCloud className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
              {doc.status === 'not_uploaded' && (
                <>
                  <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-bold">
                    Not Uploaded
                  </span>
                  <Button size="sm" variant="outline" className="font-bold">
                    Upload <UploadCloud className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

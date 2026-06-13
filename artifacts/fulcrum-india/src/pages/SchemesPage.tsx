import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockSchemes = [
  { id: 1, name: "PMEGP", ministry: "Ministry of MSME", match: 92, funding: "₹10L – ₹1Cr", subsidy: "25–35%", tags: ["Food processing", "SC community", "82% approval in Madurai"] },
  { id: 2, name: "Stand-Up India", ministry: "Ministry of Finance", match: 78, funding: "₹10L – ₹1Cr", subsidy: "Collateral-free", tags: ["SC/ST/Women", "Green field projects"] },
  { id: 3, name: "MUDRA — Tarun", ministry: "MUDRA Ltd", match: 71, funding: "₹5L – ₹10L", subsidy: "8.5–11% Interest", tags: ["Quick processing", "Minimal docs"] },
  { id: 4, name: "NSFDC Term Loan", ministry: "Ministry of Social Justice", match: 85, funding: "Up to ₹45L", subsidy: "8% fixed", tags: ["SC community", "Low interest"] },
];

export default function SchemesPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Scheme Matches for Your Journey</h1>
        <p className="text-muted-foreground mt-1">Found 8 matching schemes based on your profile — Organic Millet Foods, Madurai, ₹18L target</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {["All Communities", "All Sectors", "All Stages", "Funding: Any", "Sort: Best Match"].map((f, i) => (
          <div key={i} className="bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer hover:border-primary transition-colors">
            {f} <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
        <div className="bg-card border border-border rounded-lg flex items-center px-3 ml-auto w-64">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search schemes..." className="bg-transparent border-none outline-none text-sm w-full p-2" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {mockSchemes.map((scheme, i) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden group hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">{scheme.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{scheme.ministry}</p>
                </div>
                
                {/* Match Score Radial (simulated with CSS border) */}
                <div className="relative w-14 h-14 rounded-xl flex flex-col items-center justify-center bg-background border-2 border-primary/20">
                  <span className="text-lg font-black text-primary leading-none">{scheme.match}%</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold mt-0.5">Match</span>
                </div>
              </div>

              <div className="flex gap-8 mb-6">
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Funding</div>
                  <div className="font-bold text-success">{scheme.funding}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Subsidy/Benefit</div>
                  <div className="font-bold text-accent">{scheme.subsidy}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {scheme.tags.map((tag, j) => (
                  <span key={j} className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>

              {scheme.id === 1 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-6">
                  <p className="text-sm text-foreground">💡 "Apply through Regional Branch instead of Local Branch for faster processing. They're more familiar with PMEGP."</p>
                  <p className="text-xs text-accent font-bold mt-2">— Murugan S., Madurai</p>
                </div>
              )}

              <div className="flex gap-3 pt-6 border-t border-border">
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold w-1/2">Apply Now</Button>
                <Button variant="outline" className="w-1/2 font-bold">View Details</Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

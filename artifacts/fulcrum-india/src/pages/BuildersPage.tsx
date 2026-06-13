import { motion } from "framer-motion";
import { Search, ChevronDown, CheckCircle2, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockBuilders = [
  { id: 1, name: "Murugan S.", title: "Retired Bank Officer", rating: 4.9, reviews: 127, cases: 42, success: "89%", funding: "₹4.8Cr", avatar: "M", color: "from-primary to-secondary", tags: ["Banking", "PMEGP", "MUDRA"], status: "Accepting new cases", isGreen: true },
  { id: 2, name: "Priya R.", title: "Chartered Accountant", rating: 4.8, reviews: 98, cases: 38, success: "85%", funding: "₹3.2Cr", avatar: "P", color: "from-success to-emerald-700", tags: ["GST", "Tax", "Compliance"], status: "Accepting new cases", isGreen: true },
  { id: 3, name: "Karthik V.", title: "MSME Consultant", rating: 4.7, reviews: 76, cases: 31, success: "78%", funding: "₹2.1Cr", avatar: "K", color: "from-accent to-orange-700", tags: ["Manufacturing", "Stand-Up India"], status: "Overloaded (15 cases)", isGreen: false },
  { id: 4, name: "Selvi M.", title: "Textile Export Expert", rating: 4.9, reviews: 64, cases: 27, success: "91%", funding: "₹5.1Cr", avatar: "S", color: "from-sky-500 to-blue-700", tags: ["Textile", "Export"], status: "Accepting new cases", isGreen: true },
];

export default function BuildersPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Community Builders</h1>
        <p className="text-muted-foreground mt-1">89 verified builders ready to guide you. Filter by expertise, language, or location.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {["All Expertise", "All Languages", "All Districts", "Availability: Accepting"].map((f, i) => (
          <div key={i} className="bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer hover:border-primary transition-colors">
            {f} <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
        <div className="bg-card border border-border rounded-lg flex items-center px-3 ml-auto w-64">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search builders..." className="bg-transparent border-none outline-none text-sm w-full p-2" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {mockBuilders.map((builder, i) => (
          <motion.div
            key={builder.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/10"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${builder.color} flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
                {builder.avatar}
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-1.5">
                  {builder.name} <CheckCircle2 className="w-4 h-4 text-success" />
                </h3>
                <div className="text-xs text-muted-foreground">{builder.title}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="text-accent text-sm">★★★★★</div>
              <div className="font-bold text-sm">{builder.rating}</div>
              <div className="text-xs text-muted-foreground">({builder.reviews} reviews)</div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="bg-background rounded-lg p-2 text-center border border-border/50">
                <div className="font-black text-foreground">{builder.cases}</div>
                <div className="text-[9px] uppercase font-bold text-muted-foreground">Businesses</div>
              </div>
              <div className="bg-background rounded-lg p-2 text-center border border-border/50">
                <div className="font-black text-success">{builder.success}</div>
                <div className="text-[9px] uppercase font-bold text-muted-foreground">Success</div>
              </div>
              <div className="bg-background rounded-lg p-2 text-center border border-border/50">
                <div className="font-black text-foreground">{builder.funding}</div>
                <div className="text-[9px] uppercase font-bold text-muted-foreground">Funding</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {builder.tags.map((tag, j) => (
                <span key={j} className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-6">
              <span className={`w-2 h-2 rounded-full ${builder.isGreen ? 'bg-success' : 'bg-warning'}`}></span>
              {builder.status}
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold"><MessageSquare className="w-4 h-4 mr-2"/> Message</Button>
              <Button variant="outline" className="flex-1 font-bold">Profile</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

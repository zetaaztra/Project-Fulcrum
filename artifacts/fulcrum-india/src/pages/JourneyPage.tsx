import { motion } from "framer-motion";
import { Lightbulb, Clock, CheckCircle2, AlertCircle, MessageSquare, Phone, Info, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JourneyPage() {
  return (
    <div className="max-w-5xl">
      {/* Topbar equivalent - usually handled in AppShell, but we add page specific header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Lakshmi's Journey</h1>
        <p className="text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-4 h-4"/> Organic Millet Foods · Madurai, Tamil Nadu</p>
      </div>

      {/* Narrative Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/30 rounded-2xl p-6 mb-6 flex gap-4 items-start shadow-[inset_4px_0_0_0_rgba(99,102,241,1)]"
      >
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed">
            Your application is with <strong className="text-foreground">Indian Bank</strong> for <strong className="text-foreground">PMEGP</strong>. 
            Most food processing applications in Madurai take <strong className="text-foreground">18 days</strong>. 
            You're on <strong className="text-foreground">day 12</strong>. Similar applications have an <strong className="text-foreground">82% approval rate</strong>. 
            Your builder uploaded the missing collateral document.
          </p>
          <button className="text-xs font-semibold text-primary mt-3 flex items-center gap-1 hover:underline">
            Why am I seeing this? <Info className="w-3 h-3"/>
          </button>
        </div>
      </motion.div>

      {/* Current Action */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-8 mb-6 relative overflow-hidden shadow-sm"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warning to-accent"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Current Step</div>
            <h2 className="text-xl font-bold">Bank Application — Indian Bank</h2>
          </div>
          <div className="bg-warning/10 text-warning px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span> Under Review
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Scheme</div>
            <div className="font-semibold text-lg">PMEGP</div>
          </div>
          <div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Amount</div>
            <div className="font-semibold text-lg">₹18,00,000</div>
          </div>
          <div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Applied On</div>
            <div className="font-semibold text-lg">June 1, 2026</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2 text-muted-foreground font-medium">
            <span>Day 12 of 30 expected</span>
            <span>40%</span>
          </div>
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-warning to-accent w-[40%] rounded-full relative">
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
            <MessageSquare className="w-4 h-4 mr-2" /> Message Builder
          </Button>
          <Button variant="outline" className="font-bold">View Application</Button>
        </div>
      </motion.div>

      {/* Builder Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-6 mb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-primary/20">
            M
          </div>
          <div>
            <div className="font-bold text-lg flex items-center gap-2">
              Murugan S. <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
            <div className="text-sm text-muted-foreground mb-2">Retired Bank Officer · Madurai</div>
            <div className="flex gap-4 text-xs">
              <span><strong className="text-foreground">42</strong> Businesses</span>
              <span><strong className="text-foreground">89%</strong> Success</span>
              <span><strong className="text-foreground">&lt;2h</strong> Response</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="icon" className="rounded-full w-10 h-10"><MessageSquare className="w-4 h-4"/></Button>
          <Button variant="secondary" size="icon" className="rounded-full w-10 h-10"><Phone className="w-4 h-4"/></Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 bg-card border border-border rounded-2xl p-6"
        >
          <h3 className="font-bold text-lg mb-6">Your Journey Timeline</h3>
          <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            
            <div className="relative">
              <div className="absolute left-[-34px] w-6 h-6 rounded-full bg-success/20 text-success border-2 border-success flex items-center justify-center z-10">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Application Submitted</h4>
                <p className="text-xs text-muted-foreground mt-1">June 10, 2026</p>
                <p className="text-sm text-muted-foreground mt-2">Indian Bank, Madurai Branch · ₹18L</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[-34px] w-6 h-6 rounded-full bg-warning/20 text-warning border-2 border-warning flex items-center justify-center z-10 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                <Clock className="w-3 h-3" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-warning">Under Review — Current</h4>
                <p className="text-xs text-muted-foreground mt-1">June 11 — Present</p>
                <p className="text-sm text-muted-foreground mt-2">Day 12 · Expected decision: June 30</p>
              </div>
            </div>

            <div className="relative opacity-50">
              <div className="absolute left-[-34px] w-6 h-6 rounded-full bg-muted border-2 border-muted-foreground flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
              </div>
              <div>
                <h4 className="font-bold text-sm">Approval Expected</h4>
                <p className="text-xs text-muted-foreground mt-1">June 30, 2026 (est.)</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex gap-3 text-sm pb-4 border-b border-border/50">
              <div className="text-xl">📄</div>
              <div>
                <p className="text-muted-foreground"><strong className="text-foreground">Murugan</strong> uploaded collateral document</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3 text-sm pb-4 border-b border-border/50">
              <div className="text-xl">🏦</div>
              <div>
                <p className="text-muted-foreground"><strong className="text-foreground">Indian Bank</strong> requested additional document</p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="text-xl">✅</div>
              <div>
                <p className="text-muted-foreground">All documents <strong className="text-foreground">verified</strong></p>
                <p className="text-xs text-muted-foreground mt-1">5 days ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplicationsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <button className="text-sm font-semibold text-muted-foreground flex items-center gap-2 mb-6 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Applications List
      </button>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2">PMEGP Application — Indian Bank</h1>
          <p className="text-muted-foreground font-mono text-sm">App #PMEGP-2026-00483 · Submitted June 1, 2026</p>
        </div>
        <div className="bg-warning/10 text-warning px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
          <span className="w-2.5 h-2.5 rounded-full bg-warning animate-pulse"></span> Under Review
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Amount Requested", value: "₹18,00,000", color: "text-foreground" },
          { label: "Subsidy (35%)", value: "₹6,30,000", color: "text-success" },
          { label: "Expected Decision", value: "June 30, 2026", color: "text-accent" },
          { label: "Days Pending", value: "12 of 18 avg", color: "text-foreground" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-2xl p-8 mb-8"
      >
        <h3 className="font-bold text-lg mb-8">Application Progress</h3>
        
        <div className="relative flex justify-between">
          <div className="absolute top-[18px] left-[10%] right-[10%] h-1 bg-border z-0"></div>
          <div className="absolute top-[18px] left-[10%] right-[50%] h-1 bg-gradient-to-r from-success to-warning z-0"></div>

          {[
            { status: "done", label: "Submitted", date: "Jun 1" },
            { status: "done", label: "Docs Verified", date: "Jun 3" },
            { status: "done", label: "Under Review", date: "Jun 11" },
            { status: "current", label: "Bank Decision", date: "Est. Jun 30" },
            { status: "pending", label: "Disbursement", date: "Pending" },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center relative z-10 w-24">
              {step.status === "done" && (
                <div className="w-10 h-10 rounded-full bg-success/20 border-2 border-success flex items-center justify-center text-success mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              {step.status === "current" && (
                <div className="w-10 h-10 rounded-full bg-warning/20 border-2 border-warning flex items-center justify-center text-warning mb-3 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  <Clock className="w-5 h-5" />
                </div>
              )}
              {step.status === "pending" && (
                <div className="w-10 h-10 rounded-full bg-background border-2 border-muted flex items-center justify-center text-muted-foreground mb-3">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                </div>
              )}
              <div className={`text-xs font-bold text-center ${step.status === 'current' ? 'text-warning' : ''}`}>{step.label}</div>
              <div className="text-[10px] text-muted-foreground font-mono mt-1">{step.date}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

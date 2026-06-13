import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Search, Bell, Activity, Users, Landmark, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black mb-1">Command Center</h1>
          <p className="text-muted-foreground text-sm">Real-time overview of the Fulcrum network</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-card border border-border rounded-lg flex items-center px-3 w-64">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search journeys..." className="bg-transparent border-none outline-none text-sm w-full p-2" />
          </div>
          <Button className="bg-primary text-white"><Activity className="w-4 h-4 mr-2"/> Generate Report</Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Businesses Started", value: "1,247", trend: "+12%", up: true, color: "border-b-primary" },
          { label: "Funding Enabled", value: "₹42.8Cr", trend: "+8%", up: true, color: "border-b-success" },
          { label: "Jobs Created", value: "3,842", trend: "+15%", up: true, color: "border-b-accent" },
          { label: "Active Builders", value: "89", trend: "+5%", up: true, color: "border-b-info" },
          { label: "Pending Cases", value: "156", trend: "-3%", up: false, color: "border-b-warning" },
          { label: "Avg Processing", value: "18d", trend: "-2d", up: false, color: "border-b-destructive" },
        ].map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-card border border-border border-b-4 ${metric.color} rounded-xl p-5 shadow-sm`}
          >
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">{metric.label}</div>
            <div className="text-2xl font-black mb-1">{metric.value}</div>
            <div className={`text-[10px] font-bold flex items-center gap-1 ${metric.up ? 'text-success' : 'text-destructive'}`}>
              {metric.up ? <ArrowUpRight className="w-3 h-3"/> : <ArrowDownRight className="w-3 h-3"/>} {metric.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Map / Heatmap stub */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-overlay opacity-10 pointer-events-none"></div>
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-bold text-lg">India — District Heatmap</h3>
            <Button variant="link" className="text-primary h-auto p-0">View Full Map →</Button>
          </div>
          
          <div className="h-[300px] flex items-center justify-center bg-background/50 border border-border rounded-xl relative z-10 overflow-hidden group">
            {/* Abstract representation of a map / data visualization */}
            <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
            
            {/* Nodes simulating districts */}
            <div className="absolute top-1/4 left-1/3 w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center border border-primary/50 animate-pulse"><div className="w-2 h-2 rounded-full bg-primary"></div></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center border border-accent/50"><div className="w-3 h-3 rounded-full bg-accent animate-ping"></div></div>
            <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-success/30 flex items-center justify-center border border-success/50"><div className="w-4 h-4 rounded-full bg-success shadow-[0_0_20px_rgba(16,185,129,0.8)]"></div></div>
            <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-warning/30 flex items-center justify-center border border-warning/50"><div className="w-1.5 h-1.5 rounded-full bg-warning"></div></div>
            
            {/* Tooltip on the biggest node */}
            <div className="absolute bottom-[40%] right-[30%] bg-card border border-border p-2 rounded-lg text-xs font-mono shadow-xl hidden group-hover:block transition-all">
              <div className="font-bold text-success mb-1">Tamil Nadu</div>
              <div className="text-muted-foreground">342 active journeys</div>
            </div>

            <div className="text-muted-foreground font-mono text-xs uppercase tracking-widest opacity-50">Interactive Map Visualization</div>
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse"></span> Alerts
            </h3>
            <span className="bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12 New</span>
          </div>

          <div className="space-y-4">
            {[
              { title: "3 applications stuck >21 days", desc: "Indian Bank, Madurai", type: "destructive" },
              { title: "12 journeys dormant >30 days", desc: "No activity detected", type: "warning" },
              { title: "2 builders overloaded", desc: "Chennai district", type: "accent" },
              { title: "Approval rate ↓15%", desc: "This month vs last month", type: "primary" },
            ].map((alert, i) => (
              <div key={i} className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-${alert.type}`}></div>
                <div>
                  <div className="text-sm font-bold">{alert.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{alert.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Live Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Live Activity Feed</h3>
            <Button variant="outline" size="sm">Filter</Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50">
              <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center text-success text-sm">🎉</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Lakshmi got PMEGP approved!</div>
                <div className="text-xs text-muted-foreground">Indian Bank · ₹18L</div>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">2m ago</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">📄</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Rahul uploaded GST certificate</div>
                <div className="text-xs text-muted-foreground">Garment Unit · Madurai</div>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">8m ago</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm">🤝</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Murugan hit 50 mentorships</div>
                <div className="text-xs text-muted-foreground">Top 1% builder</div>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">15m ago</div>
            </div>
          </div>
        </motion.div>

        {/* Top Builders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-2xl p-6 overflow-hidden flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Top Builders</h3>
            <Button variant="link" className="text-primary h-auto p-0">View Directory →</Button>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted-foreground uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="pb-3 font-semibold">Builder</th>
                  <th className="pb-3 font-semibold">District</th>
                  <th className="pb-3 font-semibold">Cases</th>
                  <th className="pb-3 font-semibold">Success</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">M</div>
                    <span className="font-semibold">Murugan S.</span>
                  </td>
                  <td className="py-3 text-muted-foreground">Madurai</td>
                  <td className="py-3 font-mono">42</td>
                  <td className="py-3 font-mono text-success">89%</td>
                </tr>
                <tr>
                  <td className="py-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-success/20 text-success flex items-center justify-center font-bold text-xs">P</div>
                    <span className="font-semibold">Priya R.</span>
                  </td>
                  <td className="py-3 text-muted-foreground">Chennai</td>
                  <td className="py-3 font-mono">38</td>
                  <td className="py-3 font-mono text-success">85%</td>
                </tr>
                <tr>
                  <td className="py-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">K</div>
                    <span className="font-semibold">Karthik V.</span>
                  </td>
                  <td className="py-3 text-muted-foreground">Coimbatore</td>
                  <td className="py-3 font-mono">31</td>
                  <td className="py-3 font-mono text-accent">78%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

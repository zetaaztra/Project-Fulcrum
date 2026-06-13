import { motion } from "framer-motion";
import { Send, Search, Phone, Video, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col bg-background/50">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-lg mb-4">Messages</h2>
          <div className="bg-card border border-border rounded-lg flex items-center px-3 w-full">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full p-2" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Active Chat */}
          <div className="p-4 border-b border-border bg-primary/5 cursor-pointer border-l-2 border-l-primary flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">M</div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-sm truncate">Murugan S.</span>
                <span className="text-[10px] text-primary font-bold">10:42 AM</span>
              </div>
              <div className="text-xs text-muted-foreground truncate">I've uploaded the collateral document...</div>
            </div>
          </div>

          {/* Other Chats */}
          <div className="p-4 border-b border-border cursor-pointer hover:bg-card transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-bold">IB</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-sm truncate text-muted-foreground">Indian Bank Support</span>
                <span className="text-[10px] text-muted-foreground">Yesterday</span>
              </div>
              <div className="text-xs text-muted-foreground truncate">Your application is under review.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-card relative">
        <div className="absolute inset-0 bg-grid-overlay opacity-[0.03] pointer-events-none"></div>
        
        {/* Chat Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/80 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">M</div>
            <div>
              <div className="font-bold text-sm flex items-center gap-2">Murugan S. <span className="bg-success/20 text-success text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Builder</span></div>
              <div className="text-[10px] text-success font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success"></span> Online</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Phone className="w-4 h-4 text-muted-foreground"/></Button>
            <Button variant="ghost" size="icon"><Video className="w-4 h-4 text-muted-foreground"/></Button>
            <Button variant="ghost" size="icon"><Info className="w-4 h-4 text-muted-foreground"/></Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">Today</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs flex-shrink-0">M</div>
            <div>
              <div className="bg-background border border-border rounded-2xl rounded-tl-sm p-4 text-sm shadow-sm">
                Hi Lakshmi! The bank requested the collateral document again because the photo was too dark. I've re-uploaded the clear version you sent me on WhatsApp.
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 ml-1 font-mono">10:40 AM</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-3 max-w-[80%] ml-auto justify-end">
            <div className="items-end flex flex-col">
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 text-sm shadow-[0_4px_20px_rgba(99,102,241,0.3)]">
                Thank you so much sir! Will this delay the process?
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 mr-1 font-mono">10:41 AM</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs flex-shrink-0">M</div>
            <div>
              <div className="bg-background border border-border rounded-2xl rounded-tl-sm p-4 text-sm shadow-sm">
                Not much. I spoke to the manager this morning. We should expect the approval by end of month as planned. Don't worry, I am tracking it.
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 ml-1 font-mono">10:42 AM</div>
            </div>
          </motion.div>
        </div>

        {/* Input */}
        <div className="p-4 bg-background border-t border-border relative z-10">
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-2 pl-4 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all shadow-sm">
            <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent border-none outline-none text-sm" />
            <Button size="icon" className="w-10 h-10 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              <Send className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

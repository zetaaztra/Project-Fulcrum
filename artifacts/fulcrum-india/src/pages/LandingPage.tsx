import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border h-16 flex items-center justify-between px-6 lg:px-12">
        <Link href="/">
          <span className="text-xl font-black cursor-pointer">
            Fulcrum<span className="text-primary">-India</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#community" className="hover:text-foreground transition-colors">Community</a>
          <a href="#builders" className="hover:text-foreground transition-colors">For Builders</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:flex font-semibold">Sign In</Button>
          </Link>
          <Link href="/login">
            <Button className="font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 flex flex-col items-center justify-center text-center min-h-[90vh]">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
        <div className="absolute inset-0 bg-grid-overlay opacity-30"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-xs font-bold uppercase tracking-wider mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            Live — 1,247 Entrepreneurs Building
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Every Entrepreneur <br />
            <span className="text-gradient">Deserves a Guide</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto"
          >
            From idea to income. Get matched with a Community Builder, discover the right government schemes, and track your funding journey — all in one place.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-sm text-muted-foreground mb-10 mx-auto"
          >
            Bridging India's ₹2.4 lakh crore funding gap —{" "}
            <span className="text-foreground font-semibold">one entrepreneur at a time.</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <Link href="/login">
              <Button size="lg" className="text-base font-bold h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary glow-primary transition-all hover:scale-105">
                Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Live Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative z-10 w-full max-w-5xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
        >
          {[
            { value: "₹42.8", suffix: "Cr", label: "Funding Enabled", color: "text-accent" },
            { value: "1,247", suffix: "", label: "Businesses Started", color: "text-foreground" },
            { value: "3,842", suffix: "", label: "Jobs Created", color: "text-foreground" },
            { value: "89", suffix: "%", label: "Success Rate", color: "text-success" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-3xl lg:text-4xl font-black mb-1 flex items-baseline gap-1">
                {stat.value}<span className={stat.color}>{stat.suffix}</span>
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border bg-card/30 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60 grayscale">
          <div className="text-lg font-black tracking-widest uppercase">DPIIT</div>
          <div className="text-lg font-black tracking-widest uppercase">StartupTN</div>
          <div className="text-lg font-black tracking-widest uppercase">SCSP/TSP</div>
          <div className="text-lg font-black tracking-widest uppercase">India Stack</div>
          <div className="text-lg font-black tracking-widest uppercase">SIDBI</div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto" id="how-it-works">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">The Process</h2>
          <h3 className="text-3xl lg:text-5xl font-black tracking-tight">Your journey, simplified.</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🌱", title: "Tell us your idea", desc: "Share your business idea, location, and goals. Takes 2 minutes." },
            { icon: "🤝", title: "Get your Builder", desc: "Matched with a verified Community Builder who speaks your language." },
            { icon: "🚀", title: "Launch & Grow", desc: "Documents, schemes, banks, tracking — we handle the complexity." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 hover:-translate-y-2 transition-transform hover:border-primary hover:shadow-2xl hover:shadow-primary/10 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-5xl mb-6 bg-background w-20 h-20 rounded-xl flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="py-32 px-6 relative overflow-hidden flex justify-center">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="relative z-10 bg-card border border-border max-w-5xl w-full rounded-3xl p-12 lg:p-20 text-center shadow-2xl">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
            Ready to build <span className="text-gradient">something great?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Free forever for entrepreneurs. No hidden fees. No catch. Join 1,247 others who have started their journey.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg font-bold h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            <span className="text-xl font-black mb-4 inline-block">Fulcrum<span className="text-primary">-India</span></span>
            <p className="text-muted-foreground text-sm max-w-sm">Building the institutional memory of community entrepreneurship. Every journey makes the next one easier.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Product</h4>
            <div className="space-y-3 flex flex-col text-sm">
              <a href="#" className="hover:text-primary transition-colors">Journey Engine</a>
              <a href="#" className="hover:text-primary transition-colors">Scheme Matching</a>
              <a href="#" className="hover:text-primary transition-colors">Builder Network</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Legal</h4>
            <div className="space-y-3 flex flex-col text-sm">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

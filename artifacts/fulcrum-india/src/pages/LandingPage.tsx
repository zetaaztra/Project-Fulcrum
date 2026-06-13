import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
  useScroll,
  useMotionTemplate,
} from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sun, Moon, Zap, Users, FileCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useRef, useEffect, useState, useCallback } from "react";

/* ── Animated counter ── */
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return <span ref={ref}>{prefix}{val.toLocaleString("en-IN")}{suffix}</span>;
}

/* ── Tilt card ── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glowBg = useMotionTemplate`radial-gradient(200px circle at ${glowX}% ${glowY}%, rgba(99,102,241,0.12), transparent 70%)`;

  const handle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      <motion.div
        style={{ background: glowBg }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
      />
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  /* Scroll progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  /* Mouse spotlight on hero */
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${springX}% ${springY}%, rgba(99,102,241,0.10) 0%, transparent 70%)`;

  const handleHeroMouse = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current!.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [mouseX, mouseY]);

  /* Parallax orbs follow mouse */
  const orb1X = useTransform(springX, [0, 100], [-18, 18]);
  const orb1Y = useTransform(springY, [0, 100], [-12, 12]);
  const orb2X = useTransform(springX, [0, 100], [14, -14]);
  const orb2Y = useTransform(springY, [0, 100], [10, -10]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Scroll progress line */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent z-[100]"
      />

      {/* Navigation */}
      <nav className="fixed top-[3px] left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border h-16 flex items-center justify-between px-6 lg:px-12">
        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.04 }}
            className="text-xl font-black cursor-pointer select-none"
          >
            Fulcrum<span className="text-primary">-India</span>
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {["How It Works", "Community", "For Builders"].map((label, i) => (
            <a
              key={i}
              href={i === 0 ? "#how-it-works" : i === 1 ? "#community" : "#builders"}
              className="relative py-1 group hover:text-foreground transition-colors duration-200"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary rounded-full group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-testid="button-theme-toggle"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-primary/10 hover:border-primary/40 transition-colors text-muted-foreground hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:flex font-semibold hover:text-primary hover:bg-primary/5">Sign In</Button>
          </Link>
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button className="font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 group">
                Get Started
                <motion.span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        onMouseMove={handleHeroMouse}
        style={{ background: spotlight }}
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 flex flex-col items-center justify-center text-center min-h-[90vh]"
      >
        <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-overlay opacity-40 pointer-events-none" />

        {/* Parallax orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div style={{ x: orb1X, y: orb1Y }} className="animate-orb-1 absolute top-[12%] left-[8%] w-80 h-80 rounded-full bg-primary/15 blur-3xl" />
          <motion.div style={{ x: orb2X, y: orb2Y }} className="animate-orb-2 absolute top-[35%] right-[6%] w-[28rem] h-[28rem] rounded-full bg-secondary/12 blur-3xl" />
          <div className="animate-orb-3 absolute bottom-[8%] left-[28%] w-72 h-72 rounded-full bg-accent/12 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 px-4 py-1.5 rounded-full text-primary text-xs font-bold uppercase tracking-wider mb-8 cursor-default select-none shadow-sm shadow-primary/10"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live — 1,247 Entrepreneurs Building
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Every Entrepreneur <br />
            <span className="text-gradient animate-shimmer">Deserves a Guide</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed"
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
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="relative group"
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-xl bg-primary/30 blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button size="lg" className="relative text-base font-bold h-14 px-8 bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                  Start Your Journey
                  <motion.span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative z-10 w-full max-w-5xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { prefix: "₹", to: 428, suffix: "Cr", label: "Funding Enabled", color: "text-accent", icon: TrendingUp },
            { prefix: "", to: 1247, suffix: "", label: "Businesses Started", color: "text-primary", icon: Zap },
            { prefix: "", to: 3842, suffix: "", label: "Jobs Created", color: "text-secondary", icon: Users },
            { prefix: "", to: 89, suffix: "%", label: "Success Rate", color: "text-green-500", icon: FileCheck },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5 transition-colors cursor-default"
            >
              <stat.icon className={`w-4 h-4 mb-2 ${stat.color} opacity-70`} />
              <div className="text-3xl lg:text-4xl font-black mb-1">
                <Counter prefix={stat.prefix} to={stat.to} suffix={stat.suffix} />
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Trust Bar — marquee */}
      <section className="border-y border-border bg-card/40 py-5 overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {["DPIIT", "StartupTN", "SCSP/TSP", "India Stack", "SIDBI", "DPIIT", "StartupTN", "SCSP/TSP", "India Stack", "SIDBI"].map((name, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="text-base font-black tracking-widest uppercase opacity-40 hover:text-primary transition-colors cursor-default inline-block"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto" id="how-it-works">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">The Process</h2>
          <h3 className="text-3xl lg:text-5xl font-black tracking-tight">Your journey, simplified.</h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🌱", title: "Tell us your idea", desc: "Share your business idea, location, and goals. Takes 2 minutes.", step: "01" },
            { icon: "🤝", title: "Get your Builder", desc: "Matched with a verified Community Builder who speaks your language.", step: "02" },
            { icon: "🚀", title: "Launch & Grow", desc: "Documents, schemes, banks, tracking — we handle the complexity.", step: "03" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <TiltCard className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden group cursor-default h-full transition-shadow hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-5 text-[64px] font-black text-primary/5 group-hover:text-primary/10 transition-colors leading-none select-none">
                  {feature.step}
                </div>
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="text-5xl mb-6 bg-background w-20 h-20 rounded-xl flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all relative z-20"
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-bold mb-3 relative z-20">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed relative z-20">{feature.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden flex justify-center" id="community">
        <div className="absolute inset-0 bg-gradient-mesh opacity-35 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 bg-card border border-border max-w-5xl w-full rounded-3xl p-12 lg:p-20 text-center shadow-2xl hover:shadow-primary/10 transition-shadow group overflow-hidden"
        >
          {/* Gradient border shimmer on hover */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black tracking-tight mb-6 relative z-10"
          >
            Ready to build <span className="text-gradient">something great?</span>
          </motion.h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
            Free forever for entrepreneurs. No hidden fees. No catch. Join 1,247 others who have started their journey.
          </p>
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} className="inline-block relative group/btn z-10">
              <span className="absolute inset-0 rounded-xl bg-primary/30 blur-lg scale-110 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <Button size="lg" className="relative text-lg font-bold h-14 px-10 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">
                Start Your Journey
                <motion.span className="ml-2 inline-block group-hover/btn:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            <motion.span whileHover={{ scale: 1.03 }} className="text-xl font-black mb-4 inline-block cursor-default">
              Fulcrum<span className="text-primary">-India</span>
            </motion.span>
            <p className="text-muted-foreground text-sm max-w-sm mt-2">Building the institutional memory of community entrepreneurship. Every journey makes the next one easier.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Product</h4>
            <div className="space-y-3 flex flex-col text-sm">
              {["Journey Engine", "Scheme Matching", "Builder Network"].map((l) => (
                <a key={l} href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Legal</h4>
            <div className="space-y-3 flex flex-col text-sm">
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <a key={l} href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

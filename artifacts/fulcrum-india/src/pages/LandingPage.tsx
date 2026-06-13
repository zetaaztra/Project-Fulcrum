import {
  motion, AnimatePresence,
  useMotionValue, useTransform, useSpring,
  useInView, useScroll, useMotionTemplate,
} from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, Sun, Moon, Zap, Users, FileCheck, TrendingUp,
  Star, MapPin, CheckCircle2, Clock, Building2, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useRef, useEffect, useState, useCallback } from "react";

/* ── Counter ── */
function Counter({ to, prefix = "", suffix = "", duration = 1600 }: {
  to: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString("en-IN")}{suffix}</span>;
}

/* ── Tilt Card ── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rY = useTransform(x, [-0.5, 0.5], [-5, 5]);
  const gX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const gY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const bg = useMotionTemplate`radial-gradient(180px circle at ${gX}% ${gY}%, rgba(99,102,241,0.10), transparent 70%)`;
  const handle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }, [x, y]);
  return (
    <motion.div ref={ref} onMouseMove={handle} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }} className={className}>
      <motion.div style={{ background: bg }} className="absolute inset-0 rounded-2xl pointer-events-none z-10" />
      {children}
    </motion.div>
  );
}

/* ── Journey Demo ── */
const JOURNEY_STEPS = [
  { icon: "💡", label: "Idea Submitted", sub: "Business idea registered" },
  { icon: "👤", label: "Builder Assigned", sub: "Murugan S. • Ex-SBI Manager" },
  { icon: "📄", label: "Documents", sub: "9/20 uploaded • 45% complete", progress: 45 },
  { icon: "🏦", label: "Bank Review", sub: "Canara Bank • Under review" },
  { icon: "✅", label: "Approved!", sub: "₹12L sanctioned" },
  { icon: "🏭", label: "Business Started", sub: "Tailoring unit operational" },
  { icon: "👨‍💼", label: "First Employee", sub: "Team of 7 — Community impact" },
];

function JourneyDemo() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % JOURNEY_STEPS.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col gap-0">
      {JOURNEY_STEPS.map((step, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <div key={i} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: current ? [1, 1.15, 1] : 1,
                  boxShadow: current ? "0 0 0 6px rgba(99,102,241,0.15)" : "none",
                }}
                transition={{ duration: 0.6, repeat: current ? Infinity : 0 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 ${
                  done ? "bg-primary border-primary text-white" :
                  current ? "bg-primary/10 border-primary" :
                  "bg-muted/30 border-border text-muted-foreground"
                }`}
              >
                {done ? <CheckCircle2 className="w-5 h-5 text-white" /> : step.icon}
              </motion.div>
              {i < JOURNEY_STEPS.length - 1 && (
                <div className="w-0.5 h-8 my-1 bg-border overflow-hidden relative">
                  <motion.div className="absolute top-0 left-0 w-full bg-primary"
                    animate={{ height: done ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
                </div>
              )}
            </div>
            <div className="pb-4 flex-1">
              <div className={`font-bold text-sm transition-colors duration-300 ${
                current ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"
              }`}>{step.label}</div>
              <AnimatePresence>
                {(current || done) && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} className="text-xs text-muted-foreground mt-0.5">
                    {step.sub}
                    {step.progress && current && (
                      <div className="mt-1.5 h-1.5 bg-muted/40 rounded-full w-32 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${step.progress}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Knowledge Graph ── */
const KG_NODES = [
  { id: "e",   label: "Entrepreneur", x: 300, y: 40,  color: "#6366F1" },
  { id: "b",   label: "Builder",      x: 120, y: 150, color: "#8B5CF6" },
  { id: "s",   label: "Scheme",       x: 480, y: 150, color: "#F59E0B" },
  { id: "d",   label: "Documents",    x: 60,  y: 280, color: "#3B82F6" },
  { id: "bk",  label: "Bank",         x: 300, y: 280, color: "#10B981" },
  { id: "a",   label: "Application",  x: 540, y: 280, color: "#EC4899" },
  { id: "f",   label: "Funding",      x: 180, y: 390, color: "#F59E0B" },
  { id: "biz", label: "Business",     x: 420, y: 390, color: "#22C55E" },
];
const KG_EDGES: [string, string][] = [
  ["e","b"],["e","s"],["b","d"],["b","bk"],["s","a"],["s","bk"],
  ["d","bk"],["a","bk"],["bk","f"],["bk","biz"],["f","biz"],
];

function KnowledgeGraph() {
  const [hovered, setHovered] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef as React.RefObject<Element>, { once: false });
  const connected = hovered
    ? new Set([hovered, ...KG_EDGES.filter(([a, b]) => a === hovered || b === hovered).flat()])
    : null;
  return (
    <svg ref={svgRef} viewBox="0 0 600 440" className="w-full max-w-2xl mx-auto select-none">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366F1" opacity="0.5" />
        </marker>
      </defs>
      {KG_EDGES.map(([a, b], i) => {
        const na = KG_NODES.find(n => n.id === a)!;
        const nb = KG_NODES.find(n => n.id === b)!;
        const active = connected ? (connected.has(a) && connected.has(b)) : true;
        return (
          <motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={active ? "#6366F1" : "#CBD5E1"}
            strokeWidth={active ? 1.5 : 0.8}
            strokeDasharray="5 4"
            opacity={active ? 0.6 : 0.15}
            markerEnd="url(#arr)"
            animate={inView ? { strokeDashoffset: [30, 0] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
            style={{ strokeDashoffset: 30 }}
          />
        );
      })}
      {KG_NODES.map((node, ni) => {
        const active = connected ? connected.has(node.id) : true;
        return (
          <g key={node.id}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}>
            <motion.circle cx={node.x} cy={node.y} r={28}
              fill={node.color} fillOpacity={active ? 0.12 : 0.04}
              stroke={node.color} strokeWidth={active ? 2 : 0.5}
              animate={inView ? { r: [26, 30, 26] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: ni * 0.4 }}
            />
            <motion.circle cx={node.x} cy={node.y} r={8}
              fill={node.color} opacity={active ? 1 : 0.25}
              animate={inView ? { r: [7, 9, 7] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: ni * 0.4 }}
            />
            <text x={node.x} y={node.y + 44} textAnchor="middle" fontSize="10" fontWeight="600"
              fill={active ? node.color : "#94A3B8"} fontFamily="Inter, sans-serif">
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Funding Flow ── */
const FLOW_NODES = ["Government", "Scheme", "Bank", "Entrepreneur", "Business", "Employment"];

function FundingFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: false });
  return (
    <div ref={ref} className="flex flex-col items-center gap-0 w-full max-w-xs mx-auto">
      {FLOW_NODES.map((node, i) => (
        <div key={node} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.18, duration: 0.4 }}
            className={`px-6 py-2.5 rounded-xl border font-bold text-sm text-center w-48 shadow-sm hover:shadow-md transition-all cursor-default ${
              i === 3 ? "border-primary/40 text-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            {node}
          </motion.div>
          {i < FLOW_NODES.length - 1 && (
            <div className="relative h-10 flex flex-col items-center justify-center overflow-hidden w-0.5">
              <div className="w-full h-full bg-border absolute" />
              {inView && [0, 1, 2].map(j => (
                <motion.div key={j}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{ left: "-3px" }}
                  animate={{ y: [-8, 32] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: j * 0.4 + i * 0.1 }}
                />
              ))}
              <ChevronRight className="w-4 h-4 text-primary rotate-90 absolute bottom-0" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Builder Spotlight ── */
const BUILDERS = [
  { name: "Murugan S.", title: "Retired SBI Manager", location: "Madurai, TN", rating: 4.9, businesses: 42, funding: "₹4.8Cr", jobs: 121 },
  { name: "Lakshmi R.", title: "CA & MSME Consultant", location: "Chennai, TN", rating: 4.8, businesses: 31, funding: "₹3.2Cr", jobs: 89 },
  { name: "Rajan V.",   title: "Ex-SIDBI Officer",     location: "Coimbatore, TN", rating: 5.0, businesses: 57, funding: "₹7.1Cr", jobs: 204 },
];

function BuilderSpotlight() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % BUILDERS.length), 3500);
    return () => clearInterval(id);
  }, []);
  const b = BUILDERS[idx];
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-lg">
              {b.name[0]}
            </div>
            <div>
              <div className="font-black text-lg">{b.name}</div>
              <div className="text-xs text-muted-foreground">{b.title}</div>
            </div>
            <div className="ml-auto flex items-center gap-1 text-amber-500 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-500" /> {b.rating}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" /> {b.location}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[{ l: "Businesses", v: b.businesses }, { l: "Funding", v: b.funding }, { l: "Jobs", v: b.jobs }].map(m => (
              <div key={m.l} className="text-center bg-background/60 rounded-xl p-3 border border-border/50">
                <div className="font-black text-lg text-primary">{m.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            {BUILDERS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-primary" : "w-2 bg-border"}`} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Document Completion ── */
const DOCS = [
  { name: "PAN Card",          done: true },
  { name: "Aadhaar",           done: true },
  { name: "GST Registration",  done: true },
  { name: "Bank Statement",    done: true },
  { name: "Project Report",    done: false, progress: 60 },
  { name: "Udyam Certificate", done: false, progress: 20 },
];

function DocumentCompletion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });
  const pct = Math.round((DOCS.filter(d => d.done).length / DOCS.length) * 100);
  return (
    <div ref={ref} className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-black text-lg">Journey Readiness</div>
        <div className="text-2xl font-black text-primary">{pct}%</div>
      </div>
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : {}} transition={{ duration: 1.2 }} />
      </div>
      <div className="space-y-2.5 pt-1">
        {DOCS.map((doc, i) => (
          <motion.div key={doc.name} initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              doc.done ? "bg-green-500" : "bg-muted/40 border border-border"
            }`}>
              {doc.done && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
            <div className="flex-1">
              <div className={`text-sm font-medium ${doc.done ? "text-foreground" : "text-muted-foreground"}`}>{doc.name}</div>
              {!doc.done && doc.progress && (
                <div className="h-1 bg-muted/30 rounded-full mt-1 overflow-hidden w-24">
                  <motion.div className="h-full bg-amber-500 rounded-full"
                    initial={{ width: 0 }} animate={inView ? { width: `${doc.progress}%` } : {}}
                    transition={{ delay: i * 0.08 + 0.5, duration: 0.6 }} />
                </div>
              )}
            </div>
            <span className={`text-xs font-semibold ${doc.done ? "text-green-500" : "text-amber-500"}`}>
              {doc.done ? "Verified" : "In Progress"}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Community Story ── */
function CommunityStory({ name, type, city, started, funding, employees, revenue, delay = 0 }: {
  name: string; type: string; city: string; started: string;
  funding: string; employees: number; revenue: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all group">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black">
          {name[0]}
        </div>
        <div>
          <div className="font-black">{name}</div>
          <div className="text-xs text-muted-foreground">{type} · {city}</div>
        </div>
        <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" /> Since {started}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        {[{ l: "Funding", v: funding }, { l: "Employees", v: String(employees) }, { l: "Monthly Rev.", v: revenue }].map(m => (
          <div key={m.l} className="bg-background/70 rounded-xl p-3 border border-border/50 group-hover:border-primary/20 transition-colors">
            <div className="font-black text-base text-primary">{m.v}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{m.l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const spY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spX}% ${spY}%, rgba(99,102,241,0.10) 0%, transparent 70%)`;
  const o1x = useTransform(spX, [0, 100], [-18, 18]);
  const o1y = useTransform(spY, [0, 100], [-12, 12]);
  const o2x = useTransform(spX, [0, 100], [14, -14]);
  const o2y = useTransform(spY, [0, 100], [10, -10]);
  const handleMouse = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = heroRef.current!.getBoundingClientRect();
    mouseX.set(((e.clientX - r.left) / r.width) * 100);
    mouseY.set(((e.clientY - r.top) / r.height) * 100);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Scroll progress bar ── */}
      <motion.div style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent z-[100]" />

      {/* ── Nav ── */}
      <nav className="fixed top-[3px] left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border h-16 flex items-center justify-between px-6 lg:px-12">
        <motion.span whileHover={{ scale: 1.04 }} className="text-xl font-black cursor-pointer select-none">
          Fulcrum<span className="text-primary">-India</span>
        </motion.span>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {([["#journey","Journey"],["#why","Why Fulcrum"],["#builders","Builders"],["#impact","Impact"]] as [string,string][]).map(([href, label]) => (
            <a key={href} href={href} className="relative py-1 group hover:text-foreground transition-colors">
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary rounded-full group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-primary/10 hover:border-primary/40 transition-colors text-muted-foreground hover:text-primary"
            aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
          <Link href="/login"><Button variant="ghost" className="hidden sm:flex font-semibold hover:text-primary hover:bg-primary/5">Sign In</Button></Link>
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button className="font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 group">
                Get Started <motion.span className="ml-1.5 inline-block group-hover:translate-x-1 transition-transform"><ArrowRight className="w-4 h-4" /></motion.span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <motion.section ref={heroRef} onMouseMove={handleMouse} style={{ background: spotlight }}
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 flex flex-col items-center justify-center text-center min-h-[90vh]">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-overlay opacity-40 pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div style={{ x: o1x, y: o1y }} className="animate-orb-1 absolute top-[12%] left-[8%] w-80 h-80 rounded-full bg-primary/15 blur-3xl" />
          <motion.div style={{ x: o2x, y: o2y }} className="animate-orb-2 absolute top-[35%] right-[6%] w-[28rem] h-[28rem] rounded-full bg-secondary/12 blur-3xl" />
          <div className="animate-orb-3 absolute bottom-[8%] left-[28%] w-72 h-72 rounded-full bg-accent/12 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 px-4 py-1.5 rounded-full text-primary text-xs font-bold uppercase tracking-wider mb-8 shadow-sm cursor-default">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live — 1,247 Entrepreneurs Building
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            Every Entrepreneur <br /><span className="animate-shimmer">Deserves a Guide</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
            From idea to income. Get matched with a Community Builder, discover government schemes, and track your funding journey — all in one place.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-sm text-muted-foreground mb-10">
            Bridging India's ₹2.4 lakh crore funding gap —{" "}
            <span className="text-foreground font-semibold">one entrepreneur at a time.</span>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex justify-center">
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} className="relative group">
                <span className="absolute inset-0 rounded-xl bg-primary/30 blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button size="lg" className="relative text-base font-bold h-14 px-8 bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/25">
                  Start Your Journey <motion.span className="ml-2 inline-block group-hover:translate-x-1 transition-transform"><ArrowRight className="w-5 h-5" /></motion.span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Trust bar marquee ── */}
      <section className="border-y border-border bg-card/40 py-5 overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {["DPIIT", "StartupTN", "SCSP/TSP", "India Stack", "SIDBI", "DPIIT", "StartupTN", "SCSP/TSP", "India Stack", "SIDBI"].map((name, i) => (
            <motion.span key={i} whileHover={{ scale: 1.1, opacity: 1 }}
              className="text-base font-black tracking-widest uppercase opacity-40 hover:text-primary transition-colors cursor-default inline-block">
              {name}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ══ JOURNEY DEMO + WHY FULCRUM ══ */}
      <section id="journey" className="py-24 lg:py-32 px-6 lg:px-12 bg-card/30 border-b border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Live Demo</h2>
            <h3 className="text-3xl lg:text-4xl font-black mb-3 tracking-tight">Watch a journey unfold</h3>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              This is what Lakshmi's journey looked like — from an idea at her kitchen table to 7 employees in 18 months.
            </p>
            <JourneyDemo />
          </motion.div>
          <motion.div id="why" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Why Fulcrum</h2>
            <h3 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight">The difference is real</h3>
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-2 bg-muted/30">
                <div className="px-5 py-3 text-xs font-black uppercase tracking-widest text-destructive/80 border-r border-border">Without Fulcrum</div>
                <div className="px-5 py-3 text-xs font-black uppercase tracking-widest text-primary">With Fulcrum</div>
              </div>
              {([
                ["Visit 12 offices",      "One Journey"],
                ["40+ PDFs scattered",    "Guided Upload"],
                ["Unknown schemes",       "AI-Matched"],
                ["No tracking",           "Live Timeline"],
                ["No mentor",             "Builder Assigned"],
                ["18-month average",      "6-month average"],
              ] as [string,string][]).map(([bad, good], i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="grid grid-cols-2 border-t border-border hover:bg-primary/[0.03] transition-colors group">
                  <div className="px-5 py-3.5 text-sm text-muted-foreground border-r border-border line-through decoration-destructive/50">{bad}</div>
                  <div className="px-5 py-3.5 text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />{good}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ BUILDER SPOTLIGHT + DOCUMENT COMPLETION ══ */}
      <section id="builders" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Builder Network</h2>
            <h3 className="text-3xl lg:text-4xl font-black mb-3 tracking-tight">Your guide, your success</h3>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Verified Community Builders — retired bankers, CAs, and MSME experts who speak your language.
            </p>
            <BuilderSpotlight />
            <Link href="/login">
              <Button variant="outline" className="mt-4 w-full border-primary/30 hover:bg-primary/5 hover:border-primary font-bold">
                View All Builders <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Document Engine</h2>
            <h3 className="text-3xl lg:text-4xl font-black mb-3 tracking-tight">Know exactly where you stand</h3>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              No more guessing. Every document, every status — visible in real time.
            </p>
            <DocumentCompletion />
          </motion.div>
        </div>
      </section>

      {/* ══ IMPACT COUNTERS ══ */}
      <section id="impact" className="py-20 border-y border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Live Impact</h2>
            <h3 className="text-3xl lg:text-4xl font-black tracking-tight">Numbers that matter</h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {([
              { Icon: Building2, label: "Businesses Started", to: 1247, prefix: "",  suffix: "",    color: "text-primary" },
              { Icon: TrendingUp,label: "Funding Enabled",    to: 428,  prefix: "₹", suffix: "Cr",  color: "text-amber-500" },
              { Icon: Users,     label: "Builders Active",    to: 218,  prefix: "",  suffix: "",    color: "text-secondary" },
              { Icon: Zap,       label: "Jobs Created",       to: 3842, prefix: "",  suffix: "",    color: "text-green-500" },
              { Icon: FileCheck, label: "Applications",       to: 9234, prefix: "",  suffix: "",    color: "text-blue-500" },
            ] as const).map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-default">
                <s.Icon className={`w-5 h-5 mx-auto mb-3 ${s.color}`} />
                <div className={`text-2xl lg:text-3xl font-black mb-1 ${s.color}`}>
                  <Counter prefix={s.prefix} to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ KNOWLEDGE GRAPH ══ */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Intelligence Platform</h2>
            <h3 className="text-3xl lg:text-4xl font-black tracking-tight mb-3">Everything is connected</h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Hover any node to see its relationships. Every decision feeds the next entrepreneur's success.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <KnowledgeGraph />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
              {[
                { title: "Every Journey Recorded", desc: "Each entrepreneur's path becomes a data point that guides the next." },
                { title: "Builder Intelligence",   desc: "Builders know which schemes work for which business types in which districts." },
                { title: "Predictive Matching",    desc: "The platform learns. Scheme match scores improve with every approval." },
                { title: "Government Analytics",   desc: "District coordinators see real-time impact across their geography." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors group cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-black text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ FUNDING FLOW ══ */}
      <section className="py-24 lg:py-32 px-6 bg-card/40 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Funding Flow</h2>
            <h3 className="text-3xl lg:text-4xl font-black tracking-tight mb-3">Money finds its destination</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Government schemes flow through the platform to reach the right entrepreneurs, creating real jobs and businesses.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1"><FundingFlow /></div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {[
                { label: "Schemes Mapped",       val: "340+",   icon: "🗂️" },
                { label: "Banks Integrated",     val: "28",     icon: "🏦" },
                { label: "Avg. Approval Time",   val: "18 days",icon: "⚡" },
                { label: "Disbursement Rate",    val: "89%",    icon: "✅" },
                { label: "District Coverage",    val: "32",     icon: "📍" },
                { label: "Avg. Loan Size",       val: "₹8.4L",  icon: "💰" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all cursor-default">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xl font-black text-primary">{item.val}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMMUNITY STORIES ══ */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Community Impact</h2>
            <h3 className="text-3xl lg:text-4xl font-black tracking-tight">Real businesses. Real numbers.</h3>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            <CommunityStory name="Lakshmi D." type="Tailoring Unit" city="Madurai" started="Jan 2025" funding="₹12L" employees={7} revenue="₹4.8L/mo" delay={0} />
            <CommunityStory name="Ravi K." type="Agri Processing" city="Tirunelveli" started="Mar 2025" funding="₹24L" employees={14} revenue="₹9.2L/mo" delay={0.1} />
            <CommunityStory name="Priya S." type="Handicrafts" city="Kancheepuram" started="Nov 2024" funding="₹8L" employees={5} revenue="₹2.9L/mo" delay={0.2} />
          </div>
        </div>
      </section>

      {/* ══ INSTITUTIONAL MEMORY ══ */}
      <section className="py-24 lg:py-32 px-6 bg-card/40 border-y border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Institutional Memory</h2>
            <h3 className="text-3xl lg:text-4xl font-black tracking-tight mb-6">
              Tomorrow's entrepreneur<br />starts smarter.
            </h3>
            <div className="space-y-4">
              {["Every Journey", "Every Document", "Every Decision", "Every Builder", "Every Approval"].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 cursor-default">
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-lg font-bold">{item}</span>
                  <span className="text-muted-foreground text-sm">becomes institutional memory</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-muted-foreground text-sm leading-relaxed border-l-2 border-primary/30 pl-4">
              Every approved scheme, every rejected document, every successful builder match — feeds back into the platform. The network effect compounds over time.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-8 space-y-5">
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Platform Intelligence</div>
            {[
              { label: "Successful patterns identified", val: "12,480", pct: 88 },
              { label: "Scheme match accuracy",          val: "94%",    pct: 94 },
              { label: "Document rejection reduced",     val: "73%",    pct: 73 },
              { label: "Builder match success",          val: "91%",    pct: 91 },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-bold text-primary">{item.val}</span>
                </div>
                <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.3 }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-32 px-6 relative overflow-hidden flex justify-center">
        <div className="absolute inset-0 bg-gradient-mesh opacity-35 pointer-events-none" />
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative z-10 bg-card border border-border max-w-5xl w-full rounded-3xl p-12 lg:p-20 text-center shadow-2xl group overflow-hidden">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/8 via-secondary/8 to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6 relative z-10">
            Ready to build <span className="animate-shimmer">something great?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
            Free forever for entrepreneurs. No hidden fees. Join 1,247 others who have started their journey.
          </p>
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} className="inline-block relative group/btn z-10">
              <span className="absolute inset-0 rounded-xl bg-primary/30 blur-lg scale-110 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <Button size="lg" className="relative text-lg font-bold h-14 px-10 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">
                Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            <span className="text-xl font-black mb-2 inline-block">Fulcrum<span className="text-primary">-India</span></span>
            <p className="text-muted-foreground text-sm max-w-sm mt-2">Building the institutional memory of community entrepreneurship. Every journey makes the next one easier.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Product</h4>
            <div className="space-y-3 flex flex-col text-sm">
              {["Journey Engine", "Scheme Matching", "Builder Network"].map(l => (
                <a key={l} href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Legal</h4>
            <div className="space-y-3 flex flex-col text-sm">
              {["Privacy Policy", "Terms of Service"].map(l => (
                <a key={l} href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

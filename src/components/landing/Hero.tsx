import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Receipt,
  CreditCard,
  Building,
  Check,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ScrollText,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoTransitionLink } from "@/components/DemoTransitionLink";
import { authUrl } from "@/lib/appUrl";

const trustPills = [
  "Xero Ready",
  "QuickBooks Ready",
  "UK VAT Workflows",
  "Human Review Controls",
];

const highlights = [
  "Two-week free trial",
  "Teams/Slack support",
  "UK/EU GDPR compliant",
];

const workflowDocs = [
  { icon: FileText, label: "Invoice" },
  { icon: Receipt, label: "Receipt" },
  { icon: Building, label: "Bank Statement" },
  { icon: CreditCard, label: "Credit Note" },
  { icon: ScrollText, label: "Supplier Statement" },
  { icon: FileSpreadsheet, label: "Sales Invoice" },
];

const extractionFields = ["Supplier", "Date", "VAT", "Line Items"];

const EASE = [0.22, 0.61, 0.36, 1] as const;

function WorkflowAnimation() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0); // 0:idle,1:docs,2:travel+extract,3:validated,4:route,5:fade
  const [activeDoc, setActiveDoc] = useState(0);
  const [destination, setDestination] = useState<"xero" | "qb">("xero");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    if (reduceMotion) {
      setPhase(4);
      return;
    }
    const el = containerRef.current;
    if (el && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          visibleRef.current = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.1 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) =>
      timeouts.push(setTimeout(() => !cancelled && fn(), ms));

    const runLoop = () => {
      if (cancelled) return;
      if (!visibleRef.current) {
        at(800, runLoop);
        return;
      }
      setPhase(1);
      at(1200, () => setPhase(2));
      at(4000, () => setPhase(3));
      at(5200, () => setPhase(4));
      at(7500, () => setPhase(5));
      at(8500, () => {
        setActiveDoc((d) => (d + 1) % workflowDocs.length);
        setDestination((d) => (d === "xero" ? "qb" : "xero"));
        setPhase(0);
        at(150, runLoop);
      });
    };
    runLoop();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  const ActiveIcon = workflowDocs[activeDoc].icon;
  const showTravel = phase >= 2 && phase <= 4;
  const showExtract = phase >= 2 && phase <= 4;
  const showValidated = phase >= 3 && phase <= 4;
  const showRoute = phase === 4;
  const fading = phase === 5;

  return (
    <div
      ref={containerRef}
      className="relative h-[440px] w-full"
      aria-hidden="true"
    >
      {/* halo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* SVG connectors */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 440"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flow-left" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flow-right" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* base lines */}
        <path d="M 110 220 C 150 220, 160 220, 190 220" stroke="hsl(var(--border))" strokeWidth="1.5" fill="none" />
        <path d="M 250 220 C 280 220, 290 220, 330 220" stroke="hsl(var(--border))" strokeWidth="1.5" fill="none" />
        {/* animated overlays */}
        <path
          d="M 110 220 C 150 220, 160 220, 190 220"
          stroke="url(#flow-left)"
          strokeWidth="2"
          fill="none"
          style={{
            opacity: showTravel ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
          strokeDasharray="8 6"
        >
          {showTravel && !reduceMotion && (
            <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.2s" repeatCount="indefinite" />
          )}
        </path>
        <path
          d="M 250 220 C 280 220, 290 220, 330 220"
          stroke="url(#flow-right)"
          strokeWidth="2"
          fill="none"
          style={{
            opacity: showRoute ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
          strokeDasharray="8 6"
        >
          {showRoute && !reduceMotion && (
            <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1s" repeatCount="indefinite" />
          )}
        </path>
      </svg>

      <div className="relative h-full grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        {/* Documents column */}
        <div className="flex flex-col gap-2 pr-2">
          {workflowDocs.map((doc, i) => {
            const isActive = i === activeDoc && phase >= 1;
            const Icon = doc.icon;
            return (
              <motion.div
                key={doc.label}
                initial={{ opacity: 0, y: 8 }}
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0 }
                    : {
                        opacity: fading && isActive ? 0 : 1,
                        y: [0, -2, 0],
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0.3 }
                    : {
                        opacity: { duration: 0.4, delay: phase === 1 ? i * 0.08 : 0, ease: EASE },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                      }
                }
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs transition-all duration-300 ${
                  isActive
                    ? "border-primary/60 bg-primary/10 shadow-[0_0_16px_hsl(var(--primary)/0.25)]"
                    : "border-border bg-secondary/40"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={isActive ? "text-foreground" : "text-muted-foreground"}>{doc.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Outworx engine */}
        <div className="relative flex flex-col items-center justify-center px-2">
          {/* Traveling active doc */}
          <AnimatePresence>
            {showTravel && (
              <motion.div
                key={`travel-${activeDoc}-${phase}`}
                initial={{ opacity: 0, x: -90, scale: 1 }}
                animate={{ opacity: [0, 1, 1, 0], x: [-90, -30, 0, 0], scale: [1, 1.05, 0.9, 0.8] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: EASE, times: [0, 0.4, 0.8, 1] }}
                className="absolute top-1/2 -translate-y-[80px] flex items-center gap-1.5 rounded-md border border-primary/60 bg-primary/15 px-2 py-1 text-[10px] text-foreground shadow-[0_0_18px_hsl(var(--primary)/0.4)] will-change-transform"
                style={{ pointerEvents: "none" }}
              >
                <ActiveIcon className="h-3 w-3 text-primary" />
                {workflowDocs[activeDoc].label}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core */}
          <motion.div
            className="relative h-20 w-20 rounded-full border border-primary/40 bg-primary/15 flex items-center justify-center shadow-glow"
            animate={
              phase === 3 && !reduceMotion
                ? { boxShadow: ["0 0 0 0 hsl(var(--primary)/0.5)", "0 0 0 24px hsl(var(--primary)/0)"] }
                : {}
            }
            transition={{ duration: 1.2, ease: EASE }}
          >
            <Sparkles className="h-7 w-7 text-primary" />
          </motion.div>
          <span className="mt-2 text-xs font-medium">Outworx</span>

          {/* Extraction checklist */}
          <div className="mt-3 min-h-[78px] w-full max-w-[140px]">
            <AnimatePresence>
              {showExtract && (
                <motion.ul
                  key={`extract-${activeDoc}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: fading ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1"
                >
                  {extractionFields.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.25, duration: 0.3, ease: EASE }}
                      className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                    >
                      <Check className="h-3 w-3 text-primary" />
                      {f}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Validated pill */}
          <AnimatePresence>
            {showValidated && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: fading ? 0 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-2 flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] text-success"
              >
                <ShieldCheck className="h-3 w-3" /> Validated
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Destinations */}
        <div className="flex flex-col gap-3 pl-2 items-end">
          {(["xero", "qb"] as const).map((d) => {
            const isActive = showRoute && destination === d;
            const isXero = d === "xero";
            return (
              <motion.div
                key={d}
                animate={
                  isActive && !reduceMotion
                    ? { boxShadow: ["0 0 0 0 hsl(var(--primary)/0.4)", "0 0 0 14px hsl(var(--primary)/0)"] }
                    : {}
                }
                transition={{ duration: 1.2, repeat: 1, ease: EASE }}
                className={`relative flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? isXero
                      ? "border-[#13B5EA]/60 bg-[#13B5EA]/15"
                      : "border-[#2CA01C]/60 bg-[#2CA01C]/15"
                    : isXero
                    ? "border-[#13B5EA]/25 bg-[#13B5EA]/10"
                    : "border-[#2CA01C]/25 bg-[#2CA01C]/10"
                }`}
              >
                <span
                  className={`font-bold text-sm ${isXero ? "text-[#13B5EA]" : "text-[#2CA01C]"}`}
                >
                  {isXero ? "X" : "QB"}
                </span>
                <span className="text-xs text-foreground/90">
                  {isXero ? "Xero" : "QuickBooks"}
                </span>
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <AnimatePresence>
            {showRoute && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] text-primary"
              >
                <Check className="h-3 w-3" /> Ready to Publish
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-20 lg:pt-16 lg:pb-32">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="max-w-xl">
            {/* Trust strip */}
            <div className="flex flex-wrap gap-2 mb-8">
              {trustPills.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    boxShadow: [
                      "0 0 0 0 hsl(var(--primary)/0)",
                      "0 0 14px 0 hsl(var(--primary)/0.35)",
                      "0 0 0 0 hsl(var(--primary)/0)",
                    ],
                  }}
                  transition={{
                    opacity: { duration: 0.4, delay: i * 0.12, ease: EASE },
                    y: { duration: 0.4, delay: i * 0.12, ease: EASE },
                    boxShadow: { duration: 1.2, delay: 0.4 + i * 0.12, times: [0, 0.5, 1] },
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-primary/30 bg-primary/5 text-foreground/90 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_12px_hsl(var(--primary)/0.25)]"
                >
                  <Check className="h-3 w-3 text-primary" />
                  {label}
                </motion.div>
              ))}
            </div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.1] mb-6"
            >
              Put your books
              <br />
              on <span className="text-serif text-primary">Autopilot</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-4"
            >
              Introducing the AI Autopilot for Accountants and Bookkeepers.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-muted-foreground mb-8"
            >
              From data capture to financial close, handled end-to-end by AI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a href={authUrl()}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                  Get started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
              <DemoTransitionLink to="/dashboard-demo">
                <Button variant="outline" size="lg" className="border-border hover:bg-secondary px-6" asChild>
                  <span>View demo</span>
                </Button>
              </DemoTransitionLink>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  {highlight}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Workflow Animation */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 shadow-xl">
              <WorkflowAnimation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

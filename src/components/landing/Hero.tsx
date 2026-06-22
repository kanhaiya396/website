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

const validationFields = ["Supplier", "Date", "VAT", "Line Items", "Totals"];

const EASE = [0.22, 0.61, 0.36, 1] as const;

// Phase timing (ms) — total ~7s cycle
const T = {
  select: 2000,
  travel: 1000,
  process: 1000,
  validate: 1200,
  publish: 1000,
  pause: 900,
};

type Phase = "select" | "travel" | "process" | "validate" | "publish" | "pause";

function WorkflowAnimation() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("select");
  const [activeDoc, setActiveDoc] = useState(0);
  const [destination, setDestination] = useState<"xero" | "qb">("xero");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(true);

  // Pause when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Main loop
  useEffect(() => {
    if (reduceMotion) {
      setPhase("validate");
      return;
    }
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) =>
      timeouts.push(setTimeout(() => !cancelled && fn(), ms));

    const tick = () => {
      if (cancelled) return;
      if (!visibleRef.current) {
        at(600, tick);
        return;
      }
      setPhase("select");
      at(T.select, () => setPhase("travel"));
      at(T.select + T.travel, () => setPhase("process"));
      at(T.select + T.travel + T.process, () => setPhase("validate"));
      at(T.select + T.travel + T.process + T.validate, () => setPhase("publish"));
      at(T.select + T.travel + T.process + T.validate + T.publish, () =>
        setPhase("pause")
      );
      at(
        T.select + T.travel + T.process + T.validate + T.publish + T.pause,
        () => {
          // Pseudo-random next doc (not same as current)
          setActiveDoc((d) => {
            let n = Math.floor(Math.random() * workflowDocs.length);
            if (n === d) n = (n + 1) % workflowDocs.length;
            return n;
          });
          setDestination(Math.random() > 0.5 ? "xero" : "qb");
          tick();
        }
      );
    };
    tick();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  const ActiveIcon = workflowDocs[activeDoc].icon;
  const isSelecting = phase === "select";
  const isTraveling = phase === "travel";
  const isProcessing = phase === "process" || phase === "validate";
  const isValidating = phase === "validate";
  const isPublishing = phase === "publish";
  const showLeftFlow = isTraveling;
  const showRightFlow = isPublishing;
  const destActive = (d: "xero" | "qb") => isPublishing && destination === d;

  return (
    <div
      ref={containerRef}
      className="relative h-[440px] w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* Workspace ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />
        <motion.div
          className="absolute inset-0 opacity-[0.06]"
          animate={
            reduceMotion
              ? {}
              : {
                  background: [
                    "radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 70%, hsl(var(--primary)) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 50%)",
                  ],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* SVG connection lines */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 400 440"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flow-l" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flow-r" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Idle base lines */}
        <path d="M 130 220 C 160 220, 175 220, 195 220" stroke="hsl(var(--border))" strokeWidth="1" strokeOpacity="0.45" fill="none" />
        <path d="M 205 220 C 230 220, 245 220, 275 220" stroke="hsl(var(--border))" strokeWidth="1" strokeOpacity="0.45" fill="none" />
        {/* Active overlays */}
        <path
          d="M 130 220 C 160 220, 175 220, 195 220"
          stroke="url(#flow-l)"
          strokeWidth="2"
          fill="none"
          style={{ opacity: showLeftFlow ? 1 : 0, transition: "opacity 400ms ease" }}
          strokeDasharray="6 5"
        >
          {showLeftFlow && !reduceMotion && (
            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1s" repeatCount="indefinite" />
          )}
        </path>
        <path
          d="M 205 220 C 230 220, 245 220, 275 220"
          stroke="url(#flow-r)"
          strokeWidth="2"
          fill="none"
          style={{ opacity: showRightFlow ? 1 : 0, transition: "opacity 400ms ease" }}
          strokeDasharray="6 5"
        >
          {showRightFlow && !reduceMotion && (
            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1s" repeatCount="indefinite" />
          )}
        </path>
      </svg>

      {/* Three-zone grid */}
      <div className="relative grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3">
        {/* LEFT: documents in 2-col grid */}
        <div className="grid grid-cols-2 gap-1.5 pr-1">
          {workflowDocs.map((doc, i) => {
            const isActive = i === activeDoc && (isSelecting || isTraveling);
            const isGone = i === activeDoc && (isProcessing || isPublishing);
            const Icon = doc.icon;
            return (
              <motion.div
                key={doc.label}
                animate={
                  reduceMotion
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: isGone ? 0.25 : isActive ? 1 : isSelecting ? 0.45 : 0.7,
                        scale: isActive ? 1.04 : 1,
                      }
                }
                transition={{ duration: 0.5, ease: EASE }}
                className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[10px] transition-colors duration-300 ${
                  isActive
                    ? "border-primary/70 bg-primary/15 shadow-[0_0_18px_hsl(var(--primary)/0.35)]"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <Icon
                  className={`h-3 w-3 shrink-0 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span className={`truncate ${isActive ? "text-white" : "text-muted-foreground"}`}>
                  {doc.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* CENTER: Outworx engine + validation */}
        <div className="relative flex w-[120px] flex-col items-center justify-center">
          {/* Traveling document */}
          <AnimatePresence>
            {isTraveling && (
              <motion.div
                key={`travel-${activeDoc}`}
                initial={{ opacity: 0, x: -70, y: 0, scale: 0.9 }}
                animate={{
                  opacity: [0, 1, 1, 0.2],
                  x: [-70, -30, -5, 0],
                  y: [0, -6, -2, 0],
                  scale: [0.9, 1.05, 1, 0.85],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: EASE, times: [0, 0.4, 0.8, 1] }}
                className="absolute top-[28px] z-10 flex items-center gap-1 rounded-md border border-primary/70 bg-primary/20 px-1.5 py-1 text-[10px] font-medium text-white shadow-[0_0_22px_hsl(var(--primary)/0.55)] backdrop-blur-sm will-change-transform"
                style={{ filter: "blur(0.2px)" }}
              >
                <ActiveIcon className="h-3 w-3 text-primary" />
                <span className="whitespace-nowrap">{workflowDocs[activeDoc].label}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Engine core */}
          <div className="relative flex h-[88px] w-[88px] items-center justify-center">
            {/* Outer breathing halo */}
            <motion.div
              className="absolute inset-[-20px] rounded-full bg-primary/25 blur-2xl"
              animate={
                reduceMotion
                  ? {}
                  : {
                      scale: isProcessing ? [1, 1.18, 1] : [1, 1.08, 1],
                      opacity: isProcessing ? [0.55, 0.9, 0.55] : [0.4, 0.6, 0.4],
                    }
              }
              transition={{
                duration: isProcessing ? 1.6 : 3.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Expanding pulse ring (only while processing) */}
            <AnimatePresence>
              {isProcessing && !reduceMotion && (
                <>
                  <motion.span
                    key="pulse-1"
                    className="absolute inset-0 rounded-full border border-primary/50"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.span
                    key="pulse-2"
                    className="absolute inset-0 rounded-full border border-primary/40"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.8,
                    }}
                  />
                </>
              )}
            </AnimatePresence>
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-[-4px] rounded-full border border-primary/30"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                maskImage:
                  "linear-gradient(135deg, transparent 0%, hsl(var(--primary)) 45%, transparent 75%)",
                WebkitMaskImage:
                  "linear-gradient(135deg, transparent 0%, hsl(var(--primary)) 45%, transparent 75%)",
              }}
            />
            {/* Core */}
            <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-primary/50 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
              <motion.div
                animate={
                  isProcessing && !reduceMotion
                    ? { rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }
                    : {}
                }
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-7 w-7 text-primary" />
              </motion.div>
            </div>
          </div>
          <span className="mt-2 text-[11px] font-semibold tracking-wide text-white">
            Outworx
          </span>

          {/* Validation checklist */}
          <div className="mt-2 h-[96px] w-full">
            <AnimatePresence>
              {isValidating && (
                <motion.ul
                  key="validation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-0.5"
                >
                  {validationFields.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.18, duration: 0.3, ease: EASE }}
                      className="flex items-center gap-1 text-[9px] text-white/90"
                    >
                      <Check className="h-2.5 w-2.5 shrink-0 text-primary" />
                      <span className="truncate">{f}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: destinations */}
        <div className="flex flex-col gap-2.5 pl-1">
          {(["xero", "qb"] as const).map((d) => {
            const active = destActive(d);
            const isXero = d === "xero";
            const color = isXero ? "#13B5EA" : "#2CA01C";
            return (
              <motion.div
                key={d}
                animate={
                  active && !reduceMotion
                    ? {
                        boxShadow: [
                          `0 0 0 0 ${color}55`,
                          `0 0 0 16px ${color}00`,
                        ],
                        scale: [1, 1.04, 1],
                      }
                    : { boxShadow: `0 0 0 0 ${color}00`, scale: 1 }
                }
                transition={{ duration: 1.2, ease: EASE }}
                className="relative flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-300"
                style={{
                  borderColor: active ? `${color}99` : `${color}40`,
                  background: active ? `${color}22` : `${color}10`,
                }}
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold"
                  style={{ background: `${color}25`, color }}
                >
                  {isXero ? "X" : "QB"}
                </span>
                <span className="text-[11px] font-medium text-white/90">
                  {isXero ? "Xero" : "QuickBooks"}
                </span>
                <AnimatePresence>
                  {active && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="ml-auto"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" style={{ color }} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Ready to publish */}
          <div className="h-7">
            <AnimatePresence>
              {isPublishing && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary shadow-[0_0_14px_hsl(var(--primary)/0.3)]"
                >
                  <Check className="h-2.5 w-2.5" /> Ready to Publish
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-center gap-2 mb-3"
              >
                <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))]" />
                <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-white/90">
                  BUILT FOR MODERN ACCOUNTING &amp; BOOKKEEPING
                </span>
              </motion.div>
              <div className="flex flex-wrap gap-1.5">
                {trustPills.map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      boxShadow: [
                        "0 0 0 0 hsl(var(--primary)/0)",
                        "0 0 14px 0 hsl(var(--primary)/0.3)",
                        "0 0 0 0 hsl(var(--primary)/0)",
                      ],
                    }}
                    transition={{
                      opacity: { duration: 0.4, delay: 0.3 + i * 0.1, ease: EASE },
                      y: { duration: 0.4, delay: 0.3 + i * 0.1, ease: EASE },
                      boxShadow: { duration: 1.2, delay: 0.7 + i * 0.1, times: [0, 0.5, 1] },
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.05] hover:shadow-[0_0_14px_hsl(var(--primary)/0.25)]"
                  >
                    <Check className="h-3 w-3 text-primary" />
                    {label}
                  </motion.div>
                ))}
              </div>
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

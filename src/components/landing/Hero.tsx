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
  { icon: Receipt, label: "Receipt", color: "#10B981" },
  { icon: FileText, label: "Invoice", color: "#3B82F6" },
  { icon: ScrollText, label: "Supplier statement", color: "#A855F7" },
  { icon: Building, label: "Bank statement", color: "#8B5CF6" },
  { icon: FileSpreadsheet, label: "Sales invoice", color: "#F59E0B" },
  { icon: CreditCard, label: "Credit note", color: "#EC4899" },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;

// Phase timing (ms)
const T = {
  select: 900,
  drop: 700,
  process: 1000,
  validate: 1200,
  publish: 1400,
  pause: 700,
};

type Phase = "select" | "drop" | "process" | "validate" | "publish" | "pause";

function WorkflowAnimation() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("select");
  const [activeDoc, setActiveDoc] = useState(0);
  const [destination, setDestination] = useState<"xero" | "qb">("xero");
  const [flyVec, setFlyVec] = useState<{
    fromX: number;
    fromY: number;
    dx: number;
    dy: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(true);

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

  // Compute fly vector right before the drop phase
  const computeFlyVec = (idx: number) => {
    const container = containerRef.current;
    const card = cardRefs.current[idx];
    const engine = engineRef.current;
    if (!container || !card || !engine) return null;
    const cr = container.getBoundingClientRect();
    const a = card.getBoundingClientRect();
    const b = engine.getBoundingClientRect();
    const fromX = a.left - cr.left;
    const fromY = a.top - cr.top;
    const dx =
      b.left - cr.left + b.width / 2 - (fromX + a.width / 2);
    const dy =
      b.top - cr.top + b.height / 2 - (fromY + a.height / 2);
    return { fromX, fromY, dx, dy };
  };

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
      at(T.select, () => {
        setFlyVec(computeFlyVec(activeDoc));
        setPhase("drop");
      });
      at(T.select + T.drop, () => {
        setFlyVec(null);
        setPhase("process");
      });
      at(T.select + T.drop + T.process, () => setPhase("validate"));
      at(T.select + T.drop + T.process + T.validate, () =>
        setPhase("publish")
      );
      at(
        T.select + T.drop + T.process + T.validate + T.publish,
        () => setPhase("pause")
      );
      at(
        T.select + T.drop + T.process + T.validate + T.publish + T.pause,
        () => {
          setActiveDoc((d) => (d + 1) % workflowDocs.length);
          setDestination((prev) => (prev === "xero" ? "qb" : "xero"));
          tick();
        }
      );
    };
    tick();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, activeDoc]);

  const isDropping = phase === "drop";
  const isProcessing = phase === "process" || phase === "validate";
  const isPublishing = phase === "publish";
  const activeDocLifted = phase === "select";
  const activeDocHidden = phase === "drop"; // original fades while clone flies

  // Status bar messages
  const statusMessage = (() => {
    switch (phase) {
      case "select":
        return { text: "Reading document…", tone: "info" as const };
      case "drop":
        return {
          text: `Capturing ${workflowDocs[activeDoc].label}…`,
          tone: "info" as const,
        };
      case "process":
        return { text: "Extracting fields…", tone: "info" as const };
      case "validate":
        return { text: "Validating VAT…", tone: "info" as const };
      case "publish":
        return {
          text: `Posted to ${destination === "xero" ? "Xero" : "QuickBooks"}`,
          tone: "success" as const,
        };
      case "pause":
      default:
        return { text: "VAT number verified", tone: "success" as const };
    }
  })();

  const ActiveIcon = workflowDocs[activeDoc].icon;
  const activeColor = workflowDocs[activeDoc].color;

  return (
    <div
      ref={containerRef}
      className="relative h-[440px] w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />
      </div>

      {/* Vertical stack: doc grid → engine row → status bar */}
      <div className="relative flex h-full flex-col justify-between gap-4">
        {/* TOP: 2x3 document grid */}
        <div className="grid grid-cols-2 gap-2">
          {workflowDocs.map((doc, i) => {
            const isActive = i === activeDoc;
            const Icon = doc.icon;
            return (
              <motion.div
                key={doc.label}
                animate={
                  reduceMotion
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: isActive ? 1 : 0.55,
                        scale: isActive ? 1.02 : 1,
                      }
                }
                transition={{ duration: 0.5, ease: EASE }}
                className={`relative flex items-center gap-3 rounded-xl border px-4 py-4 text-sm transition-colors duration-300 ${
                  isActive
                    ? "border-primary/60 bg-primary/[0.08] shadow-[0_0_22px_hsl(var(--primary)/0.28)]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                <Icon
                  className="h-5 w-5 shrink-0"
                  style={{ color: isActive ? doc.color : `${doc.color}AA` }}
                />
                <span
                  className={`truncate ${
                    isActive ? "text-white" : "text-white/70"
                  }`}
                >
                  {doc.label}
                </span>
                {isActive && !reduceMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-lg border border-primary/40"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.05 }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* MIDDLE: X — Outworx — QB row */}
        <div className="relative flex items-center justify-center">
          {/* Connector lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 400 120"
            preserveAspectRatio="none"
          >
            <path
              d="M 140 60 L 180 60"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeOpacity="0.4"
              fill="none"
            />
            <path
              d="M 220 60 L 260 60"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeOpacity="0.4"
              fill="none"
            />
            {/* Active flow left (Xero) */}
            <path
              d="M 140 60 L 180 60"
              stroke="#13B5EA"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              style={{
                opacity:
                  isProcessing && destination === "xero"
                    ? 0
                    : isPublishing && destination === "xero"
                    ? 1
                    : 0,
                transition: "opacity 300ms ease",
              }}
            >
              {!reduceMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="16"
                  to="0"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </path>
            {/* Active flow right (QB) */}
            <path
              d="M 220 60 L 260 60"
              stroke="#2CA01C"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              style={{
                opacity: isPublishing && destination === "qb" ? 1 : 0,
                transition: "opacity 300ms ease",
              }}
            >
              {!reduceMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="-16"
                  to="0"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          </svg>

          <div className="relative flex items-center gap-8">
            {/* Xero tile */}
            <DestinationTile
              kind="xero"
              active={isPublishing && destination === "xero"}
              reduceMotion={!!reduceMotion}
            />

            {/* Outworx engine */}
            <div className="relative flex flex-col items-center">
              <div className="relative flex h-[120px] w-[120px] items-center justify-center">
                {/* Halo */}
                <motion.div
                  className="absolute inset-[-18px] rounded-full bg-primary/25 blur-2xl"
                  animate={
                    reduceMotion
                      ? {}
                      : {
                          scale: isProcessing ? [1, 1.18, 1] : [1, 1.06, 1],
                          opacity: isProcessing ? [0.6, 0.95, 0.6] : [0.4, 0.6, 0.4],
                        }
                  }
                  transition={{
                    duration: isProcessing ? 1.4 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Pulse ring during processing */}
                <AnimatePresence>
                  {isProcessing && !reduceMotion && (
                    <motion.span
                      key="pulse"
                      className="absolute inset-0 rounded-full border border-primary/50"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </AnimatePresence>
                {/* Rotating ring */}
                <motion.div
                  className="absolute inset-[-3px] rounded-full border border-primary/30"
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
                <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/50 bg-gradient-to-br from-primary/25 to-primary/5 backdrop-blur-sm">
                  <motion.div
                    animate={
                      isProcessing && !reduceMotion
                        ? { rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }
                        : {}
                    }
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="h-10 w-10 text-primary" />
                  </motion.div>
                </div>
              </div>
              <span className="mt-3 text-sm font-semibold tracking-wide text-white">
                Outworx
              </span>
              <span className="text-xs text-white/50">One</span>
            </div>

            {/* QuickBooks tile */}
            <DestinationTile
              kind="qb"
              active={isPublishing && destination === "qb"}
              reduceMotion={!!reduceMotion}
            />
          </div>
        </div>

        {/* BOTTOM: status bar (fixed height, swaps content) */}
        <div className="relative h-[44px] w-full overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <AnimatePresence mode="wait">
            <motion.div
              key={statusMessage.text}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-xs"
            >
              {statusMessage.tone === "success" ? (
                <Check className="h-3.5 w-3.5 text-primary" />
              ) : (
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  animate={
                    reduceMotion
                      ? {}
                      : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }
                  }
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span
                className={
                  statusMessage.tone === "success"
                    ? "font-medium text-primary"
                    : "text-white/85"
                }
              >
                {statusMessage.text}
              </span>
            </motion.div>
          </AnimatePresence>
          {statusMessage.tone === "success" && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-xl"
              initial={{ boxShadow: "0 0 0 0 hsl(var(--primary)/0)" }}
              animate={{
                boxShadow: [
                  "0 0 0 0 hsl(var(--primary)/0)",
                  "0 0 22px 0 hsl(var(--primary)/0.35)",
                  "0 0 0 0 hsl(var(--primary)/0)",
                ],
              }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DestinationTile({
  kind,
  active,
  reduceMotion,
}: {
  kind: "xero" | "qb";
  active: boolean;
  reduceMotion: boolean;
}) {
  const isXero = kind === "xero";
  const color = isXero ? "#13B5EA" : "#2CA01C";
  const label = isXero ? "X" : "QB";
  return (
    <motion.div
      animate={
        active && !reduceMotion
          ? {
              scale: [1, 1.06, 1],
              boxShadow: [
                `0 0 0 0 ${color}55`,
                `0 0 0 14px ${color}00`,
              ],
            }
          : { scale: 1, boxShadow: `0 0 0 0 ${color}00` }
      }
      transition={{ duration: 1.2, ease: EASE, repeat: active ? Infinity : 0 }}
      className="relative flex h-[76px] w-[76px] items-center justify-center rounded-2xl border text-xl font-bold transition-colors duration-300"
      style={{
        borderColor: active ? `${color}AA` : `${color}40`,
        background: active ? `${color}22` : `${color}10`,
        color,
      }}
    >
      {label}
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-background"
          >
            <CheckCircle2 className="h-4 w-4" style={{ color }} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
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

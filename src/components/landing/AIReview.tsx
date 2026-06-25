import { motion } from "framer-motion";
import {
  AlertTriangle,
  Copy,
  Percent,
  Clock,
  Activity,
  Sparkles,
  Check,
} from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const ISSUES = [
  {
    icon: Copy,
    severity: "High",
    severityTone: "bg-red-500/10 text-red-300 border-red-500/20",
    title: "Duplicate payment detected",
    detail: "ACME Ltd · INV-20481 · £1,240.00 paid twice",
    time: "2m ago",
  },
  {
    icon: Percent,
    severity: "Review",
    severityTone: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    title: "VAT inconsistency flagged",
    detail: "Standard rate applied to a zero-rated supplier",
    time: "11m ago",
  },
  {
    icon: Clock,
    severity: "Overdue",
    severityTone: "bg-primary/10 text-primary border-primary/25",
    title: "Overdue invoice identified",
    detail: "Bright Studios · 42 days outstanding · £3,860.00",
    time: "27m ago",
  },
  {
    icon: Activity,
    severity: "Anomaly",
    severityTone: "bg-primary/10 text-primary border-primary/25",
    title: "Ledger anomaly surfaced",
    detail: "Office expenses 3.2× monthly average",
    time: "1h ago",
  },
];

const PILLS = [
  "Duplicate Detection",
  "VAT Anomaly Alerts",
  "Ledger Health Monitoring",
  "AI Generated Summaries",
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function AIReview() {
  return (
    <section id="ai-review" className="section-pad relative scroll-mt-24">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <SectionReveal>
            <div className="eyebrow mb-4">AI Review</div>
            <h2 className="font-display font-extrabold tracking-tight">
              Your ledger talks. <br />
              <span className="text-serif text-primary">Outworx listens.</span>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.7] text-muted-foreground max-w-xl">
              Most accounting software helps move transactions into the ledger.
            </p>
            <p className="mt-3 text-[17px] leading-[1.7] text-muted-foreground max-w-xl">
              Outworx continuously reviews ledger activity — helping firms surface
              issues, monitor data quality and identify risks before they become
              costly problems.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {PILLS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-[13px] text-foreground/85"
                >
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                  {p}
                </span>
              ))}
            </div>
          </SectionReveal>

          {/* Monitoring panel */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="relative"
          >
            <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm shadow-glow-teal/30 overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/70">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-[13px] font-semibold tracking-wide text-foreground/90">
                    Ledger Monitor
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  AI Summaries
                </div>
              </div>

              {/* Issue cards */}
              <div className="divide-y divide-border/60">
                {ISSUES.map((iss) => {
                  const Icon = iss.icon;
                  return (
                    <motion.div
                      key={iss.title}
                      variants={item}
                      className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-primary/[0.03]"
                    >
                      <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 border border-primary/15">
                        <Icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${iss.severityTone}`}
                          >
                            {iss.severity}
                          </span>
                          <span className="text-[14px] font-semibold text-foreground/95">
                            {iss.title}
                          </span>
                        </div>
                        <p className="mt-1 text-[13px] text-muted-foreground truncate">
                          {iss.detail}
                        </p>
                      </div>
                      <div className="shrink-0 text-[11px] text-muted-foreground/80">
                        {iss.time}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer summary */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-t border-border/70 bg-card/40 text-[12.5px] text-muted-foreground">
                <AlertTriangle className="h-3.5 w-3.5 text-primary" />
                4 items need review this week · summarised by Outworx AI
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

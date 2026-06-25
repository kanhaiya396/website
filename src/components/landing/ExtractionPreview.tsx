import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Receipt, Landmark, FileMinus, ArrowRight, Zap, Check } from "lucide-react";

type Status = "posted" | "processing" | "queued";

type Row = {
  key: string;
  icon: typeof FileText;
  iconBg: string;
  iconColor: string;
  title: string;
  source: string;
  amount: string;
  status: Status;
};

const ROWS: Row[] = [
  {
    key: "invoice",
    icon: FileText,
    iconBg: "rgba(59,130,246,0.14)",
    iconColor: "#60A5FA",
    title: "Apex Supplies — INV-2041",
    source: "via Email · 2 min ago",
    amount: "£1,488.00",
    status: "posted",
  },
  {
    key: "receipt",
    icon: Receipt,
    iconBg: "rgba(16,185,129,0.14)",
    iconColor: "#10B981",
    title: "Brewline Coffee Co.",
    source: "via WhatsApp · 4 min ago",
    amount: "£10.60",
    status: "processing",
  },
  {
    key: "statement",
    icon: Landmark,
    iconBg: "rgba(168,85,247,0.14)",
    iconColor: "#A78BFA",
    title: "Barclays · Business ••4421",
    source: "via Upload · 6 min ago",
    amount: "£12,418.55",
    status: "queued",
  },
  {
    key: "credit",
    icon: FileMinus,
    iconBg: "rgba(244,114,182,0.14)",
    iconColor: "#F472B6",
    title: "Northwind Ltd — CN-0087",
    source: "via Email · 8 min ago",
    amount: "−£240.00",
    status: "queued",
  },
];

function StatusBadge({ status }: { status: Status }) {
  if (status === "posted") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
        <Check className="h-3 w-3" /> Posted
      </span>
    );
  }
  if (status === "processing") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-400">
        <Zap className="h-3 w-3" /> Processing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
      Queued
    </span>
  );
}

export function ExtractionPreview() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(1);
  const [processed, setProcessed] = useState(184);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % ROWS.length), 2500);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setProcessed((n) => n + Math.floor(Math.random() * 3) + 1), 1800);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative">
      {/* Soft teal halo */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[28px] opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(168 100% 45% / 0.22), transparent 70%)",
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-card-halo">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border/70 px-5 py-3.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-foreground leading-tight">
              AI Autopilot
            </span>
            <span className="text-[11px] text-muted-foreground leading-tight">
              Processing live queue
            </span>
          </div>
          <span className="ml-auto rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            4 documents
          </span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/60">
          {ROWS.map((row, i) => {
            const Icon = row.icon;
            const isActive = i === active;
            return (
              <motion.div
                key={row.key}
                animate={
                  reduce
                    ? {}
                    : isActive
                    ? {
                        boxShadow: [
                          "inset 0 0 0 0 hsl(var(--primary)/0)",
                          "inset 3px 0 0 0 hsl(var(--primary)/0.7)",
                          "inset 3px 0 0 0 hsl(var(--primary)/0.4)",
                        ],
                        backgroundColor: [
                          "hsl(var(--card)/0)",
                          "hsl(var(--primary)/0.05)",
                          "hsl(var(--primary)/0.02)",
                        ],
                      }
                    : { boxShadow: "inset 0 0 0 0 hsl(var(--primary)/0)", backgroundColor: "hsl(var(--card)/0)" }
                }
                transition={{ duration: 2, ease: "easeOut" }}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <div
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                  style={{ backgroundColor: row.iconBg }}
                >
                  <Icon className="h-4 w-4" style={{ color: row.iconColor }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-foreground">
                    {row.title}
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {row.source}
                  </div>
                </div>
                <div className="hidden sm:block font-mono text-[13px] text-foreground/90">
                  {row.amount}
                </div>
                <StatusBadge status={row.status} />
              </motion.div>
            );
          })}
        </div>

        {/* Footer stats */}
        <div className="grid grid-cols-3 border-t border-border/70 bg-background/40">
          <div className="px-4 py-3 text-center border-r border-border/60">
            <div className="font-display text-[18px] font-extrabold text-foreground">98.4%</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Accuracy</div>
          </div>
          <div className="px-4 py-3 text-center border-r border-border/60">
            <div className="font-display text-[18px] font-extrabold text-foreground">12×</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Faster</div>
          </div>
          <div className="px-4 py-3 text-center">
            <div className="font-display text-[18px] font-extrabold text-primary tabular-nums">
              £{processed}k
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Processed</div>
          </div>
        </div>

        {/* Review CTA */}
        <div className="flex items-center justify-between border-t border-border/70 px-5 py-3 bg-card/60">
          <span className="text-[12px] text-muted-foreground">
            3 items need review
          </span>
          <button className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:text-primary/80 transition-colors">
            Review queue
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

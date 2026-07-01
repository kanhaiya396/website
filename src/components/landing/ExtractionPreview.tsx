import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, ReceiptPoundSterling, Landmark, FileMinus, ArrowRight, Zap, Check } from "lucide-react";

type Status = "posted" | "processing" | "queued";

type Row = {
  key: string;
  icon: typeof FileText;
  iconBg: string;
  iconColor: string;
  title: string;
  via: string;
  ageMin: number;
  amount: string;
  status: Status;
};

const INITIAL_ROWS: Row[] = [
  {
    key: "invoice",
    icon: FileText,
    iconBg: "rgba(59,130,246,0.14)",
    iconColor: "#60A5FA",
    title: "Apex Supplies — INV-2041",
    via: "Email",
    ageMin: 2,
    amount: "£1,488.00",
    status: "posted",
  },
  {
    key: "receipt",
    icon: ReceiptPoundSterling,
    iconBg: "rgba(16,185,129,0.14)",
    iconColor: "#10B981",
    title: "Brewline Coffee Co.",
    via: "WhatsApp",
    ageMin: 4,
    amount: "£10.60",
    status: "processing",
  },
  {
    key: "statement",
    icon: Landmark,
    iconBg: "rgba(168,85,247,0.14)",
    iconColor: "#A78BFA",
    title: "Barclays · Business ••4421",
    via: "Upload",
    ageMin: 6,
    amount: "£12,418.55",
    status: "queued",
  },
  {
    key: "credit",
    icon: FileMinus,
    iconBg: "rgba(244,114,182,0.14)",
    iconColor: "#F472B6",
    title: "Northwind Ltd — CN-0087",
    via: "Email",
    ageMin: 8,
    amount: "−£240.00",
    status: "queued",
  },
];

const SUPPLIER_POOL: Record<string, { title: string; via: string; amount: string }[]> = {
  invoice: [
    { title: "Halden & Co — INV-3120", via: "Email", amount: "£842.00" },
    { title: "Meridian Print — INV-7745", via: "Email", amount: "£1,204.50" },
    { title: "Westgate Logistics — INV-0921", via: "Email", amount: "£3,160.00" },
  ],
  receipt: [
    { title: "Pret A Manger — Receipt", via: "WhatsApp", amount: "£18.40" },
    { title: "Shell Forecourt — Fuel", via: "Mobile", amount: "£62.10" },
    { title: "Hilton — Room Charge", via: "Email", amount: "£184.00" },
  ],
  statement: [
    { title: "HSBC · Current ••8812", via: "Upload", amount: "£8,940.22" },
    { title: "Starling · Business ••1190", via: "Upload", amount: "£4,217.66" },
  ],
  credit: [
    { title: "Greenacre Ltd — CN-0142", via: "Email", amount: "−£96.50" },
    { title: "Apex Supplies — CN-0211", via: "Email", amount: "−£312.00" },
  ],
};

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

function ageLabel(min: number) {
  if (min <= 0) return "just now";
  if (min === 1) return "1 min ago";
  return `${min} min ago`;
}

export function ExtractionPreview() {
  const reduce = useReducedMotion();
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [activeKey, setActiveKey] = useState<string | null>(INITIAL_ROWS[1].key);
  const cursorRef = useRef(0);
  const rotationCounter = useRef<Record<string, number>>({});

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setRows((prev) => {
        const i = cursorRef.current % prev.length;
        cursorRef.current = (cursorRef.current + 1) % prev.length;
        const next = [...prev];
        const r = { ...next[i] };

        if (r.status === "queued") {
          r.status = "processing";
        } else if (r.status === "processing") {
          r.status = "posted";
          r.ageMin = 0;
        } else {
          const pool = SUPPLIER_POOL[r.key] ?? [];
          if (pool.length) {
            const n = (rotationCounter.current[r.key] ?? 0) % pool.length;
            rotationCounter.current[r.key] = n + 1;
            const swap = pool[n];
            r.title = swap.title;
            r.via = swap.via;
            r.amount = swap.amount;
          }
          r.status = "queued";
          r.ageMin = 0;
        }
        next[i] = r;
        setActiveKey(r.key);
        return next;
      });
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setRows((prev) => prev.map((r) => ({ ...r, ageMin: r.ageMin + 1 })));
    }, 15000);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[28px] opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(168 100% 45% / 0.22), transparent 70%)",
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-card-halo">
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
            {rows.length} documents
          </span>
        </div>

        <div className="divide-y divide-border/60">
          {rows.map((row) => {
            const Icon = row.icon;
            const isActive = row.key === activeKey;
            return (
              <motion.div
                key={row.key}
                animate={
                  reduce
                    ? {}
                    : isActive
                    ? { backgroundColor: "hsl(var(--primary)/0.04)" }
                    : { backgroundColor: "hsl(var(--card)/0)" }
                }
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <div
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                  style={{ backgroundColor: row.iconBg }}
                >
                  <Icon className="h-4 w-4" style={{ color: row.iconColor }} />
                </div>
                <div className="min-w-0 flex-1">
                  <motion.div
                    key={row.title}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="truncate text-[13px] font-semibold text-foreground"
                  >
                    {row.title}
                  </motion.div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    via {row.via} · {ageLabel(row.ageMin)}
                  </div>
                </div>
                <div className="hidden sm:block font-mono text-[13px] text-foreground/90">
                  {row.amount}
                </div>
                <motion.div
                  key={row.status}
                  initial={{ opacity: 0, x: 4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <StatusBadge status={row.status} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 border-t border-border/70 bg-background/40">
          <div className="px-4 py-3 text-center border-r border-border/60">
            <div className="font-display text-[18px] font-extrabold text-foreground">98.4%</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Accuracy</div>
          </div>
          <div className="px-4 py-3 text-center border-r border-border/60">
            <div className="font-display text-[18px] font-extrabold text-foreground">Exception</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">ONLY</div>
          </div>
          <div className="px-4 py-3 text-center">
            <div className="font-display text-[18px] font-extrabold text-primary">Ledger</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Ready</div>
          </div>
        </div>

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

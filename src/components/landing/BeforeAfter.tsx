import { motion } from "framer-motion";
import {
  ArrowRight,
  Inbox,
  FileText,
  Keyboard,
  Search,
  Pencil,
  CloudUpload,
  FileSpreadsheet,
  ShieldCheck,
  Users,
  Send,
  type LucideIcon,
} from "lucide-react";

type Task = { icon: LucideIcon; title: string; desc: string; time: string };

const BEFORE: Task[] = [
  { icon: Inbox, title: "Download docs", desc: "from email, WhatsApp, portals, drawers", time: "5–10 min" },
  { icon: FileText, title: "Review invoices", desc: "supplier, dates, line items, VAT", time: "10–20 min" },
  { icon: Keyboard, title: "Data entry", desc: "codes, references, descriptions, dates", time: "10–15 min" },
  { icon: Search, title: "VAT verification", desc: "HMRC and VIES lookups by hand", time: "5–10 min" },
  { icon: Pencil, title: "Final review", desc: "rework duplicates and missing fields", time: "5–10 min" },
];

const AFTER: Task[] = [
  { icon: CloudUpload, title: "Import documents", desc: "WhatsApp, email forward, or upload", time: "<1 min" },
  { icon: FileSpreadsheet, title: "Extraction", desc: "supplier, amounts, line items, codes", time: "Seconds" },
  { icon: ShieldCheck, title: "VAT validation", desc: "HMRC & VIES checks run in the background", time: "Automatic" },
  { icon: Users, title: "Review queue", desc: "approve the queue, edit anything flagged", time: "3–5 min" },
  { icon: Send, title: "Posting", desc: "one click, with audit trail attached", time: "Seconds" },
];

function Column({
  variant,
  label,
  tasks,
  totalLabel,
  totalValue,
}: {
  variant: "before" | "after";
  label: string;
  tasks: Task[];
  totalLabel: string;
  totalValue: string;
}) {
  const isAfter = variant === "after";
  return (
    <div
      className="rounded-2xl border p-4 sm:p-6 lg:p-7"
      style={{
        borderColor: isAfter ? "hsl(var(--primary) / 0.35)" : "rgba(255, 90, 90, 0.22)",
        background: isAfter
          ? "linear-gradient(180deg, hsl(var(--primary) / 0.05), transparent 60%)"
          : "linear-gradient(180deg, rgba(255,90,90,0.05), transparent 60%)",
      }}
    >
      <div className="mb-5 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${isAfter ? "animate-pulse" : ""}`}
          style={{ backgroundColor: isAfter ? "hsl(var(--primary))" : "#FF5A5A" }}
        />
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ color: isAfter ? "hsl(var(--primary))" : "#FF8585" }}
        >
          {label}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((t, i) => {
          const Icon = t.icon;
          return (
          <div key={i} className="flex flex-wrap items-start gap-3 rounded-xl border border-border/60 bg-card/40 p-3 sm:p-4">
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg bg-background/60">
              <Icon className="h-5 w-5" style={{ color: isAfter ? "hsl(var(--primary))" : "#FF8585" }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] sm:text-[15px] leading-[1.55] text-foreground">
                <strong className="font-semibold">{t.title}</strong>
                <span className="text-muted-foreground"> — {t.desc}</span>
              </div>
              <span
                className="mt-1 inline-block text-[12px] font-mono sm:hidden"
                style={{ color: isAfter ? "hsl(var(--primary))" : "#FF8585" }}
              >
                {t.time}
              </span>
            </div>
            <span
              className="hidden sm:inline shrink-0 text-[12px] font-mono"
              style={{ color: isAfter ? "hsl(var(--primary))" : "#FF8585" }}
            >
              {t.time}
            </span>
          </div>
          );
        })}
      </div>
      <div
        className="mt-5 flex items-center justify-between rounded-xl border px-4 py-3"
        style={{
          borderColor: isAfter ? "hsl(var(--primary) / 0.4)" : "rgba(255,90,90,0.3)",
          background: isAfter ? "hsl(var(--primary) / 0.08)" : "rgba(255,90,90,0.06)",
        }}
      >
        <span className="text-[12px] uppercase tracking-wider text-muted-foreground">{totalLabel}</span>
        <span
          className="font-display text-[22px] font-extrabold"
          style={{ color: isAfter ? "hsl(var(--primary))" : "#FF8585" }}
        >
          {totalValue}
        </span>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="section-seam section-pad">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <div className="eyebrow mb-4 justify-center">The Difference</div>
          <h2 className="font-display font-extrabold tracking-tight mb-4">
            This is what your <br className="hidden md:block" />
            <span className="text-serif text-primary">Mondays used to look like</span>
          </h2>
          <p className="text-muted-foreground text-[17px] md:text-[18px] leading-[1.6]">
            Same documents. Same clients. Different workflow.
          </p>
        </motion.div>

        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <Column
            variant="before"
            label="Without Outworx"
            tasks={BEFORE}
            totalLabel="Time per batch"
            totalValue="~35–50 min"
          />
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary/40 bg-card shadow-glow">
            <ArrowRight className="h-5 w-5 text-primary lg:rotate-0 rotate-90" />
          </div>
          <Column
            variant="after"
            label="With Outworx"
            tasks={AFTER}
            totalLabel="Time per batch"
            totalValue="~5–8 min"
          />
        </div>
      </div>
    </section>
  );
}

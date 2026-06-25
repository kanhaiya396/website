import { motion } from "framer-motion";
import {
  ScanLine,
  Sparkles,
  ShieldCheck,
  Eye,
  ArrowRightCircle,
} from "lucide-react";

const STAGES = [
  { icon: ScanLine, label: "Document Capture" },
  { icon: Sparkles, label: "Data Extraction" },
  { icon: ShieldCheck, label: "VAT Validation" },
  { icon: Eye, label: "Human Review" },
  { icon: ArrowRightCircle, label: "Posted to Ledger" },
];

const METRICS = [
  "2M+ Documents Processed",
  "98% Extraction Accuracy",
  "25+ VAT Scenarios Recognised",
  "100% Human Review Control",
];

export function ImpactStrip() {
  return (
    <section id="process" className="section-pad relative scroll-mt-24">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="eyebrow mb-4">Our Process</div>
          <h2 className="font-display font-extrabold tracking-tight">
            The work before the accounting,
            <br />
            <span className="text-primary">automated.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.7] text-muted-foreground">
            From document capture to ledger-ready transactions — without the manual busywork.
          </p>
        </motion.div>

        {/* Animated stage sequence */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute left-[8%] right-[8%] top-[42px] h-px overflow-hidden">
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--border)) 8%, hsl(var(--border)) 92%, transparent)",
              }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 h-px"
              style={{
                width: "30%",
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.55), transparent)",
              }}
              animate={{ x: ["-30%", "330%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-8 sm:gap-y-10 lg:gap-2">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative grid h-[64px] w-[64px] sm:h-[76px] sm:w-[76px] lg:h-[84px] lg:w-[84px] place-items-center rounded-full border border-border bg-card/60 backdrop-blur-sm">
                    <div className="absolute inset-1 rounded-full border border-primary/10" />
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary" strokeWidth={1.6} />
                  </div>
                  <div className="mt-3 sm:mt-4 lg:mt-5 text-[12px] sm:text-[13px] md:text-[15px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-foreground/85">
                    {stage.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Credibility row — secondary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] sm:text-[15px] md:text-[16px] text-muted-foreground"
        >
          {METRICS.map((m, i) => (
            <span key={m} className="inline-flex items-center gap-3 sm:gap-5">
              <span className="font-medium text-foreground/80">{m}</span>
              {i < METRICS.length - 1 && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

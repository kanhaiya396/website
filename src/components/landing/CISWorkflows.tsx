import { motion } from "framer-motion";
import { FileText, Calculator, Eye, Send, ArrowRight, Check } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const STEPS = [
  { icon: FileText, label: "Subcontractor Invoice" },
  { icon: Calculator, label: "CIS Processing" },
  { icon: Eye, label: "Review" },
  { icon: Send, label: "Ready To Post" },
];

const PILLS = [
  "CIS Ready Workflows",
  "Subcontractor Tracking",
  "Deduction Records",
  "HMRC Ready Reporting",
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function CISWorkflows() {
  return (
    <section id="cis" className="section-pad relative scroll-mt-24">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <SectionReveal className="mx-auto mb-12 max-w-2xl text-center">
          <div className="eyebrow mb-4">CIS Workflows</div>
          <h2 className="font-display font-extrabold tracking-tight">
            Built for <span className="text-serif text-primary">CIS accounting.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.7] text-muted-foreground">
            Support contractor and subcontractor workflows alongside bookkeeping —
            deductions tracked, records organised and information prepared for review.
          </p>
        </SectionReveal>

        {/* Flow */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="relative mx-auto max-w-5xl rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 sm:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col md:flex-row md:items-center md:flex-1 gap-4 md:gap-2">
                  <motion.div
                    variants={item}
                    className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 flex-1"
                  >
                    <div className="grid h-12 w-12 md:h-14 md:w-14 shrink-0 place-items-center rounded-xl border border-border bg-background/60">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" strokeWidth={1.7} />
                    </div>
                    <div className="text-[13px] md:text-[14px] font-semibold tracking-wide text-foreground/90">
                      {s.label}
                    </div>
                  </motion.div>
                  {i < STEPS.length - 1 && (
                    <motion.div
                      variants={item}
                      className="flex md:items-center justify-center md:px-1"
                    >
                      <ArrowRight className="h-4 w-4 text-primary/70 rotate-90 md:rotate-0" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Trust pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
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
      </div>
    </section>
  );
}

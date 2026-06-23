import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, FileText, ShieldCheck, Sparkles, Workflow, Plug } from "lucide-react";

const eyebrowLabels = ["Less Manual Entry", "Faster Reviews", "More Control"];

const cards = [
  {
    icon: FileText,
    accentIcon: Sparkles,
    title: "AI-Powered Extraction",
    description:
      "Capture key financial data from invoices, receipts, supplier statements and other business documents in seconds, reducing repetitive manual entry.",
    highlights: ["Supplier Details", "VAT Detection", "Line Items"],
  },
  {
    icon: ShieldCheck,
    title: "Human Review Controls",
    description:
      "Review, validate and approve extracted information before it moves into your accounting workflow, helping maintain accuracy and oversight.",
    highlights: ["Review", "Edit", "Publish"],
  },
  {
    icon: Workflow,
    title: "Built for Real Accounting Work",
    description:
      "Designed around practical bookkeeping and accounting processes, helping teams handle document-heavy workflows more efficiently.",
    highlights: ["Bookkeeping", "VAT Workflows", "Financial Records"],
  },
  {
    icon: Plug,
    title: "Works With Your Existing Tools",
    description:
      "Integrate with your accounting ecosystem while keeping your current processes and reducing manual document handling.",
    highlights: ["Xero", "QuickBooks", "Flexible Workflow"],
  },
] as const;

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">
      <Check className="h-3 w-3 text-primary" aria-hidden />
      {label}
    </span>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();

  const labelVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 8, filter: reduce ? "blur(0px)" : "blur(6px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: 0.05 + i * 0.12, duration: 0.45, ease: "easeOut" },
    }),
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16, filter: reduce ? "blur(0px)" : "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: 0.45, duration: 0.55, ease: "easeOut" },
    },
  };

  const subVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { delay: 0.95, duration: 0.4, ease: "easeOut" } },
  };

  const glowVariants: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.95 },
    show: { opacity: 0.35, scale: 1, transition: { delay: 0.4, duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="relative mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Ambient glow */}
          <motion.div
            aria-hidden
            variants={glowVariants}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl"
          />

          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Why Outworx
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            {eyebrowLabels.map((label, i) => (
              <motion.span
                key={label}
                custom={i}
                variants={labelVariants}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground"
              >
                <Check className="h-3 w-3 text-primary" aria-hidden />
                {label}
              </motion.span>
            ))}
          </div>

          <motion.h2
            variants={headingVariants}
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            The work before the accounting, automated.
          </motion.h2>

          <motion.p
            variants={subVariants}
            className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            Capture, review and prepare financial data before it reaches your ledger.
          </motion.p>
        </motion.div>

        {/* Card grid */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const Accent = "accentIcon" in card ? card.accentIcon : undefined;
            return (
              <motion.div
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.15),0_8px_30px_-12px_hsl(var(--primary)/0.35)] md:p-7"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="relative grid h-11 w-11 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-200 ease-out group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden />
                    {Accent ? (
                      <Accent
                        className="absolute -right-1 -top-1 h-3.5 w-3.5 text-primary"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <h3 className="text-lg font-semibold text-white md:text-xl">{card.title}</h3>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {card.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {card.highlights.map((h) => (
                    <Pill key={h} label={h} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

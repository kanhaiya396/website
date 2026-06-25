import { motion } from "framer-motion";
import { Check, Scale, Search, FileCheck, Shield } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { fadeSlideLeft, fadeSlideRight, viewportOnce } from "./_motion";

const vatFeatures = [
  {
    icon: Shield,
    title: "VAT Number Verification",
    description: "Validates VAT numbers against HMRC (UK) and VIES (EU) databases in real-time.",
  },
  {
    icon: Search,
    title: "Legislation Lookup",
    description: "Searches 100+ VAT notices to find the relevant guidance for each transaction.",
  },
  {
    icon: FileCheck,
    title: "Invoice Validation",
    description: "Checks all requirements for a valid VAT invoice before processing.",
  },
  {
    icon: Scale,
    title: "Rate Assignment",
    description: "Automatically assigns correct VAT rates (20%, 5%, 0%, exempt) on a line-item basis.",
  },
];

export function VATCompliance() {
  return (
    <section id="vat" className="section-seam section-pad">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <motion.div
            variants={fadeSlideLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <div className="eyebrow mb-4">VAT Compliance</div>
            <h2 className="font-display font-extrabold tracking-tight mb-5">
              VAT compliance{" "}
              <span className="text-serif text-primary">built-in</span>{" "}
              at the point of capture
            </h2>
            <p className="text-muted-foreground mb-10 text-[17px] leading-[1.7]">
              Outworx automatically validates VAT numbers, checks invoice
              requirements, and assigns the correct VAT treatment for every
              transaction. No more manual lookups or compliance guesswork.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {vatFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4"
                >
                  <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-glow">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[15px] mb-1.5 text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-[14px] leading-[1.65] text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            variants={fadeSlideRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card-halo">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-[15px]">Transaction Details</span>
                <span className="text-[12px] text-muted-foreground">Processing...</span>
              </div>

              {/* Mock invoice */}
              <div className="p-4 rounded-xl bg-secondary/50 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">The Ivy Restaurant</span>
                  <span className="font-semibold">£186.40</span>
                </div>
                <span className="text-[14px] text-muted-foreground">Client entertainment</span>
              </div>

              {/* Verification steps */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-[14px]">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span className="text-success">Checking invoice validity...</span>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2">
                <div className="text-[12px] uppercase tracking-wider text-muted-foreground mb-2">
                  Line Items
                </div>
                {[
                  { desc: "Food & Beverages", vat: "20%", amount: "£156.40" },
                  { desc: "Discretionary Service Charge", vat: "0%", amount: "£30.00" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 p-3 rounded-lg bg-secondary/30 text-[13px] sm:text-[14px]">
                    <span className="min-w-0 truncate">{item.desc}</span>
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      <span className="text-primary font-semibold">{item.vat}</span>
                      <span className="font-semibold">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* VAT verified badge */}
              <div className="flex items-center justify-center gap-2 mt-4 py-3 rounded-lg bg-success/10 border border-success/20">
                <Check className="h-4 w-4 text-success" />
                <span className="text-[14px] text-success font-semibold">VAT treatment verified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

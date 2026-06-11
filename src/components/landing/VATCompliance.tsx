import { motion } from "framer-motion";
import { Check, Scale, Search, FileCheck, Shield } from "lucide-react";

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
    <section id="vat" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-sm text-primary font-medium mb-4">
              VAT Compliance
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4">
              VAT compliance{" "}
              <span className="text-serif text-primary">built-in</span>{" "}
              at the point of capture
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Outworx automatically validates VAT numbers, checks invoice requirements, 
              and assigns the correct VAT treatment for every transaction. No more manual 
              lookups or compliance guesswork.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {vatFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Transaction Details</span>
                <span className="text-xs text-muted-foreground">Processing...</span>
              </div>

              {/* Mock invoice */}
              <div className="p-4 rounded-xl bg-secondary/50 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">The Ivy Restaurant</span>
                  <span className="font-semibold">£186.40</span>
                </div>
                <span className="text-sm text-muted-foreground">Client entertainment</span>
              </div>

              {/* Verification steps */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span className="text-success">Checking invoice validity...</span>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground mb-2">Line Items</div>
                {[
                  { desc: "Food & Beverages", vat: "20%", amount: "£156.40" },
                  { desc: "Discretionary Service Charge", vat: "0%", amount: "£30.00" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 text-sm">
                    <span>{item.desc}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-medium">{item.vat}</span>
                      <span className="font-semibold">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* VAT verified badge */}
              <div className="flex items-center justify-center gap-2 mt-4 py-3 rounded-lg bg-success/10 border border-success/20">
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm text-success font-medium">VAT treatment verified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
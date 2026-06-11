import { motion } from "framer-motion";
import { FileText, Check } from "lucide-react";

const integrations = [
  {
    name: "Xero",
    description: "Two-way sync with your Xero ledger",
    logo: "X",
    color: "#13B5EA",
  },
  {
    name: "QuickBooks",
    description: "Full QuickBooks Online integration",
    logo: "QB",
    color: "#2CA01C",
  },
];

const standaloneFeatures = [
  "Bank feeds",
  "AI reconciliation",
  "AI cash coding",
  "HMRC filing",
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm text-muted-foreground uppercase tracking-wider"
          >
            Integrations
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Connected app or standalone ledger,{" "}
            <span className="text-serif text-primary">you choose</span>
          </h2>
        </motion.div>

        {/* Integration Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Connected Apps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                {integrations.map((integration, index) => (
                  <div
                    key={index}
                    className="h-14 w-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${integration.color}20`, borderColor: `${integration.color}30`, borderWidth: 1 }}
                  >
                    <span style={{ color: integration.color }} className="font-bold text-lg">
                      {integration.logo}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                Outworx enhances every invoice and receipt with context from your connected ledger, enabling AI to accurately process transactions before posting.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-primary font-medium">Two-way sync</span>
                <span className="text-sm text-primary font-medium">Always learning</span>
              </div>
            </motion.div>

            {/* Standalone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
                  <FileText className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-semibold">Outworx</span>
                  <span className="text-primary font-semibold">One</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Our standalone MTD-ready ledger built for sole traders and landlords. Get the same powerful AI automation with additional features designed specifically for simplified tax compliance.
              </p>
              <div className="flex flex-wrap gap-3">
                {standaloneFeatures.map((feature, index) => (
                  <span key={index} className="text-sm text-primary font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
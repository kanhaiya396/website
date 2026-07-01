import { motion } from "framer-motion";
import { Check, Sparkles, ShieldCheck, ScrollText } from "lucide-react";

const CARDS = [
  {
    icon: Sparkles,
    title: "AI-Powered Extraction",
    desc: "Every field, every format — captured in seconds.",
    items: ["Supplier details & VAT numbers", "Line item breakdown", "Duplicate detection"],
  },
  {
    icon: ShieldCheck,
    title: "You Stay in Control",
    desc: "Nothing posts without your sign-off.",
    items: ["Review queue", "Inline editing", "Full audit trail"],
  },
  {
    icon: ScrollText,
    title: "UK VAT, Done Right",
    desc: "HMRC-validated, MTD-ready, built in.",
    items: ["UK/EU GDPR compliant", "MTD ready", "Xero & QB certified"],
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-seam section-pad scroll-mt-24">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 mx-auto max-w-2xl text-center"
        >
          <div className="eyebrow mb-4">Why Outworx</div>
          <h2 className="font-display font-extrabold tracking-tight">
            The work before the accounting, <br />
            <span className="text-serif text-primary">automated.</span>
          </h2>
          <p className="mt-5 text-[17px] md:text-[18px] leading-[1.6] text-muted-foreground mx-auto">
            Capture and prep before it ever hits the ledger.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow-teal"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 shadow-glow">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-3 text-[22px] font-display font-extrabold text-foreground">
                  {c.title}
                </h3>
                <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">
                  {c.desc}
                </p>
                <ul className="mt-auto space-y-3">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-[14px] text-foreground/90">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15">
                        <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

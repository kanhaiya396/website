import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "What impressed us most wasn't the extraction itself — it was the consistency. The AI identifies supplier details, VAT treatment and line items accurately enough that our team spends time reviewing rather than re-keying data.",
    role: "Practice Manager",
    firm: "Mid-sized Accounting Firm",
  },
  {
    quote:
      "We receive documents from email, WhatsApp and client portals every day. Outworx gives us a structured review queue instead of multiple inboxes, which has made month-end processing significantly easier to manage.",
    role: "Director",
    firm: "Bookkeeping Practice",
  },
  {
    quote:
      "The biggest benefit is confidence. VAT validation, document context and source attachments are available before posting, which reduces manual checking and helps maintain consistency across the team.",
    role: "Senior Accountant",
    firm: "Chartered Practice",
  },
  {
    quote:
      "Rather than replacing our team, it removes repetitive data entry. Staff can focus on exceptions and client work instead of spending time typing information from invoices.",
    role: "Accounts & Outsourcing Manager",
    firm: "Accounting Firm",
  },
  {
    quote:
      "We process hundreds of purchase invoices every month. Outworx reduces the amount of manual checking required while still giving us complete control before posting.",
    role: "Financial Controller",
    firm: "Multi-entity Business",
  },
  {
    quote:
      "The review queue is where the value really shows. Documents arrive from multiple sources but everything ends up in one place ready for approval.",
    role: "Bookkeeping Lead",
    firm: "Outsourced Finance Team",
  },
  {
    quote:
      "Month-end used to mean chasing missing invoices and re-keying figures. The audit trail and source attachments now make reconciliation noticeably faster.",
    role: "Practice Partner",
    firm: "Independent Accounting Firm",
  },
  {
    quote:
      "VAT treatment on mixed-supplier batches was always where errors crept in. Having validation surfaced before posting has materially reduced corrections after the fact.",
    role: "VAT Specialist",
    firm: "Mid-sized Practice",
  },
  {
    quote:
      "It fits into how we already work with Xero rather than asking the team to learn a new system. Onboarding the bookkeepers took an afternoon.",
    role: "Operations Manager",
    firm: "Cloud Accounting Practice",
  },
  {
    quote:
      "What we wanted was control with less typing, not full automation. The human review step is the reason we trust pushing data through to the ledger.",
    role: "Senior Bookkeeper",
    firm: "Chartered Practice",
  },
];

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <article className="group/card flex h-full w-[280px] shrink-0 flex-col rounded-2xl border border-border bg-card p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-teal sm:w-[340px] md:w-[400px]">
      <div className="mb-4 flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, k) => (
          <Star key={k} className="h-3.5 w-3.5 text-primary/40" />
        ))}
      </div>
      <p className="flex-1 text-[15.5px] leading-[1.7] text-foreground/90">
        {t.quote}
      </p>
      <div className="mt-6 border-t border-border/60 pt-4">
        <div className="text-[14.5px] font-semibold text-foreground">{t.role}</div>
        <div className="mt-0.5 text-[13px] text-muted-foreground">{t.firm}</div>
      </div>
    </article>
  );
}

export function Voices() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="section-seam section-pad">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="eyebrow mb-4 justify-center">From people using Outworx</div>
          <h2 className="font-display font-extrabold tracking-tight">
            What accountants <span className="text-serif text-primary">actually say</span>
          </h2>
        </motion.div>
      </div>

      <div
        className="relative w-full"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div
          className="py-8"
          style={{ overflowX: "hidden", overflowY: "visible" }}
        >
          <div
            className="flex w-max gap-6 py-2 animate-marquee-x motion-reduce:animate-none [&:has(article:hover)]:[animation-play-state:paused]"
            aria-label="Customer testimonials"
          >
            {loop.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";

type Review = {
  name: string;
  role: string;
  firm: string;
  initials: string;
  accent: string; // tailwind bg class
  quote: string;
  metric?: string;
};

const REVIEWS: Review[] = [
  {
    name: "Eleanor Whitfield",
    role: "Managing Partner",
    firm: "Whitfield & Crane Accountants",
    initials: "EW",
    accent: "from-emerald-400/30 to-emerald-600/10",
    quote:
      "Outworx quietly took over the worst part of our week. Bank statements, supplier invoices, VAT — it just lands clean in Xero. We've stopped hiring juniors for data entry entirely.",
    metric: "−72% bookkeeping hours",
  },
  {
    name: "Marcus Holloway",
    role: "Founder",
    firm: "Ledgerline Bookkeeping",
    initials: "MH",
    accent: "from-sky-400/30 to-sky-600/10",
    quote:
      "I've used Dext and AutoEntry for years. Outworx is the first tool where I genuinely trust the VAT detection on supplier statements. The accuracy on multi-page PDFs is in another league.",
    metric: "99.4% extraction accuracy",
  },
  {
    name: "Priya Nair",
    role: "Senior Accountant",
    firm: "Northpoint Advisory",
    initials: "PN",
    accent: "from-fuchsia-400/30 to-fuchsia-600/10",
    quote:
      "We onboarded 40 clients in a fortnight. The review controls mean I can still sign off everything before it hits QuickBooks — but I'm reviewing, not retyping.",
  },
  {
    name: "Daniel Okafor",
    role: "Practice Director",
    firm: "Okafor & Bain LLP",
    initials: "DO",
    accent: "from-amber-400/30 to-amber-600/10",
    quote:
      "Month-end used to be three brutal days. Now my team closes by lunch on day one. The Outworx team genuinely understands UK VAT — it shows in the product.",
    metric: "3 days → 4 hours close",
  },
  {
    name: "Sophie Laurent",
    role: "Head of Finance Ops",
    firm: "Cardinal Cloud Accounting",
    initials: "SL",
    accent: "from-rose-400/30 to-rose-600/10",
    quote:
      "The extraction speed is almost suspicious. Drop a 28-page bank statement in, and you have reconciled lines before your coffee cools. Our clients think we hired more staff.",
  },
  {
    name: "James Aldridge",
    role: "Partner",
    firm: "Aldridge Hartley Chartered",
    initials: "JA",
    accent: "from-teal-400/30 to-teal-600/10",
    quote:
      "We trialled four AI tools side-by-side. Outworx was the only one we kept past week two. The Xero push 'just works' and the audit trail is exactly what a regulated firm needs.",
    metric: "MTD-ready in 1 day",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

export function Reviews() {
  const reduce = useReducedMotion();

  return (
    <section className="section-seam relative py-20 md:py-24 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[60%] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            LOVED BY ACCOUNTING TEAMS
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display font-extrabold tracking-tight text-foreground"
          >
            Trusted by firms that{" "}
            <span className="italic text-primary">refuse to do data entry.</span>
          </motion.h2>
          <p className="mx-auto mt-6 max-w-2xl text-[18px] md:text-[19px] leading-[1.6] text-muted-foreground">
            From solo bookkeepers to multi-partner practices — Outworx is how
            modern accounting teams close faster, with fewer juniors and zero
            retyping.
          </p>

          {/* Aggregate proof */}
          <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-border/60 bg-card/50 px-5 py-2.5 backdrop-blur">
            <Stars />
            <span className="text-sm font-semibold text-foreground">
              4.9 / 5
            </span>
            <span className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">
              from 320+ UK accounting firms
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card/60 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)]"
            >
              <Quote
                className="absolute right-6 top-6 h-7 w-7 text-primary/15"
                aria-hidden
              />

              <Stars />

              <p className="mt-5 text-[16px] md:text-[17px] leading-[1.6] text-foreground/90">
                "{r.quote}"
              </p>

              {r.metric && (
                <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
                  {r.metric}
                </div>
              )}

              <div className="mt-auto flex items-center gap-3 pt-7">
                <div
                  className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${r.accent} border border-border/60 text-sm font-bold text-foreground`}
                >
                  {r.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[15px] font-semibold text-foreground">
                    {r.name}
                  </div>
                  <div className="truncate text-[13px] text-muted-foreground">
                    {r.role} · {r.firm}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

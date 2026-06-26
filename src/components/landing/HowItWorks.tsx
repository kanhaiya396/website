import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { staggerParent, staggerChild, viewportOnce } from "./_motion";
import { XeroLogo } from "@/components/brand-logos/XeroLogo";
import { QuickBooksLogo } from "@/components/brand-logos/QuickBooksLogo";
import { SageLogo } from "@/components/brand-logos/SageLogo";
import { NomiLogo } from "@/components/brand-logos/NomiLogo";

const CONNECTED_CHIPS = ["Two-way sync", "Always learning", "Real-time posting"];
const STANDALONE_CHIPS = ["Bank feeds", "AI reconciliation", "HMRC filing"];

const LOGOS = [XeroLogo, QuickBooksLogo, SageLogo, NomiLogo];

export function HowItWorks() {
  return (
    <section id="integrations" className="section-seam section-pad">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <SectionReveal className="mb-10 mx-auto max-w-2xl text-center">
          <div className="eyebrow mb-4">Integrations</div>
          <h2 className="font-display font-extrabold tracking-tight">
            Connected to your tools, <br />
            <span className="text-serif text-primary">or standalone</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.7] text-muted-foreground mx-auto">
            Post into the ledger your clients already use — or run your whole book
            on Outworx itself. Either way, the AI workflow is the same.
          </p>
        </SectionReveal>

        {/* Brand logo strip */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-8 grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-4"
        >
          {LOGOS.map((Logo, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-white px-3 py-4 sm:px-4 sm:py-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
            >
              <Logo className="max-h-16 sm:max-h-24 w-auto max-w-[85%]" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Card A — Xero, QuickBooks, Sage & Nomi */}
          <motion.div
            variants={staggerChild}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all hover:border-primary/40 hover:shadow-glow-teal"
          >
            <h3 className="mb-3 text-[24px] font-display font-extrabold text-foreground">
              Xero, QuickBooks, Sage &amp; Nomi
            </h3>
            <p className="mb-6 text-[16px] leading-[1.7] text-muted-foreground">
              Outworx connects directly with your existing ledger, learns your
              chart structure and posting history, then writes back fully coded
              transactions with source documents attached.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {["Two-way sync", "Real-time posting", "Learns your ledger"].map((c, i, arr) => (
                <span key={c} className="flex items-center gap-3 text-[14px] text-primary">
                  <span className="font-semibold">{c}</span>
                  {i < arr.length - 1 && <span className="text-muted-foreground/40">·</span>}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card B — OutworxOne */}
          <motion.div
            variants={staggerChild}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all hover:border-primary/40 hover:shadow-glow-teal"
          >
            <div className="mb-6">
              <div className="grid h-14 w-14 place-items-center rounded-xl border border-primary/30 bg-primary/10 shadow-glow">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-3 text-[24px] font-display font-extrabold text-foreground">
              Outworx<span className="text-primary">One</span>
            </h3>
            <p className="mb-6 text-[16px] leading-[1.7] text-muted-foreground">
              Our standalone MTD-ready ledger for sole traders and landlords. Same
              AI automation, built-in bank feeds, and direct HMRC filing in one
              place.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {STANDALONE_CHIPS.map((c, i) => (
                <span key={c} className="flex items-center gap-3 text-[14px] text-primary">
                  <span className="font-semibold">{c}</span>
                  {i < STANDALONE_CHIPS.length - 1 && <span className="text-muted-foreground/40">·</span>}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


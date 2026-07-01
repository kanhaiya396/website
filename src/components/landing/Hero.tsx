import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoTransitionLink } from "@/components/DemoTransitionLink";
import { ExtractionPreview } from "./ExtractionPreview";
import { authUrl } from "@/lib/appUrl";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const highlights = [
  "Human Review Included",
  "Supports Multiple Ledgers",
  "UK/EU GDPR Compliant",
];

const ROTATING_WORDS = ["on autopilot.", "automated.", "done for you.", "handled."];

function RotatingWord() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce]);
  return (
    <span className="relative inline-block align-baseline text-primary">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[idx]}
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="inline-block italic font-display font-extrabold"
        >
          {ROTATING_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-16 lg:pt-24 lg:pb-24">
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-orb-teal blur-[120px] animate-orb-drift" />
        <div className="absolute top-20 right-[-10%] h-[480px] w-[480px] rounded-full bg-orb-cyan blur-[120px] animate-orb-drift-slow" />
        <div className="hidden lg:block absolute left-1/2 top-1/2 h-[420px] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="max-w-[640px]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="eyebrow mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))] animate-pulse" />
              AI AUTOPILOT FOR ACCOUNTANTS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              className="font-display font-extrabold text-foreground break-words"
              style={{ fontSize: "clamp(34px, 7vw, 76px)", lineHeight: 1.05 }}
            >
              The work before<br />
              the accounting,<br />
              <RotatingWord />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 sm:mt-7 max-w-[560px] text-[16px] sm:text-[19px] md:text-[20px] leading-[1.6] text-muted-foreground"
            >
              Turn invoices, receipts and bank statements into structured, VAT-ready bookkeeping. Review only the exceptions while Outworx prepares everything else for posting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href={authUrl()} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-[52px] w-full sm:w-auto px-7 text-[16px] font-display font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-glow-teal hover:-translate-y-0.5 transition-all"
                >
                  Start now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
              <DemoTransitionLink to="/dashboard-demo" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-[52px] w-full sm:w-auto px-6 text-[16px] font-display font-semibold border-border bg-card/40 backdrop-blur hover:bg-card/70 rounded-xl"
                  asChild
                >
                  <span>Try it yourself</span>
                </Button>
              </DemoTransitionLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-2"
            >
              {highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-[14px] text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  {h}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Extraction Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="relative"
          >
            <ExtractionPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

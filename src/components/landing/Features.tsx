import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CaptureMock, CategoriseMock, ComplyMock, CloseMock } from "./FeatureMockUIs";

const STEPS = [
  {
    step: "01",
    eyebrow: "Capture",
    title: "Capture from any channel",
    desc: "Receipts via WhatsApp, invoices forwarded by email, statements dragged into the web app. Everything lands in one queue.",
    tags: ["WhatsApp", "Email forward", "Drag & drop"],
    Mock: CaptureMock,
  },
  {
    step: "02",
    eyebrow: "Categorise",
    title: "Line items, categorised in context",
    desc: "Outworx learns from your chart of accounts and posting history — no per-supplier rules to maintain.",
    tags: ["Historical learning", "Real-time adapt", "Context aware"],
    Mock: CategoriseMock,
  },
  {
    step: "03",
    eyebrow: "Comply",
    title: "VAT validated at point of capture",
    desc: "Numbers checked against HMRC and VIES, rates assigned line by line, legislation notices attached automatically.",
    tags: ["HMRC + VIES", "Per-line rates", "Audit trail"],
    Mock: ComplyMock,
  },
  {
    step: "04",
    eyebrow: "Review",
    title: "Spot-check, approve, post",
    desc: "A reviewer queue surfaces only what needs human eyes. One click pushes the batch to Xero, QuickBooks, Sage or Nomi with sources attached.",
    tags: ["Exception-first", "Inline editing", "One-click post"],
    Mock: CloseMock,
  },
];

const STEP_DURATION_MS = 7000;

export function Features() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (reduce) return;
    let start = performance.now();
    const tick = (now: number) => {
      const p = (now - start) / STEP_DURATION_MS;
      if (p >= 1) {
        start = now;
        setProgress(0);
        setActive((i) => (i + 1) % STEPS.length);
      } else {
        setProgress(p);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, reduce]);

  const current = STEPS[active];
  const Mock = current.Mock;

  return (
    <section id="how-it-works" className="section-seam section-pad">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-2xl"
        >
          <div className="eyebrow mb-4">How it works</div>
          <h2 className="font-display font-extrabold tracking-tight">
            From document to ledger,<br />
            <span className="text-serif text-primary">fully automated</span>
          </h2>
          <p className="mt-5 text-[17px] md:text-[18px] leading-[1.7] text-muted-foreground max-w-xl">
            Every step of your document workflow — captured, verified, categorised, and posted — without you lifting a finger until it's time to review.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Stepper */}
          <div className="space-y-2">
            {STEPS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setActive(i);
                    setProgress(0);
                  }}
                  className={`relative w-full text-left rounded-2xl border p-4 sm:p-5 lg:p-6 transition-all ${
                    isActive
                      ? "border-primary/40 bg-card shadow-glow-teal"
                      : "border-border bg-card/40 hover:border-border/80"
                  }`}
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className={`font-mono text-[12px] font-bold tracking-wider ${
                        isActive ? "text-primary" : "text-muted-foreground/60"
                      }`}
                    >
                      {s.step}
                    </span>
                    <span
                      className={`text-[11px] uppercase tracking-[0.18em] font-bold ${
                        isActive ? "text-primary" : "text-muted-foreground/70"
                      }`}
                    >
                      {s.eyebrow}
                    </span>
                  </div>
                  <h3
                    className={`text-[20px] lg:text-[22px] font-display font-extrabold leading-tight ${
                      isActive ? "text-foreground" : "text-foreground/60"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-[16px] leading-[1.75] text-muted-foreground">
                          {s.desc}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {s.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-border bg-background/60 px-3 py-1 text-[12px] font-semibold text-foreground/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-2xl">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Live panel */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card-halo">
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
                <span className="text-[13px] font-semibold text-foreground">
                  {current.title}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Live
                </span>
              </div>
              <div className="relative min-h-[280px] lg:min-h-[360px] p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.step}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Mock />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Stat = {
  target?: number;
  suffix?: string;
  decimal?: boolean;
  display?: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 2, suffix: "M+", label: "Documents Processed" },
  { target: 98, suffix: "%", label: "Extraction Accuracy" },
  { target: 25, suffix: "+", label: "VAT Scenarios Recognised" },
  { target: 3, suffix: "", label: "Capture Channels Unified" },
  { display: "100%", label: "Human Review Control" },
  { display: "Xero · QB · Sage · Nomi", label: "Direct Posting Supported" },
];

function CountUp({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(target * eased);
          if (p < 1) requestAnimationFrame(tick);
          else setVal(target);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, reduce]);

  const display = decimal ? val.toFixed(1) : Math.round(val).toString();
  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="section-seam py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-2xl bg-border/40 shadow-card-halo">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="group bg-card px-3 py-7 sm:px-5 sm:py-9 text-center transition-colors hover:bg-card/70"
            >
              <div className="font-display text-[22px] sm:text-[26px] lg:text-[34px] font-extrabold text-foreground leading-none mb-3 min-h-[36px] sm:min-h-[40px] flex items-center justify-center break-words">
                {s.display ? (
                  <span>{s.display}</span>
                ) : (
                  <CountUp target={s.target!} suffix={s.suffix ?? ""} decimal={s.decimal} />
                )}
              </div>
              <div className="mx-auto mb-3 h-px w-8 origin-center scale-x-0 bg-primary/40 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-foreground/85 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

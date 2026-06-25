import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  Receipt,
  Percent,
  BookOpen,
  Landmark,
  Sparkles,
} from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { XeroLogo } from "@/components/brand-logos/XeroLogo";
import { QuickBooksLogo } from "@/components/brand-logos/QuickBooksLogo";
import { SageLogo } from "@/components/brand-logos/SageLogo";
import { NomiLogo } from "@/components/brand-logos/NomiLogo";

/**
 * Outworx Ecosystem — emotional centerpiece.
 * Glowing core, satellites floating on long randomized paths.
 */

type Satellite = {
  id: string;
  label: string;
  x: number;
  y: number;
  depth: 1 | 2 | 3;
  kind: "icon" | "logo";
  Icon?: typeof FileText;
  Logo?: typeof XeroLogo;
};

const SATELLITES: Satellite[] = [
  // Tighter Y band (18%–82%) to reduce vertical gaps
  { id: "invoice", label: "Invoice", x: 22, y: 26, depth: 1, kind: "icon", Icon: FileText },
  { id: "receipt", label: "Receipt", x: 78, y: 30, depth: 1, kind: "icon", Icon: Receipt },
  { id: "ledger", label: "Ledger", x: 28, y: 74, depth: 1, kind: "icon", Icon: BookOpen },
  { id: "xero", label: "Xero", x: 72, y: 72, depth: 1, kind: "logo", Logo: XeroLogo },

  { id: "vat", label: "VAT", x: 12, y: 50, depth: 2, kind: "icon", Icon: Percent },
  { id: "bank", label: "Bank statement", x: 88, y: 52, depth: 2, kind: "icon", Icon: Landmark },
  { id: "qb", label: "QuickBooks", x: 46, y: 18, depth: 2, kind: "logo", Logo: QuickBooksLogo },
  { id: "sage", label: "Sage", x: 54, y: 82, depth: 2, kind: "logo", Logo: SageLogo },

  { id: "nomi", label: "Nomi", x: 26, y: 38, depth: 3, kind: "logo", Logo: NomiLogo },
];

// Deterministic pseudo-random from a string seed
function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}

// Build a smooth multi-point drift path (returns arrays for x/y in px offsets)
function buildDriftPath(seed: string, amp: number) {
  const rand = seededRandom(seed);
  const points = 9;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i < points; i++) {
    // First and last keyframes match for seamless loop
    if (i === points - 1) {
      xs.push(xs[0]);
      ys.push(ys[0]);
    } else {
      xs.push((rand() * 2 - 1) * amp);
      ys.push((rand() * 2 - 1) * amp);
    }
  }
  return { xs, ys };
}

function Satellite({
  sat,
  highlighted,
  reduce,
}: {
  sat: Satellite;
  highlighted: boolean;
  reduce: boolean;
}) {
  const depthOpacity = sat.depth === 1 ? 1 : sat.depth === 2 ? 0.88 : 0.62;
  const depthBlur = sat.depth === 3 ? "blur-[0.6px]" : "";

  // Randomized motion params per satellite — independent x/y for erratic feel
  const rand = seededRandom(sat.id + "params");
  const ampX = 18 + rand() * 22; // 18–40px
  const ampY = 16 + rand() * 20; // 16–36px
  const durationX = 9 + rand() * 7; // 9–16s
  const durationY = 7 + rand() * 6; // 7–13s (different from X => non-repeating Lissajous)
  const delayX = rand() * -durationX;
  const delayY = rand() * -durationY;
  const { xs } = useMemo(() => buildDriftPath(sat.id + "x", ampX), [sat.id, ampX]);
  const { ys } = useMemo(() => buildDriftPath(sat.id + "y", ampY), [sat.id, ampY]);

  // Subtle rotation + scale jitter for organic erratic motion
  const jitterRand = seededRandom(sat.id + "jitter");
  const rotA = (jitterRand() * 2 - 1) * 3; // ±3deg
  const rotB = (jitterRand() * 2 - 1) * 3;
  const rotC = (jitterRand() * 2 - 1) * 3;
  const scaleA = 0.97 + jitterRand() * 0.06;
  const scaleB = 0.97 + jitterRand() * 0.06;
  const rotateDuration = 11 + jitterRand() * 9;
  const scaleDuration = 6 + jitterRand() * 5;


  // Randomized breathing fade/highlight per satellite
  const fadeRand = seededRandom(sat.id + "fade");
  const fadeDuration = 4.5 + fadeRand() * 4; // 4.5–8.5s
  const fadeDelay = fadeRand() * -fadeDuration;
  const lowOpacity = Math.max(0.35, depthOpacity - 0.35 - fadeRand() * 0.1);
  const highOpacity = Math.min(1, depthOpacity + 0.05);
  const midOpacity = (lowOpacity + highOpacity) / 2;

  const baseClasses =
    "inline-flex items-center gap-2.5 rounded-full border bg-card/70 backdrop-blur-md px-4 py-2.5 transition-all duration-700 will-change-transform";

  const highlightedClasses = highlighted
    ? "border-primary/60 shadow-glow-teal bg-card/90"
    : "border-border/70";

  const content =
    sat.kind === "icon" && sat.Icon ? (
      <div className={`${baseClasses} ${highlightedClasses} ${depthBlur}`}>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
          <sat.Icon className="h-4 w-4" />
        </span>
        <span className="text-sm font-semibold text-foreground/90">{sat.label}</span>
      </div>
    ) : sat.Logo ? (
      <div
        className={`flex items-center justify-center rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_2px_4px_rgba(0,0,0,0.08),0_12px_28px_-12px_rgba(0,0,0,0.35)] transition-all duration-700 ${
          sat.id === "qb" ? "h-[72px] w-[72px] p-2" : "h-16 w-16 p-2.5"
        } ${depthBlur} ${highlighted ? "ring-primary/50 shadow-glow-teal" : ""}`}
      >
        <sat.Logo className="max-h-full max-w-full w-auto h-auto" />
      </div>
    ) : null;

  const inner = content;

  if (reduce) {
    return (
      <div
        className="absolute"
        style={{
          left: `${sat.x}%`,
          top: `${sat.y}%`,
          transform: "translate(-50%, -50%)",
          opacity: depthOpacity,
        }}
      >
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${sat.x}%`,
        top: `${sat.y}%`,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        x: xs,
        y: ys,
        rotate: [0, rotA, rotB, rotC, 0],
        scale: [1, scaleA, scaleB, 1],
        opacity: [lowOpacity, highOpacity, midOpacity, lowOpacity, highOpacity, lowOpacity],
        filter: [
          "drop-shadow(0 0 0px hsl(172 60% 50% / 0))",
          "drop-shadow(0 0 14px hsl(172 60% 50% / 0.55))",
          "drop-shadow(0 0 4px hsl(172 60% 50% / 0.15))",
          "drop-shadow(0 0 10px hsl(172 60% 50% / 0.35))",
          "drop-shadow(0 0 16px hsl(172 60% 50% / 0.5))",
          "drop-shadow(0 0 0px hsl(172 60% 50% / 0))",
        ],
      }}
      transition={{
        x: { duration: durationX, repeat: Infinity, ease: "easeInOut", delay: delayX, times: xs.map((_, i) => i / (xs.length - 1)) },
        y: { duration: durationY, repeat: Infinity, ease: "easeInOut", delay: delayY, times: ys.map((_, i) => i / (ys.length - 1)) },
        rotate: { duration: rotateDuration, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
        scale: { duration: scaleDuration, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
        opacity: { duration: fadeDuration, repeat: Infinity, ease: "easeInOut", delay: fadeDelay },
        filter: { duration: fadeDuration, repeat: Infinity, ease: "easeInOut", delay: fadeDelay },
      }}

    >
      {inner}
    </motion.div>
  );
}


function Core({ reduce }: { reduce: boolean }) {
  const breathe = reduce
    ? {}
    : {
        animate: { scale: [1, 1.025, 1], opacity: [0.95, 1, 0.95] },
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <div
      className="absolute"
      style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsl(168 100% 45% / 0.18), transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <motion.div
        {...breathe}
        className="relative grid h-[220px] w-[220px] place-items-center rounded-full border border-primary/25 bg-card/40 backdrop-blur-xl shadow-glow-teal"
      >
        <div className="absolute inset-3 rounded-full border border-primary/15" />
        <div className="absolute inset-6 rounded-full border border-primary/10" />
        <div className="relative flex flex-col items-center gap-2">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary shadow-glow">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-primary/90">
            Outworx
          </div>
          <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Intelligent core
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function DocumentFlow() {
  const reduce = useReducedMotion() ?? false;
  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    if (reduce) return;
    const ids = SATELLITES.map((s) => s.id);
    let i = 0;
    const tick = () => {
      i = (i + 1 + Math.floor(Math.random() * 2)) % ids.length;
      setHighlightId(ids[i]);
      setTimeout(() => setHighlightId(null), 1400);
    };
    const interval = setInterval(tick, 2600);
    tick();
    return () => clearInterval(interval);
  }, [reduce]);

  const mobileItems = useMemo(() => SATELLITES.slice(0, 8), []);

  return (
    <section className="relative overflow-hidden py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-[1280px] relative">
        <SectionReveal className="mb-8 max-w-2xl">
          <div className="eyebrow mb-4">The Outworx ecosystem</div>
          <h2 className="font-display font-extrabold tracking-tight">
            Every document. Every ledger.{" "}
            <span className="text-serif text-primary">One intelligent core.</span>
          </h2>
          <p className="mt-5 text-[18px] leading-[1.7] text-muted-foreground max-w-2xl">
            Invoices, receipts, statements and the tools your practice already
            relies on — held together by a single calm system you can trust.
          </p>
        </SectionReveal>

        {/* Desktop stage */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto h-[460px] w-full">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, hsl(214 60% 12% / 0.35), transparent 70%)",
              }}
            />
            <Core reduce={reduce} />
            {SATELLITES.map((sat) => (
              <Satellite
                key={sat.id}
                sat={sat}
                highlighted={highlightId === sat.id}
                reduce={reduce}
              />
            ))}
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="lg:hidden">
          <div className="relative mx-auto mb-8 grid place-items-center">
            <div className="relative h-[200px] w-[200px] sm:h-[260px] sm:w-[260px]">
              <Core reduce={true} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3">
            {mobileItems.map((sat) => (
              <div
                key={sat.id}
                className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-2.5 py-2.5 sm:px-3.5 sm:py-3"
              >
                {sat.kind === "icon" && sat.Icon ? (
                  <>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                      <sat.Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-foreground/90">
                      {sat.label}
                    </span>
                  </>
                ) : sat.Logo ? (
                  <div className={`flex h-10 w-full items-center justify-center rounded-lg bg-white ring-1 ring-black/5 ${sat.id === "qb" ? "p-1" : "p-1.5"}`}>
                    <sat.Logo className="max-h-full max-w-full w-auto h-auto" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

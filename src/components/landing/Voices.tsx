import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const GAP = 24; // px, matches gap-6
const SPEED = 40; // px per second

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

interface CardProps {
  t: (typeof TESTIMONIALS)[number];
  cardRef?: React.Ref<HTMLElement>;
}

function TestimonialCard({ t, cardRef }: CardProps) {
  return (
    <article
      ref={cardRef}
      className="group/card flex h-full w-[280px] shrink-0 flex-col rounded-2xl border border-border bg-card p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-teal sm:w-[340px] md:w-[400px]"
    >
      <div className="mb-4 flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, k) => (
          <Star key={k} className="h-3.5 w-3.5 text-primary/40" />
        ))}
      </div>
      <p className="flex-1 text-[15.5px] leading-[1.7] text-foreground/90">
        {t.quote}
      </p>
      <div className="mt-6 border-t border-border/60 pt-4">
        <div className="text-[14.5px] font-semibold text-foreground">
          {t.role}
        </div>
        <div className="mt-0.5 text-[13px] text-muted-foreground">{t.firm}</div>
      </div>
    </article>
  );
}

export function Voices() {
  const reduce = useReducedMotion();
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [edge, setEdge] = useState<"left" | "right" | null>(null);
  const [setWidth, setSetWidth] = useState(0);

  const cardRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const manualAnim = useRef<ReturnType<typeof animate> | null>(null);

  // Measure the width of one set (half of the duplicated track)
  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const total = trackRef.current.scrollWidth;
      setSetWidth(total / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Pause when off-screen
  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Continuous drift
  useAnimationFrame((_, delta) => {
    if (reduce || paused || !visible || manualAnim.current || setWidth === 0) return;
    let next = x.get() - (SPEED * delta) / 1000;
    // Wrap: track is duplicated, so [-setWidth, 0] is the safe range
    if (next <= -setWidth) next += setWidth;
    if (next > 0) next -= setWidth;
    x.set(next);
  });

  const clearResume = () => {
    if (resumeTimer.current) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const armResume = (ms = 2500) => {
    clearResume();
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimer.current = null;
    }, ms);
  };

  const go = (dir: 1 | -1) => {
    if (setWidth === 0 || !cardRef.current) return;
    // Cancel any in-flight manual animation
    manualAnim.current?.stop();
    setPaused(true);
    clearResume();

    const step = cardRef.current.getBoundingClientRect().width + GAP;
    // Normalise x into (-setWidth, 0] so the wrap stays clean.
    let current = x.get();
    while (current <= -setWidth) current += setWidth;
    while (current > 0) current -= setWidth;
    x.set(current);

    const target = current - dir * step;
    manualAnim.current = animate(x, target, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        manualAnim.current = null;
        armResume();
      },
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (ratio < 0.15) setEdge("left");
    else if (ratio > 0.85) setEdge("right");
    else setEdge(null);
  };

  const handleMouseLeave = () => {
    setEdge(null);
    if (!manualAnim.current) armResume();
  };

  const btnEnter = () => {
    setPaused(true);
    clearResume();
  };
  const btnLeave = () => {
    if (!manualAnim.current) armResume();
  };

  return (
    <section
      ref={sectionRef}
      className="section-seam section-pad"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="eyebrow mb-4 justify-center">
            From people using Outworx
          </div>
          <h2 className="font-display font-extrabold tracking-tight">
            What accountants{" "}
            <span className="text-serif text-primary">actually say</span>
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
        <div className="py-8" style={{ overflowX: "hidden", overflowY: "visible" }}>
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-6 py-2"
            aria-label="Customer testimonials"
          >
            {loop.map((t, i) => (
              <TestimonialCard
                key={i}
                t={t}
                cardRef={i === 0 ? cardRef : undefined}
              />
            ))}
          </motion.div>
        </div>

        {/* Arrow controls — fade in on edge hover */}
        <button
          type="button"
          aria-label="Previous testimonials"
          onClick={() => go(-1)}
          onMouseEnter={btnEnter}
          onMouseLeave={btnLeave}
          onFocus={btnEnter}
          onBlur={btnLeave}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur text-primary shadow-card-halo transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            edge === "left" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next testimonials"
          onClick={() => go(1)}
          onMouseEnter={btnEnter}
          onMouseLeave={btnLeave}
          onFocus={btnEnter}
          onBlur={btnLeave}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur text-primary shadow-card-halo transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            edge === "right" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Brain,
  Scale,
  Calendar,
  FileText,
  Image,
  Mail,
  MessageCircle,
  CheckCircle,
  Loader2,
  Shield,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Receipt,
} from "lucide-react";

// ─── Capture Mock ──────────────────────────────────────────────

const captureDocuments = [
  { name: "Invoice_0421.pdf", source: "Email", type: "invoice", amount: "£2,450.00", status: "processing" },
  { name: "Receipt_Costa.jpg", source: "WhatsApp", type: "receipt", amount: "£4.85", status: "done" },
  { name: "Statement_Mar.pdf", source: "Upload", type: "bank_statement", amount: "—", status: "done" },
  { name: "Credit_Note_12.pdf", source: "Email", type: "credit_note", amount: "£320.00", status: "queued" },
  { name: "Inv_Supplier_88.pdf", source: "Upload", type: "invoice", amount: "£1,180.50", status: "queued" },
];

const sourceIcon = (source: string) => {
  if (source === "Email") return Mail;
  if (source === "WhatsApp") return MessageCircle;
  return Upload;
};

export function CaptureMock() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [statuses, setStatuses] = useState<string[]>(captureDocuments.map((d) => d.status));

  useEffect(() => {
    // Stagger reveal documents
    const timers: ReturnType<typeof setTimeout>[] = [];
    captureDocuments.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), 600 + i * 700));
    });

    // Animate processing -> done
    timers.push(
      setTimeout(() => setStatuses((s) => s.map((st, i) => (i === 0 ? "done" : st))), 2800),
      setTimeout(() => setStatuses((s) => s.map((st, i) => (i === 3 ? "processing" : st))), 3400),
      setTimeout(() => setStatuses((s) => s.map((st, i) => (i === 3 ? "done" : st))), 5000),
      setTimeout(() => setStatuses((s) => s.map((st, i) => (i === 4 ? "processing" : st))), 5400),
      setTimeout(() => setStatuses((s) => s.map((st, i) => (i === 4 ? "done" : st))), 6800)
    );

    // Loop the whole animation
    const loopTimer = setTimeout(() => {
      setVisibleCount(0);
      setStatuses(captureDocuments.map((d) => d.status));
    }, 8500);
    timers.push(loopTimer);

    return () => timers.forEach(clearTimeout);
  }, [visibleCount === 0 ? 0 : 1]);

  return (
    <div className="space-y-2.5">
      <AnimatePresence mode="popLayout">
        {captureDocuments.slice(0, visibleCount).map((doc, i) => {
          const SrcIcon = sourceIcon(doc.source);
          const status = statuses[i];
          return (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/60 border border-border/50"
            >
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <SrcIcon className="h-3 w-3" />
                  <span>{doc.source}</span>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{doc.amount}</span>
              <div className="w-16 flex justify-end">
                {status === "queued" && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Queued</span>
                )}
                {status === "processing" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Loader2 className="h-4 w-4 text-primary" />
                  </motion.div>
                )}
                {status === "done" && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {visibleCount === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Upload className="h-6 w-6 mb-2 opacity-40" />
          <span className="text-xs">Waiting for documents...</span>
        </div>
      )}
    </div>
  );
}

// ─── Categorise Mock ──────────────────────────────────────────────

const categories = [
  { item: "Office Supplies", code: "7200", confidence: 98 },
  { item: "Software License", code: "7600", confidence: 95 },
  { item: "Travel - Rail", code: "7400", confidence: 92 },
  { item: "Cleaning Services", code: "7800", confidence: 88 },
];

export function CategoriseMock() {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    categories.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveIndex(i), 800 + i * 1200));
    });
    timers.push(setTimeout(() => setActiveIndex(-1), 800 + categories.length * 1200 + 1500));
    return () => timers.forEach(clearTimeout);
  }, [activeIndex === -1 ? 0 : 1]);

  return (
    <div className="space-y-2.5">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.item}
          initial={{ opacity: 0.4 }}
          animate={{
            opacity: i <= activeIndex ? 1 : 0.4,
            scale: i === activeIndex ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/60 border border-border/50"
        >
          <div className="h-8 w-8 rounded-md bg-accent/20 flex items-center justify-center shrink-0">
            <Receipt className="h-4 w-4 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{cat.item}</p>
            <p className="text-xs text-muted-foreground">Account {cat.code}</p>
          </div>
          {i <= activeIndex ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5"
            >
              <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.confidence}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span className="text-[10px] font-semibold text-primary">{cat.confidence}%</span>
            </motion.div>
          ) : (
            <div className="w-20" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Comply Mock ──────────────────────────────────────────────

const vatChecks = [
  { label: "VAT Number verified", detail: "GB 123456789 → HMRC ✓", icon: Shield },
  { label: "Rate assigned", detail: "Standard 20% on 3 items", icon: Scale },
  { label: "Reverse charge flagged", detail: "EU supplier detected", icon: Sparkles },
];

export function ComplyMock() {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const timers = vatChecks.map((_, i) =>
      setTimeout(() => setStep(i), 900 + i * 1400)
    );
    timers.push(setTimeout(() => setStep(-1), 900 + vatChecks.length * 1400 + 2000));
    return () => timers.forEach(clearTimeout);
  }, [step === -1 ? 0 : 1]);

  return (
    <div className="space-y-3">
      {/* Animated invoice preview */}
      <div className="p-3 rounded-lg bg-secondary/40 border border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Invoice #INV-2026-041</span>
        </div>
        <div className="space-y-1.5 pl-6">
          {["Web Hosting — £120.00", "Domain Renewal — £15.00", "SSL Certificate — £0.00"].map((line, i) => (
            <div key={i} className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{line}</span>
              {step >= 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium"
                >
                  {i === 2 ? "Exempt" : "20%"}
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Verification steps */}
      {vatChecks.map((check, i) => (
        <motion.div
          key={check.label}
          initial={{ opacity: 0.3, y: 5 }}
          animate={{
            opacity: i <= step ? 1 : 0.3,
            y: 0,
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 p-2.5 rounded-lg"
        >
          <div className={`h-7 w-7 rounded-full flex items-center justify-center transition-colors ${
            i <= step ? "bg-emerald-500/15" : "bg-muted"
          }`}>
            {i <= step ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
              </motion.div>
            ) : (
              <check.icon className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">{check.label}</p>
            <p className="text-xs text-muted-foreground">{check.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Close Mock ──────────────────────────────────────────────

const closeSteps = [
  { label: "Prepayment detected", amount: "£3,600 → 12 months", progress: 25 },
  { label: "Accrual posted", amount: "Rent Q1 → £4,500", progress: 50 },
  { label: "Journal entry created", amount: "Dr 4000 / Cr 2100", progress: 75 },
  { label: "Balance sheet reconciled", amount: "All accounts matched", progress: 100 },
];

export function CloseMock() {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const timers = closeSteps.map((_, i) =>
      setTimeout(() => setStep(i), 700 + i * 1200)
    );
    timers.push(setTimeout(() => setStep(-1), 700 + closeSteps.length * 1200 + 2000));
    return () => timers.forEach(clearTimeout);
  }, [step === -1 ? 0 : 1]);

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="p-3 rounded-lg bg-secondary/40 border border-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Period-end close</span>
          <span className="text-xs font-bold text-primary">
            {step >= 0 ? closeSteps[Math.min(step, closeSteps.length - 1)].progress : 0}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
            animate={{ width: `${step >= 0 ? closeSteps[Math.min(step, closeSteps.length - 1)].progress : 0}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
      {/* Steps */}
      {closeSteps.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: i <= step ? 1 : 0.3,
            x: i === step ? 4 : 0,
          }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 p-2.5 rounded-lg"
        >
          <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            i <= step ? "bg-primary/15" : "bg-muted"
          }`}>
            {i < step ? (
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
            ) : i === step ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}>
                <Loader2 className="h-3.5 w-3.5 text-primary" />
              </motion.div>
            ) : (
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.amount}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

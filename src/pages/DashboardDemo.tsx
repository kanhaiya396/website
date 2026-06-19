import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Receipt,
  Landmark,
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Search,
  Bell,
  Settings,
  Building2,
  CreditCard,
  ArrowUpRight,
  Cloud,
  Zap,
  FileCheck2,
  Loader2,
  Info,
  RefreshCw,
  Inbox,
  Archive,
  Clock,
  Calendar,
  ArrowDownUp,
  Menu,
  X,
  Minus,
  Maximize2,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/* -------------------- Steps -------------------- */

type Step = {
  id: number;
  title: string;
  caption: string;
  what: string;
  why: string;
  task: string;
};

const STEPS: Step[] = [
  {
    id: 1, title: "Welcome", caption: "Start the tour",
    what: "A guided, click-through tour of the Outworx workspace.",
    why: "You'll see how a real document moves from inbox to ledger in under a minute.",
    task: "Click \"Start the tour\" to begin.",
  },
  {
    id: 2, title: "Dashboard overview", caption: "Your command centre",
    what: "Today's document volume, AI accuracy and what's waiting on you.",
    why: "Catch problems before they reach the books and know where to start the day.",
    task: "Hover a couple of KPI tiles or activity rows to explore the dashboard.",
  },
  {
    id: 3, title: "Pick a client", caption: "Multi-client workspace",
    what: "Each client keeps its own books, documents and ledger connection.",
    why: "Switch books in a click — no chance of mixing data between clients.",
    task: "Open the client selector and try switching between a couple of clients.",
  },
  {
    id: 4, title: "Document categories", caption: "Costs, Sales, Bank & more",
    what: "Every category — Costs, Sales, Bank, Receipts, Payroll — uses its own extractor.",
    why: "Tailored extractors mean cleaner data and fewer corrections.",
    task: "Hover a couple of categories in the sidebar to see what they handle.",
  },
  {
    id: 5, title: "Upload a document", caption: "Drop a PDF or image",
    what: "This is where financial documents enter the system.",
    why: "Every workflow starts with a real document — a PDF, scan, or photo.",
    task: "Click \"Generate sample invoice\" — we'll process it for you.",
  },
  {
    id: 6, title: "AI extraction & coding", caption: "Fields, line items and VAT in one view",
    what: "The AI reads supplier, dates, VAT, line items and totals from the source.",
    why: "Structured, coded data is what makes the document postable to your ledger.",
    task: "Review the extracted data, then hit \"Publish to ledger\" up top.",
  },
  {
    id: 7, title: "Publish to ledger", caption: "One click to Xero",
    what: "Approved documents post straight to Xero, QuickBooks or Sage.",
    why: "No re-typing means no human error and a clean audit trail every time.",
    task: "Hit \"Publish\" to send the bill to your accounting tool.",
  },
];

/* -------------------- Clients -------------------- */

type ClientRecent = { who: string; type: string; amt: string; status: "Auto-posted" | "Reconciled" | "Needs review" };
type Client = {
  code: string;
  name: string;
  sub: string;
  kpis: { docs: string; auto: string; turn: string; pend: string };
  recent: ClientRecent[];
  categories: { l: string; v: number; c: string }[];
  bars: number[];
};

const CLIENTS: Client[] = [
  {
    code: "AC", name: "Acme Holdings", sub: "12 sub-entities",
    kpis: { docs: "128", auto: "94%", turn: "47s", pend: "7" },
    recent: [
      { who: "British Gas", type: "Invoice", amt: "£284.30", status: "Auto-posted" },
      { who: "Amazon Business", type: "Receipt", amt: "£42.99", status: "Auto-posted" },
      { who: "HSBC", type: "Bank statement", amt: "32 lines", status: "Reconciled" },
      { who: "Stripe", type: "Credit note", amt: "-£120.00", status: "Needs review" },
    ],
    categories: [
      { l: "Costs", v: 62, c: "bg-emerald-500" },
      { l: "Sales", v: 31, c: "bg-teal-500" },
      { l: "Bank", v: 18, c: "bg-sky-500" },
      { l: "Receipts", v: 12, c: "bg-amber-500" },
      { l: "Credit notes", v: 5, c: "bg-rose-500" },
    ],
    bars: [40, 55, 48, 70, 62, 80, 75, 90, 72, 85, 95, 88, 96, 110],
  },
  {
    code: "MW", name: "Mercer & Wright LLP", sub: "Legal services",
    kpis: { docs: "73", auto: "91%", turn: "52s", pend: "3" },
    recent: [
      { who: "WeWork", type: "Invoice", amt: "£3,200.00", status: "Auto-posted" },
      { who: "LexisNexis", type: "Invoice", amt: "£820.50", status: "Auto-posted" },
      { who: "Barclays", type: "Bank statement", amt: "21 lines", status: "Reconciled" },
      { who: "Counsel fees", type: "Invoice", amt: "£1,450.00", status: "Needs review" },
    ],
    categories: [
      { l: "Costs", v: 48, c: "bg-emerald-500" },
      { l: "Sales", v: 22, c: "bg-teal-500" },
      { l: "Bank", v: 14, c: "bg-sky-500" },
      { l: "Receipts", v: 7, c: "bg-amber-500" },
      { l: "Credit notes", v: 2, c: "bg-rose-500" },
    ],
    bars: [42, 38, 45, 40, 50, 44, 48, 52, 46, 49, 55, 50, 53, 58],
  },
  {
    code: "HC", name: "Halcyon Cleaning", sub: "Field services",
    kpis: { docs: "41", auto: "96%", turn: "39s", pend: "1" },
    recent: [
      { who: "Fuel Express", type: "Receipt", amt: "£68.20", status: "Auto-posted" },
      { who: "Trade Supplies", type: "Invoice", amt: "£312.40", status: "Auto-posted" },
      { who: "NatWest", type: "Bank statement", amt: "18 lines", status: "Reconciled" },
      { who: "Uniform Co.", type: "Invoice", amt: "£245.00", status: "Auto-posted" },
    ],
    categories: [
      { l: "Costs", v: 28, c: "bg-emerald-500" },
      { l: "Sales", v: 16, c: "bg-teal-500" },
      { l: "Bank", v: 11, c: "bg-sky-500" },
      { l: "Receipts", v: 22, c: "bg-amber-500" },
      { l: "Credit notes", v: 1, c: "bg-rose-500" },
    ],
    bars: [20, 25, 22, 28, 24, 30, 26, 32, 28, 30, 34, 30, 36, 38],
  },
  {
    code: "GC", name: "Greenstone Construction", sub: "Construction",
    kpis: { docs: "212", auto: "88%", turn: "61s", pend: "14" },
    recent: [
      { who: "Travis Perkins", type: "Invoice", amt: "£4,820.00", status: "Auto-posted" },
      { who: "Jewson", type: "Invoice", amt: "£1,234.50", status: "Needs review" },
      { who: "Lloyds", type: "Bank statement", amt: "54 lines", status: "Reconciled" },
      { who: "Plant Hire UK", type: "Invoice", amt: "£980.00", status: "Auto-posted" },
    ],
    categories: [
      { l: "Costs", v: 88, c: "bg-emerald-500" },
      { l: "Sales", v: 45, c: "bg-teal-500" },
      { l: "Bank", v: 32, c: "bg-sky-500" },
      { l: "Receipts", v: 18, c: "bg-amber-500" },
      { l: "Credit notes", v: 9, c: "bg-rose-500" },
    ],
    bars: [80, 130, 90, 160, 110, 170, 100, 150, 175, 120, 165, 140, 180, 170],
  },
  {
    code: "NB", name: "Northbridge Retail", sub: "Multi-store",
    kpis: { docs: "384", auto: "97%", turn: "33s", pend: "5" },
    recent: [
      { who: "Coca-Cola Europacific", type: "Invoice", amt: "£6,210.00", status: "Auto-posted" },
      { who: "DHL Express", type: "Invoice", amt: "£312.80", status: "Auto-posted" },
      { who: "Santander", type: "Bank statement", amt: "112 lines", status: "Reconciled" },
      { who: "Returns batch", type: "Credit note", amt: "-£420.00", status: "Needs review" },
    ],
    categories: [
      { l: "Costs", v: 96, c: "bg-emerald-500" },
      { l: "Sales", v: 92, c: "bg-teal-500" },
      { l: "Bank", v: 41, c: "bg-sky-500" },
      { l: "Receipts", v: 34, c: "bg-amber-500" },
      { l: "Credit notes", v: 12, c: "bg-rose-500" },
    ],
    bars: [60, 80, 95, 110, 130, 150, 175, 195, 220, 245, 270, 295, 320, 340],
  },
];

/* -------------------- Invoice generator -------------------- */

type InvoiceLine = { d: string; q: number; u: number; code: string; codeShort: string };
type Invoice = {
  supplier: { name: string; addr: string; vat: string };
  customer: { name: string; addr: string };
  number: string;
  issued: string;
  due: string;
  lines: InvoiceLine[];
  subtotal: number;
  vatRate: number;
  vat: number;
  total: number;
  currency: "£";
  confidence: number;
  category: string;
};

const SUPPLIERS = [
  { name: "Acme Office Supplies Ltd", addr: "17 Wharfside, London EC1V 9BL", vat: "GB 482 1937 22" },
  { name: "Northwind Logistics", addr: "22 Dockside Rd, Bristol BS1 6XN", vat: "GB 921 4471 08" },
  { name: "Brightline Print Co.", addr: "5 Carter Lane, Manchester M2 4DB", vat: "GB 118 0432 99" },
  { name: "Pinewood Catering", addr: "104 Eastgate, Leeds LS2 7JJ", vat: "GB 645 8123 41" },
  { name: "Halcyon Cleaning Services", addr: "9 Mill Yard, Birmingham B5 4QU", vat: "GB 277 9018 60" },
  { name: "Quantum IT Solutions", addr: "31 King's Road, Reading RG1 4HP", vat: "GB 553 6691 22" },
  { name: "Greenleaf Garden Supply", addr: "200 Oak Avenue, Oxford OX4 1AA", vat: "GB 803 2245 17" },
  { name: "Riverstone Builders Merchants", addr: "Unit 7 Riverside Park, Cardiff CF10 4PA", vat: "GB 410 7763 02" },
];

const CUSTOMERS = [
  { name: "Acme Holdings Ltd", addr: "40 Finsbury Square, London" },
  { name: "Bluepeak Studios", addr: "12 Tabernacle St, London" },
  { name: "Mercer & Wright LLP", addr: "8 Bishopsgate, London" },
  { name: "Vantage Health Group", addr: "55 Park Lane, Manchester" },
  { name: "Coastline Hotels", addr: "1 Marine Parade, Brighton" },
  { name: "Forge Manufacturing", addr: "Industrial Estate, Sheffield" },
];

const ITEM_CATALOG: { d: string; min: number; max: number; code: string; codeShort: string }[] = [
  { d: "A4 printer paper, 5 reams", min: 12, max: 18, code: "7504 — Office consumables", codeShort: "7504" },
  { d: "Ballpoint pens, box of 50", min: 7, max: 12, code: "7504 — Office consumables", codeShort: "7504" },
  { d: "Desk organiser, oak", min: 45, max: 75, code: "7506 — Office equipment", codeShort: "7506" },
  { d: "Ergonomic office chair", min: 180, max: 320, code: "7506 — Office equipment", codeShort: "7506" },
  { d: "Branded notebooks, pack of 20", min: 35, max: 55, code: "7504 — Office consumables", codeShort: "7504" },
  { d: "Whiteboard markers, assorted", min: 8, max: 14, code: "7504 — Office consumables", codeShort: "7504" },
  { d: "Cleaning service, monthly", min: 220, max: 380, code: "7800 — Cleaning", codeShort: "7800" },
  { d: "Pallet delivery, next-day", min: 65, max: 120, code: "7400 — Carriage", codeShort: "7400" },
  { d: "Software licence, annual", min: 240, max: 600, code: "7500 — Software", codeShort: "7500" },
  { d: "Catering platter, 20 people", min: 90, max: 160, code: "8205 — Staff entertainment", codeShort: "8205" },
  { d: "Toner cartridge, high yield", min: 55, max: 95, code: "7504 — Office consumables", codeShort: "7504" },
  { d: "USB-C cables, pack of 10", min: 22, max: 40, code: "7505 — Computer accessories", codeShort: "7505" },
  { d: "Wireless mouse", min: 18, max: 35, code: "7505 — Computer accessories", codeShort: "7505" },
  { d: "Standing desk converter", min: 140, max: 240, code: "7506 — Office equipment", codeShort: "7506" },
  { d: "Coffee beans, 1kg bag", min: 18, max: 28, code: "7402 — Staff refreshments", codeShort: "7402" },
];

const VAT_RATES = [20, 20, 20, 5, 0];
const CATEGORIES = ["Costs", "Office supplies", "Services", "IT & software", "Refreshments"];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(a: number, b: number) { return a + Math.floor(Math.random() * (b - a + 1)); }
function randFloat(a: number, b: number) { return +(a + Math.random() * (b - a)).toFixed(2); }
function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function generateInvoice(prev?: Invoice | null): Invoice {
  let supplier = rand(SUPPLIERS);
  let customer = rand(CUSTOMERS);
  if (prev) {
    let guard = 0;
    while (supplier.name === prev.supplier.name && guard++ < 5) supplier = rand(SUPPLIERS);
    while (customer.name === prev.customer.name && guard++ < 10) customer = rand(CUSTOMERS);
  }

  const issueOffset = randInt(0, 30);
  const issued = new Date();
  issued.setDate(issued.getDate() - issueOffset);
  const due = new Date(issued);
  due.setDate(due.getDate() + (Math.random() < 0.5 ? 14 : 30));

  const number = `INV-2026-${String(randInt(100, 9999)).padStart(5, "0")}`;
  const lineCount = randInt(2, 5);
  const picks = shuffle(ITEM_CATALOG).slice(0, lineCount);
  const lines: InvoiceLine[] = picks.map((p) => ({
    d: p.d,
    q: randInt(1, 8),
    u: randFloat(p.min, p.max),
    code: p.code,
    codeShort: p.codeShort,
  }));

  const subtotal = +lines.reduce((s, l) => s + l.q * l.u, 0).toFixed(2);
  const vatRate = rand(VAT_RATES);
  const vat = +(subtotal * (vatRate / 100)).toFixed(2);
  const total = +(subtotal + vat).toFixed(2);

  return {
    supplier, customer, number,
    issued: formatDate(issued), due: formatDate(due),
    lines, subtotal, vatRate, vat, total,
    currency: "£",
    confidence: randInt(94, 99),
    category: rand(CATEGORIES),
  };
}

/* -------------------- Archive seed -------------------- */

type ArchiveRow = {
  id: string;
  name: string;
  file: string;
  amount: string;
  date: string;
  uploaded: string;
  type: string;
};

const SEED_ARCHIVE: ArchiveRow[] = [
  { id: "seed-2", name: "British Gas",          file: "bg.pdf",  amount: "£284.30",   date: "14 Apr 2026", uploaded: "15 Apr 2026", type: "Invoice" },
  { id: "seed-3", name: "Amazon Business",      file: "amz.pdf", amount: "£42.99",    date: "02 May 2026", uploaded: "02 May 2026", type: "Receipt" },
  { id: "seed-4", name: "HSBC — May statement", file: "stmt.pdf", amount: "32 lines", date: "31 May 2026", uploaded: "01 Jun 2026", type: "Statement" },
];

const PROCESSING_STAGES = [
  "Document uploaded",
  "Document classified",
  "AI extraction complete",
  "VAT detected",
  "Validation complete",
  "Ready for review",
];

/* -------------------- Root component -------------------- */

function ViewDemo() {
  const [step, setStep] = useState(1);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [processedFor, setProcessedFor] = useState<string | null>(null);
  const [clientIdx, setClientIdx] = useState(0);
  const [posted, setPosted] = useState(false);
  const [archiveRows, setArchiveRows] = useState<ArchiveRow[]>(SEED_ARCHIVE);
  const [explored, setExplored] = useState<Record<number, Set<string>>>({});

  const current = STEPS[step - 1];
  const nextStep = STEPS[step] ?? null;
  const client = CLIENTS[clientIdx];

  const next = useCallback(() => setStep((s) => Math.min(STEPS.length, s + 1)), []);
  const prev = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);

  useEffect(() => {
    setExplored((e) => ({ ...e, [step]: new Set() }));
    if (step < 7) {
      setPosted(false);
      setArchiveRows(SEED_ARCHIVE);
    }
    if (step < 3) {
      setClientIdx(0);
    }
  }, [step]);

  const signal = useCallback((stepId: number, key: string) => {
    setExplored((prevExplored) => {
      const cur = prevExplored[stepId] ?? new Set<string>();
      if (cur.has(key)) return prevExplored;
      const updated = new Set(cur);
      updated.add(key);
      const threshold = stepId === 4 ? 6 : 2;
      if ((stepId === 2 || stepId === 3 || stepId === 4) && updated.size >= threshold) {
        setTimeout(() => setStep((s) => (s === stepId ? Math.min(STEPS.length, s + 1) : s)), 300);
      }
      return { ...prevExplored, [stepId]: updated };
    });
  }, []);

  const regenerate = useCallback(() => {
    setInvoice((p) => {
      const inv = generateInvoice(p);
      setProcessedFor(null);
      return inv;
    });
  }, []);

  const markProcessed = useCallback((num: string) => setProcessedFor(num), []);

  const publish = useCallback(() => {
    if (!invoice) return;
    setPosted(true);
    setArchiveRows((rows) => {
      if (rows[0]?.id === invoice.number) return rows;
      const row: ArchiveRow = {
        id: invoice.number,
        name: invoice.supplier.name,
        file: "1.pdf",
        amount: `£${invoice.total.toFixed(2)}`,
        date: invoice.issued,
        uploaded: formatDate(new Date()),
        type: "Invoice",
      };
      return [row, ...rows.filter((r) => r.id !== invoice.number)];
    });
  }, [invoice]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  useEffect(() => {
    if (step === 7) publish();
  }, [step, publish]);

  const [tourOpen, setTourOpen] = useState(false);
  const [successState, setSuccessState] = useState<"hidden" | "modal" | "widget">("hidden");

  useEffect(() => {
    if (posted && step === 7) {
      const t = setTimeout(() => setSuccessState((s) => (s === "hidden" ? "modal" : s)), 2600);
      return () => clearTimeout(t);
    }
    setSuccessState("hidden");
  }, [posted, step]);

  return (
    <div className="outworx-shell flex min-h-[calc(100dvh-4rem)] flex-col lg:h-[calc(100dvh-4rem)] lg:overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-12 gap-3 px-3 py-3 md:px-4 lg:gap-5 lg:px-6 lg:py-4 lg:min-h-0 lg:items-stretch">
        <div className="order-1 col-span-12 lg:hidden">
          <MobileStepBar step={step} total={STEPS.length} title={current.title} onOpen={() => setTourOpen(true)} />
        </div>

        <main className="order-2 col-span-12 flex flex-col gap-3 lg:order-none lg:col-span-9 lg:min-h-0">
          <div className="hidden lg:block">
            <TopStepper step={step} setStep={setStep} posted={posted} />
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <BrowserFrame>
              <StageContent
                step={step}
                onNext={next}
                invoice={invoice}
                regenerate={regenerate}
                processedFor={processedFor}
                markProcessed={markProcessed}
                client={client}
                clientIdx={clientIdx}
                setClientIdx={setClientIdx}
                signal={signal}
                posted={posted}
                publish={publish}
                archiveRows={archiveRows}
              />
            </BrowserFrame>
          </div>
        </main>

        <aside className="order-3 col-span-12 lg:order-none lg:col-span-3 lg:min-h-0 lg:h-full">
          <TrainerVertical step={current} nextStep={nextStep} stepNum={step} total={STEPS.length} onNext={next} />
        </aside>
      </div>

      {tourOpen && (
        <TourDrawer step={step} setStep={(n) => { setStep(n); setTourOpen(false); }} onClose={() => setTourOpen(false)} />
      )}

      <SuccessOverlay
        open={successState === "modal"}
        onMinimize={() => setSuccessState("widget")}
      />
      <FloatingSuccessWidget
        open={successState === "widget"}
        onExpand={() => setSuccessState("modal")}
      />
    </div>
  );
}

/* -------------------- Vertical Trainer -------------------- */

function TrainerSection({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-t border-[hsl(210_25%_18%)] pt-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-[hsl(172_60%_65%)]">{label}</div>
      <p className="mt-1.5 text-sm leading-relaxed text-[hsl(180_20%_88%)]">{body}</p>
    </div>
  );
}

function TrainerVertical({
  step, nextStep, stepNum, total, onNext,
}: { step: Step; nextStep: Step | null; stepNum: number; total: number; onNext: () => void }) {
  const nextBody = nextStep
    ? `${nextStep.title} — ${nextStep.what}`
    : "You've completed the tour. Restart to run it again or head back to explore the product.";
  const atEnd = stepNum === total;
  return (
    <div className="outworx-card flex h-full max-h-full flex-col gap-3 rounded-xl p-4">
      <div className="shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(172_60%_50%)]/15 text-[hsl(172_60%_65%)] ring-1 ring-[hsl(172_60%_50%)]/30">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-base font-bold uppercase tracking-wider text-[hsl(172_60%_60%)]">Trainer</span>
        </div>
        <div className="mt-2 text-xs font-medium tabular-nums text-[hsl(200_15%_60%)]">Step {stepNum} of {total}</div>
        <h2 className="mt-0.5 text-base font-semibold leading-tight text-[hsl(180_20%_95%)]">{step.title}</h2>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto scrollbar-thin pr-1">
        <div className="rounded-lg border border-[hsl(172_60%_50%)]/30 bg-[hsl(172_60%_50%)]/10 px-3.5 py-2.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(172_60%_65%)]">Your task</div>
          <p className="mt-1 text-sm leading-snug text-[hsl(180_20%_95%)]">{step.task}</p>
        </div>

        <TrainerSection label="What happens" body={step.what} />
        <TrainerSection label="Why it matters" body={step.why} />
        <TrainerSection label="What's next" body={nextBody} />
      </div>

      <div className="shrink-0 pt-1 lg:hidden">
        <button
          onClick={onNext}
          disabled={atEnd}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[hsl(172_60%_45%)] px-3 py-2.5 text-sm font-semibold text-[hsl(210_30%_8%)] hover:bg-[hsl(172_60%_55%)] disabled:opacity-40"
        >
          {atEnd ? "Finish" : "Next step"} <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* -------------------- Mobile step bar + tour drawer -------------------- */

function MobileStepBar({
  step, total, title, onOpen,
}: { step: number; total: number; title: string; onOpen: () => void }) {
  return (
    <div className="outworx-card flex items-center gap-2 rounded-xl px-3 py-2">
      <span className="flex h-7 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(172_60%_50%)] text-[11px] font-bold tabular-nums text-[hsl(210_30%_8%)]">
        {step}/{total}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[hsl(180_20%_95%)]">{title}</span>
      <button
        onClick={onOpen}
        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[hsl(210_25%_18%)] bg-[hsl(210_30%_12%)] px-2.5 py-1.5 text-xs font-medium text-[hsl(180_20%_85%)] hover:bg-[hsl(210_25%_18%)]"
      >
        <Menu className="h-3.5 w-3.5" /> Steps
      </button>
    </div>
  );
}

function TourDrawer({
  step, setStep, onClose,
}: { step: number; setStep: (n: number) => void; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-[200] flex lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative ml-auto flex h-full w-[88%] max-w-sm flex-col gap-2 overflow-y-auto bg-[hsl(210_30%_10%)] p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(172_60%_65%)]">Guided tour</span>
          <button onClick={onClose} className="rounded-md p-1.5 text-[hsl(180_20%_85%)] hover:bg-[hsl(210_25%_18%)]" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <ol className="mt-2 space-y-1">
          {STEPS.map((s) => {
            const active = s.id === step;
            const done = s.id < step;
            return (
              <li key={s.id}>
                <button
                  onClick={() => setStep(s.id)}
                  className={`flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left transition ${
                    active
                      ? "bg-[hsl(172_60%_50%)]/10 ring-1 ring-[hsl(172_60%_50%)]/50"
                      : "hover:bg-[hsl(210_25%_15%)]"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      done
                        ? "bg-[hsl(152_70%_45%)] text-[hsl(210_30%_8%)]"
                        : active
                        ? "bg-[hsl(172_60%_50%)] text-[hsl(210_30%_8%)]"
                        : "bg-[hsl(210_25%_18%)] text-[hsl(200_15%_70%)]"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-medium ${active ? "text-[hsl(180_20%_95%)]" : done ? "text-[hsl(180_20%_85%)]" : "text-[hsl(200_15%_70%)]"}`}>
                      {s.title}
                    </span>
                    <span className="block text-[11px] text-[hsl(200_15%_60%)]">{s.caption}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>,
    document.body,
  );
}

/* -------------------- Top horizontal stepper -------------------- */

function TopStepper({ step, setStep, posted = false }: { step: number; setStep: (n: number) => void; posted?: boolean }) {
  const sweeping = posted && step === 7;
  return (
    <div className="outworx-card relative shrink-0 overflow-hidden rounded-xl px-2 py-2">
      {sweeping && (
        <motion.div
          aria-hidden
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[hsl(152_70%_55%/0.45)] to-transparent"
        />
      )}
      <ol className="relative flex w-full items-stretch gap-0.5">
        {STEPS.map((s, i) => {
          const active = s.id === step;
          const done = s.id < step || sweeping;
          return (
            <li key={s.id} className="flex min-w-0 flex-1">
              <button
                onClick={() => setStep(s.id)}
                className={`group flex w-full min-w-0 items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left transition ${
                  active
                    ? "bg-[hsl(172_60%_50%)]/10 ring-1 ring-[hsl(172_60%_50%)]/50"
                    : "hover:bg-[hsl(210_25%_15%)]"
                }`}
                title={s.title}
              >
                <motion.span
                  animate={sweeping ? { boxShadow: ["0 0 0 0 hsl(152 70% 50% / 0)", "0 0 18px 2px hsl(152 70% 50% / 0.6)", "0 0 0 0 hsl(152 70% 50% / 0)"] } : { boxShadow: "0 0 0 0 hsl(152 70% 50% / 0)" }}
                  transition={sweeping ? { delay: i * 0.12, duration: 1.1, ease: "easeOut" } : { duration: 0.2 }}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                    done
                      ? "bg-[hsl(152_70%_45%)] text-[hsl(210_30%_8%)]"
                      : active
                      ? "bg-[hsl(172_60%_50%)] text-[hsl(210_30%_8%)]"
                      : "bg-[hsl(210_25%_18%)] text-[hsl(200_15%_70%)]"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-3 w-3" /> : s.id}
                </motion.span>
                <span
                  className={`min-w-0 truncate text-[10px] font-medium leading-tight ${
                    active ? "text-[hsl(180_20%_95%)]" : done ? "text-[hsl(180_20%_85%)]" : "text-[hsl(200_15%_60%)]"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* -------------------- InfoHover tooltip (portal) -------------------- */

function InfoHover({
  title,
  body,
  children,
  className,
  side = "right",
}: { title: string; body: string; children: React.ReactNode; className?: string; side?: "left" | "right" | "top" | "bottom" }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const compute = useCallback(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const TIP_W = 224;
    const TIP_H = 80;
    let top = r.top, left = r.right + 8;
    if (side === "left") { left = r.left - TIP_W - 8; top = r.top; }
    else if (side === "top") { left = r.left; top = r.top - TIP_H - 8; }
    else if (side === "bottom") { left = r.left; top = r.bottom + 8; }
    const vw = window.innerWidth, vh = window.innerHeight;
    if (left + TIP_W > vw - 8) left = vw - TIP_W - 8;
    if (left < 8) left = 8;
    if (top + TIP_H > vh - 8) top = vh - TIP_H - 8;
    if (top < 8) top = 8;
    setPos({ top, left });
  }, [side]);

  useEffect(() => {
    if (!open) return;
    compute();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onScroll = () => compute();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, compute]);

  return (
    <div
      ref={ref}
      className={`relative ${className ?? ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      {children}
      {open && pos && typeof document !== "undefined" && createPortal(
        <div
          role="tooltip"
          style={{ position: "fixed", top: pos.top, left: pos.left }}
          className="pointer-events-none z-[100] w-56 whitespace-normal rounded-lg border border-[hsl(172_60%_50%)]/30 bg-[hsl(210_30%_10%)] p-2.5 text-[11px] leading-snug text-[hsl(180_20%_90%)] shadow-xl"
        >
          <div className="flex items-center gap-1 text-[hsl(172_60%_65%)]">
            <Info className="h-3 w-3" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">{title}</span>
          </div>
          <p className="mt-1 text-[hsl(200_15%_75%)]">{body}</p>
        </div>,
        document.body,
      )}
    </div>
  );
}

/* -------------------- Browser frame -------------------- */

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[360px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:min-h-[420px]">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-slate-500 ring-1 ring-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          app.outworx.ai/workspace
        </div>
      </div>
      <div className="min-h-0 flex-1 bg-white text-slate-900">{children}</div>
    </div>
  );
}

/* -------------------- Stage router -------------------- */

type StageProps = {
  step: number;
  onNext: () => void;
  invoice: Invoice | null;
  regenerate: () => void;
  processedFor: string | null;
  markProcessed: (n: string) => void;
  client: Client;
  clientIdx: number;
  setClientIdx: (i: number) => void;
  signal: (stepId: number, key: string) => void;
  posted: boolean;
  publish: () => void;
  archiveRows: ArchiveRow[];
};

function StageContent(props: StageProps) {
  const { step, onNext, invoice, regenerate, processedFor, markProcessed, client, clientIdx, setClientIdx, signal, posted, publish, archiveRows } = props;
  switch (step) {
    case 1: return <WelcomeScreen onNext={onNext} />;
    case 2: return <AppShell highlight="dashboard" client={client} clientIdx={clientIdx} setClientIdx={setClientIdx} signal={signal}><DashboardScreen client={client} signal={signal} /></AppShell>;
    case 3: return <AppShell highlight="client" client={client} clientIdx={clientIdx} setClientIdx={setClientIdx} signal={signal} autoOpenClient><DashboardScreen client={client} signal={signal} /></AppShell>;
    case 4: return <AppShell highlight="categories" categoriesOpen client={client} clientIdx={clientIdx} setClientIdx={setClientIdx} signal={signal}><DashboardScreen client={client} signal={signal} /></AppShell>;
    case 5: return <AppShell highlight="upload" categoriesOpen client={client} clientIdx={clientIdx} setClientIdx={setClientIdx} signal={signal}><UploadScreen invoice={invoice} regenerate={regenerate} onNext={onNext} processedFor={processedFor} markProcessed={markProcessed} /></AppShell>;
    case 6: return <AppShell highlight="upload" categoriesOpen client={client} clientIdx={clientIdx} setClientIdx={setClientIdx} signal={signal}><ExtractCodeScreen invoice={invoice} onNext={onNext} /></AppShell>;
    case 7: return <AppShell highlight="upload" categoriesOpen client={client} clientIdx={clientIdx} setClientIdx={setClientIdx} signal={signal}><PublishScreen invoice={invoice} posted={posted} publish={publish} archiveRows={archiveRows} /></AppShell>;
    default: return null;
  }
}

/* -------------------- Shell -------------------- */

function AppShell({
  children,
  highlight,
  categoriesOpen,
  client,
  clientIdx,
  setClientIdx,
  autoOpenClient,
  signal,
}: {
  children: React.ReactNode;
  highlight?: "dashboard" | "client" | "categories" | "upload";
  categoriesOpen?: boolean;
  client: Client;
  clientIdx: number;
  setClientIdx: (i: number) => void;
  autoOpenClient?: boolean;
  signal: (stepId: number, k: string) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row">
      <Sidebar
        highlight={highlight}
        categoriesOpen={categoriesOpen}
        client={client}
        clientIdx={clientIdx}
        setClientIdx={setClientIdx}
        autoOpenClient={autoOpenClient}
        signal={signal}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <SubHeader highlight={highlight} client={client} />
        <div className="scrollbar-thin-light min-h-0 flex-1 overflow-y-auto p-3 md:p-4">{children}</div>
      </div>
    </div>
  );
}

function Ring({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute -inset-1 animate-pulse rounded-lg ring-2 ring-emerald-500/70" />
      {children}
    </div>
  );
}

function Sidebar({
  highlight,
  categoriesOpen,
  client,
  clientIdx,
  setClientIdx,
  autoOpenClient,
  signal,
}: {
  highlight?: string;
  categoriesOpen?: boolean;
  client: Client;
  clientIdx: number;
  setClientIdx: (i: number) => void;
  autoOpenClient?: boolean;
  signal: (stepId: number, k: string) => void;
}) {
  return (
    <aside className="w-full shrink-0 overflow-y-auto border-b border-slate-200 bg-[#fafaf7] p-2.5 text-[13px] scrollbar-thin-light md:w-52 md:border-b-0 md:border-r">
      <div className="mb-4 px-2">
        <ClientSwitcher
          client={client}
          clientIdx={clientIdx}
          setClientIdx={setClientIdx}
          ringed={highlight === "client"}
          autoOpen={!!autoOpenClient}
          signal={signal}
        />
      </div>

      <InfoHover side="right" title="Dashboard" body="Your daily command center — volumes, accuracy, and what needs attention.">
        <NavItem icon={LayoutDashboard} label="Dashboard" active={highlight === "dashboard"} ring={highlight === "dashboard"} />
      </InfoHover>
      <InfoHover side="right" title="Clients" body="Manage multiple client accounts and workspaces from a single place.">
        <NavItem icon={Users} label="Clients" />
      </InfoHover>

      {highlight === "categories" ? (
        <Ring>
          <CategoriesGroup open={categoriesOpen} signal={signal} />
        </Ring>
      ) : (
        <CategoriesGroup open={categoriesOpen} highlightUpload={highlight === "upload"} signal={signal} />
      )}

      <div className="mt-4 border-t border-slate-200 pt-3">
        <InfoHover side="right" title="Settings" body="Configure workspace preferences, users, and accounting integrations.">
          <NavItem icon={Settings} label="Settings" />
        </InfoHover>
      </div>
    </aside>
  );
}

function ClientSwitcher({
  client, clientIdx, setClientIdx, ringed, autoOpen, signal,
}: { client: Client; clientIdx: number; setClientIdx: (i: number) => void; ringed?: boolean; autoOpen?: boolean; signal: (sid: number, k: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const didAutoOpen = useRef(false);

  useEffect(() => {
    if (autoOpen && !didAutoOpen.current) {
      didAutoOpen.current = true;
      const t = setTimeout(() => setOpen(true), 350);
      return () => clearTimeout(t);
    }
    if (!autoOpen) {
      didAutoOpen.current = false;
      setOpen(false);
    }
  }, [autoOpen]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const trigger = (
    <button
      onClick={() => setOpen((v) => !v)}
      className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-2.5 py-2 text-left text-xs hover:bg-slate-50"
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-100 text-[10px] font-bold text-emerald-700">{client.code}</span>
        <span className="min-w-0">
          <span className="block truncate font-semibold text-slate-800">{client.name}</span>
          <span className="block truncate text-[10px] text-slate-500">{client.sub}</span>
        </span>
      </span>
      <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <div ref={ref} className="relative">
      {ringed ? <Ring>{trigger}</Ring> : trigger}
      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-72 overflow-y-auto rounded-md border border-slate-200 bg-white py-1 text-xs shadow-lg scrollbar-thin-light">
          <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Switch client</div>
          {CLIENTS.map((c, i) => {
            const selected = i === clientIdx;
            return (
              <button
                key={c.code}
                onClick={() => { signal(3, `client-${i}`); setClientIdx(i); setOpen(false); }}
                className={`flex w-full items-center justify-between gap-2 px-2.5 py-1.5 text-left ${selected ? "bg-emerald-50 text-emerald-800" : "text-slate-700 hover:bg-slate-50"}`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold ${selected ? "bg-emerald-200 text-emerald-800" : "bg-slate-100 text-slate-700"}`}>{c.code}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{c.name}</span>
                    <span className="block truncate text-[10px] text-slate-500">{c.sub}</span>
                  </span>
                </span>
                {selected && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NavItem({
  icon: Icon, label, active, ring, indent,
}: { icon: any; label: string; active?: boolean; ring?: boolean; indent?: boolean }) {
  const inner = (
    <button
      className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left ${
        active ? "bg-emerald-50 font-medium text-emerald-800" : "text-slate-700 hover:bg-slate-100"
      } ${indent ? "pl-8" : ""}`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
  return ring ? <Ring>{inner}</Ring> : inner;
}

function CategoriesGroup({ open, highlightUpload, signal }: { open?: boolean; highlightUpload?: boolean; signal: (sid: number, k: string) => void }) {
  return (
    <div className="mt-1">
      <InfoHover side="right" title="Documents" body="Store, organize, and process every financial document for this client.">
        <button className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-slate-700 hover:bg-slate-100">
          <span className="flex items-center gap-2.5">
            <FileText className="h-4 w-4" />
            Documents
          </span>
          <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition ${open ? "" : "-rotate-90"}`} />
        </button>
      </InfoHover>
      {open && (
        <div className="mt-1 space-y-0.5">
          <InfoHover side="right" title="Costs" body="Process supplier invoices and business expenses.">
            <SubCategory icon={Receipt} label="Costs" count={42} highlight={highlightUpload} onHover={() => signal(4, "Costs")} />
          </InfoHover>
          <InfoHover side="right" title="Sales" body="Manage outgoing invoices and revenue-related documents.">
            <SubCategory icon={ArrowUpRight} label="Sales" count={18} onHover={() => signal(4, "Sales")} />
          </InfoHover>
          <InfoHover side="right" title="Bank statements" body="Review and reconcile bank transactions automatically.">
            <SubCategory icon={Landmark} label="Bank statements" count={6} onHover={() => signal(4, "Bank")} />
          </InfoHover>
          <InfoHover side="right" title="Credit notes" body="Track refunds and credits issued by suppliers.">
            <SubCategory icon={FileCheck2} label="Credit notes" count={3} onHover={() => signal(4, "Credit notes")} />
          </InfoHover>
          <InfoHover side="right" title="Receipts" body="Extract and categorize receipt data automatically.">
            <SubCategory icon={CreditCard} label="Receipts" count={27} onHover={() => signal(4, "Receipts")} />
          </InfoHover>
          <InfoHover side="right" title="Payroll" body="Manage payroll documents and processing.">
            <SubCategory icon={Building2} label="Payroll" count={4} onHover={() => signal(4, "Payroll")} />
          </InfoHover>
        </div>
      )}
    </div>
  );
}

function SubCategory({ icon: Icon, label, count, highlight, onHover }: { icon: any; label: string; count: number; highlight?: boolean; onHover?: () => void }) {
  const inner = (
    <button
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`flex w-full items-center justify-between rounded-md py-1.5 pl-8 pr-2.5 text-left text-xs ${
        highlight ? "bg-emerald-50 font-medium text-emerald-800" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="rounded bg-slate-100 px-1.5 text-[10px] text-slate-600">{count}</span>
    </button>
  );
  return highlight ? <Ring>{inner}</Ring> : inner;
}

function SubHeader({ highlight, client }: { highlight?: string; client: Client }) {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-3 md:px-6">
      <div className="flex items-center gap-3 text-sm">
        <span className="font-semibold text-slate-800">
          {highlight === "upload" ? "Costs" : "Dashboard"}
        </span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500">{client.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <InfoHover side="left" title="Search" body="Find any document, supplier or value across every client.">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input placeholder="Search…" className="rounded-md border border-slate-200 bg-white py-1.5 pl-7 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </InfoHover>
        <InfoHover side="left" title="Notifications" body="Review pending approvals, failed posts and AI-flagged anomalies.">
          <button className="rounded-md p-1.5 hover:bg-slate-100"><Bell className="h-4 w-4 text-slate-600" /></button>
        </InfoHover>
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
      </div>
    </div>
  );
}

/* -------------------- Screens -------------------- */

function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex h-full min-h-[360px] flex-col items-center justify-center bg-gradient-to-br from-[hsl(210_30%_10%)] via-[hsl(210_30%_8%)] to-[hsl(172_60%_12%)] p-5 text-center md:min-h-[420px] md:p-10">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(172_60%_50%)]/10 px-3 py-1 text-xs font-medium text-[hsl(172_60%_65%)] ring-1 ring-[hsl(172_60%_50%)]/30">
        <Sparkles className="h-3.5 w-3.5" /> Interactive walkthrough
      </span>
      <h1 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-[hsl(180_20%_95%)] sm:text-3xl">
        See Outworx process a document in <span className="text-serif text-[hsl(172_60%_65%)]">under a minute</span>
      </h1>
      <p className="mt-3 max-w-xl text-sm text-[hsl(200_15%_70%)]">
        We'll generate a sample supplier invoice, run it through the AI extractor, and post it to a ledger — exactly how your team would.
      </p>
      <button
        onClick={onNext}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[hsl(172_60%_45%)] px-5 py-2.5 text-sm font-semibold text-[hsl(210_30%_8%)] outworx-glow hover:bg-[hsl(172_60%_55%)]"
      >
        Start the tour <ChevronRight className="h-4 w-4" />
      </button>
      <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
        {[
          { icon: Upload, label: "Drop any document", body: "PDFs, scans, photos" },
          { icon: Sparkles, label: "AI extracts fields", body: "OCR + LLM, in seconds" },
          { icon: Cloud, label: "Post to ledger", body: "Xero, QuickBooks, Sage" },
        ].map((c) => (
          <div key={c.label} className="outworx-card rounded-xl p-3">
            <c.icon className="h-5 w-5 text-[hsl(172_60%_60%)]" />
            <p className="mt-2 text-sm font-semibold text-[hsl(180_20%_95%)]">{c.label}</p>
            <p className="text-xs text-[hsl(200_15%_60%)]">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen({ client, signal }: { client: Client; signal: (sid: number, k: string) => void }) {
  const kpis = [
    { label: "Documents today", value: client.kpis.docs, delta: "+12%", tip: "Documents ingested in the last 24h." },
    { label: "Auto-approved", value: client.kpis.auto, delta: "+3%", tip: "Share processed by AI with no human edits." },
    { label: "Avg. turnaround", value: client.kpis.turn, delta: "-8s", tip: "Time from upload to ready-for-review." },
    { label: "Pending review", value: client.kpis.pend, delta: "", tip: "Documents flagged for a quick human check." },
  ];
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-base font-semibold">Good afternoon, Sam</h1>
        <p className="text-[11px] text-slate-500">Here's what your AI processed today across {client.name}.</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <InfoHover key={k.label} title={k.label} body={k.tip} side={i >= 2 ? "left" : "right"}>
            <div
              onMouseEnter={() => signal(2, `kpi-${k.label}`)}
              onFocus={() => signal(2, `kpi-${k.label}`)}
              className="rounded-xl border border-slate-200 bg-white p-2.5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[11px] text-slate-500">{k.label}</p>
                {k.delta && <p className="text-[10px] text-emerald-600">{k.delta}</p>}
              </div>
              <p className="mt-0.5 text-lg font-semibold tracking-tight">{k.value}</p>
            </div>
          </InfoHover>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-3">
        <InfoHover title="Processing volume" body="Daily document throughput over the last two weeks." className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold">Processing volume</h3>
              <span className="text-[10px] text-slate-500">Last 14 days</span>
            </div>
            <MiniChart bars={client.bars} />
          </div>
        </InfoHover>
        <InfoHover side="left" title="By category" body="Today's documents split by Costs, Sales, Bank and more.">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <h3 className="text-xs font-semibold">By category</h3>
            <ul className="mt-1.5 space-y-1.5 text-xs">
              {client.categories.map((r) => (
                <li key={r.l}>
                  <div className="flex justify-between"><span>{r.l}</span><span className="text-slate-500">{r.v}</span></div>
                  <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </InfoHover>
      </div>

      <InfoHover side="top" title="Recent activity" body="Latest documents the AI handled — click any row to drill in.">
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-3 py-2 text-xs font-semibold">Recent activity</div>
          <ul className="divide-y divide-slate-100 text-xs">
            {client.recent.map((r) => (
              <li
                key={r.who}
                onMouseEnter={() => signal(2, `row-${r.who}`)}
                className="flex items-center justify-between gap-3 px-3 py-1.5 hover:bg-slate-50/60"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div className="h-5 w-5 shrink-0 rounded bg-slate-100" />
                  <div className="min-w-0 truncate">
                    <span className="font-medium">{r.who}</span>
                    <span className="ml-1.5 text-[11px] text-slate-500">· {r.type}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-[11px]">
                  <span className="font-mono">{r.amt}</span>
                  <span className={`whitespace-nowrap rounded-full px-2 py-0.5 ${r.status === "Needs review" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{r.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </InfoHover>
    </div>
  );
}

function MiniChart({ bars }: { bars: number[] }) {
  const max = Math.max(...bars, 1);
  return (
    <div className="mt-3 flex h-20 items-end gap-1">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-emerald-200 to-emerald-500" style={{ height: `${(b / max) * 100}%` }} />
      ))}
    </div>
  );
}

function UploadScreen({
  invoice, regenerate, onNext, processedFor, markProcessed,
}: {
  invoice: Invoice | null; regenerate: () => void; onNext: () => void;
  processedFor: string | null; markProcessed: (n: string) => void;
}) {
  const [stageIdx, setStageIdx] = useState(-1);
  const [generating, setGenerating] = useState(false);
  const processed = !!invoice && processedFor === invoice.number;
  const advanced = useRef(false);

  useEffect(() => {
    if (!invoice) { setStageIdx(-1); return; }
    if (processed) { setStageIdx(PROCESSING_STAGES.length - 1); return; }
    setStageIdx(-1);
    const t = setTimeout(() => setStageIdx(0), 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice?.number]);

  useEffect(() => {
    if (stageIdx < 0 || stageIdx >= PROCESSING_STAGES.length - 1) return;
    const t = setTimeout(() => setStageIdx((i) => i + 1), 900);
    return () => clearTimeout(t);
  }, [stageIdx]);

  useEffect(() => {
    if (invoice && stageIdx === PROCESSING_STAGES.length - 1 && !processed) {
      markProcessed(invoice.number);
    }
  }, [stageIdx, invoice, processed, markProcessed]);

  useEffect(() => {
    if (processed && !advanced.current) {
      advanced.current = true;
      const t = setTimeout(() => onNext(), 1800);
      return () => clearTimeout(t);
    }
  }, [processed, onNext]);

  const handleGenerate = () => {
    advanced.current = false;
    setGenerating(true);
    setTimeout(() => {
      regenerate();
      setGenerating(false);
    }, 700);
  };

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-base font-semibold">Upload documents</h1>
        <p className="text-[11px] text-slate-500">Drop in supplier invoices, receipts, or statements. We'll route them to the right extractor.</p>
      </div>

      {!invoice && !generating && (
        <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 p-6 text-center">
          <Upload className="mx-auto h-9 w-9 text-emerald-600" />
          <p className="mt-2 text-sm font-medium text-slate-800">Drag files here</p>
          <p className="text-[11px] text-slate-500">PDF, PNG, JPG up to 25 MB</p>
          <button
            onClick={handleGenerate}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            <Sparkles className="h-3.5 w-3.5" /> Generate sample invoice
          </button>
          <p className="mt-2 text-[11px] text-slate-500">One click creates a realistic invoice and runs the pipeline. (Refresh the page to start over.)</p>
        </div>
      )}

      {generating && (
        <div className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 p-6 text-center">
          <div>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-600" />
            <p className="mt-2 text-sm font-medium text-slate-800">Generating sample invoice…</p>
            <p className="text-[11px] text-slate-500">Creating a realistic supplier document.</p>
          </div>
        </div>
      )}

      {invoice && !generating && (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="mb-2">
              <p className="text-[11px] text-slate-500">
                <CheckCircle2 className="mr-1 inline h-3 w-3 text-emerald-600" />
                Document uploaded · running through the AI pipeline
              </p>
            </div>
            <SampleInvoice invoice={invoice} />
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-800">Processing pipeline</h3>
                {processed
                  ? <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">Complete</span>
                  : <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700"><Loader2 className="h-3 w-3 animate-spin" /> Running…</span>}
              </div>
              <ul className="mt-3 space-y-1.5 text-xs">
                {PROCESSING_STAGES.map((s, i) => {
                  const done = stageIdx >= i;
                  return (
                    <li key={s} className={`flex items-center gap-2 transition ${done ? "text-slate-900 opacity-100" : "text-slate-400 opacity-70"}`}>
                      {done
                        ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        : i === stageIdx + 1
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-500" />
                          : <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-200" />}
                      <span>{s}</span>
                    </li>
                  );
                })}
              </ul>
              {processed && (
                <p className="mt-3 text-[11px] text-emerald-700">Advancing to review…</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExtractCodeScreen({ invoice, onNext }: { invoice: Invoice | null; onNext: () => void }) {
  if (!invoice) return <MissingInvoiceNotice />;
  const checks = [
    "Supplier detected",
    "Invoice date detected",
    "VAT identified",
    "Line items extracted",
    "Totals calculated",
    "Ready for review",
  ];
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
          <CheckCircle2 className="h-3.5 w-3.5" /> Extraction complete
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="rounded-full bg-white px-1.5 py-0.5 font-medium text-emerald-700 ring-1 ring-emerald-200">Confidence {invoice.confidence}%</span>
          <span className="rounded-full bg-white px-1.5 py-0.5 font-medium text-emerald-700 ring-1 ring-emerald-200">Validation passed</span>
          <button
            onClick={onNext}
            className="ml-1 inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700"
          >
            <Cloud className="h-3 w-3" /> Publish to ledger
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="lg:sticky lg:top-0 lg:self-start lg:max-h-[calc(100dvh-140px)] lg:overflow-y-auto scrollbar-thin-light">
          <SampleInvoice invoice={invoice} />
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
              <h3 className="text-xs font-semibold">Detected fields</h3>
              <span className="text-[10px] text-slate-500">Click a field to highlight on source</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 p-3 text-xs">
              <Field label="Supplier" value={invoice.supplier.name} />
              <Field label="Invoice #" value={invoice.number} />
              <Field label="Issue date" value={invoice.issued} />
              <Field label="Due date" value={invoice.due} />
              <Field label="VAT number" value={invoice.supplier.vat} />
              <Field label="Currency" value="GBP" />
              <Field label="Subtotal" value={`£${invoice.subtotal.toFixed(2)}`} />
              <Field label={`VAT (${invoice.vatRate}%)`} value={`£${invoice.vat.toFixed(2)}`} />
              <Field label="Total" value={`£${invoice.total.toFixed(2)}`} highlight />
              <Field label="Category" value={invoice.category} />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Category</span>
                <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">XERO COA</span>
                <span className="font-medium text-slate-800">{invoice.category}</span>
              </div>
              <span className="text-[10px] text-slate-500">{invoice.lines.length} line items</span>
            </div>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[560px] text-xs">
                <thead className="text-[10px] uppercase tracking-wider text-slate-500">
                  <tr className="border-b border-slate-100">
                    <th className="px-1.5 py-1.5 text-left">Description</th>
                    <th className="px-1.5 py-1.5 text-right">Qty</th>
                    <th className="px-1.5 py-1.5 text-right">Net</th>
                    <th className="px-1.5 py-1.5 text-left">VAT</th>
                    <th className="px-1.5 py-1.5 text-right">Gross</th>
                    <th className="px-1.5 py-1.5 text-left">Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.lines.map((r, i) => {
                    const net = r.q * r.u;
                    const vat = +(net * invoice.vatRate / 100).toFixed(2);
                    const gross = +(net + vat).toFixed(2);
                    return (
                      <tr key={r.d + i} className="hover:bg-slate-50/60">
                        <td className="px-1.5 py-1.5 text-slate-800">{r.d}</td>
                        <td className="px-1.5 py-1.5 text-right font-mono">{r.q}</td>
                        <td className="px-1.5 py-1.5 text-right font-mono text-slate-600">£{net.toFixed(2)}</td>
                        <td className="px-1.5 py-1.5">
                          <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-700">
                            {invoice.vatRate === 0 ? "Zero" : invoice.vatRate === 5 ? "5%" : "20%"}
                            <ChevronDown className="h-3 w-3 text-slate-400" />
                          </span>
                        </td>
                        <td className="px-1.5 py-1.5 text-right font-mono font-medium">£{gross.toFixed(2)}</td>
                        <td className="px-1.5 py-1.5">
                          <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">{r.codeShort}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="text-xs">
                  <tr><td colSpan={4} className="px-1.5 py-1 text-right text-slate-500">Subtotal</td><td className="px-1.5 py-1 text-right font-mono">£{invoice.subtotal.toFixed(2)}</td><td /></tr>
                  <tr><td colSpan={4} className="px-1.5 py-1 text-right text-slate-500">VAT ({invoice.vatRate}%)</td><td className="px-1.5 py-1 text-right font-mono">£{invoice.vat.toFixed(2)}</td><td /></tr>
                  <tr className="border-t border-slate-100"><td colSpan={4} className="px-1.5 py-1 text-right font-semibold">Total</td><td className="px-1.5 py-1 text-right font-mono font-semibold text-emerald-700">£{invoice.total.toFixed(2)}</td><td /></tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <h3 className="text-xs font-semibold">Validation</h3>
            <ul className="mt-2 grid grid-cols-2 gap-1.5 text-[11px]">
              {checks.map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> {c}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-slate-500">Looks right? Use the green "Publish to ledger" button above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`mt-0.5 truncate font-medium ${highlight ? "text-emerald-700" : "text-slate-900"}`}>{value}</p>
    </div>
  );
}

function PublishScreen({ invoice, posted, publish: _publish, archiveRows }: { invoice: Invoice | null; posted: boolean; publish: () => void; archiveRows: ArchiveRow[] }) {
  const xeroId = useMemo(() => randInt(1000, 9999), []);
  if (!invoice) return <MissingInvoiceNotice />;
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-base font-semibold">Publish to ledger</h1>
        <p className="text-[11px] text-slate-500">Pick a ledger and post — the document then moves to your Archive.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { name: "Xero", status: "Connected", picked: true },
          { name: "QuickBooks", status: "Connect to enable" },
          { name: "Sage", status: "Connect to enable" },
        ].map((p) => (
          <div key={p.name} className={`rounded-xl border p-3 ${p.picked ? "border-emerald-500 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{p.name}</span>
              {p.picked && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{p.status}</p>
          </div>
        ))}
      </div>

      {posted && (
        <div className="rounded-lg bg-emerald-50 p-2.5 text-[11px] text-emerald-800">
          {invoice.supplier.name} — {invoice.number} posted to Xero as bill draft <span className="font-mono">XR-{xeroId}</span>. Archived below.
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-100 px-2 py-2 text-xs">
          {[
            { icon: Inbox, label: "Inbox", count: 46 },
            { icon: Clock, label: "Processing", count: 0 },
            { icon: CheckCircle2, label: "Approvals", count: 0 },
            { icon: Archive, label: "Archive", count: archiveRows.length, active: true },
          ].map((t) => (
            <button
              key={t.label}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 ${
                t.active
                  ? "bg-slate-100 font-medium text-slate-900 ring-1 ring-slate-200"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" /> {t.label}
              <span className={`rounded-full px-1.5 text-[10px] ${t.active ? "bg-white text-slate-700" : "bg-slate-100 text-slate-600"}`}>{t.count}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-2 py-2 text-[11px] text-slate-600">
          <div className="relative min-w-[160px] flex-1">
            <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
            <input placeholder="Search supplier, file name…" className="w-full rounded-md border border-slate-200 bg-white py-1 pl-7 pr-2 text-[11px] focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1">All Types <ChevronDown className="h-3 w-3" /></button>
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1"><Calendar className="h-3 w-3" /> From</button>
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1"><Calendar className="h-3 w-3" /> To</button>
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1"><ArrowDownUp className="h-3 w-3" /> Newest first <ChevronDown className="h-3 w-3" /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500">
              <tr className="border-b border-slate-100">
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-right">Amount</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Uploaded</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {archiveRows.map((r, i) => {
                const isNew = posted && i === 0 && r.id === invoice.number;
                return (
                  <tr key={r.id} className={isNew ? "bg-emerald-50/60" : ""}>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded bg-emerald-100 text-emerald-700"><Upload className="h-3 w-3" /></span>
                        <div className="min-w-0">
                          <div className="truncate font-medium text-slate-800">{r.name}</div>
                          <div className="text-[10px] text-slate-500">{r.file}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right font-mono">{r.amount}</td>
                    <td className="px-3 py-2 text-slate-700">{r.date}</td>
                    <td className="px-3 py-2 text-slate-700">{r.uploaded}</td>
                    <td className="px-3 py-2 text-slate-700">{r.type}</td>
                    <td className="px-3 py-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">Archived</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {posted && <WorkflowCompleteSequence />}
    </div>
  );
}

const COMPLETION_STAGES = [
  "Document Uploaded",
  "AI Extraction Complete",
  "VAT & CIS Processed",
  "Ready for Review",
  "Published to Ledger",
  "Workflow Complete",
];

function WorkflowCompleteSequence() {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-white p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
        <Sparkles className="h-3.5 w-3.5" /> Workflow summary
      </div>
      <ol className="relative space-y-2.5">
        {COMPLETION_STAGES.map((label, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.22, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 + i * 0.22, type: "spring", stiffness: 360, damping: 18 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_0_0_4px_hsl(152_60%_45%/0.12)]"
            >
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={3} />
            </motion.span>
            <span className="text-xs font-medium text-slate-800 sm:text-sm">{label}</span>
            {i === COMPLETION_STAGES.length - 1 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.22 + 0.2, duration: 0.4 }}
                className="ml-auto rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-[0_0_30px_hsl(152_60%_45%/0.45)]"
              >
                Complete
              </motion.span>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function SuccessOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const particles = useMemo(
    () => Array.from({ length: 14 }, () => ({
      x: (Math.random() - 0.5) * 320,
      y: -60 - Math.random() * 140,
      r: Math.random() * 360,
      d: 0.1 + Math.random() * 0.4,
    })),
    [],
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="success-overlay"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative w-[calc(100%-1rem)] max-w-lg rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-[0_30px_80px_-20px_hsl(152_60%_30%/0.35)] sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              {particles.map((p, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{ opacity: [0, 1, 0], x: p.x, y: p.y, rotate: p.r }}
                  transition={{ duration: 1.6, delay: 0.3 + p.d, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/3 h-1.5 w-1.5 rounded-full bg-emerald-500"
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 320, damping: 16 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_0_0_10px_hsl(152_60%_45%/0.12),0_0_50px_hsl(152_60%_45%/0.45)]"
            >
              <CheckCircle2 className="h-8 w-8" strokeWidth={2.5} />
            </motion.div>

            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              <Sparkles className="h-3 w-3" /> Workflow complete
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              This wasn&apos;t a demo. It was your future workflow.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              One document saved minutes. Hundreds save weeks.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              You just watched Outworx process, validate, and publish a document automatically. Now imagine every invoice, receipt, statement, VAT review, and CIS deduction handled the same way.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_hsl(152_60%_45%/0.7)] transition hover:bg-emerald-700"
              >
                Get Started
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Pricing
              </Link>
            </div>

            <p className="mt-5 text-[11px] text-slate-400">
              Trusted by accountants, bookkeepers, and finance teams across growing businesses.
            </p>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function MissingInvoiceNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
      Generate a sample invoice on step 5 to populate this view.
    </div>
  );
}

/* -------------------- Sample invoice -------------------- */

function SampleInvoice({ invoice }: { invoice: Invoice }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 text-[11px] leading-relaxed text-slate-700 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="truncate text-[10px] font-bold uppercase tracking-wider text-emerald-700">{invoice.supplier.name}</div>
          <div className="truncate text-slate-500">{invoice.supplier.addr}</div>
          <div className="text-slate-500">VAT {invoice.supplier.vat}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold tracking-tight text-slate-900">INVOICE</div>
          <div className="text-slate-500">{invoice.number}</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
        <div>
          <div className="text-[9px] uppercase text-slate-400">Bill to</div>
          <div className="truncate font-medium text-slate-800">{invoice.customer.name}</div>
          <div className="truncate">{invoice.customer.addr}</div>
        </div>
        <div>
          <div className="text-[9px] uppercase text-slate-400">Issued · Due</div>
          <div>{invoice.issued} · {invoice.due}</div>
        </div>
      </div>
      <table className="mt-3 w-full">
        <thead className="text-[9px] uppercase text-slate-400">
          <tr><th className="py-1 text-left">Item</th><th className="text-right">Qty</th><th className="text-right">Unit</th><th className="text-right">Total</th></tr>
        </thead>
        <tbody>
          {invoice.lines.map((l, i) => (
            <tr key={l.d + i} className="border-t border-slate-100">
              <td className="py-1.5">{l.d}</td>
              <td className="text-right font-mono">{l.q}</td>
              <td className="text-right font-mono">£{l.u.toFixed(2)}</td>
              <td className="text-right font-mono">£{(l.q * l.u).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 ml-auto w-40 space-y-0.5 border-t border-slate-100 pt-2 text-right">
        <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="font-mono">£{invoice.subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">VAT {invoice.vatRate}%</span><span className="font-mono">£{invoice.vat.toFixed(2)}</span></div>
        <div className="flex justify-between border-t border-slate-100 pt-1 font-semibold text-slate-900"><span>Total</span><span className="font-mono">£{invoice.total.toFixed(2)}</span></div>
      </div>
    </div>
  );
}

/* -------------------- Default export wrapped with site chrome -------------------- */

const DashboardDemo = () => (
  <>
    <Seo
      title="View Demo — Outworx"
      description="Interactive walkthrough of the Outworx AI bookkeeping platform — see a real document move from inbox to ledger."
      path="/dashboard-demo"
      jsonLd={breadcrumbList([
        { name: "Home", path: "/" },
        { name: "View demo", path: "/dashboard-demo" },
      ])}
    />
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ViewDemo />
        </motion.div>
      </main>
      <Footer />
    </div>
  </>
);

export default DashboardDemo;

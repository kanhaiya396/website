import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";
import {
  Sparkles,
  Target,
  Users,
  Shield,
  ScanLine,
  Tags,
  ShieldCheck,
  Eye,
  ArrowRightCircle,
} from "lucide-react";
import { SectionReveal } from "@/components/landing/SectionReveal";

const values = [
  { icon: Sparkles, title: "AI-first", desc: "Models in every workflow, by default." },
  { icon: Shield, title: "Compliance by default", desc: "UK/EU GDPR, MTD, HMRC — baked in." },
  { icon: Users, title: "Built with accountants", desc: "Roadmap shaped by firms using us daily." },
  { icon: Target, title: "Outcomes, not features", desc: "Measured in hours returned and errors caught." },
];

const process = [
  {
    icon: ScanLine,
    title: "Capture",
    desc: "Documents arrive from email, WhatsApp, client portals and drag-and-drop — all landing in one unified queue.",
  },
  {
    icon: Tags,
    title: "Categorise",
    desc: "Line items are classified against your chart of accounts using historical posting context, not brittle per-supplier rules.",
  },
  {
    icon: ShieldCheck,
    title: "Validate",
    desc: "VAT numbers verified against HMRC and VIES, rates assigned per line, legislation notices attached automatically.",
  },
  {
    icon: Eye,
    title: "Review",
    desc: "An exception-first queue surfaces only what needs human eyes — with inline editing and full source attachments.",
  },
  {
    icon: ArrowRightCircle,
    title: "Post",
    desc: "One click pushes approved batches to Xero, QuickBooks, Sage or Nomi — with the source document attached.",
  },
];

const ukChips = ["VAT", "CIS", "Xero", "QuickBooks", "Sage", "Nomi"];

const stats: [string, string][] = [
  ["2.3M+", "Documents processed"],
  ["180+", "Firms onboarded"],
  ["99.4%", "Extraction accuracy"],
  ["12hrs", "Saved / bookkeeper / week"],
];

const About = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Seo
      title="About Outworx — AI bookkeeping built with accountants"
      description="Outworx is a UK team of engineers, accountants, and ML researchers rebuilding the bookkeeping back-office for the AI era."
      path="/about"
      jsonLd={breadcrumbList([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ])}
    />
    <Header />
    <main className="flex-1">
      {/* Hero */}
      <SectionReveal noMask>
        <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="eyebrow mb-4">About Outworx</div>
          <h1 className="font-display font-extrabold tracking-tight text-4xl md:text-6xl mb-6">
            Rebuilding the bookkeeping back-office{" "}
            <span className="text-serif text-primary">for the AI era.</span>
          </h1>
          <p className="text-[17px] md:text-[18px] text-muted-foreground leading-[1.6]">
            A UK team of engineers, accountants, and ML researchers — building the automation layer modern firms need.
          </p>
        </section>
      </SectionReveal>

      {/* Principles */}
      <SectionReveal>
        <section className="section-seam container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <div className="mb-10">
            <div className="eyebrow mb-4">Principles</div>
            <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl">
              What we <span className="text-serif text-primary">believe</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow-teal">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* Why we built Outworx */}
      <SectionReveal>
        <section className="section-seam container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="eyebrow mb-4">Why We Built Outworx</div>
          <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl">
            Accounting firms didn't need more data. <br />
            <span className="text-serif text-primary">They needed less manual work.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.7] text-muted-foreground">
            The accounting industry already had document storage, bookkeeping software and disconnected automation tools.
          </p>
          <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
            What was missing was a system that could capture documents, validate information, prepare transactions and help firms maintain ledger quality inside a single workflow.
          </p>
          <p className="mt-4 text-[17px] leading-[1.7] text-foreground/90">
            That's why Outworx exists.
          </p>
        </section>
      </SectionReveal>

      {/* Our process */}
      <SectionReveal>
        <section id="process" className="section-seam container mx-auto px-4 py-12 md:py-16 max-w-4xl scroll-mt-24">
          <div className="mb-12">
            <div className="eyebrow mb-4">Our Process</div>
            <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl">
              How <span className="text-serif text-primary">Outworx</span> works
            </h2>
            <p className="mt-5 text-[17px] leading-[1.7] text-muted-foreground max-w-2xl">
              Five clear stages — from inbox to posted transaction — with humans firmly in the loop.
            </p>
          </div>

          <ol className="relative border-l border-border/70 ml-3 space-y-8">
            {process.map((p) => (
              <li key={p.title} className="pl-8 relative">
                <span className="absolute -left-[18px] top-0 grid h-9 w-9 place-items-center rounded-full border border-border bg-card">
                  <p.icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                </span>
                <h3 className="font-display font-bold text-xl text-foreground/95">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground max-w-xl">
                  {p.desc}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </SectionReveal>

      {/* Built around UK accounting */}
      <SectionReveal>
        <section className="section-seam container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="eyebrow mb-4">UK Accounting</div>
          <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl">
            Built around UK accounting <span className="text-serif text-primary">realities.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.7] text-muted-foreground max-w-2xl">
            From VAT workflows and CIS processes to integrations with the tools firms already use, Outworx is designed around how UK accountants and bookkeepers actually work.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {ukChips.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-[13px] font-medium text-foreground/85"
              >
                {c}
              </span>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* Scoreboard */}
      <SectionReveal>
        <section className="section-seam section-tint">
          <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
            <div className="mb-10">
              <div className="eyebrow mb-4">By the numbers</div>
              <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl">
                The <span className="text-serif text-primary">scoreboard</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-extrabold text-3xl md:text-4xl text-primary">{n}</div>
                  <div className="text-[14px] text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>
    </main>
    <Footer />
  </div>
);

export default About;

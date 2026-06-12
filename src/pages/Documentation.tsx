import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  FileDown,
  Presentation,
  Cpu,
  Database,
  Shield,
  Globe,
  Zap,
  Layers,
  Eye,
  Brain,
  ArrowRight,
  CheckCircle2,
  Server,
  Code2,
  Lock,
  BarChart3,
  Mail,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────

const TECH_STACK = [
  { layer: "Frontend", items: ["React 18 (TypeScript)", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion", "React Query", "React Router v6", "Recharts"] },
  { layer: "Backend", items: ["PostgreSQL (Row-Level Security)", "Deno Edge Functions", "Realtime Subscriptions", "pg_cron job scheduler"] },
  { layer: "AI Engine", items: ["Google Gemini 2.5 Flash", "Multi-modal OCR", "JSON structured output", "Retry with exponential back-off"] },
  { layer: "Integrations", items: ["Xero (OAuth 2.0)", "HMRC VAT verification", "VIES EU VAT check", "Twilio WhatsApp", "Email webhook ingestion"] },
  { layer: "Security", items: ["Row-Level Security (RLS)", "Service-role key isolation", "JWT auth", "OTP verification"] },
];

const AI_PIPELINE_STEPS = [
  { step: 1, title: "Document Ingestion", desc: "Upload via UI, email webhook, or WhatsApp. File is Base64-encoded and queued as a document_job.", icon: Mail },
  { step: 2, title: "Job Queue Processing", desc: "Edge function claims next queued job with atomic update. Retry-safe with pg_cron fallback every 5 minutes.", icon: RefreshCw },
  { step: 3, title: "AI Extraction", desc: "Google Gemini 2.5 Flash processes the document image/PDF with structured JSON output for invoices, receipts, and bank statements.", icon: Brain },
  { step: 4, title: "Post-Processing", desc: "JSON repair for truncated responses, key normalisation, balance-based IN/OUT validation for bank statements, confidence scoring.", icon: Zap },
  { step: 5, title: "Data Storage", desc: "Extracted data saved to document_jobs table. Base64 file data cleared to save space. Transaction tracking logged.", icon: Database },
  { step: 6, title: "Integration Push", desc: "Optional push to Xero as draft bills/invoices. VAT numbers verified against HMRC/VIES APIs.", icon: Globe },
];

const DB_TABLES = [
  { name: "documents", desc: "Core document store with extracted data, file metadata, vendor info, and duplicate tracking" },
  { name: "document_jobs", desc: "Async processing queue with status tracking, retry attempts, and extracted results" },
  { name: "document_transactions", desc: "Usage tracking per document — page counts, transaction counts, timestamps" },
  { name: "document_usage", desc: "Credit consumption tracking per user and document type" },
  { name: "clients", desc: "Multi-tenant client management for accountants with currency and tax settings" },
  { name: "profiles", desc: "User profiles with default currency, contact info, and preferences" },
  { name: "user_roles", desc: "Role-based access: admin, accountant, user — enforced via RLS" },
  { name: "integrations", desc: "OAuth tokens and settings for Xero and other third-party connections" },
  { name: "rules", desc: "User-defined automation rules with conditions and actions" },
  { name: "subscription_plans / user_subscriptions", desc: "Plan management with quarterly limits, overage costs, and billing periods" },
];

const CATEGORIES = [
  "Travel", "Software License", "Cleaning Services", "Office Supplies", "Utilities",
  "Professional Services", "Marketing & Advertising", "Insurance", "Rent & Property",
  "Equipment & Hardware", "Food & Beverages", "Subscriptions", "Telecommunications",
  "Postage & Shipping", "Training & Education", "Legal & Compliance", "Bank Charges",
  "Entertainment", "Repairs & Maintenance", "Miscellaneous",
];

// ─── Download helpers ────────────────────────────────────────────────

async function downloadPDF() {
  toast.info("Generating PDF…");
  const { default: html2canvas } = await import("html2canvas");
  const { jsPDF } = await import("jspdf");

  const el = document.getElementById("docs-content");
  if (!el) return;

  const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = (canvas.height * pdfW) / canvas.width;

  let position = 0;
  const pageH = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, "PNG", 0, position, pdfW, pdfH);
  let remainingH = pdfH - pageH;
  while (remainingH > 0) {
    position -= pageH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfW, pdfH);
    remainingH -= pageH;
  }

  pdf.save("OutWorx_Architecture_Document.pdf");
  toast.success("PDF downloaded!");
}

async function downloadPPTX() {
  toast.info("Generating PPTX…");
  const PptxGenJS = (await import("pptxgenjs")).default;
  const pptx = new PptxGenJS();
  pptx.author = "OutWorx";
  pptx.title = "OutWorx — Technical Architecture";

  const brandColor = "1a1a2e";
  const accentColor = "16a34a";
  const lightBg = "f0fdf4";

  // Slide 1 — Title
  let slide = pptx.addSlide();
  slide.background = { color: brandColor };
  slide.addText("OutWorx", { x: 0.8, y: 1.5, w: 8.4, h: 1.2, fontSize: 44, bold: true, color: "FFFFFF", fontFace: "Arial" });
  slide.addText("Technical Architecture & AI Processing", { x: 0.8, y: 2.7, w: 8.4, h: 0.8, fontSize: 22, color: accentColor, fontFace: "Arial" });
  slide.addText("Intelligent Document Processing Platform", { x: 0.8, y: 3.6, w: 8.4, h: 0.6, fontSize: 16, color: "CCCCCC", fontFace: "Arial" });

  // Slide 2 — Tech Stack
  slide = pptx.addSlide();
  slide.addText("Technology Stack", { x: 0.5, y: 0.3, w: 9, h: 0.7, fontSize: 28, bold: true, color: brandColor });
  TECH_STACK.forEach((layer, i) => {
    const y = 1.2 + i * 0.9;
    slide.addText(layer.layer, { x: 0.5, y, w: 2, h: 0.4, fontSize: 14, bold: true, color: accentColor });
    slide.addText(layer.items.join("  •  "), { x: 2.6, y, w: 7, h: 0.7, fontSize: 11, color: "333333", wrap: true });
  });

  // Slide 3 — AI Pipeline
  slide = pptx.addSlide();
  slide.background = { color: lightBg };
  slide.addText("AI Processing Pipeline", { x: 0.5, y: 0.3, w: 9, h: 0.7, fontSize: 28, bold: true, color: brandColor });
  AI_PIPELINE_STEPS.forEach((s, i) => {
    const y = 1.2 + i * 0.8;
    slide.addText(`${s.step}. ${s.title}`, { x: 0.5, y, w: 3, h: 0.35, fontSize: 13, bold: true, color: brandColor });
    slide.addText(s.desc, { x: 3.6, y, w: 6, h: 0.7, fontSize: 10, color: "444444", wrap: true });
  });

  // Slide 4 — Database Schema
  slide = pptx.addSlide();
  slide.addText("Database Schema", { x: 0.5, y: 0.3, w: 9, h: 0.7, fontSize: 28, bold: true, color: brandColor });
  DB_TABLES.forEach((t, i) => {
    const y = 1.1 + i * 0.55;
    slide.addText(t.name, { x: 0.5, y, w: 3.2, h: 0.35, fontSize: 11, bold: true, color: accentColor, fontFace: "Courier New" });
    slide.addText(t.desc, { x: 3.8, y, w: 5.8, h: 0.5, fontSize: 10, color: "444444", wrap: true });
  });

  // Slide 5 — Security & Multi-tenancy
  slide = pptx.addSlide();
  slide.background = { color: brandColor };
  slide.addText("Security & Multi-Tenancy", { x: 0.5, y: 0.3, w: 9, h: 0.7, fontSize: 28, bold: true, color: "FFFFFF" });
  const secItems = [
    "Row-Level Security (RLS) on every table — data isolation by user_id / accountant_id",
    "JWT-based authentication with OTP phone verification",
    "Service-role keys isolated to server-side Edge Functions only",
    "Multi-tenant architecture: Accountants manage multiple clients with full data separation",
    "Duplicate detection prevents double-processing of identical documents",
    "Role-based access control: Admin → Accountant → User hierarchy",
  ];
  secItems.forEach((item, i) => {
    slide.addText(`✓  ${item}`, { x: 0.8, y: 1.3 + i * 0.7, w: 8.4, h: 0.6, fontSize: 13, color: "DDDDDD", wrap: true });
  });

  // Slide 6 — Categories & Classification
  slide = pptx.addSlide();
  slide.addText("Auto-Classification Categories", { x: 0.5, y: 0.3, w: 9, h: 0.7, fontSize: 28, bold: true, color: brandColor });
  slide.addText("AI automatically classifies every document into one of 20 expense categories:", { x: 0.5, y: 1.0, w: 9, h: 0.5, fontSize: 13, color: "555555" });
  const cols = 4;
  CATEGORIES.forEach((cat, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    slide.addText(`• ${cat}`, { x: 0.5 + col * 2.3, y: 1.7 + row * 0.45, w: 2.2, h: 0.4, fontSize: 11, color: "333333" });
  });

  await pptx.writeFile({ fileName: "OutWorx_Architecture.pptx" });
  toast.success("PPTX downloaded!");
}

// ─── Component ───────────────────────────────────────────────────────

export default function Documentation() {
  const [downloading, setDownloading] = useState<"pdf" | "pptx" | null>(null);

  const handleDownload = async (type: "pdf" | "pptx") => {
    setDownloading(type);
    try {
      if (type === "pdf") await downloadPDF();
      else await downloadPPTX();
    } catch (e) {
      toast.error("Download failed");
      console.error(e);
    }
    setDownloading(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Documentation — Outworx"
        description="Product documentation, integration guides, and onboarding resources for Outworx AI bookkeeping."
        path="/docs"
      />
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">OutWorx Architecture</h1>
            <p className="text-muted-foreground mt-1">Technical documentation · AI pipeline · Database schema</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleDownload("pdf")} disabled={downloading === "pdf"}>
              <FileDown className="h-4 w-4 mr-2" />
              {downloading === "pdf" ? "Generating…" : "Download PDF"}
            </Button>
            <Button onClick={() => handleDownload("pptx")} disabled={downloading === "pptx"} className="bg-primary text-primary-foreground">
              <Presentation className="h-4 w-4 mr-2" />
              {downloading === "pptx" ? "Generating…" : "Download PPTX"}
            </Button>
          </div>
        </div>

        {/* Printable content area */}
        <div id="docs-content" className="space-y-10 bg-background text-foreground">

          {/* ── Section: Overview ── */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Platform Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong className="text-foreground">OutWorx</strong> is an intelligent document processing platform designed for accountants and businesses.
                It automates the extraction, classification, and management of financial documents — invoices, receipts, and bank statements —
                using multi-modal AI vision to handle both printed and handwritten content.
              </p>
              <p>
                Documents can be ingested via direct upload, email forwarding, or WhatsApp messaging. The platform supports multi-tenant
                client management, Xero accounting integration, HMRC/VIES VAT verification, and automated expense categorisation across 20 categories.
              </p>
            </CardContent>
          </Card>

          {/* ── Section: Tech Stack ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Technology Stack</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {TECH_STACK.map((layer) => {
                const iconMap: Record<string, React.ReactNode> = {
                  Frontend: <Code2 className="h-4 w-4" />,
                  Backend: <Server className="h-4 w-4" />,
                  "AI Engine": <Brain className="h-4 w-4" />,
                  Integrations: <Globe className="h-4 w-4" />,
                  Security: <Shield className="h-4 w-4" />,
                };
                return (
                  <Card key={layer.layer} className="border-border">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="text-primary">{iconMap[layer.layer]}</div>
                        <CardTitle className="text-base">{layer.layer}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1.5">
                        {layer.items.map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs font-normal">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* ── Section: AI Pipeline ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">AI Processing Pipeline</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              End-to-end flow from document ingestion to structured data output and optional accounting integration.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {AI_PIPELINE_STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <Card key={s.step} className="relative border-border overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/60" />
                    <CardContent className="pt-5 pl-5">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">Step {s.step}</Badge>
                            <span className="font-medium text-sm text-foreground">{s.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* ── Section: AI Model Details ── */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">AI Model & Extraction Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Model Configuration</h4>
                  <ul className="space-y-1.5 text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Google Gemini 2.5 Flash — multi-modal vision</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> 65,536 max output tokens</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> JSON structured response format</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Retry with exponential back-off (3 attempts)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Extraction Capabilities</h4>
                  <ul className="space-y-1.5 text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Single & multi-invoice PDFs</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Bank statements with balance validation</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Handwritten document OCR</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> Auto-category classification (20 categories)</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Post-Processing</h4>
                <div className="flex flex-wrap gap-2">
                  {["Truncated JSON repair", "Key normalisation", "IN/OUT balance validation", "Confidence scoring (0-100)", "Currency default fallback", "Credit/discount extraction"].map((f) => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* ── Section: Database ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Database Schema</h2>
            </div>
            <div className="grid gap-3">
              {DB_TABLES.map((t) => (
                <div key={t.name} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card">
                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded text-primary whitespace-nowrap">{t.name}</code>
                  <span className="text-sm text-muted-foreground">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* ── Section: Security ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Security & Multi-Tenancy</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: "Row-Level Security", desc: "Every table enforces RLS policies. Data is isolated by user_id and accountant_id." },
                { title: "JWT Authentication", desc: "All API calls are authenticated via JWT tokens with OTP phone verification support." },
                { title: "Service-Role Isolation", desc: "Private keys are server-side only, used exclusively in Edge Functions." },
                { title: "Multi-Tenant Architecture", desc: "Accountants manage multiple clients with full data separation per tenant." },
                { title: "Duplicate Detection", desc: "Automatic detection prevents double-processing of identical documents." },
                { title: "Role-Based Access", desc: "Admin → Accountant → User hierarchy with granular permission control." },
              ].map((item) => (
                <Card key={item.title} className="border-border">
                  <CardContent className="pt-4 pb-4">
                    <h4 className="font-medium text-sm text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* ── Section: Categories ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Auto-Classification Categories</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Every document is automatically classified into one of these 20 expense categories by the AI engine. Users can override the classification manually.
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Badge key={cat} variant="outline" className="text-xs">{cat}</Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* ── Section: Ingestion Channels ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Ingestion Channels</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Globe, title: "Web Upload", desc: "Drag-and-drop or file picker in the Documents page. Supports PDF, JPEG, PNG, WebP." },
                { icon: Mail, title: "Email Forwarding", desc: "Forward documents to a dedicated inbox. The email-webhook Edge Function processes attachments automatically." },
                { icon: MessageSquare, title: "WhatsApp", desc: "Send photos of receipts/invoices to +44 7414 141631 on WhatsApp. Documents are automatically extracted and saved." },
              ].map((ch) => {
                const Icon = ch.icon;
                return (
                  <Card key={ch.title} className="border-border">
                    <CardContent className="pt-5">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-medium text-sm text-foreground mb-1">{ch.title}</h4>
                      <p className="text-xs text-muted-foreground">{ch.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

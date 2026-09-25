import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { SmoothNavLink } from "@/components/SmoothNavLink";
import { breadcrumbList } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  Globe,
  Mail,
  MessageSquare,
  ArrowRight,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Send,
  BarChart3,
  Lock,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────

const STEPS = [
  { step: 1, title: "Send documents", desc: "Upload in the app, forward by email, or send a photo on WhatsApp.", icon: Mail },
  { step: 2, title: "AI extraction", desc: "Supplier, dates, VAT, line items and totals are read from invoices, receipts and bank statements.", icon: Brain },
  { step: 3, title: "Checks", desc: "VAT numbers are verified against HMRC and VIES, duplicates are flagged, and bank statement balances are checked.", icon: CheckCircle2 },
  { step: 4, title: "Review", desc: "Everything lands in a review queue. You check and edit before anything leaves Outworx.", icon: ClipboardCheck },
  { step: 5, title: "Post to your ledger", desc: "Approved documents post to your accounting software with the source file attached.", icon: Send },
];

const EXTRACTS = [
  "Single & multi-invoice PDFs",
  "Receipts, including handwritten ones",
  "Bank statements with balance checks",
  "Supplier details & VAT numbers",
  "Line items, credits & discounts",
  "Confidence score on every field",
];

const CATEGORIES = [
  "Travel", "Software License", "Cleaning Services", "Office Supplies", "Utilities",
  "Professional Services", "Marketing & Advertising", "Insurance", "Rent & Property",
  "Equipment & Hardware", "Food & Beverages", "Subscriptions", "Telecommunications",
  "Postage & Shipping", "Training & Education", "Legal & Compliance", "Bank Charges",
  "Entertainment", "Repairs & Maintenance", "Miscellaneous",
];

const CHANNELS = [
  { icon: Globe, title: "Web Upload", desc: "Drag-and-drop or file picker in the Documents page. Supports PDF, JPEG, PNG, WebP." },
  { icon: Mail, title: "Email Forwarding", desc: "Forward documents to your dedicated Outworx inbox. Attachments are processed automatically." },
  { icon: MessageSquare, title: "WhatsApp", desc: "Send photos of receipts/invoices to +44 7414 141631 on WhatsApp. Documents are automatically extracted and saved." },
];

// ─── Component ───────────────────────────────────────────────────────

export default function Documentation() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Documentation — Outworx"
        description="Product documentation, integration guides, and onboarding resources for Outworx AI bookkeeping."
        path="/docs"
        jsonLd={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/docs" },
        ])}
      />
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Documentation</h1>
          <p className="text-muted-foreground mt-1">How Outworx works · What it extracts · Integrations</p>
        </div>

        <div className="space-y-10">
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
                <strong className="text-foreground">Outworx</strong> is a document processing platform for accountants and businesses.
                It automates the extraction, classification and review of financial documents — invoices, receipts and bank statements —
                using AI that reads both printed and handwritten content.
              </p>
              <p>
                Documents can be sent by direct upload, email forwarding or WhatsApp. Outworx supports multi-client
                management for practices, HMRC/VIES VAT verification, and posting to Xero and other accounting software.
              </p>
            </CardContent>
          </Card>

          {/* ── Section: How it works ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">How it works</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((s) => {
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

          {/* ── Section: Ingestion Channels ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Ingestion Channels</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {CHANNELS.map((ch) => {
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

          <Separator />

          {/* ── Section: What Outworx extracts ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">What Outworx extracts</h2>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
              {EXTRACTS.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-1 flex-shrink-0" /> {e}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* ── Section: Categories ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Suggested categories</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Outworx suggests one of these categories for each document to speed up review. You can change it,
              and when you post, accounts and tax rates come from your own ledger.
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Badge key={cat} variant="outline" className="text-xs">{cat}</Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* ── Section: Integrations & security ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border">
              <CardContent className="pt-5">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-medium text-sm text-foreground mb-1">Xero integration</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Connecting, mapping, posting, troubleshooting and disconnecting.
                </p>
                <SmoothNavLink to="/integrations/xero" className="text-sm font-medium text-primary hover:underline">
                  Read the Xero guide →
                </SmoothNavLink>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-5">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-medium text-sm text-foreground mb-1">Security & data protection</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Hosting, encryption, access controls and our Data Processing Agreement.
                </p>
                <SmoothNavLink to="/security" className="text-sm font-medium text-primary hover:underline">
                  Read about security →
                </SmoothNavLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

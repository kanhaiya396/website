import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Copy,
  Check,
  ChevronRight,
  FileText,
  Upload,
  Search,
  RefreshCw,
  Trash2,
  Link2,
  Shield,
  Zap,
  Globe,
  Key,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { SmoothNavLink } from "@/components/SmoothNavLink";
import { authUrl } from "@/lib/appUrl";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Endpoint {
  id: string;
  method: HttpMethod;
  path: string;
  title: string;
  description: string;
  category: string;
  requestBody?: string;
  responseBody: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
}

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  POST: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
};

const endpoints: Endpoint[] = [
  {
    id: "upload-document",
    method: "POST",
    path: "/v1/documents",
    title: "Upload Document",
    description: "Upload an invoice, receipt, or expense document for AI-powered extraction. Supports PDF, JPEG, PNG, and HEIC formats up to 25 MB.",
    category: "Documents",
    requestBody: `{
  "file_name": "invoice-2024-001.pdf",
  "file_type": "application/pdf",
  "file_data": "<base64-encoded-content>",
  "client_id": "c9a2f3e1-...",
  "source": "api"
}`,
    responseBody: `{
  "id": "d7b4e8f2-1a3c-4d5e-9f6a-7b8c9d0e1f2a",
  "status": "processing",
  "file_name": "invoice-2024-001.pdf",
  "created_at": "2026-03-11T10:30:00Z",
  "estimated_completion": "~15 seconds"
}`,
    params: [
      { name: "file_name", type: "string", required: true, description: "Original file name with extension" },
      { name: "file_type", type: "string", required: true, description: "MIME type of the document" },
      { name: "file_data", type: "string", required: true, description: "Base64-encoded file content" },
      { name: "client_id", type: "uuid", required: false, description: "Associate document with a client" },
      { name: "source", type: "string", required: false, description: "Origin identifier (default: 'api')" },
    ],
  },
  {
    id: "get-document",
    method: "GET",
    path: "/v1/documents/{id}",
    title: "Get Document",
    description: "Retrieve a document's extracted data including vendor name, amounts, line items, dates, and VAT breakdown.",
    category: "Documents",
    responseBody: `{
  "id": "d7b4e8f2-...",
  "status": "completed",
  "file_name": "invoice-2024-001.pdf",
  "document_type": "invoice",
  "vendor_name": "Acme Supplies Ltd",
  "amount": 1250.00,
  "currency": "GBP",
  "document_date": "2026-03-01",
  "due_date": "2026-03-31",
  "confidence_score": 0.97,
  "extracted_data": {
    "invoice_number": "INV-2024-001",
    "vat_number": "GB123456789",
    "vat_amount": 250.00,
    "net_amount": 1000.00,
    "line_items": [
      {
        "description": "Office Supplies",
        "quantity": 10,
        "unit_price": 100.00,
        "amount": 1000.00
      }
    ]
  }
}`,
    params: [
      { name: "id", type: "uuid", required: true, description: "Document ID returned from upload" },
    ],
  },
  {
    id: "list-documents",
    method: "GET",
    path: "/v1/documents",
    title: "List Documents",
    description: "Retrieve a paginated list of documents with optional filtering by status, type, client, and date range.",
    category: "Documents",
    responseBody: `{
  "data": [
    {
      "id": "d7b4e8f2-...",
      "file_name": "invoice-2024-001.pdf",
      "status": "completed",
      "vendor_name": "Acme Supplies Ltd",
      "amount": 1250.00,
      "document_date": "2026-03-01",
      "created_at": "2026-03-11T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 25,
    "total": 142,
    "total_pages": 6
  }
}`,
    params: [
      { name: "page", type: "integer", required: false, description: "Page number (default: 1)" },
      { name: "per_page", type: "integer", required: false, description: "Results per page (default: 25, max: 100)" },
      { name: "status", type: "string", required: false, description: "Filter: pending, processing, completed, failed" },
      { name: "client_id", type: "uuid", required: false, description: "Filter by client ID" },
      { name: "from_date", type: "date", required: false, description: "Filter documents from this date" },
      { name: "to_date", type: "date", required: false, description: "Filter documents to this date" },
    ],
  },
  {
    id: "delete-document",
    method: "DELETE",
    path: "/v1/documents/{id}",
    title: "Delete Document",
    description: "Permanently delete a document and its extracted data. This action cannot be undone.",
    category: "Documents",
    responseBody: `{
  "success": true,
  "message": "Document deleted successfully"
}`,
    params: [
      { name: "id", type: "uuid", required: true, description: "Document ID to delete" },
    ],
  },
  {
    id: "list-suppliers",
    method: "GET",
    path: "/v1/suppliers",
    title: "List Suppliers",
    description: "Retrieve all auto-detected suppliers with their aggregated spend data, aliases, and default accounting codes.",
    category: "Suppliers",
    responseBody: `{
  "data": [
    {
      "id": "s1a2b3c4-...",
      "canonical_name": "Acme Supplies Ltd",
      "aliases": ["ACME SUPPLIES", "Acme Ltd"],
      "document_count": 24,
      "total_amount": 18750.00,
      "default_vat_rate": "20%",
      "default_account_code": "5000",
      "last_document_date": "2026-03-10"
    }
  ],
  "total": 87
}`,
    params: [
      { name: "client_id", type: "uuid", required: false, description: "Filter by client ID" },
      { name: "search", type: "string", required: false, description: "Search by supplier name or alias" },
    ],
  },
  {
    id: "push-to-xero",
    method: "POST",
    path: "/v1/integrations/xero/push",
    title: "Push to Xero",
    description: "Push an extracted document to Xero as a bill or invoice. Requires an active Xero connection.",
    category: "Integrations",
    requestBody: `{
  "document_id": "d7b4e8f2-...",
  "account_code": "5000",
  "tracking_categories": {
    "Department": "Marketing"
  }
}`,
    responseBody: `{
  "success": true,
  "xero_invoice_id": "xi-a1b2c3d4-...",
  "status": "AUTHORISED",
  "invoice_number": "INV-2024-001"
}`,
    params: [
      { name: "document_id", type: "uuid", required: true, description: "Outworx document ID to push" },
      { name: "account_code", type: "string", required: false, description: "Override Chart of Accounts code" },
      { name: "tracking_categories", type: "object", required: false, description: "Xero tracking category key/value pairs" },
    ],
  },
  {
    id: "push-to-quickbooks",
    method: "POST",
    path: "/v1/integrations/quickbooks/push",
    title: "Push to QuickBooks",
    description: "Push an extracted document to QuickBooks Online as a Bill or Invoice with automatic vendor/customer matching.",
    category: "Integrations",
    requestBody: `{
  "document_id": "d7b4e8f2-...",
  "account_id": "42",
  "class_ref": "Marketing"
}`,
    responseBody: `{
  "success": true,
  "quickbooks_id": "189",
  "entity_type": "Bill",
  "vendor": "Acme Supplies Ltd"
}`,
    params: [
      { name: "document_id", type: "uuid", required: true, description: "Outworx document ID to push" },
      { name: "account_id", type: "string", required: false, description: "Override QuickBooks account" },
      { name: "class_ref", type: "string", required: false, description: "QuickBooks class reference" },
    ],
  },
  {
    id: "verify-vat",
    method: "POST",
    path: "/v1/vat/verify",
    title: "Verify VAT Number",
    description: "Validate a UK or EU VAT number against HMRC and VIES registries in real-time.",
    category: "VAT",
    requestBody: `{
  "vat_number": "GB123456789",
  "country_code": "GB"
}`,
    responseBody: `{
  "valid": true,
  "vat_number": "GB123456789",
  "name": "Acme Supplies Ltd",
  "address": "123 Business Rd, London, EC1A 1BB",
  "country": "United Kingdom",
  "verified_at": "2026-03-11T10:32:00Z"
}`,
    params: [
      { name: "vat_number", type: "string", required: true, description: "VAT registration number" },
      { name: "country_code", type: "string", required: false, description: "ISO country code (auto-detected if prefixed)" },
    ],
  },
];

const categories = [...new Set(endpoints.map((e) => e.category))];

const codeExamples: Record<string, (ep: Endpoint) => string> = {
  curl: (ep) => {
    const method = ep.method === "GET" ? "" : ` -X ${ep.method}`;
    const body = ep.requestBody
      ? ` \\\n  -H "Content-Type: application/json" \\\n  -d '${ep.requestBody.replace(/\n/g, "\n  ")}'`
      : "";
    return `curl${method} "https://api.outworx.ai${ep.path}" \\
  -H "Authorization: Bearer YOUR_API_KEY"${body}`;
  },
  javascript: (ep) => {
    const opts = ep.requestBody
      ? `,\n  {\n    method: "${ep.method}",\n    headers: {\n      "Authorization": "Bearer YOUR_API_KEY",\n      "Content-Type": "application/json"\n    },\n    body: JSON.stringify(${ep.requestBody.replace(/\n/g, "\n    ")})\n  }`
      : `,\n  {\n    headers: { "Authorization": "Bearer YOUR_API_KEY" }\n  }`;
    return `const response = await fetch(
  "https://api.outworx.ai${ep.path}"${opts}
);

const data = await response.json();
console.log(data);`;
  },
  python: (ep) => {
    const body = ep.requestBody ? `\n\npayload = ${ep.requestBody}\n\nresponse = requests.${ep.method.toLowerCase()}(url, headers=headers, json=payload)` : `\n\nresponse = requests.${ep.method.toLowerCase()}(url, headers=headers)`;
    return `import requests

url = "https://api.outworx.ai${ep.path}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}${body}

print(response.json())`;
  },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative">
      <CopyButton text={code} />
      <pre className="bg-[hsl(210,30%,6%)] border border-border rounded-lg p-4 overflow-x-auto text-sm font-mono text-muted-foreground leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function EndpointDetail({ endpoint }: { endpoint: Endpoint }) {
  const [lang, setLang] = useState("curl");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline" className={cn("font-mono text-xs font-bold px-2 py-0.5 border", METHOD_COLORS[endpoint.method])}>
            {endpoint.method}
          </Badge>
          <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
        </div>
        <h2 className="text-2xl font-bold font-display mb-2">{endpoint.title}</h2>
        <p className="text-muted-foreground">{endpoint.description}</p>
      </div>

      {/* Parameters */}
      {endpoint.params && endpoint.params.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Parameters</h3>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Required</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Description</th>
                </tr>
              </thead>
              <tbody>
                {endpoint.params.map((p, i) => (
                  <tr key={p.name} className={cn(i % 2 === 0 ? "bg-card" : "bg-card/50")}>
                    <td className="p-3 font-mono text-primary text-xs">{p.name}</td>
                    <td className="p-3 font-mono text-xs text-muted-foreground">{p.type}</td>
                    <td className="p-3">
                      {p.required ? (
                        <Badge variant="outline" className="text-xs border-primary/40 text-primary">Required</Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Optional</span>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code Examples */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Request Example</h3>
        <Tabs value={lang} onValueChange={setLang}>
          <TabsList className="bg-secondary/50 mb-3">
            <TabsTrigger value="curl" className="text-xs">cURL</TabsTrigger>
            <TabsTrigger value="javascript" className="text-xs">JavaScript</TabsTrigger>
            <TabsTrigger value="python" className="text-xs">Python</TabsTrigger>
          </TabsList>
          {Object.keys(codeExamples).map((key) => (
            <TabsContent key={key} value={key}>
              <CodeBlock code={codeExamples[key](endpoint)} />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Response */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Response</h3>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs">200 OK</Badge>
        </div>
        <CodeBlock code={endpoint.responseBody} />
      </div>
    </motion.div>
  );
}

export default function ApiDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState(endpoints[0].id);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const selectedEndpoint = endpoints.find((e) => e.id === activeEndpoint)!;

  const filteredEndpoints = activeCategory
    ? endpoints.filter((e) => e.category === activeCategory)
    : endpoints;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="API reference — Outworx"
        description="REST API reference for Outworx: document ingestion, OCR results, categorisation, and integration webhooks."
        path="/api-docs"
        jsonLd={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "API reference", path: "/api-docs" },
        ])}
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-xs border-primary/40 text-primary px-3 py-1">
                  <Code2 className="h-3 w-3 mr-1.5" />
                  REST API v1
                </Badge>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                Build with the{" "}
                <span className="text-primary">Outworx API</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                Integrate AI-powered document extraction, supplier intelligence, 
                and accounting sync directly into your workflows. Process invoices, 
                receipts, and expenses at scale.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={authUrl()}>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Key className="h-4 w-4 mr-2" />
                    Get API Key
                  </Button>
                </a>
                <a href="#explorer">
                  <Button size="lg" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explore Endpoints
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "AI Extraction", desc: "Extract vendor, amount, dates, line items, and VAT from any document in under 15 seconds." },
              { icon: Shield, title: "Enterprise Security", desc: "Bearer token auth, TLS 1.3, RLS-protected data, and full audit logging on every request." },
              { icon: Globe, title: "Accounting Sync", desc: "Push extracted data to Xero or QuickBooks with a single API call. Full two-way sync." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <Card className="h-full border-border/60 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Authentication Section */}
        <section className="container mx-auto px-4 py-8">
          <Card className="border-border/60">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold">Authentication</h2>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                All API requests require a Bearer token in the <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono">Authorization</code> header.
                Generate your API key from your Outworx dashboard under Settings → API Keys.
              </p>
              <CodeBlock
                code={`curl "https://api.outworx.ai/v1/documents" \\
  -H "Authorization: Bearer owx_sk_live_a1b2c3d4e5f6..."
  
# API keys use the prefix:
#   owx_sk_live_  →  Production
#   owx_sk_test_  →  Sandbox (no billing)`}
              />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Rate limit: <strong className="text-foreground">1,000 req/min</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Max upload: <strong className="text-foreground">25 MB per file</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Webhooks: <strong className="text-foreground">Real-time events</strong></span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Endpoint Explorer */}
        <section id="explorer" className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Endpoint Explorer</h2>
              <p className="text-sm text-muted-foreground">Browse and test every endpoint interactively</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <Button
              size="sm"
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => setActiveCategory(null)}
              className={cn(activeCategory === null && "bg-primary text-primary-foreground")}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={cn(activeCategory === cat && "bg-primary text-primary-foreground")}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="space-y-1 sticky top-20">
                {filteredEndpoints.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => setActiveEndpoint(ep.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm",
                      activeEndpoint === ep.id
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-mono text-[10px] font-bold px-1.5 py-0 border shrink-0 min-w-[52px] justify-center",
                        METHOD_COLORS[ep.method]
                      )}
                    >
                      {ep.method}
                    </Badge>
                    <span className="truncate">{ep.title}</span>
                    {activeEndpoint === ep.id && (
                      <ChevronRight className="h-3.5 w-3.5 ml-auto shrink-0 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-8 xl:col-span-9">
              <Card className="border-border/60">
                <CardContent className="p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    <EndpointDetail key={selectedEndpoint.id} endpoint={selectedEndpoint} />
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Webhooks Section */}
        <section className="container mx-auto px-4 py-12">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-border/60">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-2xl font-bold">Webhooks</h3>
                  </div>
                  <p className="text-muted-foreground max-w-xl mb-4">
                    Receive real-time notifications when documents finish processing, 
                    exceptions are detected, or accounting sync completes. Configure 
                    webhook endpoints in your dashboard.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["document.completed", "document.failed", "supplier.created", "integration.synced", "exception.detected"].map((ev) => (
                      <Badge key={ev} variant="outline" className="font-mono text-xs border-primary/30 text-primary">
                        {ev}
                      </Badge>
                    ))}
                  </div>
                </div>
                <a href={authUrl()}>
                  <Button variant="outline" size="lg">
                    Configure Webhooks
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SDKs & CTA */}
        <section className="container mx-auto px-4 py-12 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/60">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold mb-3">Official SDKs</h3>
                <p className="text-sm text-muted-foreground mb-4">Coming soon — native client libraries for popular languages.</p>
                <div className="space-y-2">
                  {["JavaScript / TypeScript", "Python", "Ruby", "PHP"].map((sdk) => (
                    <div key={sdk} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                      {sdk}
                      <Badge variant="outline" className="text-[10px] ml-auto">Coming Soon</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-display text-xl font-bold mb-3">Ready to Integrate?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Sign up for an Outworx account to generate your API key. 
                    Start with the sandbox environment — no billing until you go live.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a href={authUrl()}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Key className="h-4 w-4 mr-2" />
                      Get API Key
                    </Button>
                  </a>
                  <a href="mailto:api@outworx.ai">
                    <Button variant="outline">
                      Contact Sales
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

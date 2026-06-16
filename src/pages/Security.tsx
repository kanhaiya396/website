import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";
import { Shield, Lock, Server, FileCheck, KeyRound, Users } from "lucide-react";

const items = [
  { icon: Shield, title: "SOC 2 Type II", desc: "Annual audit covering security, availability, and confidentiality. Report available under NDA." },
  { icon: Lock, title: "Encryption everywhere", desc: "TLS 1.3 in transit, AES-256 at rest. Customer data is encrypted with per-tenant keys." },
  { icon: Server, title: "UK & EU hosting", desc: "All production data stored in AWS eu-west-2 (London). No transfers outside the UK/EEA without explicit consent." },
  { icon: FileCheck, title: "UK & EU GDPR", desc: "Standard contractual clauses, full DPA available, sub-processor list maintained at /privacy." },
  { icon: KeyRound, title: "SSO & MFA", desc: "SAML SSO available on Business plans. TOTP and WebAuthn supported for all users." },
  { icon: Users, title: "Least-privilege access", desc: "Production access is role-based, logged, and reviewed quarterly. No customer data on engineer laptops." },
];

const Security = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Seo
      title="Security at Outworx — SOC 2, GDPR, UK & EU hosting"
      description="How Outworx secures customer data: SOC 2 Type II, AES-256 at rest, TLS 1.3 in transit, UK/EU hosting, SSO and MFA."
      path="/security"
      jsonLd={breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Security", path: "/security" },
      ])}
    />
    <Header />
    <main className="flex-1">
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <p className="text-sm font-medium text-primary mb-3">Security</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Your clients' data, treated as if it were ours.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Outworx is built for regulated workflows. Here's how we keep your firm and your clients safe.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-20 max-w-5xl">
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <i.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{i.title}</h3>
              <p className="text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Request our security pack</h2>
          <p className="text-sm text-muted-foreground mb-4">
            SOC 2 report, penetration test summary, DPA, and sub-processor list available on request.
          </p>
          <a href="mailto:security@outworx.ai" className="text-sm font-medium text-primary hover:underline">
            security@outworx.ai →
          </a>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Security;

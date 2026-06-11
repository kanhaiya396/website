import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, Target, Users, Shield } from "lucide-react";

const values = [
  { icon: Sparkles, title: "AI-first", desc: "Every workflow assumes a model is in the loop. We invest in the prompts, evals, and tools so accountants don't have to." },
  { icon: Shield, title: "Compliance by default", desc: "UK & EU GDPR, MTD, and HMRC alignment are baked in — not bolted on at audit time." },
  { icon: Users, title: "Built with accountants", desc: "Our roadmap is shaped by the firms using Outworx every day, from sole practitioners to top-100 groups." },
  { icon: Target, title: "Outcomes, not features", desc: "We measure success in hours returned to your team and errors caught before filing." },
];

const About = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <section className="container mx-auto px-4 py-20 lg:py-28 max-w-4xl">
        <p className="text-sm font-medium text-primary mb-4">About Outworx</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          We're rebuilding the bookkeeping back-office for the AI era.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Outworx is a UK-based team of engineers, accountants, and ML researchers building the
          automation layer that modern firms need. We started in 2023 after watching too many
          talented bookkeepers spend their week re-keying invoices instead of advising clients.
        </p>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-3xl font-bold mb-10">What we believe</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <h2 className="text-3xl font-bold mb-6">By the numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["2.3M+", "Documents processed"],
            ["180+", "Firms onboarded"],
            ["99.4%", "Extraction accuracy"],
            ["12hrs", "Saved per bookkeeper / week"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl md:text-4xl font-bold text-primary">{n}</div>
              <div className="text-sm text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;

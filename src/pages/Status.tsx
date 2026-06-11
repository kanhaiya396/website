import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2 } from "lucide-react";

const systems = [
  "Web app",
  "Document ingestion API",
  "OCR & extraction pipeline",
  "Xero sync",
  "QuickBooks sync",
  "Email & notifications",
  "Marketing site",
];

const Status = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-3 w-3 rounded-full bg-success animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold">All systems operational</h1>
        </div>
        <p className="text-muted-foreground mb-10">
          Real-time status of Outworx services. Last checked just now.
        </p>

        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {systems.map((s) => (
            <div key={s} className="flex items-center justify-between p-4">
              <span className="font-medium">{s}</span>
              <span className="inline-flex items-center gap-2 text-sm text-success">
                <CheckCircle2 className="h-4 w-4" /> Operational
              </span>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-12 mb-4">Incident history</h2>
        <p className="text-sm text-muted-foreground">No incidents reported in the last 90 days.</p>
      </section>
    </main>
    <Footer />
  </div>
);

export default Status;

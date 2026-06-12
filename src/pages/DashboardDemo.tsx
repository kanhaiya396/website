import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const stats = [
  { label: "Documents this month", value: "1,284", icon: FileText },
  { label: "Auto-categorised", value: "97.2%", icon: CheckCircle2 },
  { label: "Pending review", value: "23", icon: Clock },
  { label: "Flagged anomalies", value: "4", icon: AlertCircle },
];

const recent = [
  ["INV-2026-0412", "Acme Ltd", "£1,240.00", "Auto-posted"],
  ["RCT-558", "Costa Coffee", "£12.40", "Needs review"],
  ["INV-2026-0411", "Beta Studios", "£3,850.00", "Auto-posted"],
  ["INV-2026-0410", "Northwind Co", "£742.18", "Auto-posted"],
  ["RCT-557", "Uber", "£18.30", "Auto-posted"],
];

const DashboardDemo = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-primary mb-2">Live demo</p>
            <h1 className="text-3xl md:text-4xl font-bold">Outworx Dashboard</h1>
            <p className="text-muted-foreground mt-2">A read-only preview of what your team sees every morning.</p>
          </div>
          <Link to="/signup">
            <Button size="lg">Get your own <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <s.icon className="h-5 w-5 text-primary mb-3" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold">Recent documents</h2>
          </div>
          <div className="divide-y divide-border">
            {recent.map(([ref, vendor, amount, status]) => (
              <div key={ref} className="grid grid-cols-4 gap-4 px-6 py-4 text-sm items-center">
                <span className="font-mono text-xs text-muted-foreground">{ref}</span>
                <span>{vendor}</span>
                <span className="font-medium">{amount}</span>
                <span className={status === "Auto-posted" ? "text-success text-xs" : "text-yellow-500 text-xs"}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default DashboardDemo;

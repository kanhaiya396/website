import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";
import { MapPin, Briefcase } from "lucide-react";

const roles = [
  { title: "Senior Full-Stack Engineer", location: "London / Remote (UK)", team: "Engineering" },
  { title: "ML Engineer — Document Understanding", location: "London", team: "Research" },
  { title: "Customer Success Manager", location: "Remote (UK)", team: "Customer" },
  { title: "Product Designer", location: "London / Remote (EU)", team: "Design" },
];

const Careers = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Seo
      title="Careers at Outworx — build the AI bookkeeping back-office"
      description="Open roles at Outworx across engineering, ML research, design, and customer success. London and remote (UK/EU)."
      path="/careers"
      jsonLd={breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Careers", path: "/careers" },
      ])}
    />
    <Header />
    <main className="flex-1">
      <section className="container mx-auto px-4 py-20 lg:py-24 max-w-4xl">
        <p className="text-sm font-medium text-primary mb-3">Careers</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Build the future of bookkeeping with us.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          We're a small, senior team based in London with a remote-friendly culture across the UK and EU.
          Competitive equity, generous learning budget, and four-day Fridays in summer.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Open roles</h2>
        <div className="space-y-3">
          {roles.map((r) => (
            <div
              key={r.title}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
            >
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" />{r.team}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</span>
                </div>
              </div>
              <a href="mailto:careers@outworx.ai" className="text-sm font-medium text-primary hover:underline">
                Apply →
              </a>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-8">
          Don't see your role? Email us at{" "}
          <a href="mailto:careers@outworx.ai" className="text-primary hover:underline">careers@outworx.ai</a>.
        </p>
      </section>
    </main>
    <Footer />
  </div>
);

export default Careers;

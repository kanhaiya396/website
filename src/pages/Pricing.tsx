import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, FileText, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Seo } from "@/components/Seo";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

const APP_URL = import.meta.env.VITE_APP_URL || "https://app.outworx.ai";

// The plan in this slot gets the "Most Popular" badge and the highlighted
// border. Currently the second plan (Growth), mirroring outworx.ai.
const HIGHLIGHTED_INDEX = 1;

interface SubscriptionPlan {
  id: number;
  name: string;
  price_monthly: number;
  monthly_doc_guide: number;
  quarterly_doc_limit: number;
  overage_cost: number;
  features: string[];
  sort_order: number;
}

type Audience = "business" | "accountant_bookkeeper";

export default function Pricing() {
  const [isAccountant, setIsAccountant] = useState(false);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const audience: Audience = isAccountant ? "accountant_bookkeeper" : "business";
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const data = await api.get<SubscriptionPlan[]>(
          `/api/v1/accounts/subscription-plans/?audience=${audience}`
        );
        if (!cancelled) {
          setPlans(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn("Subscription plans API unavailable:", err);
          setPlans([]);
          setError("Pricing is temporarily unavailable. Please refresh in a moment.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAccountant]);


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Pricing — Outworx AI bookkeeping plans"
        description="Transparent pricing for accountants and bookkeepers. Plans for solo practitioners through to multi-partner firms, with a 75% discount for accountants."
        path="/pricing"
      />
      <Header />

      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
                Pricing that{" "}
                <span className="text-serif text-primary">scales with you</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                All plans include full access to every feature. Pricing is
                based on the number of documents published per quarter.
              </p>
            </motion.div>

            {/* Segment toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center mb-12"
            >
              <div className="inline-flex items-center p-1 rounded-full bg-secondary border border-border">
                <button
                  onClick={() => setIsAccountant(false)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all",
                    isAccountant
                      ? "text-muted-foreground hover:text-foreground"
                      : "bg-card text-foreground shadow-sm"
                  )}
                >
                  Businesses
                </button>
                <button
                  onClick={() => setIsAccountant(true)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                    isAccountant
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Accountants & Bookkeepers
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {ACCOUNTANT_DISCOUNT_PCT}% off
                  </span>
                </button>
              </div>
            </motion.div>

            {isAccountant && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-muted-foreground mb-8"
              >
                Minimum 25 client subscriptions required across any mix of
                plans
              </motion.p>
            )}

            {/* Plan grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center text-sm text-destructive py-20">
                {error}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
                {plans.map((plan, idx) => {
                  const featured = idx === HIGHLIGHTED_INDEX;
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                      className={cn(
                        "relative rounded-2xl border bg-card p-6",
                        featured
                          ? "border-primary shadow-glow"
                          : "border-border"
                      )}
                    >
                      {featured && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wide">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">
                          {plan.name}
                        </h3>
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-4xl font-bold">
                            £{applyDiscount(plan.price_monthly)}
                          </span>
                          <span className="text-muted-foreground">/mo</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          + VAT
                        </span>
                      </div>

                      <div className="space-y-3 mb-6 pb-6 border-b border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Monthly guide
                          </span>
                          <span className="font-semibold">
                            {plan.monthly_doc_guide} docs
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Quarterly limit
                          </span>
                          <span className="font-semibold">
                            {plan.quarterly_doc_limit} docs
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Overage cost
                          </span>
                          <span className="font-semibold">
                            £{plan.overage_cost.toFixed(2)}/doc
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <a href={`${APP_URL}/auth`}>
                        <Button
                          className={cn(
                            "w-full",
                            featured
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          )}
                        >
                          Start free trial
                        </Button>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* "What counts as a doc" footnote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">
                    What counts as a document?
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <span className="text-2xl font-bold text-primary">1</span>
                    <span className="text-sm">
                      <span className="font-medium">doc</span>
                      <span className="text-muted-foreground">
                        {" "}
                        = published invoice or receipt or credit note
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <span className="text-2xl font-bold text-primary">2</span>
                    <span className="text-sm">
                      <span className="font-medium">docs</span>
                      <span className="text-muted-foreground">
                        {" "}
                        = extracted bank statement or reconciled supplier
                        statement
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

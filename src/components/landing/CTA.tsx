import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoTransitionLink } from "@/components/DemoTransitionLink";
import { authUrl } from "@/lib/appUrl";

const trustPills = [
  "More client capacity",
  "Less repetitive work",
  "Human-approved posting",
  "Built for accountants",
];

export function CTA() {
  return (
    <section className="section-seam pt-10 pb-16 lg:pt-14 lg:pb-20 relative overflow-hidden">
      {/* Soft orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[90%] sm:h-[480px] sm:w-[680px] sm:max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{ background: "radial-gradient(closest-side, hsl(168 100% 45% / 0.18), transparent 70%)" }}
      />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display font-extrabold tracking-tight mb-6">
            Ready to put your books on{" "}
            <span className="text-serif text-primary">Autopilot?</span>
          </h2>

          <p className="text-[17px] md:text-[18px] text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Put your books on autopilot in under 10 minutes.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10">
            <a href={authUrl()} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-[52px] w-full sm:w-auto px-8 text-[16px] font-display font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-glow-teal hover:-translate-y-0.5 transition-all"
              >
                Start free trial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
            <DemoTransitionLink to="/dashboard-demo" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="h-[52px] w-full sm:w-auto px-8 text-[16px] font-display font-semibold border-border bg-card/40 backdrop-blur hover:bg-card/70 rounded-xl"
                asChild
              >
                <span>Try it yourself</span>
              </Button>
            </DemoTransitionLink>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3.5 max-w-2xl mx-auto">
            {trustPills.map((pill) => (
              <div
                key={pill}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] md:text-[14px] font-medium bg-secondary/40 text-foreground/90 border border-border/40 backdrop-blur-sm shadow-sm"
              >
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span>{pill}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}

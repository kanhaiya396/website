import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const APP_URL = import.meta.env.VITE_APP_URL || "https://app.outworx.ai";

export function CTA() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
            Ready to put your books on{" "}
            <span className="text-serif text-primary">Autopilot?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of accountants and bookkeepers who've automated their document processing with Outworx.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={`${APP_URL}/auth`}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Start free trial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
            <a href={`${APP_URL}/dashboard`}>
              <Button variant="outline" size="lg" className="border-border hover:bg-secondary px-8">
                Book demo
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
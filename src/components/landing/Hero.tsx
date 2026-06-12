import { motion } from "framer-motion";
import { ArrowRight, FileText, Receipt, CreditCard, Building, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


const docTypes = [
  { icon: Receipt, label: "Receipt", color: "text-emerald-400" },
  { icon: FileText, label: "Invoice", color: "text-blue-400" },
  { icon: FileText, label: "Supplier statement", color: "text-purple-400" },
  { icon: Building, label: "Bank statement", color: "text-cyan-400" },
  { icon: FileText, label: "Sales invoice", color: "text-orange-400" },
  { icon: CreditCard, label: "Credit note", color: "text-pink-400" },
];

const highlights = [
  "Two-week free trial",
  "Teams/Slack support",
  "UK/EU GDPR compliant",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-20 lg:pt-16 lg:pb-32">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="max-w-xl">
            {/* Testimonial badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-secondary border-2 border-background" />
                ))}
              </div>
              <div className="text-sm">
                <span className="text-foreground">Rated 5★</span>
                <span className="text-muted-foreground"> on </span>
                <span className="text-primary">Xero App Store</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.1] mb-6"
            >
              Put your books
              <br />
              on <span className="text-serif text-primary">Autopilot</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-4"
            >
              Introducing the AI Autopilot for Accountants and Bookkeepers.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-muted-foreground mb-8"
            >
              From data capture to financial close, handled end-to-end by AI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link to="/signup">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                  Get started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard-demo">
                <Button variant="outline" size="lg" className="border-border hover:bg-secondary px-6">
                  View demo
                </Button>
              </Link>

            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  {highlight}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 shadow-xl">
              {/* Document type labels floating */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {docTypes.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 border border-border"
                  >
                    <doc.icon className={`h-4 w-4 ${doc.color}`} />
                    <span className="text-sm">{doc.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Center Integration Visual */}
              <div className="relative flex justify-center items-center py-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-primary/10 animate-pulse" />
                </div>
                
                {/* Xero & QuickBooks logos placeholder */}
                <div className="relative z-10 flex items-center gap-6">
                  <div className="h-14 w-14 rounded-xl bg-[#13B5EA]/20 border border-[#13B5EA]/30 flex items-center justify-center">
                    <span className="text-[#13B5EA] font-bold text-lg">X</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-glow mb-2">
                      <FileText className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium">Outworx</span>
                    <span className="text-[10px] text-muted-foreground">One</span>
                  </div>
                  
                  <div className="h-14 w-14 rounded-xl bg-[#2CA01C]/20 border border-[#2CA01C]/30 flex items-center justify-center">
                    <span className="text-[#2CA01C] font-bold text-lg">QB</span>
                  </div>
                </div>
              </div>

              {/* VAT verified badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex items-center justify-center gap-2 mt-4 py-3 rounded-lg bg-success/10 border border-success/20"
              >
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm text-success font-medium">VAT number verified</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
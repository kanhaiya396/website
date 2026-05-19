import { motion } from "framer-motion";
import { 
  Upload, 
  Brain, 
  Scale, 
  Calendar,
  Wand2
} from "lucide-react";
import { CaptureMock, CategoriseMock, ComplyMock, CloseMock } from "./FeatureMockUIs";

const features = [
  {
    step: "01",
    title: "Capture",
    subtitle: "Upload from WhatsApp, Email and Web",
    description: "Upload your receipts, sales invoices, credit notes, supplier and bank statements and let our AI Autopilot take care of the rest.",
    icon: Upload,
    highlights: ["AI Autopilot", "3-Step Verification", "Smart Triage", "Duplicate Detection"],
    MockComponent: CaptureMock,
  },
  {
    step: "02",
    title: "Categorise",
    subtitle: "Line item categorisation that learns over time",
    description: "Outworx learns from your existing ledger data and adapts in real-time as you make changes. No supplier rules needed.",
    icon: Brain,
    highlights: ["Historical Learning", "Real-time Adaptation", "Context Aware"],
    MockComponent: CategoriseMock,
  },
  {
    step: "03",
    title: "Comply",
    subtitle: "VAT compliance built-in at the point of capture",
    description: "Outworx searches relevant VAT legislation for every purchase, verifies VAT numbers against HMRC and assigns VAT rates on a line-item basis.",
    icon: Scale,
    highlights: ["VAT Verification", "Legislation Lookup", "HMRC Integration"],
    MockComponent: ComplyMock,
  },
  {
    step: "04",
    title: "Close",
    subtitle: "Period-end close and automated working papers",
    description: "Outworx detects adjustments in real-time, builds schedules, posts journals and reconciles balance sheets automatically.",
    icon: Calendar,
    highlights: ["Prepayments", "Deferred Income", "Accruals", "Fixed Assets"],
    MockComponent: CloseMock,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm text-muted-foreground uppercase tracking-wider"
          >
            Features
          </motion.span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            From document to ledger,{" "}
            <span className="text-serif text-primary">fully automated</span>
          </h2>
        </motion.div>

        {/* Features List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary text-sm font-medium">{feature.step}</span>
                  <span className="text-2xl font-semibold">{feature.title}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold mb-4 leading-snug">
                  {feature.subtitle}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Highlight tags */}
                <div className="flex flex-wrap gap-3">
                  {feature.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Wand2 className="h-4 w-4 text-primary" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Visual */}
              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                  
                  <div className="relative min-h-[300px] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <feature.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{feature.title}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">AI Autopilot</span>
                    </div>
                    
                    {/* Interactive mock */}
                    <div className="flex-1">
                      <feature.MockComponent />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

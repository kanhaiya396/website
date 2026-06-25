import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";

import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { VATCompliance } from "@/components/landing/VATCompliance";
import { AIReview } from "@/components/landing/AIReview";
import { CISWorkflows } from "@/components/landing/CISWorkflows";
import { Voices } from "@/components/landing/Voices";
import { Testimonials } from "@/components/landing/Testimonials";

import { CTA } from "@/components/landing/CTA";
import { Seo } from "@/components/Seo";

const SEO_TITLE = "Outworx — AI Bookkeeping Autopilot for Accountants";
const SEO_DESC =
  "AI document automation for accountants and bookkeepers. Capture, categorise, VAT-comply and close — end-to-end on autopilot.";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Outworx",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: SEO_DESC,
  url: "https://outworx.ai/",
  publisher: {
    "@type": "Organization",
    name: "Outworx",
    url: "https://outworx.ai/",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
    description: "Two-week free trial",
  },
};

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Seo
        title={SEO_TITLE}
        description={SEO_DESC}
        path="/"
        jsonLd={softwareJsonLd}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: [
            "radial-gradient(60% 40% at 20% 15%, hsl(214 70% 14% / 0.55), transparent 70%)",
            "radial-gradient(50% 35% at 85% 65%, hsl(168 80% 14% / 0.18), transparent 70%)",
            "radial-gradient(80% 50% at 50% 110%, hsl(214 80% 12% / 0.4), transparent 70%)",
          ].join(", "),
        }}
      />
      <Header />
      <main className="relative z-10 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero />
          <BeforeAfter />
          <VATCompliance />
          <AIReview />
          <CISWorkflows />
          <HowItWorks />
          <Testimonials />
          <Voices />
          <CTA />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

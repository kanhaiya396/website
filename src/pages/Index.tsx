import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { VATCompliance } from "@/components/landing/VATCompliance";
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
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title={SEO_TITLE}
        description={SEO_DESC}
        path="/"
        jsonLd={softwareJsonLd}
      />
      <Header />
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero />
          <Features />
          <VATCompliance />
          <HowItWorks />
          <Testimonials />
          <CTA />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

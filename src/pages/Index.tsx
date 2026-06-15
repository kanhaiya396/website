import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { VATCompliance } from "@/components/landing/VATCompliance";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";

const SEO_TITLE = "Outworx — AI Bookkeeping Autopilot for Accountants";
const SEO_DESC =
  "AI document automation for accountants and bookkeepers. Capture, categorise, VAT-comply and close — end-to-end on autopilot.";
const SEO_URL = "https://outworx.ai/";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESC} />
        <link rel="canonical" href={SEO_URL} />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO_URL} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SEO_TITLE} />
        <meta name="twitter:description" content={SEO_DESC} />
      </Helmet>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <Features />
        <VATCompliance />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
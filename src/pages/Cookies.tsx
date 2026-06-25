import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";

const Cookies = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Seo
      title="Cookie Policy — Outworx"
      description="How Outworx uses cookies and similar technologies, and the choices you have."
      path="/cookies"
      jsonLd={breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Cookie Policy", path: "/cookies" },
      ])}
    />
    <Header />
    <main className="flex-1">
      <article className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
        <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: June 2026</p>

        <h2 className="text-xl font-semibold mt-8 mb-2">What are cookies?</h2>
        <p className="text-muted-foreground">
          Cookies are small text files stored on your device when you visit a website. They help sites
          remember information about your visit, like your preferred language and other settings.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">How we use cookies</h2>
        <p className="text-muted-foreground">We use cookies for three purposes:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
          <li><strong className="text-foreground">Strictly necessary</strong> — to keep you signed in and remember your session. These cannot be turned off.</li>
          <li><strong className="text-foreground">Analytics</strong> — to understand how visitors use our site so we can improve it. We use first-party analytics; no data is sold.</li>
          <li><strong className="text-foreground">Preferences</strong> — to remember choices like dark/light mode.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">Managing cookies</h2>
        <p className="text-muted-foreground">
          You can control cookies through your browser settings. Disabling strictly necessary cookies
          will break sign-in. For more on our data practices, see our{" "}
          <a href="/privacy" className="text-primary hover:underline">Privacy Notice</a>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
        <p className="text-muted-foreground">
          Questions? Email <a href="mailto:legal@outworx.ai" className="text-primary hover:underline">legal@outworx.ai</a>.
        </p>
      </article>
    </main>
    <Footer />
  </div>
);

export default Cookies;

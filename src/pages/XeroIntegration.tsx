import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";

export default function XeroIntegration() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Xero integration — Outworx"
        description="How to connect Xero to Outworx, what data is used, how posting and mapping work, and how to disconnect."
        path="/integrations/xero"
        jsonLd={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Xero integration", path: "/integrations/xero" },
        ])}
      />
      <Header />
      <main>
        <header className="border-b border-border/60 bg-muted/35 px-4 py-12 text-center sm:py-16 lg:py-20">
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            Outworx for Xero
          </h1>
        </header>

        <article className="prose prose-slate mx-auto max-w-[calc(40vw+480px)] px-5 py-14 text-[15px] leading-7 prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:decoration-primary/40 prose-a:underline-offset-4 hover:prose-a:decoration-primary dark:prose-invert sm:px-6 sm:py-20 sm:text-base sm:leading-7 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-[1.375rem] [&_h2]:leading-8 [&_h2]:text-primary [&_li]:my-1.5 [&_ol]:my-4 [&_ol]:pl-6 [&_p]:my-4 [&_ul]:my-4 [&_ul]:pl-6">
          <p>
            Outworx reads your purchase invoices, receipts and bank statements, codes them to your
            Xero chart of accounts and tax rates, and posts them to Xero once you approve them. This
            page explains how to set up the connection, what it does, and how to remove it.
          </p>

          <h2>What you need</h2>
          <ul>
            <li>An Outworx account. You can start with a free trial from the <a href="/pricing">pricing page</a>.</li>
            <li>
              A Xero organisation, and a Xero user login with permission to add connected apps to
              it (usually the adviser or standard role).
            </li>
          </ul>

          <h2>Connecting Xero</h2>
          <ol>
            <li>Sign in to Outworx and open <strong>Settings &rarr; Integrations</strong>.</li>
            <li>Select <strong>Connect to Xero</strong>. You are sent to Xero&rsquo;s own sign-in page.</li>
            <li>
              Sign in to Xero, pick the organisation you want to connect, and review the permissions
              Outworx asks for.
            </li>
            <li>Select <strong>Allow access</strong>. Xero returns you to Outworx with the organisation connected.</li>
          </ol>
          <p>
            We never see or store your Xero password. The connection uses Xero&rsquo;s secure sign-in
            (OAuth 2.0), and you can connect more than one organisation, for example one per client.
          </p>

          <h2>What Outworx uses from Xero</h2>
          <p>
            Outworx reads only what it needs to code and post your documents: organisation details,
            chart of accounts, tax rates, tracking categories and contacts. See section 6 of our{" "}
            <a href="/privacy">Privacy Notice</a> for the full list and how that data is stored.
          </p>

          <h2>How posting works</h2>
          <ul>
            <li>
              <strong>Nothing posts without approval.</strong> Every document goes through the Outworx
              review queue. You check the supplier, account, tax rate and amounts before anything
              is sent to Xero.
            </li>
            <li>
              <strong>Your own accounts and tax rates.</strong> Account codes, tax rates and tracking
              categories are picked from your Xero organisation, not a fixed list. If you add an
              account in Xero, it appears in Outworx the next time settings refresh.
            </li>
            <li>
              <strong>Suppliers.</strong> Outworx matches the supplier to an existing Xero contact.
              If there is no match, you can pick one or create a new contact before posting.
            </li>
            <li>
              <strong>Source documents attached.</strong> The original file is attached to the bill in
              Xero so your audit trail stays in one place.
            </li>
            <li>
              <strong>Duplicates.</strong> Outworx flags documents that look like ones already
              processed so the same bill isn&rsquo;t posted twice.
            </li>
          </ul>

          <h2>Troubleshooting</h2>
          <ul>
            <li>
              <strong>&ldquo;Connection expired&rdquo; or &ldquo;Reconnect Xero&rdquo;.</strong> Xero
              connections lapse if they are removed in Xero or not used for a long time. Open{" "}
              <strong>Settings &rarr; Integrations</strong> and select <strong>Reconnect</strong>.
            </li>
            <li>
              <strong>An account or tax rate is missing.</strong> Check it is active in Xero, then
              refresh the Xero settings in Outworx.
            </li>
            <li>
              <strong>A document didn&rsquo;t post.</strong> The document stays in your queue with the
              reason Xero gave, such as a locked period or an archived account. Fix it and post again.
            </li>
            <li>
              <strong>Xero is busy.</strong> Xero limits how many requests apps can make. If a large
              batch hits that limit, Outworx waits and retries automatically.
            </li>
          </ul>

          <h2>Disconnecting Xero</h2>
          <p>
            You can disconnect at any time, either from <strong>Settings &rarr; Integrations</strong>{" "}
            in Outworx or from the <strong>Connected apps</strong> page in Xero. When you disconnect,
            we delete our access tokens and can no longer reach your Xero organisation. Anything
            already posted stays in Xero. Data already held in Outworx is kept and deleted as
            described in our <a href="/privacy">Privacy Notice</a>.
          </p>

          <h2>Pricing</h2>
          <p>
            Connecting Xero is included on every Outworx plan at no extra cost. See{" "}
            <a href="/pricing">pricing</a> for plan details. You need your own Xero subscription.
          </p>

          <h2>Support</h2>
          <p>
            Email <a href="mailto:support@outworx.ai">support@outworx.ai</a> with your organisation
            name and, if something failed, the document name. We reply on UK working days.
          </p>

          <p className="text-sm">
            Xero is a trade mark of Xero Limited. Outworx is an independent product and is not
            owned, operated or endorsed by Xero.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}

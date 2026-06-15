import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Privacy Notice — Outworx"
        description="How Outworx collects, processes, and protects personal data under UK & EU GDPR."
        path="/privacy"
      />
      <Header />
      <main className="container mx-auto px-4 py-12 lg:py-16 max-w-4xl">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Privacy Notice</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: <strong>6 April 2026</strong>
          </p>

          <p>
            This notice explains what personal information Outworx collects, why we collect it, who
            we share it with, and the rights you have under UK data protection law. We have written
            it to be readable. If anything is unclear, please email{" "}
            <a href="mailto:legal@outworx.ai">legal@outworx.ai</a> and we will explain it in more
            detail.
          </p>

          <h2>At a glance</h2>
          <ul>
            <li>
              We are <strong>Outbooks Ltd</strong>, trading as <strong>Outworx</strong>, a UK
              company. We operate the Outworx bookkeeping automation platform at{" "}
              <a href="https://app.outworx.ai">app.outworx.ai</a>.
            </li>
            <li>
              We collect only what we need to run the service: account details, the documents you
              upload (invoices, receipts, bank statements), and data fetched from accounts you
              connect (banks, Xero, QuickBooks).
            </li>
            <li>
              We use specialist sub-processors (AWS for hosting, Google for AI extraction, TrueLayer
              for Open Banking, and the accounting providers you connect to). We never sell your
              data and we do not use it to train external AI models.
            </li>
            <li>
              You can ask us at any time to see, correct, export or delete your data. Contact our
              DPO at <a href="mailto:legal@outworx.ai">legal@outworx.ai</a>.
            </li>
            <li>
              You also have the right to complain to the UK Information Commissioner&rsquo;s Office
              at <a href="https://ico.org.uk/">ico.org.uk</a>.
            </li>
          </ul>

          <h2>1. Who we are</h2>
          <p>
            Outworx is a service operated by <strong>Outbooks Ltd</strong>, a company registered in
            England and Wales. Outbooks Ltd is the &ldquo;data controller&rdquo; for the personal
            information described in this notice.
          </p>
          <ul>
            <li>
              <strong>Registered office:</strong> Outbooks Ltd,{" "}
415c Margaret Powell House, Midsummer Boulevard, Milton Keynes, United Kingdom, MK9 3BN
            </li>
            <li>
              <strong>General enquiries:</strong>{" "}
              <a href="mailto:general@outworx.ai">general@outworx.ai</a>
            </li>
            <li>
              <strong>Data Protection Officer:</strong>{" "}
              <a href="mailto:legal@outworx.ai">legal@outworx.ai</a>
            </li>
          </ul>

          <h2>2. The information we collect</h2>
          <p>We collect personal information in three ways:</p>
          <p>
            <strong>2.1 Information you give us directly.</strong> When you sign up for an Outworx
            account or contact us, you provide us with your name, business name, email address,
            phone number, and any details you enter into our forms. If you subscribe, we collect
            billing information through our payment processor (we do not see or store your full card
            number).
          </p>
          <p>
            <strong>2.2 Information you upload or import.</strong> When you use Outworx, you upload
            documents (invoices, receipts, bank statements, supplier statements, expense claims) and
            connect external accounts (UK banks via Open Banking, Xero or QuickBooks Online via
            OAuth). We process the contents of those documents and the transactions returned by
            those accounts so we can extract structured data, reconcile records and post entries on
            your behalf. The documents and transaction data may contain personal information about
            you, your business, your suppliers, your customers and your staff.
          </p>
          <p>
            <strong>2.3 Information we collect automatically.</strong> When you use the website, we
            log technical information needed to run the service: IP address, browser type, pages
            visited, timestamps and any errors. We use cookies to keep you signed in and to remember
            your preferences. See section 8 for cookie details.
          </p>

          <h2>3. How we use your information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>
              <strong>To deliver the service</strong> — extracting data from your documents,
              reconciling transactions, posting entries to Xero/QuickBooks, sending notifications
              you have requested.
            </li>
            <li>
              <strong>To manage your account</strong> — letting you sign in, securing your account,
              processing your subscription, sending billing receipts and important service emails.
            </li>
            <li>
              <strong>To support you</strong> — answering questions you send to support, recording
              support communications so we can resolve issues.
            </li>
            <li>
              <strong>To improve and secure the service</strong> — investigating errors, monitoring
              for abuse and fraud, measuring aggregate usage to prioritise improvements.
            </li>
            <li>
              <strong>To comply with our legal obligations</strong> — including HMRC, Companies
              House, accounting and anti-money-laundering rules where applicable.
            </li>
          </ul>
          <p>
            <strong>We do not</strong> sell your personal information, share it for unrelated
            advertising, or use the contents of your documents to train any external AI model.
            Information sent to Google Gemini for extraction is used solely to return a structured
            extraction result for your document; under our agreement with Google, this content is
            not retained for model training.
          </p>

          <h2>4. The legal bases we rely on</h2>
          <p>
            UK GDPR requires us to identify a lawful basis for each use of personal information. We
            rely on:
          </p>
          <ul>
            <li>
              <strong>Performance of a contract</strong> — to deliver the service you have signed up
              for and to manage your account.
            </li>
            <li>
              <strong>Legitimate interests</strong> — to keep the service secure, to investigate
              fraud or abuse, and to communicate essential service updates. Where we rely on this
              basis we have weighed our interests against your privacy rights.
            </li>
            <li>
              <strong>Consent</strong> — for any marketing emails, optional WhatsApp notifications,
              and for non-essential cookies. You can withdraw consent at any time without affecting
              the lawfulness of any processing carried out before withdrawal.
            </li>
            <li>
              <strong>Legal obligation</strong> — to retain financial records required by HMRC and
              other UK regulators, and to respond to lawful requests from authorities.
            </li>
          </ul>

          <h2>5. Who we share your information with</h2>
          <p>
            We use a small number of carefully selected sub-processors to deliver the service. Each
            is bound by a written data processing agreement that obliges them to protect your data
            and process it only on our instructions.
          </p>
          <ul>
            <li>
              <strong>Amazon Web Services (AWS)</strong> — hosts our infrastructure and stores
              uploaded documents. Data is held in AWS&rsquo;s London (eu-west-2) region. AWS is ISO
              27001, SOC 2 and UK GDPR compliant.{" "}
              <a href="https://aws.amazon.com/privacy/" target="_blank" rel="noreferrer noopener">
                AWS Privacy Notice
              </a>
              .
            </li>
            <li>
              <strong>Google LLC (Gemini API)</strong> — performs AI extraction on uploaded
              documents. Documents are sent to Gemini and a structured result is returned. Under
              Google&rsquo;s API terms applicable to our usage, document contents are not used to
              train Google&rsquo;s models.{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer noopener">
                Google Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>TrueLayer Limited</strong> — an FCA-authorised Open Banking provider used to
              fetch transactions when you connect a UK bank account.{" "}
              <a href="https://truelayer.com/legal/privacy/" target="_blank" rel="noreferrer noopener">
                TrueLayer Privacy Notice
              </a>
              .
            </li>
            <li>
              <strong>Intuit Inc. (QuickBooks Online)</strong> — receives the bills/invoices we
              post on your behalf when you connect a QuickBooks company.{" "}
              <a
                href="https://www.intuit.com/privacy/statement/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Intuit Privacy Statement
              </a>
              .
            </li>
            <li>
              <strong>Xero Limited</strong> — receives the bills/invoices we post on your behalf
              when you connect a Xero organisation.{" "}
              <a
                href="https://www.xero.com/uk/legal/privacy/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Xero Privacy Notice
              </a>
              .
            </li>
            <li>
              <strong>Twilio Inc.</strong> — sends WhatsApp notifications where you have opted in.{" "}
              <a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noreferrer noopener">
                Twilio Privacy Notice
              </a>
              .
            </li>
          </ul>
          <p>
            We may also share information when required by law (for example, in response to a court
            order or a lawful request from HMRC), or to protect the rights, property or safety of
            Outworx, our customers, or others. If we ever sell or restructure our business, your
            information may transfer to the new owner; in that case we will tell you and the same
            protections will continue to apply.
          </p>

          <h2>6. International data transfers</h2>
          <p>
            Outworx is hosted in the UK. Some of our sub-processors are based outside the UK,
            principally in the United States (Google, Twilio and Intuit are US companies; Xero is
            headquartered in New Zealand). When we transfer your data to these providers, we rely on
            the safeguards required by UK GDPR — typically a combination of the UK International
            Data Transfer Agreement / Addendum, the EU Standard Contractual Clauses, and the
            adequacy decisions made by the UK government. You can request a copy of the safeguards
            applicable to a specific transfer by emailing our DPO.
          </p>

          <h2>7. How long we keep your information</h2>
          <p>
            We keep your data only for as long as we need it. Our standard retention periods are:
          </p>
          <ul>
            <li>
              <strong>Active account data</strong> — for as long as your account is active.
            </li>
            <li>
              <strong>After you close your account</strong> — personal account data is deleted
              within 90 days, except where we are required to retain it by law.
            </li>
            <li>
              <strong>Financial records required by HMRC</strong> — retained for 6 years from the
              end of the relevant accounting period, then deleted.
            </li>
            <li>
              <strong>Lead and prospect data</strong> — retained for up to 12 months from your last
              interaction, then deleted.
            </li>
            <li>
              <strong>Support communications</strong> — retained for up to 3 years.
            </li>
            <li>
              <strong>Server access logs</strong> — retained for up to 90 days.
            </li>
          </ul>
          <p>
            You can ask us to delete your data sooner by contacting our DPO. We will comply unless
            we have a legal obligation to retain it.
          </p>

          <h2>8. Cookies</h2>
          <p>
            Outworx uses a small number of cookies. The essential ones keep you signed in, remember
            your selected client/organisation, and maintain your preferences. We do not use
            advertising cookies. If we add analytics or non-essential cookies in future, we will ask
            for your consent before placing them.
          </p>

          <h2>9. Your rights</h2>
          <p>
            Under UK data protection law, you have the following rights. To exercise any of them,
            email <a href="mailto:legal@outworx.ai">legal@outworx.ai</a>. We will respond within one
            month and we will not charge you for ordinary requests.
          </p>
          <ul>
            <li>
              <strong>Right of access</strong> — to be told what personal information we hold about
              you and to receive a copy.
            </li>
            <li>
              <strong>Right to rectification</strong> — to have inaccurate or incomplete data
              corrected.
            </li>
            <li>
              <strong>Right to erasure</strong> — to have your data deleted, subject to any legal
              obligation we have to retain it.
            </li>
            <li>
              <strong>Right to restrict processing</strong> — to ask us to stop using your data
              while a query is being resolved.
            </li>
            <li>
              <strong>Right to data portability</strong> — to receive your data in a structured,
              machine-readable format and have it transferred to another provider.
            </li>
            <li>
              <strong>Right to object</strong> — to object to processing based on our legitimate
              interests, or to direct marketing.
            </li>
            <li>
              <strong>Rights related to automated decision-making</strong> — Outworx&rsquo;s
              extraction and reconciliation are tools to assist human decision-making, not to make
              decisions about you on their own. You always have the final say on what is posted to
              your accounts.
            </li>
          </ul>
          <p>
            If you are unhappy with how we have handled your data, please tell us first so we can
            put it right. You also have the right to complain to the UK Information
            Commissioner&rsquo;s Office:
          </p>
          <ul>
            <li>
              Website: <a href="https://ico.org.uk/">ico.org.uk</a>
            </li>
            <li>Helpline: 0303 123 1113</li>
          </ul>

          <h2>10. How we keep your information secure</h2>
          <p>
            We take the security of your data seriously. The measures we have in place include:
          </p>
          <ul>
            <li>Encryption in transit using TLS 1.2 or higher for all connections.</li>
            <li>Encryption at rest for the database and document storage.</li>
            <li>
              Role-based access controls so that only staff who need access to your data have it.
            </li>
            <li>Multi-factor authentication for all administrative access.</li>
            <li>Regular vulnerability scanning and dependency monitoring.</li>
            <li>
              Backups stored in the same region with the same access controls and encryption.
            </li>
            <li>Audit logs for sensitive actions in the system.</li>
          </ul>
          <p>
            No service can promise absolute security, but if we ever become aware of a personal data
            breach that is likely to affect you, we will tell you and the ICO without undue delay,
            in line with UK GDPR.
          </p>

          <h2>11. Children</h2>
          <p>
            Outworx is a service for businesses and is not directed at children under the age of 13.
            We do not knowingly collect personal information from children. If you believe a child
            has provided personal information to us, please contact{" "}
            <a href="mailto:legal@outworx.ai">legal@outworx.ai</a> and we will delete it promptly.
          </p>

          <h2>12. Changes to this notice</h2>
          <p>
            We may update this notice from time to time. The &ldquo;last updated&rdquo; date at the
            top of the page will reflect any change. If a change materially affects how we use your
            data, we will notify you by email before it takes effect.
          </p>

          <h2>13. Contacting us and complaints</h2>
          <p>
            If you have any questions about this notice, or about how we handle your data, please
            contact us:
          </p>
          <ul>
            <li>
              <strong>General enquiries:</strong>{" "}
              <a href="mailto:general@outworx.ai">general@outworx.ai</a>
            </li>
            <li>
              <strong>Data Protection Officer:</strong>{" "}
              <a href="mailto:legal@outworx.ai">legal@outworx.ai</a>
            </li>
            <li>
              <strong>Postal address:</strong> Outbooks Ltd,{" "}
415c Margaret Powell House, Midsummer Boulevard, Milton Keynes, United Kingdom, MK9 3BN
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </div>
  );
}

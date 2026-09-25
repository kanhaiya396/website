import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";

const subProcessors = [
  {
    name: "Amazon Web Services",
    purpose: "Hosting, database and document storage",
    location: "United Kingdom (London, eu-west-2)",
  },
  {
    name: "Google LLC (Gemini API)",
    purpose: "AI extraction of data from uploaded documents",
    location: "United States and other Google regions",
  },
  {
    name: "TrueLayer Limited",
    purpose: "Open Banking connection to fetch bank transactions",
    location: "United Kingdom",
  },
  {
    name: "Microsoft Corporation",
    purpose: "Email services",
    location: "United Kingdom / EU and United States",
  },
  {
    name: "Twilio Inc.",
    purpose: "Messaging services: receiving documents sent by WhatsApp, and WhatsApp and SMS notifications",
    location: "United States",
  },
  {
    name: "Better Stack",
    purpose: "Application logging and uptime monitoring",
    location: "European Union",
  },
];

export default function Dpa() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Data Processing Agreement — Outworx"
        description="The Outworx Data Processing Agreement: how Outworx Ltd processes personal data on behalf of its customers under UK and EU GDPR."
        path="/dpa"
        jsonLd={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Data Processing Agreement", path: "/dpa" },
        ])}
      />
      <div className="print:hidden">
        <Header />
      </div>
      <main className="container mx-auto px-4 py-12 lg:py-16 max-w-4xl print:py-0">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Data Processing Agreement</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: <strong>25 September 2026</strong>
          </p>
          <p className="print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="text-sm font-medium text-primary hover:underline"
            >
              Print or save as PDF
            </button>
          </p>

          <p>
            This Data Processing Agreement (&ldquo;DPA&rdquo;) forms part of the{" "}
            <a href="/terms">Outworx Terms of Service</a> (the &ldquo;Terms&rdquo;) between{" "}
            <strong>Outworx Ltd</strong>, a company registered in England and Wales under company
            number 17006703, whose registered office is at 415c Margaret Powell House, Midsummer
            Boulevard, Milton Keynes, MK9 3BN (&ldquo;Outworx&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;), and the customer that has agreed to the Terms (&ldquo;Customer&rdquo;,
            &ldquo;you&rdquo;).
          </p>
          <p>
            It applies automatically when you accept the Terms. You do not need to sign it, but if
            your firm needs a signed copy, email{" "}
            <a href="mailto:legal@outworx.ai">legal@outworx.ai</a> and we will countersign one.
          </p>

          <h2>1. Definitions</h2>
          <ul>
            <li>
              <strong>&ldquo;Data Protection Laws&rdquo;</strong> means the UK GDPR, the Data
              Protection Act 2018, and, where it applies to you, the EU GDPR, each as amended or
              replaced from time to time.
            </li>
            <li>
              <strong>&ldquo;Customer Personal Data&rdquo;</strong> means personal data that we
              process on your behalf in providing the Service, as described in Annex 1.
            </li>
            <li>
              <strong>&ldquo;Sub-processor&rdquo;</strong> means a third party we engage to process
              Customer Personal Data.
            </li>
            <li>
              <strong>&ldquo;Personal Data Breach&rdquo;</strong> means a breach of security leading
              to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure
              of, or access to, Customer Personal Data.
            </li>
            <li>
              <strong>&ldquo;Restricted Transfer&rdquo;</strong> means a transfer of Customer
              Personal Data to a country outside the UK (or, where the EU GDPR applies, outside the
              EEA) that is not covered by an adequacy decision.
            </li>
          </ul>
          <p>
            &ldquo;Controller&rdquo;, &ldquo;processor&rdquo;, &ldquo;data subject&rdquo;,
            &ldquo;personal data&rdquo; and &ldquo;processing&rdquo; have the meanings given in the
            Data Protection Laws. Other capitalised terms have the meanings given in the Terms.
          </p>

          <h2>2. Roles</h2>
          <p>
            For Customer Personal Data, you are the controller and Outworx is your processor. For
            the personal data we collect to run your account (such as your users&rsquo; login and
            billing details), Outworx is a controller and our{" "}
            <a href="/privacy">Privacy Notice</a> applies instead of this DPA.
          </p>
          <p>
            You are responsible for having a lawful basis for the Customer Personal Data you give
            us, and for any notices you owe to your own clients and their staff and suppliers.
          </p>

          <h2>3. Processing on your instructions</h2>
          <p>
            We will process Customer Personal Data only on your documented instructions. Your
            instructions are the Terms, this DPA, and the settings and actions you take in the
            Service. We will tell you promptly if we believe an instruction breaks the Data
            Protection Laws. If the law requires us to process Customer Personal Data other than on
            your instructions, we will tell you before doing so, unless the law forbids it.
          </p>

          <h2>4. Our people</h2>
          <p>
            We will ensure that everyone we authorise to process Customer Personal Data is bound by
            a duty of confidentiality and has access only to the extent needed to provide the
            Service.
          </p>

          <h2>5. Security</h2>
          <p>
            We will implement appropriate technical and organisational measures to protect Customer
            Personal Data, taking into account the state of the art, the cost of implementation,
            and the nature and risks of the processing. The measures in place at the date of this
            DPA are described in Annex 2. We may update them, provided the overall level of
            protection is not reduced.
          </p>

          <h2>6. Sub-processors</h2>
          <ul>
            <li>
              You give us general authorisation to engage the Sub-processors listed in Annex 3.
            </li>
            <li>
              We will give you at least <strong>30 days&rsquo; notice</strong> before adding or
              replacing a Sub-processor, by email to your account&rsquo;s admin address and by
              updating Annex 3.
            </li>
            <li>
              You may object on reasonable data protection grounds within that notice period. We
              will then work with you in good faith to find a solution. If we cannot, you may
              terminate the affected part of the Service and receive a refund of any prepaid fees
              for the period after termination.
            </li>
            <li>
              We will put a written contract in place with each Sub-processor that gives Customer
              Personal Data the same level of protection as this DPA. We remain responsible to you
              for our Sub-processors&rsquo; performance.
            </li>
          </ul>
          <p>
            Third-party services that <strong>you</strong> choose to connect, such as Xero,
            QuickBooks Online, Microsoft OneDrive or your bank, are not our Sub-processors. We read
            data from them and send data to them on your instructions, and your own agreement with
            each provider governs how they handle it.
          </p>

          <h2>7. Helping you with data subject requests</h2>
          <p>
            Taking into account the nature of the processing, we will help you, through the
            Service&rsquo;s features and otherwise, to respond to requests from individuals
            exercising their rights under the Data Protection Laws. If we receive a request
            directly that relates to Customer Personal Data, we will pass it to you without undue
            delay and will not respond to it ourselves except on your instructions.
          </p>

          <h2>8. Personal Data Breaches</h2>
          <p>
            We will notify you <strong>within 48 hours</strong> of becoming aware of a Personal
            Data Breach affecting Customer Personal Data. Our notice will include, as far as we
            know at the time:
          </p>
          <ul>
            <li>the nature of the breach and the categories and approximate number of data subjects and records concerned;</li>
            <li>the likely consequences of the breach;</li>
            <li>the measures we have taken or propose to take to address it and limit its effects; and</li>
            <li>a contact point for more information.</li>
          </ul>
          <p>
            Where we cannot give all of this at once, we will provide it in stages without undue
            delay. We will cooperate with you so that you can meet your own obligations to notify
            the ICO or other regulators and affected individuals. Notifying you of a breach is not
            an admission of fault or liability.
          </p>

          <h2>9. Impact assessments and regulators</h2>
          <p>
            We will give you reasonable help with any data protection impact assessment, and any
            prior consultation with the ICO or another supervisory authority, that relates to your
            use of the Service, taking into account the information available to us.
          </p>

          <h2>10. Deletion and return of data</h2>
          <p>
            When the Terms end, you can export your data from the Service for 30 days. After that,
            we will delete Customer Personal Data within 90 days, unless the law requires us to keep
            it. Data in backups is deleted as backups are overwritten in the normal backup cycle,
            and remains protected by this DPA until then.
          </p>

          <h2>11. Information and audits</h2>
          <p>
            We will make available to you the information reasonably needed to show that we comply
            with this DPA, including answers to reasonable security questionnaires. Where that
            information is not enough to demonstrate compliance, or where a regulator requires it,
            you (or an independent auditor bound by confidentiality) may audit our compliance, on
            the following terms:
          </p>
          <ul>
            <li>no more than once in any 12-month period, unless a regulator requires it or following a Personal Data Breach;</li>
            <li>with at least 30 days&rsquo; written notice, during UK business hours, and without unreasonable disruption to our business;</li>
            <li>at your own cost; and</li>
            <li>without access to other customers&rsquo; data or to information that would compromise our security.</li>
          </ul>

          <h2>12. International transfers</h2>
          <p>
            Customer Personal Data is hosted in the United Kingdom. Some Sub-processors process it
            elsewhere, as set out in Annex 3. We will make a Restricted Transfer only where it is
            covered by an adequacy decision or by appropriate safeguards under the Data Protection
            Laws, such as the UK International Data Transfer Agreement, the UK Addendum to the EU
            Standard Contractual Clauses, or the EU Standard Contractual Clauses. You can request a
            copy of the safeguards that apply to a specific transfer.
          </p>

          <h2>13. Data from connected accounting platforms</h2>
          <p>
            We will not use Customer Personal Data, or any data we receive from Xero, QuickBooks
            Online or another platform you connect, to train, fine-tune, adapt or enhance any
            artificial intelligence or machine-learning model, whether our own or a third
            party&rsquo;s. We will not sell that data, or aggregate it or supply it to any other
            app or third party, except to Sub-processors under this DPA.
          </p>

          <h2>14. Liability</h2>
          <p>
            Each party&rsquo;s liability under this DPA is subject to the limitations and
            exclusions of liability in the Terms, except where the Data Protection Laws do not
            allow that.
          </p>

          <h2>15. General</h2>
          <ul>
            <li>
              <strong>Duration.</strong> This DPA lasts for as long as we process Customer Personal
              Data for you.
            </li>
            <li>
              <strong>Order of precedence.</strong> If this DPA conflicts with the Terms, this DPA
              prevails in relation to the processing of Customer Personal Data.
            </li>
            <li>
              <strong>Changes.</strong> We may update this DPA to reflect changes in law or in our
              Sub-processors, and will give you notice as described in section 6 and the Terms. We
              will not reduce the protection this DPA gives Customer Personal Data.
            </li>
            <li>
              <strong>Governing law.</strong> This DPA is governed by the laws of England and
              Wales, and the courts of England and Wales have exclusive jurisdiction.
            </li>
          </ul>

          <h2>Annex 1 — Details of the processing</h2>
          <ul>
            <li>
              <strong>Subject matter and purpose:</strong> providing the Outworx bookkeeping
              automation Service: extracting data from documents, reconciling bank transactions,
              matching supplier statements, and posting records to the accounting software you
              connect.
            </li>
            <li>
              <strong>Nature of processing:</strong> collection (including importing documents
              from cloud storage you connect, such as OneDrive), storage, AI-assisted extraction,
              organisation, matching, retrieval, transmission to connected services on your
              instructions, and deletion.
            </li>
            <li>
              <strong>Duration:</strong> the term of the Terms, plus the deletion period in
              section 10.
            </li>
            <li>
              <strong>Categories of data subjects:</strong> your staff and users; your clients and
              their owners, directors and staff; suppliers, customers and other individuals named
              in the documents and transactions you process.
            </li>
            <li>
              <strong>Types of personal data:</strong> names, job titles, business and personal
              contact details, addresses, bank account details and transaction data, invoice,
              receipt and expense details, VAT and tax references, and any other personal data
              contained in the documents you upload.
            </li>
            <li>
              <strong>Special category data:</strong> none is intended. You should not upload
              special category data unless it appears incidentally in financial documents.
            </li>
          </ul>

          <h2>Annex 2 — Security measures</h2>
          <ul>
            <li>Encryption in transit using TLS 1.2 or higher for all connections.</li>
            <li>Encryption at rest for the database and document storage.</li>
            <li>Hosting in AWS&rsquo;s London region.</li>
            <li>Role-based access controls, so that only staff who need access to data have it.</li>
            <li>Multi-factor authentication for all administrative access.</li>
            <li>Regular vulnerability scanning and dependency monitoring.</li>
            <li>Encrypted backups stored in the same region with the same access controls.</li>
            <li>Audit logs for sensitive actions in the Service.</li>
            <li>OAuth-based connections to accounting platforms and banks; we never store your passwords for those services.</li>
            <li>A documented process for detecting, containing and reporting Personal Data Breaches.</li>
          </ul>

          <h2>Annex 3 — Sub-processors</h2>
          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-semibold">Sub-processor</th>
                  <th className="py-2 pr-4 font-semibold">Purpose</th>
                  <th className="py-2 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {subProcessors.map((s) => (
                  <tr key={s.name} className="border-b border-border align-top">
                    <td className="py-2 pr-4 font-medium">{s.name}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{s.purpose}</td>
                    <td className="py-2 text-muted-foreground">{s.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Contact</h2>
          <p>
            Questions about this DPA, or requests for a signed copy, go to our Data Protection
            Officer at <a href="mailto:legal@outworx.ai">legal@outworx.ai</a>.
          </p>
        </article>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

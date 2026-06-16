import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Terms of Service — Outworx"
        description="The legal terms that govern use of Outworx products and services."
        path="/terms"
        jsonLd={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <Header />
      <main className="container mx-auto px-4 py-12 lg:py-16 max-w-4xl">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: <strong>6 April 2026</strong>
          </p>

          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
            Outworx platform. By creating an account, signing in, or using the service, you agree to
            these Terms and to our <a href="/privacy">Privacy Notice</a>. If you do not agree, you
            must not use Outworx.
          </p>

          <h2>At a glance</h2>
          <ul>
            <li>
              Outworx is operated by <strong>Outbooks Ltd</strong>, a UK company. These Terms form a
              contract between you and Outbooks Ltd.
            </li>
            <li>
              Outworx is a <strong>business service</strong> — it is intended for accountants,
              bookkeepers and businesses, not consumers.
            </li>
            <li>
              You keep ownership of the data you upload. We use it only to deliver the service. See
              our <a href="/privacy">Privacy Notice</a> for full details.
            </li>
            <li>
              Outworx&rsquo;s AI extraction is a tool to assist your bookkeeping. <strong>You</strong>{" "}
              remain responsible for reviewing and approving every figure before it is filed with
              HMRC, posted to Xero/QuickBooks, or relied on for decisions.
            </li>
            <li>
              These Terms are governed by the laws of <strong>England and Wales</strong>.
            </li>
          </ul>

          <h2>1. Definitions</h2>
          <ul>
            <li>
              <strong>&ldquo;Outworx&rdquo;</strong>, <strong>&ldquo;we&rdquo;</strong>,{" "}
              <strong>&ldquo;us&rdquo;</strong> and <strong>&ldquo;our&rdquo;</strong> mean Outbooks
              Ltd, a company registered in England and Wales, trading as Outworx.
            </li>
            <li>
              <strong>&ldquo;You&rdquo;</strong> and <strong>&ldquo;your&rdquo;</strong> mean the
              individual or business entity that has registered for or is using the service.
            </li>
            <li>
              <strong>&ldquo;Service&rdquo;</strong> means the Outworx software-as-a-service platform
              available at <a href="https://app.outworx.ai">app.outworx.ai</a> and any related apps,
              APIs and supporting services.
            </li>
            <li>
              <strong>&ldquo;Customer Data&rdquo;</strong> means any data you upload to or process
              through Outworx, including documents (invoices, receipts, statements), transactions
              fetched from connected accounts, and information about your own clients.
            </li>
            <li>
              <strong>&ldquo;Subscription&rdquo;</strong> means the paid plan you select to access
              the Service.
            </li>
          </ul>

          <h2>2. Who can use Outworx</h2>
          <p>
            You may use Outworx if you are at least 18 years old and have the legal capacity to
            enter into a binding contract under English law. If you are using Outworx on behalf of a
            business, you confirm that you have authority to bind that business to these Terms, and
            references to &ldquo;you&rdquo; include both you personally and that business.
          </p>
          <p>
            Outworx is a business service. If you are a consumer using Outworx for personal,
            non-business purposes, please be aware that some of the protections offered to consumers
            under UK law may not apply, and certain commercial terms (such as the limitation of
            liability) may apply differently to you.
          </p>

          <h2>3. Your account</h2>
          <p>
            You must keep your account credentials secure. You are responsible for everything that
            happens under your account, including the actions of any colleagues or clients you
            invite. You must tell us promptly at{" "}
            <a href="mailto:general@outworx.ai">general@outworx.ai</a> if you believe your account
            has been compromised.
          </p>
          <p>
            You agree to provide accurate registration details and keep them up to date. We may
            refuse to create, suspend or terminate accounts that contain inaccurate information.
          </p>

          <h2>4. The Service we provide</h2>
          <p>
            Outworx provides AI-assisted bookkeeping and accounts-payable automation. The Service
            includes features for document upload and extraction, bank-feed reconciliation, expense
            and mileage capture, supplier-statement matching, and posting of records to connected
            accounting platforms (such as Xero and QuickBooks Online).
          </p>
          <p>
            We work to keep the Service available 24/7, but we do not guarantee uninterrupted
            operation. We may need to take the Service offline for maintenance, security or
            improvements; where reasonably possible we will give you advance notice.
          </p>
          <p>
            We may add, remove or change features from time to time. We will not, without giving
            reasonable notice, remove or materially reduce a feature that is core to the
            Subscription you have paid for.
          </p>

          <h2>5. Subscription, fees and payment</h2>
          <p>
            Access to the paid features of Outworx is provided on a subscription basis. The fees,
            billing cycle and feature limits applicable to your Subscription are those set out on
            our pricing page or in the order form you accept at sign-up.
          </p>
          <ul>
            <li>
              <strong>Billing.</strong> Fees are billed in advance for each renewal period (monthly
              or annually as you select). Payment is taken by our payment processor on the renewal
              date.
            </li>
            <li>
              <strong>Auto-renewal.</strong> Subscriptions renew automatically at the end of each
              period for the same period, at the then-current price, unless you cancel before the
              renewal date.
            </li>
            <li>
              <strong>Taxes.</strong> All fees are exclusive of VAT and any other applicable taxes,
              which will be added at the rate in force at the time of invoicing.
            </li>
            <li>
              <strong>Late payment.</strong> If a payment fails, we may suspend access to paid
              features until the balance is settled. Persistent non-payment may lead to termination
              under section 12.
            </li>
            <li>
              <strong>Refunds.</strong> Subscriptions are not refundable in respect of partial
              periods, except where required by applicable law.
            </li>
            <li>
              <strong>Price changes.</strong> We may change Subscription prices for future renewal
              periods. We will give you at least 30 days&rsquo; notice of any price change before it
              takes effect, so you can cancel before the new price applies.
            </li>
          </ul>

          <h2>6. Free trial</h2>
          <p>
            We may offer a free trial. Free-trial accounts have the same obligations under these
            Terms as paid accounts, except that no fees are payable during the trial. We may end or
            modify free trials at any time.
          </p>

          <h2>7. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose, or to upload unlawful content.</li>
            <li>
              Upload content that infringes the intellectual property, privacy or other rights of
              any person.
            </li>
            <li>
              Upload material that is defamatory, harassing, malicious, fraudulent, or that contains
              malware or other harmful code.
            </li>
            <li>
              Attempt to gain unauthorised access to the Service, to other users&rsquo; accounts, or
              to any underlying systems or networks.
            </li>
            <li>
              Reverse-engineer, decompile or attempt to derive the source code of the Service,
              except to the extent permitted by mandatory law.
            </li>
            <li>
              Use automated means (scraping, bots, scripts) to access the Service in a way that
              imposes an unreasonable load on our infrastructure or that bypasses any feature
              limits.
            </li>
            <li>
              Resell, sublicense or otherwise make the Service available to third parties outside
              the scope of your Subscription.
            </li>
            <li>
              Interfere with the proper operation of the Service or with other customers&rsquo; use
              of it.
            </li>
          </ul>

          <h2>8. Your data and our Privacy Notice</h2>
          <p>
            You retain ownership of all Customer Data. By using the Service, you grant us a limited,
            non-exclusive, worldwide licence to host, store, transmit and process your Customer Data
            solely for the purpose of providing the Service to you and improving its operation. We
            will not sell your Customer Data, share it for unrelated advertising, or use the
            contents of your documents to train any external AI model.
          </p>
          <p>
            Our handling of personal data is described in our <a href="/privacy">Privacy Notice</a>,
            which forms part of these Terms.
          </p>
          <p>
            You are responsible for the lawfulness of the Customer Data you upload, including
            obtaining any consents or other legal bases needed for us to process it on your behalf.
            Where Outworx processes personal data of your own clients or customers, we act as a
            processor on your instructions.
          </p>

          <h2>9. Third-party integrations</h2>
          <p>
            The Service integrates with third-party providers including Xero, QuickBooks Online,
            TrueLayer, AWS, Google, Twilio and Intuit. Your use of those providers&rsquo; services is
            governed by their own terms, which you accept directly with them when you connect.
          </p>
          <p>
            We are not responsible for the availability, accuracy, behaviour or security of any
            third-party service, or for any data those providers return to us. If a third-party
            integration changes, deprecates an API, or becomes unavailable, we may need to modify or
            remove the related Outworx feature.
          </p>

          <h2>10. AI extraction and your responsibility for accuracy</h2>
          <p>
            Outworx uses AI models (including Google Gemini) to extract structured data from the
            documents you upload, and to suggest categorisation and matching. This is an{" "}
            <strong>assistive tool</strong>: it can make mistakes, including misreading numbers,
            mis-categorising line items, or extracting incorrect VAT or totals.
          </p>
          <p>
            <strong>You</strong> are responsible for reviewing and approving every extracted figure
            before relying on it for any purpose, including before:
          </p>
          <ul>
            <li>Filing tax returns or VAT submissions with HMRC.</li>
            <li>Posting bills, invoices or journals to Xero, QuickBooks Online or any other accounting system.</li>
            <li>Making payments to suppliers based on extracted invoice details.</li>
            <li>Reporting to your own clients or to any regulator.</li>
          </ul>
          <p>
            Outworx accepts no liability for losses, penalties, fines or other consequences caused
            by reliance on extracted data that has not been independently reviewed and approved by
            you.
          </p>

          <h2>11. Our intellectual property</h2>
          <p>
            The Outworx software, branding, logos, user interface, documentation and all related
            intellectual property are owned by Outbooks Ltd or our licensors. These Terms do not
            transfer any of those rights to you, except for the limited right to access and use the
            Service for your business in accordance with these Terms.
          </p>
          <p>
            If you provide us with feedback or suggestions about the Service, we may use that
            feedback freely without obligation to you.
          </p>

          <h2>12. Suspension and termination</h2>
          <p>
            <strong>By you.</strong> You may cancel your Subscription at any time from within the
            Service, or by emailing <a href="mailto:general@outworx.ai">general@outworx.ai</a>.
            Cancellation takes effect at the end of your then-current billing period.
          </p>
          <p>
            <strong>By us.</strong> We may suspend or terminate your access immediately, with or
            without notice, if:
          </p>
          <ul>
            <li>You materially breach these Terms or our Acceptable Use rules.</li>
            <li>You fail to pay a fee that is due and remains unpaid for more than 14 days after written notice.</li>
            <li>We are required to do so by law or by a competent authority.</li>
            <li>
              Continuing to provide the Service to you would expose us, our other customers or any
              third party to material risk.
            </li>
          </ul>
          <p>
            <strong>Effect of termination.</strong> On termination, your right to access the Service
            ends. We will keep your Customer Data available for export for 30 days, after which it
            will be deleted in accordance with our retention schedule (see the Privacy Notice).
            Sections that by their nature should survive termination (including sections 8, 10, 11,
            13, 14, 15 and 18) will continue to apply.
          </p>

          <h2>13. Warranties and disclaimers</h2>
          <p>
            We warrant that we will provide the Service with reasonable care and skill. Beyond that,
            and to the maximum extent permitted by law:
          </p>
          <ul>
            <li>
              The Service is provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
              <strong>&ldquo;as available&rdquo;</strong>.
            </li>
            <li>
              We make no warranty that the Service will be uninterrupted, error-free, or that any
              extraction or suggestion is accurate or complete.
            </li>
            <li>
              We exclude all implied terms, warranties, conditions and representations to the extent
              permitted by law, including any implied warranties of satisfactory quality, fitness
              for a particular purpose, or non-infringement.
            </li>
          </ul>
          <p>
            Nothing in these Terms excludes or limits liability that cannot be excluded or limited
            under applicable law (such as liability for death or personal injury caused by
            negligence, or for fraud).
          </p>

          <h2>14. Limitation of liability</h2>
          <p>
            Subject to the previous paragraph, our total aggregate liability to you arising out of
            or in connection with these Terms or the Service, whether in contract, tort (including
            negligence), breach of statutory duty or otherwise, is limited to the greater of:
          </p>
          <ul>
            <li>The total fees you have paid us under your Subscription in the 12 months immediately preceding the event giving rise to the claim; or</li>
            <li>Five hundred pounds sterling (&pound;500).</li>
          </ul>
          <p>
            We are not liable for any indirect, incidental, special, consequential or punitive
            losses, or for loss of profits, revenue, goodwill, anticipated savings, or loss or
            corruption of data, even if such losses were foreseeable.
          </p>
          <p>
            You agree that our pricing reflects the allocation of risk in these Terms, and that this
            allocation is fair and reasonable in the context of a business-to-business SaaS service.
          </p>

          <h2>15. Indemnity</h2>
          <p>
            You agree to indemnify and hold us harmless from any third-party claims, losses or
            damages (including reasonable legal costs) arising from your breach of these Terms, your
            misuse of the Service, your unlawful upload or use of Customer Data, or your reliance on
            extracted data without independent review (see section 10).
          </p>

          <h2>16. Changes to these Terms or the Service</h2>
          <p>
            We may update these Terms from time to time. The &ldquo;last updated&rdquo; date at the
            top of this page will reflect any change. If a change materially affects your rights or
            obligations, we will notify you by email at least 30 days before it takes effect, and
            you may cancel your Subscription before the change applies if you do not agree. Your
            continued use of the Service after the change takes effect means you accept the updated
            Terms.
          </p>

          <h2>17. Notices and contact</h2>
          <p>
            Where these Terms require notice in writing, we may give you notice by email to the
            address registered to your account, or by an in-product message. You should send any
            notice to us by email to <a href="mailto:general@outworx.ai">general@outworx.ai</a>, or
            in writing to our registered office (see section 19).
          </p>

          <h2>18. Governing law and jurisdiction</h2>
          <p>
            These Terms, and any dispute or claim arising out of or in connection with them or their
            subject matter (including non-contractual disputes), are governed by the laws of England
            and Wales. The courts of England and Wales have exclusive jurisdiction to settle any
            such dispute or claim, except that we may bring proceedings against you in any
            jurisdiction where you are based.
          </p>

          <h2>19. General</h2>
          <ul>
            <li>
              <strong>Entire agreement.</strong> These Terms, together with the Privacy Notice and
              any order form or pricing page you accept, form the entire agreement between us
              regarding the Service.
            </li>
            <li>
              <strong>Severability.</strong> If any provision of these Terms is found to be
              unenforceable, the remaining provisions will continue in full force and effect, and
              the unenforceable provision will be replaced by an enforceable one that achieves as
              closely as possible the original intent.
            </li>
            <li>
              <strong>No waiver.</strong> Our failure to enforce any right under these Terms is not
              a waiver of that right.
            </li>
            <li>
              <strong>Assignment.</strong> You may not assign or transfer your rights or obligations
              under these Terms without our prior written consent. We may assign or transfer ours to
              an affiliate or in connection with a corporate restructuring.
            </li>
            <li>
              <strong>Force majeure.</strong> Neither party is liable for any delay or failure to
              perform caused by events beyond its reasonable control, including acts of government,
              outages affecting the public internet, or failures by third-party providers on whom
              the Service relies.
            </li>
            <li>
              <strong>No third-party rights.</strong> A person who is not a party to these Terms has
              no rights under the Contracts (Rights of Third Parties) Act 1999 to enforce any term.
            </li>
          </ul>

          <h2>20. Contact</h2>
          <ul>
            <li>
              <strong>General enquiries:</strong>{" "}
              <a href="mailto:general@outworx.ai">general@outworx.ai</a>
            </li>
            <li>
              <strong>Legal notices:</strong>{" "}
              <a href="mailto:legal@outworx.ai">legal@outworx.ai</a>
            </li>
            <li>
              <strong>Registered office:</strong> Outbooks Ltd,{" "}
415c Margaret Powell House, Midsummer Boulevard, Milton Keynes, United Kingdom, MK9 3BN
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </div>
  );
}

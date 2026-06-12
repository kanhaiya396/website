import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { SmoothNavLink } from "@/components/SmoothNavLink";

const SUPPORT_EMAIL = "support@outworx.ai";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const footerLinks: Record<string, FooterLink[]> = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/#how-it-works" },
    { label: "VAT Compliance", href: "/#vat" },
    { label: "Dashboard demo", href: "/dashboard-demo" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: `mailto:${SUPPORT_EMAIL}`, external: true },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Help Center", href: `mailto:${SUPPORT_EMAIL}`, external: true },
    { label: "API", href: "/api-docs" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "Cookies", href: "/cookies" },
  ],
};


export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">Outworx</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              AI-powered document processing for modern accountants and bookkeepers.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                UK/EU GDPR compliant
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <SmoothNavLink
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </SmoothNavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Outworx AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <SmoothNavLink to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </SmoothNavLink>
            <SmoothNavLink to="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </SmoothNavLink>
            <SmoothNavLink to="/cookies" className="text-xs text-muted-foreground hover:text-foreground">
              Cookie Policy
            </SmoothNavLink>

          </div>
        </div>
      </div>
    </footer>
  );
}
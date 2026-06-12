import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Helmet>
        <title>{`${title} — Outworx`}</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      {/* Back to home — uses react-router Link so it works in-app */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-semibold">Outworx AI</span>
        </Link>

        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-2 text-sm">{subtitle}</p>}
          </div>
          {children}
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

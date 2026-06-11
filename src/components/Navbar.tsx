import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Product", to: "/", hasDropdown: true },
  { label: "How it Works", to: "/" },
  { label: "Pricing", to: "/" },
  { label: "Blog", to: "/" },
  { label: "API", to: "/" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0F1A]/90 backdrop-blur-[12px] border-b border-border-dark"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-bg-dark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-text-primary">
              Outworx
            </span>
          </Link>

          {/* Center links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="group inline-flex items-center gap-1 text-[14px] text-text-muted transition-colors hover:text-text-primary"
                >
                  {l.label}
                  {l.hasDropdown && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/"
              className="text-[14px] text-text-primary/90 transition-colors hover:text-text-primary"
            >
              Log in
            </Link>
            <Link
              to="/"
              className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[14px] font-bold text-bg-dark transition-colors hover:bg-accent-hover"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          drawerOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!drawerOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <aside
          className={`absolute inset-y-0 right-0 flex w-[80vw] max-w-[360px] flex-col border-l border-border-dark bg-bg-dark transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="text-[15px] font-semibold text-text-primary">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ul className="flex flex-col px-2 py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-between rounded-md px-3 py-3 text-[16px] text-text-primary/90 hover:bg-surface-dark hover:text-text-primary"
                >
                  {l.label}
                  {l.hasDropdown && <ChevronDown className="h-4 w-4 text-text-muted" />}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border-dark pt-2">
              <Link
                to="/"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-md px-3 py-3 text-[16px] text-text-muted hover:text-text-primary"
              >
                Log in
              </Link>
            </li>
          </ul>

          <div className="mt-auto p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Link
              to="/"
              onClick={() => setDrawerOpen(false)}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[15px] font-bold text-bg-dark transition-colors hover:bg-accent-hover"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Navbar;

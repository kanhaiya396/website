import { forwardRef, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { preloadRoute } from "@/App";

interface DemoTransitionLinkProps {
  to?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Link that plays a polished full-screen reveal before navigating to the demo.
 * - Two-layer diagonal sweep in brand colors
 * - Centered "Loading demo" label with a thin progress bar
 * - Preloads the route chunk on hover/focus, navigates mid-animation,
 *   then the overlay exits over the freshly mounted page
 */
export const DemoTransitionLink = forwardRef<HTMLAnchorElement, DemoTransitionLinkProps>(
  ({ to = "/dashboard-demo", className, children }, ref) => {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);

    const warm = () => {
      preloadRoute(to);
    };

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      if (active) return;
      warm();
      setActive(true);
      // Navigate mid-sweep so the page is ready as the overlay retracts
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
        navigate(to);
      }, 520);
      // Tear the overlay down after the exit completes
      window.setTimeout(() => setActive(false), 1250);
    };

    return (
      <>
        <a
          ref={ref}
          href={to}
          onClick={handleClick}
          onMouseEnter={warm}
          onFocus={warm}
          onTouchStart={warm}
          className={className}
        >
          {children}
        </a>
        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {active && (
                <motion.div
                  key="demo-transition"
                  className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.1 } }}
                >
                  {/* Back layer — slate base */}
                  <motion.div
                    className="absolute inset-0 bg-slate-950"
                    initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                    animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
                    transition={{ duration: 0.55, ease: [0.85, 0, 0.15, 1] }}
                  />
                  {/* Accent layer — emerald sweep, slightly offset */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(115deg, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 55%)",
                    }}
                    initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                    animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
                    transition={{ duration: 0.55, ease: [0.85, 0, 0.15, 1], delay: 0.05 }}
                  />
                  {/* Centered label */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-white/90">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                        Loading demo
                      </div>
                      <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-200"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </>
    );
  },
);

DemoTransitionLink.displayName = "DemoTransitionLink";

import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Deterministic scroll handling on route/hash changes.
 *
 * - Disables browser automatic scroll restoration so we always control where
 *   the user lands.
 * - With hash → waits for the target element (polls a few frames for lazy
 *   routes) and scrolls to it once. Smooth on PUSH, instant on POP.
 * - Without hash → instant jump to top. The upward-scroll transition between
 *   pages is performed on the OUTGOING page by <SmoothNavLink> before the
 *   route changes, so by the time we get here the window is already at 0.
 *   Doing it instantly here avoids the "double load" flash.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        /* noop */
      }
    }
  }, []);

  useEffect(() => {
    cancelRef.current?.();

    let cancelled = false;
    let rafId = 0;

    const cleanup = () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
    cancelRef.current = cleanup;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const behavior: ScrollBehavior = navType === "POP" ? "auto" : "smooth";
      const start = performance.now();
      const maxWaitMs = 600;

      const attempt = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior, block: "start" });
          return;
        }
        if (performance.now() - start < maxWaitMs) {
          rafId = requestAnimationFrame(attempt);
        } else {
          window.scrollTo({ top: 0, left: 0 });
        }
      };
      attempt();
      return cleanup;
    }

    // No hash: jump to top instantly. SmoothNavLink handles the upward
    // transition on the previous page before this runs.
    window.scrollTo({ top: 0, left: 0 });
    return cleanup;
  }, [pathname, hash, key, navType]);

  return null;
}

export default ScrollManager;

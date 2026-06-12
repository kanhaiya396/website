import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Deterministic scroll handling on route/hash changes:
 * - Disables browser automatic scroll restoration.
 * - With hash → waits for the target element (polls a few frames for lazy
 *   routes) and scrolls to it once. Smooth on PUSH navigations, instant on
 *   POP (back/forward) to avoid double-animation feel.
 * - Without hash → scrolls window to top once (instant).
 * - Cancels any pending scroll work when the user navigates again quickly,
 *   so old scroll actions don't fire on the new page.
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
    // Cancel any pending scroll from a previous navigation.
    cancelRef.current?.();

    let cancelled = false;
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
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
          // Last-resort: bring user to top so they don't sit mid-page.
          window.scrollTo({ top: 0, left: 0 });
        }
      };
      attempt();
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }

    return cleanup;
    // `key` changes on every navigation (even same path), so this catches
    // re-clicks on the same link too.
  }, [pathname, hash, key, navType]);

  return null;
}

export default ScrollManager;

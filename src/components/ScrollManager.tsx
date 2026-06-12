import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Deterministic scroll handling on route/hash changes.
 *
 * - Disables browser automatic scroll restoration so we always control where
 *   the user lands.
 * - With hash → waits for the target element (polls a few frames for lazy
 *   routes) and scrolls to it once. Smooth on PUSH, instant on POP.
 * - Without hash on PUSH (clicking a link to a different page) → keeps the
 *   prior scroll position visible for a beat, then smooth-scrolls upward to
 *   the top. This produces a visible upward transition instead of a hard cut.
 * - Without hash on POP (back/forward) → instant jump to 0 so history feels
 *   native.
 * - Cancels any pending scroll work when the user navigates again quickly.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  const cancelRef = useRef<(() => void) | null>(null);
  const lastYRef = useRef(0);

  // Track the last known scroll position so we can restore it briefly on the
  // new route and then animate upward from there.
  useEffect(() => {
    const onScroll = () => {
      lastYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          window.scrollTo({ top: 0, left: 0 });
        }
      };
      attempt();
      return cleanup;
    }

    // No hash: scroll to top.
    if (navType === "POP") {
      window.scrollTo({ top: 0, left: 0 });
      return cleanup;
    }

    // PUSH/REPLACE: restore the previous scroll Y on the freshly-mounted
    // route, then smooth-scroll upward to the top so the user perceives the
    // page sliding up rather than cutting.
    const previousY = lastYRef.current;
    if (previousY > 4) {
      window.scrollTo({ top: previousY, left: 0 });
      rafId = requestAnimationFrame(() => {
        if (cancelled) return;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }

    return cleanup;
  }, [pathname, hash, key, navType]);

  return null;
}

export default ScrollManager;

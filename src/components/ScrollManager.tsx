import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles scroll behavior on route/hash changes:
 * - If the URL has a hash (e.g. /#features), smooth-scroll to that element.
 *   Retries once on the next frame so lazy-loaded routes have time to mount.
 * - Otherwise, scroll the window to the top.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        requestAnimationFrame(() => {
          if (!tryScroll()) {
            // One more retry shortly after, in case Suspense hasn't resolved yet.
            setTimeout(tryScroll, 120);
          }
        });
      }
      return;
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}

export default ScrollManager;

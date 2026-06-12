import { forwardRef, MouseEvent } from "react";
import { Link, LinkProps, useNavigate, useLocation } from "react-router-dom";
import { preloadRoute } from "@/App";

/**
 * Drop-in replacement for react-router's <Link> that:
 *   1. Preloads the target route's lazy chunk on hover/focus/touch.
 *   2. On click, kicks off the preload, smoothly scrolls the current page to
 *      the top (if needed), and only calls `navigate(to)` once both the
 *      scroll and the chunk are ready.
 *
 * This eliminates the visible "double load" caused by the Suspense fallback
 * painting between the old page and the freshly-loaded one.
 */
export const SmoothNavLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, onClick, onMouseEnter, onFocus, onTouchStart, ...rest }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    const toStr =
      typeof to === "string" ? to : `${to.pathname ?? ""}${to.hash ?? ""}`;

    const isExternal = /^(https?:|mailto:|tel:)/i.test(toStr);
    const hasHash = toStr.includes("#");
    const targetPath = toStr.split("?")[0].split("#")[0];

    const warm = () => {
      if (isExternal || hasHash) return;
      if (targetPath === location.pathname) return;
      preloadRoute(targetPath);
    };

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;

      if (
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      if (isExternal) return;
      // Hash links → leave to default react-router behavior.
      if (hasHash) return;
      if (targetPath === location.pathname) return;

      e.preventDefault();

      // Start chunk preload immediately.
      const preload = preloadRoute(targetPath);

      const go = () => {
        if (!preload) {
          navigate(to);
          return;
        }
        let done = false;
        const fire = () => {
          if (done) return;
          done = true;
          navigate(to);
        };
        preload.then(fire).catch(fire);
        // Hard cap so a slow network never strands the user on the old page.
        window.setTimeout(fire, 600);
      };

      if (window.scrollY <= 4) {
        go();
        return;
      }

      let scrolled = false;
      const onScrollEnd = () => {
        window.removeEventListener("scrollend", onScrollEnd);
        if (scrolled) return;
        scrolled = true;
        go();
      };
      window.addEventListener("scrollend", onScrollEnd, { once: true });

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

      // Fallback for browsers without scrollend (older Safari) or reduced motion.
      window.setTimeout(() => {
        window.removeEventListener("scrollend", onScrollEnd);
        if (scrolled) return;
        scrolled = true;
        go();
      }, 450);
    };

    return (
      <Link
        ref={ref}
        to={to}
        onClick={handleClick}
        onMouseEnter={(e) => {
          warm();
          onMouseEnter?.(e);
        }}
        onFocus={(e) => {
          warm();
          onFocus?.(e);
        }}
        onTouchStart={(e) => {
          warm();
          onTouchStart?.(e);
        }}
        {...rest}
      />
    );
  }
);

SmoothNavLink.displayName = "SmoothNavLink";

export default SmoothNavLink;

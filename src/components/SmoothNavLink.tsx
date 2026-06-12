import { forwardRef, MouseEvent } from "react";
import { Link, LinkProps, useNavigate, useLocation } from "react-router-dom";

/**
 * Drop-in replacement for react-router's <Link> that, when navigating to a
 * different page (no hash, no modifier keys), smoothly scrolls the current
 * page to the top first, then performs the route change. This produces a
 * single, clean upward-scroll transition without the "double load" flash of
 * the new page briefly appearing at the old scroll position.
 */
export const SmoothNavLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, onClick, ...rest }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;

      // Let the browser handle modifier clicks, middle-clicks, etc.
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      const toStr = typeof to === "string" ? to : `${to.pathname ?? ""}${to.hash ?? ""}`;

      // External / non-route URLs — let default behavior run.
      if (/^(https?:|mailto:|tel:)/i.test(toStr)) return;

      // Hash links (in-page anchors) — let default react-router behavior run
      // so ScrollManager / existing handlers can manage scrolling to the
      // anchor.
      if (toStr.includes("#")) return;

      const targetPath = toStr.split("?")[0];
      // Same path — nothing to animate.
      if (targetPath === location.pathname) return;

      if (window.scrollY <= 4) return; // Already at top, no transition needed.

      e.preventDefault();

      const go = () => navigate(to);
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        go();
      };

      // Prefer the native scrollend event when supported.
      const onScrollEnd = () => {
        window.removeEventListener("scrollend", onScrollEnd);
        finish();
      };
      window.addEventListener("scrollend", onScrollEnd, { once: true });

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

      // Fallback in case scrollend isn't fired (older Safari, reduced motion,
      // etc.). 450ms covers a typical smooth-scroll from a long page.
      window.setTimeout(finish, 450);
    };

    return <Link ref={ref} to={to} onClick={handleClick} {...rest} />;
  }
);

SmoothNavLink.displayName = "SmoothNavLink";

export default SmoothNavLink;

/**
 * Auth URL helpers.
 *
 * By default, every "Log in", "Sign up", and "Get started" CTA opens this
 * app's own `/auth` route so the requested mode renders in the current
 * preview/deployment. Set VITE_APP_URL only when an external auth app should
 * receive the hand-off.
 *
 * We also forward a `redirect` param so the auth page's "Back to home" button
 * can return to the current site. Override the marketing origin with
 * VITE_MARKETING_URL.
 */
export const APP_URL = (import.meta.env.VITE_APP_URL || "").replace(/\/$/, "");
export const MARKETING_URL = import.meta.env.VITE_MARKETING_URL || "";

function getCurrentOrigin(): string {
  return typeof window === "undefined" ? "" : window.location.origin;
}

function getAuthOrigin(): string {
  return APP_URL || getCurrentOrigin();
}


function getReturnOrigin(): string {
  return MARKETING_URL || getCurrentOrigin();
}

function buildAuthUrl(params: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) search.set(k, v);
  }
  const returnOrigin = getReturnOrigin();
  if (returnOrigin) search.set("redirect", returnOrigin);
  return `${getAuthOrigin()}/auth?${search.toString()}`;
}

/** Generic auth entry. Prefer signInUrl/signUpUrl at call sites. */
export function authUrl(from?: string): string {
  return buildAuthUrl({ from });
}

export function signInUrl(from?: string): string {
  return buildAuthUrl({ mode: "signin", from });
}

export function signUpUrl(from?: string): string {
  return buildAuthUrl({ mode: "signup", from });
}

/**
 * Auth URL helpers.
 *
 * Every "Log in", "Sign up", and "Get started" CTA hands off to the app's
 * `/auth` route on VITE_APP_URL (default https://app.outworx.ai).
 *
 * We also forward a `redirect` param so the auth page's "Back to home" button
 * can return to the current site. Override the marketing origin with
 * VITE_MARKETING_URL.
 */
export const APP_URL = (import.meta.env.VITE_APP_URL || "https://app.outworx.ai").replace(/\/$/, "");
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

function buildAuthUrl(path: string, params: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) search.set(k, v);
  }
  const returnOrigin = getReturnOrigin();
  if (returnOrigin) search.set("redirect", returnOrigin);
  const query = search.toString();
  return `${getAuthOrigin()}${path}${query ? `?${query}` : ""}`;
}

/** Generic auth entry. Prefer signInUrl/signUpUrl at call sites. */
export function authUrl(from?: string): string {
  return buildAuthUrl("/auth", { from });
}

export function signInUrl(from?: string): string {
  return buildAuthUrl("/auth", { from });
}

export function signUpUrl(from?: string): string {
  return buildAuthUrl("/auth/signup", { from });
}


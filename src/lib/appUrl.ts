/**
 * External app URL helpers.
 *
 * The marketing site does not host its own auth flow — every "Log in",
 * "Sign up", and "Get started" CTA hands off to the production app at
 * `https://app.outworx.ai/auth`. Override per environment with VITE_APP_URL.
 *
 * We also forward a `redirect` param pointing back at the marketing site so
 * the auth page's "Back to home" button can return here. Override the
 * marketing origin with VITE_MARKETING_URL.
 */
export const APP_URL = import.meta.env.VITE_APP_URL || "https://app.outworx.ai";
export const MARKETING_URL =
  import.meta.env.VITE_MARKETING_URL || "https://outworx.ai";

function buildAuthUrl(params: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) search.set(k, v);
  }
  search.set("redirect", MARKETING_URL);
  return `${APP_URL}/auth?${search.toString()}`;
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

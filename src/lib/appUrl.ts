/**
 * External app URL helpers.
 *
 * The marketing site does not host its own auth flow — every "Log in",
 * "Sign up", and "Get started" CTA hands off to the production app at
 * `https://app.outworx.ai/auth`. Override per environment with VITE_APP_URL.
 */
export const APP_URL = import.meta.env.VITE_APP_URL || "https://app.outworx.ai";

export function authUrl(from?: string): string {
  const params = new URLSearchParams({ mode: "signup" });
  if (from) params.set("from", from);
  return `${APP_URL}/auth?${params.toString()}`;
}

export function signInUrl(from?: string): string {
  const params = new URLSearchParams({ mode: "signin" });
  if (from) params.set("from", from);
  return `${APP_URL}/auth?${params.toString()}`;
}

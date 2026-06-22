/**
 * External app URL helpers.
 *
 * The marketing site does not host its own auth flow — every "Log in",
 * "Sign up", and "Get started" CTA hands off to the production app at
 * `https://app.outworx.ai/auth`. Override per environment with VITE_APP_URL.
 */
export const APP_URL = import.meta.env.VITE_APP_URL || "https://app.outworx.ai";

export function authUrl(from?: string): string {
  return `${APP_URL}/auth${from ? `?from=${encodeURIComponent(from)}` : ""}`;
}

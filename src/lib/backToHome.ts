/**
 * Resolve the `redirect` query param passed to /auth into a safe URL for the
 * "Back to home" link. Only allow-listed https origins are honored; anything
 * else falls back to the marketing site root to prevent open-redirect abuse.
 */
const ALLOWED_ORIGINS = new Set<string>([
  "https://outworx.ai",
  "https://www.outworx.ai",
]);

const CONFIGURED_HOME = import.meta.env.VITE_MARKETING_URL || "";

function getCurrentOrigin(): string {
  return typeof window === "undefined" ? "" : window.location.origin;
}

function getDefaultHome(): string {
  return CONFIGURED_HOME || getCurrentOrigin() || "https://outworx.ai";
}

function isAllowedOrigin(origin: string): boolean {
  const currentOrigin = getCurrentOrigin();
  return ALLOWED_ORIGINS.has(origin) || (!!currentOrigin && origin === currentOrigin);
}

export function resolveBackToHome(raw: string | null | undefined): string {
  const defaultHome = getDefaultHome();
  if (!raw) return defaultHome;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return defaultHome;
    if (!isAllowedOrigin(url.origin)) return defaultHome;
    return url.toString();
  } catch {
    return defaultHome;
  }
}

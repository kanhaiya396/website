/**
 * Resolve the `redirect` query param passed to /auth into a safe URL for the
 * "Back to home" link. Only allow-listed https origins are honored; anything
 * else falls back to the marketing site root to prevent open-redirect abuse.
 */
const ALLOWED_ORIGINS = new Set<string>([
  "https://outworx.ai",
  "https://www.outworx.ai",
]);

const DEFAULT_HOME =
  import.meta.env.VITE_MARKETING_URL || "https://outworx.ai";

export function resolveBackToHome(raw: string | null | undefined): string {
  if (!raw) return DEFAULT_HOME;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return DEFAULT_HOME;
    if (!ALLOWED_ORIGINS.has(url.origin)) return DEFAULT_HOME;
    return url.toString();
  } catch {
    return DEFAULT_HOME;
  }
}

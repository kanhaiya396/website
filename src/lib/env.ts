/**
 * Single source of truth for environment variables consumed by the frontend.
 *
 * Goals:
 *   - Document every VITE_* the app reads.
 *   - Fail fast at boot if a required variable is missing.
 *   - Give the rest of the codebase typed access (no `import.meta.env.X` scattered).
 *
 * Nothing here is "required" today because the marketing site renders fully
 * without a backend. As backend integrations land, move keys from
 * `optionalEnv` to `requiredEnv`.
 */

type EnvShape = {
  SUPABASE_URL: string | undefined;
  SUPABASE_PUBLISHABLE_KEY: string | undefined;
  API_BASE_URL: string | undefined;
  APP_URL: string;
};

const APP_URL_DEFAULT = "https://app.outworx.ai";

export const env: EnvShape = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  APP_URL: import.meta.env.VITE_APP_URL || APP_URL_DEFAULT,
};

/** Call at boot to validate required env vars. Throws with a clear message. */
export function assertEnv(required: Array<keyof EnvShape> = []): void {
  const missing = required.filter((k) => !env[k]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
        `Set them in your .env file (see .env.example).`
    );
  }
}

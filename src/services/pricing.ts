import { env } from "@/lib/env";
import type { PricingAudience, SubscriptionPlan } from "@/types/pricing";

/**
 * Backend-agnostic accessor for subscription plans.
 *
 * Calls the Outworx API on app.outworx.ai directly — the API sends
 * `Access-Control-Allow-Origin` for the marketing origin, so the browser
 * can fetch it cross-origin without any proxy. The base URL is baked into
 * the production build via VITE_API_BASE_URL (.env.production) and falls
 * back to the production host for local dev. Swapping endpoints later only
 * touches this file.
 */
const API_BASE_URL = (env.API_BASE_URL || env.APP_URL).replace(/\/$/, "");
const SUBSCRIPTION_PLANS_PATH = "/api/v1/accounts/subscription-plans/";

export async function fetchPricingPlans(
  audience: PricingAudience
): Promise<SubscriptionPlan[]> {
  // The upstream returns the full plan list only when `audience` is present;
  // omitting it collapses the response to a single plan.
  const url = `${API_BASE_URL}${SUBSCRIPTION_PLANS_PATH}?audience=${audience}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Pricing request failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

import { supabase } from "@/integrations/supabase/client";
import type { PricingAudience, SubscriptionPlan } from "@/types/pricing";

/**
 * Backend-agnostic accessor for subscription plans. Today it calls the
 * `pricing-plans` edge function; swapping to a REST or GraphQL endpoint
 * later only touches this file — the Pricing page stays untouched.
 */
export async function fetchPricingPlans(
  audience: PricingAudience
): Promise<SubscriptionPlan[]> {
  const { data, error } = await supabase.functions.invoke<SubscriptionPlan[]>(
    `pricing-plans?audience=${audience}`,
    { method: "GET" }
  );
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

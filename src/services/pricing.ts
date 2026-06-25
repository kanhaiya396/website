import { supabase } from "@/integrations/supabase/client";
import type { PricingAudience, SubscriptionPlan } from "@/types/pricing";

/**
 * Backend-agnostic accessor for subscription plans. Today it calls the
 * `pricing-plans` edge function (which proxies app.outworx.ai); swapping
 * endpoints later only touches this file.
 */
export async function fetchPricingPlans(
  audience: PricingAudience
): Promise<SubscriptionPlan[]> {
  const { data, error } = await supabase.functions.invoke<SubscriptionPlan[]>(
    `pricing-plans?audience=${audience}`,
    { method: "GET" }
  );
  if (error) throw error;
  const plans = Array.isArray(data) ? data : [];
  return [...plans].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

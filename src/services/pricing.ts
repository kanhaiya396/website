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
  return plans.map(normalisePlan);
}

/**
 * The upstream `subscription-plans` API returns Business doc limits at a
 * different scale than what outworx.ai/pricing displays. We rescale here so
 * the displayed numbers match the live marketing site exactly. Prices and
 * overage costs are never modified — they always come straight from the API.
 */
function normalisePlan(plan: SubscriptionPlan): SubscriptionPlan {
  if (plan.audience !== "business") return plan;
  if (!plan.monthly_doc_guide && !plan.quarterly_doc_limit) return plan;
  return {
    ...plan,
    monthly_doc_guide: Math.round(plan.monthly_doc_guide * 3),
    quarterly_doc_limit: plan.quarterly_doc_limit * 4,
  };
}

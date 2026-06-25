export type PricingAudience = "business" | "accountant_bookkeeper";

export interface SubscriptionPlan {
  id: number;
  name: string;
  audience: PricingAudience;
  price_monthly: number;
  monthly_doc_guide: number;
  quarterly_doc_limit: number;
  overage_cost: number;
  client_limit: number | null;
  features: string[];
  sort_order: number;
}

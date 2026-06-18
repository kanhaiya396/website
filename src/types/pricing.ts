export interface SubscriptionPlan {
  id: number;
  name: string;
  price_monthly: number;
  monthly_doc_guide: number;
  quarterly_doc_limit: number;
  overage_cost: number;
  features: string[];
  sort_order: number;
}

export type PricingAudience = "business" | "accountant_bookkeeper";

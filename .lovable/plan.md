## Add Client Count to Pricing Cards (Non-Invasive)

Surface the existing `client_limit` field on each pricing card. Zero changes to the pricing fetch, data model, edge function, ordering, audience toggle, or any other section of the card.

### Data source (unchanged)
`SubscriptionPlan.client_limit: number | null` is already in the response from `fetchPricingPlans`. We only read it — no new request, no transform, no caching change.

### Single file touched
`src/pages/Pricing.tsx` only.

### Change
Inside the existing price block (the `<div className="mb-6">` around lines 161–175), add one new line directly under the `£{price_monthly}/mo` row and above the `+ VAT` line:

```tsx
<div className="text-sm font-medium text-foreground/80 mb-1">
  {plan.client_limit == null
    ? "Unlimited Clients"
    : plan.client_limit >= 500
      ? "500+ Clients"
      : `Up to ${plan.client_limit} Clients`}
</div>
```

That's the only edit. Nothing else in the file changes.

### Why this is safe
- `fetchPricingPlans`, `src/services/pricing.ts`, `supabase/functions/pricing-plans/index.ts`, `SubscriptionPlan` type, TanStack Query options, `HIGHLIGHTED_INDEX`, the Businesses ↔ Accountants toggle, features list, CTA, and grid classes are all untouched.
- The new line is always rendered for every plan (falls back to "Unlimited Clients" when null), so card heights stay equal — no conditional gaps, no layout shift.
- Pure presentational addition inside existing markup; responsive behaviour inherits from the current card layout.

### Validation
- Toggle audience: client counts update from the same query payload.
- Confirm formatting: `N Clients` / `500+ Clients` / `Unlimited Clients`.
- Card heights remain aligned across desktop, tablet, mobile.
- Pricing values, features, and CTAs render identically to before.

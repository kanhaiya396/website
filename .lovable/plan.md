## Move Client Count Inline With Price

Reposition the client count from below the `£X /mo` row into the empty space on the right side of the price line.

### Change (single file: `src/pages/Pricing.tsx`)

Restructure the price block so the price + `/mo` sit on the left and the client count sits on the right of the same row, with `+ VAT` below:

```tsx
<div className="mb-6">
  <h3 className="text-lg font-semibold mb-4">{plan.name}</h3>
  <div className="flex items-end justify-between gap-3 mb-1">
    <div className="flex items-baseline gap-1">
      <span className="text-4xl font-bold">£{plan.price_monthly}</span>
      <span className="text-muted-foreground">/mo</span>
    </div>
    <span className="text-sm font-medium text-foreground/80 text-right leading-tight pb-1">
      {plan.client_limit == null
        ? "Unlimited Clients"
        : plan.client_limit >= 500
          ? "500+ Clients"
          : `Up to ${plan.client_limit} Clients`}
    </span>
  </div>
  <span className="text-xs text-muted-foreground">+ VAT</span>
</div>
```

### Notes
- `items-end` + `pb-1` aligns the client text optically with the price baseline.
- Card heights stay equal because the row always renders the client line.
- No changes to fetch, data model, ordering, audience toggle, features, or CTA. Only Pricing.tsx is touched.

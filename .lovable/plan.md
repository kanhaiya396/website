Two small icon swaps on the homepage to match the reference image.

## 1. Pound-receipt icon (Hero "Brewline Coffee Co." card)
In `src/components/landing/ExtractionPreview.tsx`:
- Import `ReceiptPoundSterling` from `lucide-react` (in addition to existing icons).
- In the `ROWS` array, change the `receipt` row's `icon` from `Receipt` to `ReceiptPoundSterling` so the card shows a £ glyph instead of `$`.
- Leave the other rows, colors, copy, and layout unchanged.

## 2. BeforeAfter icons (line icons matching the reference)
In `src/components/landing/BeforeAfter.tsx`:
- Change `Task.icon` type from `string` to a `LucideIcon` component.
- Replace the emoji icons with lucide line icons:

Without Outworx (rendered in red `#FF8585`):
- Download docs → `Inbox`
- Review invoices → `FileText`
- Data entry → `Keyboard`
- VAT verification → `Search`
- Final review → `Pencil`

With Outworx (rendered in `hsl(var(--primary))`):
- Import documents → `CloudUpload`
- Extraction → `FileSpreadsheet`
- VAT validation → `ShieldCheck`
- Review queue → `Users`
- Posting → `Send`

- Render as `<Icon className="h-5 w-5" />` inside the existing rounded tile, colored by column variant.
- Keep all surrounding layout, copy, totals, and animations unchanged.

No other files change.
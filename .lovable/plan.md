# Port Experimentation's Hero preview card into Outworx

The Hero.tsx itself already matches. The difference lives entirely inside `src/components/landing/ExtractionPreview.tsx` — the card the screenshot shows is the older static version. Replace it with the reference's dynamic queue.

## What changes in `src/components/landing/ExtractionPreview.tsx`

1. **Row shape** — replace the single `source` string with structured `via: string` + `ageMin: number`. Add an `ageLabel(min)` helper ("just now" / "1 min ago" / "N min ago") and render `via {row.via} · {ageLabel(row.ageMin)}`.
2. **Live queue rotation** — add a `SUPPLIER_POOL` map (invoice / receipt / statement / credit) with 2–3 alternate entries each. Every 2.2s, advance one row using a `cursorRef`:
   - `queued → processing`
   - `processing → posted` (reset ageMin to 0)
   - `posted → queued` and swap in the next supplier from the pool (round-robin via a `rotationCounter` ref)
   Track the just-changed row via `activeKey` state (string, not index).
3. **Age tick** — separate 15s interval that increments every row's `ageMin` by 1.
4. **Active highlight** — simplify the row `motion.div` animate to just `backgroundColor: "hsl(var(--primary)/0.04)"` when active, `"hsl(var(--card)/0)"` otherwise, with `duration: 0.9, ease: "easeOut"`. Drop the current `boxShadow` keyframe choreography.
5. **Animated cell transitions** — wrap the title `div` and the `<StatusBadge/>` in `motion.div`s keyed by `row.title` / `row.status` so they fade+slide on change (`opacity 0→1`, `x -4→0` for title, `x 4→0` for badge, `duration 0.35`).
6. **Footer stats** — replace the 3 tiles:
   - Keep tile 1: `98.4%` / `Accuracy`.
   - Tile 2: `Exception` / `ONLY` (foreground color, not `12×`/`Faster`).
   - Tile 3: `Ledger` / `Ready` in primary color (drop `£{processed}k` / `Processed` and the `processed` state + its interval).
7. **Documents pill** — render `{rows.length} documents` instead of the hardcoded `4 documents`.
8. **Imports cleanup** — remove the unused `Receipt` import; state becomes `rows`, `activeKey`; drop `active` (number) and `processed`.

Everything else (halo, header row, review CTA, container styling) stays byte-identical.

## Verification

- `bun run build` succeeds; no unused-import warnings on the touched file.
- Hero card visibly cycles: badges flip queued→processing→posted every ~2.2s, and posted rows swap in a new supplier name on the next tick.
- Footer reads **98.4% Accuracy · Exception ONLY · Ledger Ready** (no `12×` / `£243k`).
- Age labels advance every 15s (e.g. "2 min ago" → "3 min ago"), reset to "just now" when a row becomes posted.
- Reduced-motion users see the initial static rows with no intervals running.

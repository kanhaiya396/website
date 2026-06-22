## Goal

Restore the original workspace layout shown in your screenshot and apply animation **to the existing elements only** — no repositioning, no resizing, no new columns or zones.

## Target layout (locked, matches screenshot)

```text
┌──────────────────────────────────────────────┐
│  [ Receipt  ]        [ Invoice         ]     │
│  [ Supplier statement ] [ Bank statement ]   │  ← 2×3 doc grid (top)
│  [ Sales invoice ]   [ Credit note     ]     │
│                                              │
│        [X]   ( Outworx One )   [QB]          │  ← horizontal engine row
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │     ✓  VAT number verified             │  │  ← status bar
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

The workspace container, its padding, border-radius, and the size/position of every card, the X tile, the Outworx circle, the QB tile, and the bottom status bar all stay exactly as they are.

## Changes to `src/components/landing/Hero.tsx` (WorkflowAnimation only)

1. **Remove the 3-column zone grid** (`grid-cols-[1fr_auto_1fr]`) and the separate "center column" that holds a traveling-doc clone + validation checklist. Those are what's pushing the layout off.
2. **Rebuild as a single vertical stack** inside the existing container:
   - Top: existing 2×3 `workflowDocs` grid (unchanged sizing).
   - Middle: a flex row containing the **X tile**, the **Outworx circle**, the **QB tile** — same sizes as the screenshot.
   - Bottom: the **"✓ VAT number verified"** status bar (same width as the doc grid).
3. **Animations applied in-place — no element moves:**
   - **Doc cards:** cycle an `activeDoc` index every ~2s. Active card gets a soft primary border, subtle glow, and a 1.02 scale pulse. Others sit at 0.7 opacity. No card detaches or flies anywhere.
   - **Outworx circle:** existing breathing halo + slow rotating ring + sparkle stays. Add a gentle inner pulse when "processing".
   - **X and QB tiles:** alternate which one lights up per cycle — soft colored ring pulse (Xero blue / QB green), 1.04 scale, no movement.
   - **Connector lines (X ↔ Outworx ↔ QB):** thin SVG paths drawn behind the row only. Animated `strokeDashoffset` flow from active doc → Outworx → active destination. Lines are visual-only and sit inside the engine row's vertical band, so they don't affect layout.
   - **Status bar:** swaps label through a short sequence each cycle — `Reading document…` → `Extracting fields…` → `Validating VAT…` → `✓ VAT number verified` → `✓ Posted to {Xero|QuickBooks}`. Uses `AnimatePresence` fade/slide inside the bar; bar height is fixed so nothing shifts.
4. **Phase loop** (~7s total): `select` (2s) → `process` (1.2s) → `validate` (1.4s) → `publish` (1.4s) → `pause` (1s), then advance `activeDoc` and toggle destination.
5. **Keep:** `useReducedMotion` fallback, `IntersectionObserver` pause when offscreen, existing easing constants, ambient background gradients.
6. **Remove:** traveling-document clone, separate validation checklist column, 3-zone grid wrapper, and the wide center column that's currently squeezing the doc grid.

## Out of scope

Trust strip, hero headline, CTAs, navigation, spacing, container size, and all other sections remain untouched.

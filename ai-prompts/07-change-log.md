# Change log (for AI and developers)

Add a new entry at the **top** when you complete meaningful work.

---

## 2026-05-27 — Dynamic horizontal Excel + tax invoice

- **What:** Excel section is now a 3-column grid (A/B/C) like a spreadsheet; column B updates from your inputs; column C shows live results. Renamed tab to **VAT − subtract %**. New **Tax invoice** calculator (Qty × Rate, VAT, retention).
- **Files:** `types/excelSheet.ts`, `utils/excelSheets/buildSheets.ts`, `TaxInvoiceCalculator.tsx`, removed static `excelExamples.ts`.

## 2026-05-27 — Excel examples on every calculator

- **What:** “Excel example” table on each calculator card (cell refs, sample values, formulas). Data in `constants/excelExamples.ts`, UI in `ExcelGuide.tsx`.
- **Why:** User wanted to see how to replicate each calculation in a spreadsheet.

## 2026-05-27 — VAT then add/subtract percentage calculators

- **What:** Two new tabs before discount calculators: “VAT + add %” and “VAT + subtract %”. Base → VAT (from settings) → additional % applied to subtotal → grand total.
- **Files:** `vatThenAdditional.ts`, `VatThenAdditionalCalculator.tsx`, registry + `calculators.ts` order updated.
- **Why:** User invoice workflow (e.g. base 289,725 + 18% VAT + 10% on subtotal).

## 2026-05-27 — Fuel price label: per liter → per km

- **What:** Delivery calculator input renamed to “Fuel price per km”; description, formula text, and `fuelPricePerKm` parameter in `fuelCost.ts` updated.
- **Why:** Product owner request; aligns formula `transport_cost = chargeable_distance × price_per_km` with UI.

## 2026-05-27 — Blank page fix & dev stability

- **What:** Explicit `root` in `vite.config.ts`; `ErrorBoundary` in `main.tsx`; `SettingsPanel` commits settings on change (removed `useEffect` sync); README troubleshooting.
- **Why:** Dev server sometimes used a stray `calculator-app/#` folder as root → empty app. Inline `#` in npm scripts was a contributing confusion.

## 2026-05-27 — Initial app (v1.0.0)

- **What:** Full static calculator app: 5 calculators, settings panel, Netlify config, component architecture.
- **Stack:** React 19, TypeScript, Vite 6.
- **Repo:** Initialized; pushed to `kolithakasun/calculator-app`.

---

## Future ideas (not implemented)

- [ ] Persist VAT / free delivery in `localStorage`
- [ ] Currency symbol / locale setting
- [ ] Unit tests for `src/calculators/*.ts` pure functions
- [ ] Print/export results
- [ ] Additional calculators (markup, margin, etc.)

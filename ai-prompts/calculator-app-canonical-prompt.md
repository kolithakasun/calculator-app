# Business Calculators App: Canonical Prompt

Last updated: 2026-05-27

Use this file as the single source of truth when continuing development with an AI builder or developer agent.

## Canonical Build Prompt

```text
Build a modern, responsive, easy-to-use calculator web app that can be deployed on Netlify as a static site.

Tech and structure:
- Use React + TypeScript + Vite.
- Make the app fully static and Netlify-friendly.
- Use a clean component-based architecture so new calculators can be added later without rewriting the app.
- Organize the code into reusable folders such as:
  - components/
  - calculators/
  - utils/
  - constants/
  - styles/
  - context/
- Use reusable input, result, card, and tab components.
- Keep logic separate from UI.
- Use clear naming and clean code standards.

UI/UX requirements:
- The app should be simple enough for non-mathematical users.
- Use a beautiful, clean, modern interface.
- Mobile responsive and desktop friendly.
- Each calculator should have its own section or tab.
- Show formulas in plain language, not technical jargon.
- Add helpful labels, placeholders, and short descriptions.
- Validate inputs clearly and show friendly error messages.
- Show results instantly as the user types when possible.
- Include a setting in the UI to change VAT percentage.
- Default VAT percentage must be 18.
- Include a setting in the UI to change free delivery distance.
- Default free delivery distance must be 15 km.

Calculators to include:

1) Percentage Value Calculator
- Input: base value and percentage
- Output: calculated percentage value
- Formula:
  percentage_value = base_value × percentage / 100

2) Base Value from VAT-Inclusive Amount
- Input: total value including VAT
- Output: base value without VAT
- Use the VAT percentage from the UI setting
- Formula:
  total = base + (base × VAT / 100)
  base = total / (1 + VAT / 100)

3) Discount with VAT
- This is for cases where discount is calculated on the total amount including VAT
- Input: total amount including VAT, discount percentage
- Output:
  - discount amount
  - final value after discount
- Formula:
  discount = total_with_vat × discount_percentage / 100
  final_value = total_with_vat - discount

4) Discount without VAT
- This is for cases where discount is calculated on the value before VAT
- Input: total amount without VAT, discount percentage
- Output:
  - discount amount
  - discounted base value
  - VAT amount
  - final value including VAT
- Formula:
  discount = total_without_vat × discount_percentage / 100
  discounted_base = total_without_vat - discount
  vat_amount = discounted_base × VAT / 100
  final_value = discounted_base + vat_amount

5) Fuel Cost Calculator
- Input: total distance, fuel price per km
- Use the free delivery distance setting from the UI
- Default free delivery distance is 15 km
- Output: transport cost
- Formula:
  chargeable_distance = max(total_distance - free_delivery_distance, 0)
  transport_cost = chargeable_distance × fuel_price_per_km
- Keep the formula simple and clearly explain it in the UI.

Functional requirements:
- Add a top-level setting panel for VAT and free delivery distance.
- Each calculator should work independently.
- Use decimal-friendly calculations.
- Format currency and numbers neatly.
- Show results immediately and clearly.
- Prevent negative values where not valid.
- Add reset buttons for each calculator.
- Make the app easy to extend with more calculators later.

Quality requirements:
- Clean visual hierarchy.
- Accessible labels and contrast.
- No clutter.
- Friendly wording for all calculator descriptions.
- Include sample values or placeholders to guide users.
- Add a polished, professional look suitable for business use.

Deployment requirements:
- Provide a Netlify-ready build.
- Include any required configuration files such as netlify.toml if needed.
- Ensure the app works on refresh and direct URL access.

Deliver a complete working calculator app with well-structured code, simple UI, and scalable architecture for future calculators.
```

## Current Implementation Snapshot

Project path:
- `C:\work_dir\git-repo\calculator-app`

Current stack:
- React 18
- TypeScript
- Vite 5
- Static SPA build for Netlify

Current scripts:
- `npm run dev`
- `npm run typecheck`
- `npm run build`
- `npm run preview`

Current shared defaults:
- VAT percentage: `18`
- Free delivery distance: `15 km`

Current app behavior:
- Global settings are managed through shared context.
- Relevant calculators automatically use the shared VAT and free-delivery values.
- Calculator tabs are URL-hash aware so direct access and refresh work.
- Results update instantly when inputs are valid.
- Inputs prevent negative values where not valid and show friendly validation text.
- Each calculator has its own reset button.

Current calculator list:
- Percentage Value Calculator
- Base Value from VAT-Inclusive Amount
- Discount with VAT
- Discount without VAT
- Fuel Cost Calculator

Important current fuel-cost rule:
- The transport calculator uses `fuel price per km`, not `fuel price per liter`.

## Key Files To Continue Development

App shell and tab navigation:
- `src/App.tsx`

Shared settings:
- `src/context/SettingsContext.tsx`

Calculator registration:
- `src/calculators/registry.tsx`
- `src/constants/calculators.ts`

Reusable UI:
- `src/components/Card.tsx`
- `src/components/InputField.tsx`
- `src/components/ResultDisplay.tsx`
- `src/components/Tabs.tsx`
- `src/components/CalculatorPanel.tsx`
- `src/components/SettingsPanel.tsx`

Calculation logic:
- `src/calculators/percentageValue.ts`
- `src/calculators/baseValueFromVat.ts`
- `src/calculators/discountWithVat.ts`
- `src/calculators/discountWithoutVat.ts`
- `src/calculators/fuelCost.ts`

Calculator screens:
- `src/calculators/PercentageValueCalculator.tsx`
- `src/calculators/BaseValueFromVatCalculator.tsx`
- `src/calculators/DiscountWithVatCalculator.tsx`
- `src/calculators/DiscountWithoutVatCalculator.tsx`
- `src/calculators/FuelCostCalculator.tsx`

Formatting and validation:
- `src/utils/format.ts`
- `src/utils/validation.ts`

Styling:
- `src/styles/global.css`

Deployment:
- `netlify.toml`

## Rules For Future Changes

- Keep the site fully static and Netlify-friendly.
- Keep logic separate from presentation.
- Preserve the reusable component pattern rather than embedding calculator-specific UI everywhere.
- When adding a new calculator:
  1. Add the calculation logic in `src/calculators/`.
  2. Add the calculator screen component using shared UI components.
  3. Register it in `src/constants/calculators.ts`.
  4. Register the component in `src/calculators/registry.tsx`.
- Keep formulas written in plain language for non-technical users.
- Preserve mobile responsiveness and clean desktop layout.
- Keep validation friendly and immediate.

## Recent Change Log

2026-05-27:
- Initial app scaffolded in the repo as a Vite + React + TypeScript static site.
- Added Netlify config for SPA refresh/direct URL support.
- Implemented five calculators with shared settings.
- Updated the fuel-cost calculator from `fuel price per liter` to `fuel price per km`.

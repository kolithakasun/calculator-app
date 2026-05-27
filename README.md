# Business Calculators

A modern, responsive calculator web app built with React, TypeScript, and Vite. Designed for non-technical users and deployable as a static site on Netlify.

## Features

- **Percentage value** — find a percentage of any amount
- **Price before VAT** — extract the base amount from a VAT-inclusive total
- **Discount (with VAT)** — discount applied to the total including VAT
- **Discount (before VAT)** — discount on net price, then VAT added
- **Delivery / fuel cost** — transport cost after free delivery distance

Global settings (defaults: **18% VAT**, **15 km** free delivery) apply across relevant calculators.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Netlify

1. Push this folder to a Git repository.
2. In Netlify, create a new site from the repo.
3. Build settings are read from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. SPA routing is handled via redirects so direct URLs and refresh work.

You can also drag-and-drop the `dist` folder after running `npm run build`.

## Project structure

```
src/
  components/     # Reusable UI (Input, Result, Card, Tabs, SettingsPanel)
  calculators/    # Pure logic + calculator screens + registry
  constants/      # Defaults and calculator metadata
  context/        # Shared VAT and delivery settings
  styles/         # Global and component styles
  utils/          # Formatting and validation helpers
```

### Adding a new calculator

1. Add calculation logic in `src/calculators/yourCalculator.ts`.
2. Create `src/calculators/YourCalculator.tsx` using `Card`, `Input`, and `Result`.
3. Register the id in `src/constants/calculators.ts` and the component in `src/calculators/registry.tsx`.

# Business Calculators

A modern, responsive calculator web app built with React, TypeScript, and Vite. Designed for non-technical users and deployable as a static site on Netlify.

> **Continuing development with AI?** Read [`ai-prompts/README.md`](./ai-prompts/README.md) first (or paste [`ai-prompts/06-continuation-prompt.md`](./ai-prompts/06-continuation-prompt.md) into a new chat).

## Features

- **Percentage value** — find a percentage of any amount
- **Price before VAT** — extract the base amount from a VAT-inclusive total
- **VAT + add %** — base, add VAT, then add a percentage on the subtotal
- **VAT + subtract %** — base, add VAT, then subtract a percentage from the subtotal
- **Discount (with VAT)** — discount applied to the total including VAT
- **Discount (before VAT)** — discount on net price, then VAT added
- **Delivery / fuel cost** — transport cost after free delivery distance

Global settings (defaults: **18% VAT**, **15 km** free delivery) apply across relevant calculators.

## Development

```bash
cd calculator-app
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173/).

### Blank page?

1. Run `npm run dev` from the **calculator-app** folder (not the parent repo).
2. In `package.json`, the dev script must be exactly `"vite"` — do not add shell comments like `# local dev` on the same line.
3. If Vite warns about a `#` folder, delete it: `rm -rf '#'` then restart the dev server.
4. Stop other Vite servers (wrong port or wrong project can show a blank page).
5. Open the browser devtools console (F12) for error messages.

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

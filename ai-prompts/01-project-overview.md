# Project overview

## Name

**Business Calculators** — static web app for everyday pricing, VAT, discounts, and delivery cost.

## Purpose

Simple calculators for **non-mathematical users**: plain-language formulas, friendly validation, instant results, mobile-friendly UI, suitable for business use.

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | React 19 + TypeScript |
| Build | Vite 6 (not Vite 8 — native binding issues on some Node versions) |
| Deploy | Netlify static site (`netlify.toml`) |
| State | React Context for global settings only; each calculator has local input state |
| Styling | Plain CSS in `src/styles/` (variables + components), no CSS framework |

## Commands

```bash
cd calculator-app
npm install
npm run dev      # http://localhost:5173 (see Vite output)
npm run build    # tsc -b && vite build → dist/
npm run preview  # serve dist/
npm run lint
```

## Global settings (UI)

| Setting | Default | Used by |
|---------|---------|---------|
| VAT % | 18 | Base from VAT, discount without VAT |
| Free delivery distance (km) | 15 | Fuel / delivery cost |

## Calculators (tabs)

1. Percentage value  
2. Price before VAT (from VAT-inclusive total)  
3. VAT + add % (base → VAT → extra % on subtotal)  
4. VAT − subtract % (base → VAT → reduce subtotal by %)  
5. Tax invoice (subtotal before VAT → +VAT → −retention % → grand total)  
6. Discount on total **with** VAT  
7. Discount on total **without** VAT (then VAT recalculated)  
8. Delivery / fuel cost  

Excel guides are **dynamic horizontal grids** (columns A/B/C); values in column B follow calculator inputs; see `utils/excelSheets/buildSheets.ts`.

## Deployment

- **Netlify:** build `npm run build`, publish `dist/`
- **SPA:** `/* → /index.html` (200) in `netlify.toml`
- **Git remote:** `https://github.com/kolithakasun/calculator-app.git` (verify branch before push)

## Out of scope (unless requested)

- Backend / API  
- User accounts  
- Persisting settings to localStorage (not implemented yet — good future enhancement)  
- i18n / multiple languages  

# Original product brief (reference)

This is the full specification used to build v1. Use it when validating features or planning v2. If code and this doc disagree, **fix code or update `07-change-log.md`** — do not silently drift.

## Tech and structure

- React + TypeScript + Vite  
- Fully static, Netlify-friendly  
- Component-based; easy to add calculators later  
- Folders: `components/`, `calculators/`, `utils/`, `constants/`, `styles/`  
- Reusable: Input, Result, Card, Tabs  
- Logic separate from UI  
- Clear naming, clean code  

## UI/UX

- Simple for non-mathematical users  
- Beautiful, clean, modern, responsive  
- Each calculator: own tab  
- Formulas in plain language  
- Helpful labels, placeholders, short descriptions  
- Clear validation and friendly errors  
- Instant results while typing when possible  
- Settings: VAT % (default **18**), free delivery distance (default **15 km**)  

## Calculators (original formulas)

1. **Percentage value** — `base × percentage / 100`  
2. **Base from VAT-inclusive total** — `base = total / (1 + VAT/100)`  
3. **Discount with VAT** — discount on total including VAT  
4. **Discount without VAT** — discount on pre-VAT, then add VAT  
5. **Fuel cost** — `chargeable = max(distance - free_km, 0)`, `cost = chargeable × price`  

Original brief said “fuel price per liter”; **product owner later changed UI to “fuel price per km”** — see `07-change-log.md`.

## Functional

- Top-level settings panel  
- Calculators independent  
- Decimal-friendly math  
- Format currency/numbers neatly  
- Instant results  
- Prevent negative values where invalid  
- Reset per calculator  
- Extensible architecture  

## Quality

- Clean hierarchy, accessible labels/contrast  
- No clutter, friendly wording  
- Sample placeholders  
- Professional business look  

## Deployment

- Netlify build, `netlify.toml`, SPA refresh/direct URL support  

## Quality requirements (deployment)

- Provide Netlify-ready build  
- `netlify.toml` if needed  
- Works on refresh and direct URL access  

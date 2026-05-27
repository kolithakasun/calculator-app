# Architecture and conventions

## Directory layout

```
calculator-app/
├── ai-prompts/          ← YOU ARE HERE — read before coding
├── public/              favicon, static assets
├── src/
│   ├── main.tsx         Entry; ErrorBoundary + global CSS
│   ├── App.tsx          Layout: header, SettingsPanel, Tabs, active calculator
│   ├── components/      Reusable UI
│   │   ├── Card.tsx     Section wrapper, formula blurb, Reset
│   │   ├── Input.tsx    Label, description, validation error
│   │   ├── Result.tsx   Output row (optional highlight)
│   │   ├── Tabs.tsx     Calculator switcher
│   │   ├── SettingsPanel.tsx
│   │   └── ErrorBoundary.tsx
│   ├── calculators/
│   │   ├── *.ts           Pure math (no React)
│   │   ├── *Calculator.tsx  UI per calculator
│   │   └── registry.tsx   Maps CalculatorId → component
│   ├── constants/
│   │   ├── defaults.ts    DEFAULT_VAT_PERCENTAGE, DEFAULT_FREE_DELIVERY_DISTANCE_KM
│   │   └── calculators.ts Tab metadata + CalculatorId type
│   ├── context/
│   │   └── SettingsContext.tsx
│   ├── styles/
│   │   ├── variables.css
│   │   ├── global.css
│   │   └── components.css
│   └── utils/
│       ├── numbers.ts     parse, formatCurrency, formatDistanceKm, etc.
│       └── validation.ts  Friendly error messages for inputs
├── vite.config.ts       Explicit project root (avoids stray `#` folder bug)
└── netlify.toml
```

## Design principles

1. **Logic separate from UI** — calculation functions in `src/calculators/*.ts`, screens in `*Calculator.tsx`.
2. **Extend via registry** — new calculator = logic file + UI file + entry in `constants/calculators.ts` + `registry.tsx`.
3. **Live results** — `useMemo` on parsed inputs; update as user types when inputs are valid.
4. **Validation** — show errors only after user enters something invalid (empty fields usually show no error, placeholder results).
5. **No negative inputs** where inappropriate — `parseNonNegative`, `requiredNonNegativeMessage`, etc.
6. **Decimal-friendly** — use JavaScript `number`; display with `Intl.NumberFormat` via `formatCurrency` / `formatNumber`.
7. **Plain language** — formulas in `Card` `formula` prop must be readable by non-technical users.
8. **Minimal scope** — match existing patterns; avoid new dependencies unless justified.

## Adding a new calculator (checklist)

1. `src/calculators/myFeature.ts` — export pure function(s) + types if needed.
2. `src/calculators/MyFeatureCalculator.tsx` — use `Card`, `Input`, `Result`; `useSettings()` if VAT/distance needed.
3. Add `CalculatorId` + meta in `src/constants/calculators.ts`.
4. Register component in `src/calculators/registry.tsx`.
5. Update `03-calculators-specification.md` and `07-change-log.md`.

## TypeScript notes

- `verbatimModuleSyntax` enabled — use `import type` for types.
- `CalculatorId` union must stay in sync with registry keys.

## Settings panel pattern

- Local string state for inputs; commit to context in `onChange` when value passes validation (no `useEffect` sync — caused dev complexity).
- “Restore defaults” resets both local inputs and context.

## Vite config

- `root` is set explicitly to the config file directory — do not remove (prevents blank page when a `#` subfolder exists).

## Code style

- Functional components + hooks only.
- Prefer existing CSS BEM-like classes (`card__`, `field__`, `result__`).
- Reset button per calculator via `Card` `onReset`.
- Accessible: labels, `aria-*` on tabs, `role="alert"` on errors.

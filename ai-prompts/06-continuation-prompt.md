# Continuation prompt (copy into new AI chats)

Copy everything below the line into a new chat when continuing work on this app.

---

You are helping develop **Business Calculators** (`calculator-app/`).

**Before writing or changing code:**

1. Read all markdown files in `calculator-app/ai-prompts/` (especially `01` through `05` and `07-change-log.md`).
2. Skim relevant `src/` files to confirm the repo matches the docs.
3. Follow existing architecture: pure logic in `src/calculators/*.ts`, UI in `*Calculator.tsx`, registry pattern, shared `Input`/`Result`/`Card`/`Tabs`, settings via `SettingsContext`.
4. Keep UI copy plain and non-technical; validate inputs with friendly messages; live results via `useMemo`.
5. Defaults: VAT **18%**, free delivery **15 km**. Fuel calculator uses **price per km** (not per liter).
6. Stack: React 19, TypeScript, Vite 6, static Netlify deploy. Run `npm run build` to verify.
7. After your changes, add a short entry to `ai-prompts/07-change-log.md`.

**Project path:** `/Users/dmkk/Documents/Private/personal_work/calculator-app` (or relative `calculator-app/` from workspace root).

**My task for this session:**

[Describe what you want here — e.g. add calculator, fix bug, change styling, deploy help]

---

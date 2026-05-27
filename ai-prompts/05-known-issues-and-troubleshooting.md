# Known issues and troubleshooting

## Blank page on localhost

**Symptoms:** `http://localhost:5173/` shows empty white page, no UI.

**Common causes:**

1. **Wrong directory** — run `npm run dev` from `calculator-app/`, not parent `personal_work/`.
2. **Wrong port** — another Vite app may own 5173; read terminal for actual URL (e.g. 5174).
3. **Stray `#` project root** — if `package.json` dev script was `vite # local dev` or a `#` folder was created, Vite may serve an empty tree.
   - Fix: `rm -rf '#'` inside `calculator-app`
   - Ensure `"dev": "vite"` only (no inline shell comments in the script string).
   - `vite.config.ts` sets explicit `root` to prevent this — keep it.
4. **JS runtime error** — open DevTools → Console. `ErrorBoundary` should show a message if React mounts but a child crashes.

**Verify production build works:**

```bash
npm run build && npm run preview
```

## Vite / Node version

- Project uses **Vite 6** (not 8) for broader Node compatibility.
- Some ESLint 10 packages warn on Node 22.11; build still works. Upgrading Node to 22.13+ reduces warnings.

## Git / deploy

- Early commit may have been README-only; ensure full `src/` is pushed before Netlify deploy.
- Remote: `github.com/kolithakasun/calculator-app` — confirm branch (`main` vs `gpt-version`).

## Settings not updating calculators

- VAT and distance commit on valid `onChange` in `SettingsPanel.tsx`.
- Calculators read live values via `useSettings()` — no page reload needed.

## Do not

- Put shell comments (`# ...`) inside `package.json` npm script values.
- Remove explicit `root` from `vite.config.ts` without a good reason.
- Use `useEffect` to sync settings inputs to context (prefer onChange commit pattern).

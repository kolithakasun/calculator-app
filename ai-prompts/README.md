# AI prompts & project context

**Everyone starting a new AI chat on this project should read this folder first.**

This directory keeps everything an AI assistant (or human developer) needs to continue work on **Business Calculators** without re-explaining the whole project.

## How to use (humans)

1. Open a new Cursor/ChatGPT/Claude chat about `calculator-app`.
2. Paste the contents of [`06-continuation-prompt.md`](./06-continuation-prompt.md), or say:

   > Read all files in `calculator-app/ai-prompts/` before making changes.

3. Describe your new task on top of that context.

## How to use (AI assistants)

**Before editing code**, read these files in order:

| Order | File | Purpose |
|------:|------|---------|
| 1 | [01-project-overview.md](./01-project-overview.md) | Stack, goals, commands, deployment |
| 2 | [02-architecture-and-conventions.md](./02-architecture-and-conventions.md) | Folders, patterns, how to extend |
| 3 | [03-calculators-specification.md](./03-calculators-specification.md) | Formulas, settings, UI rules |
| 4 | [04-original-product-brief.md](./04-original-product-brief.md) | Full original requirements |
| 5 | [05-known-issues-and-troubleshooting.md](./05-known-issues-and-troubleshooting.md) | Blank page, Vite `#` pitfall, etc. |
| 6 | [07-change-log.md](./07-change-log.md) | What changed over time |

Then inspect the actual code under `src/` to confirm nothing drifted from these docs.

**After completing work**, update [`07-change-log.md`](./07-change-log.md) with a dated entry (what changed and why).

## Quick copy-paste for new chats

See [`06-continuation-prompt.md`](./06-continuation-prompt.md).

## Repo location

- **Project root:** `calculator-app/` (this app is self-contained).
- **Parent workspace:** may be `personal_work/`; always `cd calculator-app` before `npm run dev`.

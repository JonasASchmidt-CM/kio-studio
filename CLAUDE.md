# CLAUDE.md — KIO Studio

Guidance + documentation index for AI sessions (and humans) working in this repo.
**Read this first**, then load the doc relevant to your task.

## What this project is

KIO Studio is an **AI-first frontend client** for the CoreMedia CMS engine
(distribution, A/B testing, variant segmentation). React + Vite + TypeScript,
themed entirely from Git-canonical design tokens. Privacy by design (no
telemetry/analytics), targeting WCAG 2.1 AA.

## Documentation map

| Doc                                    | Owner                | Read it when you need…                                                                    |
| -------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------- |
| [`DECISIONS.md`](./DECISIONS.md)       | Design (provisional) | The stack decisions and their rationale. **Every entry is proposed, pending eng review.** |
| [`DESIGN.md`](./DESIGN.md)             | Design               | Token model, design-system principles, the Figma→tokens pipeline, a11y stance             |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Engineering          | App structure, rendering model, open technical decisions                                  |
| [`CODE_STYLE.md`](./CODE_STYLE.md)     | Engineering          | Lint/format rules, TS strictness, naming, commit conventions                              |
| [`INTEGRATION.md`](./INTEGRATION.md)   | Backend              | The Java CMS-engine contract, auth, LLM provider abstraction                              |
| [`STATUS.md`](./STATUS.md)             | Shared               | Current state + what's next (session handoff) — **keep updated**                          |
| [`TODO.md`](./TODO.md)                 | Shared               | Backlog of deferred work                                                                  |
| [`CHANGELOG.md`](./CHANGELOG.md)       | Shared               | Notable changes (Keep a Changelog format)                                                 |

## Key conventions (full detail in CODE_STYLE.md)

- **Path alias:** `@/` → `src/`.
- **Folders:** feature-sliced — `app/`, `features/<slice>/`, `shared/{ui,lib,icons}`.
- **UI:** shadcn/ui components on **Base UI** primitives, copied into `src/shared/ui`
  (we own them). Add more with `npx shadcn@latest add <name>` — they honor the
  aliases in `components.json`.
- **Tokens:** never hard-code colors/spacing. Edit `tokens/tokens.json`, run
  `npm run tokens:build`. Generated `src/styles/tokens.css` is **not hand-edited**.
- **Icons:** self-owned SVG components in `src/shared/icons` (Material motifs),
  **not** `@mui/icons-material` (DECISIONS.md D5).
- **a11y:** WCAG 2.1 AA is a constraint, not a goal. `jsx-a11y` runs in lint.

## Working agreement

- Ship working increments — no broken states. Run `npm run lint && npm run
typecheck && npm run build` before declaring done.
- Surface risks/contradictions proactively; don't silently "fix" provisional decisions.
- Privacy by design: no telemetry, analytics, or non-essential cookies by default.

## Environment quirks

- A shell hook rewrites bare `npx …`; run project tools via `npm run <script>`
  (which use the local `node_modules/.bin`) instead.

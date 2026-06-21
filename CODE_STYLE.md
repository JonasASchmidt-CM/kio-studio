# CODE_STYLE.md

**Owner: Engineering.** Conventions for KIO Studio. Tooling enforces most of
this; the rest is shared judgement.

## Tooling (enforced)

| Concern       | Tool                                       | Command             |
| ------------- | ------------------------------------------ | ------------------- |
| Linting       | ESLint 9 (flat config) + typescript-eslint | `npm run lint`      |
| Accessibility | `eslint-plugin-jsx-a11y` (recommended)     | (part of lint)      |
| Formatting    | Prettier (+ `prettier-plugin-tailwindcss`) | `npm run format`    |
| Types         | TypeScript (strict)                        | `npm run typecheck` |

Run all three (`lint`, `typecheck`, `build`) before considering work done.

## Formatting (Prettier)

- No semicolons, single quotes, trailing commas (`all`), width 100, 2-space indent.
- Tailwind classes are auto-sorted by the plugin — don't hand-order them.
- `DECISIONS.md` and generated `src/styles/tokens.css` are **ignored** (see
  `.prettierignore`); never reformat them.

## TypeScript

- `strict` + `noUncheckedIndexedAccess`. `exactOptionalPropertyTypes` is
  intentionally **off** (too noisy while prototyping).
- Path alias: import from `@/…` (→ `src/…`), not long relative chains.
- Prefer explicit types at module boundaries; let inference work locally.

## Naming & files

- **Components:** `PascalCase` function components. One main component per file.
- **Files:** `kebab-case.tsx` (e.g. `auto-awesome-icon.tsx`). shadcn-generated
  files keep their given names.
- **Hooks:** `useThing` in `shared/hooks` or a feature's `hooks/`.
- **Barrels:** a feature/area exposes its surface via `index.ts`.

## Imports

Order: external packages → `@/` aliases → relative. Prettier + ESLint handle
spacing; keep groups logically separated.

## Known rule exceptions

- `src/shared/ui/**` disables `react-refresh/only-export-components` — shadcn
  primitives co-export variant helpers (e.g. `buttonVariants`). Scoped to that
  folder only.

## Accessibility (WCAG 2.1 AA)

- `jsx-a11y` catches static issues; it is **not** sufficient alone. Manually
  verify keyboard nav, focus order, visible focus, and contrast (see TODO.md for
  the manual + automated a11y testing backlog).

## Commits

- Conventional-commit style: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.
- Small, focused commits. Don't commit `dist/`, `node_modules/`, or `*.local`.

## Adding UI components

`npx shadcn@latest add <name>` — lands in `src/shared/ui` per `components.json`
aliases. Reformat to our Prettier style; the code is now ours to shape.

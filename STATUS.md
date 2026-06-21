# STATUS.md

Session handoff — current state of KIO Studio and what's next. **Keep this
updated** at the end of each working session.

_Last updated: 2026-06-21_

## Current state: ✅ First runnable scaffold

`npm install && npm run dev` works. The app shell renders a themed shadcn Button
whose color comes from the seeded `color.brand.primary` token — proving the full
design-token pipeline end to end.

### What exists

- **App:** Vite 8 + React 19 + TypeScript (strict, `noUncheckedIndexedAccess`).
- **Quality gates:** ESLint 9 + `jsx-a11y` (WCAG), Prettier, `npm run typecheck`.
  All green.
- **UI:** Tailwind v4 + shadcn/ui on **Base UI** primitives (`base-nova` style).
  `Button` in `src/shared/ui`.
- **Tokens:** `tokens/tokens.json` (W3C DTCG) → Style Dictionary →
  `src/styles/tokens.css` → mapped in `src/index.css`. Auto-built via
  `predev`/`prebuild`.
- **Structure:** feature-sliced (`app/`, `features/`, `shared/{ui,lib,icons}`).
- **Icons:** self-owned SVG components (`src/shared/icons`) — D5.
- **Docs:** README, CLAUDE (index), DESIGN, ARCHITECTURE, CODE_STYLE,
  INTEGRATION, STATUS, CHANGELOG, TODO, DECISIONS.

### Key facts for the next session

- DECISIONS.md entries are **provisional** (designer pre-decisions).
- **D2 resolved favorably:** shadcn now defaults to **Base UI**, so no Radix.
- **ESLint pinned to v9** (a11y plugin lacks v10 support) — keeps install portable.
- Run project tools via `npm run <script>` (a shell hook mangles bare `npx`).

## Next up

1. **Increment 7 — portability + initial commit:** verify no personal config /
   secrets, remove throwaway screenshot, then the first git commit. Repo is
   intended to transfer from a personal GitHub account → CoreMedia work org.
2. **LATER — CoreMedia brand tokens & style definitions:** replace seeded
   placeholder tokens with real brand values (to be done on the work laptop
   after transfer). See TODO.md.

## Open decisions (owned by eng/BE)

Tracked in DECISIONS.md (O1 deployment, O2 LLM adapter, O3 flags/modularity,
O4 offline) and the _TBD_ sections of ARCHITECTURE.md / INTEGRATION.md.

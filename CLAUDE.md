# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

KIO Studio is an **AI-first frontend client** for the CoreMedia CMS engine (content
distribution, A/B testing, variant segmentation), delivered on-prem or as a managed PaaS.
React + Vite + TypeScript, themed entirely from Git-canonical design tokens. **Privacy by
design** (no telemetry/analytics) and **WCAG 2.1 AA** are non-negotiable constraints, not goals.

The stack is **provisional**: every choice in @DECISIONS.md is a designer pre-decision pending
engineering review. Surface contradictions — don't silently "fix" a provisional decision.

## Collaboration

Challenge assumptions, intent, ideas, solutions, and decisions when you have a better approach — don't default to agreement. State the alternative clearly and briefly, then let the human decide.

## UX Standards

All design decisions, solutions, and feedback must respect:

- **[Laws of UX](https://lawsofux.com/)** — apply relevant laws (Fitts, Hick, Jakob, Miller, etc.) when evaluating interactions, layouts, and component behaviour. Cite the specific law when it's load-bearing to the argument.
- **[Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)** — use as a lens when reviewing or proposing UI. Flag violations proactively; don't wait to be asked.

When a proposed solution violates either, say so explicitly and suggest a compliant alternative.

## Documentation

Read the doc that owns your task; don't restate its contents here.

- @DESIGN.md — token model, design-system principles, the Figma→tokens pipeline, a11y stance
- @ARCHITECTURE.md — app structure, rendering model, open technical decisions
- @CODE_STYLE.md — lint/format rules, TS strictness, naming, commit conventions
- @INTEGRATION.md — the Java CMS-engine contract, auth, LLM provider abstraction
- @DECISIONS.md — stack decisions + rationale (`D#` decided/provisional, `O#` open/deferred to eng)
- [KIO Studio (Confluence)](https://coremediagmbh.atlassian.net/wiki/spaces/prodman/pages/1269792774/KIO+Studio) — overall product context (parent)
- [KIO Studio Design (Confluence)](https://coremediagmbh.atlassian.net/wiki/spaces/prodman/pages/1435336733/KIO+Studio+Design) — living product design document (child)
- [Laws of UX](https://lawsofux.com/) — UX principles; apply when making design decisions or challenging solutions

Working state (not architecture): `STATUS.md` session handoff · `TODO.md` backlog · `CHANGELOG.md`.

## Implementing Figma designs — pixel-accurate, always

When building or changing UI from a Figma node, **match the spec to the pixel.**

1. **Extract before you implement.** Use `figma_get_component_for_development_deep` (or the Figma Desktop Bridge) to pull exact geometry, spacing, type (size/weight/line-height), color, gradients, **effects**, and **node `visible` flags** for every element. List all values explicitly before touching code.
2. **Design-systematize.** For each extracted value, check `tokens.json`: map to an existing token, propose a new one, or explicitly justify a one-off. Never hard-code a value that belongs in the token system — ask if unsure.
3. **Tokenize, don't approximate.** Consume tokens — never snap to a "close enough" value. If a Figma value has no matching token, add or extend it in `tokens.json` first. Tokens stay the contract (DESIGN.md).
4. **Don't silently drop or substitute.** Render every `visible` element in the spec. If a deviation is genuinely unavoidable (e.g. it duplicates an app-shell affordance), call it out explicitly and get a ruling — don't bury it.
5. **Verify parity before claiming done.** Run `figma_check_design_parity`, screenshot both the implementation and the Figma frame, and report all deviations — including minor ones. Never self-correct silently.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install deps (lockfile present; `npm ci` for a clean, reproducible install). `node_modules` is not committed. |
| `npm run dev` | Vite dev server. `predev` rebuilds tokens first. |
| `npm run build` | Production build: `tsc -b && vite build`. `prebuild` rebuilds tokens first. |
| `npm run preview` | Serve the built bundle. |
| `npm run lint` | ESLint (flat config; includes `jsx-a11y`). |
| `npm run typecheck` | `tsc -b --noEmit` — type-check without emitting. |
| `npm run format` / `format:check` | Prettier write / check. |
| `npm run tokens:build` | Style Dictionary: `tokens/tokens.json` → `src/styles/tokens.css`. |

**Pre-merge gate:** `npm run lint && npm run typecheck && npm run build` must pass.

**Tests: none yet.** There is no `npm test` and no test runner installed — don't assume one
exists. Which framework to adopt is an **open engineering decision** (see @DECISIONS.md O5 /
`TODO.md`); the WCAG 2.1 AA testing layer (D6) is decided there alongside it.

## Design tokens are generated

`src/styles/tokens.css` is **generated** from `tokens/tokens.json` (W3C DTCG format, `--kio-*`
prefix) by Style Dictionary — **never hand-edit it.** Edit `tokens.json`, then run
`npm run tokens:build` (`dev`/`build` do this automatically via `predev`/`prebuild`).
`src/index.css` maps shadcn/Tailwind theme vars (`--primary`, `--background`, …) onto `--kio-*`.

## Folder structure

`@/` → `src/` (wired in `vite.config.ts` + `tsconfig.app.json`). Feature-sliced:

```
src/
  app/                # composition root (App.tsx)
    layout/           # app shell — header, nav + context sidebars, layout framework
    workspace/        # chat surfaces — ChatHome, ChatSidebar, SurfacedView, PromptBox
    providers/        # theme, flags, data, LLM adapters — none built yet
  features/           # one self-contained slice per feature (none built yet);
                      #   a slice imports shared/* but reaches other slices only via their index.ts
  shared/
    ui/               # shadcn components on Base UI primitives — copied in; we own them
    lib/              # framework-agnostic helpers (cn(), …)
    brand/            # brand graphics — logomark, KIO avatars, send glyph, user photo
    icons/            # first-party SVG icon components (Material motifs) — NOT @mui (DECISIONS D5)
  styles/
    tokens.css        # GENERATED from tokens/tokens.json — never hand-edit
  index.css           # Tailwind v4 entry; maps theme vars onto --kio-* tokens
  main.tsx            # React entry
tokens/
  tokens.json         # canonical design tokens (source of truth)
```

New shadcn components: run the local `shadcn` CLI (binary in `node_modules/.bin`); it reads
`components.json` and writes into `src/shared/ui` (aliases: components→`@/shared`,
ui→`@/shared/ui`, lib & utils→`@/shared/lib`).

## Environment quirks

- A shell hook rewrites bare `npx …`; run project tooling through `npm run <script>` (which
  resolve the local `node_modules/.bin`).
- `lucide-react` is present only because shadcn installed it as its default icon library; the
  project's own icons are self-owned SVGs (D5).

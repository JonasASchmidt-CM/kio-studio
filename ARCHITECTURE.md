# ARCHITECTURE.md

**Owner: Engineering (FE).** This is a **stub + template** seeded by the
scaffold. Sections marked _TBD — eng_ are for the team to fill in after review.

## Overview (seeded)

KIO Studio is a client-rendered SPA (React + Vite + TypeScript) that talks to
the CoreMedia CMS engine over its APIs. No SSR/SEO requirement today — it sits
behind auth (DECISIONS.md D1). Deployed either on-prem or as managed PaaS on
K8s (DECISIONS.md O1 — _TBD_).

## Rendering & routing

- **Rendering:** client-side React 19, StrictMode.
- **Routing:** _TBD — eng._ No router yet; add one (e.g. React Router / TanStack
  Router) when the second screen appears. Keep it swappable.

## Folder structure (seeded)

Feature-sliced (DECISIONS.md O3):

```
src/
  app/         Composition root (App.tsx)
    layout/    App shell — header, nav + context sidebars, layout framework
    workspace/ Chat surfaces — ChatHome, ChatSidebar, SurfacedView, PromptBox
    providers/ Theme, flags, data, LLM adapters — none built yet
  features/    One folder per feature slice; public surface via index.ts
  shared/      ui/ (design-system components), lib/ (utils), brand/ (logo/avatars), icons/ (SVGs), hooks/
  styles/      index.css (theme) + generated tokens.css
```

Import rule: features may use `@/shared/*` but not each other's internals
(go through a feature's `index.ts`).

## Application shell & chat (built)

`AppShell` (`app/layout/app-shell.tsx`) composes the layout: a sticky
`AppHeader`, a collapsible `NavSidebar`, the main workspace, and a contextual
sidebar. State is local (no router yet); `app/layout/framework.ts` holds the
shared data model (nav items, view ids, chat messages).

The load-bearing interaction: by default the chat is centred in the workspace
(`ChatHome`). When a UI is surfaced — by a nav click or conversationally by KIO —
the main area shows that `SurfacedView` and the chat relocates into the floating
`ChatSidebar` ("KIO Copilot") panel; closing the view returns the chat to centre.

## Component primitives — RESOLVED, worth noting

DECISIONS.md D2 framed a fork between **Base UI** and Radix. During scaffolding
we found current **shadcn/ui ships a Base-UI-based registry by default** (the
`base-nova` style, `@base-ui/react`). So we are **on Base UI with zero manual
migration** — the original preference is satisfied. The primitive layer remains
swappable because components are copied into `src/shared/ui` (we own them).

## State management

_TBD — eng._ Nothing beyond component state yet. Choose a server-cache layer
(e.g. TanStack Query) when CMS data fetching begins — see INTEGRATION.md.

## Build & tooling (seeded)

- **Vite 8** + `@vitejs/plugin-react`; `@tailwindcss/vite` for Tailwind v4.
- **Design tokens:** Style Dictionary builds `tokens.json` → `tokens.css`
  (wired via `predev`/`prebuild`).
- **TS:** strict, `noUncheckedIndexedAccess`, `@/` path alias.
- **ESLint pinned to v9** (a11y plugin doesn't yet support v10) — keeps a clean,
  portable `npm install`. Revisit when `eslint-plugin-jsx-a11y` supports v10.

## Cross-cutting concerns

- **Feature flags (O3):** _TBD — eng._ Provider-agnostic interface; slices gate here.
- **LLM provider abstraction (O2):** _TBD — FE/BE._ Swappable Claude/ChatGPT adapter.
- **Offline/PWA (O4):** _TBD — eng._ Leave room (e.g. Vite PWA plugin); not built now.
- **Secrets / LLM key custody:** depends on deployment model (O1) — _TBD — BE/DevOps._

## Open decisions to pressure-test

See DECISIONS.md "What engineering should pressure-test first." Capture each
resolved decision as a short ADR entry here or in `DECISIONS.md`.

# KIO Studio

An **AI-first standalone workspace** that acts as a frontend client for the
CoreMedia CMS engine (distribution, A/B testing, variant segmentation).

> **Status:** first runnable scaffold. The stack is **proposed and provisional**
> — see [`DECISIONS.md`](./DECISIONS.md). Engineering, PM, and POs are expected
> to revisit every decision.

## What it is

- **Frontend client**, no SEO/SSR need (sits behind auth) — React + Vite + TypeScript.
- **Design-token driven**: a Figma → `tokens.json` → Style Dictionary → CSS-variable
  pipeline themes every component. Tokens are **canonical in Git**.
- **Privacy by design (GDPR):** no telemetry, analytics, or non-essential cookies.
- **Accessible:** targets **WCAG 2.1 AA** (a11y linting wired into the toolchain).

## Prerequisites

| Tool | Version                     |
| ---- | --------------------------- |
| Node | 20+ LTS (developed on 24.x) |
| npm  | 10+ (developed on 11.x)     |
| git  | any recent                  |

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the dev server → http://localhost:5173
```

`predev` automatically rebuilds the design tokens before the server starts, so
the themed UI always reflects `tokens/tokens.json`.

## Scripts

| Script                            | What it does                                                 |
| --------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                     | Build tokens, then start Vite dev server                     |
| `npm run build`                   | Build tokens, type-check, then production build              |
| `npm run preview`                 | Preview the production build locally                         |
| `npm run tokens:build`            | Regenerate `src/styles/tokens.css` from `tokens/tokens.json` |
| `npm run lint`                    | ESLint (incl. `jsx-a11y` accessibility rules)                |
| `npm run typecheck`               | Strict TypeScript check, no emit                             |
| `npm run format` / `format:check` | Prettier write / verify                                      |

## Project layout

```
src/
  app/         App shell + cross-cutting providers (composition root)
  features/    Self-contained feature slices (modularity; room for flags)
  shared/      ui/ (shadcn on Base UI), lib/, icons/ (self-owned SVGs)
  styles/      globals (index.css) + generated tokens.css
tokens/        tokens.json — W3C DTCG, Git-canonical source of truth
```

## The design-token workflow

1. Edit `tokens/tokens.json` (W3C DTCG format). This is the **single source of truth**.
2. `npm run tokens:build` regenerates `src/styles/tokens.css` (`--kio-*` custom properties).
3. `src/index.css` maps the Tailwind/shadcn theme vars onto those tokens.

A later phase wires **Figma → Tokens Studio → `tokens.json`** so design authors
in Figma and Git stays canonical. See [`DESIGN.md`](./DESIGN.md).

## Documentation

Start with [`CLAUDE.md`](./CLAUDE.md) — it indexes every doc in this repo.

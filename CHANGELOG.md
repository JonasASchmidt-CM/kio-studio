# Changelog

All notable changes to KIO Studio are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial scaffold: Vite + React + TypeScript (strict) application.
- Quality tooling: ESLint 9 (flat config) with `jsx-a11y` for WCAG 2.1 AA
  linting, Prettier with the Tailwind class-sorting plugin, strict typecheck.
- Tailwind CSS v4 and shadcn/ui components on **Base UI** primitives
  (`base-nova` style); seeded `Button` in `src/shared/ui`.
- Design-token pipeline: W3C DTCG `tokens/tokens.json` → Style Dictionary →
  `src/styles/tokens.css` → Tailwind/shadcn theme; auto-built before dev/build.
- Feature-sliced folder structure (`app/`, `features/`, `shared/`).
- Self-owned Material-motif SVG icon components (`src/shared/icons`).
- App shell screen demonstrating end-to-end token theming.
- Harness docs: README, CLAUDE, DESIGN, ARCHITECTURE, CODE_STYLE, INTEGRATION,
  STATUS, TODO, and this changelog.
- **App-layout shell** (`src/app/layout`): sticky brand-gradient header
  (site/locale, notifications, user menu), collapsible nav sidebar, contextual
  sidebar, and the main workspace.
- **Chat experience** (`src/app/workspace`): centred blank-slate `ChatHome`
  (KIO avatar + white corona, greeting, gradient suggestion chips, prompt,
  footer), the floating "KIO Copilot" `ChatSidebar` the chat moves into when a
  view is surfaced, `SurfacedView` canvas, and a shared `PromptBox` — built from
  the Figma "Chat Area" (146:4541) and "Chat Sidebar" (174:3892) designs.
- **Brand marks** (`src/shared/brand`): `KioAvatar`, `KioSparkleMark`,
  `KioSendGlyph`, and a bundled `UserAvatar` photo (no runtime external request).
- **Icons**: `bookmarks` and `history` added to the self-owned set.

### Changed

- **Typography**: replaced the Geist placeholder with the design-system
  typefaces — **DM Sans** (headings) + **Roboto** (body) — as `font.family`
  tokens, loaded via `@fontsource`.
- Added brand gradient stop tokens (`brand.red`/`magenta`/`violet`) and
  `brand.accent-from`/`accent-to` for the KIO avatar + send-glyph gradient.
- `CLAUDE.md`: added an "implement Figma pixel-accurate" rule.

### Notes

- Stack decisions in `DECISIONS.md` are **provisional**, pending engineering review.
- ESLint pinned to v9 pending `eslint-plugin-jsx-a11y` support for v10.
- Design tokens are seeded **placeholders**; real CoreMedia brand tokens are a
  later phase.

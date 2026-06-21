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

### Notes

- Stack decisions in `DECISIONS.md` are **provisional**, pending engineering review.
- ESLint pinned to v9 pending `eslint-plugin-jsx-a11y` support for v10.
- Design tokens are seeded **placeholders**; real CoreMedia brand tokens are a
  later phase.

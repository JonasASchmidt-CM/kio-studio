# DESIGN.md

**Owner: Design (Lead Product Designer).** Seeded with the design-system
foundation. Living document.

## Principles

1. **Tokens are the contract.** Color, spacing, type, radii live in
   `tokens/tokens.json` and nowhere else. Components consume tokens via theme
   variables — never hard-coded values.
2. **Git is canonical, Figma is the authoring surface.** Design authors in
   Figma; tokens are pushed to Git where CI, engineers, and AI tooling read
   them (DECISIONS.md D4).
3. **Accessibility is a constraint (WCAG 2.1 AA).** Contrast, focus order,
   keyboard operability, and ARIA are non-negotiable — designed in, not bolted on.
4. **We own our components.** shadcn/ui primitives are copied in and reshaped
   to match our designs to the pixel. No fighting a vendor theme API.
5. **Privacy by design.** Nothing in the UI introduces telemetry, analytics, or
   non-essential cookies.

## Token pipeline

```
Figma Variables ──(Tokens Studio, later)──▶ tokens/tokens.json  (W3C DTCG)
                                                    │   ← Git-canonical
                                          Style Dictionary
                                                    │
                                       src/styles/tokens.css     (--kio-* vars)
                                                    │
                                          src/index.css          (maps theme vars)
                                                    │
                                     Tailwind v4 + shadcn theme ──▶ components
```

- **Format:** W3C Design Tokens Community Group (DTCG) — `$value` / `$type`.
- **Namespace:** generated CSS vars are prefixed `--kio-` so they never collide
  with shadcn's semantic theme vars (`--primary`, `--background`, …).
- **References:** DTCG aliases (e.g. `semantic.border` → `{color.neutral.200}`)
  resolve to `var(...)` in the output, preserving the relationship.

## Token set (current seed)

> ⚠️ **Placeholder colors.** Real CoreMedia brand colors land in a dedicated
> phase (see TODO.md); neutrals are authored in **oklch** to match shadcn's
> native color space. **Fonts are real** now — DM Sans (headings) + Roboto
> (body), the KIO design-system typefaces.

| Group              | Tokens                                                     |
| ------------------ | ---------------------------------------------------------- |
| `color.brand`      | `red`/`magenta`/`violet` (gradient stops), `primary`, `primary-hover`, `primary-foreground`, `accent-from`/`accent-to` (avatar + send glyph) |
| `color.neutral`    | `50`–`900` ramp                                            |
| `color.semantic`   | `background`, `foreground`, `border` (alias → neutral.200) |
| `color.severity`   | `error`, `success`, `warning`, `neutral`                   |
| `spacing`          | `1`–`8` (4px base)                                         |
| `radius`           | `sm`, `md`, `lg`                                           |
| `font.family`      | `sans` (Roboto), `heading` (DM Sans), `mono`               |
| `font.size`        | `xs`–`2xl`                                                 |
| `font.weight`      | `regular`, `medium`, `semibold`, `bold`                    |
| `font.line-height` | `tight`, `normal`, `relaxed`                               |

### Theme mapping status

The **light theme core** (background, foreground, primary, neutrals, border,
radius, fonts) is mapped onto tokens: `--font-sans` → Roboto, `--font-heading`
→ DM Sans, and the brand gradient (`--brand-gradient`) is composed from the
`color.brand` stops. Still on raw values pending the brand phase: `card`,
`popover`, `destructive`, `chart-*`, `sidebar-*`, and the **entire `.dark` theme
block** in `src/index.css`.

## Adding / changing tokens

1. Edit `tokens/tokens.json`.
2. `npm run tokens:build` → regenerates `src/styles/tokens.css`.
3. If introducing a new semantic role, map it in `src/index.css`.
4. Verify contrast (AA) and run `npm run lint`.

## Icons

Material Design motifs, hand-authored as our own SVG React components in
`src/shared/icons` (DECISIONS.md D5). Decorative by default (`aria-hidden`);
give meaningful icons an accessible label. Use `currentColor` so icons theme
from text color.

## Brand marks

Gradient brand graphics live in `src/shared/brand` (kept out of the flat icon
set): `KioLogoMark`, `KioAvatar` (the smiley + white corona on the centred home),
`KioSparkleMark` (the sparkle smiley in the floating sidebar), and `KioSendGlyph`.
Their gradient stops reference brand tokens (`accent-from/to`, or the
red→magenta→violet stops) so they follow the brand phase automatically.
`UserAvatar` is a **bundled** photo — no runtime external request (privacy by
design); swap it for the signed-in user's avatar when auth lands.

## Implementing from Figma

Build to the pixel. Pull exact values via the Figma Desktop Bridge (geometry,
type, color, effects, and node `visible` flags); when a Figma value conflicts
with a token, **tokenize the Figma value** rather than approximating. See the
rule in `CLAUDE.md`.

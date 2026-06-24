# STATUS.md

Session handoff — current state of KIO Studio and what's next. **Keep this
updated** at the end of each working session.

_Last updated: 2026-06-24 (latest session: comprehensive Figma spec compliance + design tokens)_

## Current state: ✅ App shell + chat surfaces, pixel-perfect to Figma + design tokens systematized

`npm install && npm run dev` works. The app renders the full layout shell and the
KIO chat experience, built pixel-faithfully from the Figma "Design Concept" and
"Design System" files and themed entirely from tokens.

### What exists

- **App shell** (`src/app/layout`): sticky `AppHeader` (brand-gradient bar with
  site/locale, notifications, user menu), collapsible `NavSidebar` (Chat,
  Compliance, Settings), right `ContextSidebar`, and the main workspace.
- **Chat** (`src/app/workspace`):
  - `ChatHome` — centred blank slate (KIO avatar + white corona, greeting,
    gradient-bordered suggestion chips, prompt, footer) on an off-white canvas;
    becomes the transcript once a conversation starts.
  - `ChatSidebar` — the floating "KIO Copilot" panel the chat moves into when a
    view is surfaced on the main canvas (sparkle avatar, history icon, chips).
  - `SurfacedView` — the canvas content (e.g. Compliance) shown in the main area.
  - `PromptBox` — shared input (`card` / `filled` variants, gradient send glyph,
    bookmark toggle).
- **Brand marks** (`src/shared/brand`): `KioLogoMark`, `KioAvatar`,
  `KioSparkleMark`, `KioSendGlyph`, and `UserAvatar` (a bundled photo — no
  runtime external request, privacy by design).
- **Icons** (`src/shared/icons`): self-owned Material-motif SVGs (D5), incl.
  `bookmarks`, `history`.
- **Tokens:** `tokens/tokens.json` (W3C DTCG) → Style Dictionary →
  `src/styles/tokens.css` → mapped in `src/index.css`. Fonts are now **DM Sans**
  (heading) + **Roboto** (body), replacing the Geist placeholder. Brand gradient
  stops + `accent-from/to` (avatar/send gradient) are tokens.
- **Quality gates:** ESLint 9 + `jsx-a11y`, Prettier, strict typecheck, build —
  all green.

### Latest session work (2026-06-24)

**Completed:**
- ✅ **KIO avatar interactive**: Eyes follow mouse cursor subtly (1.5px movement)
- ✅ **Chat blank slate pixel-perfect** (Figma 146:4545): Exact spacing (32px gaps, 60px padding), typography (36px heading, 20px subheading, 14px buttons), gradients (145.83° and 133.65° angles with precise RGB stops)
- ✅ **Design tokens systematized**: Added 20+ tokens for blank slate (font sizes, line heights, spacing, border radius, colors, gradients) to `tokens/tokens.json`
- ✅ **DESIGN.md documented**: Blank slate specifications with token references for future implementations
- ✅ **Header letter spacing**: 1% (0.01em) global tracking applied to all small text
- ✅ **Action button hover effect**: Subtle magenta background on hover (8% opacity, smooth transition)
- ✅ **CLS prevention**: CSS containment + explicit sizing to prevent content jumping on reload

### Key facts for the next session

- **Implement Figma to the pixel** — rule: tokenize conflicting values rather than approximating (see CLAUDE.md).
- DECISIONS.md entries are **provisional** (designer pre-decisions).
- Colors in `tokens.json` are still **placeholders** pending the CoreMedia brand phase; fonts are now real (DM Sans, Roboto).
- Design tokens are **Git-canonical** (DESIGN.md D4) — `tokens.json` is the single source of truth, built to CSS via Style Dictionary.
- Run project tools via `npm run <script>` (a shell hook mangles bare `npx`).
- Work lives on branch `feat/chat-blank-slate`; ready for PR + `main` fast-forward.

### Known gaps / deviations

- The concept chat-home's top-right **feedback-hub icon** is omitted — its Figma instance is an unresolved library reference that exports no geometry (it renders blank in Figma too).

## Next up

1. CoreMedia **brand tokens & style definitions** — replace placeholder color
   values (work laptop, after transfer). See TODO.md.
2. **Conversation mock engine / playbooks** (+ optional real Claude LLM/agents) —
   see TODO.md (O2).
3. Fast-forward `main` / open the PR for `feat/chat-blank-slate`.

## Open decisions (owned by eng/BE)

Tracked in DECISIONS.md (O1 deployment, O2 LLM adapter, O3 flags/modularity,
O4 offline) and the _TBD_ sections of ARCHITECTURE.md / INTEGRATION.md.

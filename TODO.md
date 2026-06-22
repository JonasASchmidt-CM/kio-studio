# TODO

Backlog for KIO Studio. Grouped by theme. Items reference `DECISIONS.md`
(D# = decided/provisional, O# = open/deferred to engineering).

## Design system & tokens

- [ ] **CoreMedia brand tokens & style definitions** — replace the seeded
      placeholder values in `tokens/tokens.json` with real brand colors, type,
      spacing, and radii. _To be done on the work laptop after the repo is
      transferred to the CoreMedia work GitHub org._ (Primary next design task.)
- [ ] Complete theme tokenization: map the remaining raw values in
      `src/index.css` onto tokens — `card`, `popover`, `destructive`, `chart-*`,
      `sidebar-*`, and the **entire `.dark` block**.
- [ ] Wire **Figma → Tokens Studio → `tokens.json`** sync once tokens stabilize
      (D4); until then, hand-edit `tokens.json`.
- [ ] Replace the placeholder icon geometry with exact Material motifs exported
      from Figma (D5); expand the `src/shared/icons` set as needed.
- [ ] Replace the default Geist font (pulled in by shadcn `base-nova`) with the
      brand typeface; update `font.family` tokens and the favicon.

## After transfer to the work machine

These run on the CoreMedia work laptop, after the repo is in the work GitHub org
and around the brand-token / style-definition phase.

- [x] **Run `claude init`, then paste this prompt:** _"Merge your findings into
      the existing CLAUDE.md. Keep it as a lean index that points to DESIGN.md,
      ARCHITECTURE.md, CODE_STYLE.md, INTEGRATION.md and DECISIONS.md (use @path
      references, don't copy their contents). Only add what you can't infer from
      the code — accurate build/test/lint/dev commands and the real folder
      structure. Prune anything generic."_
- [ ] **Integrate this repo with CoreMedia's AI-Foundation repo.**
- [ ] **Change the git author email to the work address** once on the work
      machine: `git config user.email "jonas.schmidt@coremedia.com"` (the initial
      scaffold commit was authored with the personal email).

## Accessibility (WCAG 2.1 AA — D6)

- [ ] Add automated a11y testing (e.g. `axe-core` / `jest-axe` or Playwright +
      axe) to complement `jsx-a11y` static linting — part of the test-framework
      decision (O5).
- [ ] Establish a manual a11y checklist: keyboard nav, focus order, visible
      focus, contrast, screen-reader pass.

## Architecture / engineering (eng to decide)

- [ ] Routing solution (none yet) — keep swappable.
- [ ] Server-cache / data-fetching layer for the CMS engine (e.g. TanStack Query).
- [ ] **Feature flags** mechanism — provider-agnostic interface (O3).
- [ ] **LLM provider abstraction** (Claude + ChatGPT), swappable adapter (O2).
- [ ] **Offline/PWA** support — leave room now, scope later (O4).
- [ ] **Deployment model** on-prem vs managed PaaS/K8s; secrets + LLM key
      custody (O1).
- [ ] **Test framework / runner** — none installed yet (no `npm test`); choose a
      unit/component runner (Vitest vs. Jest) + E2E (Playwright), wire the `test`
      script into `package.json`, and fold in the a11y testing layer below (O5, D6).
- [ ] Reconsider ESLint v10 once `eslint-plugin-jsx-a11y` supports it.
- [ ] **Type-aware ESLint** — the config extends `tseslint.configs.recommended`
      (syntactic only). For a production app, consider
      `recommendedTypeChecked` / `strictTypeChecked` (set `parserOptions.project`
      to the `tsconfig`s) and optionally `eslint-plugin-react-x` /
      `eslint-plugin-react-dom`; weigh the added rules against lint speed.
- [ ] **React Compiler** — not enabled (Vite default). Evaluate turning it on for
      runtime perf, weighing its dev/build-time cost against the build-speed
      priority (DECISIONS.md priority #1).

## Integration (BE)

- [ ] Define the Java CMS-engine contract in `INTEGRATION.md` (protocol, auth,
      endpoints, error model).

## Housekeeping

- [ ] Remove `lucide-react` if unused — shadcn installed it as the default icon
      library, but D5 uses our own SVGs.

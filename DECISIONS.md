# KIO Studio — Decision Record (DECISIONS.md)

> **Status: PROPOSED — designer pre-decisions, pending engineering review.**
> These choices were made by the **Lead Product Designer**, working solo with an AI assistant, ahead of team involvement. They are a **starting suggestion only**, intended to unblock an initial scaffold and a first working increment. **Engineering (FE + BE), PM, and POs are expected to revisit, approve, or change any of them.** Nothing here is final, and several entries are explicitly deferred to engineering ownership.

---

## Context

KIO Studio is a new, AI-first standalone workspace that acts as a frontend client for our existing CMS engine (distribution, A/B testing, variant segmentation). It will be delivered either on-premises (installed on customer servers) or as a managed PaaS on our own Kubernetes cluster. Backend is Java (to be confirmed by BE).

The decisions below were derived from a single explicit priority ranking, which is the load-bearing assumption behind almost everything. **If engineering disagrees with the ranking, the technical choices should be re-derived from the corrected ranking.**

## Priority ranking used (designer's, for this stage)

1. Build speed & prefab efficiency
2. Low lock-in & portability (own/reuse our code)
3. Design control / deep customization
4. Team familiarity / low learning curve

Plus two **non-negotiable constraints** (not ranked — they always hold): **WCAG 2.1 AA** accessibility (B2B enterprise) and **GDPR / privacy-by-design**.

---

## Decisions

### D1 — Framework: React + Vite + TypeScript
**Proposed.** React for the strongest AI/vibe-coding fluency and ecosystem; Vite (not Next.js) because KIO Studio sits behind auth and consumes our engine's APIs — no SEO/SSR need today. **Re-open if** server-rendering or multi-tenant server routing becomes a requirement (then reconsider Next.js).

### D2 — Component layer: shadcn/ui on Base UI primitives
**Proposed.** Copy-in components we own (no vendor lock-in) → satisfies priority #2 while delivering prefab speed (#1). Base UI primitives chosen over Radix because Base UI is the more actively maintained primitive layer (Radix velocity slowed after the WorkOS acquisition) and carries our team's MUI lineage. Accessibility note: the primitives provide a strong AA baseline (ARIA, keyboard, focus trapping), **but components become our code once copied — AA is then our responsibility and must be tested.**

### D3 — Styling: Tailwind CSS
**Proposed — note the tension.** This **reverses** an earlier lean toward CSS Modules. CSS Modules better honors a strict HTML/CSS separation principle; Tailwind co-locates styling in markup. Tailwind is chosen here only because (a) speed ranked #1 and (b) shadcn is Tailwind-native, so removing Tailwind would forfeit the speed advantage. **Engineering may legitimately overturn this** if strict separation is valued above velocity — that fork leads back to React Aria Components + CSS Modules.

### D4 — Design tokens: Git-canonical, Figma-authored
**Proposed.** Pipeline: Figma Variables → Tokens Studio (push) → `tokens.json` (W3C format, single source of truth in Git) → Style Dictionary → CSS custom properties (which shadcn themes from). Figma is the authoring surface; **Git is canonical** (the AI harness, CI, and engineers read Git, not Figma). Start by hand-seeding `tokens.json`; add automated Tokens Studio sync once tokens stabilize.

### D5 — Icons: Material motifs, self-owned SVGs
**Proposed.** Keep Material Design icon motifs for continuity with our existing products and easy user transition. Source from the Figma community file and export as our own SVG React components (svgr) rather than depending on `@mui/icons-material` (which peer-depends on MUI core). Change an icon only when a motif is contradictory or causes usability/accessibility friction.

### D6 — Accessibility target: WCAG 2.1 AA
**Constraint, not a preference.** Build automated + manual a11y checks (keyboard nav, focus order, ARIA, contrast) into the test process from the first increment.

---

## Open — owned by engineering / deferred

### O1 — Deployment model (on-prem vs managed PaaS/K8s)
Affects config, secrets handling, and especially LLM API-key custody. **BE/DevOps to decide.** Record as its own ADR when chosen.

### O2 — LLM integration for conversation testing (Claude + ChatGPT)
Needed to initiate/test/model real AI conversation paths. Approach: a **provider-abstraction layer** so providers are swappable (consistent with the no-lock-in priority). Mock engine intentionally skipped for now (cost/effort vs. value for a half-capacity designer). **FE/BE to design the adapter.**

### O3 — Modularity + feature flags
App must be modular with swappable parts. Feature flags needed to expose features to specific user groups and/or specific customers (single or multiple). Suggest a provider-agnostic flag interface + feature-sliced folder structure. **Eng to choose the mechanism.**

### O4 — Offline support
PWA / service worker (e.g. Vite PWA plugin) to cover unstable connections. Confirm whether on-prem deployments need it. **Eng to scope.**

### O5 — Test framework / runner
No test tooling is installed yet — there is no `npm test`. Pick a unit/component runner (e.g. **Vitest**, Vite-native, vs. Jest), an E2E approach (e.g. **Playwright**), and the **WCAG 2.1 AA** automated-testing layer required by D6 (e.g. `axe-core` / `jest-axe`, or Playwright + axe). **Eng to decide**; record as its own ADR and wire the chosen `test` script(s) into `package.json`.

---

## What engineering should pressure-test first
- Is the **priority ranking** (speed > low-lock-in > control > familiarity) the right one for the team, not just for design?
- **D3 (Tailwind)** vs. a strict HTML/CSS separation standard — explicit fork, please rule.
- Java backend ↔ React frontend **integration contract** (to be captured in INTEGRATION.md).
- AA accessibility ownership and tooling.
- On-prem vs PaaS implications for secrets, LLM keys, and update cadence.

---

*Authored by: Lead Product Designer (Design). Co-developed with an AI assistant. Provisional — supersede freely.*

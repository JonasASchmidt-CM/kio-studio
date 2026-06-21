# App providers

Cross-cutting React context providers that wrap the whole app live here and are
composed in `src/app/App.tsx` (or a dedicated `providers/index.tsx`) as they are
added.

Anticipated providers (none built yet — see DECISIONS.md):

- **Theme** — light/dark + token-driven theming.
- **Feature flags** — provider-agnostic flag interface (O3).
- **Data/query** — client for the CoreMedia CMS engine (see `INTEGRATION.md`).
- **LLM provider abstraction** — swappable Claude/ChatGPT adapter (O2).

Keep providers thin and swappable — no hard lock-in to any single vendor.

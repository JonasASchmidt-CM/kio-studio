# Features

Each subfolder here is a **self-contained feature slice** — the unit of
modularity for KIO Studio (DECISIONS.md O3).

## Convention

```
features/
  <feature-name>/
    components/   # UI specific to this feature
    hooks/        # feature-local hooks
    api/          # calls to the CMS engine for this feature
    index.ts      # the feature's public surface — import only from here
```

Rules of thumb:

- A feature may import from `@/shared/*` (UI primitives, lib, icons) but
  **not** from another feature's internals — cross-feature use goes through
  that feature's `index.ts`.
- Keep files that change together in the same slice (split by responsibility,
  not by technical layer).
- Feature flags (DECISIONS.md O3) will gate slices here once the mechanism is
  chosen by engineering. **Not built yet** — this structure just leaves room.

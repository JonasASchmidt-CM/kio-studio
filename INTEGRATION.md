# INTEGRATION.md

**Owner: Backend (BE).** This is a **stub + template** for the contract between
KIO Studio (React frontend) and the **Java** CMS engine. Everything below is
_TBD — BE/FE_ until the team fills it in.

## Context

KIO Studio is a frontend client for the existing CoreMedia CMS engine
(distribution, A/B testing, variant segmentation). Backend is Java (to be
confirmed). Deployment is on-prem or managed PaaS/K8s (DECISIONS.md O1).

## Contract overview — _TBD_

| Aspect                | Decision                                            |
| --------------------- | --------------------------------------------------- |
| Protocol              | _TBD_ — REST / GraphQL / gRPC-web?                  |
| Base URL / env config | _TBD_ — per deployment (on-prem vs PaaS)            |
| Auth                  | _TBD_ — token type, refresh, session model          |
| Versioning            | _TBD_ — API version strategy                        |
| Error model           | _TBD_ — shape of error responses the FE can rely on |

## Resources / endpoints — _TBD_

Document the engine capabilities the Studio consumes. Template per resource:

```
### <Resource>
- Purpose:
- Method + path:
- Request shape:
- Response shape:
- Auth/permissions:
- Notes (pagination, rate limits, caching):
```

Likely areas (from the engine's domain): content distribution, A/B test
definitions + results, variant segmentation rules.

## Authentication & secrets — _TBD_

- How the SPA obtains/refreshes credentials.
- **LLM API-key custody** depends on the deployment model (O1) — keys must
  **never** ship in frontend source or bundles. Document where they live
  (server-side proxy vs customer-supplied on-prem).

## LLM provider abstraction (O2) — _TBD — FE/BE_

For conversation testing/modeling (Claude + ChatGPT). Design a
**provider-abstraction layer** so providers are swappable (no lock-in). The FE
calls a backend adapter, not a provider SDK directly. Mock engine intentionally
skipped for now.

## Local development — _TBD_

How to point the Studio at a local/staging engine (env vars, proxy config in
`vite.config.ts`).

## Privacy (GDPR)

No personal data is sent to third parties without a lawful basis. Any data
crossing the FE/BE boundary is documented here with its retention and purpose.

# RSS Reader — Product & Engineering Roadmap

This roadmap keeps the long-term evolution of the RSS Reader visible while separating planned work from current portfolio evidence.

## Status legend

- ✅ Implemented / evidenced
- 🔄 Priority engineering direction
- 🧭 Strategic evolution, not a current claim

Current evidence is documented in [`README.md`](./README.md) and [`ENGINEERING_EVIDENCE.md`](./ENGINEERING_EVIDENCE.md).

## Current baseline

- ✅ JavaScript / ES Modules frontend.
- ✅ Yup URL validation and duplicate-feed prevention.
- ✅ Axios network requests through the project's external proxy path.
- ✅ RSS/XML parsing into feed/post data.
- ✅ reactive state using `on-change`.
- ✅ separated watcher/rendering layer.
- ✅ periodic feed refresh without overlapping cycles.
- ✅ i18next internationalization.
- ✅ Webpack production build.
- ✅ ESLint quality check.
- ✅ real Playwright Chromium smoke test executed in CI.

## Dependency and security health

- 🔄 Review and reduce the current npm audit findings.
- 🔄 update stale browser-compatibility metadata.
- 🔄 review dependencies that are deprecated or no longer maintained.
- 🔄 document the privacy/availability implications of the external RSS proxy.
- 🧭 dependency/secret scanning appropriate to the public repository.

## Test maturity

- 🔄 add parser unit tests with synthetic RSS/XML fixtures.
- 🔄 add deterministic tests for duplicate feeds and malformed XML.
- 🔄 mock successful/failed proxy responses instead of relying on external availability.
- 🔄 expand Playwright from the current offline form-validation smoke test to representative feed workflows using mocked network responses.
- 🧭 visual/accessibility smoke tests if the project becomes a featured frontend showcase.

## Architecture evolution

- 🔄 make proxy/network access an explicit adapter rather than a hidden external dependency.
- 🔄 centralize user-facing error/result states.
- 🔄 keep parsing, state transitions and rendering independently testable.
- 🧭 define a small typed model layer through JSDoc or TypeScript only if it improves maintainability.
- 🧭 introduce a backend/proxy service only if direct public RSS access requires a controlled infrastructure boundary.

## Performance and UX

The observed Webpack build reports a combined main entrypoint around 458 KiB and recommends code splitting.

- 🔄 review bundle composition and unnecessary imports.
- 🔄 reduce or split heavy UI/style dependencies where practical.
- 🔄 improve loading, empty and error states.
- 🔄 verify keyboard/semantic accessibility.
- 🧭 performance budgets for a future featured demo.
- 🧭 sanitized screenshots or short demo media after the deployment is revalidated.

## Product evolution

Potential future capabilities:

- 🧭 feed categories/folders;
- 🧭 search/filtering across posts;
- 🧭 starred/saved posts;
- 🧭 read/unread state persistence;
- 🧭 import/export via OPML;
- 🧭 configurable refresh intervals;
- 🧭 offline cache for recently loaded feeds;
- 🧭 notification rules for selected feeds.

These capabilities are roadmap ideas, not current functionality.

## Deployment maturity

- 🔄 revalidate the configured Vercel deployment before presenting it as a guaranteed live demo.
- 🧭 automated preview deployment after quality checks.
- 🧭 lightweight release/version notes when public releases become meaningful.

## Promotion rule

An item becomes ✅ only after implementation is versioned, relevant verification exists, documentation is updated and CI remains green.

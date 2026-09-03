# RSS Reader — Engineering Evidence

This document records source and CI evidence observed for the current repository state.

## Source evidence

- JavaScript / ES Modules.
- Axios network access.
- Yup URL validation.
- RSS/XML parser module.
- reactive state through `on-change`.
- watcher/rendering separation.
- i18next internationalization.
- Bootstrap/Sass/PostCSS UI stack.
- Webpack production build.
- ESLint configuration.
- Playwright configuration with a local Webpack dev server.

## Observed CI evidence

The independent workflow runs on Node 22 and executes:

```text
npm ci
npx playwright install --with-deps chromium
npm run lint
npm run build
npx playwright test
```

Observed results:

- ESLint: PASS;
- Webpack build: completed successfully with performance warnings;
- Playwright: `1 passed` in Chromium;
- GitHub Actions job: success.

The current Playwright smoke test renders the RSS form and validates a malformed URL **without external network access**, making the test deterministic with respect to the third-party RSS proxy.

## Build observations

The observed production build reported a combined main entrypoint around **458 KiB** and emitted Webpack performance/code-splitting recommendations. That is treated as a useful optimization signal, not hidden from the portfolio documentation.

## Dependency-health observation

The same `npm ci` output reported:

```text
36 vulnerabilities
3 low · 9 moderate · 22 high · 2 critical
```

This dependency-tree snapshot is one reason the project is not presented as production-ready. Remediation and toolchain/dependency review are tracked in [`ROADMAP.md`](./ROADMAP.md).

## External service boundary

The application uses an external proxy to retrieve cross-origin RSS feeds. Availability, rate limits and privacy characteristics of that external service are outside this repository's control. The current automated browser test deliberately avoids depending on that external network path.

## Evidence rule

Future product and architecture ideas remain roadmap items until implementation and reproducible verification exist.

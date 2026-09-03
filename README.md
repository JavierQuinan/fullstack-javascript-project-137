<div align="center">

# RSS Reader

### Reactive RSS aggregator built with JavaScript, Webpack and i18next

[![CI](https://github.com/JavierQuinan/fullstack-javascript-project-137/actions/workflows/ci.yml/badge.svg)](https://github.com/JavierQuinan/fullstack-javascript-project-137/actions/workflows/ci.yml)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack-5-8DD6F9?logo=webpack&logoColor=black)
![Playwright](https://img.shields.io/badge/Playwright-Chromium-2EAD33?logo=playwright&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

</div>

## Overview

RSS Reader is a browser application for subscribing to RSS feeds, validating feed URLs, rendering posts and periodically checking subscribed feeds for new content.

The project is maintained as **verifiable frontend engineering evidence**. Current capabilities and observed CI results are documented here; possible future evolution lives separately in [`ROADMAP.md`](./ROADMAP.md).

## Verified capabilities

- RSS URL validation with Yup;
- duplicate-feed prevention;
- requests through Axios and the external proxy used by the project;
- RSS/XML parsing into feed and post models;
- reactive application state through `on-change`;
- separated UI watchers/rendering;
- periodic feed refresh after the previous request cycle completes;
- detection and insertion of newly published posts;
- modal post preview / read-state handling;
- internationalization with i18next;
- Bootstrap UI;
- Webpack production build;
- ESLint / Airbnb configuration;
- Playwright Chromium smoke testing in GitHub Actions;
- Vercel deployment configuration in the repository.

## Stack

`JavaScript / ES Modules` · `Axios` · `Yup` · `i18next` · `on-change` · `Lodash` · `Bootstrap` · `Webpack` · `Babel` · `Sass` · `PostCSS` · `ESLint` · `Playwright`

## Application flow

```text
Feed URL
   │
   ▼
Yup validation
   │
   ▼
HTTP proxy request
   │
   ▼
RSS parser
   │
   ▼
Reactive state (feeds / posts / form / UI)
   │
   ▼
watchers.js renders DOM updates
   │
   └── periodic refresh checks for new posts
```

The refresh loop waits for the active network cycle to finish before scheduling the next iteration, avoiding overlapping polling cycles.

## Structure

```text
src/
  index.js
  init.js
  rss.js
  watchers.js
  locales/
tests/
  rss-reader.spec.js
playwright.config.js
webpack.config.js
vercel.json
package.json
```

## Local development

```bash
git clone https://github.com/JavierQuinan/fullstack-javascript-project-137.git
cd fullstack-javascript-project-137
npm ci
npm start
```

## Build and quality commands

```bash
npm run lint
npm run build
npx playwright test
```

## Observed quality evidence

The independent GitHub Actions workflow runs on Node 22 and executes lint, production build and Chromium Playwright smoke testing.

Observed results on the current hardening PR:

- ESLint — PASS;
- Webpack production build — completed successfully with performance warnings;
- Playwright — **1 passed**;
- GitHub Actions quality job — **success**.

The current browser smoke test verifies that the RSS form renders and that malformed URLs are rejected without depending on the external feed proxy. This makes the automated browser evidence deterministic with respect to third-party network availability.

See [`ENGINEERING_EVIDENCE.md`](./ENGINEERING_EVIDENCE.md) for the detailed observed evidence.

## Dependency, performance and external-service boundaries

The observed dependency install reported **36 npm audit findings** (`3 low`, `9 moderate`, `22 high`, `2 critical`). The repository is therefore not described as production-ready until the dependency graph is reviewed and remediated.

The observed Webpack build also reported a combined main entrypoint around **458 KiB** and recommended code splitting. This is recorded as an optimization signal rather than hidden.

The application depends on an external proxy for cross-origin RSS retrieval. Availability, rate limits and privacy characteristics of that proxy remain outside this repository's control.

## Product & engineering roadmap

[`ROADMAP.md`](./ROADMAP.md) preserves an ambitious future direction using:

- ✅ implemented/evidenced;
- 🔄 priority engineering direction;
- 🧭 strategic evolution, not current functionality.

The roadmap covers dependency hardening, parser/network testing, performance, accessibility, proxy architecture and potential RSS product capabilities such as categories, search, saved posts and OPML import/export.

## Deployment note

`vercel.json` and a deployment URL have existed for this project, but this README does **not** guarantee a currently healthy live deployment unless it is revalidated. Repository evidence remains usable without that external deployment.

## Portfolio classification

**Category:** Frontend / reactive JavaScript evidence  
**Visibility:** Public  
**Classification:** `PORTFOLIO EVIDENCE` / supporting frontend project

The strongest evidence is framework-free reactive state management, modular rendering, RSS parsing/network flows, build tooling, linting and a real Playwright CI smoke test.

## Resumen en español

Lector RSS en **JavaScript modular** con validación Yup, Axios, parser RSS/XML, estado reactivo mediante `on-change`, i18next, Webpack y Playwright. El CI actual ejecuta lint, build y un smoke test real en Chromium con resultado exitoso. La deuda de dependencias, el tamaño de bundle y la dependencia del proxy externo están documentados, mientras el roadmap conserva la evolución futura sin presentarla como funcionalidad actual.

## Author

Francisco Quinteros — [GitHub](https://github.com/JavierQuinan)

## License

ISC. Developed as part of the Hexlet learning path.

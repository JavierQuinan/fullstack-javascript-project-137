<div align="center">

# RSS Reader

### Reactive RSS aggregator built with JavaScript, Webpack and i18next

[![Actions Status](https://github.com/JavierQuinan/fullstack-javascript-project-137/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/JavierQuinan/fullstack-javascript-project-137/actions)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack-5-8DD6F9?logo=webpack&logoColor=black)
![License](https://img.shields.io/badge/license-ISC-blue)

[Configured Vercel demo](https://fullstack-javascript-project-137-nine.vercel.app/)

</div>

## Overview

RSS Reader is a browser application for subscribing to RSS feeds, validating feed URLs, rendering posts and periodically checking subscribed feeds for new content.

The project is maintained as **verifiable frontend engineering evidence**. It demonstrates reactive client state without a frontend framework, modular UI rendering, asynchronous network flows, RSS parsing and build tooling.

## Verified capabilities

- RSS URL validation with Yup
- duplicate-feed prevention
- requests through Axios and the AllOrigins proxy used by the project
- RSS/XML parsing into feed and post models
- reactive application state through `on-change`
- separated UI watchers/rendering
- periodic feed refresh after the previous request cycle completes
- detection and insertion of newly published posts
- modal post preview / read-state handling
- internationalization with i18next
- Bootstrap UI
- Webpack production build
- ESLint / Airbnb configuration
- Vercel deployment configuration

## Stack

`JavaScript / ES Modules` · `Axios` · `Yup` · `i18next` · `on-change` · `Lodash` · `Bootstrap` · `Webpack` · `Babel` · `Sass` · `PostCSS` · `ESLint`

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
webpack.config.js
vercel.json
package.json
```

## Local development

```bash
git clone https://github.com/JavierQuinan/fullstack-javascript-project-137.git
cd fullstack-javascript-project-137
npm install
npm start
```

## Build and quality commands

```bash
npm run build
npm run lint
npm run lint:fix
npm run preview
```

## Testing status

`@playwright/test` is installed and the current `npm test` command invokes Playwright followed by linting. During this repository audit, however, no versioned Playwright test suite was found through the indexed repository contents. For that reason this README does **not** claim verified automated-test coverage yet.

Before promoting Playwright as portfolio evidence, the repository should include a deterministic test suite (for example feed validation, successful load, duplicate URL, parsing failure and refresh behavior) and execute it in CI.

## Engineering notes

The current implementation keeps state and rendering concerns separated: `init.js` coordinates validation/network operations while `watchers.js` handles UI reactions. RSS parsing lives in its own module.

The application depends on an external proxy endpoint for cross-origin RSS retrieval. That dependency is appropriate to document because availability, rate limits and privacy characteristics of the proxy are outside this repository's control.

## Hardening backlog

- add and verify Playwright tests in CI;
- remove leftover example/demo files that are not part of the application after confirming they have no grading dependency;
- verify the configured Vercel deployment before treating it as a guaranteed live demo;
- document error states and external-proxy dependency more explicitly in the UI;
- review accessibility and Lighthouse metrics before flagship promotion.

## Portfolio classification

**Category:** Frontend / reactive JavaScript evidence  
**Visibility:** Public  
**Portfolio priority:** Medium-high  
**Current recommendation:** Keep as strong supporting frontend evidence; candidate for featured status after test and live-demo verification.

## Author

Francisco Quinteros — [GitHub](https://github.com/JavierQuinan)

## License

ISC. Developed as part of the Hexlet learning path.

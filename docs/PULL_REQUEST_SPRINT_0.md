# Pull Request: Sprint 0 MVP Foundation

## Title

Implement Sprint 0 foundation for HWP Platform 3.0 MVP

## Summary

This pull request creates the project foundation for the HWP Platform 3.0 MVP using the approved stack:

- HTML5
- CSS3
- JavaScript ES2023
- Vite
- Simplified Clean Architecture
- Lightweight MVVM
- Repository Pattern
- Event Bus
- IndexedDB
- Progressive Web App support

No business feature is implemented in this PR.

## Scope Guardrails

Included:

- Vite project configuration
- PWA manifest and service worker
- IndexedDB abstraction
- Repository base class
- Event bus
- Logger
- Shared utilities
- Theme files
- Assets folders
- Navigation skeleton
- Empty ViewModel, Repository, and Engine extension points
- ESLint and Prettier configuration
- npm scripts

Explicitly excluded:

- Dashboard
- Nutrition
- Workout
- Medication
- AI
- Goals
- Backend
- REST API
- Authentication
- Cloud sync
- Multiple users

## Architecture

The source structure is intentionally split into foundation-oriented layers:

- `src/app`: application composition and navigation setup
- `src/core`: framework-neutral infrastructure primitives
- `src/domain`: empty domain extension points for future business rules
- `src/infrastructure`: browser platform adapters such as IndexedDB and PWA registration
- `src/presentation`: app shell and lightweight MVVM view models
- `src/shared`: future shared constants and errors
- `src/theme`: design tokens and base layout styles
- `src/assets`: local application assets

## Verification

The intended verification commands are:

```bash
node --version
npm install
npm run lint
npm run format:check
npm run build
```

Local execution note: Node.js, npm, and git were not available on the current machine PATH during implementation, so package installation, lint, build, commit, and branch creation could not be executed in this session. Vite 8 requires Node.js 20.19+ or 22.12+.

## Files Created

### Project and Build Configuration

- `package.json`: Defines the Vite project metadata, Node engine guardrail, ES module mode, npm scripts, and development dependencies for Vite, ESLint, globals, and Prettier.
- `index.html`: Provides the HTML5 document shell, PWA metadata, app mount node, favicon, manifest link, and Vite module entry.
- `vite.config.js`: Configures Vite as a single-page application with a `dist` build output, source maps, and a local development server.
- `eslint.config.js`: Configures ESLint flat config for JavaScript ES2023, browser globals, service worker globals, ignored build folders, and baseline code-quality rules.
- `.prettierrc`: Defines consistent formatting preferences for JavaScript, CSS, HTML, and JSON files.
- `.prettierignore`: Excludes generated and dependency folders from formatting.
- `.editorconfig`: Defines editor-level whitespace, encoding, and line-ending conventions.

### PWA Foundation

- `public/manifest.json`: Defines the installable PWA manifest, display mode, theme colors, start URL, scope, orientation, and icon metadata.
- `public/sw.js`: Adds the service worker with app-shell caching, cache cleanup on activation, and a cache-first fallback for GET requests.
- `public/icons/icon.svg`: Provides the MVP PWA icon used by the manifest and browser tab.
- `src/infrastructure/pwa/registerServiceWorker.js`: Registers the service worker after page load when the browser supports it.

### Application Composition

- `src/main.js`: Imports theme styles, creates the application, starts it, and registers the service worker.
- `src/app/createApplication.js`: Composes the Sprint 0 dependencies: logger, event bus, IndexedDB client, router, and root view model.

### Navigation Skeleton

- `src/app/navigation/createRouter.js`: Provides a lightweight client-side router with route resolution, history navigation, route-change listeners, and popstate handling.
- `src/app/navigation/routes.js`: Declares the initial non-business Sprint 0 route used by the navigation skeleton.
- `src/presentation/shell/renderAppShell.js`: Renders the minimal application shell, primary navigation area, and current route content.

### MVVM Foundation

- `src/presentation/viewmodels/AppViewModel.js`: Provides the root ViewModel for Sprint 0 initialization, route state, navigation, and app initialization events.
- `src/presentation/viewmodels/index.js`: Exposes the ViewModel folder through a stable barrel file.

### Core Infrastructure

- `src/core/events/EventBus.js`: Implements publish, subscribe, unsubscribe, and clear operations for event-driven communication.
- `src/core/logging/Logger.js`: Provides a namespaced logger with debug, info, warn, error, and level filtering.
- `src/core/repositories/BaseRepository.js`: Provides a storage-backed base repository contract for future repositories.
- `src/core/utils/assert.js`: Adds a small assertion helper for invariant checks.
- `src/core/utils/createId.js`: Adds a browser-safe ID helper using `crypto.randomUUID` when available.
- `src/core/utils/object.js`: Adds a deep-freeze helper for immutable foundation objects.
- `src/core/utils/index.js`: Exposes utility helpers from a single barrel file.

### IndexedDB Foundation

- `src/infrastructure/storage/IndexedDBClient.js`: Provides a minimal IndexedDB abstraction with database opening, upgrade handling, `getAll`, `getById`, `put`, and `delete`.

### Empty Extension Points

- `src/domain/engines/index.js`: Declares an empty engine registry for future business engines.
- `src/domain/repositories/index.js`: Declares empty repository contracts for future domain repositories.
- `src/infrastructure/repositories/index.js`: Declares an empty infrastructure repository registry for future implementations.
- `src/domain/entities/.gitkeep`: Preserves the future domain entities folder.
- `src/domain/value-objects/.gitkeep`: Preserves the future value objects folder.
- `src/infrastructure/mappers/.gitkeep`: Preserves the future persistence mapping folder.
- `src/shared/constants/.gitkeep`: Preserves the future shared constants folder.
- `src/shared/errors/.gitkeep`: Preserves the future shared errors folder.
- `tests/.gitkeep`: Preserves the future tests folder without adding business tests in Sprint 0.

### Theme and Assets

- `src/theme/tokens.css`: Defines foundational design tokens for colors, spacing, radius, shadow, and typography.
- `src/theme/base.css`: Adds global browser reset rules and base document styling.
- `src/theme/layout.css`: Styles the Sprint 0 application shell and navigation skeleton.
- `src/assets/.gitkeep`: Preserves the local assets folder.
- `src/assets/icons/.gitkeep`: Preserves the local icon assets folder.

### Pull Request Documentation

- `docs/PULL_REQUEST_SPRINT_0.md`: Documents the complete PR scope, exclusions, verification commands, and every file created.

## Review Checklist

- [x] Uses the approved MVP stack only.
- [x] Avoids TypeScript, React, Vue, Angular, backend, REST API, authentication, cloud sync, and multiple users.
- [x] Adds no business feature.
- [x] Adds PWA foundation.
- [x] Adds IndexedDB abstraction.
- [x] Adds Repository Pattern foundation.
- [x] Adds Event Bus foundation.
- [x] Adds lightweight MVVM foundation.
- [x] Adds linting and formatting configuration.
- [x] Documents every created file.

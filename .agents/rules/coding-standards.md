# Coding Standards & Architecture Rules

## 1. Language & Typing
- **TypeScript Strict Mode**: Every package (`web`, `ui`, `widgets`, `platform`, `functions`) must enforce strict compiler settings (`noImplicitAny`, `strictNullChecks`, `exactOptionalPropertyTypes`).
- **No `any`**: Explicit types or `unknown` with Zod/type-guard narrowing only.
- **Zod Runtime Validation**: All external inputs, Firestore documents, widget configuration payloads, and lesson JSON files must be validated at runtime via Zod schemas.

## 2. Monorepo Organization & Boundaries
- **Workspaces**: Managed via pnpm workspaces (`/apps/web`, `/packages/ui`, `/packages/widgets`, `/packages/platform`, `/functions`).
- **Package Encapsulation**:
  - `@pharmacy/ui`: Pure UI components, design tokens, typography, zero business logic.
  - `@pharmacy/widgets`: Pure interactive educational widgets (SAR, PK simulator, dose-response). Each widget exports its Zod schema, props interface, and gallery entry.
  - `@pharmacy/platform`: Authentication wrappers, user progress synchronization, access control (`hasAccess`), and analytics abstractions.
  - `@pharmacy/web`: Router, page compositions, course shells, layout integration.
  - Dependency Flow: `apps/web` -> `packages/{widgets, ui, platform}`. Packages must NOT have circular dependencies or depend on `apps/web`.

## 3. Component Architecture & State
- **Functional Components**: React 18+ functional components with typed props.
- **State Management**:
  - Local component state: React `useState`, `useReducer`.
  - Server & remote state: `@tanstack/react-query` for cached data and invalidation.
  - Global app state: lightweight Zustand stores (e.g., active lesson session state, offline sync queue).
- **Decoupled Widgets**: Every widget must be a pure, controlled/uncontrolled component driven by a JSON config. It must emit standard callback events: `onAttempt(payload)`, `onHintUsed(index)`, `onComplete(result)`.

## 4. Testing & Verification Requirements
- **Unit & Component Tests**: Vitest + React Testing Library for all UI components and widgets. Every interactive widget must have a test verifying:
  - Default rendering from valid config
  - Interaction trigger (click/drag/input)
  - Event callback emission with correct payload
  - Error state handling for invalid config
- **Rule Verification**: Firestore security rules must be covered by `@firebase/rules-unit-testing` running against the local Firestore emulator.
- **E2E Testing**: Critical user journeys (authentication, paywall lock/unlock, lesson completion, progress sync) tested via Playwright.

## 5. Code Hygiene & Commits
- **Conventional Commits**: Format `feat(course):`, `fix(widget):`, `docs(pedagogy):`, `test(rules):`, `refactor(ui):`.
- **Pre-commit Checks**: Linting (ESLint), formatting (Prettier), and TypeScript typechecks must pass before any phase gate.

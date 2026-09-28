# Engineering Guidelines & Technical Standards

## 1. Monorepo Architecture & Package Boundaries

The repository is structured as a pnpm workspace with strict dependency isolation:

```text
/
├── apps/
│   └── web/                   # Application shell (Vite, React 18, React Router 6, Tailwind)
├── packages/
│   ├── ui/                    # Base Neo-brutalist component library
│   ├── widgets/               # Domain-specific interactive educational widgets
│   └── platform/              # Auth, Firestore sync, entitlement rules, analytics interface
├── functions/                 # Cloud Functions (TypeScript)
├── courses/                   # Course definitions, curriculum maps, lesson JSON
```

### Dependency Rules:
- `apps/web` consumes `@pharmacy/ui`, `@pharmacy/widgets`, `@pharmacy/platform`.
- `@pharmacy/widgets` consumes `@pharmacy/ui`. It must NEVER import from `apps/web` or `@pharmacy/platform`.
- `@pharmacy/platform` is pure TypeScript domain logic (Firebase client SDK wrapper, state stores).
- Circular dependencies are forbidden and caught by ESLint `import/no-cycle`.

---

## 2. TypeScript & Schema Enforcement

- **Strict Mode**: `tsconfig.base.json` enforces:
  - `"strict": true`
  - `"noImplicitAny": true`
  - `"strictNullChecks": true`
  - `"noUncheckedIndexedAccess": true`
  - `"exactOptionalPropertyTypes": true`
- **Zod Data Contracts**:
  - Every widget config defines its runtime validator:
    ```typescript
    export const PkSimulatorConfigSchema = z.object({
      defaultDoseMg: z.number().positive(),
      clearanceLPerHr: z.number().positive(),
      volumeOfDistributionL: z.number().positive(),
      routes: z.array(z.enum(['iv_bolus', 'iv_infusion', 'oral'])),
      targetTherapeuticRange: z.tuple([z.number(), z.number()]),
    });
    export type PkSimulatorConfig = z.infer<typeof PkSimulatorConfigSchema>;
    ```
  - Lesson JSON parsing fails immediately at build time or runtime if payloads diverge from schema.

---

## 3. Molecule Rendering & Data Visualization

- **2D Chemical Structures**:
  - Primary engine: `SmilesDrawer` or `@rdkit/rdkit` WebAssembly module.
  - SMILES strings are verified and parsed into SVG vector graphics natively on the client.
  - Interactive atom/bond click handlers map atom indices back to widget state.
- **Dynamic Curves & Charts**:
  - Built with custom SVG or `Recharts` / `visx` wrapped in neo-brutalist styling (heavy 3px black axes, chunky markers, zero blur grid lines).

---

## 4. Performance & Code-Splitting Strategy

- **Route-Based Splitting**: Course catalogs, lesson players, and user profile pages are dynamically loaded (`React.lazy()`).
- **Heavy Dependency Lazy-Loading**:
  - The molecular structure rendering engine (WASM/RDKit) is loaded asynchronously only when a lesson contains a molecular widget.
- **Budget Goals**:
  - Initial JS bundle: < 180 KB compressed.
  - Largest Contentful Paint (LCP) on mid-tier mobile: < 2.5s.
  - Time to Interactive (TTI): < 3.0s.

---

## 5. Testing Strategy Matrix

| Level | Tooling | Target | CI/CD Enforceability |
| :--- | :--- | :--- | :--- |
| **Linting & Types** | `eslint`, `prettier`, `tsc --noEmit` | Whole monorepo | Required pre-commit & CI gate |
| **Content Linting** | Custom Zod script (`pnpm lint:content`) | `courses/**/lessons/*.json` | Build fails on missing source or unverified structure |
| **Unit & Component** | `vitest`, `@testing-library/react` | `@pharmacy/ui`, `@pharmacy/widgets` | 100% pass on all widget states |
| **Security Rules** | `@firebase/rules-unit-testing` | `firestore.rules` against emulator | Passes before staging deploy |
| **End-to-End (E2E)** | `playwright` | Critical flows in `apps/web` | Run on staging preview channels |

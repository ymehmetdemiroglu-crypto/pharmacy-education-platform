# Pharmacy Education Platform

An interactive, commercial-grade pharmacy education platform hosting two comprehensive courses:
1. **Course A: Medicinal Chemistry** (`courses/medchem`)
2. **Course B: Pharmacology** (`courses/pharmacology`)

Built with an active learn-by-doing pedagogy inspired by Brilliant (short bite-sized steps, predict-then-reveal interactions, immediate misconception-targeted feedback, 3-tiered hint ladders, worked-example fading, and spaced review).

---

## 🏛️ System Architecture

- **Web Frontend (`apps/web`)**: Vite + React 18 + TypeScript + Tailwind CSS (Single Page Application). Neo-Brutalist design language with 3-4px high-contrast borders (`#000000`), zero-blur hard drop shadows (6px resting / 8px hover), dark mode (Academic Midnight Slate), and full RTL support for Arabic.
- **Component System (`packages/ui`)**: Shared neo-brutalist UI components (Cards, Modals, Sliders, Badges, Paywall, Confidence Gauges, Step Dots).
- **Interactive Widgets (`packages/widgets`)**: Hands-on biophysical simulations grounded in lecture materials:
  - `IonizationChamber` & `IonizationEquilibriumSlider`: Henderson-Hasselbalch $pK_a$ / pH ionization shifts and membrane permeability.
  - `EassonStedmanStage`: 3-point chiral pharmacophore binding demonstrating eutomer vs. distomer affinity.
  - `ReceptorOperationalModel` & `DoseResponseCurve`: Agonist concentration-response curves, competitive vs. non-competitive antagonism shifts, partial agonism.
  - `PkCockpit` & `PkSimulator`: 1-compartment IV bolus and oral pharmacokinetic curves ($C_{max}$, $t_{max}$, $AUC$, clearance, half-life).
  - `ClinicalOrderVerification`: Real-world prescription safety checks (warfarin bridging, simvastatin + clarithromycin CYP3A4 MBI, ciprofloxacin + antacid chelation).
  - `SarExplorer`, `ReceptorLigandMatcher`, `StructureIdentifier`, `MetabolismMap`, `PredictThenReveal`.
- **Platform Core (`packages/platform`)**:
  - Authentication (Firebase Auth with offline preview fallback).
  - Access control (`hasAccess` gating, 7-day single-use free trial, 2 free lessons per module).
  - Leitner Spaced Repetition engine with exam-calibrated backward scheduling.
  - Progress tracking and local caching.
- **Backend & Cloud Functions (`functions`)**: Firebase Cloud Functions v2 (TypeScript) integrating Dodo Payments webhooks with HMAC validation, checkout session creation, trial abuse mitigation, and compliance.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation
```bash
pnpm install
```

### Development
```bash
# Start the web app dev server
pnpm dev

# Build all workspace packages
pnpm build

# Run unit tests across all packages
pnpm test

# Run Playwright E2E tests
pnpm test:e2e

# Run production bundle verification
pnpm test:bundle
```

---

## 🧪 Testing & Verification

- **Unit Tests**: 257 unit tests across 65 test suites (100% passing across `@pharmacy/platform`, `@pharmacy/ui`, `@pharmacy/widgets`, `@pharmacy/web`).
- **End-to-End Tests**: Automated Playwright suite verified on local Brave Browser under both **Shields Default** (strict tracker/fingerprint blocking) and **Shields Down** modes.
- **Accessibility**: 0 axe-core serious or critical accessibility violations, WCAG 2.1 AA / AAA keyboard compliance.

---

## 📄 License & Source Attribution

All educational claims, molecular structures, equations, and pharmacokinetic parameters trace directly to Marmara University Faculty of Pharmacy lecture slide decks located in `/materials`. All instructional diagrams and text are originally synthesized and verified against source references.

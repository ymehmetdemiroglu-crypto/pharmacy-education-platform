---
name: widget-authoring
description: Implements, styles, tests, and documents reusable interactive educational widgets (SAR, PK simulator, dose-response curves, molecular atom selectors) in /packages/widgets.
---

# Widget Authoring Skill

## Purpose
Builds accessible, data-driven interactive components designed for high-comprehension pharmacy education following neo-brutalist aesthetics.

## Widget Engineering Requirements
Each widget package under `/packages/widgets/src/` must contain:
1. `WidgetName.tsx`: React component taking `config: WidgetConfig` and emitting standard events (`onAttempt`, `onHint`, `onCorrect`, `onIncorrect`).
2. `schema.ts`: Zod schema validating the configuration object.
3. `types.ts`: TypeScript interfaces derived via `z.infer<typeof Schema>`.
4. `WidgetName.test.tsx`: Vitest + Testing Library test covering rendering, interactions, keyboard accessibility, and edge configurations.
5. `gallery.demo.ts`: Demo configurations (minimal, standard, edge case) for inclusion in the UI Gallery.

## Widget Catalog
- `SarExplorer`: Interactive substituent toggling on core scaffold with live property readouts (logP, pKa, receptor affinity).
- `StructureIdentifier`: Clickable/tappable 2D chemical structure allowing student to select pharmacophore or functional group atoms.
- `DoseResponseCurve`: Interactive log[Dose] vs % Response curve with draggable EC50, Emax, and antagonist shifts.
- `PkSimulator`: One/two-compartment simulator plotting Cp vs Time with route, clearance, Vd, and dosing frequency inputs.
- `ReceptorLigandMatcher`: Drag-and-drop or tap-to-pair bonding interaction (H-bond, ionic, hydrophobic pocket).
- `MetabolismMap`: Visual molecule with marked metabolic soft spots (CYP3A4, CYP2D6, Phase II conjugation sites).
- `PredictThenReveal`: Two-stage card requiring hypothesis selection before unlocking experimental outcome.

# Phase 11 Validation Strategy: Pillar 3 — Tactile "Çizerek Öğren"

## Test Coverage Requirements

1. **Unit Testing (Vitest)**:
   - `valenceOctetEngine.test.ts`:
     - Texas Carbon rejection when attacking carbonyl without opening pi-bond (`VALENCE_OCTET_VIOLATION`).
     - Carbonyl attack with valid secondary pi-opening arrow (`isValid: true`).
     - Hypervalent Phosphorus $P(V)$ organophosphate attack validation (`isValid: true`).
     - Hypervalent Sulfur $S(VI)$ sulfonamide stability validation (`isValid: true`).
     - Hammett $\Delta pK_a$ calculation with varying $\sigma_x$ parameters.
     - Wildman-Crippen $\Delta \log P$ calculations for all 8 substituents.
   - `TactileArrowCanvas.test.tsx`:
     - Canvas rendering with chemical points and bond targets.
     - Pointer event handlers for drawing curved Bézier arrows.
     - Snap-to-atom and snap-to-bond target calculation.
     - Four-stage worked example fading state transitions (`DEMO` $\to$ `FADED_1` $\to$ `FADED_2` $\to$ `INDEPENDENT`).
   - `SubstituentSnapPalette.test.tsx`:
     - Rendering 8 functional group chips.
     - Snapping substituent onto target position (`ortho`, `meta`, `para`, `amine_n`, `c3_ester`).
     - Updating $\Delta \log P$, $\Delta pK_a$, receptor affinity, and $t_{1/2}$ gauges.
   - `TactileMechanismView.test.tsx`:
     - Mode switching between "Arrow Pushing" and "SAR Substituent Snapping".
     - Socratic misconception feedback display upon chemical errors.

2. **TypeScript Strict Typecheck**:
   - `pnpm -r --workspace-concurrency=1 run typecheck` must pass with 0 errors.

3. **Production Bundle Dev-Notes Audit**:
   - `pnpm --filter @pharmacy/web build` must complete with 0 internal notes or leaked review tags across all chunks.

4. **Playwright UI Verification (Brave Browser)**:
   - Launch Brave Browser on Windows (`C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`).
   - Navigate to `/` and switch to the new `Çizerek Öğren ✍️` workspace.
   - Capture high-resolution visual screenshots:
     1. Mechanism Overview & Challenge Selector
     2. 4-Stage Worked-Example Fading (Demo vs Faded Step)
     3. Arrow Pushing Canvas with Bézier curved electron trajectory
     4. Texas Carbon Octet Violation diagnostic error feedback
     5. Successful mechanism completion with tetrahedral intermediate morph
     6. Substituent Snap Palette with live $\Delta \log P$ and $\Delta pK_a$ meters

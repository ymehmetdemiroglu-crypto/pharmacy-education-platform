# Asset Log: Recreated & Vectorized Pharmaceutical Figures

In strict compliance with **Non-Negotiable Rule 3 (No Verbatim Republishing)**:
1. University lecture slides, textbook scans, and third-party diagrams must **NEVER** be directly embedded or hosted as raster images.
2. All chemical structures must be rendered natively from verified SMILES strings using SmilesDrawer / RDKit.
3. All biochemical pathways, receptor binding diagrams, and pharmacokinetic graphs must be originally drafted in clean, accessible SVG format.
4. Every recreated asset must be logged in this ledger with its source attribution, recreation mechanism, accessibility label, and verification status.

---

## 1. Asset Registry Ledger

| Asset ID | Target Course & Lesson | Source File & Slide | Concept / Figure Description | Vector / Rendering Mode | Authoring Tool / Spec | Verified (Human Signoff) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `mc-asset-001` | MedChem: Bioisosterism | `Biyoizosterizm.pdf` p. 4 | Classical vs Non-Classical Bioisostere classification table & examples | Native SVG Card + SmilesDrawer | Custom React SVG Component | Pending Human Signoff |
| `mc-asset-002` | MedChem: Functional Groups | `Fonksiyonel gruplar.pdf` p. 12 | Carboxylic acid vs Tetrazole bioisosteric replacement | Interactive SmilesDrawer | RDKit Canonical SMILES | Pending Human Signoff |
| `mc-asset-003` | MedChem: Metabolism | `İlaç metabolizması-2026.pdf` p. 8 | Phase I Cytochrome P450 oxidation catalytic cycle | Vector SVG Infographic | Custom React SVG Component | Pending Human Signoff |
| `ph-asset-001` | Pharmacology: Receptor Binding | `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` p. 6 | Chemical bond types & energetic hierarchy in drug-receptor binding | Interactive Neo-Brutalist SVG Chart | Recharts / SVG Primitive | Pending Human Signoff |
| `ph-asset-002` | Pharmacology: Dose-Response | `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` p. 18 | Agonist vs Partial Agonist vs Antagonist dose-response curves | Interactive Simulation Canvas | Recharts DoseResponseCurve | Pending Human Signoff |

---

## 2. Asset Creation Standard Operating Procedure

1. **Extraction**: Identify figure/mechanism in `/materials`. Record source file and exact page.
2. **Chemical Structures**: Extract canonical IUPAC/chemical name. Convert to canonical SMILES. Validate SMILES via RDKit/PubChem. Mark `verified: false`.
3. **Diagrams & Pathways**:
   - Re-draw using Neo-Brutalist visual tokens: 3px solid `#000` strokes, bold flat fills (cream `#FFF8E7`, yellow `#FFD93D`, pink `#FF6B9D`, blue `#4D96FF`, green `#6BCB77`), and `JetBrains Mono` labels.
   - Include explicit ARIA labels and alt-text descriptions for screen readers.
4. **Log Entry**: Append record to Table 1 above prior to publishing the lesson.

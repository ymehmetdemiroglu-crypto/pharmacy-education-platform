# Knowledge Gaps & Unverified Claims Log (docs/gaps.md)

| Claim | Basis | What would verify it | Status |
|---|---|---|---|
| Warfarin Factor VII (t½ ~6h) vs Factor II (t½ ~60–72h) & Factor X (t½ ~36–48h) lag explaining bridging | [SRC: Goodman & Gilman Ch. 34; Katzung Ch. 34] | CHEST 2018 Guidelines & G&G / Katzung | VERIFIED [SRC] |
| (S)-propranolol is eutomer (~100x higher β-blocker affinity) while both enantiomers block Nav1.5 equally | [SRC: materials/medchem/İlaçlarda  İzomeri.pdf; Katzung Ch. 10] | Materials deck Slide 12-18 and Goodman & Gilman | VERIFIED [SRC] |
| Ciprofloxacin + CaCO3 bioavailability reduced by ~40–50% (vs >80% for Al/Mg) | [SRC: Goodman & Gilman Ch. 59; Nix et al. 1989] | Antimicrob Agents Chemother 1989 & FDA ciprofloxacin label | VERIFIED [SRC] |
| Sulfonamide hypersensitivity is predominantly Type IV T-cell mediated via hydroxylamine/nitroso haptens | [MEM] | Review clinical immunology / adverse drug reaction papers (Shear / Pirmohamed) | OPEN |
| Simvastatin 10–12-fold (+1000–1100%) AUC increase with clarithromycin via CYP3A4 MBI | [SRC: Neuvonen et al. 1998; FDA label; G&G Ch. 35] | Clinical pharmacology trial & FDA simvastatin contraindication | VERIFIED [SRC] |
| Human intestinal absorptive surface area is ~30–32 m² (Helander & Fändriks 2014) rather than 200 m² | [SRC: Helander & Fändriks 2014] | Am J Physiol Gastrointest Liver Physiol. 2014 | VERIFIED [SRC] |
| CYP3A4 MBI rate equations: $k_{obs} = \frac{k_{inact} \cdot [I]}{K_I + [I]}$ with $k_{deg}$ enzyme turnover | [MEM] | Standard enzyme kinetics / in vitro-to-in vivo extrapolation (IVIVE) textbooks (e.g., Rowland & Tozer) | OPEN |
| Meropenem extended infusion: $fT_{>MIC}$ optimization vs mixed clinical eradication/mortality outcomes (BLING-III, MERCY) | [MEM] | Check BLING-III (JAMA 2024) and MERCY (JAMA 2023) trial reports | OPEN |
| Dodo Payments MoR fee schedule: 3.5% + $0.30 + cross-border/FX fees; TRY local payment support | [MEM] | Read Dodo Payments documentation via web search / official docs | OPEN |
| Calibrated Leitner threshold R >= 0.85 and backward exam scheduling ($S_{req} = \Delta t / -\ln(R_{target})$) | [TOOL: vitest] | packages/platform/src/spaced_repetition/LeitnerEngine.test.ts (17/17 tests pass) | VERIFIED [TOOL] |
| Clinical Order Verification Station (Ciprofloxacin+CaCO3, Simvastatin+Clarithromycin, Warfarin+Heparin) | [TOOL: vitest] | packages/widgets/src/ClinicalOrderVerification/ClinicalOrderVerification.test.tsx (5/5 tests pass) | VERIFIED [TOOL] |
| Exact contents, slide numbers, drug examples, and equations inside the 8 PDFs in `materials/` | [TOOL: pypdf] | Extracted into docs/materials-text-index.json (267 slides total, 7 distinct decks indexed); spot checked 10 citations | VERIFIED [TOOL] |
| Fictitious slide 34 references in `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` (deck has 33 slides total) | [TOOL: audit] | Replaced with authentic slides 4 & 6 in pharm lesson 2 and slide 33 in medchem lesson 3 | RESOLVED [TOOL] |
| 100% of 264 steps across all 22 lessons possessing step-level physical sources and <= 40 word prompts | [TOOL: python] | Verified across all 22 lesson JSON files in courses/ (264/264 steps compliant) | VERIFIED [TOOL] |

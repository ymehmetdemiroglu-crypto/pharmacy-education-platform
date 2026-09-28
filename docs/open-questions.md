# Open Questions & Source Gap Log

## 1. Governance & Project Owner Decisions Needed (Phase 0 / Phase 1 Gates)

| # | Topic | Question for Project Owner | Context / Recommendation | Status |
|---|---|---|---|---|
| **Q1** | **Staging GCP Project** | Which GCP Project ID should be used for the staging deployment? Active projects under `amlytz2002@gmail.com`: `gen-lang-client-0309233567`, `gen-lang-client-0557264546`, `gen-lang-client-0980959229`, `impressive-nectar-9f4r2`, `scientific-coil-24dh4`, `stunning-tracer-17krv` (or should a clean staging project be designated)? | Recommend using an isolated staging project (e.g. `scientific-coil-24dh4` or dedicated project) to prevent interfering with existing workloads. | **PENDING USER DECISION** |
| **Q2** | **Commercial IP Rights** | Do we have written commercial licensing or authorization to adapt the lecture slide decks in `/materials/`? | All content will be originally re-authored and diagrams recreated in SVG/SMILES, but commercial authorization must be confirmed before production monetization. | **PENDING USER CONFIRMATION** |
| **Q3** | **Primary Language Priority** | Should content be authored Turkish-first, English-first, or synchronously bilingual from Day 1? | Materials are in Turkish; recommending bilingual architecture with Turkish initial content and English parallel terms. | **PENDING USER DECISION** |
| **Q4** | **Pricing Model Selection** | Which pricing model from [`/docs/pricing-analysis.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/pricing-analysis.md) should be adopted? | Recommending Option 1 (Semester & Annual Pass with Turkey PPP at ₺650/mo or ₺2,750/semester). | **PENDING USER DECISION** |
| **Q5** | **Cloud Functions Region** | Which GCP region should host Firebase Cloud Functions? | Recommend `europe-west1` (Belgium) or `europe-west3` (Frankfurt) for optimal latency to Turkey/Europe/Gulf. | **PENDING USER DECISION** |
| **Q6** | **Firebase CLI Authentication** | Firebase CLI is currently unauthenticated (`firebase login:list` reports no authorized account), despite `gcloud` being logged in as `amlytz2002@gmail.com`. How should Firebase CLI authenticate? | Run `firebase login --no-localhost` or generate a CI token to link Firebase CLI with the target GCP staging project. | **PENDING USER ACTION** |
| **Q7** | **Java Runtime Installation** | The Firebase Local Emulator Suite requires Java (JRE/JDK 17+), which is currently absent on this Windows machine. Can we install OpenJDK? | Approve installation of OpenJDK 17 (e.g. `winget install EclipseAdoptium.Temurin.17.JDK`) to enable local Firestore security rules unit tests. | **PENDING USER APPROVAL** |
| **Q8** | **Pharmacology Source Material Scope** | `/materials/pharmacology` currently contains only 2 PDFs (77 pages), one of which is a duplicate of the MedChem metabolism deck. Should user provide additional decks or approve standard pharmacology reference frameworks? | The curriculum requires PK modeling, Autonomic Pharmacology, and Dose-Response curves. Recommend user supply missing decks or approve syllabus extraction based on standard curricula (Katzung / Goodman & Gilman). | **PENDING USER DECISION** |

---

## 2. Content & Source Gap Log (`[NOT IN MATERIALS]`)

| Source File | Page / Section | Missing Fact / Gap Description | Temporary Handling | Resolution Action Required |
|---|---|---|---|---|
| `materials/pharmacology/` | Entire Course B scope | Only 2 decks present (`İlaç metabolizması-2026.pdf` [duplicate of medchem] and `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` [33 pages]). Lacks dedicated decks for Pharmacokinetics (ADME models, Clearance, Vd), Autonomic Pharmacology, and full Dose-Response Hill equations. | Phase 1 extraction will process existing 2 decks; subsequent modules paused until source materials provided. | User to provide additional lecture PDFs or authorize standard curriculum reference synthesis. |

# Open Questions & Source Gap Log (Phase 0 Amendment)

## 1. Governance & Project Owner Decisions Needed (Phase 0 / Phase 1 Gates)

| # | Topic | Question for Project Owner | Context / Recommendation | Status |
|---|---|---|---|---|
| **Q1** | **Staging GCP Project** | Dedicated staging project designated? | Project owner confirmed: Do not reuse `scientific-coil-24dh4`. Dedicated project `pharmacy-platform-staging` with a $25/mo budget alert configured in `docs/deployment-runbook.md`. Billing commands are gated for user execution. | **RESOLVED (Phase 1 Gate)** |
| **Q2** | **Commercial IP Rights** | Written commercial licensing exists for `/materials/`? | Project owner confirmed: No written commercial authorization exists. `/materials/` is strictly private internal reference only. All shipped content must be 100% originally authored de novo. Provenance tracked in `docs/asset-log.md`. | **RESOLVED (Phase 1 Gate)** |
| **Q3** | **Primary Language Priority** | Should content be authored Turkish-first, English-first, or synchronously bilingual from Day 1? | Initial lesson schemas authored with dual terminology (Turkish/English clinical & chemical terms); full bilingual toggle scheduled for Phase 3. | **IN PROGRESS (Bilingual Schema)** |
| **Q4** | **Pricing Model Selection** | Which pricing model should be adopted? | Project owner confirmed: **Option A (Student Value Pass)** locked. Recomputed margins including Dodo fixed fee ($0.30) on TRY/SAR and p90 heavy student Gemini consumption ($0.090/mo total variable). All tiers maintain >90% margin (exceeding 70% floor). Break-even: 6-15 USD subs, 16-36 TRY subs. | **RESOLVED (Option A Locked)** |
| **Q5** | **Cloud Functions Region** | Which GCP region should host Firebase Cloud Functions? | Region `europe-west1` (Belgium) selected for optimal latency to Turkey, Europe, and Gulf regions. | **RESOLVED** |
| **Q6** | **Firebase CLI Authentication** | Firebase CLI authentication in CI/CD and deployment? | Handled via Application Default Credentials (ADC) and CI deployment token per Rule 7 (Zero secrets in repo). | **SCHEDULED FOR PHASE 2/4** |
| **Q7** | **Java Runtime Installation** | Approval to install Java 17 for Firebase Emulators? | Project owner approved: Eclipse Temurin 17 JDK installed and verified for Firebase Local Emulator Suite. | **RESOLVED (Temurin 17 Installed)** |
| **Q8** | **Pharmacology Source Material Scope** | Reference curriculum standard for Pharmacology? | Project owner confirmed: Synthesize reference curriculum structure from Katzung (*Basic & Clinical Pharmacology*) and Goodman & Gilman (*The Pharmacological Basis of Therapeutics*). Anchor on unique 33-page receptor deck (`İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf`). Ingestion pipeline built for future decks. | **RESOLVED (Phase 1 Gate)** |

---

## 2. Content & Source Gap Log (`[NOT IN MATERIALS]`)

| Source File | Page / Section | Missing Fact / Gap Description | Temporary Handling | Resolution Action Required |
|---|---|---|---|---|
| `materials/pharmacology/` | Entire Course B scope | Only 2 decks present (`İlaç metabolizması-2026.pdf` [duplicate of medchem] and `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` [33 pages]). Lacks dedicated decks for Pharmacokinetics (ADME models, Clearance, Vd), Autonomic Pharmacology, and full Dose-Response Hill equations. | Phase 1 extraction will process existing 2 decks; subsequent modules paused until source materials provided. | User to provide additional lecture PDFs or authorize standard curriculum reference synthesis. |

---

## 3. Whiteboard Tutor Pivot (Farmasötik Kimya, exam-prep pilot)

| # | Topic | Question / Gap | Current handling | Needed from |
|---|---|---|---|---|
| **Q9** | **Exam date** | Date of the Farmasötik Kimya midterm is unknown. | Dashboard shows "Sınav tarihini ayarla" until `VITE_MEDCHEM_EXAM_DATE=YYYY-MM-DD` is set. | Owner |
| **Q10** | **Source file location** | The lecture PDF `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` lives under `materials/pharmacology/` (sibling worktree) but is being taught as Farmasötik Kimya. Move to `materials/medchem/`? | Left in place; `.teaching.md` cites it by file name. | Owner |
| **Q11** | **Professor permission** | Pilot shares paraphrased lecture content with the class. Q2 says no written commercial licence exists. Is written permission (even informal e-mail) in hand for the class pilot? | Content is original wording, no slide images; every concept stays `draft` and shows a "Taslak" badge. | Owner / professor |
| **Q12** | **Unverified slide items** | Slide 16 (comparison symbols), slide 27 (charge notation), slide 33 (dibucaine SMILES / region mapping), image-only slides 8 and 18. | `[NOT IN MATERIALS]`: no widget, nothing taught from memory. See *Doğrulama Günlüğü* in `courses/medchem/teaching/hafta-01-reseptor-etkilesimleri.teaching.md`. | Owner: compare with the PDF |
| **Q13** | **Draft → verified sign-off** | All 10 concepts are `draft`. The Edge Function refuses draft concepts unless `ALLOW_DRAFT_CONCEPTS=true`. | Set the flag for the pilot only if you accept the draft risk, or flip `Durum: verified` per concept after review. | Owner |
| **Q14** | **Remote Supabase changes** | Migrations (`supabase/migrations/2026100400*.sql`, enables `vector`), Edge Function deploys, secrets (`OPENROUTER_API_KEY` etc.) and `--apply` seeding were **not** run. | Prepared in repo, untested against a real project. | Owner approval (AGENTS.md rule 9) |
| **Q15** | **Payments after the pilot** | Firebase Functions (incl. Dodo checkout/webhook code) were deleted; code remains in git history, `docs/payments-plan.md` remains. `lib/billing.ts` rejects checkout calls. | Pilot is free (`VITE_FREE_PILOT_MODE`, default on). Port Dodo webhook to a Supabase Edge Function before charging. | Owner |
| **Q16** | **Widgets for the remaining lectures** | Distance/dielectric slider and receptor–ligand matcher do not fit the slide-only content (no numbers on slides). | v1 uses `MultipleChoice` / `PredictThenReveal` only. | Owner (provide next decks) |

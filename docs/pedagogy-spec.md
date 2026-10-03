# Pedagogy Specification: Evidence-Based Learning Design for Pharmacy

## 1. Executive Summary & Vision
This specification establishes the learning science framework for the Pharmacy Education Platform. In pharmaceutical sciences (Medicinal Chemistry and Pharmacology), students encounter high cognitive loads: integrating 2D/3D chemical structures, electron-pushing mechanisms, receptor stereochemistry, and multi-variable pharmacokinetic equations. 

Traditional didactic lectures and textbook reading produce the illusion of competence without deep mental models. Our platform implements an **active, problem-first, interactive learning architecture** inspired by Brilliant's methodology and rigorously grounded in cognitive psychology and pharmacy education literature.

---

## 2. Theoretical Grounding & Design Principles

Every architectural rule in our learning platform is anchored directly in empirical research:

| Learning Science Principle | Landmark Citation / Literature | Platform Operationalization |
| :--- | :--- | :--- |
| **Cognitive Load Theory (CLT)** | Sweller (1988, 2011); Paas et al. (2003) | Minimize extraneous load through minimalist UI (<40 words prose per step). Structure intrinsic load by chunking complex mechanisms into micro-interactions. |
| **Dual Coding Theory & Multimedia Learning** | Paivio (1986); Mayer (2001, 2014) | Combine visual 2D chemical scaffolds with spatial atom selection rather than long text descriptions of functional groups. |
| **Productive Failure & Problem-First** | Kapur (2008, 2016); Loibl et al. (2014) | Every concept starts with an intuitive puzzle or prediction step BEFORE formal theory is introduced. Early failure primes the brain to attend to structural features. |
| **Worked Examples & Backward Fading** | Renkl (2002); Atkinson et al. (2000) | Transition from a fully annotated structure analysis -> partially faded step (student identifies key bond) -> fully independent molecular modification. |
| **Retrieval Practice (Testing Effect)** | Roediger & Karpicke (2006); Karpicke & Blunt (2011) | Low-stakes retrieval occurs at every step. Recalling receptor binding mechanisms strengthens synaptic traces far more than re-reading. |
| **Spaced Repetition & Expanding Intervals** | Ebbinghaus (1885); Cepeda et al. (2006); Pashler et al. (2007) | Every completed lesson dispatches 3 discrete flashcard/retrieval tokens to an automated Leitner spaced-repetition queue. |
| **Interleaving** | Rohrer & Taylor (2007); Kornell & Bjork (2008) | Daily review sessions mix Medicinal Chemistry SAR with Pharmacology receptor dynamics rather than blocking single topics. |
| **Misconception-Targeted Feedback** | Shute (2008); Hattie & Timperley (2007); Kulhavy & Stock (1989) | Distractor options in MCQs and incorrect widget inputs do not say "Incorrect". They diagnose the student's specific false assumption (e.g., confusing basic amine pKa with acidic phenol pKa). |
| **Desirable Difficulties** | Bjork (1994); Bjork & Bjork (2011) | Provide 3-stage hint ladders so students exert effort before receiving answers. Prevent passive skimming. |
| **Mastery Learning** | Bloom (1968); Guskey (2010) | Module advancement requires passing checkpoints at >=80% accuracy. Formative diagnostic tests allow skipping already-mastered concepts. |

---

## 3. End-to-End Learner Journey Workflow

```text
[ Onboarding / Course Selection ]
              │
              ▼
[ Diagnostic Pre-Test (Module Level) ]
      ├── Score >= 85% ──► [ Mark Module Lessons Mastered / Optional Fast-Track ]
      └── Score < 85%  ──► [ Enter Personalized Learning Path ]
                                 │
                                 ▼
                    [ Interactive Lesson Experience ]
                    (12-Stage Anatomy: 8-15 Micro-Steps)
                                 │
                                 ▼
                    [ Lesson Mastery Assessment ]
                    (Recap + Source List + Score)
                                 │
                                 ▼
                    [ Spaced-Review Enqueueing ]
                    (3 Micro-Items pushed to Leitner Queue)
                                 │
                                 ▼
[ Daily Mixed Review ] ◄─────────┴─────────► [ Re-entry Diagnostic (After Inactivity) ]
```

### 3.1 Onboarding & Diagnostic Placement
- Students select course (Medicinal Chemistry, Pharmacology, or Dual Track).
- Before starting a module, an optional **Diagnostic Pre-test** (5–8 rapid items) evaluates prior knowledge. Demonstrating mastery allows the student to bypass introductory lessons while preserving review access.

### 3.2 The Lesson Experience
- Lessons are bite-sized, taking 7–12 minutes to complete.
- Navigation allows review of prior steps, but completed step submissions are locked to preserve diagnostic honesty.
- Hint usage is voluntary but tracked; hints provide scaffolding without penalizing completion.

### 3.3 Mastery & Spaced Review Queue
- Upon completing a lesson, exactly 3 high-yield conceptual items are pushed to the user's personal review queue.
- Items graduate across 5 Leitner boxes:
  - Box 1: 1 day interval
  - Box 2: 3 days interval
  - Box 3: 7 days interval
  - Box 4: 16 days interval
  - Box 5: 35 days interval (Mastered)

### 3.4 Re-entry After Inactivity Gaps
- If a student is inactive for >14 days, the platform presents a gentle 3-step "Memory Reactivation Warmup" drawing from their highest-priority Box 1/2 items before presenting new content.

---

## 4. The 12-Stage Lesson Anatomy

Every lesson across both courses follows a structured pedagogical progression:

| Stage # | Stage Name | Cognitive Purpose | Interaction / Widget Model |
|:---|:---|:---|:---|
| 1 | **The Hook (Problem-First)** | Spark curiosity; create an information gap. | Clinical scenario or mystery: *"Why does adding a single methyl group make this drug 100x more potent?"* |
| 2 | **Prior-Knowledge Activation** | Bridge existing mental models to the new topic. | Rapid low-stakes retrieval: Identify a functional group or receptor type learned previously. |
| 3 | **Concept Chunk 1 (Observation)** | Introduce the foundational chemical/biological variable. | Visual inspection step (e.g., rotating a 2D scaffold or inspecting a baseline dose-response curve). |
| 4 | **Predict-then-Reveal** | Force hypothesis generation; stimulate productive failure. | Student predicts what will happen to drug solubility if nitrogen is protonated, then clicks to reveal experimental pH curve. |
| 5 | **Worked Example (Full Guidance)** | Demonstrate complete expert reasoning path. | Step-by-step walk-through of an SAR optimization or clearance calculation with explicit rationale callouts. |
| 6 | **Faded Example 1 (Partial Guidance)** | Transfer cognitive burden partially to the learner. | Student fills in the intermediate mechanistic step (e.g., identifying the nucleophilic site during CYP oxidation). |
| 7 | **Faded Example 2 (Minimal Guidance)** | Further reduce scaffolding. | Student selects which substituent will preserve receptor hydrogen bonding while reducing renal clearance. |
| 8 | **Contrast Cases (Analogical Comparison)** | Sharpen boundary conditions and prevent overgeneralization. | Side-by-side comparison of two structural isomers (e.g., R- vs S-enantiomer) with differing pharmacological activities. |
| 9 | **Mid-Lesson Checkpoint** | Assess core comprehension before advancing to complexity. | Two-step formative question. Correct -> proceed; Incorrect -> targeted remedy card. |
| 10 | **Misconception Trap** | Expose and neutralize common pharmacy student errors. | Question deliberately designed around a prevalent fallacy (e.g., assuming higher affinity always equals higher efficacy). |
| 11 | **Transfer Challenge** | Apply knowledge to an unfamiliar clinical or chemical scenario. | Realistic clinical vignette or novel drug candidate evaluation requiring synthesis of lesson concepts. |
| 12 | **Recap & Spaced-Review Enqueueing** | Consolidate mental models, show sources, seed future retention. | Summary visual card, citation list, and automatic enrollment of 3 items into spaced repetition. |

---

## 5. Numeric Defaults & Quality Standards

- **Steps per Lesson**: 8 to 15 interactive steps (Target: 10–12).
- **Prose Budget**: Maximum 40 words per interactive step prompt. Maximum 2 dedicated "Read/Recap" cards per lesson (up to 80 words each).
- **Hint Ladder Depth**: Exactly 3 tiers:
  - Hint 1 (The Nudge): Directs attention to the relevant structural feature or variable without giving answers.
  - Hint 2 (The Mechanism): Explains the underlying chemical/physiological rule.
  - Hint 3 (The Solution): Provides the explicit answer with full worked reasoning.
- **Formative Accuracy Benchmark**: >=80% required on checkpoint steps for lesson mastery badge.
- **Review Session Size**: 5 to 8 cards per daily mixed review session (target duration: 3–5 minutes).

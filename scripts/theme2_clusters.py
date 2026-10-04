# Theme 2: Scaffolding, Sequencing & Misconception Deconstruction
# Focus: Worked-example fading, predict-then-reveal, misconception diagnosis, 3-tier hint ladders, contrastive cases, error reframing, cognitive load ceiling.

THEME_2_CLUSTERS = [
    {
        "name": "Predict-Then-Reveal Forced Cognitive Commitment Mechanics",
        "raw_ids": ["COG-003", "TEA-002", "GAM-002", "DAT-015", "ECO-027", "ADV-007"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Forces students to commit to a predicted qualitative outcome (e.g. curve shift, blood pressure deflection, receptor state) via a discrete click or tactile stamp BEFORE revealing the underlying mechanism or curve.",
        "expected_effect": "Induces productive failure, creates an epistemic knowledge gap, and primes the brain for deeper encoding of the corrective explanation."
    },
    {
        "name": "Multi-Stage Backward-Faded Worked Examples (Sweller Schema Transfer)",
        "raw_ids": ["COG-001", "TEA-001", "ADV-016", "DAT-009", "ECO-021"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Transitions through a structured 4-step pedagogical sequence: Step 1 is 100% worked-out, Step 2 requires completing the final step, Step 3 requires completing the middle and final steps, and Step 4 is fully independent problem solving.",
        "expected_effect": "Prevents cognitive overload during initial schema acquisition by systematically transferring load from working memory to long-term memory schemas."
    },
    {
        "name": "Misconception-Targeted Diagnostic Distractors with Zero-Shame Formative Alerts",
        "raw_ids": ["DAT-001", "TEA-008", "ADV-002", "GAM-023", "ECO-012", "ADV-019"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Every multiple-choice distractor is explicitly engineered to diagnose a known, documented 3rd-year pharmacy misconception (e.g. confusing potency with efficacy, confusing alpha-1 with beta-2 vasodilation), triggering an immediate empathetic, non-punitive diagnostic explanation.",
        "expected_effect": "Transforms assessment into a powerful learning event, dismantling stubborn intuitive errors without inducing test anxiety or shame."
    },
    {
        "name": "Scaffolded 3-Tier Hint Ladder (Nudge -> Clue -> Solution)",
        "raw_ids": ["TEA-004", "ADV-005", "GAM-013", "DAT-024", "TEC-034", "ECO-009"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Provides exactly 3 progressive tiers of assistance on challenging problem steps: Tier 1 offers a conceptual nudge; Tier 2 provides an explicit biochemical clue or formula highlight; Tier 3 reveals the complete worked solution with an indexed penalty score.",
        "expected_effect": "Maintains student flow and prevents frustration-induced drop-off while preserving desirable cognitive struggle."
    },
    {
        "name": "Contrastive Case Pair Analysis for Chiral and Bioisosteric Analogs",
        "raw_ids": ["COG-007", "TEA-003", "TEA-032", "DAT-012"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Presents minimally different pairs of molecules side-by-side (e.g. S-ibuprofen vs R-ibuprofen, propranolol vs atenolol, procaine vs procainamide), isolating the single functional atom or stereocenter responsible for pharmacodynamic differences.",
        "expected_effect": "Enhances perceptual discrimination by directing attention to critical diagnostic features rather than superficial molecular similarities."
    },
    {
        "name": "Self-Explanation Prompting During Molecular Bioisosteric Swaps",
        "raw_ids": ["COG-006", "TEA-010", "ADV-065"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Prompts students with targeted sentence starters (e.g., 'Replacing the ester with an amide increases half-life because...') immediately after modifying a functional group, requiring articulation of causal chemistry.",
        "expected_effect": "Forces active schema integration and eliminates superficial rote manipulation of chemical software."
    },
    {
        "name": "Error-Driven Hypercorrection via Baroreceptor Reflex Predictions",
        "raw_ids": ["COG-009", "COG-012", "ADV-055"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Leverages the hypercorrection effect by asking students to predict heart rate changes under norepinephrine infusion (where most erroneously guess tachycardia due to beta-1 stimulation), then immediately demonstrating the overpowering vagal reflex bradycardia.",
        "expected_effect": "Produces durable memory encoding: high-confidence errors corrected immediately exhibit the highest long-term retention rates."
    },
    {
        "name": "Strict 40-Word Cognitive Load Guardrail & Build-Time Linter",
        "raw_ids": ["ADV-011", "TEC-038", "ECO-007", "COG-010"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Enforces a hard limit of <= 40 words per micro-step prompt across all languages via an automated build-time AST linter in CI/CD, guaranteeing that instruction is chunked into atomic bites.",
        "expected_effect": "Eliminates extraneous cognitive load, keeps working memory focused exclusively on the active interaction, and prevents student text fatigue."
    },
    {
        "name": "Concrete-to-Abstract Fading in Pharmacokinetic Clearance Models",
        "raw_ids": ["COG-025", "TEA-025", "TEA-012"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Begins with a physical water tank/sieve analogy to represent renal filtration and hepatic clearance before fading into formal symbolic differential rate equations and clearance parameters.",
        "expected_effect": "Anchors abstract mathematical concepts in grounded physical intuition, preventing rote formula confusion."
    },
    {
        "name": "Worked Example Comparison of Competitive vs Noncompetitive Antagonism",
        "raw_ids": ["TEA-013", "COG-016"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Places fully worked-out step sequences for competitive antagonism (surmountable by increased agonist concentration) alongside noncompetitive antagonism (insurmountable, depressed Emax) on identical Cartesian axes.",
        "expected_effect": "Facilitates analogical alignment and schema abstraction across parallel pharmacological mechanisms."
    },
    {
        "name": "Analogical Enactive-to-Symbolic Bridge for Drug-Receptor Locking",
        "raw_ids": ["TEA-009", "ADV-030"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Employs an intuitive physical lock-and-key / mechanical spring analogy before introducing formal thermodynamic dissociation constants (Kd) and fractional receptor occupancy equations.",
        "expected_effect": "Builds intuitive mental scaffolding that gives immediate physical meaning to quantitative constants."
    },
    {
        "name": "Concept Checkpoint Mastery Gate for Adrenoceptor Subtype Hierarchy",
        "raw_ids": ["TEA-006", "TEA-020"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Requires students to demonstrate 100% accuracy on foundational adrenoceptor signaling branches (Alpha-1/Gq, Alpha-2/Gi, Beta/Gs) before unlocking downstream therapeutic applications (e.g. heart failure, asthma).",
        "expected_effect": "Guarantees prerequisite schema solidity, preventing compounding cognitive confusion in advanced organ system lessons."
    },
    {
        "name": "Signaled Visual Hierarchy for Receptor Subtype Taxonomies",
        "raw_ids": ["COG-027", "ADV-026"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Uses consistent visual signaling tokens (color-coded badge chips: Orange for Pharmacology, Blue for MedChem, Purple for Receptors) and spatial hierarchy to clearly distinguish autonomic subdivisions.",
        "expected_effect": "Directs learner attention to structural organizational principles and reduces extraneous visual search load."
    },
    {
        "name": "Error-Detection in Erroneous Catecholamine Inactivation Pathways",
        "raw_ids": ["TEA-016", "TEA-082"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Presents an intentionally flawed metabolic pathway diagram where MAO and COMT enzymatic cleavage positions are swapped, prompting students to spot and fix the bug.",
        "expected_effect": "Engages critical evaluation and deep structural debugging rather than passive pathway memorization."
    },
    {
        "name": "Boundary Condition Testing for LogP and Membrane Permeation",
        "raw_ids": ["TEA-015", "COG-094"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Pushes students to evaluate extreme hypothetical drug molecules (LogP = -6 vs LogP = +8), predicting why both extremes fail to achieve therapeutic central nervous system bioavailability.",
        "expected_effect": "Illuminates non-linear biological constraints (the parabolic Lipinski absorption curve) through extreme parameter stress-testing."
    },
    {
        "name": "Socratic Misconception Unpacking for Acidic vs Basic Ion Trapping",
        "raw_ids": ["TEA-029", "ADV-043"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Leads students through a 3-question Socratic inquiry sequence examining why urinary alkalinization accelerates aspirin excretion but retards amphetamine excretion, contextualized as clinical overdose triage.",
        "expected_effect": "Guides students to derive the ion-trapping rule from fundamental chemical equilibria rather than memorizing arbitrary clinical rules."
    },
    {
        "name": "Pre-Training Jargon Defusal for Cholinomimetic Pharmacology",
        "raw_ids": ["TEA-019", "ADV-060"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Provides an interactive 2-minute visual briefing demystifying confusing clinical terms ('direct-acting', 'indirect-acting', 'parasympathomimetic', 'cholinomimetic') before presenting drug classification tables.",
        "expected_effect": "Eliminates vocabulary barrier friction for early pharmacy students and levels the playing field for ESL/bilingual learners."
    },
    {
        "name": "Progressive Difficulty Ladder for Chirality and Eutomer Potency",
        "raw_ids": ["TEA-028", "COG-041"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Advances students through graduated chirality problems: from 1 stereocenter identification to R/S CIP priority assignment, ending with enantiomeric eudismic ratio calculations.",
        "expected_effect": "Builds solid spatial stereochemical mastery step-by-step without premature leaps in spatial complexity."
    },
    {
        "name": "Cognitive Dissonance Induction via Clinical Paradoxes",
        "raw_ids": ["COG-096", "TEA-042"],
        "tier": "wild",
        "evidence_tag": "evidence-backed",
        "mechanism": "Confronts students with authentic clinical paradoxes (e.g. beta-blockers with intrinsic sympathomimetic activity causing less resting bradycardia, or low-dose atropine causing paradoxical bradycardia), prompting mechanistic resolution.",
        "expected_effect": "Triggers intellectual curiosity and breaks simplistic 'agonist = up, antagonist = down' mental shortcuts."
    },
    {
        "name": "Socratic Machine Interrogation with Misconception Baits",
        "raw_ids": ["COG-090", "DAT-086"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "An automated conversational prompt engine deliberately introduces common student fallacies during interactive dialogue (e.g. 'Since phenylephrine raises blood pressure, won't it increase cardiac output?'), challenging the student to identify the flaw.",
        "expected_effect": "Trains rigorous clinical argumentation and defense of physiological principles under questioning."
    },
    {
        "name": "Automated Distractor Discrimination & Non-Functional Pruning",
        "raw_ids": ["DAT-020", "DAT-054", "ECO-038"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Continuously computes distractor selection frequencies across student cohorts; automatically flags and regenerates distractors that receive <5% selection rate (non-functional options).",
        "expected_effect": "Maintains a 100% active, highly discriminating distractor pool where every single alternative actively tests a real cognitive trap."
    },
    {
        "name": "Clustered Knowledge Component (KC) Directed Acyclic Graph Scaffolding",
        "raw_ids": ["DAT-022", "DAT-069", "TEC-067"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Maps every curriculum step to a fine-grained directed acyclic graph of knowledge components; dynamically routes students who fail a prerequisite concept to the exact upstream micro-step before allowing resumption.",
        "expected_effect": "Guarantees zero unrepaired conceptual debt as students progress through cumulative pharmacology topics."
    },
    {
        "name": "Adaptive Scaffolding Fading Tuned to Bayesian Slip Probabilities",
        "raw_ids": ["DAT-047", "DAT-024"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Dynamically adjusts the speed of worked-example fading based on real-time Bayesian Knowledge Tracing estimates of student slip (careless error) vs genuine unmastered guess probabilities.",
        "expected_effect": "Prevents premature scaffold removal for uncertain students while rapidly fading scaffolds for fluent learners."
    },
    {
        "name": "Interactive Counterfactual Feedback Simulator for Prescribing Errors",
        "raw_ids": ["DAT-063", "DAT-092", "TEA-087"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "When an incorrect clinical decision is submitted, simulates a counterfactual patient trajectory showing the physiological consequences (e.g. acute bronchospasm from non-selective beta-blocker in an asthmatic patient).",
        "expected_effect": "Transforms abstract errors into vivid, memorable clinical object lessons with clear patient safety stakes."
    },
    {
        "name": "Automated Zod Step Schema & Provenance Validation Gate",
        "raw_ids": ["TEC-014", "ECO-011", "TEC-065"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Runs an automated CI/CD validation gate that validates 100% of curriculum JSON data against strict Zod TypeScript schemas, verifying that every step links directly to verified lecture slide deck and page citations.",
        "expected_effect": "Guarantees absolute scientific rigor and zero hallucinated or unverified pedagogical claims in production."
    },
    {
        "name": "Build-Time LLM Diagnostic Distractor Synthesis with Empirical Verification",
        "raw_ids": ["TEC-031", "TEC-074", "DAT-085"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Uses structured offline LLM prompts grounded in actual classroom misconception taxonomies to draft candidate distractors, passing them through automated psychometric hardness scoring before human sign-off.",
        "expected_effect": "Accelerates curriculum authoring 10x while maintaining strict pedagogical standards and high item discrimination."
    },
    {
        "name": "Crowdsourced Misconception Bounty System",
        "raw_ids": ["ECO-081", "ADV-088"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Allows pharmacy students and teaching assistants to submit tricky misunderstandings they personally experienced; approved misconceptions are converted into diagnostic items, rewarding contributors with study pass credits.",
        "expected_effect": "Builds an ever-evolving, authentic library of real student stumbling blocks at near-zero authoring cost."
    },
    {
        "name": "Reverse-Tutor 'Teach the Virtual Intern' Clinical Case Mode",
        "raw_ids": ["ADV-095", "TEA-083"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Inverts the traditional quiz format by having a virtual pharmacy intern propose an erroneous drug therapy plan; the student must pinpoint the underlying pharmacological error and explain the corrective mechanism.",
        "expected_effect": "Engages higher-order Bloom's taxonomy evaluation skills and consolidates deep conceptual mastery through teaching."
    }
]

print(f"Theme 2 loaded: {len(THEME_2_CLUSTERS)} clusters.")
total_ids = sum(len(c['raw_ids']) for c in THEME_2_CLUSTERS)
print(f"Total raw IDs in Theme 2: {total_ids}")

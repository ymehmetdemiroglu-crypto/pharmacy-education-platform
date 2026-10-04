# Theme 1: Memory, Spacing & Desirable Difficulties
# Focus: Retrieval practice, spaced intervals, interleaving, testing effect, desirable difficulties, generation effect, perceptual disfluency, Leitner/FSRS scheduling, forgetting curve decay.

THEME_1_CLUSTERS = [
    {
        "name": "Ebbinghaus-Pimsleur Half-Life Decay Spaced Retrieval Scheduler",
        "raw_ids": ["COG-005", "TEA-011", "DAT-010", "DAT-033", "TEC-016", "ECO-017", "ADV-009"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Calculates individualized memory half-life decay curves based on past recall latency and error history, scheduling micro-retrieval review intervals on an expanding timeline (Day 1, 3, 7, 14, 30) executed via client-side LocalStorage state machine.",
        "expected_effect": "Maximizes long-term retention of autonomic receptors and drug properties while minimizing redundant reviews and student study time."
    },
    {
        "name": "Interleaved Autonomic Division Retrieval Cards",
        "raw_ids": ["COG-002", "TEA-007", "DAT-029"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Randomly alternates diagnostic flashcards between sympathetic (adrenergic) and parasympathetic (cholinergic) target organ responses rather than presenting blocked single-system lists.",
        "expected_effect": "Forces discriminative contrastive processing between autonomic divisions, eliminating reflexive cue confusion and superficial pattern matching."
    },
    {
        "name": "Generation Effect Incomplete Receptor Signaling Cascades",
        "raw_ids": ["COG-008", "TEA-010", "TEA-030"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Presents G-protein signaling cascades (Gs, Gi, Gq) with key downstream second-messenger nodes omitted (e.g. adenylyl cyclase, IP3/DAG, protein kinase A), requiring learners to actively generate the missing pathway link before feedback.",
        "expected_effect": "Strengthens semantic neural pathways and biochemical causal reasoning compared to passive diagram inspection."
    },
    {
        "name": "Delayed Feedback on Complex Pharmacokinetic Visual Interpretations",
        "raw_ids": ["COG-015", "TEA-023"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Withholds instantaneous correct/incorrect validation until the student completes an entire 3-step semi-log dose-response or clearance sequence, allowing self-monitoring before reveal.",
        "expected_effect": "Fosters deeper metacognitive reflection and prevents premature guessing induced by instant reactive button feedback."
    },
    {
        "name": "Free-Recall Retrieval Dump Prior to Toxidrome Syndrome Identification",
        "raw_ids": ["COG-018", "COG-026", "ADV-040"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Prompts students to type or sketch all recalled cholinergic (SLUDGEM) or anticholinergic symptoms into an ephemeral scratchpad canvas before viewing structured multiple-choice recognition options.",
        "expected_effect": "Engages high-effort retrieval production, immunizing learners against the recognition-illusion trap on emergency board exam questions."
    },
    {
        "name": "Distributed Spaced Practice for Lineweaver-Burk and Kinetic Plots",
        "raw_ids": ["COG-023", "TEA-021"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Injects Lineweaver-Burk and Michaelis-Menten kinetic calculation cards at progressively expanding difficulty gaps across weeks rather than in a single isolated enzyme kinetics module.",
        "expected_effect": "Prevents catastrophic formula decay and solidifies reciprocal slope and intercept interpretation skills."
    },
    {
        "name": "Test-Potentiated Learning in Catecholamine Transporter Kinetics",
        "raw_ids": ["COG-024", "TEA-026"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Administers a low-stakes, non-penalized pre-test on NET, DAT, and VMAT transporter mechanics before presenting instructional slides on reuptake inhibitor pharmacology.",
        "expected_effect": "Primes curiosity and selective visual attention, enhancing encoding efficiency during subsequent structural instruction."
    },
    {
        "name": "Varied Context Retrieval for Muscarinic and Adrenergic Toxicity",
        "raw_ids": ["COG-011", "ADV-025"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Tests muscarinic antagonist toxicity across varied clinical scenarios (e.g. pediatric accidental ingestion, ophthalmologic overdose, elderly polypharmacy) with user-selectable session lengths.",
        "expected_effect": "Decontextualizes toxicological schemas from a single presentation, promoting robust clinical transfer."
    },
    {
        "name": "Interleaved Calculation Tasks for Acidic vs. Basic Drug Renal Clearance",
        "raw_ids": ["COG-028", "TEA-041"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Intermixes Henderson-Hasselbalch renal excretion calculation problems between weak acids (aspirin, phenobarbital) and weak bases (amphetamines), requiring learners to determine the ionization direction before calculating clearance.",
        "expected_effect": "Eliminates algorithmic rote formula application by forcing deep structural discrimination of pH-pKa relationships."
    },
    {
        "name": "Delayed Judgments of Learning (JOL) on Autonomic Receptors",
        "raw_ids": ["COG-029", "DAT-021"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Prompts learners to rate their projected 7-day recall confidence 10 minutes after completing receptor subtype training rather than immediately upon completion, tracking Expected Calibration Error.",
        "expected_effect": "Bypasses short-term working memory fluency illusions, aligning subjective confidence with true durable storage strength."
    },
    {
        "name": "Subgoal-Labeled Retrieval Pathways for AChE Inhibitors",
        "raw_ids": ["COG-014", "COG-030"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Structures AChE inhibitor mechanism recall into explicitly labeled subgoals (1. Nucleophilic Serine Attack, 2. Carbamylation/Phosphorylation, 3. Hydrolytic Regeneration or Aging).",
        "expected_effect": "Organizes procedural chemical knowledge into coherent hierarchical schemas, reducing retrieval interference during exam stress."
    },
    {
        "name": "Metacognitive Confidence Wager & Decoupling Game",
        "raw_ids": ["COG-085", "COG-098", "DAT-007"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Enables learners to place asymmetric confidence bets or points on their pharmacological diagnostic predictions, rewarding calibrated uncertainty and penalizing confident misconceptions.",
        "expected_effect": "Destroys false confidence (unconscious incompetence) and trains metacognitive humility on narrow therapeutic index drug decisions."
    },
    {
        "name": "Intentional Perceptual Disfluency Mode for SAR Visual Inspection",
        "raw_ids": ["COG-082", "ADV-008"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Provides an optional study mode that renders chemical structures with slight perceptual disfluency (monospaced stylized skeleton bonds, rotated angles), forcing active deliberate visual inspection over automatic skimming.",
        "expected_effect": "Prevents lazy visual glance-skimming and deepens analytical focus on stereocenters and heteroatom substitutions."
    },
    {
        "name": "Rapid-Fire Perceptual Learning Module (PLM) for Chemical Scaffolds",
        "raw_ids": ["COG-087", "GAM-084"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Presents split-second 500ms flashcards of adrenergic vs cholinergic scaffolds, training intuitive perceptual chunking and visual feature extraction under time pressure.",
        "expected_effect": "Builds expert-like automaticity in recognizing core heterocyclic drug pharmacophores."
    },
    {
        "name": "Restricted-Vocabulary 'Taboo' Self-Explanation Retrieval Challenge",
        "raw_ids": ["COG-095", "ADV-095"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Challenges students to explain a drug's mechanism of action (e.g. atropine, propranolol) without using 3 banned technical buzzwords (e.g. 'antagonist', 'blocker', 'beta'), forcing first-principles physiological translation.",
        "expected_effect": "Exposes superficial memorization of textbook jargon and forces genuine conceptual understanding."
    },
    {
        "name": "Adaptive Flashcard Expansion on Near-Threshold Latent Mastery",
        "raw_ids": ["DAT-053", "DAT-064", "TEC-054"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Automatically splits a generalized flashcard into 3 micro-variant cards whenever a student's latent knowledge estimate hovers near borderline mastery (0.45 - 0.55), querying subtle edge cases via a client B-tree index.",
        "expected_effect": "Precisely deconstructs fragile understanding at the exact boundary of mastery without cluttering mastered items."
    },
    {
        "name": "Multi-Objective 15-Minute Micro-Study Session Optimizer",
        "raw_ids": ["DAT-056", "DAT-071", "ADV-075"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Generates a daily 15-minute high-yield practice queue that mathematically balances urgent forgetting curve retrievable items, prerequisite knowledge debt, and upcoming exam module priorities.",
        "expected_effect": "Maximizes memory consolidation yield per minute for busy pharmacy students commuting or on clinical rotations."
    },
    {
        "name": "Predictive Retention Decay Alarms Before Clinical Rotations",
        "raw_ids": ["DAT-059", "DAT-080"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Calculates projected retention decay for high-risk clinical calculations (e.g. aminoglycoside creatinine clearance, vancomycin peak/trough) and dispatches gentle review prompts 14 days before clinical hospital rotations.",
        "expected_effect": "Protects patients and students from acute knowledge loss in transition from didactic classroom to clinical wards."
    },
    {
        "name": "Client-Side Anki Deck Export and Portable Leitner Sync",
        "raw_ids": ["ECO-035", "ECO-065", "ADV-057"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Allows one-click client-side export of personalized missed-misconception cards to standard Anki (.apkg) decks with pre-configured FSRS intervals, paired with post-trial read-only review access.",
        "expected_effect": "Provides zero-lock-in student peace of mind and preserves long-term review access even when subscription pauses."
    },
    {
        "name": "Lightweight In-Memory Question Shuffler with Seeded Spacing",
        "raw_ids": ["ECO-045", "TEC-051"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Executes client-side deterministic seeded shuffling of retrieval items and distractors without server round-trips, ensuring zero bandwidth cost and consistent non-repeat review cycles.",
        "expected_effect": "Eliminates server latency during rapid review sprints and ensures fair, reproducible question permutations."
    },
    {
        "name": "De-Rendering Blind Chemical Structure Reconstruction Challenge",
        "raw_ids": ["COG-091", "TEA-085"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Hides the chemical structure of a known drug and gives only its pharmacological profile, asking students to select or sketch the minimal pharmacophoric functional groups required.",
        "expected_effect": "Builds robust bidirectional mental models linking chemical structure directly to pharmacodynamic function."
    },
    {
        "name": "Dynamic Tachyphylaxis Sudden-Death Endurance Retrieval Gauntlet",
        "raw_ids": ["GAM-094", "TEA-075"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Simulates acute receptor desensitization during a rapid-fire review arena: each hesitation or error reduces the virtual receptor pool, demanding faster, error-free recall to maintain pharmacological tone.",
        "expected_effect": "Develops rapid stress-resilient diagnostic retrieval for high-acuity pharmacological emergencies."
    },
    {
        "name": "Offline PDF High-Yield Review Sheet Generator with QR Links",
        "raw_ids": ["ADV-076", "ECO-046"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Compiles the student's personal flagged misconceptions and core drug comparison tables into a lightweight, printable PDF cheat sheet containing QR codes back to interactive widgets.",
        "expected_effect": "Supports commute studying and exam-morning physical paper review with zero battery or connectivity concerns."
    }
]

print(f"Theme 1 loaded: {len(THEME_1_CLUSTERS)} clusters.")
total_ids = sum(len(c['raw_ids']) for c in THEME_1_CLUSTERS)
print(f"Total raw IDs in Theme 1: {total_ids}")

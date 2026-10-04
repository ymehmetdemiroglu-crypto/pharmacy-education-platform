# Theme 5: Diagnostic Assessment, Psychometrics & Learning Analytics
# Focus: Item Response Theory (IRT 2PL) & Computerized Adaptive Testing (CAT), Bayesian Knowledge Tracing (BKT), confidence-accuracy calibration matrix, Brier scores, rapid guessing detection (Wise-Kong), item discrimination index, CUSUM drift detection, Angoff standard setting, DINA cognitive diagnosis, LASA drug interference, licensure exam passing probability forecasting.

THEME_5_CLUSTERS = [
    {
        "name": "2-Parameter Logistic (2PL) Computerized Adaptive Testing (CAT) Engine",
        "raw_ids": ["DAT-003", "DAT-038", "DAT-062"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Selects diagnostic questions dynamically by evaluating each candidate item's item information function at the student's current latent ability estimate (theta), maximizing measurement precision with minimal question burden.",
        "expected_effect": "Cuts diagnostic assessment time by 50% while increasing diagnostic measurement reliability for licensure readiness."
    },
    {
        "name": "Two-Dimensional Confidence-Accuracy Calibration Matrix & Brier Tracking",
        "raw_ids": ["DAT-002", "DAT-011", "DAT-050", "COG-013"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Maps every response into a 2x2 matrix: [High Confidence + Correct = Mastery], [Low Confidence + Correct = Lucky Guess], [Low Confidence + Incorrect = Knowledge Deficit], [High Confidence + Incorrect = Dangerous Misconception], tracking aggregate Brier calibration scores.",
        "expected_effect": "Pinpoints hazardous misconceptions where students feel falsely confident, prioritizing them for aggressive cognitive remediation."
    },
    {
        "name": "Real-Time Client-Side Bayesian Knowledge Tracing (BKT)",
        "raw_ids": ["DAT-031", "DAT-035", "DAT-041", "DAT-093"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Executes local BKT probability updates on device after every step (tracking latent skill mastery, transition, slip, and guess parameters) without transmitting sensitive individual response streams to a cloud database.",
        "expected_effect": "Enables instantaneous adaptive pathway adjustments and zero-latency skill updates with complete student data privacy."
    },
    {
        "name": "Wise-Kong Response Time Thresholding for Rapid Guessing Detection",
        "raw_ids": ["DAT-006", "DAT-025", "DAT-067"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Applies normative response time thresholding (<10% of median item dwell time) to flag disengaged rapid guessing; disallows progression or mastery credit when responses occur faster than physiological reading speed.",
        "expected_effect": "Dismantles mindless button mashing and ensures that recorded learning gains represent genuine cognitive effort."
    },
    {
        "name": "Item Discrimination Index & Distractor Efficiency Telemetry",
        "raw_ids": ["DAT-005", "DAT-019", "DAT-073"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Continuously computes point-biserial correlations (r_pbis) and distractor choice distributions across cohort attempts, alerting curriculum authors if a question fails to distinguish between high- and low-performing students.",
        "expected_effect": "Guarantees that test questions remain psychometrically rigorous, valid, and free of ambiguous phrasing."
    },
    {
        "name": "Cumulative Mastery Gate via Wald Sequential Probability Ratio Test (SPRT)",
        "raw_ids": ["DAT-008", "DAT-030"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Uses Wald SPRT to decide with mathematical certainty (alpha = 0.05, beta = 0.05) whether a student has crossed the mastery threshold for a core pharmacological skill, exiting the quiz as soon as statistical certainty is achieved.",
        "expected_effect": "Prevents over-testing high performers while ensuring struggling students receive sufficient practice before promotion."
    },
    {
        "name": "Differential Item Functioning (DIF) Auditing for Bilingual EN/TR Curricula",
        "raw_ids": ["DAT-013", "DAT-065", "TEC-057"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Uses Mantel-Haenszel statistics to test whether translated Turkish questions behave differently from English source items for students of matched ability, flagging translation artifacts or cultural idiom skew.",
        "expected_effect": "Guarantees 100% conceptual and difficulty parity between the English and Turkish curricula."
    },
    {
        "name": "Deterministic Input, Noisy And Gate (DINA) Cognitive Diagnosis for Bioisosterism",
        "raw_ids": ["DAT-014", "DAT-057"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Models multi-step bioisosteric problem solving as a latent attribute matrix (Q-matrix: H-bonding, lipophilicity, steric bulk, metabolic stability), identifying precisely which chemical attribute caused an incorrect synthesis step.",
        "expected_effect": "Pinpoints the exact chemical principle a student misunderstands rather than assigning a vague overall failure mark."
    },
    {
        "name": "Cumulative Sum (CUSUM) Item Drift Detection on Cohort Telemetry",
        "raw_ids": ["DAT-016", "DAT-044"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Monitors longitudinal item performance via CUSUM control charts, detecting when an item's difficulty changes over time (e.g. due to an unintended lecture curriculum update, software UI change, or leak).",
        "expected_effect": "Provides real-time quality control for the integrity of the question bank over academic semesters."
    },
    {
        "name": "Modified Angoff Standard Setting for Licensure Readiness Benchmarks",
        "raw_ids": ["DAT-017", "DAT-066", "DAT-083"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Calibrates passing thresholds against expert-derived Angoff benchmarks for minimally competent licensure candidates, forecasting real-time NAPLEX and Turkish EUS passing probabilities with confidence intervals.",
        "expected_effect": "Gives students an objective, reliable index of board exam readiness rather than an arbitrary course grade."
    },
    {
        "name": "Cross-Module Misconception Co-Occurrence Graphing & Centrality Scoring",
        "raw_ids": ["DAT-032", "DAT-051", "DAT-075"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Builds a knowledge graph mapping which misconceptions frequently occur together across students, using network centrality algorithms to identify 'linchpin' misconceptions that unlock multiple downstream topics once repaired.",
        "expected_effect": "Directs student remediation time to the highest-leverage conceptual bottlenecks in the entire curriculum."
    },
    {
        "name": "Dwell-Time Anomaly & Micro-Hesitation Telemetry on SMILES Molecule Viewers",
        "raw_ids": ["DAT-034", "DAT-040", "DAT-081"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Tracks hover pause latencies and drag-and-drop cursor trajectories on interactive chemical structures, detecting hesitation on specific functional groups (e.g. ester vs amide linkages) as stealth indicators of cognitive ambiguity.",
        "expected_effect": "Diagnoses conceptual uncertainty non-intrusively before a student even submits an incorrect answer."
    },
    {
        "name": "Continuous Cognitive Load Telemetry via Interaction Hesitation Index",
        "raw_ids": ["DAT-043", "DAT-061", "DAT-077"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Computes a rolling Cognitive Load Index by combining re-reading scroll events, touch jitter entropy, and response latency spikes, automatically triggering restorative pacing prompts when load spikes.",
        "expected_effect": "Prevents catastrophic cognitive overload and mental exhaustion during difficult pharmacokinetic derivations."
    },
    {
        "name": "Post-Error Slowing (PES) Telemetry as Reflective Metacognition Metric",
        "raw_ids": ["DAT-052", "DAT-100"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Measures the post-error slowing ratio (the latency increase on the subsequent step following an error); distinguishes reflective, metacognitive students from impulsive, unreflective guessers.",
        "expected_effect": "Identifies students who need training in deliberate self-monitoring and reflective clinical decision-making."
    },
    {
        "name": "Look-Alike Sound-Alike (LASA) Drug Inter-Question Interference Metric",
        "raw_ids": ["DAT-070", "DAT-042"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Calculates semantic and phonological cross-talk confusion matrices between look-alike sound-alike drugs (e.g. hydralazine vs hydroxyzine, clonidine vs clonazepam), inserting targeted discrimination probes.",
        "expected_effect": "Prevents dangerous prescription medication errors in high-stakes clinical practice."
    },
    {
        "name": "Synthetic Cohort Twin Simulation for Counterfactual Learning Trajectories",
        "raw_ids": ["DAT-082", "DAT-094"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Simulates thousands of virtual student paths through the curriculum to evaluate how different scaffolding fading rates or hint policies affect long-term retention before rolling changes out to live students.",
        "expected_effect": "Allows safe in silico optimization of pedagogical interventions without risking student learning outcomes."
    },
    {
        "name": "Dynamic Difficulty Adjustment (DDA) via Keystroke & Jitter Entropy",
        "raw_ids": ["DAT-084", "DAT-088"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Feeds touchscreen micro-jitter and keystroke entropy into a client-side reinforcement learning model that dynamically throttles problem difficulty and hint availability to maintain optimal flow state.",
        "expected_effect": "Eliminates both boredom from overly easy questions and anxiety from overly punishing problem sets."
    },
    {
        "name": "Federated Client-Side Differential Privacy Psychometrics",
        "raw_ids": ["DAT-098", "TEC-096"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Aggregates item difficulty calibrations and misconception frequency vectors across pharmacy schools using local differential privacy noise injection, enabling cross-institution psychometric benchmarking with zero raw student data sharing.",
        "expected_effect": "Allows inter-university research and normative benchmarking while adhering to strict student privacy regulations."
    }
]

print(f"Theme 5 loaded: {len(THEME_5_CLUSTERS)} clusters.")
total_ids = sum(len(c['raw_ids']) for c in THEME_5_CLUSTERS)
print(f"Total raw IDs in Theme 5: {total_ids}")

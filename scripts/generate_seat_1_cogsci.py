"""
Script to generate the complete 100-idea pool for Seat 1: Cognitive Scientist.
Generates:
- 30 Proven / Conventional ideas (COG-001 to COG-030)
- 50 Adjacent ideas (COG-031 to COG-080)
- 20 Wild ideas (COG-081 to COG-100)
Validates all constraints, counts, syntax, and schema before saving to docs/council/seat_1_cognitive_scientist.json.
"""

import json
from pathlib import Path

proven_ideas = [
    {
        "id": "COG-001",
        "name": "Backward-Faded Worked Examples in Acetylcholine Esterase Hydrolysis",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "In a 4-step AChE catalytic walkthrough (catalytic triad Ser203, His447, Glu334 attack, tetrahedral intermediate, ester cleavage, deacetylation), step 1 is fully worked, step 2 requires completing the intermediate, step 3 requires drawing the nucleophilic attack, and step 4 requires autonomous generation",
        "expected_effect": "Prevents cognitive overload during initial schema acquisition by systematically fading instructional guidance as expertise increases (Sweller & Renkl worked-example effect)"
    },
    {
        "id": "COG-002",
        "name": "Interleaved Retrieval of Sympathomimetic vs. Parasympathomimetic Organ Responses",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Randomly alternate diagnostic quiz cards between adrenergic (mydriasis, bronchodilation, tachycardia) and cholinergic (miosis, bronchoconstriction, bradycardia) clinical scenarios rather than blocking by autonomic branch",
        "expected_effect": "Forces discriminative contrastive processing between autonomic divisions and eliminates spurious block-level context cues (Rohrer & Taylor interleaving effect)"
    },
    {
        "id": "COG-003",
        "name": "Pre-Testing Prior to Dose-Response Curve Exposition",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Require learners to predict whether a competitive antagonist shifts the EC50 rightward or decreases the Emax before showing the log concentration-response curve",
        "expected_effect": "Activates prior physiological knowledge schemas and primes selective visual attention to curve inflection points upon revelation (Richland, Kornell & Kao pre-testing effect)"
    },
    {
        "id": "COG-004",
        "name": "Dual-Modality Co-Location in SMILES to Pharmacophore Mapping",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Render pharmacophoric labels (e.g., quaternary amine cationic head, ester dipole) directly superimposed onto the 2D SVG molecular structure rather than in an adjacent text legend",
        "expected_effect": "Eliminates split-attention visual saccades, freeing working memory capacity for chemical property encoding (Sweller & Mayer split-attention principle)"
    },
    {
        "id": "COG-005",
        "name": "Expanding-Interval Spaced Retrieval for Autonomic Receptor Subtypes",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Schedule automated retrieval prompts for M1-M5 and Alpha-1, Alpha-2, Beta-1, Beta-2 G-protein coupling (Gq, Gi, Gs) at expanding intervals of 15 minutes, 1 day, 3 days, and 7 days",
        "expected_effect": "Strengthens long-term cortical storage strength and retrieval accessibility while dramatically attenuating forgetting curve decay (Cepeda et al. spacing effect)"
    },
    {
        "id": "COG-006",
        "name": "Self-Explanation Prompting During Bioisosteric Replacement",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Pause learners after presenting procaine versus procainamide with a mandatory prompt: 'Explain in one sentence why replacing an ester with an amide increases resistance to plasma pseudocholinesterase'",
        "expected_effect": "Triggers generative cognitive processing and surfaces latent gaps in the learner's mental model of amidase versus esterase enzymatic kinetics (Chi et al. self-explanation effect)"
    },
    {
        "id": "COG-007",
        "name": "Contrastive Case Pair Analysis for Chiral Drug Eutomers",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Present (R)-norepinephrine and (S)-norepinephrine side-by-side in synchronized 3D views, visually highlighting the steric clash of the (S)-distomer with the adrenergic receptor pocket",
        "expected_effect": "Focuses focal visual attention onto critical discriminatory stereochemical features rather than superficial molecular similarities (Bransford & Schwartz contrastive cases)"
    },
    {
        "id": "COG-008",
        "name": "Generation Effect via Incomplete Receptor Cascade Diagrams",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Present an incomplete Gq intracellular signaling diagram (PLC-beta -> [?] -> IP3 + DAG -> Ca2+ release) and require learners to select the missing PIP2 substrate from memory rather than passive inspection",
        "expected_effect": "Produces stronger episodic and semantic memory traces compared to passive reading through effortful mental generation (Slamecka & Graf generation effect)"
    },
    {
        "id": "COG-009",
        "name": "Error-Driven Hypercorrection in Baroreceptor Reflex Predictions",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Solicit a high-confidence prediction on whether IV phenylephrine increases or decreases heart rate before revealing the reflex parasympathetic bradycardia compensation",
        "expected_effect": "High-confidence errors provoke an acute orienting response and deep cognitive re-encoding, permanently overwriting the intuitive misconception (Butterfield & Metcalfe hypercorrection effect)"
    },
    {
        "id": "COG-010",
        "name": "Segmented Micro-Steps for Organophosphate Aging Chemistry",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Deconstruct the mechanism of sarin AChE aging (nucleophilic Ser phosphorylation, transition state, alkyl-oxygen bond cleavage, refractory monoalkylphospho-enzyme) into four isolated 35-word sequential steps",
        "expected_effect": "Keeps transient chemical transition states within the 4-item working memory capacity ceiling, preventing cognitive overload (Sweller segmenting principle)"
    },
    {
        "id": "COG-011",
        "name": "Varied Context Retrieval for Muscarinic Antagonist Toxicity",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Test atropine toxic symptoms (anticholinergic toxidrome) across three varied scenario vignettes: belladonna berry ingestion, jimsonweed tea overdose, and psychiatric drug interaction",
        "expected_effect": "Dismantles brittle context-dependent retrieval and forms generalized, abstract diagnostic schemas (Bjork & Bjork contextual variation)"
    },
    {
        "id": "COG-012",
        "name": "Modality Effect Optimization in Cardiac Autonomic Innervation",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Pair dynamic visual vector animations of SA node action potential depolarization with concise synchronized audio narration rather than on-screen paragraph text",
        "expected_effect": "Expands effective working memory capacity across phonological and visuospatial sketchpad subsystems simultaneously (Mayer & Moreno dual-processing modality effect)"
    },
    {
        "id": "COG-013",
        "name": "Metacognitive Calibration Prompts Prior to SAR Predictions",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Ask learners to rate their confidence (0-100%) in predicting nicotinic versus muscarinic selectivity for carbamylcholine before revealing experimental receptor binding data",
        "expected_effect": "Exposes the illusion of explanatory depth, calibrating metacognitive self-assessment accuracy and sharpening post-feedback attention (Koriat metacognitive monitoring)"
    },
    {
        "id": "COG-014",
        "name": "Subgoal Labeling in Catecholamine Biosynthesis Sequences",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Visually cluster and explicitly label the functional stages of epinephrine synthesis: 'Step 1: Ring Hydroxylation (Rate-Limiting)', 'Step 2: Decarboxylation', 'Step 3: Side-Chain Hydroxylation', and 'Step 4: N-Methylation'",
        "expected_effect": "Organizes procedural biochemical steps into reusable hierarchical schemas, improving transfer to novel metabolic pathways (Catrambone subgoal learning)"
    },
    {
        "id": "COG-015",
        "name": "Feedback Timing Delay on Log-Dose Curve Interpretations",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Withhold explanatory feedback on Schild regression slope calculations until the student has completed a 3-problem diagnostic battery, rather than showing immediate answers after each step",
        "expected_effect": "Prevents superficial feedback dependency and encourages autonomous internal consistency verification (Kulik & Kulik delay retention effect)"
    },
    {
        "id": "COG-016",
        "name": "Worked-Example to Problem Matching in pKa Ionization Calculations",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Provide two worked Henderson-Hasselbalch solutions for weak acids (aspirin in stomach pH 1.5 vs intestine pH 6.8), then require learners to pair a novel unworked drug problem (phenobarbital) with its structural calculation twin",
        "expected_effect": "Promotes deep structural schema abstraction over superficial algorithmic number plugging (Renkl example-problem matching)"
    },
    {
        "id": "COG-017",
        "name": "Adaptive Expertise Reversal in Adrenergic Pharmacophore Training",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Automatically strip color-coded pharmacophore scaffolding (cationic center, aromatic ring, beta-hydroxyl) once a learner demonstrates 3 consecutive accurate beta-blocker classifications",
        "expected_effect": "Eliminates instructional redundancy that impairs processing efficiency in learners with maturing domain schemas (Kalyuga expertise reversal effect)"
    },
    {
        "id": "COG-018",
        "name": "Free-Recall Retrieval Dump Prior to SLUDGEM Toxidrome Recognition",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Prompt learners to type all physiological manifestations of cholinergic toxidrome from memory on a blank screen before showing structured multiple-choice recognition options",
        "expected_effect": "Deepens retrieval pathways and exposes specific autonomic target organ omissions far more effectively than passive recognition (Karpicke free recall testing effect)"
    },
    {
        "id": "COG-019",
        "name": "Progressive Complexity Scaffolding in Pharmacokinetic Clearance",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Sequence PK clearance instruction strictly across 3 stages: single-compartment IV bolus elimination first, then oral absorption kinetics (ka), and finally multi-compartment non-linear saturation kinetics",
        "expected_effect": "Maintains intrinsic cognitive load within working memory limits while establishing solid prerequisite baseline schemas (van Merriënboer 4C/ID scaffolding)"
    },
    {
        "id": "COG-020",
        "name": "Dual-Coding of Receptor Affinity and Dissociation Constants",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Display numerical Kd values alongside a synchronized dynamic SVG bar showing occupied vs unoccupied receptor fractions and atomic electrostatic contact pins",
        "expected_effect": "Creates dual verbal-symbolic and nonverbal-spatial mental representations that facilitate associative cross-modal retrieval (Paivio dual coding theory)"
    },
    {
        "id": "COG-021",
        "name": "Productive Failure in Designing a Selective Beta-2 Agonist",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Challenge learners to modify epinephrine's structure to minimize cardiac beta-1 tachycardia prior to teaching the bulky N-tert-butyl substitution (albuterol/salbutamol)",
        "expected_effect": "Illuminates structural mechanistic challenges and prepares cognitive schemas to encode the formal SAR rationale with high receptivity (Kapur productive failure)"
    },
    {
        "id": "COG-022",
        "name": "Isolated-Elements First Presentation in Ganglionic Transmission",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Teach the isolated biophysics of nicotinic NN pentameric ligand-gated ion channels and hexamethonium blockade before introducing dual-innervated autonomic organ dominance",
        "expected_effect": "Reduces element interactivity during initial encoding, preventing working memory exhaustion before system integration (Pollock, Chandler & Sweller isolated-elements effect)"
    },
    {
        "id": "COG-023",
        "name": "Distributed Spaced Practice in Lineweaver-Burk Kinetic Plots",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Distribute 6 practice problems comparing competitive and non-competitive enzyme inhibition across three separate 48-hour spaced sessions rather than a single massed study block",
        "expected_effect": "Engages memory trace reactivation and consolidation, yielding superior 30-day retention of slope (Km/Vmax) and intercept transformations (Dempster spacing effect)"
    },
    {
        "id": "COG-024",
        "name": "Test-Potentiated Learning in Catecholamine Reuptake Mechanisms",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Administer a 2-item diagnostic quiz on NET and DAT transporter localization immediately prior to introducing cocaine and methylphenidate pharmacology",
        "expected_effect": "Primes focused attentional encoding during subsequent instructional text by highlighting critical knowledge boundaries (Arnold & McDermott test-potentiated learning)"
    },
    {
        "id": "COG-025",
        "name": "Concrete-to-Abstract Fading in Beta-Arrestin Desensitization",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Depict G-protein-coupled receptor kinase (GRK) phosphorylation and beta-arrestin binding using anatomical cell membrane illustrations first, fading across 4 steps into abstract 2-state kinetic graphs",
        "expected_effect": "Grounds concrete physical intuitions before transitioning cognitive schemas to transferrable abstract mathematical representations (Goldstone & Son concretion fading)"
    },
    {
        "id": "COG-026",
        "name": "Retrieval-Induced Facilitation of Antidote Mechanisms",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Prompt active retrieval of atropine's muscarinic receptor competitive blockade before introducing pralidoxime's catalytic nucleophilic reactivation of phosphorylated acetylcholinesterase",
        "expected_effect": "Activating the primary symptom-relief antidote schema creates an associative hook that accelerates encoding of complementary causal antidote pathways (Chan, McDermott & Roediger)"
    },
    {
        "id": "COG-027",
        "name": "Signaling and Visual Cues in Sympathetic Outflow Diagrams",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Apply bold high-contrast borders and directional pulsing cues along preganglionic thoracolumbar pathways while muting surrounding spinal cord anatomy",
        "expected_effect": "Directs involuntary visual attention to essential autonomic synaptic relay junctions, eliminating visual search overhead (Mautone & Mayer signaling principle)"
    },
    {
        "id": "COG-028",
        "name": "Interleaved Calculation Tasks for Acidic vs. Basic Drug Excretion",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Interleave practice calculations for urinary ion trapping between weak acids (aspirin, pKa 3.5) and weak bases (amphetamine, pKa 9.9) under variable urine pH conditions",
        "expected_effect": "Inhibits rote algorithmic plugging and trains learners to actively verify conjugate acid-base identity before applying Henderson-Hasselbalch equations (Taylor & Rohrer)"
    },
    {
        "id": "COG-029",
        "name": "Delayed Judgments of Learning on Autonomic Receptor Distribution",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Ask learners to predict their probability of correctly recalling ocular, bronchial, and cardiac receptor distributions 15 minutes after module completion rather than immediately at the end of the step",
        "expected_effect": "Shifts metacognitive monitoring from transient working memory fluency to diagnostic long-term memory retrieval strength (Nelson & Dunlosky delayed JOL effect)"
    },
    {
        "id": "COG-030",
        "name": "Subgoal-Labeled Walkthroughs for AChE Inhibitor Chemical Classes",
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Label chemical transformations as 'Subgoal A: Active Site Docking', 'Subgoal B: Covalent Intermediate Formation', and 'Subgoal C: Hydrolytic Regeneration Half-Life' across edrophonium, neostigmine, and echothiophate",
        "expected_effect": "Enables learners to construct structural taxonomies categorizing reversible, carbamoylating, and phosphorylating inhibitors by underlying reaction mechanisms (Catrambone)"
    }
]

adjacent_ideas = [
    {
        "id": "COG-031",
        "name": "Interactive SMILES Atom Deletion for Pharmacophore Boundary Discovery",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner clicks to delete specific functional atoms on acetylcholine (e.g. carbonyl oxygen, ester oxygen, methyl groups) and observes instant real-time drops on a simulated muscarinic affinity gauge",
        "expected_effect": "Uses self-directed perturbation to rapidly delineate necessary versus dispensable structural elements in the learner's mental pharmacophore model"
    },
    {
        "id": "COG-032",
        "name": "Thermodynamic Kinetic Energy Slider for Drug-Target Residence Time",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner drags a thermodynamic slider to visualize how microscopic bond vibrations affect the dissociation rate constant (koff) and receptor residence time (tau = 1/koff)",
        "expected_effect": "Converts static affinity conceptions into dynamic temporal kinetic schemas governing sustained drug action"
    },
    {
        "id": "COG-033",
        "name": "Dual-Axis Dose-Response Curve Dragging for Antagonist Classes",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner physically drags an antagonist slider across a log concentration-response plot: competitive antagonists shift EC50 rightward with unchanged Emax, while noncompetitive antagonists depress maximal response",
        "expected_effect": "Spatial motor manipulation coupled with immediate visual constraint feedback anchors the fundamental operational distinction between orthosteric and allosteric antagonism"
    },
    {
        "id": "COG-034",
        "name": "H-Bond Donor/Acceptor Color Mask Fading in Nicotinic Receptors",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Display hydrogen bond donor atoms in cyan and acceptor atoms in orange on nicotine, then fade the masks and challenge the learner to correctly tap the corresponding features on an unannotated lobeline scaffold",
        "expected_effect": "Fosters analogical schema transfer across structurally divergent chemical families targeting identical receptor pockets"
    },
    {
        "id": "COG-035",
        "name": "Inverted Baroreceptor Feedback Loop Simulator with Reflex Latency",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner simulates norepinephrine infusion and must manually drag a heart rate dial downward before an on-screen arterial pressure timer triggers hypertensive failure",
        "expected_effect": "Forces active mental simulation of negative feedback homeostatic latency and vagal nerve reflex compensatory dynamics"
    },
    {
        "id": "COG-036",
        "name": "Electrostatic Potential Surface Peeling for Tetrazole Bioisosterism",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner toggles between electron density surface mesh and 2D skeletal formulas for carboxylic acid and 5-substituted tetrazole rings on an angiotensin/adrenergic ligand",
        "expected_effect": "Connects visual 3D spatial charge distribution intuition directly with 2D chemical nomenclature representations"
    },
    {
        "id": "COG-037",
        "name": "Pupil Constriction/Dilation Direct-Manipulation Dial",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner drags a slider from pure sympathetic to pure parasympathetic tone, observing real-time SVG vector dilation of iris radial muscle (alpha-1) versus constriction of circular sphincter muscle (M3)",
        "expected_effect": "Bypasses rote text memorization of ocular innervation via direct visual-causal physical manipulation"
    },
    {
        "id": "COG-038",
        "name": "Rate-Limiting Enzyme Bottleneck Simulation in Epinephrine Synthesis",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner pulses substrate molecules into Tyrosine Hydroxylase versus PNMT, observing downstream product accumulation curves plateau abruptly when tyrosine hydroxylase saturates",
        "expected_effect": "Visualizing enzymatic kinetic bottlenecks solidifies the cognitive schema of metabolic rate-limiting control"
    },
    {
        "id": "COG-039",
        "name": "Virtual Schild Plot Linearization Morphing Widget",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "An interactive toggle animates a family of rightward-shifted sigmoidal agonist dose-response curves smoothly collapsing into a single linear Schild regression line with unity slope",
        "expected_effect": "Reduces extraneous cognitive load involved in abstracting mathematical coordinate transformations from raw pharmacological bioassay data"
    },
    {
        "id": "COG-040",
        "name": "Interactive pKa Buffer Chamber with Dynamic Membrane Permeability",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner adjusts simulated stomach pH from 1.5 to 8.0 to observe real-time ratio changes of ionized to unionized species and passive diffusion flux across a lipid bilayer partition",
        "expected_effect": "Grounds the Henderson-Hasselbalch equation into concrete physical molecular partitioning behavior across biological membranes"
    },
    {
        "id": "COG-041",
        "name": "Stereochemical 3D Handshake Alignment Widget for Epinephrine Enantiomers",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner rotates an (R)-enantiomer into a 3-point adrenergic receptor pocket (amine, beta-OH, catechol ring) and attempts the same with the (S)-distomer to experience the steric miss",
        "expected_effect": "Physically demonstrates steric clash and orientation constraints governing the Easson-Stedman hypothesis in adrenergic receptors"
    },
    {
        "id": "COG-042",
        "name": "MAO vs COMT Enzyme Cleavage Drag-and-Drop Challenge",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner drags enzyme scissors labeled MAO or COMT to the exact chemical bond (terminal aliphatic amine vs 3-hydroxy group) on dopamine and epinephrine",
        "expected_effect": "Solidifies autonomic metabolic pathway topography through goal-directed motor selection and active spatial target identification"
    },
    {
        "id": "COG-043",
        "name": "Organ Response Conflict Resolution Matrix Widget",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner selects a drug (e.g., atropine) and clicks across a human anatomical mannequin to predict dominant effector organ outcomes when sympathetic and parasympathetic tones collide",
        "expected_effect": "Enforces system-level autonomic discrimination across ocular, cardiac, bronchial, and gastrointestinal effector organs"
    },
    {
        "id": "COG-044",
        "name": "Real-Time Two-Compartment Pharmacokinetic Dye Dilution Model",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner injects a virtual drug bolus and modulates inter-compartmental clearance (Q) and volume parameters to view real-time transition from the alpha distribution phase to the beta elimination phase",
        "expected_effect": "Transforms abstract bi-exponential differential equations into visceral fluid mechanical intuition"
    },
    {
        "id": "COG-045",
        "name": "Quantal Dose-Response Threshold Scatter to Cumulative Curve Assembly",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner clicks individual patient response threshold points on a quantal population axis, observing the Gaussian frequency histogram integrate into a cumulative sigmoidal curve",
        "expected_effect": "Resolves the pervasive pharmacy misconception confusing individual graded dose-response curves with population quantal cumulative curves"
    },
    {
        "id": "COG-046",
        "name": "Bioisosteric Replacement Swapper with Real-Time LogP and Potency Meter",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner swaps an -OH group for -F, -Cl, or -CH3 on a phenethylamine ring, viewing instant numerical recalculation of calculated LogP, topological polar surface area, and receptor affinity",
        "expected_effect": "Tightens cognitive feedback loops connecting single-atom electronegativity to macroscopic pharmacological physicochemical properties"
    },
    {
        "id": "COG-047",
        "name": "Adrenergic Receptor Subtype Selectivity Concentration Dial",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner rotates a concentration dial increasing norepinephrine from nanomolar to micromolar, observing sequential recruitment of high-affinity Alpha-1 followed by lower-affinity Beta-2 receptors",
        "expected_effect": "Encodes concentration-dependent selectivity thresholds into a continuous spatial continuum rather than binary all-or-none categories"
    },
    {
        "id": "COG-048",
        "name": "Quaternary Ammonium Charge Shielding Interactive Widget",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner drags alkyl chain extensions onto neostigmine's quaternary nitrogen, observing blood-brain barrier permeability switch between impermeable and permeable based on permanent charge vs lipophilicity",
        "expected_effect": "Directly links permanent cationic formal charge and steric accessibility to central versus peripheral nervous system distribution"
    },
    {
        "id": "COG-049",
        "name": "Intrinsic Efficacy Spring Tension Analogy Widget",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner connects full agonists, partial agonists, neutral antagonists, and inverse agonists to a dual-state receptor spring, observing active (R*) versus inactive (R) state equilibrium shifts",
        "expected_effect": "Uses grounded physical mechanics to clarify the two-state receptor model and the subtle concept of inverse agonism in constitutively active systems"
    },
    {
        "id": "COG-050",
        "name": "Acetylcholine Esterase Active Site Depth Navigation Widget",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner navigates an acetylcholine molecule down a 20-angstrom narrow gorge lined with 14 aromatic residues to reach the catalytic triad (Ser-His-Glu) at the bottom",
        "expected_effect": "Dismantles the flat 2D active-site misconception and builds spatial architectural memory of the AChE aromatic gorge and peripheral anionic site"
    },
    {
        "id": "COG-051",
        "name": "Autonomic Receptor Dominance Blind Toggling Experiment",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner selectively severs either sympathetic or parasympathetic nerve inputs to virtual isolated tissues (SA node, iris, bladder, vascular beds) to uncover resting basal autonomic tone",
        "expected_effect": "Elicits active causal inference regarding baseline autonomic tone dominance across diverse organs without rote table memorization"
    },
    {
        "id": "COG-052",
        "name": "Volume of Distribution (Vd) Tissue Sequestration Chamber",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner adjusts plasma protein binding (fu) versus tissue adipose partitioning, watching virtual drug molecules vanish from plasma into peripheral sinks with Vd soaring past total body water",
        "expected_effect": "Prevents confusion between the mathematical apparent volume of distribution and real anatomical physiological fluid volumes"
    },
    {
        "id": "COG-053",
        "name": "Choline Acetyltransferase (ChAT) Feedback Inhibition Dial",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner accumulates simulated cytoplasmic acetylcholine levels to witness allosteric brake engagement on high-affinity choline uptake transporter CHT1",
        "expected_effect": "Reinforces negative feedback homeostatic regulation of cholinergic neurotransmitter synthesis"
    },
    {
        "id": "COG-054",
        "name": "G-Protein Subunit Dissociation Mechanical Lock Widget",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner docks an agonist to induce GDP-to-GTP nucleotide exchange on G-alpha, causing mechanical dissociation of G-alpha-q from the G-beta-gamma dimer to activate phospholipase C",
        "expected_effect": "Solidifies chronological procedural memory of the heterotrimeric G-protein activation and GTPase termination cycle"
    },
    {
        "id": "COG-055",
        "name": "Irreversible vs Reversible Antagonist Washout Simulation",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner applies phenoxybenzamine versus phentolamine to an isolated vascular tissue preparation, triggers repeated saline washouts, and observes recovery of contractile responsiveness",
        "expected_effect": "Connects covalent chemical alkylation kinetics with insurmountable, non-equilibrium pharmacodynamic blockade"
    },
    {
        "id": "COG-056",
        "name": "Ester vs Carbamate Hydrolysis Speedometer Comparison",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Interactive side-by-side timers show acetylcholine hydrolyzed in 80 microseconds while carbamoylated physostigmine holds the catalytic serine esterase bond for 30 minutes",
        "expected_effect": "Visually anchors covalent carbamoylation half-life disparities in working memory via temporal duration comparisons"
    },
    {
        "id": "COG-057",
        "name": "Vesicular Monoamine Transporter (VMAT2) Proton Gradient Depleter",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner drags reserpine into a synaptic vesicle membrane to inhibit the VMAT2 proton-antiporter, watching cytosolic monoamines leak and face rapid degradation by mitochondrial MAO",
        "expected_effect": "Connects vesicular storage failure directly to monoamine depletion syndromes and antihypertensive/depressive mechanisms"
    },
    {
        "id": "COG-058",
        "name": "Therapeutic Index Ratio Visual Gauge",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner modulates TD50 (toxic dose) and ED50 (effective dose) sliders, watching the therapeutic window band expand or narrow with color-coded risk alerts and margin calculations",
        "expected_effect": "Anchors safety margin calculations in visual spatial overlap schemas, preventing calculation errors in therapeutic index vs margin of safety"
    },
    {
        "id": "COG-059",
        "name": "Methacholine vs Carbachol Hydrolysis Challenge by AChE",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner presents various cholinergic agonists to virtual acetylcholinesterase to observe beta-methyl steric shielding in methacholine versus electronic resonance resistance in carbachol's carbamate moiety",
        "expected_effect": "Directs cognitive focus to the dual mechanisms of enzymatic resistance: steric hindrance versus carbamate electronic stabilization"
    },
    {
        "id": "COG-060",
        "name": "Baroreceptor Resetting Over Time Simulation",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner holds arterial blood pressure elevated for 48 virtual hours and observes the afferent carotid sinus firing curve shift rightward to adapt to the hypertensive baseline",
        "expected_effect": "De-biases the misconception that homeostatic baroreceptor reflexes can permanently normalize chronic systemic hypertension"
    },
    {
        "id": "COG-061",
        "name": "Catechol Ring Meta/Para Hydroxyl Oxidation Sandbox",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner exposes catecholamines to light, oxygen, or COMT, observing spontaneous ortho-quinone polymerization or enzymatic 3-O-methylation that inactivates adrenergic potency",
        "expected_effect": "Emphasizes the chemical vulnerability of the catechol pharmacophore to rapid first-pass metabolism and environmental oxidative degradation"
    },
    {
        "id": "COG-062",
        "name": "Nicotinic Receptor Desensitization State Gate Widget",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner delivers sustained high-dose acetylcholine, watching the pentameric channel open transiently, then enter a closed, non-conducting refractory desensitized conformation despite ligand occupancy",
        "expected_effect": "Clearly dissociates channel opening activation from receptor desensitization conformational states (depolarizing blockade)"
    },
    {
        "id": "COG-063",
        "name": "Alpha-2 Autoreceptor Negative Feedback Loop Slider",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner ramps sympathetic burst firing and watches synaptic cleft norepinephrine accumulate until presynaptic Alpha-2 Gi activation inhibits voltage-gated calcium channels, terminating exocytosis",
        "expected_effect": "Clarifies the autoinhibitory homeostatic brake mechanism governing peripheral and central adrenergic terminals"
    },
    {
        "id": "COG-064",
        "name": "Steady-State Plasma Accumulation Infusion Stepwise Plotter",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner modulates continuous IV infusion rate (R0) and elimination half-life (t1/2) to watch the plasma curve plateau at 1, 2, 3, 4, and 5 half-lives (50%, 75%, 87.5%, 93.75%, 96.9%)",
        "expected_effect": "Builds durable intuition for the fundamental principle that time to steady-state depends solely on elimination half-life, not infusion velocity"
    },
    {
        "id": "COG-065",
        "name": "Bioisosteric Carboxylic Acid vs Sulfonamide vs Tetrazole Acidity Ladder",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner ranks weak acid bioisosteres by dragging their structures into an electronic resonance delocalization tube to compare negative charge stabilization across oxygen, nitrogen, and sulfur",
        "expected_effect": "Grounds acidic functional group bioisosterism in fundamental electronic resonance stabilization rather than memorized pKa tables"
    },
    {
        "id": "COG-066",
        "name": "Non-Selective Beta Blocker Bronchospasm Trigger Simulator",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner administers propranolol versus metoprolol to a virtual asthma patient profile, observing immediate airway resistance spikes due to unopposed parasympathetic tone following Beta-2 antagonism",
        "expected_effect": "Bridges molecular receptor subtype selectivity directly with acute clinical contraindications and safety reasoning"
    },
    {
        "id": "COG-067",
        "name": "Muscarinic Receptor Subtype Knockout Sandbox",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner selectively knocks out M2 or M3 receptor genes in virtual tissue and challenges the preparation with acetylcholine, observing selective loss of SA nodal bradycardia versus loss of detrusor contraction",
        "expected_effect": "Leverages single-variable knockout reasoning to clarify tissue-specific muscarinic subtype distribution and functional roles"
    },
    {
        "id": "COG-068",
        "name": "First-Pass Hepatic Extraction Sieve Widget",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner routes an orally administered drug through the mesenteric vein and portal circulation with adjustable hepatic enzyme clearance (ER) to compute systemic bioavailability (F = fg * (1 - ER))",
        "expected_effect": "Dissociates gastrointestinal membrane absorption fraction from post-hepatic systemic bioavailability"
    },
    {
        "id": "COG-069",
        "name": "Muscarine vs Nicotine Structural Conformation Overlap Viewer",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner superimposes rigid ring structures of muscarine and nicotine onto flexible acetylcholine held in its synclinal (gauche) versus antiperiplanar (trans) conformations",
        "expected_effect": "Trains 3D conformational selection intuition and pharmacophoric spatial overlap requirements for receptor sub-family activation"
    },
    {
        "id": "COG-070",
        "name": "Phenylephrine vs Isoproterenol Blood Pressure Trace Predictor",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner draws predicted systolic, diastolic, and pulse pressure waveforms on a canvas before the system computes true hemodynamic responses based on peripheral resistance and cardiac output",
        "expected_effect": "Pre-computation curve sketching activates cardiovascular hemodynamic schemas far more deeply than passive graph inspection"
    },
    {
        "id": "COG-071",
        "name": "Organophosphate Aging Mechanism Time-Lapse Stepper",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner steps through the time-dependent loss of an alkoxy group via O-dealkylation on phosphorylated AChE, witnessing the emergence of a stable oxyanion that resists pralidoxime nucleophilic displacement",
        "expected_effect": "Emphasizes the strict time-window dependency for oxime antidote administration before irreversible chemical aging occurs"
    },
    {
        "id": "COG-072",
        "name": "Competitive vs Non-Competitive Enzyme Inhibition Double-Reciprocal Matcher",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner manually manipulates x-intercept (-1/Km) and y-intercept (1/Vmax) anchor pins on an interactive Lineweaver-Burk grid to match experimental enzyme inhibitor kinetics",
        "expected_effect": "Replaces rote memorization of kinetic equations with direct spatial geometric manipulation of reciprocal kinetic parameters"
    },
    {
        "id": "COG-073",
        "name": "Amphetamine Reverse-Transport VMAT and NET Efflux Cascade",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner introduces amphetamine molecules, watching them enter the presynaptic terminal via NET, disrupt the vesicular pH gradient to release norepinephrine, and force reverse transporter efflux into the cleft",
        "expected_effect": "Dispels confusion between simple reuptake transport blockers (cocaine) and non-exocytotic monoamine releasers (amphetamines)"
    },
    {
        "id": "COG-074",
        "name": "Epinephrine Reversal by Alpha-Blockers Simulation",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner pre-treats a virtual vascular bed with phentolamine and injects a high dose of epinephrine, watching mean arterial pressure drop rather than spike due to unopposed Beta-2 vasodilation",
        "expected_effect": "Exploits the classic Dale vasomotor reversal phenomenon to crystallize multi-receptor competition and adrenergic receptor balance"
    },
    {
        "id": "COG-075",
        "name": "Hydrophobic Pocket Depth Matcher for Adrenergic N-Alkyl Substituents",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner lengthens the N-alkyl substituent on phenethylamine from methyl (epinephrine) to isopropyl (isoproterenol) to t-butyl (colterol) to fit an adjacent lipophilic pocket on the Beta-adrenergic receptor",
        "expected_effect": "Demonstrates steric bulk driving Beta-over-Alpha receptor selectivity through direct physical receptor pocket fitting"
    },
    {
        "id": "COG-076",
        "name": "Renal Clearance Fraction Calculator with Glomerular vs Tubular Sliders",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner modulates GFR filtration (fu * GFR), active tubular secretion, and pH-dependent passive tubular reabsorption to calculate net renal clearance relative to inulin",
        "expected_effect": "Integrates three independent renal physiology sub-mechanisms into a unified quantitative clearance outcome schema"
    },
    {
        "id": "COG-077",
        "name": "Botulinum Toxin vs Black Widow Spider Venom Synaptic Sandbox",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner toggles between enzymatic cleavage of SNAP-25 by botulinum toxin (blocking exocytosis) and alpha-latrotoxin pore insertion (causing massive calcium-independent acetylcholine discharge)",
        "expected_effect": "Highlights presynaptic vesicular fusion proteins as distinct pharmacological targets outside of traditional postsynaptic receptors"
    },
    {
        "id": "COG-078",
        "name": "In Vivo vs In Vitro Autonomic Reflex Discrepancy Matrix",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner toggles between an isolated perfused heart and an intact circulatory system when administering norepinephrine: heart rate accelerates in vitro (direct Beta-1) but decelerates in vivo (reflex vagal tone)",
        "expected_effect": "Resolves a classic board-exam trap by highlighting how intact autonomic reflex arcs fundamentally alter isolated organ pharmacodynamics"
    },
    {
        "id": "COG-079",
        "name": "Choline Reuptake Transporter (CHT1) Sodium-Symport Dependency Gauge",
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Learner depletes extracellular Na+ concentration and observes immediate arrest of high-affinity choline uptake and consequent cessation of acetylcholine synthesis",
        "expected_effect": "Connects transmembrane electrochemical ion gradients to secondary active neurotransmitter precursor salvage"
    },
    {
        "id": "COG-080",
        "name": "Tyramine Cheese Effect Hypertensive Crisis Simulator",
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Learner simulates a patient taking phenelzine (MAO inhibitor) who ingests aged cheese containing tyramine, watching dietary tyramine escape intestinal breakdown and trigger explosive catecholamine release",
        "expected_effect": "Concretizes dangerous pharmacokinetic-pharmacodynamic drug-diet interactions into an unforgettable causal chain"
    }
]

wild_ideas = [
    {
        "id": "COG-081",
        "name": "Adversarial 'Toxicity Saboteur' Challenge",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Learner is tasked with deliberately altering a safe selective Beta-2 bronchodilator molecule to provoke lethal cardiac arrhythmias by maximizing Beta-1 off-target affinity and metabolic longevity",
        "expected_effect": "Inversion thinking forces learners to identify key structural boundary conditions and vulnerabilities governing pharmacophore selectivity"
    },
    {
        "id": "COG-082",
        "name": "Intentional Perceptual Disfluency Mode for Pharmacophore Mastery",
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Render SMILES structures in intentionally degraded, low-contrast, or hand-drawn rough typography, requiring deliberate visual decoding effort before allowing receptor matching",
        "expected_effect": "Induces deeper analytical cognitive processing and prevents superficial visual skimming through desirable perceptual difficulty"
    },
    {
        "id": "COG-083",
        "name": "Poison Control Triage High-Stakes Panic Timer",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Present ambiguous clinical toxicology vignettes with rapidly dropping vitals (pinpoint pupils, salivation, bradycardia) under strict 20-second countdowns with high audio-visual tension",
        "expected_effect": "Stress inoculation builds automated non-deliberative pattern recognition and fast heuristic retrieval required for high-acuity licensure exams"
    },
    {
        "id": "COG-084",
        "name": "Negative Knowledge Auditing (Counterfactual Pharmacology)",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Present four plausible-sounding pharmacological mechanisms where one is completely fictional (e.g., 'Beta-3 autoreceptors directly inhibiting parasympathetic cardiac outflow'), requiring learners to spot the physiological counterfeit",
        "expected_effect": "Decontaminates false-positive schema formations and sharply defines genuine biological physiological boundaries"
    },
    {
        "id": "COG-085",
        "name": "Hyperbolic Bet-Your-Points Metacognitive Wager",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Learners wager progress points on their predicted autonomic drug outcomes before seeing the reveal, with severe asymmetric point deductions applied solely to high-confidence incorrect responses",
        "expected_effect": "Aggressively dismantles unwarranted student overconfidence and forces rigorous internal evidential verification before committing"
    },
    {
        "id": "COG-086",
        "name": "Backward Chaining from Forensic Autopsy to Chemical Scaffold",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Learner begins with post-mortem toxicology pathology findings (pulmonary edema, muscarinic excess), deduces target receptor hyperactivation, identifies drug class, and finally synthesizes the offending chemical scaffold",
        "expected_effect": "Inverts traditional forward deductive instruction to establish high-impact clinical anchors that motivate chemical structure encoding"
    },
    {
        "id": "COG-087",
        "name": "Rapid-Fire Visual Flanker Perceptual Learning Module (PLM)",
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Flash 2D chemical scaffolds for 400 milliseconds and require instant classification: 'Muscarinic or Adrenergic?' across 60 rapid successive trials without explanatory text or formulas",
        "expected_effect": "Bypasses slow analytical deliberative reasoning to train perceptual visual chunking of functional group spatial patterns"
    },
    {
        "id": "COG-088",
        "name": "Student-Authored 'Tempting Distractor' Challenge",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Require learners to construct the most compelling wrong distractor explaining why pralidoxime fails against aged organophosphates, rating peer distractors on plausibility",
        "expected_effect": "Formulating convincing pedagogical traps requires deep metacognitive deconstruction of common student cognitive misconceptions"
    },
    {
        "id": "COG-089",
        "name": "Motor-Spatial Gesture Pairing for Autonomic Tone (Embodied Cognition)",
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Learner uses rapid high-frequency keystrokes or fast upward swipes for sympathetic acceleration versus slow rhythmic keystrokes or downward swipes for parasympathetic braking",
        "expected_effect": "Leverages embodied cognition principles to map kinesthetic motor activity to autonomic physiological control axes"
    },
    {
        "id": "COG-090",
        "name": "Socratic Machine Interrogation with Misconception Baits",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "An automated conversational bot poses enticing fallacies ('Since atropine blocks muscarinic receptors, shouldn't it cause profound vasodilation and hypotension?') requiring the learner to refute the claim",
        "expected_effect": "Defending against deliberate pedagogical misinformation forces learners to externalize and rigorously reorganize their internal causal schemas"
    },
    {
        "id": "COG-091",
        "name": "Chemical Structure De-Rendering Blind Reconstruction",
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Display a novel adrenergic agonist structure for 4 seconds, wipe the screen blank, and challenge the learner to place the critical pharmacophoric atoms onto an empty grid coordinate system",
        "expected_effect": "Maximizes the cognitive generation effect and uncovers precise limits of visual working memory capacity for chemical scaffolds"
    },
    {
        "id": "COG-092",
        "name": "Asymmetric Reward for Diagnosing Rare Paradoxical Drug Reactions",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Award 5x mastery score whenever a learner correctly predicts rare paradoxical responses, such as low-dose atropine inducing transient bradycardia via presynaptic M1 autoreceptor blockade",
        "expected_effect": "Directs heightened cognitive curiosity and attentional encoding to nuanced regulatory edge cases that reveal the limits of simplistic models"
    },
    {
        "id": "COG-093",
        "name": "Multi-Sensory Auditory Pitch Feedback for Receptor Kinetics (Sonification)",
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Map drug-receptor association rates (kon) to rising musical harmonic pitches and dissociation rates (koff) to resonant decay intervals as molecules bind and release in real time",
        "expected_effect": "Engages cross-modal sensory processing channels to construct intuitive auditory mental schemas for abstract kinetic rate constants"
    },
    {
        "id": "COG-094",
        "name": "Extreme Boundary Stress-Testing Sandbox",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Allow learners to adjust ligand concentrations to non-biological extremes (e.g. 50 Molar) or set receptor reserve to zero to observe mathematical asymptotic breakdowns in Hill equation models",
        "expected_effect": "Solidifies understanding of mathematical model assumptions by deliberately pushing systems beyond their biological validity domains"
    },
    {
        "id": "COG-095",
        "name": "'Taboo' Restricted-Vocabulary Self-Explanation Challenge",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Learners must explain competitive antagonism without using the forbidden terms 'compete', 'active site', 'reversible', or 'shift'",
        "expected_effect": "Dismantles shallow memorized phraseology and forces deep conceptual paraphrase grounded in foundational thermodynamic mass action principles"
    },
    {
        "id": "COG-096",
        "name": "Cognitive Dissonance Induction via Contradictory Clinical Paradoxes",
        "tier": "wild",
        "evidence_tag": "evidence-backed",
        "mechanism": "Present two identical patients receiving norepinephrine with diametrically opposite heart rate outcomes (tachycardia in heart-transplant recipient vs reflex bradycardia in healthy adult)",
        "expected_effect": "Induces acute cognitive dissonance that compels deep mental reorganization around the requirement of intact autonomic innervation"
    },
    {
        "id": "COG-097",
        "name": "'Two Truths and an Enzyme' Bioisosteric Deception Challenge",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Learners evaluate three proposed functional group substitutions where two improve metabolic stability and one generates a reactive quinone-imine hepatotoxic intermediate",
        "expected_effect": "Harnesses social deduction game mechanics to elevate threat-detection vigilance in medicinal chemical SAR reasoning"
    },
    {
        "id": "COG-098",
        "name": "Anti-Ego Confidence Decoupling (Falsification Betting)",
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Learner commits to an initial drug prediction, then receives double points only if they successfully identify an edge case or physiological condition that proves their own prediction wrong",
        "expected_effect": "Systematically trains Popperian scientific falsification and inoculates pharmacy students against confirmation bias in pharmacotherapy"
    },
    {
        "id": "COG-099",
        "name": "Cross-Lingual Code-Switching Retell for Bilingual Students (EN/TR)",
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Display complex autonomic pharmacology scenarios in English, then prompt learners to formulate their mechanistic rationale in Turkish (targeting specific false cognates like 'adrenerjik baskılanma')",
        "expected_effect": "Forces deep semantic recoding across language networks, eliminating shallow verbatim memorization in bilingual pharmacy students"
    },
    {
        "id": "COG-100",
        "name": "Reverse Worked-Example Fading (First Principles to Clinical Formula)",
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Begin with raw thermodynamic collision statistics and electrochemical potentials, gradually fading underlying physical annotations until only the clinical Henderson-Hasselbalch or Hill equation remains",
        "expected_effect": "Prevents formulaic clinical superficiality by indelibly rooting everyday clinical pharmacokinetic tools in fundamental physical laws"
    }
]

def build_idea_entry(item):
    formatted = f"{item['name']}: {item['mechanism']} -> {item['expected_effect']} [{item['evidence_tag']}]"
    return {
        "id": item["id"],
        "name": item["name"],
        "tier": item["tier"],
        "evidence_tag": item["evidence_tag"],
        "mechanism": item["mechanism"],
        "expected_effect": item["expected_effect"],
        "formatted": formatted
    }

def main():
    all_raw = proven_ideas + adjacent_ideas + wild_ideas
    assert len(proven_ideas) == 30, f"Expected 30 proven ideas, got {len(proven_ideas)}"
    assert len(adjacent_ideas) == 50, f"Expected 50 adjacent ideas, got {len(adjacent_ideas)}"
    assert len(wild_ideas) == 20, f"Expected 20 wild ideas, got {len(wild_ideas)}"
    assert len(all_raw) == 100, f"Expected 100 total ideas, got {len(all_raw)}"

    ideas = []
    seen_ids = set()
    for item in all_raw:
        assert item["id"] not in seen_ids, f"Duplicate ID: {item['id']}"
        seen_ids.add(item["id"])
        assert item["tier"] in ["proven", "adjacent", "wild"], f"Invalid tier: {item['tier']}"
        assert item["evidence_tag"] in ["evidence-backed", "plausible", "speculative"], f"Invalid tag: {item['evidence_tag']}"
        assert len(item["mechanism"].strip()) > 20, f"Mechanism too short: {item['id']}"
        assert len(item["expected_effect"].strip()) > 20, f"Expected effect too short: {item['id']}"
        ideas.append(build_idea_entry(item))

    data = {
        "seat": "Seat 1: Cognitive Scientist",
        "total_count": len(ideas),
        "breakdown": {
            "proven": len(proven_ideas),
            "adjacent": len(adjacent_ideas),
            "wild": len(wild_ideas)
        },
        "ideas": ideas
    }

    output_dir = Path("docs/council")
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / "seat_1_cognitive_scientist.json"

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Successfully generated {output_file} with {len(ideas)} ideas.")
    print(f"Breakdown: Proven={len(proven_ideas)}, Adjacent={len(adjacent_ideas)}, Wild={len(wild_ideas)}")

if __name__ == "__main__":
    main()

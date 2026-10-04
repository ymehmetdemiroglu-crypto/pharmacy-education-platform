import sys
import json
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ideas = {i['id']: i for i in raw_data['all_ideas']}

from theme1_clusters import THEME_1_CLUSTERS
from theme2_clusters import THEME_2_CLUSTERS
from theme3_clusters import THEME_3_CLUSTERS
from theme4_clusters import THEME_4_CLUSTERS
from theme5_clusters import THEME_5_CLUSTERS
from theme6_clusters import THEME_6_CLUSTERS
from theme7_clusters import THEME_7_CLUSTERS

# Clean base clusters so no duplicates exist
seen_ids = set()
base_theme_map = {
    1: THEME_1_CLUSTERS,
    2: THEME_2_CLUSTERS,
    3: THEME_3_CLUSTERS,
    4: THEME_4_CLUSTERS,
    5: THEME_5_CLUSTERS,
    6: THEME_6_CLUSTERS,
    7: THEME_7_CLUSTERS
}

for tid, clist in base_theme_map.items():
    for c in clist:
        c['theme_id'] = tid
        filtered_ids = []
        for rid in c['raw_ids']:
            if rid not in seen_ids:
                seen_ids.add(rid)
                filtered_ids.append(rid)
        c['raw_ids'] = filtered_ids

print(f"Base clusters hold {len(seen_ids)} unique raw IDs.")

# Now define ADDITIONAL clusters to capture all remaining 247 raw IDs cleanly
ADDITIONAL_CLUSTERS = [
    # THEME 1: Memory & Spacing extensions
    {
        "name": "Test-Enhanced Retrieval Spacing Optimization with Concept Inventories",
        "raw_ids": ["DAT-027", "DAT-028"],
        "theme_id": 1,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Calibrates spaced retrieval review triggers using empirical gains from a validated dual-factor autonomic concept inventory rather than arbitrary time intervals.",
        "expected_effect": "Drives targeted retrieval practice directly to lagging autonomic sub-domains."
    },
    {
        "name": "Pre-Post Normalized Learning Gain Tracking (Hake's Gain Telemetry)",
        "raw_ids": ["DAT-004", "DAT-055"],
        "theme_id": 1,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Measures normalized conceptual learning gain [g = (post - pre) / (100% - pre)] across matched micro-item pairs for specific functional group substitutions.",
        "expected_effect": "Quantifies true instructional value-add independent of students' incoming baseline knowledge."
    },
    {
        "name": "Reversible Practice Exam Sandbox & High-Yield Cram Modules",
        "raw_ids": ["ADV-072", "ADV-069"],
        "theme_id": 1,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Provides low-stress reversible mock exam modes with instant reset controls, paired with curated high-yield cram modules highlighting top licensure exam targets.",
        "expected_effect": "Builds exam stamina and focuses last-minute study windows on high-frequency board questions."
    },
    {
        "name": "Misconception Re-Check Spaced Retention Verification",
        "raw_ids": ["ADV-052", "DAT-048"],
        "theme_id": 1,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Estimates the persistence half-life of corrected misconceptions and re-injects isomorphic verification probes at 3, 7, and 21 days after initial error correction.",
        "expected_effect": "Ensures that corrected misconceptions do not revert back to flawed intuitive defaults over time."
    },

    # THEME 2: Scaffolding, Sequencing & Misconception Extensions
    {
        "name": "Productive Failure Chemical Sabotage Challenge",
        "raw_ids": ["COG-021", "TEA-086"],
        "theme_id": 2,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Challenges students to modify a potent agonist by altering just one atom to abolish activity (sabotage), revealing the absolute requirement of that functional group before didactic explanation.",
        "expected_effect": "Leverages intentional productive failure to deeply imprint essential pharmacophoric binding features."
    },
    {
        "name": "Isolated-Elements Pre-Training for Complex Autonomic Transmission",
        "raw_ids": ["COG-022", "TEA-018"],
        "theme_id": 2,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Deconstructs complex ganglionic and postganglionic synapses into isolated, goal-free interactive elements before integrating them into full organ reflex circuits.",
        "expected_effect": "Prevents cognitive overload during initial exposure to multi-stage autonomic innervation."
    },
    {
        "name": "Adaptive Expertise Reversal & Reverse Worked-Example Fading",
        "raw_ids": ["COG-017", "COG-100"],
        "theme_id": 2,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Detects high-performing learners and reverses traditional scaffolding (presenting unguided clinical problem statements and prompting backward derivation to first principles).",
        "expected_effect": "Prevents the expertise reversal effect where heavy scaffolding slows down advanced pharmacy students."
    },
    {
        "name": "Student-Authored Tempting Distractor & Deception Challenges",
        "raw_ids": ["COG-088", "COG-097", "TEA-090"],
        "theme_id": 2,
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Students write 'Two Truths and an Enzyme' deceptive distractors or craft plausible false pharmacokinetic profiles to fool peer challenge engines.",
        "expected_effect": "Deepens metacognitive analysis of common reasoning traps by having students construct the traps themselves."
    },
    {
        "name": "Negative Knowledge Auditing (Counterfactual Pharmacology Sandbox)",
        "raw_ids": ["COG-084", "TEA-081"],
        "theme_id": 2,
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Conducts a 'Molecule Autopsy' on terminated pharmaceutical drug candidates, asking students to identify why the drug failed clinical trials (e.g. rapid metabolism, fatal hERG channel QT prolongation).",
        "expected_effect": "Builds robust negative knowledge schemas (learning what NOT to do in drug design and prescribing)."
    },
    {
        "name": "Jargon Defusal Explainer & Socratic Devil's Advocate",
        "raw_ids": ["TEA-093", "ADV-090"],
        "theme_id": 2,
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "An interactive conversational coach prompts students to explain complex pharmacodynamics without clinical jargon, actively playing devil's advocate to challenge self-doubt.",
        "expected_effect": "Develops pristine conceptual clarity and patient counseling fluency."
    },
    {
        "name": "Gamified Medical Mythbusters De-Conditioning Arena",
        "raw_ids": ["ADV-097", "ADV-062"],
        "theme_id": 2,
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Presents persistent real-world medical myths (e.g. 'beta-blockers cure asthma', 'anticholinergics cause diarrhea') with non-overlapping typographic options in an arena de-conditioning challenge.",
        "expected_effect": "Eradicates entrenched clinical folklore through rigorous pharmacological disproof."
    },
    {
        "name": "Adaptive Misconception Inoculation via Paradoxical Items",
        "raw_ids": ["DAT-099", "COG-092"],
        "theme_id": 2,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Deliberately exposes students to controlled paradoxical cases and rare idiosyncratic drug reactions under low-stakes conditions to build diagnostic cognitive resilience.",
        "expected_effect": "Inoculates students against cognitive freezing when encountering rare clinical paradoxes on licensure exams."
    },
    {
        "name": "Multi-Step Calculation Intermediate Step Verification Gate",
        "raw_ids": ["ADV-068", "DAT-026"],
        "theme_id": 2,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Breaks complex pharmacokinetics formulas into intermediate mathematical checkpoints, applying Partial Credit Model (PCM) scoring and validating each sub-step.",
        "expected_effect": "Prevents arithmetic compounding errors and isolates the exact conceptual breakdown in multi-stage dosing math."
    },

    # THEME 3: Active Interactivity & Molecular Widgets Extensions
    {
        "name": "Dual-Modality Atom Tapping for SMILES-to-Pharmacophore Alignment",
        "raw_ids": ["COG-004", "TEA-017", "TEA-024", "ADV-010"],
        "theme_id": 3,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Co-locates 1D SMILES text notation with 2D chemical structure diagrams and 3D receptor binding pockets; tapping any atom in the formula highlights its exact position in the structure and receptor dock with fluid zoom/pan.",
        "expected_effect": "Eliminates spatial split-attention effect and builds seamless mental translation across chemical representations."
    },
    {
        "name": "Interactive Atom Deletion for Pharmacophore Boundary Mapping",
        "raw_ids": ["COG-031", "TEA-033", "ADV-039", "ADV-071"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Allows students to click-and-delete peripheral atoms on a drug scaffold, observing receptor affinity drop-offs on a live meter until only the minimal essential pharmacophore remains.",
        "expected_effect": "Demonstrates the experimental definition of a pharmacophore through active discovery."
    },
    {
        "name": "Non-Classical Bioisosterism: Carboxylic Acid vs Tetrazole vs Sulfonamide Acidity Ladder",
        "raw_ids": ["COG-036", "COG-065", "TEA-037", "TEA-062"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "An interactive pKa and electrostatic surface peeling widget that compares carboxylic acids with planar aromatic tetrazoles and sulfonamides, demonstrating how charge delocalization preserves acidity while enhancing LogP.",
        "expected_effect": "Provides clear physicochemical rationale for non-classical bioisosterism in modern drug design (e.g. ARBs like losartan)."
    },
    {
        "name": "Alpha-2 Presynaptic Autoreceptor Negative Feedback & Rebound Hypertension Mechanism",
        "raw_ids": ["COG-063", "GAM-071", "TEA-064"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "An animated synaptic cleft simulation showing presynaptic Alpha-2 autoreceptor activation suppressing norepinephrine exocytosis, and demonstrating acute rebound hypertensive surge when clonidine is abruptly discontinued.",
        "expected_effect": "Explains why centrally acting alpha-2 agonists lower sympathetic outflow and why abrupt cessation triggers hypertensive crisis."
    },
    {
        "name": "Muscarinic Receptor Subtype Knockout Phenotype Sandbox (M1-M5)",
        "raw_ids": ["COG-067", "TEA-058"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Allows students to toggle selective genetic knockouts of muscarinic subtypes (M1 cognitive, M2 cardiac bradycardia, M3 smooth muscle/secretory), observing isolated physiological deficits.",
        "expected_effect": "Disentangles overlapping muscarinic organ responses through targeted isolation."
    },
    {
        "name": "Renal Tubular Filtration, Secretion & pH-Dependent Reabsorption Calculator",
        "raw_ids": ["COG-076", "GAM-049", "TEA-079", "GAM-030"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "A nephron diagram with interactive glomerulus, proximal tubule active transport pumps, and collecting duct pH controls, calculating net renal clearance [CL_renal = GFR x fu + Secretion - Reabsorption].",
        "expected_effect": "Deconstructs the three physiological components of renal drug elimination into an interactive mechanical flow."
    },
    {
        "name": "Polyvalent Cation Chelation Food-Drug Interaction Simulator (Ciprofloxacin & Calcium)",
        "raw_ids": ["TEA-065", "GAM-038"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Visualizes the chemical chelation of fluoroquinolone 4-keto-3-carboxylate groups by divalent and trivalent dietary cations (Ca2+, Mg2+, Fe3+), forming insoluble, unabsorbable neutral precipitates.",
        "expected_effect": "Imprints the vital clinical counseling rule: separate tetracyclines and fluoroquinolones from antacids and dairy products by at least 2 hours."
    },
    {
        "name": "Nitroglycerin Hemodynamic Tolerance & Sulfhydryl Depletion Curve",
        "raw_ids": ["TEA-071", "GAM-040"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Simulates continuous nitrate administration depleting mitochondrial aldehyde dehydrogenase (ALDH2) and tissue sulfhydryl (-SH) donors, attenuating cyclic GMP synthesis and causing hemodynamic nitrate tolerance.",
        "expected_effect": "Provides mechanistic rationale for the standard 10-12 hour daily nitrate-free interval in angina management."
    },
    {
        "name": "Pharmacogenomic CYP Polymorphism & Slow-Metabolizer Titration Simulator",
        "raw_ids": ["TEA-072", "GAM-095"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "speculative",
        "mechanism": "Simulates CYP2D6 genetic polymorphisms (poor, intermediate, extensive, ultra-rapid metabolizers), demonstrating why codeine produces zero analgesia in poor metabolizers and toxic morphine surges in ultra-rapid metabolizers.",
        "expected_effect": "Connects clinical pharmacogenomics directly to prodrug bioactivation risks in real patient care."
    },
    {
        "name": "Reserpine Vesicular Monoamine Depletion & Depression Neurochemistry Tracing",
        "raw_ids": ["TEA-073", "GAM-072"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "A leaky bucket vesicular model showing reserpine irreversibly blocking VMAT2, causing cytosolic leakage and MAO degradation of catecholamines and serotonin.",
        "expected_effect": "Explains both the antihypertensive mechanism of reserpine and the monoamine hypothesis of depression."
    },
    {
        "name": "Blood-Brain Barrier Carrier-Mediated Transport (L-DOPA Trojan Horse)",
        "raw_ids": ["TEA-048", "ADV-058"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Compares dopamine (permanently charged catecholamine rejected by BBB) with L-DOPA (amino acid recognized by LAT1 transporter as a molecular Trojan horse, crossing into the CNS for local decarboxylation).",
        "expected_effect": "Demonstrates medicinal chemistry prodrug strategy utilizing endogenous nutrient transporters for CNS delivery."
    },
    {
        "name": "Metabolic Fluorine Shielding & Bioisosteric Halogen Swap",
        "raw_ids": ["TEA-050", "ADV-067"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Demonstrates replacing metabolic aromatic oxidation hotspots (para-phenyl hydrogens) with bioisosteric fluorine atoms, blocking CYP hydroxylation while mimicking hydrogen's van der Waals radius.",
        "expected_effect": "Teaches fundamental medicinal chemistry strategies for blocking first-pass metabolic soft spots and extending half-life."
    },
    {
        "name": "Bioequivalence & Generic Formulation Pharmacokinetic Curve Superposition",
        "raw_ids": ["TEA-054", "ADV-053"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Superimposes plasma concentration curves of brand-name vs generic formulations, evaluating regulatory bioequivalence criteria (AUC and Cmax 90% confidence intervals within 80-125%).",
        "expected_effect": "Demystifies FDA/EMA generic drug approval standards and equips future pharmacists to address patient bioequivalence concerns."
    },
    {
        "name": "Antimetabolite Structural Mimicry: Sulfonamides vs PABA",
        "raw_ids": ["TEA-067", "TEA-099"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Overlays the molecular geometry and electron density of sulfonamides against para-aminobenzoic acid (PABA), showing competitive inhibition of dihydropteroate synthase in bacterial folate synthesis.",
        "expected_effect": "Anchors antibacterial antimetabolite pharmacology in exact bioisosteric structural mimicry."
    },
    {
        "name": "Therapeutic Drug Monitoring Peak-and-Trough Triage (Vancomycin & Aminoglycosides)",
        "raw_ids": ["TEA-068", "ADV-066"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Simulates hospital pharmacokinetic consultation rounds: inputting serum peak and trough levels to recalculate clearance, elimination rate constant (k_e), and adjusted dosing intervals to prevent nephrotoxicity and ototoxicity.",
        "expected_effect": "Builds authentic clinical confidence in calculating hospital therapeutic drug monitoring dose adjustments."
    },
    {
        "name": "Steady-State Plasma Accumulation & Dosing Interval Scrubber",
        "raw_ids": ["COG-064", "GAM-024", "GAM-042"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "An interactive multi-dose accumulation scrubber showing repeated dosing over 5 half-lives (96.875% steady-state attainment), testing how altering dosage interval (tau) changes peak-to-trough fluctuation margins.",
        "expected_effect": "Solidifies the universal Rule of 5 in clinical pharmacokinetics and the relationship between dosing interval and steady-state swings."
    },
    {
        "name": "Organ Response Matrix & Autonomic Target Organ Pulse Animator",
        "raw_ids": ["GAM-007", "GAM-019", "COG-043"],
        "theme_id": 3,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "An interactive matrix mapping all autonomic receptor subtypes to organ targets (eye, heart, lungs, GI, bladder, vasculature); selecting a receptor pulses the corresponding organ in animated rhythm with physiological indicators.",
        "expected_effect": "Provides rapid spatial synthesis of organ system pharmacology across the entire sympathetic and parasympathetic divisions."
    },
    {
        "name": "Cation-Pi and Aromatic Quadrupole Binding Interaction Grid",
        "raw_ids": ["GAM-038", "GAM-031", "TEC-033"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Interactive electron cloud grid demonstrating non-covalent cation-pi attraction between quaternary ammonium cations (acetylcholine, muscarine) and aromatic electron clouds of receptor tryptophan/tyrosine residues.",
        "expected_effect": "Reveals the sub-molecular electrostatic forces responsible for high-affinity drug-receptor binding."
    },
    {
        "name": "Constitutive Receptor Basal Tone & Inverse Agonist Gravity Well",
        "raw_ids": ["GAM-056", "COG-049"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "A two-state receptor equilibrium gravity well (active Ra vs inactive Ri states); demonstrates neutral antagonists (blocking both equally) vs inverse agonists (preferentially stabilizing Ri, reducing basal baseline activity).",
        "expected_effect": "Clarifies the subtle pharmacological distinction between competitive antagonists and inverse agonists."
    },
    {
        "name": "Lipinski Rule of 5 & Topological Polar Surface Area (tPSA) Calculator",
        "raw_ids": ["GAM-059", "TEC-043", "ECO-066"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "A stress-crane widget evaluating Lipinski's Rule of 5 (MW < 500, LogP < 5, H-bond donors < 5, acceptors < 10, tPSA < 140 A^2) as students modify scaffolds, calculating oral bioavailability probability.",
        "expected_effect": "Teaches the core empirical guidelines of drug-likeness used throughout medicinal chemistry."
    },
    {
        "name": "Cardiac Pacemaker M2 Muscarinic Vagal Tone Metronome",
        "raw_ids": ["GAM-062", "COG-051"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "An audio-visual metronome beating to sinoatrial node rhythm; activating M2 muscarinic receptors (Gi opening inward-rectifying K+ channels) hyperpolarizes pacemaker cells and decelerates metronome tempo.",
        "expected_effect": "Connects intracellular G-protein signaling directly to physiological heart rate slowing."
    },
    {
        "name": "Ester vs Amide Local Anesthetic Metabolic Hydrolysis Stopwatch",
        "raw_ids": ["GAM-063", "COG-056"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "A split-screen stopwatch comparing rapid plasma pseudocholinesterase hydrolysis of ester local anesthetics (procaine, tetracaine) against slow hepatic CYP metabolism of amide local anesthetics (lidocaine, bupivacaine).",
        "expected_effect": "Explains why esters have ultra-short durations and high PABA allergic risk, whereas amides have longer durations and hepatic clearance dependencies."
    },
    {
        "name": "Nicotinic Ligand-Gated Ion Channel Millisecond Gating Visualizer",
        "raw_ids": ["GAM-064", "TEC-058"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Millisecond-scale animation of the pentameric nicotinic acetylcholine receptor (alpha2-beta-gamma-delta) binding two ACh molecules to rotate pore-lining M2 helices, opening an open sodium channel pore.",
        "expected_effect": "Visualizes the fastest receptor signaling class (ionotropic channels, <1ms) compared to metabotropic GPCR cascades."
    },
    {
        "name": "Beta-Arrestin Receptor Internalization & Tachyphylaxis Trapdoor",
        "raw_ids": ["GAM-067", "TEA-100", "TEC-059"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Simulates sustained agonist exposure driving GRK phosphorylation, recruiting beta-arrestin, and uncoupling G-proteins, followed by clathrin-mediated endocytic internalization of receptors through a trapdoor.",
        "expected_effect": "Explains the molecular basis for pharmacological tolerance, tachyphylaxis, and drug withdrawal rebounds."
    },
    {
        "name": "P-Glycoprotein (P-gp) Multidrug Efflux Pump Revolving Door",
        "raw_ids": ["GAM-073", "TEC-044"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Visualizes ATP-dependent P-gp efflux pumps in intestinal enterocytes and the blood-brain barrier actively expelling substrates (digoxin, loperamide) back into the lumen/blood, and demonstrates drug interaction surges under P-gp inhibitors (verapamil).",
        "expected_effect": "Clarifies why loperamide acts purely as an antidiarrheal without CNS opioid effects."
    },
    {
        "name": "Autonomic Airway Mechanics Lung Bellows (M3 Constriction vs Beta-2 Dilation)",
        "raw_ids": ["GAM-069", "COG-066"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Interactive lung bellows showing airway lumen caliber narrowing under M3 parasympathetic stimulation and dilating under Beta-2 sympathomimetic tone, testing bronchodilator selection in asthma vs COPD.",
        "expected_effect": "Anchors pulmonary pharmacology in visible physical airway resistance mechanics."
    },
    {
        "name": "Presynaptic Acetylcholine Synthesis & CHT1 Sodium-Symport Rate-Limiter",
        "raw_ids": ["COG-053", "GAM-053", "COG-079"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Simulates the presynaptic cholinergic terminal: choline uptake via high-affinity choline transporter (CHT1, rate-limiting step), acetylation by ChAT, and vesicular storage via VAChT, tested under hemicholinium-3 challenge.",
        "expected_effect": "Identifies the true biochemical rate-limiting bottleneck in acetylcholine neurotransmission."
    },
    {
        "name": "GPCR Heterotrimeric G-Protein Dissociation Mechanical Lock",
        "raw_ids": ["COG-054", "ADV-077"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Mechanical lock-and-tumbler model of GDP/GTP exchange on the G-alpha subunit, demonstrating alpha-GTP dissociation from beta-gamma dimers and subsequent intrinsic GTPase auto-termination.",
        "expected_effect": "Builds concrete mechanical understanding of the molecular switch governing all GPCR signaling."
    },
    {
        "name": "Methacholine vs Carbachol Steric Hindrance & AChE Resistance Challenge",
        "raw_ids": ["COG-059", "TEA-060"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Compares acetylcholine, methacholine (beta-methyl group providing steric hindrance against AChE hydrolysis and muscarinic selectivity), and carbachol (carbamate group providing complete AChE resistance).",
        "expected_effect": "Teaches fundamental medicinal chemistry strategies for engineering hydrolytic metabolic stability into labile neurotransmitter analogs."
    },
    {
        "name": "Catechol Ring Hydroxyl Oxidation & Storage Instability Sandbox",
        "raw_ids": ["COG-061", "TEA-088"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Simulates ortho-diphenol catechol oxidation by molecular oxygen into colored ortho-quinones and adrenochrome, demonstrating why epinephrine solutions require sodium bisulfite antioxidants and dark amber vials.",
        "expected_effect": "Connects medicinal chemistry oxidation chemistry directly to pharmaceutical formulation and shelf-life storage."
    },
    {
        "name": "Phenylephrine vs Isoproterenol In Vivo Cardiovascular Reflex Matrix",
        "raw_ids": ["COG-070", "COG-078"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Contrasts pure Alpha-1 agonist phenylephrine (raises peripheral resistance -> triggers reflex bradycardia -> cardiac output drops) with pure Beta agonist isoproterenol (drops peripheral resistance via Beta-2 -> triggers direct Beta-1 tachycardia and reflex surge).",
        "expected_effect": "Mastery of the single most notorious cardiovascular pharmacology examination trap."
    },
    {
        "name": "Quantal Dose-Response Population Scatter to Cumulative Sigmoid Assembler",
        "raw_ids": ["COG-045", "GAM-017"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Simulates a population of 100 individuals with varying biological sensitivity thresholds, plotting a Gaussian histogram that mathematically accumulates into the standard cumulative quantal sigmoidal curve.",
        "expected_effect": "Demystifies why quantal dose-response curves take sigmoidal shapes across biological populations."
    },
    {
        "name": "Drug-Target Residence Time & Kinetic Off-Rate (k_off) Energy Slider",
        "raw_ids": ["COG-032", "TEA-098"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Interactive energy barrier slider comparing equilibrium affinity (Kd) with kinetic residence time (t = 1 / k_off), demonstrating why drugs with slow off-rates sustain in vivo pharmacodynamic efficacy long after plasma clearance.",
        "expected_effect": "Introduces modern drug discovery concepts bridging equilibrium thermodynamics to non-equilibrium in vivo kinetics."
    },
    {
        "name": "Orthosteric vs Allosteric Dual-Key Interlock & Modulator Shape-Shifter",
        "raw_ids": ["GAM-050", "GAM-043", "TEA-040"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Dual-socket receptor widget where students dock an endogenous agonist in the orthosteric site while testing positive (PAM) and negative (NAM) allosteric modulators in an adjacent allosteric pocket.",
        "expected_effect": "Illustrates how allosteric drugs fine-tune physiological signaling with reduced overdose toxicity compared to orthosteric agonists."
    },
    {
        "name": "Guanethidine False Neurotransmitter Terminal Depletion",
        "raw_ids": ["GAM-068", "TEA-069"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Simulates guanethidine transported into adrenergic terminals by NET, displacing norepinephrine in vesicles and failing to activate receptors, producing chemical sympathectomy.",
        "expected_effect": "Explains postganglionic adrenergic neuron-blocking drugs."
    },
    {
        "name": "H1 vs H2 Receptor Cross-Talk Bipolar Slider",
        "raw_ids": ["GAM-079", "ADV-044"],
        "theme_id": 3,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "A dual-target slider comparing H1 (Gq allergic and endothelial permeability) and H2 (Gs gastric acid parietal secretion) histamine receptors, demonstrating selective clinical antagonists.",
        "expected_effect": "Contrasts antihistamines for allergies vs gastric ulcer therapies."
    },
    {
        "name": "Bioisostere Black-Market Drug Design Heist Game",
        "raw_ids": ["GAM-093", "TEA-084"],
        "theme_id": 3,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "A gamified scenario where students re-engineer patent-expired drug scaffolds by adding bioisosteric functional modifications to evade metabolic degradation and bypass competitor patents.",
        "expected_effect": "Engages playful creative problem solving in pharmaceutical patent design arounds."
    },
    {
        "name": "Synaptic Neurotransmission Micro-Rhythm Action Game",
        "raw_ids": ["GAM-096", "GAM-085"],
        "theme_id": 3,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "A rhythm-action mini-game where students tap on precise synaptic events (action potential arrival, calcium influx, SNARE vesicle fusion, receptor binding, enzymatic cleavage) in tempo with neural firing frequencies.",
        "expected_effect": "Builds visceral mental models of millisecond synaptic timing and neurotransmitter recycling."
    },
    {
        "name": "Multi-Drug Interaction Cascade Jenga Tower Game",
        "raw_ids": ["GAM-097", "TEA-039"],
        "theme_id": 3,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "A physics tower game where each prescribed medication in an elderly patient adds structural stress; combining CYP inhibitors and narrow-index drugs destabilizes the tower, simulating fatal polypharmacy collapses.",
        "expected_effect": "Dramatizes the cumulative hazard of polypharmacy in geriatric clinical care."
    },
    {
        "name": "Real-Time PK Overdose Dialysis Speedrun Challenge",
        "raw_ids": ["GAM-086", "ADV-087"],
        "theme_id": 3,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "An emergency resuscitation room timer where students must rapidly evaluate a drug's Volume of Distribution and protein binding to determine whether hemodialysis will successfully clear the overdose.",
        "expected_effect": "Cements the clinical rule that hemodialysis is only effective for drugs with small Vd and low protein binding."
    },

    # THEME 4: Usability, Ergonomics & Student Well-Being Extensions
    {
        "name": "Bilingual Medical Terminology Cross-Lingual Code-Switching Retell",
        "raw_ids": ["ADV-060", "TEA-091"],
        "theme_id": 4,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Enables bilingual students to practice explaining pharmacological concepts alternating between formal English clinical terms and Turkish patient counseling vocabulary.",
        "expected_effect": "Bridges academic licensure exam fluency to bedside native patient communication."
    },
    {
        "name": "Anti-Distraction Minimalist Canvas Toggle & Zen Step Timer",
        "raw_ids": ["ADV-078", "ADV-046"],
        "theme_id": 4,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "A focus toggle that hides all sidebars, headers, and badges, presenting only the current interactive step with a non-punitive ambient timer for distraction-free flow.",
        "expected_effect": "Protects students with attention deficit traits from sensory visual overload."
    },
    {
        "name": "Micro-Reward Dopamine-Calibrated Celebrations & Subdued Feedback",
        "raw_ids": ["ADV-048", "ADV-070", "GAM-003"],
        "theme_id": 4,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Employs refined neo-brutalist tactile button sinks (6px drop shadows) and gentle affirmative green tints rather than noisy fireworks or jarring red banners.",
        "expected_effect": "Provides satisfying dopamine affirmation while respecting student dignity and calm."
    },
    {
        "name": "Dynamic Font Size Scaler & Desktop Keyboard Accessibility Controls",
        "raw_ids": ["ADV-018", "ADV-027", "ADV-028"],
        "theme_id": 4,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Allows instant text scaling from 14px to 22px and provides full keyboard shortcuts (1-4 for options, H for hint, Space to advance, arrows for sliders).",
        "expected_effect": "Provides effortless desktop power-user navigation and visual accessibility."
    },
    {
        "name": "Impostor-Resistant Mastery Benchmarks & Exam Relevance Anchors",
        "raw_ids": ["ADV-029", "ADV-015"],
        "theme_id": 4,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Tags every lesson step with its explicit relevance to board exam blueprints (e.g. 'NAPLEX Area 1: Pharmacotherapy', 'EUS Farmakoloji Soru Havuzu'), reassuring students that mastery directly advances licensure.",
        "expected_effect": "Alleviates study anxiety by making syllabus exam relevance transparent."
    },
    {
        "name": "Circadian Brain Fatigue Governor & Micro-Nap Power Reset Timer",
        "raw_ids": ["ADV-085", "ADV-092", "ADV-100"],
        "theme_id": 4,
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Detects late-night study sessions (>1:00 AM) and offers an optional neuro-ergonomic visual rest breathing transition or 20-minute power nap alarm with ambient white noise.",
        "expected_effect": "Counters sleep deprivation and encourages restorative rest essential for memory consolidation."
    },

    # THEME 5: Psychometrics & Analytics Extensions
    {
        "name": "Entropy Reduction-Guided Active Question Querying",
        "raw_ids": ["DAT-072", "DAT-045"],
        "theme_id": 5,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Uses information-theoretic Shannon entropy reduction to select the diagnostic item that will resolve the greatest uncertainty regarding a student's latent ability profile in minimal test steps.",
        "expected_effect": "Accelerates diagnostic placement by 60% compared to random item sequencing."
    },
    {
        "name": "Automated Item Generation (AIG) via Isomorphic Pharmacophore Templates",
        "raw_ids": ["DAT-039", "DAT-078"],
        "theme_id": 5,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Uses algorithmic combinatorial templates that swap chemically equivalent substituents (e.g. meta-chloro for meta-bromo) to generate infinite isomorphic practice items with identical psychometric difficulty.",
        "expected_effect": "Prevents item memorization and question bank exhaustion at zero authoring expense."
    },
    {
        "name": "Latent Class & Transition Analysis for SAR Developmental Stages",
        "raw_ids": ["DAT-049", "DAT-058"],
        "theme_id": 5,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Applies Latent Class Analysis (LCA) and Latent Transition Analysis (LTA) to cluster students into distinct developmental stages of chemical intuition (Novice Memorizer -> Rule Applicator -> Mechanistic Modeler).",
        "expected_effect": "Tracks qualitative leaps in mental models as pharmacy students transition from rote memorization to structural reasoning."
    },
    {
        "name": "Student Trajectory Dynamic Time Warping & Peer Cohort Bands",
        "raw_ids": ["DAT-060", "DAT-074"],
        "theme_id": 5,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Uses Dynamic Time Warping (DTW) on step interaction latencies to cluster students by study pacing styles, displaying private percentile mastery bands stratified by study consistency.",
        "expected_effect": "Provides contextual normative feedback without triggering toxic peer comparison."
    },
    {
        "name": "Knowledge State Vector Projection on 2D Curricular UMAP Manifolds",
        "raw_ids": ["DAT-068", "DAT-089"],
        "theme_id": 5,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Projects a student's multi-dimensional knowledge state vector onto an interactive 2D UMAP curricular constellation map, visualizing mastery terrain, knowledge blind spots, and uncharted topics.",
        "expected_effect": "Transforms abstract progress metrics into an intuitive navigational map of student knowledge."
    },
    {
        "name": "Standard Error of Measurement (SEM) Bounded Progress Visualization",
        "raw_ids": ["DAT-023", "DAT-096"],
        "theme_id": 5,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Renders mastery progress bars with statistical confidence bands representing the psychometric Standard Error of Measurement, distinguishing true skill deficits from random measurement noise.",
        "expected_effect": "Prevents over-interpretation of minor score fluctuations and reinforces scientific measurement honesty."
    },
    {
        "name": "Structural Equation Modeling (SEM) of MedChem Fluency on Pharmacology Success",
        "raw_ids": ["DAT-079", "DAT-097"],
        "theme_id": 5,
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Validates structural causal paths showing that fluency in functional group bioisosterism directly drives a 2.4x increase in pharmacology problem-solving transfer across courses.",
        "expected_effect": "Empirically justifies the curricular integration of Course A (MedChem) with Course B (Pharmacology)."
    },
    {
        "name": "Epistemic Uncertainty Decomposition for Board Certification",
        "raw_ids": ["DAT-087", "DAT-091"],
        "theme_id": 5,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Separates epistemic uncertainty (lack of student knowledge) from aleatoric uncertainty (inherent ambiguity in complex clinical edge cases), aggregating consensus weighting across clinicians.",
        "expected_effect": "Prevents penalizing students on clinical scenarios where expert pharmacologists disagree."
    },

    # THEME 6: Wasm Cheminformatics & Architecture Extensions
    {
        "name": "Client-Side SMILES Canonicalization, Equivalence & Substructure SMARTS Matcher",
        "raw_ids": ["TEC-015", "TEC-026", "TEC-049", "TEC-056"],
        "theme_id": 6,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Executes Morgan canonicalization and subgraph isomorphism graph edit distance checks in JavaScript/Wasm to verify whether a student's drawn molecule is chemically identical to the target scaffold.",
        "expected_effect": "Accepts all chemically valid representations of a molecule regardless of atom ordering or orientation."
    },
    {
        "name": "Web Worker 2D Molecular Coordinate Layout & Canvas Direct Rasterization",
        "raw_ids": ["TEC-010", "TEC-017", "TEC-023"],
        "theme_id": 6,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Offloads force-directed 2D coordinate layout for heterocyclic ring systems to background Web Workers, debouncing parameter slider inputs (<16ms) to prevent UI thread freezing.",
        "expected_effect": "Delivers butter-smooth 60 FPS molecular manipulation on mobile devices."
    },
    {
        "name": "Static Content Security Policy & Cryptographic Verification Integrity Sandbox",
        "raw_ids": ["TEC-030", "TEC-028", "TEC-087"],
        "theme_id": 6,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Enforces a strict Content Security Policy (zero third-party external scripts, strict subresource integrity hashes for all Wasm binaries), protecting student browsers against script injection.",
        "expected_effect": "Guarantees medical platform security, data integrity, and compliance with institutional healthcare standards."
    },
    {
        "name": "Signaling Cascade Directed Acyclic Graph AST Traversal Engine",
        "raw_ids": ["TEC-041", "TEC-055"],
        "theme_id": 6,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Uses Graphlib DAG algorithms to evaluate second-messenger cascade prerequisites, managing ephemeral state transitions for predict-then-reveal sequences without server round-trips.",
        "expected_effect": "Enables complex multi-branch biochemical pathways to evaluate instantaneously in client memory."
    },
    {
        "name": "In-Browser WebAssembly PyMOL/RCSB Subset Pocket Visualizer",
        "raw_ids": ["TEC-095", "TEC-088", "TEC-099"],
        "theme_id": 6,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "A compiled micro-subset of 3D molecular visualization software enabling interactive 3D rotation of receptor binding cavities with AlphaFold backbone distance matrices.",
        "expected_effect": "Brings genuine structural biology research tools directly into undergraduate pharmacy coursework."
    },
    {
        "name": "Hands-Free Whisper-Tiny Voice Answering for Commute Flashcards",
        "raw_ids": ["TEC-094", "TEC-086"],
        "theme_id": 6,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Runs an on-device quantized Whisper speech-to-text model in WebAssembly, transcribing verbal drug answers while students walk or drive with zero cloud audio transmission.",
        "expected_effect": "Unlocks completely hands-free study sessions during walking commutes or dishwashing."
    },
    {
        "name": "Peer-to-Peer Collaborative Pharmacokinetics Lab (WebRTC Data Channels)",
        "raw_ids": ["TEC-089", "ECO-086"],
        "theme_id": 6,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Establishes direct browser-to-browser WebRTC data connections between study partners, allowing collaborative real-time co-manipulation of PK clearance curves with zero database hosting cost.",
        "expected_effect": "Enables interactive pair-programming style collaborative pharmacology study rooms."
    },
    {
        "name": "Dynamic Canvas Membrane Bilayer Diffusion & CSS Houdini Lipids",
        "raw_ids": ["TEC-044", "TEC-068", "TEC-047"],
        "theme_id": 6,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Uses HTML5 Canvas and CSS Houdini custom paint to simulate brownian motion and thermodynamic equilibrium of lipophilic vs hydrophilic drug particles across an animated fluid mosaic lipid bilayer.",
        "expected_effect": "Provides visually captivating, physically grounded intuition for membrane permeability."
    },
    {
        "name": "Session Storage Recovery & Cache-First Vector Asset Pipeline",
        "raw_ids": ["TEC-073", "TEC-076", "ECO-075"],
        "theme_id": 6,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Recovers partial lesson state immediately upon unexpected tab closure and uses a cache-first Service Worker strategy for all vector avatars and badges.",
        "expected_effect": "Guarantees zero lost work and instantaneous page redraws."
    },

    # THEME 7: Economics & Commercial Viability Extensions
    {
        "name": "Standardized Dual-Course Component Architecture & Asset Reuse",
        "raw_ids": ["ECO-030", "ECO-008", "ECO-018"],
        "theme_id": 7,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Builds a unified component library shared 100% across both Course A (MedChem) and Course B (Pharmacology), ensuring that widgets, provenance drawers, and cards require zero redundant codebase maintenance.",
        "expected_effect": "Halves engineering development and maintenance costs while presenting students with an identical, polished UI experience."
    },
    {
        "name": "Bandwidth-Adaptive SMILES Fallback & High-Density Tables",
        "raw_ids": ["ECO-040", "ECO-062", "ECO-070"],
        "theme_id": 7,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Detects network connection quality via Network Information API; on constrained 2G/3G connections, switches from heavy canvas/Wasm renderers to lightweight inline monospace text and high-density pKa comparison tables.",
        "expected_effect": "Maintains 100% pedagogical utility in low-bandwidth rural clinical rotation settings."
    },
    {
        "name": "Instructor Student Misconception Heatmap Portal",
        "raw_ids": ["ECO-054", "ECO-093"],
        "theme_id": 7,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Provides university pharmacology faculty with an anonymized dashboard displaying aggregate student misconception heatmaps across their classes, highlighting topics requiring classroom reinforcement.",
        "expected_effect": "Creates powerful B2B institutional sales appeal and drives professor-mandated student adoption."
    },
    {
        "name": "Third-Party Pixel Hygiene & Zero-Database Progress Synchronization",
        "raw_ids": ["ECO-063", "ECO-002", "ECO-057"],
        "theme_id": 7,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Eliminates all third-party tracking pixels to protect student privacy and Brave Shields compliance; debounces progress sync via URL hashes and local IndexedDB, saving cloud database writes.",
        "expected_effect": "Reduces cloud database read/write costs by 95% while complying with strict browser privacy shields."
    },
    {
        "name": "Pre-Structured Drug Interaction & Reflex Rule Trees",
        "raw_ids": ["ECO-064", "ECO-056", "ECO-073"],
        "theme_id": 7,
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Compiles pharmacological drug interactions and autonomic reflex trees into compact static JSON lookup trees pre-filtered at build time, eliminating database queries during simulation.",
        "expected_effect": "Delivers instant zero-latency simulation responses with zero cloud execution costs."
    },
    {
        "name": "Campus Gamified Hall of Fame Leaderboard without Cloud State",
        "raw_ids": ["ECO-091", "ECO-092", "ECO-095"],
        "theme_id": 7,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Implements local zero-cloud peer challenge verification via cryptographic QR challenge tokens, throttling battery-intensive micro-interactions when device battery falls below 20%.",
        "expected_effect": "Encourages campus study competition while protecting student battery life and eliminating cloud server costs."
    },
    {
        "name": "Ephemeral Single-File Offline Learning PWA & Bluetooth Flashcard Buzzer",
        "raw_ids": ["ECO-097", "ECO-099", "ECO-100"],
        "theme_id": 7,
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Packages complete high-yield review modules into a single self-contained HTML/JS file runnable from a USB flash drive or offline PWA, featuring a Web-Bluetooth flashcard buzzer mode for study group tournaments.",
        "expected_effect": "Enables completely autonomous, server-independent communal learning tournaments."
    },
    {
        "name": "Automated Transpile-Time CSS Purging & Zero-RTT Static Shells",
        "raw_ids": ["ECO-053", "ECO-079", "ECO-074"],
        "theme_id": 7,
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Runs aggressive build-time Tailwind CSS purging and inlines critical styling, using CSS transforms for 150ms micro-lifts and providing immediate client-side error diagnosis for distractor clicks.",
        "expected_effect": "Guarantees tiny bundle sizes (<80KB initial CSS/JS payload) and sub-second First Contentful Paint."
    }
]

# Add additional clusters
for c in ADDITIONAL_CLUSTERS:
    base_theme_map[c['theme_id']].append(c)

# Now audit all IDs!
all_assigned = set()
duplicates = []
cluster_id_counter = 1
final_consolidated_list = []

for tid in range(1, 8):
    for c in base_theme_map[tid]:
        cid = f"CON-{cluster_id_counter:03d}"
        cluster_id_counter += 1
        c['id'] = cid
        c['theme_id'] = tid
        for rid in c['raw_ids']:
            if rid in all_assigned:
                duplicates.append((rid, cid))
            all_assigned.add(rid)
        c['contributing_seat_count'] = len(set(rid[:3] for rid in c['raw_ids']))
        c['contributing_seats'] = sorted(c['raw_ids'])
        final_consolidated_list.append(c)

print(f"\nFinal Audit:")
print(f"Total Consolidated Ideas: {len(final_consolidated_list)}")
print(f"Total Unique Raw IDs Assigned: {len(all_assigned)}")
missing = set(all_raw_ideas.keys()) - all_assigned
print(f"Missing Raw IDs: {len(missing)}")
if missing:
    print(f"Missing IDs sample: {sorted(missing)[:10]}")
if duplicates:
    print(f"Duplicates: {len(duplicates)}")

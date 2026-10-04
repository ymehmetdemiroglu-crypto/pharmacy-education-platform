# Theme 3: Active Interactivity, Widgets & Molecular Manipulation
# Focus: Interactive widgets, pharmacophore mapping, bioisostere swappers, dose-response log-dose sliders, AChE catalytic triad hydrolysis, baroreceptor reflex loops, autonomic organ seesaws, pKa ionization chambers, receptor reserve sliders, Dale's reversal, partial agonism, chirality, suicide inhibitors.

THEME_3_CLUSTERS = [
    {
        "name": "Tactile Log-Dose Step Slider & Real-Time Emax/EC50 Curve Manipulator",
        "raw_ids": ["GAM-001", "COG-033", "TEA-022", "GAM-009", "GAM-010", "GAM-039", "ECO-001", "ECO-028"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "A discrete logarithmic dose slider with physical half-log step detents that dynamically morphs the sigmoidal Hill curve, demonstrating the distinction between competitive right-shifts (EC50 increase without Emax change) and non-competitive ceiling drops.",
        "expected_effect": "Anchors abstract mathematical dose-response parameters in direct physical manipulation, preventing the ubiquitous potency vs efficacy misconception."
    },
    {
        "name": "Split-Screen Bioisosteric Replacement Sandbox with Real-Time Delta Readout",
        "raw_ids": ["TEA-003", "GAM-006", "GAM-035", "GAM-045", "ADV-056", "COG-046", "TEC-039", "ECO-052"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Drag-and-drop replacement of functional groups (e.g. ester to amide, carboxylic acid to tetrazole) on a split-screen canvas that instantly updates calculated LogP, pKa, metabolic half-life, and predicted receptor binding affinity.",
        "expected_effect": "Transforms abstract bioisosteric rules into immediate cause-and-effect discoveries, showing why bioisosteres enhance pharmacokinetic stability while preserving target binding."
    },
    {
        "name": "AChE Catalytic Triad Hydrolysis & Organophosphate Aging Time-Stepper",
        "raw_ids": ["COG-001", "COG-050", "COG-056", "COG-071", "TEA-014", "TEA-034", "GAM-021", "GAM-081"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Interactive step-by-step molecular animation of acetylcholinesterase active site (Ser203, His447, Glu334), showing normal sub-millisecond acetylcholine hydrolysis vs covalent organophosphate phosphorylation and irreversible dealkylation (aging), complete with pralidoxime (2-PAM) rescue timing.",
        "expected_effect": "Provides visual mechanistic clarity on the precise window for oxime antidote efficacy before covalent aging occurs."
    },
    {
        "name": "Autonomic Dual-Tone Vector Balance & Baroreceptor Reflex Dynamic Seesaw",
        "raw_ids": ["COG-035", "COG-060", "TEA-044", "TEA-056", "GAM-004", "GAM-028", "GAM-033", "ADV-051"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "A dynamic vector seesaw modeling sympathetic vs parasympathetic baseline organ tone, demonstrating blood pressure regulation, baroreceptor afferent firing latencies, and compensatory reflex bradycardia/tachycardia under vasoactive drug infusion.",
        "expected_effect": "Demystifies the counterintuitive cardiovascular reflexes that confuse students when comparing peripheral vascular resistance to net heart rate."
    },
    {
        "name": "Dynamic Henderson-Hasselbalch pH-Compartment Ionization & Permeability Chamber",
        "raw_ids": ["COG-040", "TEA-005", "GAM-005", "GAM-014", "ADV-061", "TEC-002", "ECO-022"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Interactive two-compartment simulation (e.g. stomach pH 1.5 vs plasma pH 7.4, or plasma vs urine) where a pH slider dynamically calculates ionized vs non-ionized drug fractions, visually demonstrating passive lipid membrane diffusion and ion trapping.",
        "expected_effect": "Solidifies the pH-partition hypothesis and provides immediate conceptual justification for clinical drug overdose urine alkalinization."
    },
    {
        "name": "Spare Receptor Reserve & Irreversible Antagonist Alkylation Slider",
        "raw_ids": ["COG-055", "TEA-038", "GAM-036", "GAM-077"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Sliders that simulate alkylating irreversible antagonists (phenoxybenzamine) progressively destroying total receptor pool, demonstrating that maximal biological response persists until receptor reserve is completely exhausted.",
        "expected_effect": "Resolves the persistent student confusion between receptor binding occupancy and maximal downstream tissue response."
    },
    {
        "name": "Schild Plot Linearization & pA2 Determination Morphing Widget",
        "raw_ids": ["COG-039", "GAM-027", "TEC-052"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Interactive widget that plots dose ratios at varying competitive antagonist concentrations, dynamically morphing the sigmoidal curve shifts into a linear Schild regression with real-time slope and x-intercept (pA2) determination.",
        "expected_effect": "Bridges visual dose-response curves directly to quantitative pharmacodynamic antagonist classification."
    },
    {
        "name": "Dale's Vasomotor Reversal & Epinephrine Multi-Receptor Switchboard",
        "raw_ids": ["COG-074", "TEA-066", "GAM-034", "GAM-057", "GAM-088"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Simulates arterial blood pressure responses to epinephrine alone vs epinephrine following alpha-blocker (phentolamine) administration, revealing the unmasked Beta-2 mediated vasodepressor effect.",
        "expected_effect": "Anchors one of the most classic and heavily tested board exam concepts in memorable, interactive hemodynamics."
    },
    {
        "name": "Two-Compartment Pharmacokinetic Liquid Flow & Dye Dilution Simulator",
        "raw_ids": ["COG-044", "GAM-037", "GAM-074", "TEC-003", "TEC-061"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Animated hydraulic model with central and peripheral tissue reservoirs governed by differential flow rate valves, plotting plasma concentration vs time curves in real-time as distribution (alpha) and elimination (beta) phases unfold.",
        "expected_effect": "Gives concrete physical reality to multi-exponential pharmacokinetic decay curves without intimidating differential calculus."
    },
    {
        "name": "Adrenoceptor Cardioselective Concentration Window Dial (Beta-1 vs Beta-2)",
        "raw_ids": ["COG-047", "TEA-053", "GAM-060", "COG-066"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Concentration slider showing selective Beta-1 blockade (metoprolol) at therapeutic doses transitioning into non-selective Beta-2 blockade and airway bronchospasm at supratherapeutic concentrations.",
        "expected_effect": "Teaches the vital clinical lesson that receptor selectivity is concentration-dependent, not an absolute property."
    },
    {
        "name": "Quaternary Ammonium Charge Shielding & Blood-Brain Barrier Sieve",
        "raw_ids": ["COG-048", "TEA-070", "GAM-022", "TEA-032"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Compares tertiary amine atropine (neutral at equilibrium, crosses BBB causing central hallucinations) with quaternary ammonium ipratropium (permanently charged, blocked at BBB) across an interactive endothelial membrane sieve.",
        "expected_effect": "Demonstrates how formal ionic charge governs peripheral vs central pharmacological side-effect profiles."
    },
    {
        "name": "Muscarinic SLUDGEM Toxidrome Multi-Organ Checklist & Syndrome Animator",
        "raw_ids": ["COG-018", "GAM-025", "TEA-051", "ADV-025"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "An interactive anatomical organ avatar that lights up organ-by-organ as muscarinic hyperactivation (Salivation, Lacrimation, Urination, Defecation, GI upset, Emesis, Miosis/Bronchorrhea) escalates under toxic pesticide exposure.",
        "expected_effect": "Solidifies the classic clinical toxidrome mnemonic through enactive, whole-body physiological visualization."
    },
    {
        "name": "Covalent Suicide Inhibitor Warhead Trapping (Aspirin COX Serine Acetylation)",
        "raw_ids": ["TEA-055", "GAM-041", "GAM-099", "COG-055"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Visualizes the chemical mechanism of aspirin irreversibly transferring its acetyl group to Ser529 in COX-1, permanently blocking arachidonic acid channel access for the lifetime of the platelet.",
        "expected_effect": "Clarifies why aspirin platelet inhibition lasts 7-10 days despite a plasma half-life of only 15-20 minutes."
    },
    {
        "name": "First-Pass Hepatic Portal Extraction & Oral vs IV Bioavailability Slicer",
        "raw_ids": ["COG-068", "TEA-035", "GAM-011", "GAM-026", "ADV-073"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Interactive anatomical schematic tracking drug passage from gut lumen through mesenteric veins into hepatic portal vein and CYP metabolism, calculating net bioavailability (F = f x (1 - ER)) with an interactive extraction ratio slicer.",
        "expected_effect": "Eliminates confusion between gastrointestinal absorption fraction (fa) and systemic bioavailability (F)."
    },
    {
        "name": "Tyramine Cheese Effect Hypertensive Crisis Simulator",
        "raw_ids": ["COG-080", "TEA-074", "GAM-066"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Simulates dietary tyramine ingestion under baseline MAO-A inhibition, showing failure of gut wall degradation, vesicular displacement of norepinephrine via VMAT2, and subsequent life-threatening alpha-1 hypertensive surge.",
        "expected_effect": "Connects fundamental neurochemistry and enzyme kinetics directly to high-risk clinical food-drug interactions."
    },
    {
        "name": "Chiral Enantiomer 3D Handshake & Eutomer Mirror-Flip Carousel",
        "raw_ids": ["COG-041", "TEA-046", "GAM-029", "TEC-072"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Interactive 3D model that rotates enantiomeric pairs (e.g. R- vs S-albuterol, omeprazole vs esomeprazole) against a 3-point pharmacophore receptor pocket (Easson-Stedman hypothesis), showing why the distomer fails to establish critical hydrogen bonding.",
        "expected_effect": "Provides intuitive spatial clarity on why single-enantiomer drugs exhibit superior potency and reduced adverse effects."
    },
    {
        "name": "Catecholamine Biosynthesis, Storage & Reuptake Transport Cascade",
        "raw_ids": ["COG-038", "COG-057", "COG-073", "TEA-069", "GAM-076"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "A synaptic terminal sandbox modeling tyrosine hydroxylase rate-limiting synthesis, VMAT2 vesicle packaging, exocytosis, NET reuptake, and reverse-transport efflux caused by amphetamines.",
        "expected_effect": "Unifies presynaptic adrenergic neurochemistry into a single interactive mechanical circuit."
    },
    {
        "name": "Partial Agonist Buprenorphine Precipitated Withdrawal Displacement Pin",
        "raw_ids": ["TEA-047", "GAM-016", "GAM-075"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Demonstrates high-affinity partial agonist buprenorphine binding to mu-opioid receptors, physically displacing full agonists (morphine/methadone) and dropping net intrinsic activity, precipitating acute withdrawal.",
        "expected_effect": "Explains the dual nature of partial agonists (acting as agonists alone, but functional antagonists in the presence of full agonists)."
    },
    {
        "name": "Therapeutic Index & Margin of Safety Elastic Hazard Buffer",
        "raw_ids": ["COG-058", "TEA-027", "GAM-012", "GAM-051", "ADV-064", "ECO-059"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Visualizes ED50 and TD50 / LD50 curves with an elastic margin buffer gauge, comparing narrow therapeutic index drugs (warfarin, digoxin, lithium) against wide therapeutic index agents (penicillin).",
        "expected_effect": "Instills lifelong safety awareness regarding narrow therapeutic index drugs and therapeutic drug monitoring requirements."
    },
    {
        "name": "Michaelis-Menten & Lineweaver-Burk Kinetic Fulcrum Lever",
        "raw_ids": ["COG-072", "GAM-048", "TEC-022"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Double-reciprocal plot manipulator with a mechanical fulcrum lever showing how competitive inhibitors rotate the slope around the 1/Vmax y-axis intercept, whereas non-competitive inhibitors pivot around the -1/Km x-axis intercept.",
        "expected_effect": "Bridges graphical enzyme kinetics directly to competitive vs allosteric drug binding mechanisms."
    },
    {
        "name": "Neuromuscular Junction Depolarizing vs Non-Depolarizing Twitch Comparator",
        "raw_ids": ["TEA-078", "GAM-054", "COG-062"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Simulates neuromuscular nicotinic receptor stimulation under succinylcholine (initial fasciculation followed by persistent depolarizing block) vs rocuronium (competitive non-depolarizing flaccid paralysis reversible by neostigmine).",
        "expected_effect": "Prevents catastrophic confusion between phase I/II depolarizing blockade and competitive neuromuscular blockade in emergency intubation pharmacology."
    },
    {
        "name": "CYP450 Enzyme Induction vs Inhibition Kinetic Mixer & Interaction Timeline",
        "raw_ids": ["TEA-045", "GAM-058", "TEA-057", "TEC-046"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "A timetable slider illustrating immediate enzymatic competition (ketoconazole CYP3A4 inhibition) vs delayed transcriptional protein synthesis upregulation (rifampin CYP3A4 induction taking 7-14 days).",
        "expected_effect": "Teaches students why drug interactions have distinct clinical onsets and offsets depending on mechanistic classification."
    },
    {
        "name": "Prodrug Enzymatic Cleavage Scissors & Latency Estimator",
        "raw_ids": ["TEA-043", "TEA-076", "GAM-065"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Visualizes ester prodrug bioactivation (e.g. enalaprilat to enalapril, valacyclovir to acyclovir) with an enzymatic scissors widget demonstrating how metabolic latentiating moieties overcome GI absorption barriers.",
        "expected_effect": "Clarifies medicinal chemistry rationale for prodrug formulation over active parent administration."
    },
    {
        "name": "Loading Dose vs Maintenance Dose Target-Concentration Syringe Balancer",
        "raw_ids": ["TEA-077", "GAM-061", "TEC-080"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Dual-syringe interactive widget where the student balances Volume of Distribution (governing loading dose: LD = Cp x Vd) against Clearance (governing maintenance rate: MD = Cp x CL x tau) to achieve steady-state without toxic overshoot.",
        "expected_effect": "Eliminates formula swapping errors on fundamental pharmacokinetics board exam calculations."
    },
    {
        "name": "Ocular Autonomic Mechanics Aperture Wheel (M3 Sphincter vs Alpha-1 Dilator)",
        "raw_ids": ["COG-037", "TEA-061", "GAM-046", "GAM-070"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "A pupil aperture wheel demonstrating circular iris sphincter muscle (M3 muscarinic miosis and trabecular outflow in glaucoma) vs radial pupillary dilator muscle (Alpha-1 adrenergic mydriasis).",
        "expected_effect": "Provides geometric visual intuition for autonomic pharmacology of glaucoma and ophthalmologic diagnostics."
    },
    {
        "name": "Plasma Protein Binding Displacement Crisis Simulator (Albumin Sponge)",
        "raw_ids": ["TEA-057", "GAM-052"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "An interactive albumin sponge displaying 99% bound drug (e.g. warfarin); dropping in a competing sulfonamide displaces just 1% of bound drug, instantly doubling free active drug concentration from 1% to 2% and triggering bleeding alarms.",
        "expected_effect": "Dramatically illustrates why high protein-bound drugs with narrow therapeutic indices carry catastrophic displacement interaction risks."
    },
    {
        "name": "Zero-Order Saturation Kinetics Inflection Point Simulator (Phenytoin Clearance)",
        "raw_ids": ["TEA-063", "GAM-100"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "A dosage vs plasma concentration plotter demonstrating the transition from first-order linear elimination to saturable zero-order (Michaelis-Menten) kinetics, showing how small dose increments cause non-linear toxic concentration spikes.",
        "expected_effect": "Builds acute clinical vigilance for drugs exhibiting capacity-limited elimination within therapeutic ranges."
    },
    {
        "name": "Botulinum Toxin vs Black Widow Spider Venom Synaptic Sandbox",
        "raw_ids": ["COG-077", "GAM-078"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Synaptic wire-cutter simulating botulinum toxin cleaving SNARE proteins (SNAP-25/syntaxin) to prevent vesicle fusion vs latrotoxin causing uncontrolled calcium influx and explosive acetylcholine discharge.",
        "expected_effect": "Contrasts presynaptic neurotoxin mechanisms with distinct clinical presentations (flaccid paralysis vs severe tetanic spasms)."
    },
    {
        "name": "Volume of Distribution (Vd) Tissue Sequestration Sump Chamber",
        "raw_ids": ["COG-052", "TEA-052", "GAM-074"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Physical multi-chamber reservoir illustrating how lipophilic drugs with massive tissue sequestration (chloroquine, amiodarone) exhibit apparent Vd values (e.g. 1000 L) exceeding total body water volume (42 L).",
        "expected_effect": "Dissolves the misconception that Volume of Distribution is a literal anatomical volume rather than a mathematical proportionality constant."
    },
    {
        "name": "Multi-Target Polypharmacology Radar Chart: Carvedilol Cardiovascular Profile",
        "raw_ids": ["TEA-080", "TEC-071"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "An interactive radar chart plotting binding affinity across Alpha-1, Beta-1, and Beta-2 receptors, allowing students to inspect carvedilol's combined vasodilatory and cardioprotective hemodynamic profile.",
        "expected_effect": "Expands students' perspective beyond single-receptor reductionism to complex real-world polypharmacology."
    },
    {
        "name": "Forensic Autopsy Pharmacological Whodunit Chamber",
        "raw_ids": ["TEA-095", "GAM-090", "COG-086"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "A mystery clinical case chamber presenting autopsy toxicology and physiological vital traces; students must reverse-engineer the chemical scaffold and receptor profile of the lethal toxin.",
        "expected_effect": "Synthesizes diagnostic pharmacology, toxicology, and structure-activity relationships into an engaging investigative case."
    },
    {
        "name": "Auditory Affinity: Molecular Binding Sonification & Acoustic Feedback",
        "raw_ids": ["GAM-082", "COG-093", "TEC-097"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "Maps drug-receptor binding kinetics and autonomic sympathetic/parasympathetic tone to synthesized harmonic auditory frequencies (WebAudio API), sonifying Kd affinity and receptor activation.",
        "expected_effect": "Provides a secondary sensory modality for developing intuitive grasp of binding energetics and autonomic balance."
    },
    {
        "name": "Anaphylactic Shock Multi-Organ Cockpit Simulator",
        "raw_ids": ["GAM-089", "TEA-031"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "A high-intensity cockpit dashboard displaying crashing mean arterial pressure and airway resistance during severe anaphylaxis; students titrate intramuscular epinephrine, monitoring alpha-1 vasoconstriction, beta-1 cardiac rescue, and beta-2 bronchodilation in real time.",
        "expected_effect": "Prepares students for high-stress emergency pharmacology decision-making and rationale for epinephrine as first-line drug of choice."
    },
    {
        "name": "Molecular Sculptor: Engineering Subtype Selectivity from Non-Selective Agonists",
        "raw_ids": ["TEA-096", "COG-075"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Students modify epinephrine's scaffold by extending N-alkyl substituents (e.g. from methyl to isopropyl to t-butyl) to exploit steric and hydrophobic pocket depth in adrenergic receptors, carving Beta-2 selectivity over Alpha-1.",
        "expected_effect": "Transforms medicinal chemistry SAR from passive memorization into creative, goal-directed molecular engineering."
    },
    {
        "name": "High-Stakes Timed Misconception Escape Room Gauntlet",
        "raw_ids": ["GAM-091", "GAM-083"],
        "tier": "wild",
        "evidence_tag": "speculative",
        "mechanism": "A 10-minute timed sprint through interconnected clinical puzzles where each door lock requires diagnosing a tricky pharmacotherapy misconception; errors trigger time-penalties and diagnostic hints.",
        "expected_effect": "Builds rapid problem-solving fluency and stress tolerance ahead of high-stakes board licensure examinations."
    }
]

print(f"Theme 3 loaded: {len(THEME_3_CLUSTERS)} clusters.")
total_ids = sum(len(c['raw_ids']) for c in THEME_3_CLUSTERS)
print(f"Total raw IDs in Theme 3: {total_ids}")

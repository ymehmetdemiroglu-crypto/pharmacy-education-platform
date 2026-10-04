const fs = require('fs');
const path = require('path');

const ideas = [
  // --- PROVEN / CONVENTIONAL (30) ---
  {
    id: "GAM-001",
    name: "Log-Dose Tactile Step Slider",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Logarithmic dose slider with tactile discrete notches at each half-log step (10^-9 to 10^-4 M) updating a sigmoidal E/[A] curve in real-time",
    expected_effect: "Prevents arithmetic scale misinterpretation by anchoring visual EC50 to physical slider resistance"
  },
  {
    id: "GAM-002",
    name: "Predict-Before-Reveal Curve Stamp",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Student clicks on a blank Cartesian plane to drop a predicted EC50 coordinate stamp before releasing an antagonist, disabling the Reveal button until placed",
    expected_effect: "Forces active cognitive commitment and exposes potency vs efficacy misconceptions prior to feedback"
  },
  {
    id: "GAM-003",
    name: "Neo-Brutalist Hard-Shadow Button Commitment",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Multiple-choice diagnostic options sink 6px on selection with a 3px stark border, locking choice state before showing color-coded rationale",
    expected_effect: "Provides unmistakable physical affordance of consequence and eliminates accidental skipping during rapid-fire concept checks"
  },
  {
    id: "GAM-004",
    name: "Dual-State Autonomic Toggle Switch",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Heavy mechanical rocker switch flipping between Sympathetic (Thoracolumbar/Adrenergic) and Parasympathetic (Craniosacral/Cholinergic) dominant tone across all 12 effector organs simultaneously",
    expected_effect: "Resolves dual-innervation confusion through instant comparative system-wide visual toggle"
  },
  {
    id: "GAM-005",
    name: "pKa pH-Compartment Dial",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Stepped rotational dial simulating movement of a weak acid (e.g., aspirin, pKa 3.5) from stomach (pH 1.5) to duodenum (pH 6.5) to plasma (pH 7.4), dynamically updating Henderson-Hasselbalch un-ionized/ionized ratio fractions",
    expected_effect: "Establishes physical intuition for lipid membrane permeability and the ion-trapping phenomenon"
  },
  {
    id: "GAM-006",
    name: "Instant Bioisostere Split-Screen Comparison",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Synchronized side-by-side view where dragging a functional group replacement (e.g., -OH to -NH2) highlights shifts in LogP, H-bond count, and target binding affinity in real-time",
    expected_effect: "Prevents memorization of isolated SAR tables by linking structural mutation directly to physicochemical property shifts"
  },
  {
    id: "GAM-007",
    name: "Receptor Subtype Radio Matrix with Instant Organ Visualizer",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Interactive grid mapping alpha-1, alpha-2, beta-1, beta-2 to heart, bronchi, and arterioles, where selecting an agonist highlights target tissue activation and dims unexpressed sites",
    expected_effect: "Eliminates off-target vs on-target confusion in adrenergic receptor pharmacology"
  },
  {
    id: "GAM-008",
    name: "Concentration Step-Ladder Infusion Gauge",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Vertical liquid fill gauge showing drug plasma accumulation with each repeat dose, displaying peak, trough, and steady-state plateaus after 4-5 half-lives",
    expected_effect: "Visualizes dosing frequency effects on accumulation ratio without requiring differential equations"
  },
  {
    id: "GAM-009",
    name: "Competitive Antagonist Right-Shift Scrubber",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Horizontal scrubber increasing fixed antagonist concentration [B] that smoothly shifts the agonist dose-response curve rightward while locking Emax to 100%",
    expected_effect: "Solidifies understanding that surmountable competitive antagonism affects potency (EC50) but preserves maximal efficacy"
  },
  {
    id: "GAM-010",
    name: "Noncompetitive Antagonist Ceiling Pull-Down",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Draggable ceiling bar representing receptor reserve exhaustion that depresses curve Emax downward while keeping baseline EC50 constant",
    expected_effect: "Anchors non-surmountable allosteric/irreversible inhibition visually as an efficacy ceiling collapse rather than a potency shift"
  },
  {
    id: "GAM-011",
    name: "Bioavailability Fraction Visual Slicer",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Interactive pill dissection widget where slicing an oral tablet segments the dose into unabsorbed fecal fraction, gut-wall metabolized fraction, and hepatic first-pass extraction fraction",
    expected_effect: "Imparts clear mechanical understanding of F = f * (1 - E_H) before clinical dosage calculations"
  },
  {
    id: "GAM-012",
    name: "Therapeutic Window Zone Highlighter",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Dual-boundary vertical threshold slider displaying MEC (minimum effective concentration) and MTC (minimum toxic concentration), tinting the area between green and exterior zones yellow/red",
    expected_effect: "Prevents narrow therapeutic index (NTI) drug overdosing errors by clearly framing the safety margin"
  },
  {
    id: "GAM-013",
    name: "3-Tier Hint Accordion with Cognitive Cost Counter",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Accordion drawer revealing progressive scaffolding (Tier 1: Nudge, Tier 2: Conceptual Clue, Tier 3: Worked Solution) while displaying an explicit cognitive effort indicator",
    expected_effect: "Encourages productive struggle by making hint dependency salient without punitive grade deductions"
  },
  {
    id: "GAM-014",
    name: "Ionization State Micro-Toggle at Physiological pH",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Binary protonation toggle (HA <-> A- + H+ or BH+ <-> B + H+) updating molecule net charge and lipid bilayer transit lock",
    expected_effect: "Prevents confusion regarding the differential charge states of weak acids vs weak bases at physiological pH 7.4"
  },
  {
    id: "GAM-015",
    name: "Half-Life Decay Stepper with Residual Pellet Counter",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Step-by-step clicker advancing time in units of t1/2, halving discrete radioactive drug pellets (100 -> 50 -> 25 -> 12.5 -> 6.25%) with synchronized percentage chips",
    expected_effect: "Builds concrete mental model of first-order exponential elimination mechanics"
  },
  {
    id: "GAM-016",
    name: "Partial Agonist Intrinsic Activity Lever",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Vertical throttle lever controlling intrinsic activity (alpha = 0 to 1.0), smoothly morphing the curve from neutral antagonist (alpha=0) to partial agonist (alpha=0.5) to full agonist (alpha=1.0)",
    expected_effect: "Disentangles affinity from efficacy by isolating the magnitude of receptor stimulus per binding event"
  },
  {
    id: "GAM-017",
    name: "Organ Bath Baseline Calibration Knob",
    tier: "proven",
    evidence_tag: "plausible",
    mechanism: "Rotary knob zeroing tension baseline on an isolated guinea pig ileum transducer before applying acetylcholine challenge doses",
    expected_effect: "Replicates practical wet-lab muscle contraction experimentation without lab overhead"
  },
  {
    id: "GAM-018",
    name: "Hydrogen Bond Donor/Acceptor Hover Spotlight",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Interactive cursor spotlight that illuminates matching H-bond donors (blue) and acceptors (red) on a 2D ligand and receptor cleft upon hover",
    expected_effect: "Develops rapid visual parsing of pharmacophoric binding interactions in medicinal chemistry"
  },
  {
    id: "GAM-019",
    name: "Adrenergic Flight-or-Fight Organ Pulse Animator",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Interactive anatomical silhouette with pulsing heart rate, dilated airways, and peripheral vasoconstriction responding to graded norepinephrine doses",
    expected_effect: "Connects molecular adrenergic receptor binding to macroscopic organ-system physiological fight-or-flight responses"
  },
  {
    id: "GAM-020",
    name: "Clearance vs Volume of Distribution Dual-Slider",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Linked two-slider console where adjusting CL and Vd dynamically stretches or compresses the calculated half-life formula (t1/2 = 0.693 * Vd / CL)",
    expected_effect: "Dismantles the pervasive misconception that half-life is a fundamental independent pharmacokinetic parameter"
  },
  {
    id: "GAM-021",
    name: "Acetylcholinesterase Enzyme-Substrate Snap Card",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Two-piece jigsaw card requiring learner to snap acetylcholine's ester carbonyl and quaternary ammonium into catalytic triad and anionic sub-sites",
    expected_effect: "Demonstrates spatial two-point binding requirements of cholinesterase before introducing organophosphate toxicity"
  },
  {
    id: "GAM-022",
    name: "LogP Hydrophobic Lipid Bilayer Partition Slider",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Octanol/water two-phase beaker widget where adjusting substituent lipophilicity (pi values) redistributes drug molecules between aqueous and lipid layers",
    expected_effect: "Grounds partition coefficient (LogP) in tangible physical separation rather than abstract logarithmic math"
  },
  {
    id: "GAM-023",
    name: "Misconception Choice Shake & Snapback Animation",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Erroneous multiple-choice cards execute a subtle 4px horizontal shake and snapback with immediate pink-tinted diagnostic feedback targeting the exact misconception",
    expected_effect: "Provides immediate non-punitive corrective feedback that breaks habitual erroneous guessing patterns"
  },
  {
    id: "GAM-024",
    name: "Steady-State Accumulation Dose-Interval Scrubber",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Interactive timeline scrubber varying dosing interval (tau) relative to t1/2, demonstrating drug accumulation when tau < t1/2 and wide peak-trough swings when tau > t1/2",
    expected_effect: "Teaches optimal dosing regimen design through visual dynamic feedback"
  },
  {
    id: "GAM-025",
    name: "Muscarinic SLUDGE Symptom Checklist Checkbox Chain",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Interactive diagnostic symptom tracker where checking off SLUDGE manifestations (Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis) illuminates corresponding hyperactive M2/M3 pathways",
    expected_effect: "Cements parasympathetic toxidrome pattern recognition through structured clinical symptom clustering"
  },
  {
    id: "GAM-026",
    name: "First-Pass Hepatic Portal Extraction Gate",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Animated flow valve redirecting oral portal vein transit through hepatic CYP enzymes, calculating systemic delivery (1 - E_H) vs IV direct circulation",
    expected_effect: "Clarifies why drugs like nitroglycerin or propranolol require vastly higher oral doses compared to sublingual/IV routes"
  },
  {
    id: "GAM-027",
    name: "Schild Plot Slope Ruler Tool",
    tier: "proven",
    evidence_tag: "plausible",
    mechanism: "Calibrated angle ruler tool that student drags across four right-shifted curves to compute dose ratios [DR] and draw the linear Schild regression line",
    expected_effect: "Demystifies the mathematical derivation of competitive antagonist affinity (pA2 / -log KB) through hands-on graphical measurement"
  },
  {
    id: "GAM-028",
    name: "Baroreceptor Reflex Blood Pressure Compensator Gauge",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Dual-pointer dial displaying primary drug-induced vascular resistance changes alongside delayed compensatory reflex heart rate adjustment (e.g. reflex tachycardia with hydralazine)",
    expected_effect: "Prevents the classic error of confusing direct drug pharmacology with homeostatic autonomic reflex responses"
  },
  {
    id: "GAM-029",
    name: "Optical Isomer Mirror Flip Carousel",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "3D flip card rotating chiral enantiomers (e.g., (R)- vs (S)-epinephrine) into a planar three-point receptor binding template (Easson-Stedman hypothesis)",
    expected_effect: "Demonstrates stereoselective receptor affinity by visually proving that only one enantiomer can align all three pharmacophore groups"
  },
  {
    id: "GAM-030",
    name: "Renal Excretion Urine pH Proton-Trap Toggle",
    tier: "proven",
    evidence_tag: "evidence-backed",
    mechanism: "Acid/base toggle switch for urine pH (pH 5.0 vs pH 8.0) showing sodium bicarbonate alkalinization trapping ionized phenobarbital in urine to accelerate elimination",
    expected_effect: "Teaches toxicological urine ion-trapping through direct manipulation of ionization and tubular reabsorption"
  },

  // --- ADJACENT (50) ---
  {
    id: "GAM-031",
    name: "Receptor Affinity Spring-Snap Pocket",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Dragging a drug molecule into a receptor binding pocket provides dynamic SVG tension line feedback proportional to Ki value, snapping in tightly when affinity is high",
    expected_effect: "Gives visceral tactile intuition for binding affinity before numerical dissociation constants are introduced"
  },
  {
    id: "GAM-032",
    name: "Bezier Curve Control-Point PD Shifter",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Interactive Bezier curve handles on a dose-response plot that students drag to morph potency and efficacy, triggering immediate clinical consequence alerts when thresholds cross toxicity",
    expected_effect: "Bridges theoretical mathematical curve parameters to direct patient pharmacodynamic outcomes"
  },
  {
    id: "GAM-033",
    name: "Autonomic Tug-of-War Vector Balance",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Animated rope with Sympathetic and Parasympathetic avatars pulling on organ tone (heart rate, pupil diameter, bladder sphincter), with pharmacological agonists/antagonists adding or removing team members",
    expected_effect: "Visualizes basal autonomic tone as a continuous dynamic equilibrium rather than static on/off switches"
  },
  {
    id: "GAM-034",
    name: "Organ-Bath Dale's Reversal Pressure Transducer Rig",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Virtual kymograph where learner infuses epinephrine before and after phenoxybenzamine, observing the blood pressure spike turn into a paradoxical fall",
    expected_effect: "Solves the notorious Dale's vasomotor reversal board exam trap by demonstrating alpha-blockade unmasking pure beta-2 vasodilation"
  },
  {
    id: "GAM-035",
    name: "Bioisostere Molecule Drag-and-Snap Puzzle",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Ligand blueprint puzzle where learner drags candidate bioisosteric functional groups (e.g., tetrazole replacing carboxylic acid) into a metabolic hotspot, receiving instant metabolic stability and permeability scorecards",
    expected_effect: "Teaches lead optimization trade-offs in medicinal chemistry through constructive experimentation"
  },
  {
    id: "GAM-036",
    name: "Spare Receptor Capacity Iceberg Slider",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Waterline slider submerging receptor reserve percentage (R_T), showing that maximal tissue response Emax is reached with only 10% receptor occupancy when reserve is 90%",
    expected_effect: "Deconstructs the misconception that maximal drug effect requires 100% receptor occupancy"
  },
  {
    id: "GAM-037",
    name: "Two-Compartment Kinetic Liquid Flow Syringe",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Interactive twin connected glass cylinders (Central blood vs Peripheral tissue) with variable flow resistance stopcocks showing distribution (alpha) and elimination (beta) phases after rapid IV bolus",
    expected_effect: "Translates non-linear biexponential plasma decay curves into intuitive fluid dynamics"
  },
  {
    id: "GAM-038",
    name: "Cation-Pi Electron Cloud Snapping Grid",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Positively charged acetylcholine trimethylammonium head snaps into aromatic tryptophan/phenylalanine pi-electron cloud with visible magnetic ring lines",
    expected_effect: "Makes non-covalent aromatic interactions visceral and memorable in cholinoceptor SAR"
  },
  {
    id: "GAM-039",
    name: "Interactive Emax vs EC50 Morphing Grid",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "2D coordinate canvas where moving a cursor continuously morphs a 3D-rendered dose-response curve between partial, super, and inverse agonists with real-time parameter readouts",
    expected_effect: "Synthesizes independent dimensions of drug potency and intrinsic efficacy into unified spatial exploration"
  },
  {
    id: "GAM-040",
    name: "Atropine Flush Vascular Resistance Elastic Band",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Elastic vascular lumen ring that constricts or dilates as student balances endothelial M3-mediated nitric oxide release against direct muscarinic blockade",
    expected_effect: "Unpacks paradoxical cutaneous vasodilation (atropine flush) without confusing students on cholinergic vascular innervation"
  },
  {
    id: "GAM-041",
    name: "Suicide Inhibitor Irreversible Covalent Weld",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Molecule placement interface where a reactive warhead (e.g., organophosphate serine trap) triggers an electric weld animation and permanently locks the enzyme, requiring new enzyme synthesis to recover activity",
    expected_effect: "Solidifies the distinction between reversible competitive antagonists and irreversible non-competitive covalent inhibitors"
  },
  {
    id: "GAM-042",
    name: "Steady-State IV Infusion Titration Game",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Mini-sim where student manipulates IV pump rate knob to keep unstable patient plasma concentration within a narrow green therapeutic channel during variable metabolic clearance crises",
    expected_effect: "Teaches real-time pharmacokinetic feedback control and clinical target concentration strategies"
  },
  {
    id: "GAM-043",
    name: "Allosteric Modulator Shape-Shifter Pocket",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Secondary binding pocket slider where adding a positive allosteric modulator (PAM) twists the primary orthosteric site, increasing agonist affinity without inducing direct activation alone",
    expected_effect: "Teaches cooperative conformational changes and allosteric modulation mechanisms intuitively"
  },
  {
    id: "GAM-044",
    name: "Ion-Trapping pH Gradient Pinball",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Microscopic cell membrane maze where un-ionized molecules pass freely through lipid gates, but become ionized and physically trapped when entering acidic or basic compartments",
    expected_effect: "Gamifies the Henderson-Hasselbalch principle and distribution across biological pH barriers"
  },
  {
    id: "GAM-045",
    name: "Tetrazole vs Carboxylic Acid Bioisosteric Balance Scale",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Two-pan balance scale comparing carboxylic acid (-COOH) and tetrazole ring on oral bioavailability, acidic pKa, and metabolic glucuronidation susceptibility",
    expected_effect: "Demonstrates non-classical bioisosterism rationale in Angiotensin Receptor Blocker (ARB) design"
  },
  {
    id: "GAM-046",
    name: "Pupil Constriction/Dilation Aperture Wheel (M3 vs Alpha-1)",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Camera-style physical iris aperture that constricts via circular sphincter pupillae (M3) or dilates via radial dilator pupillae (alpha-1), responding to drop-applied pilocarpine or phenylephrine",
    expected_effect: "Disentangles autonomic pupillary control mechanisms for optometry and pharmacology boards"
  },
  {
    id: "GAM-047",
    name: "Adrenoceptor Selectivity Sorting Sieve",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Multi-layer molecular sieve sorting norepinephrine, epinephrine, and isoproterenol based on N-alkyl bulk, allowing only selective sizes to activate specific receptor channels",
    expected_effect: "Visualizes the SAR principle that increasing bulky N-substituents shifts selectivity from alpha to beta adrenoceptors"
  },
  {
    id: "GAM-048",
    name: "Michaelis-Menten Lineweaver-Burk Fulcrum Lever",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Double-reciprocal plot lever where changing inhibitor type shifts the x-intercept (-1/Km) or y-intercept (1/Vmax), pivoting around the unaffected axis",
    expected_effect: "Transforms dry algebraic Lineweaver-Burk enzyme inhibition equations into an intuitive physical teeter-totter"
  },
  {
    id: "GAM-049",
    name: "Renal Tubular Reabsorption Drag-Raft",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Glomerular filtrate flume where learner drags water-soluble vs lipid-soluble drugs across tubular epithelium back into peritubular capillaries before urine washout",
    expected_effect: "Grounds renal clearance and tubular reabsorption in membrane partition properties"
  },
  {
    id: "GAM-050",
    name: "Orthosteric vs Allosteric Dual-Key Interlock",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Two-lock receptor safe requiring primary key (agonist) and optional secondary side-key (modulator) that alters primary keyhole friction",
    expected_effect: "Clarifies non-competitive and allosteric pharmacodynamic interactions through familiar multi-key security affordances"
  },
  {
    id: "GAM-051",
    name: "Therapeutic Index Hazard Buffer Spring",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Compression spring widget showing safety buffer TI = TD50 / ED50; high-TI drugs have large bouncy springs while narrow-TI drugs (digoxin, warfarin) have rigid hair-trigger springs",
    expected_effect: "Instills visceral caution regarding low therapeutic index medications"
  },
  {
    id: "GAM-052",
    name: "Plasma Protein Binding (Albumin Sponge) Squeeze Tool",
    tier: "adjacent",
    evidence_tag: "evidence-backed",
    mechanism: "Molecular sponge that adsorbs free drug molecules based on affinity, leaving only unabsorbed free fraction to cross endothelial slits into target organs",
    expected_effect: "Clarifies that only unbound drug exerts pharmacological activity and undergoes hepatic/renal clearance"
  },
  {
    id: "GAM-053",
    name: "Choline O-Acetyltransferase Assembly Line Conveyor",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Synaptic factory conveyor where choline and Acetyl-CoA are combined by ChAT, packaged into vesicles by VAT, and blocked by hemicholinium/vesamicol switches",
    expected_effect: "Fixes the sequential steps of cholinergic neurotransmission synthesis and transport in memory"
  },
  {
    id: "GAM-054",
    name: "Neostigmine Neuromuscular Junction Twitch Gauge",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Muscle twitch force meter hooked to motor endplate, showing curare-induced paralysis reversed in real-time as neostigmine halts ACh degradation",
    expected_effect: "Demonstrates competition at the neuromuscular nicotinic receptor between non-depolarizing blockers and accumulated acetylcholine"
  },
  {
    id: "GAM-055",
    name: "Quantitative SAR (QSAR) Hydrophobic Surface Painter",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Brush tool applying Hammett electron-withdrawing (sigma) or lipophilic Hansch (pi) parameters onto an aromatic ring, instantly updating a calculated log(1/C) bioactivity dial",
    expected_effect: "Demystifies QSAR equations by connecting substituent electronic/steric properties directly to predicted potency"
  },
  {
    id: "GAM-056",
    name: "Inverse Agonist Basal Tone Gravity Well",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Physical plumb line showing constitutive baseline receptor activity at 20%; applying an inverse agonist pulls activity down into the negative well below zero baseline",
    expected_effect: "Resolves the confusing distinction between a neutral antagonist (no change in basal tone) and an inverse agonist (active suppression)"
  },
  {
    id: "GAM-057",
    name: "Epinephrine Reversal Multi-Receptor Switchboard",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Patch-cord console routing epinephrine signal simultaneously through alpha-1 (vasoconstriction) and beta-2 (vasodilation) circuits, allowing learner to unplug alpha-1 and observe isolated beta-2 drop",
    expected_effect: "Resolves hemodynamic receptor competition through tactile circuit-routing mechanics"
  },
  {
    id: "GAM-058",
    name: "CYP450 Substrate-Inducer-Inhibitor Kinetic Mixer",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Enzyme mixing board where introducing a CYP3A4 inhibitor (ketoconazole) or inducer (rifampin) dynamically dials substrate clearance rate and alters active metabolite AUC curves",
    expected_effect: "Turns hazardous drug-drug metabolic interactions into an engaging real-time kinetic mixing puzzle"
  },
  {
    id: "GAM-059",
    name: "LogP Lipinski Rule-of-5 Stress Crane",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Structural optimization game where adding lipophilic rings or polar groups adds weight to Lipinski criteria cranes (MW > 500, LogP > 5, HBD > 5, HBA > 10), warning learner before oral druggability snaps",
    expected_effect: "Inculcates practical drug-likeness trade-offs during lead modification"
  },
  {
    id: "GAM-060",
    name: "Beta-1 vs Beta-2 Cardiac/Bronchial Dual-Actuator Joypad",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Dual-axis directional pad where vertical axis drives heart rate (beta-1) and horizontal axis controls airway radius (beta-2), challenging learner to select cardioselective beta-blockers without triggering bronchospasm in an asthmatic patient model",
    expected_effect: "Teaches beta-blocker receptor selectivity and clinical contraindications through direct multi-target control"
  },
  {
    id: "GAM-061",
    name: "Loading Dose vs Maintenance Dose Syringe Balancer",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Dual-syringe dosing station requiring learner to push a large loading dose (Vd * Ctarget) to fill the tissue reservoir instantly, followed by a steady maintenance drip (CL * Ctarget) to offset hourly losses",
    expected_effect: "Eliminates confusion between volume-dependent loading doses and clearance-dependent maintenance doses"
  },
  {
    id: "GAM-062",
    name: "Muscarinic M2 Cardiac Pacemaker Metronome",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Auditory and visual metronome beating at SA node pace, where acetylcholine drops beat tempo through Gi/alpha potassium channel opening while atropine releases the brake",
    expected_effect: "Translates vagal tone and parasympathetic cardioinhibition into visceral rhythmic pacing"
  },
  {
    id: "GAM-063",
    name: "Ester vs Amide Local Anesthetic Hydrolysis Stopwatch",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Side-by-side countdown timer showing procaine (ester) rapidly cleaved in seconds by plasma pseudocholinesterases, while lidocaine (amide) survives until reaching hepatic CYP enzymes",
    expected_effect: "Anchors local anesthetic classification, duration of action, and metabolic pathways in comparative temporal rates"
  },
  {
    id: "GAM-064",
    name: "Nicotinic Ion-Channel Gate Pulley",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Mechanical winch requiring two simultaneous acetylcholine molecules to bind alpha subunits, snapping open the central pore to allow sodium ion torrent",
    expected_effect: "Illustrates ligand-gated ion channel cooperativity and millisecond transmission speed vs G-protein cascades"
  },
  {
    id: "GAM-065",
    name: "Prodrug Enzymatic Cleavage Scissors",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Tool allowing student to snip masking ester groups off enalaprilat or valacyclovir inside gut mucosa/liver, unlocking the high-affinity active parent pharmacophore",
    expected_effect: "Explains prodrug rationale for improving oral absorption and bioavailability"
  },
  {
    id: "GAM-066",
    name: "Monoamine Oxidase (MAO) vs COMT Synaptic Vacuum",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Synaptic cleft cleanup mini-game where learner deploys MAO and COMT cleanup units to degrade norepinephrine, experiencing hypertensive crisis when MAO is blocked and tyramine enters",
    expected_effect: "Clarifies catecholamine metabolic degradation pathways and the cheese effect food-drug interaction"
  },
  {
    id: "GAM-067",
    name: "Desensitization & Tachyphylaxis Receptor Internalization Trapdoor",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Rapid repeat agonist firing trigger that over-stimulates G-protein receptors, causing arrestin binding and dropping surface receptors through a trapdoor into endosomes",
    expected_effect: "Explains the pharmacological mechanism of tachyphylaxis and down-regulation following prolonged agonist exposure"
  },
  {
    id: "GAM-068",
    name: "Guanethidine False Transmitter Decoy Dispenser",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Synaptic packaging puzzle where learner substitutes guanethidine for norepinephrine into storage vesicles, observing gradual adrenergic neurotransmission failure",
    expected_effect: "Illustrates presynaptic adrenergic neuron-blocking mechanisms"
  },
  {
    id: "GAM-069",
    name: "Bronchoconstriction vs Bronchodilation Lung Bellows",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Squeezable lung bellows showing airway resistance during an asthma attack; learner toggles between beta-2 agonists (cAMP dilation) and M3 antagonists (blocking bronchoconstriction) to restore airflow",
    expected_effect: "Demonstrates complementary mechanistic pathways for pulmonary bronchodilation"
  },
  {
    id: "GAM-070",
    name: "Glaucoma Aqueous Humor Inflow/Outflow Valves",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Eye fluid pressure chamber with ciliary body inflow valve (beta-1/beta-2 and alpha-2) and trabecular/uveoscleral outflow drains (M3 and prostaglandin PGF2a), challenging student to lower IOP below 21 mmHg",
    expected_effect: "Unpacks the complex pharmacotherapy of glaucoma through mechanical fluid valve regulation"
  },
  {
    id: "GAM-071",
    name: "Alpha-2 Presynaptic Autoreceptor Negative Feedback Loop Damper",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Audio feedback loop dial where norepinephrine spillover into presynaptic alpha-2 receptors lowers further exocytosis, acting as an autonomic volume limiter",
    expected_effect: "Cements the presynaptic inhibitory autoreceptor mechanism through familiar acoustic feedback dampening"
  },
  {
    id: "GAM-072",
    name: "Reserpine Vesicular Storage Leaky Bucket",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Granular vesicle container that springs irreversible leaks under reserpine, allowing cytoplasmic monoamines to be chewed up by MAO before exocytosis can occur",
    expected_effect: "Teaches the depletion of catecholamine stores and delayed therapeutic onset of reserpine"
  },
  {
    id: "GAM-073",
    name: "P-Glycoprotein Efflux Pump Revolving Door",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Blood-brain barrier membrane revolving door that ejects hydrophobic xenobiotics back into the capillary lumen, disabled with verapamil to permit drug CNS entry",
    expected_effect: "Demonstrates active multidrug resistance transport and CNS sanctuary sites"
  },
  {
    id: "GAM-074",
    name: "Volume of Distribution Dye-Dilution Water Tanks",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Multi-tank setup (4L intravascular beaker, 14L interstitial tub, 42L total body water vat, and huge fat barrel) where injecting fixed dye amount yields variable concentrations depending on tissue affinity",
    expected_effect: "Demystifies how apparent Vd can drastically exceed physical body water volume (e.g. chloroquine Vd > 1000 L)"
  },
  {
    id: "GAM-075",
    name: "Partial Agonist Buprenorphine Displacement Pin",
    tier: "adjacent",
    evidence_tag: "evidence-backed",
    mechanism: "Competitive displacement pin pushing full agonist (morphine) off mu receptors with higher-affinity partial agonist (buprenorphine), showing dropped total efficacy and precipitated withdrawal",
    expected_effect: "Clarifies why high-affinity partial agonists function as competitive antagonists in the presence of full agonists"
  },
  {
    id: "GAM-076",
    name: "Catecholamine Biosynthesis Chain Dominoes",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Sequential domino track (Tyrosine -> DOPA -> Dopamine -> Norepinephrine -> Epinephrine) with rate-limiting tyrosine hydroxylase choke-point, where knocking down one block halts downstream synthesis",
    expected_effect: "Fixes the biochemical synthesis pathway of adrenergic transmitters in memory"
  },
  {
    id: "GAM-077",
    name: "Phenoxybenzamine Irreversible Alkylation Clamp",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Molecular aziridinium ion clamp that forms a permanent covalent bond to alpha receptors, demonstrating that increasing norepinephrine dose cannot overcome blockade",
    expected_effect: "Proves why non-competitive insurmountable blockade cannot be reversed by agonist concentration increases"
  },
  {
    id: "GAM-078",
    name: "Botulinum Toxin SNARE Complex Wire-Cutter",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Microscopic wire-cutter snipping synaptobrevin and SNAP-25 fusion proteins, preventing acetylcholine vesicles from docking and fusing with the presynaptic terminal",
    expected_effect: "Illustrates the molecular pharmacology of botulinum neurotoxin flaccid paralysis"
  },
  {
    id: "GAM-079",
    name: "H1 vs H2 Receptor Cross-Talk Bipolar Slider",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Cross-talk balance showing H1 antihistamines (allergies/sedation) vs H2 blockers (gastric acid secretion), preventing cross-receptor confusion in pharmacology exams",
    expected_effect: "Resolves histamine receptor subtype clinical indications through distinct target split"
  },
  {
    id: "GAM-080",
    name: "Multi-Compartment Pharmacokinetic Pinball Bumper",
    tier: "adjacent",
    evidence_tag: "plausible",
    mechanism: "Multi-level pinball board where drug ball bounces between central blood buffer and peripheral fat/muscle bumpers before draining down the renal elimination hole",
    expected_effect: "Transforms complex differential pharmacokinetic compartment clearance into an intuitive spatial physics simulation"
  },

  // --- WILD (20) ---
  {
    id: "GAM-081",
    name: "Code Blue: Rapid-Fire Organophosphate Crisis Room",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "60-second emergency room crisis sim where learner titrates atropine against muscarinic storm and administers pralidoxime before enzyme aging occurs, with live patient vitals responding dynamically",
    expected_effect: "Instills rapid clinical reflex recognition of cholinergic toxidrome management under cognitive pressure"
  },
  {
    id: "GAM-082",
    name: "Auditory Affinity: Molecular Binding Sonification",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Interactive synthesizer where dragging a ligand toward a receptor cleft produces pitch and harmonic resonance matching electrostatic binding energy and steric clash dissonances",
    expected_effect: "Provides multi-sensory auditory intuition for lock-and-key thermodynamics and van der Waals interactions"
  },
  {
    id: "GAM-083",
    name: "Rogue-Like Misconception Boss Gauntlet",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Adaptive dungeon crawler where each enemy monster is powered by a notorious 3rd-year pharmacy misconception; defeated only by choosing the exact pharmacological mechanism that counters the error",
    expected_effect: "Gamifies board exam error decontamination into a high-engagement mastery gauntlet"
  },
  {
    id: "GAM-084",
    name: "Blind SAR Bioisostere High-Stakes Poker",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Turn-based card game where learners wager tokens on whether chemical functional group modifications (e.g. fluorine substitution on an aromatic ring) will increase metabolic stability, LogP, or potency",
    expected_effect: "Transforms dry SAR rule memorization into strategic risk-reward analytical deduction"
  },
  {
    id: "GAM-085",
    name: "Autonomic Flight-or-Fight Dual-Stick Vector Battle",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Fast-paced dual-stick balance game where learner balances sympathetic and parasympathetic tones against unpredictable environmental stressors (hypovolemic shock, cold exposure, fear) using selective agonists and blockers",
    expected_effect: "Deepens visceral mastery of autonomic homeostatic reflexes under non-stationary physiological conditions"
  },
  {
    id: "GAM-086",
    name: "Real-Time PK Overdose Dialysis Speedrun",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "High-speed time-attack triage game where learner selects hemodialysis, urine alkalinization, or specific antidotes (e.g., Digibind, glucagon) before fatal tissue distribution occurs",
    expected_effect: "Inculcates decisive emergency clinical pharmacokinetic reasoning"
  },
  {
    id: "GAM-087",
    name: "Molecular Haptic Resistance Force-Feedback Emulation",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Web-haptic simulation using micro-vibrations and pointer resistance physics to emulate electrostatic repulsion and van der Waals attraction when docking a ligand into an active site cleft",
    expected_effect: "Creates tactile muscle memory for steric hindrance and complementary electronic charges"
  },
  {
    id: "GAM-088",
    name: "Epinephrine Vasomotor Reversal Blindfold Betting Engine",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "High-stakes blindfold prediction game where students wager confidence points on blood pressure trajectories after mysterious drug cocktail infusions before the kymograph unmasks the trace",
    expected_effect: "Eliminates passive watching by demanding rigorous theoretical commitment before revealing hemodynamic curves"
  },
  {
    id: "GAM-089",
    name: "Anaphylactic Shock Multi-Organ Cockpit Simulator",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Flight-simulator style emergency cockpit where plummeting blood pressure, airway constriction, and urticaria require precise sequential execution of IM epinephrine, fluids, and antihistamines",
    expected_effect: "Solidifies life-saving epinephrine priority over secondary adjunctive medications in systemic anaphylaxis"
  },
  {
    id: "GAM-090",
    name: "The Toxicologist's Cryptic Autopsy Detective Chamber",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Forensic investigation chamber where learner deduces the lethal poison/drug from post-mortem autonomic clues (pinpoint pupils, dry mouth, bladder distension, ECG arrhythmias)",
    expected_effect: "Cultivates clinical Sherlock Holmes deductive reasoning across overlapping autonomic toxidromes"
  },
  {
    id: "GAM-091",
    name: "High-Stakes EUS/NAPLEX Timed Misconception Escape Room",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Escape room puzzle chamber where each locked door requires identifying and correcting the false premise in realistic clinical vignette traps within a 90-second countdown",
    expected_effect: "Inoculates pharmacy students against high-stakes board exam trick questions under realistic time stress"
  },
  {
    id: "GAM-092",
    name: "Receptor Subtype Blind Tasting Soundboard",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Blind auditory soundboard where each receptor subtype (alpha-1, alpha-2, beta-1, beta-2, M1, M2, M3) emits a distinct acoustic timbre based on second messenger cascades (Gq calcium chords, Gs cAMP chimes, Gi mute filters)",
    expected_effect: "Establishes cross-modal cognitive associative memory for GPCR second messenger pathways"
  },
  {
    id: "GAM-093",
    name: "The Bioisostere Black-Market Drug Design Heist",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Stealth puzzle game where learner modifies a known patent-protected drug using non-infringing bioisosteres to retain receptor affinity while evading patent infringement algorithms and metabolic breakdown",
    expected_effect: "Teaches advanced medicinal chemistry lead optimization and patent-busting strategies through a playful narrative lens"
  },
  {
    id: "GAM-094",
    name: "Dynamic Tachyphylaxis Sudden-Death Endurance Arena",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Wave defense arena where continuous dosing of indirect sympathomimetics (ephedrine/amphetamine) causes vesicular catecholamine exhaustion, forcing player to pivot to direct agonists",
    expected_effect: "Visualizes acute tachyphylaxis and depletion of presynaptic transmitter stores under relentless demand"
  },
  {
    id: "GAM-095",
    name: "Pharmacogenomic Slow-Metabolizer Roulette Wheel",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Probabilistic casino wheel assigning CYP2D6/CYP2C19 extensive vs poor metabolizer phenotypes to a cohort, requiring real-time dose adjustments before pro-arrhythmic active drug accumulation occurs",
    expected_effect: "Instills acute awareness of individualized precision medicine and genetic pharmacokinetic variability"
  },
  {
    id: "GAM-096",
    name: "Synaptic Neurotransmission Micro-Rhythm Action Game",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Rhythm-based beat-matching game where learner triggers vesicle exocytosis, receptor binding, and acetylcholinesterase breakdown in precise musical synchronization with action potential cadence",
    expected_effect: "Transforms abstract synaptic timing into intuitive neurochemical rhythm comprehension"
  },
  {
    id: "GAM-097",
    name: "Multi-Drug Interaction Cascade Jenga Tower",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Unstable physical wooden block tower where each block represents a patient's concurrent medication (e.g. sildenafil + nitroglycerin, beta-blocker + verapamil); pulling the wrong block triggers systemic collapse",
    expected_effect: "Teaches catastrophic drug-drug contraindications through visceral physical instability metaphors"
  },
  {
    id: "GAM-098",
    name: "Spatial Chem-Map AR/3D Stereochemical Blind Maze",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "First-person navigate-through-the-receptor maze where learner physically steers a drug scaffold through steric side-chain obstacles to find the catalytic pocket",
    expected_effect: "Develops spatial 3D reasoning for drug design and chiral recognition that 2D flat drawings fail to convey"
  },
  {
    id: "GAM-099",
    name: "Suicide-Inhibitor Countdown Bomb-Defusal Wire Slicer",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "High-tension defusal interface where ticking organophosphate aging clock demands clipping the alkyl-phosphate bond with pralidoxime before irreversible covalent aging locks the bomb",
    expected_effect: "Cements the narrow time window for oxime reactivation of phosphorylated acetylcholinesterase"
  },
  {
    id: "GAM-100",
    name: "The Zero-Order Saturation Rollercoaster Tycoon",
    tier: "wild",
    evidence_tag: "speculative",
    mechanism: "Amusement park coaster where drug elimination cars transition from smooth first-order flow to catastrophic zero-order traffic jam when metabolic enzymes saturate (phenytoin, ethanol, high-dose aspirin)",
    expected_effect: "Visualizes non-linear Michaelis-Menten elimination kinetics and sudden toxic runaway through relatable congestion mechanics"
  }
];

// Attach formatted field
ideas.forEach(idea => {
  idea.formatted = `${idea.name}: ${idea.mechanism} -> ${idea.expected_effect} [${idea.evidence_tag}]`;
});

const provenCount = ideas.filter(i => i.tier === 'proven').length;
const adjacentCount = ideas.filter(i => i.tier === 'adjacent').length;
const wildCount = ideas.filter(i => i.tier === 'wild').length;

console.log(`Counts: Total=${ideas.length}, Proven=${provenCount}, Adjacent=${adjacentCount}, Wild=${wildCount}`);

if (ideas.length !== 100 || provenCount !== 30 || adjacentCount !== 50 || wildCount !== 20) {
  console.error("Quota mismatch!");
  process.exit(1);
}

const payload = {
  seat: "Seat 3: Game & Interaction Designer",
  total_count: ideas.length,
  breakdown: {
    proven: provenCount,
    adjacent: adjacentCount,
    wild: wildCount
  },
  ideas: ideas
};

const outputPath = path.resolve('docs/council/seat_3_game_designer.json');
fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), 'utf-8');
console.log(`Successfully written to ${outputPath}`);

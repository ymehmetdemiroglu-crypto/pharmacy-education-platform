"""
scripts/translations_pharmacology.py

Academic English Translations for Course B: Farmakoloji (Lessons 1 to 12).
Complies with Goodman & Gilman's Pharmacological Basis of Therapeutics,
Katzung's Basic & Clinical Pharmacology, and Marmara University Faculty of Pharmacy lecture decks.
"""

PHARMACOLOGY_TRANSLATIONS = {
    "pharm-mod1-les1": {
        "title": "Macromolecular Drug Targets & Mass-Action Equilibrium",
        "objective": "Calculate drug-receptor binding equilibrium, dissociation constant Kd, and fractional occupancy theta using the law of mass action.",
        "misconceptions": [
            "High Kd value implies stronger target binding (actually, lower Kd indicates higher affinity)."
        ],
        "steps": {
            "pharm-mod1-les1-step-01": {
                "title": "Finding One Molecule Among Trillions of Cells",
                "prompt": "How do circulating drug molecules locate their specific target receptor among trillions of host proteins and fit into their designated pocket?"
            },
            "pharm-mod1-les1-step-02": {
                "title": "Prediction: Free Ligand Concentration [L] Equals Kd",
                "prompt": "When the free drug concentration in the biophase equals the dissociation constant Kd, what percentage of receptors is occupied?"
            },
            "pharm-mod1-les1-step-03": {
                "title": "Intuitive Analogy: Musical Chairs and Binding Tendency",
                "prompt": "Consider receptors as chairs and ligands as participants. Kd represents the concentration where exactly half the chairs remain occupied at equilibrium."
            },
            "pharm-mod1-les1-step-04": {
                "title": "Receptor Occupancy (Theta) Isotherm Curve",
                "prompt": "The fractional occupancy curve theta = [L] / ([L] + Kd) displays a classic hyperbolic relationship between concentration and bound receptor fraction."
            },
            "pharm-mod1-les1-step-05": {
                "title": "Interactive Matcher: Receptor-Ligand Equilibrium",
                "prompt": "Modulate ligand concentration [L] against target receptors to observe real-time Kd shifts and fractional occupancy saturation."
            },
            "pharm-mod1-les1-step-06": {
                "title": "Guided Discovery: Low vs High Kd Affinity",
                "prompt": "Compare Drug A (Kd = 1 nM) and Drug B (Kd = 100 µM). Notice why nanomolar affinity requires 100,000-fold less drug to achieve 50% target occupancy."
            },
            "pharm-mod1-les1-step-07": {
                "title": "Formal Formulation: The Law of Mass Action",
                "prompt": "At equilibrium: Kon * [L] * [R] = Koff * [LR]. The equilibrium dissociation constant Kd = Koff / Kon = [L] * [R] / [LR]."
            },
            "pharm-mod1-les1-step-08": {
                "title": "Concept Check: 90% Occupancy Concentration",
                "prompt": "To occupy 90% of a target receptor population (theta = 0.90), what multiple of Kd must the free ligand concentration reach?"
            },
            "pharm-mod1-les1-step-09": {
                "title": "Clinical Case: Beta-Blocker Target Engagement",
                "prompt": "A patient receives atenolol (Kd = 10 nM). Serum measurements show free concentration [L] = 90 nM. What percentage of cardiac beta-1 receptors is bound?"
            },
            "pharm-mod1-les1-step-10": {
                "title": "Retrieval: Thermodynamic Activity vs Affinity",
                "prompt": "How does specific receptor affinity (governed by Kd) differ from non-specific membrane perturbation governed by Ferguson's principle?"
            },
            "pharm-mod1-les1-step-11": {
                "title": "Connection: Non-Covalent Forces in Binding (Lesson 2)",
                "prompt": "Once a ligand approaches a receptor pocket, which specific reversible non-covalent forces hold it in place?"
            },
            "pharm-mod1-les1-step-12": {
                "title": "Mastery Assessment: Kd and Receptor Occupancy",
                "prompt": "Which thermodynamic parameter inversely correlates with drug-receptor binding affinity under mass-action equilibrium?"
            }
        }
    },

    "pharm-mod1-les2": {
        "title": "Reversible Non-Covalent Forces & Binding Affinity",
        "objective": "Distinguish ionic, hydrogen, hydrophobic, and van der Waals interactions governing drug-receptor complex stability.",
        "misconceptions": [
            "Covalent bonding is the standard mechanism for all therapeutic drugs."
        ],
        "steps": {
            "pharm-mod1-les2-step-01": {
                "title": "Why Most Drugs Do Not Form Permanent Covalent Bonds",
                "prompt": "Why do the vast majority of therapeutic drugs bind targets reversibly rather than forming irreversible covalent bonds?"
            },
            "pharm-mod1-les2-step-02": {
                "title": "Prediction: Energy Hierarchy of Non-Covalent Bonds",
                "prompt": "Which non-covalent intermolecular force contributes the greatest binding enthalpy (strength per bond) in physiological solution?"
            },
            "pharm-mod1-les2-step-03": {
                "title": "Intuitive Analogy: Velcro and Molecular Magnets",
                "prompt": "A single hook-and-loop fiber is weak, but hundreds combined create immense tensile grip. Multiple non-covalent bonds create tight, reversible binding."
            },
            "pharm-mod1-les2-step-04": {
                "title": "Spatial Map of Intermolecular Forces",
                "prompt": "Receptor binding pockets integrate electrostatic ionic bonds (40-110 kcal/mol), hydrogen bonds (2-10 kcal/mol), and van der Waals forces (0.5-1 kcal/mol)."
            },
            "pharm-mod1-les2-step-05": {
                "title": "Interactive Matcher: Non-Covalent Bond Assembly",
                "prompt": "Align pharmacological functional groups with receptor amino acid residues to construct high-affinity binding pockets."
            },
            "pharm-mod1-les2-step-06": {
                "title": "Guided Discovery: Water Desolvation Entropy Gain",
                "prompt": "Observe how hydrophobic burial releases ordered water molecules into bulk solvent, providing a massive favorable entropic drive (+ΔS)."
            },
            "pharm-mod1-les2-step-07": {
                "title": "Formal Thermodynamics: Gibbs Free Energy of Binding",
                "prompt": "Overall binding free energy: ΔG = ΔH - TΔS = -RT ln(Ka) = RT ln(Kd). Each 1.4 kcal/mol reduction in ΔG improves Kd by a factor of 10."
            },
            "pharm-mod1-les2-step-08": {
                "title": "Concept Check: Aspirin vs Reversible NSAIDs",
                "prompt": "Aspirin permanently acetylates Ser-529 on COX-1. How does this covalent mechanism differ pharmacologically from ibuprofen?"
            },
            "pharm-mod1-les2-step-09": {
                "title": "Application: Designing a High-Affinity Ligand",
                "prompt": "Adding a single complementary hydrogen bond donor increases binding affinity roughly 5- to 10-fold. By how much does this lower required clinical dose?"
            },
            "pharm-mod1-les2-step-10": {
                "title": "Retrieval: Ionization and Salt Bridges",
                "prompt": "Recall Lesson 2 from MedChem: which physiological pH condition ensures an amine drug forms a salt bridge with Aspartate-113?"
            },
            "pharm-mod1-les2-step-11": {
                "title": "Connection: Graded Dose-Response Curves (Lesson 3)",
                "prompt": "Once a drug occupies receptor binding sites, how does receptor occupancy translate into physiological cellular response?"
            },
            "pharm-mod1-les2-step-12": {
                "title": "Mastery Assessment: Bond Thermodynamics",
                "prompt": "Which non-covalent force provides the greatest distance-dependent attraction (1/r) to guide incoming ligands toward receptor active sites?"
            }
        }
    },

    "pharm-mod2-les1": {
        "title": "Graded Dose-Response Curves & Intrinsic Efficacy",
        "objective": "Determine EC50 potency, Emax intrinsic efficacy, and differentiate full agonists from partial agonists.",
        "misconceptions": [
            "A drug with higher potency (lower EC50) always produces a greater maximal clinical effect."
        ],
        "steps": {
            "pharm-mod2-les1-step-01": {
                "title": "The Morphine vs Buprenorphine Ceiling Paradox",
                "prompt": "Why can morphine cause fatal respiratory depression at high doses, whereas buprenorphine reaches a safety ceiling regardless of dose escalation?"
            },
            "pharm-mod2-les1-step-02": {
                "title": "Prediction: Potency vs Efficacy",
                "prompt": "Drug X has EC50 = 1 nM with Emax = 50%. Drug Y has EC50 = 100 nM with Emax = 100%. Which drug provides superior maximal pain relief?"
            },
            "pharm-mod2-les1-step-03": {
                "title": "Intuitive Analogy: Light Dimmer Switch vs Key Turn",
                "prompt": "Potency determines how easily the switch turns on (EC50); intrinsic efficacy determines how brightly the bulb glows at maximum setting (Emax)."
            },
            "pharm-mod2-les1-step-04": {
                "title": "Logarithmic Dose-Response Sigmoid Curve",
                "prompt": "Plotting response against log[Dose] transforms a rectangular hyperbola into a symmetrical sigmoidal curve spanning the 10-90% linear dynamic range."
            },
            "pharm-mod2-les1-step-05": {
                "title": "Interactive Simulator: DoseResponseCurve Modulator",
                "prompt": "Adjust EC50 and Emax sliders to observe sigmoid curve horizontal shifts (potency) and vertical compressions (efficacy)."
            },
            "pharm-mod2-les1-step-06": {
                "title": "Guided Discovery: Partial Agonist Acting as Antagonist",
                "prompt": "Observe what happens when a partial agonist (Emax = 40%) is administered in the presence of a saturated full agonist (Emax = 100%)."
            },
            "pharm-mod2-les1-step-07": {
                "title": "Formal Classification: Agonist Spectra",
                "prompt": "Full agonists (intrinsic activity α = 1), partial agonists (0 < α < 1), neutral antagonists (α = 0), and inverse agonists (α < 0)."
            },
            "pharm-mod2-les1-step-08": {
                "title": "Concept Check: Spare Receptors and EC50 vs Kd",
                "prompt": "In tissues with spare receptors, maximal biological response (Emax) is achieved at concentrations lower than receptor Kd. Why?"
            },
            "pharm-mod2-les1-step-09": {
                "title": "Clinical Case: Buprenorphine in Opioid Addiction",
                "prompt": "Why does buprenorphine precipitate withdrawal symptoms if given immediately after heroin in opioid-dependent individuals?"
            },
            "pharm-mod2-les1-step-10": {
                "title": "Retrieval: Mass Action and Kd",
                "prompt": "How does EC50 (effective concentration for 50% maximal response) relate to Kd (concentration for 50% receptor binding)?"
            },
            "pharm-mod2-les1-step-11": {
                "title": "Connection: Receptor Antagonism (Lesson 4)",
                "prompt": "Now that we understand agonist activation, what happens when antagonist molecules block receptor access without activating signal transduction?"
            },
            "pharm-mod2-les1-step-12": {
                "title": "Mastery Assessment: Potency and Efficacy Criteria",
                "prompt": "Which graphic parameter of a log concentration-response curve directly reflects pharmacological intrinsic efficacy?"
            }
        }
    },

    "pharm-mod2-les2": {
        "title": "Receptor Antagonism: Competitive vs Non-Competitive Blockade",
        "objective": "Analyze rightward parallel shifts with competitive antagonists versus Emax depression with non-competitive and irreversible blockers.",
        "misconceptions": [
            "Competitive antagonists can never be overcome by increasing agonist concentration."
        ],
        "steps": {
            "pharm-mod2-les2-step-01": {
                "title": "The Overdose Reversal Phenomenon",
                "prompt": "An unconscious patient with heroin respiratory arrest awakens seconds after intravenous naloxone. How does naloxone outcompete morphine?"
            },
            "pharm-mod2-les2-step-02": {
                "title": "Prediction: Increasing Agonist Against Fixed Antagonist",
                "prompt": "If you add a high concentration of competitive antagonist, can you still achieve 100% maximal agonist response by increasing agonist dose?"
            },
            "pharm-mod2-les2-step-03": {
                "title": "Intuitive Analogy: Door Blocker vs Broken Handle",
                "prompt": "A competitive antagonist stands in the doorway (push harder to enter). A non-competitive blocker breaks the lock mechanism entirely."
            },
            "pharm-mod2-les2-step-04": {
                "title": "Dose-Response Shift Patterns",
                "prompt": "Competitive antagonists cause a parallel rightward shift with preserved Emax. Non-competitive and irreversible antagonists depress Emax."
            },
            "pharm-mod2-les2-step-05": {
                "title": "Interactive Simulator: DoseResponseCurve (Antagonism)",
                "prompt": "Add competitive vs non-competitive antagonist concentrations and observe real-time dose-ratio shifts and Schild plot kinetics."
            },
            "pharm-mod2-les2-step-06": {
                "title": "Guided Discovery: The Gaddum-Schild Equation",
                "prompt": "Calculate dose ratio (DR = [A']/[A]). Notice that doubling competitive antagonist concentration doubles the required agonist dose."
            },
            "pharm-mod2-les2-step-07": {
                "title": "Formal Formulation: Schild Equation",
                "prompt": "log(DR - 1) = log[B] - log(Kb). When Schild slope equals 1.0, antagonism is strictly competitive, reversible, and orthosteric."
            },
            "pharm-mod2-les2-step-08": {
                "title": "Concept Check: Phenoxybenzamine vs Phentolamine",
                "prompt": "Phenoxybenzamine forms a covalent aziridinium ion with alpha receptors. Why can norepinephrine never restore full Emax?"
            },
            "pharm-mod2-les2-step-09": {
                "title": "Clinical Case: Naloxone Administration Kinetics",
                "prompt": "Naloxone t1/2 is 60 minutes, while methadone t1/2 is 24 hours. Why must naloxone infusion be maintained after initial reversal?"
            },
            "pharm-mod2-les2-step-10": {
                "title": "Retrieval: Agonist Efficacy and Emax",
                "prompt": "Recall Lesson 3: What parameter describes the maximal biological response achievable by an agonist alone?"
            },
            "pharm-mod2-les2-step-11": {
                "title": "Connection: Pharmacokinetics and Clearance (Lesson 5)",
                "prompt": "Receptors determine what drugs do to the body, but what physiological processes determine drug concentrations over time?"
            },
            "pharm-mod2-les2-step-12": {
                "title": "Mastery Assessment: Distinguishing Antagonist Types",
                "prompt": "Which diagnostic signature on a log dose-response curve unequivocally identifies a reversible competitive antagonist?"
            }
        }
    },

    "pharm-mod3-les1": {
        "title": "One-Compartment Pharmacokinetics: Clearance & Half-Life",
        "objective": "Calculate clearance (Cl), volume of distribution (Vd), elimination rate constant (ke), and elimination half-life (t1/2).",
        "misconceptions": [
            "Doubling a drug dose doubles its elimination half-life."
        ],
        "steps": {
            "pharm-mod3-les1-step-01": {
                "title": "Why Renal Failure Turns Safe Doses Toxic",
                "prompt": "A standard antibiotic dose causes severe ototoxicity in a hemodialysis patient. Which fundamental pharmacokinetic parameter failed?"
            },
            "pharm-mod3-les1-step-02": {
                "title": "Prediction: Dose and Half-Life in First-Order Kinetics",
                "prompt": "Under standard first-order elimination kinetics, if you double the administered dose from 100 mg to 200 mg, what happens to t1/2?"
            },
            "pharm-mod3-les1-step-03": {
                "title": "Intuitive Analogy: The Water Tank with a Drain",
                "prompt": "Clearance is the diameter of the drainage pipe (L/h). Volume of distribution is tank size (L). Together they dictate the water drain rate."
            },
            "pharm-mod3-les1-step-04": {
                "title": "Concentration-Time Decay Profile",
                "prompt": "Semilogarithmic plotting of plasma concentration vs time yields a straight line with slope -ke / 2.303 and y-intercept C0 = Dose / Vd."
            },
            "pharm-mod3-les1-step-05": {
                "title": "Interactive Simulator: PkSimulator (One-Compartment)",
                "prompt": "Vary clearance (Cl) and volume of distribution (Vd) to observe real-time plasma decay slopes and steady-state accumulation."
            },
            "pharm-mod3-les1-step-06": {
                "title": "Guided Discovery: The t1/2 = 0.693 * Vd / Cl Relationship",
                "prompt": "Notice how expanding Vd extends half-life without changing organ elimination capacity (Cl), delaying drug washout."
            },
            "pharm-mod3-les1-step-07": {
                "title": "Formal Equations: First-Order Elimination",
                "prompt": "Ct = C0 * e^(-ke * t). Clearance: Cl = ke * Vd = Rate of elimination / C. Half-life: t1/2 = ln(2) / ke = 0.693 * Vd / Cl."
            },
            "pharm-mod3-les1-step-08": {
                "title": "Concept Check: The 5 Half-Lives Washout Rule",
                "prompt": "What percentage of a drug is eliminated from the body after 5 elimination half-lives (t = 5 * t1/2)?"
            },
            "pharm-mod3-les1-step-09": {
                "title": "Clinical Decision: Loading Dose Requirement",
                "prompt": "A patient with septic shock requires immediate therapeutic plasma concentration (10 mg/L). Vd = 50 L. Calculate required IV loading dose."
            },
            "pharm-mod3-les1-step-10": {
                "title": "Retrieval: Phase I and II Metabolism",
                "prompt": "Recall Course A Module 5: How does hepatic CYP oxidation contribute to total systemic body clearance (Cl)?"
            },
            "pharm-mod3-les1-step-11": {
                "title": "Connection: Bioavailability & First-Pass Effect (Lesson 6)",
                "prompt": "IV administration delivers 100% of dose to systemic circulation, but what happens when a drug is taken orally?"
            },
            "pharm-mod3-les1-step-12": {
                "title": "Mastery Assessment: Pharmacokinetic Parameters",
                "prompt": "If systemic clearance drops by 50% while Vd remains unchanged, what is the exact effect on elimination half-life?"
            }
        }
    },

    "pharm-mod3-les2": {
        "title": "Bioavailability, First-Pass Elimination & AUC Analysis",
        "objective": "Calculate oral bioavailability fraction (F), Area Under the Curve (AUC) ratios, and hepatic first-pass extraction.",
        "misconceptions": [
            "Oral and intravenous formulations of the same drug always require the same dose."
        ],
        "steps": {
            "pharm-mod3-les2-step-01": {
                "title": "Why Nitroglycerin Is Never Swallowed",
                "prompt": "Swallowing a 5 mg nitroglycerin pill produces zero relief for angina, while 0.5 mg sublingually relieves chest pain in 2 minutes. Why?"
            },
            "pharm-mod3-les2-step-02": {
                "title": "Prediction: The Liver's Toll Gate",
                "prompt": "If a drug has hepatic extraction ratio ER = 0.90, what fraction of an absorbed oral dose survives the liver to reach systemic circulation?"
            },
            "pharm-mod3-les2-step-03": {
                "title": "Intuitive Model: The Customs Inspection Gate",
                "prompt": "Everything absorbed through mesenteric venules passes directly through portal circulation, where hepatic enzymes extract a customs toll."
            },
            "pharm-mod3-les2-step-04": {
                "title": "AUC (Area Under the Curve) Integration",
                "prompt": "The total systemic exposure over time represents total drug absorbed into blood: AUC = Integral(0 to inf) C(t) dt = F * Dose / Cl."
            },
            "pharm-mod3-les2-step-05": {
                "title": "Interactive Simulator: PkSimulator (Bioavailability)",
                "prompt": "Compare oral absorption rate (ka) vs IV bolus curves and calculate absolute bioavailability F = (AUC_oral / AUC_iv) * (Dose_iv / Dose_oral)."
            },
            "pharm-mod3-les2-step-06": {
                "title": "Guided Discovery: Sublingual Administration Superiority",
                "prompt": "Notice how sublingual venules drain directly into the superior vena cava, bypassing portal circulation entirely."
            },
            "pharm-mod3-les2-step-07": {
                "title": "Formal Equations: Bioavailability & Hepatic Extraction",
                "prompt": "F = fa * (1 - ER_gut) * (1 - ER_liver). Hepatic extraction: ER = (Cin - Cout) / Cin = Cl_hepatic / Q_hepatic."
            },
            "pharm-mod3-les2-step-08": {
                "title": "Concept Check: Oral Dose Adjustment",
                "prompt": "A drug requires IV dose 20 mg. Its oral bioavailability is F = 0.25 (25%). What oral dose produces equivalent systemic exposure?"
            },
            "pharm-mod3-les2-step-09": {
                "title": "Clinical Application: Morphine Oral vs IV Dose",
                "prompt": "Why is oral morphine prescribed at 30 mg to match an IV dose of 10 mg in severe postoperative pain?"
            },
            "pharm-mod3-les2-step-10": {
                "title": "Retrieval: Clearance and Half-Life",
                "prompt": "Recall Lesson 5: What is the relationship between AUC, total clearance (Cl), and bioavailable dose (F * Dose)?"
            },
            "pharm-mod3-les2-step-11": {
                "title": "Connection: Autonomic Nervous System & Receptors (Module 4)",
                "prompt": "Now that we master pharmacokinetics, how do endogenous neurotransmitters regulate organ function in the autonomic nervous system?"
            },
            "pharm-mod3-les2-step-12": {
                "title": "Mastery Assessment: Bioavailability & First-Pass",
                "prompt": "Which formula correctly calculates absolute systemic bioavailability (F) from clinical pharmacokinetic trial data?"
            }
        }
    },

    "pharm-mod4-les1": {
        "title": "Autonomic Nervous System: Adrenergic Neurotransmission & Receptor Subtypes",
        "objective": "Map adrenergic alpha-1, beta-1, and beta-2 receptor signal transduction pathways to organ-specific sympathetic responses.",
        "misconceptions": [
            "Non-selective beta blockers are completely safe in asthmatic patients."
        ],
        "steps": {
            "pharm-mod4-les1-step-01": {
                "title": "Fight or Flight: One Molecule, Divergent Effects",
                "prompt": "How can adrenaline powerfully stimulate cardiac contractility while simultaneously dilating bronchial airways and constricting skin arterioles?"
            },
            "pharm-mod4-les1-step-02": {
                "title": "Prediction: Beta-2 Receptor Stimulation",
                "prompt": "Stimulation of beta-2 adrenergic receptors on bronchial smooth muscle produces which intracellular second messenger response?"
            },
            "pharm-mod4-les1-step-03": {
                "title": "Intuitive Analogy: The 1 Heart, 2 Lungs Rule",
                "prompt": "Beta-1 predominantly on the 1 heart (tachycardia, contractility). Beta-2 predominantly on the 2 lungs (bronchodilation, vasodilation in muscle)."
            },
            "pharm-mod4-les1-step-04": {
                "title": "Second Messenger Cascades: Gq vs Gs vs Gi",
                "prompt": "Alpha-1 couples to Gq (PLC -> IP3/DAG -> Ca2+). Beta-1/2 couple to Gs (Adenylate cyclase -> cAMP -> PKA). Alpha-2 couples to Gi (inhibits cAMP)."
            },
            "pharm-mod4-les1-step-05": {
                "title": "Interactive Matcher: Adrenergic Receptor Targets",
                "prompt": "Match selective agonists and antagonists (phenylephrine, clonidine, dobutamine, salbutamol) with adrenergic receptor subtypes."
            },
            "pharm-mod4-les1-step-06": {
                "title": "Guided Discovery: Non-Selective Beta-Blocker Hazard",
                "prompt": "Notice why administering propranolol (non-selective beta-1/beta-2 blocker) causes life-threatening bronchospasm in asthma patients."
            },
            "pharm-mod4-les1-step-07": {
                "title": "Formal Classification of Adrenergic Receptors",
                "prompt": "Sympathetic receptor distribution, G-protein coupling mechanisms, physiological target tissues, and clinical therapeutic indications."
            },
            "pharm-mod4-les1-step-08": {
                "title": "Concept Check: Alpha-2 Presynaptic Autoreceptor",
                "prompt": "Clonidine stimulates presynaptic alpha-2 receptors in the vasomotor center. What is its effect on peripheral norepinephrine release?"
            },
            "pharm-mod4-les1-step-09": {
                "title": "Clinical Emergency: Epinephrine in Anaphylactic Shock",
                "prompt": "Explain why adrenaline is the drug of choice in anaphylaxis: reversing hypotension via alpha-1, bronchodilation via beta-2, and cardiac output via beta-1."
            },
            "pharm-mod4-les1-step-10": {
                "title": "Retrieval: Easson-Stedman Hypothesis & Epinephrine",
                "prompt": "Recall Course A Lesson 8: Why is (R)-epinephrine 100 times more potent than (S)-epinephrine at adrenergic receptors?"
            },
            "pharm-mod4-les1-step-11": {
                "title": "Connection: Cholinergic System & Acetylcholine (Lesson 8)",
                "prompt": "Sympathetic tone accelerates heart rate and dilates pupils; what neurotransmitter mediates the counterbalancing parasympathetic brake?"
            },
            "pharm-mod4-les1-step-12": {
                "title": "Mastery Assessment: Adrenergic Signaling",
                "prompt": "Which adrenergic receptor subtype couples to Gq proteins to stimulate intracellular calcium release and smooth muscle contraction?"
            }
        }
    },

    "pharm-mod4-les2": {
        "title": "Cholinergic Transmission & Muscarinic Receptor Modulation",
        "objective": "Master acetylcholine synthesis, cholinesterase degradation, muscarinic (M1-M5) GPCR signaling, and nicotinic ion channels.",
        "misconceptions": [
            "Atropine stimulates muscarinic receptors to accelerate heart rate."
        ],
        "steps": {
            "pharm-mod4-les2-step-01": {
                "title": "Deadly Mushroom and Beautiful Lady (Belladonna)",
                "prompt": "Ingestion of Amanita muscaria causes profuse salivation and bradycardia, while Belladonna (atropine) produces dry mouth and mydriasis. Why?"
            },
            "pharm-mod4-les2-step-02": {
                "title": "Prediction: What Does Atropine Do to Heart Rate?",
                "prompt": "Atropine is a competitive antagonist at cardiac M2 muscarinic receptors. By blocking vagal acetylcholine, what happens to heart rate?"
            },
            "pharm-mod4-les2-step-03": {
                "title": "Intuitive Analogy: Rest and Digest (SLUDGE)",
                "prompt": "Parasympathetic muscarinic activation mediates: Salivation, Lacrimation, Urination, Defecation, Gastrointestinal upset, and Emesis."
            },
            "pharm-mod4-les2-step-04": {
                "title": "Muscarinic Receptor Subtypes Map (M1 to M5)",
                "prompt": "Odd numbers (M1, M3, M5) couple to Gq (IP3/DAG). Even numbers (M2, M4) couple to Gi (inhibits adenylate cyclase, opens GIRK K+ channels)."
            },
            "pharm-mod4-les2-step-05": {
                "title": "Interactive Matcher: Cholinergic Receptors & Drugs",
                "prompt": "Match pilocarpine, bethanechol, atropine, ipratropium, and physostigmine to their specific muscarinic and nicotinic targets."
            },
            "pharm-mod4-les2-step-06": {
                "title": "Guided Discovery: Organophosphate Poisoning",
                "prompt": "Observe how covalent acetylcholinesterase inhibition by sarin or parathion causes catastrophic acetylcholine flood at all cholinergic synapses."
            },
            "pharm-mod4-les2-step-07": {
                "title": "Formal Comparison: Nicotinic vs Muscarinic Architecture",
                "prompt": "Nicotinic receptors are pentameric ligand-gated ion channels (fast, Na+ influx). Muscarinic receptors are 7-transmembrane GPCRs (slow, second messengers)."
            },
            "pharm-mod4-les2-step-08": {
                "title": "Concept Check: Anticholinergic Side Effect Profile",
                "prompt": "Which symptom triad characterizes systemic muscarinic receptor blockade: 'Blind as a bat, dry as a bone, mad as a hatter'?"
            },
            "pharm-mod4-les2-step-09": {
                "title": "Clinical Application: Mydriasis for Fundus Examination",
                "prompt": "Why are short-acting antimuscarinics (tropicamide) preferred over atropine for routine ophthalmologic retinal examination?"
            },
            "pharm-mod4-les2-step-10": {
                "title": "Retrieval: Conformational Isomerism of Acetylcholine",
                "prompt": "Recall Course A Lesson 7: What conformational geometry enables acetylcholine to bind nicotinic vs muscarinic receptor states?"
            },
            "pharm-mod4-les2-step-11": {
                "title": "Connection: Cardiovascular & Renal Pharmacology (Module 5)",
                "prompt": "Autonomic nerves modulate blood pressure, but how does the renin-angiotensin-aldosterone hormonal axis govern chronic vascular tone?"
            },
            "pharm-mod4-les2-step-12": {
                "title": "Mastery Assessment: Muscarinic Signaling",
                "prompt": "Which muscarinic receptor subtype couples to Gi proteins on cardiac sinoatrial node tissue to slow heart rate?"
            }
        }
    },

    "pharm-mod5-les1": {
        "title": "Renin-Angiotensin-Aldosterone System (RAAS) Inhibition",
        "objective": "Differentiate mechanisms, hemodynamic effects, and bradykinin-mediated side effects of ACE inhibitors versus ARBs.",
        "misconceptions": [
            "Angiotensin receptor blockers (ARBs) cause the same dry cough frequency as ACE inhibitors."
        ],
        "steps": {
            "pharm-mod5-les1-step-01": {
                "title": "From Brazilian Pit Viper Venom to Blockbuster Antihypertensive",
                "prompt": "How did peptides discovered in the venom of Bothrops jararaca lead to the rational synthesis of captopril and modern ACE inhibitors?"
            },
            "pharm-mod5-les1-step-02": {
                "title": "Prediction: Blocking Angiotensin II Formation",
                "prompt": "What happens to systemic vascular resistance and plasma aldosterone levels when angiotensin-converting enzyme (ACE) is inhibited?"
            },
            "pharm-mod5-les1-step-03": {
                "title": "Intuitive Analogy: The Garden Hose and Faucet",
                "prompt": "Angiotensin II tightens the hose nozzle (vasoconstriction); aldosterone turns up faucet water volume (salt and water retention). Blocking both relieves pressure."
            },
            "pharm-mod5-les1-step-04": {
                "title": "The Complete RAAS Biochemical Pathway",
                "prompt": "Prorenin -> Renin cleaves Angiotensinogen -> Angiotensin I -> ACE cleaves to Angiotensin II -> binds AT1 receptor -> Aldosterone release."
            },
            "pharm-mod5-les1-step-05": {
                "title": "Interactive Simulator: DoseResponse Modulator (RAAS)",
                "prompt": "Modulate ACE inhibitor and ARB concentrations to observe blood pressure reduction and bradykinin accumulation dynamics."
            },
            "pharm-mod5-les1-step-06": {
                "title": "Guided Discovery: The Biochemical Cause of Dry Cough",
                "prompt": "Notice that ACE is also Kininase II, which degrades inflammatory bradykinin. Inhibiting ACE leads to pulmonary bradykinin buildup and intractable cough."
            },
            "pharm-mod5-les1-step-07": {
                "title": "Formal Comparison: ACE Inhibitors vs ARBs",
                "prompt": "ACE inhibitors block Ang I -> Ang II conversion and bradykinin breakdown. ARBs block AT1 receptors directly without altering bradykinin levels."
            },
            "pharm-mod5-les1-step-08": {
                "title": "Concept Check: Hyperkalemia Risk Mechanism",
                "prompt": "Aldosterone promotes renal sodium reabsorption in exchange for potassium secretion. Why do ACE inhibitors and ARBs cause hyperkalemia?"
            },
            "pharm-mod5-les1-step-09": {
                "title": "Clinical Case: The Coughing Hypertensive Patient",
                "prompt": "A patient taking ramipril develops a persistent non-productive dry cough. What is the evidence-based pharmacological substitution?"
            },
            "pharm-mod5-les1-step-10": {
                "title": "Retrieval: Tetrazole Bioisosterism and Losartan",
                "prompt": "Recall Course A Lesson 10: What acidic heterocycle replaced the carboxylic acid group in losartan to improve lipophilicity and metabolic stability?"
            },
            "pharm-mod5-les1-step-11": {
                "title": "Connection: Diuretics and Nephron Segments (Lesson 10)",
                "prompt": "Inhibiting aldosterone conserves potassium, but how do tubular diuretics alter sodium and electrolyte excretion along nephron segments?"
            },
            "pharm-mod5-les1-step-12": {
                "title": "Mastery Assessment: RAAS Pharmacology",
                "prompt": "Why are Angiotensin Receptor Blockers (ARBs) devoid of the classic dry cough associated with ACE inhibitors?"
            }
        }
    },

    "pharm-mod5-les2": {
        "title": "Diuretic Mechanisms & Tubular Electrolyte Transport",
        "objective": "Analyze loop, thiazide, and potassium-sparing diuretics across nephron segments and electrolyte clearance profiles.",
        "misconceptions": [
            "Loop diuretics promote calcium retention in the same manner as thiazide diuretics."
        ],
        "steps": {
            "pharm-mod5-les2-step-01": {
                "title": "Relieving Pulmonary Edema in 15 Minutes",
                "prompt": "Why can an intravenous bolus of furosemide relieve suffocating acute pulmonary edema within minutes, even before major diuresis begins?"
            },
            "pharm-mod5-les2-step-02": {
                "title": "Prediction: Most Powerful Diuretic Segment",
                "prompt": "Which segment of the human nephron reabsorbs 25% of filtered sodium, making its blockers the most efficacious 'high-ceiling' diuretics?"
            },
            "pharm-mod5-les2-step-03": {
                "title": "Intuitive Analogy: Where Salt Goes, Water Follows",
                "prompt": "Water moves obligatorily along osmotic gradients. Blocking sodium transporters traps salt in the tubule lumen, dragging water out into urine."
            },
            "pharm-mod5-les2-step-04": {
                "title": "Nephron Transporter Anatomy Across Segments",
                "prompt": "Proximal tubule (CA inhibitors) -> Thick ascending limb (NKCC2 / Loop) -> Distal convoluted tubule (NCCT / Thiazides) -> Collecting duct (ENaC / K+-sparing)."
            },
            "pharm-mod5-les2-step-05": {
                "title": "Interactive Simulator: Ionization & Tubular Transport",
                "prompt": "Select nephron segments to observe electrolyte clearance (Na+, K+, Cl-, Ca2+, HCO3-) under furosemide, hydrochlorothiazide, and spironolactone."
            },
            "pharm-mod5-les2-step-06": {
                "title": "Guided Discovery: The Hypokalemia Paradox",
                "prompt": "Observe why blocking sodium reabsorption upstream floods the collecting tubule with Na+, triggering excessive aldosterone-driven K+ and H+ secretion."
            },
            "pharm-mod5-les2-step-07": {
                "title": "Formal Comparison: Electrolyte & Acid-Base Signatures",
                "prompt": "Loop diuretics: Ca2+ wasting, hypokalemic metabolic alkalosis. Thiazides: Ca2+ sparing (hypercalcemia), hypokalemic metabolic alkalosis."
            },
            "pharm-mod5-les2-step-08": {
                "title": "Concept Check: Hypertensive Patient with Osteoporosis",
                "prompt": "Why are thiazide diuretics uniquely advantageous for hypertensive patients with concurrent osteoporosis?"
            },
            "pharm-mod5-les2-step-09": {
                "title": "Combination Art: Thiazide Plus Spironolactone",
                "prompt": "Why is spironolactone or amiloride frequently co-prescribed with hydrochlorothiazide in essential hypertension?"
            },
            "pharm-mod5-les2-step-10": {
                "title": "Retrieval: Henderson-Hasselbalch and Ion Trapping",
                "prompt": "Recall Course A Lesson 2: How can alkalinizing urine with sodium bicarbonate accelerate the excretion of weakly acidic drugs like aspirin?"
            },
            "pharm-mod5-les2-step-11": {
                "title": "Connection: Central Nervous System Neuropharmacology (Module 6)",
                "prompt": "Renal electrolyte transporters regulate peripheral fluid balance, but how do neuronal chloride channels regulate central nervous inhibition?"
            },
            "pharm-mod5-les2-step-12": {
                "title": "Mastery Assessment: Diuretic Transport Targets",
                "prompt": "Which molecular transporter in the thick ascending limb of the loop of Henle is selectively inhibited by furosemide?"
            }
        }
    },

    "pharm-mod6-les1": {
        "title": "GABAergic Neurotransmission & Positive Allosteric Modulators",
        "objective": "Differentiate allosteric mechanisms and safety profiles of benzodiazepines versus barbiturates on GABA-A chloride channels.",
        "misconceptions": [
            "Benzodiazepines open chloride channels in the total absence of GABA."
        ],
        "steps": {
            "pharm-mod6-les1-step-01": {
                "title": "The Brain's Master Brake Pedal",
                "prompt": "Why can an overactive neuronal circuit trigger epileptic seizures within milliseconds, and how does GABA restore tranquil electrical silence?"
            },
            "pharm-mod6-les1-step-02": {
                "title": "Prediction: Benzodiazepine in the Absence of GABA",
                "prompt": "If diazepam is administered into a neuron culture dish without any GABA present, does the chloride channel open?"
            },
            "pharm-mod6-les1-step-03": {
                "title": "Intuitive Analogy: Oiling the Door Hinges",
                "prompt": "GABA is the person opening the door. Benzodiazepines oil the hinges so the door opens more frequently. Barbiturates prop the door open longer."
            },
            "pharm-mod6-les1-step-04": {
                "title": "GABA-A Pentameric Chloride Channel Complex",
                "prompt": "Heteropentamer (typically 2-alpha, 2-beta, 1-gamma). Orthosteric GABA binding at alpha-beta interface; allosteric benzodiazepine binding at alpha-gamma interface."
            },
            "pharm-mod6-les1-step-05": {
                "title": "Interactive Simulator: DoseResponse Modulator (Allosteric Shift)",
                "prompt": "Observe the leftward parallel shift of GABA concentration-response curves upon adding benzodiazepines vs barbiturate direct opening."
            },
            "pharm-mod6-les1-step-06": {
                "title": "Guided Discovery: Benzodiazepine vs Barbiturate Safety",
                "prompt": "Notice why barbiturates have a low therapeutic index: at high doses, barbiturates directly gate chloride channels even without GABA, causing fatal apnea."
            },
            "pharm-mod6-les1-step-07": {
                "title": "Formal Electrophysiology: Hyperpolarization & Shunt Inhibition",
                "prompt": "Chloride influx (Cl-) drives resting membrane potential toward -70 mV, moving it further from action potential threshold (-55 mV)."
            },
            "pharm-mod6-les1-step-08": {
                "title": "Concept Check: Frequency vs Duration of Channel Opening",
                "prompt": "Which mnemonic correctly captures the electrophysiological mechanism: 'Ben FREQs, Barb DURATION'?"
            },
            "pharm-mod6-les1-step-09": {
                "title": "Clinical Antidote: Rescue with Flumazenil",
                "prompt": "Flumazenil is a competitive antagonist at the benzodiazepine allosteric site. Why does it reverse midazolam sedation without blocking GABA?"
            },
            "pharm-mod6-les1-step-10": {
                "title": "Retrieval: Types of Receptor Antagonism",
                "prompt": "Recall Lesson 4: How does an allosteric modulator differ functionally from an orthosteric competitive antagonist?"
            },
            "pharm-mod6-les1-step-11": {
                "title": "Connection: Dopaminergic Pathways & Antipsychotics (Lesson 12)",
                "prompt": "GABA regulates global inhibition, but what central monoaminergic neurotransmitter pathways govern psychosis and motor control?"
            },
            "pharm-mod6-les1-step-12": {
                "title": "Mastery Assessment: GABA-A Modulation",
                "prompt": "Which molecular event explains why benzodiazepines possess a dramatically higher margin of safety than barbiturates?"
            }
        }
    },

    "pharm-mod6-les2": {
        "title": "Dopaminergic Pathways & Antipsychotic Receptor Profiles",
        "objective": "Analyze four central dopaminergic pathways, the 65-80% D2 occupancy therapeutic window, and atypical 5-HT2A/D2 balance.",
        "misconceptions": [
            "Higher D2 receptor occupancy (>80%) provides superior antipsychotic efficacy without extrapyramidal symptoms."
        ],
        "steps": {
            "pharm-mod6-les2-step-01": {
                "title": "Quieting Hallucinations While Freezing the Body",
                "prompt": "Why did first-generation antipsychotics like haloperidol silence psychotic voices while locking patients in Parkinsonian rigidity and tremor?"
            },
            "pharm-mod6-les2-step-02": {
                "title": "Prediction: The Ideal D2 Receptor Occupancy Window",
                "prompt": "What percentage of striatal D2 dopamine receptors must be occupied by an antipsychotic to achieve efficacy while avoiding extrapyramidal symptoms?"
            },
            "pharm-mod6-les2-step-03": {
                "title": "Intuitive Model: One Switch Controlling Four Distinct Rooms",
                "prompt": "Blocking dopamine in the mesolimbic room calms psychosis; blocking it in the nigrostriatal room causes parkinsonism; in tuberoinfundibular causes hyperprolactinemia."
            },
            "pharm-mod6-les2-step-04": {
                "title": "Map of the Four Central Dopamine Pathways",
                "prompt": "1. Mesolimbic (positive symptoms). 2. Mesocortical (negative/cognitive symptoms). 3. Nigrostriatal (motor control). 4. Tuberoinfundibular (prolactin regulation)."
            },
            "pharm-mod6-les2-step-05": {
                "title": "Interactive Workshop: Receptor Matcher (D2 / 5-HT2A)",
                "prompt": "Compare typical (haloperidol) vs atypical antipsychotics (clozapine, risperidone, olanzapine) across D2 and 5-HT2A receptor affinities."
            },
            "pharm-mod6-les2-step-06": {
                "title": "Guided Discovery: The 5-HT2A Rescue Mechanism",
                "prompt": "Observe how serotonin 5-HT2A antagonism disinhibits dopamine release specifically in the nigrostriatal pathway, mitigating motor side effects."
            },
            "pharm-mod6-les2-step-07": {
                "title": "Formal Neuropharmacology: PET D2 Occupancy Window",
                "prompt": "Antipsychotic therapeutic efficacy requires 65% to 80% striatal D2 receptor occupancy. Exceeding 80% sharply escalates extrapyramidal motor toxicity."
            },
            "pharm-mod6-les2-step-08": {
                "title": "Concept Check: Tuberoinfundibular Pathway & Prolactin",
                "prompt": "Dopamine functions physiologically as Prolactin-Inhibiting Factor. What clinical complication arises from chronic D2 blockade in this pathway?"
            },
            "pharm-mod6-les2-step-09": {
                "title": "Clinical Decision: Transitioning from Typical to Atypical",
                "prompt": "A patient with schizophrenia develops acute dystonia on haloperidol. Why does switching to quetiapine or aripiprazole relieve motor symptoms?"
            },
            "pharm-mod6-les2-step-10": {
                "title": "Retrieval: Reversible Kinetics and Fast Koff",
                "prompt": "Recall Lesson 1: How does rapid unbinding kinetics (fast Koff) explain why clozapine rarely induces tardive dyskinesia?"
            },
            "pharm-mod6-les2-step-11": {
                "title": "Grand Finale: Completing the 22-Lesson Curriculum",
                "prompt": "Reflect on how physical chemistry, stereochemistry, bioisosterism, pharmacokinetics, and receptor pharmacology unite in rational drug design."
            },
            "pharm-mod6-les2-step-12": {
                "title": "Curriculum Mastery Assessment: The D2 Therapeutic Window",
                "prompt": "What is the validated striatal D2 dopamine receptor occupancy window that provides maximal antipsychotic efficacy with minimal motor side effects?"
            }
        }
    }
}

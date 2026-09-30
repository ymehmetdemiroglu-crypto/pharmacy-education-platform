"""
scripts/translations_medchem.py

Academic English Translations for Course A: Farmasötik Kimya (Lessons 1 to 10).
Complies with Foye's Principles of Medicinal Chemistry and Marmara University Faculty of Pharmacy lecture decks.
"""

MEDCHEM_TRANSLATIONS = {
    "mc-mod1-les1": {
        "title": "Thermodynamic Activity & The Ferguson Principle",
        "objective": "Differentiate structurally specific from structurally non-specific drugs using thermodynamic activity thresholds.",
        "misconceptions": [
            "All drugs bind specific stereoselective receptor pockets.",
            "Lower effective dose always indicates higher intrinsic toxicity.",
            "Structurally non-specific drugs lack biological activity."
        ],
        "steps": {
            "mc-mod1-les1-step-01": {
                "title": "Clinical Paradox: Grams vs Micrograms",
                "prompt": "General anesthesia with ether requires tens of grams, while beta-blocker propranolol acts at milligram doses. What causes this immense dose divergence?"
            },
            "mc-mod1-les1-step-02": {
                "title": "Prediction: Anesthesia at Equal Saturation",
                "prompt": "When chemically diverse volatile agents reach equal relative saturation (Pt / P0), how does their depth of anesthesia compare?"
            },
            "mc-mod1-les1-step-03": {
                "title": "Intuitive Model: Escaping Tendency from Membrane",
                "prompt": "Thermodynamic activity measures a molecule's escaping tendency from its biophasic solution into target cellular lipid bilayers."
            },
            "mc-mod1-les1-step-04": {
                "title": "Visualization: Lipid Bilayer Expansion",
                "prompt": "Accumulation of structurally non-specific molecules expands the neuronal membrane volume, mechanically compressing vital ion channel pores."
            },
            "mc-mod1-les1-step-05": {
                "title": "Interactive Simulation: Ferguson Slider",
                "prompt": "Modulate partial vapor pressure (Pt) to examine the iso-activity anesthetic window (a ≈ 0.02 - 0.05) and phase cutoff boundaries."
            },
            "mc-mod1-les1-step-06": {
                "title": "Guided Discovery: Nitrous Oxide vs Chloroform",
                "prompt": "Notice how N2O and chloroform produce identical surgical depth at a ≈ 0.04 despite a 240-fold difference in absolute saturation pressure."
            },
            "mc-mod1-les1-step-07": {
                "title": "Formal Formulation: Ferguson's Principle",
                "prompt": "For non-specific agents, thermodynamic activity in the biophase equals relative saturation in external phase: a = Pt / P0 = St / S0."
            },
            "mc-mod1-les1-step-08": {
                "title": "Concept Check: Classifying Mystery Compounds",
                "prompt": "Drug A exerts sedation at a = 0.04 (dose 2.5 g). Drug B binds a target at a = 0.0001 (dose 2 mg). Classify their mechanisms."
            },
            "mc-mod1-les1-step-09": {
                "title": "Application: Volatile Inhalation Dose Calculation",
                "prompt": "A volatile anesthetic has saturation vapor pressure P0 = 200 mmHg. Inhalation anesthesia occurs at partial pressure Pt = 8 mmHg. Calculate a."
            },
            "mc-mod1-les1-step-10": {
                "title": "Retrieval: Raoult's Law from General Chemistry",
                "prompt": "In ideal gas-liquid solutions, how does partial vapor pressure over a solution relate to mole fraction and saturation vapor pressure?"
            },
            "mc-mod1-les1-step-11": {
                "title": "Connection: Solubility and Ionization (Lesson 2)",
                "prompt": "Thermodynamic activity governs non-specific agents, but how does aqueous ionization dictate membrane crossing for specific drugs?"
            },
            "mc-mod1-les1-step-12": {
                "title": "Mastery Assessment: Ferguson Principle Summary",
                "prompt": "Which definitive criterion proves that a series of hypnotic drugs operates via a structurally non-specific biophysical mechanism?"
            }
        }
    },

    "mc-mod1-les2": {
        "title": "Solubility, Ionization & Dielectric Constant",
        "objective": "Calculate drug ionization fraction using the Henderson-Hasselbalch equation and predict membrane permeation across biological barriers.",
        "misconceptions": [
            "Acids are always charged, whereas bases are always neutral.",
            "Ionized species can readily cross lipid bilayers via passive diffusion."
        ],
        "steps": {
            "mc-mod1-les2-step-01": {
                "title": "Stomach or Intestine?",
                "prompt": "Does aspirin (pKa = 3.5) cross biological membranes faster across the acidic gastric mucosa (pH 1.5) or basic intestinal lumen (pH 6.5)?"
            },
            "mc-mod1-les2-step-02": {
                "title": "Prediction: Charge State in Acidic Medium",
                "prompt": "What percentage of weak acid aspirin is ionized in the gastric lumen at pH 1.5?"
            },
            "mc-mod1-les2-step-03": {
                "title": "Intuitive Analogy: Water Shield & Lipid Gate",
                "prompt": "Charged ions surround themselves with a dense hydration shell, unable to enter greasy lipid bilayers. Neutral molecules slip through easily."
            },
            "mc-mod1-les2-step-04": {
                "title": "Mechanism Diagram: Ion Trapping",
                "prompt": "Once neutral molecules diffuse into blood (pH 7.4), they ionize into charged species and cannot return. This is ion trapping."
            },
            "mc-mod1-les2-step-05": {
                "title": "Interactive Simulator: Ionization Slider",
                "prompt": "Sweep the pH slider between 1.0 and 8.0 to observe the dramatic shift in aspirin and propranolol ionization and membrane flux."
            },
            "mc-mod1-les2-step-06": {
                "title": "Guided Discovery: Basic Drug Absorption",
                "prompt": "Select weak base propranolol (pKa = 9.5). In the stomach at pH 1.5, what fraction is protonated (BH+) and can it be absorbed?"
            },
            "mc-mod1-les2-step-07": {
                "title": "Formal Principles: Henderson-Hasselbalch Equations",
                "prompt": "For weak acids: pH = pKa + log([A-]/[HA]). For weak bases: pH = pKa + log([B]/[BH+]). Ionization is also governed by medium dielectric constant."
            },
            "mc-mod1-les2-step-08": {
                "title": "Concept Check: Urinary Alkalinization",
                "prompt": "In phenobarbital toxicity (weak acid, pKa = 7.4), IV sodium bicarbonate raises urine pH to 8.0. How does renal clearance change?"
            },
            "mc-mod1-les2-step-09": {
                "title": "Clinical Decision: Local Anesthetic Injection",
                "prompt": "Why does lidocaine injection (weak base, pKa = 7.9) fail to achieve anesthesia when injected into acidic, inflamed abscess tissue (pH 5.0)?"
            },
            "mc-mod1-les2-step-10": {
                "title": "Retrieval: Saturation & Thermodynamic Activity",
                "prompt": "As learned in Lesson 1, what thermodynamic property drives non-specific drug molecules from blood into cellular lipid bilayers?"
            },
            "mc-mod1-les2-step-11": {
                "title": "Forward Connection: Functional Groups & Bonds (Module 2)",
                "prompt": "Ionization generates formal electrostatic charges. In Module 2, we explore how these charges form powerful ionic bonds with receptor residues."
            },
            "mc-mod1-les2-step-12": {
                "title": "Mastery Assessment: Ionization & Membrane Permeation",
                "prompt": "To maximize passive lipid membrane permeation of a weak acid drug, how must ambient pH compare to the drug's pKa?"
            }
        }
    },

    "mc-mod2-les1": {
        "title": "Functional Groups & Intermolecular Forces",
        "objective": "Analyze the bond energies and SAR contributions of non-covalent forces stabilizing the drug-receptor complex.",
        "misconceptions": [
            "Non-covalent bonds are too weak to anchor a drug firmly to its biological receptor.",
            "Hydrophobic interactions arise from an intrinsic attractive force between carbon chains."
        ],
        "steps": {
            "mc-mod2-les1-step-01": {
                "title": "Transient Contacts, High Affinity",
                "prompt": "If individual hydrogen bonds have only 2-5 kcal/mol energy, how can non-covalent drug binding achieve nanomolar affinity?"
            },
            "mc-mod2-les1-step-02": {
                "title": "Prediction: Bond Hierarchy",
                "prompt": "Rank the following intermolecular forces in order of individual bond strength: Ionic, Hydrogen Bond, Van der Waals, Covalent."
            },
            "mc-mod2-les1-step-03": {
                "title": "Molecular Intuition: Velcro Analogy",
                "prompt": "Each tiny hook of Velcro is weak on its own, but hundreds of microscopic hooks acting together create an unbreakable grip."
            },
            "mc-mod2-les1-step-04": {
                "title": "Visual Structural Map: Distance Dependency",
                "prompt": "Ionic bonds decay with 1/r, dipole interactions with 1/r^3, and London dispersion forces require tight atomic contact decaying with 1/r^6."
            },
            "mc-mod2-les1-step-05": {
                "title": "Interactive Artifact: SAR Explorer (Bond Tuning)",
                "prompt": "Mutate functional groups on the ligand scaffold. Observe how replacing an OH group with CH3 eliminates hydrogen bonding."
            },
            "mc-mod2-les1-step-06": {
                "title": "Guided Discovery: Hydrophobic Collapse & Entropy",
                "prompt": "When nonpolar alkyl chains bury into a hydrophobic pocket, structured water cages collapse, driving binding through favourable entropy (+ΔS)."
            },
            "mc-mod2-les1-step-07": {
                "title": "Formal Equations: Gibbs Free Energy",
                "prompt": "Binding affinity follows ΔG° = -RT ln(Ka) = ΔH° - TΔS°. Each 1.4 kcal/mol gain in binding free energy improves affinity 10-fold."
            },
            "mc-mod2-les1-step-08": {
                "title": "Concept Check: Salt Bridge Disruption",
                "prompt": "Replacing a protonated amine (-NH3+) with a neutral methyl group (-CH3) drops binding affinity 1000-fold. What interaction was broken?"
            },
            "mc-mod2-les1-step-09": {
                "title": "Application: Designing Inhaled Anticholinergics",
                "prompt": "Why does quaternary ammonium ipratropium remain confined to bronchial tissue without crossing the blood-brain barrier into the CNS?"
            },
            "mc-mod2-les1-step-10": {
                "title": "Retrieval: Dielectric Constant & Bond Strength",
                "prompt": "According to Coulomb's Law, how does ionic bond strength between two charges change inside a low-dielectric hydrophobic binding pocket?"
            },
            "mc-mod2-les1-step-11": {
                "title": "Forward Connection: Optical Chirality & 3-Point Binding",
                "prompt": "In Lesson 4, we examine how spatial arrangement of these functional groups creates dramatic potency differences between enantiomers."
            },
            "mc-mod2-les1-step-12": {
                "title": "Mastery Assessment: Scaffold Optimization Rationale",
                "prompt": "Which structural modification most effectively increases ligand residence time on target without causing irreversible toxicity?"
            }
        }
    },

    "mc-mod2-les2": {
        "title": "Optical Chirality & Easson-Stedman 3-Point Binding",
        "objective": "Explain the stereochemical rationale for enantiomeric potency differences using the Easson-Stedman 3-point attachment hypothesis.",
        "misconceptions": [
            "Enantiomers have identical pharmacological and toxicological properties in vivo.",
            "The inactive enantiomer (distomer) is completely inert and harmless."
        ],
        "steps": {
            "mc-mod2-les2-step-01": {
                "title": "The Thalidomide Lesson: Mirror Molecules",
                "prompt": "How can two molecules with identical atoms, bond lengths, and functional groups display curative sedation versus catastrophic teratogenicity?"
            },
            "mc-mod2-les2-step-02": {
                "title": "Prediction: 3-Point vs 2-Point Contact",
                "prompt": "If (R)-epinephrine forms 3 contacts with the adrenoceptor while (S)-epinephrine forms only 2, by what magnitude will their affinities diverge?"
            },
            "mc-mod2-les2-step-03": {
                "title": "Intuitive Model: Left Hand, Right Glove",
                "prompt": "A right hand fits comfortably into a right-handed leather glove. Forcing a left hand into the same glove misaligns every contact point."
            },
            "mc-mod2-les2-step-04": {
                "title": "Visual Mechanism: Easson-Stedman Model",
                "prompt": "Three pharmacophore groups (aromatic ring, beta-hydroxyl, protonated amine) must simultaneously dock with complementary receptor pockets."
            },
            "mc-mod2-les2-step-05": {
                "title": "Interactive Artifact: Chiral Receptor Docking",
                "prompt": "Rotate the chiral center. Observe how inverting configuration from (R) to (S) points the critical hydroxyl outward into empty space."
            },
            "mc-mod2-les2-step-06": {
                "title": "Guided Discovery: Pfeiffer's Rule Dynamics",
                "prompt": "Notice that as intrinsic affinity of the active eutomer increases, the enantiomeric potency ratio (eutomer/distomer) widens dramatically."
            },
            "mc-mod2-les2-step-07": {
                "title": "Formal Formulation: Pfeiffer's Rule & Free Energy",
                "prompt": "Pfeiffer's Rule states that stereospecificity is greater in high-potency drugs because binding pocket complementarity is more stringent."
            },
            "mc-mod2-les2-step-08": {
                "title": "Concept Check: Distomer Toxicity",
                "prompt": "In ketamine anesthesia, which enantiomer carries higher risk of emergence delirium and dysphoric psychotomimetic side effects?"
            },
            "mc-mod2-les2-step-09": {
                "title": "Application: Chiral Switch Strategy",
                "prompt": "Why did developing esomeprazole (single S-enantiomer) from racemic omeprazole offer clinical advantages in metabolic predictability?"
            },
            "mc-mod2-les2-step-10": {
                "title": "Retrieval: Intermolecular Forces Review",
                "prompt": "Which specific non-covalent bond is lost when (S)-epinephrine's beta-hydroxyl fails to contact the receptor's Ser residue?"
            },
            "mc-mod2-les2-step-11": {
                "title": "Forward Connection: Bioisosteric Replacement (Module 3)",
                "prompt": "In Module 3, we discover how medicinal chemists replace entire functional groups with isosteric mimics while maintaining chirality."
            },
            "mc-mod2-les2-step-12": {
                "title": "Mastery Assessment: Stereochemical Bioactivity",
                "prompt": "What molecular circumstance allows two enantiomers of a drug to produce virtually identical biological responses?"
            }
        }
    },

    "mc-mod3-les1": {
        "title": "Classical Bioisosterism & Grimm Hydride Displacement",
        "objective": "Apply Grimm's Hydride Displacement Law and classical bioisosteric replacements to optimize drug metabolic stability and potency.",
        "misconceptions": [
            "Bioisosteres must possess the same chemical elements.",
            "Adding fluorine always increases molecular bulk and steric hindrance."
        ],
        "steps": {
            "mc-mod3-les1-step-01": {
                "title": "Metabolic Camouflage: Uracil vs 5-FU",
                "prompt": "Why does substituting a tiny hydrogen with fluorine turn nutrient uracil into the lethal anticancer weapon 5-Fluorouracil (5-FU)?"
            },
            "mc-mod3-les1-step-02": {
                "title": "Prediction: Grimm Hydride Displacement",
                "prompt": "According to Grimm's Law, adding hydrogen to an element mimics the valence electron configuration of the element to its right. What mimics -OH?"
            },
            "mc-mod3-les1-step-03": {
                "title": "Intuitive Model: Molecular Stunt Doubles",
                "prompt": "Like an actor's stunt double wearing the same costume, bioisosteres share shape, electron density, and size, fooling receptor proteins."
            },
            "mc-mod3-les1-step-04": {
                "title": "Visual Diagram: Classical Isostere Groups",
                "prompt": "Univalent (-CH3, -NH2, -OH, -F, -Cl), Bivalent (-CH2-, -NH-, -O-, -S-), and Ring equivalents (benzene vs pyridine vs thiophene)."
            },
            "mc-mod3-les1-step-05": {
                "title": "Interactive Artifact: Structure Identifier",
                "prompt": "Swap functional groups across a lead scaffold. Observe changes in Van der Waals volume, polar surface area, and metabolic liability."
            },
            "mc-mod3-les1-step-06": {
                "title": "Guided Discovery: Ring Equivalents in Antihistamines",
                "prompt": "Replace a phenyl ring with 2-thienyl or 2-pyridyl. Notice how receptor affinity is maintained while aqueous solubility improves."
            },
            "mc-mod3-les1-step-07": {
                "title": "Formal Formulation: Erlenmeyer & Friedman Isosteres",
                "prompt": "Friedman defined bioisosteres as compounds whose structural resemblance creates similar biological activity despite chemical divergence."
            },
            "mc-mod3-les1-step-08": {
                "title": "Concept Check: Suicide Inhibition of Thymidylate Synthase",
                "prompt": "In 5-FU, why cannot thymidylate synthase complete its catalytic cycle after attacking the C6 position of the fluorinated pyrimidine?"
            },
            "mc-mod3-les1-step-09": {
                "title": "Application: Blocking Aromatic Hydroxylation",
                "prompt": "Para-position aromatic rings often suffer rapid CYP oxidation to phenols. What univalent classical isostere is installed to block metabolism?"
            },
            "mc-mod3-les1-step-10": {
                "title": "Retrieval: Van der Waals Radii",
                "prompt": "How does the Van der Waals radius of fluorine (1.47 Å) compare to hydrogen (1.20 Å) and oxygen (1.52 Å)?"
            },
            "mc-mod3-les1-step-11": {
                "title": "Forward Connection: Non-Classical Bioisosteres (Lesson 6)",
                "prompt": "Next, we explore non-classical isosteres like tetrazoles, which mimic carboxylic acids despite completely different geometries."
            },
            "mc-mod3-les1-step-12": {
                "title": "Mastery Assessment: Classical Isosteric Strategy",
                "prompt": "Which substitution represents a valid univalent classical bioisosteric replacement under Erlenmeyer's expanded valence rules?"
            }
        }
    },

    "mc-mod3-les2": {
        "title": "Non-Classical Bioisosteres: Carboxylic Acid & Tetrazole",
        "objective": "Differentiate classical from non-classical bioisosteres and justify the replacement of carboxylic acids with tetrazoles in drug design.",
        "misconceptions": [
            "A 5-membered tetrazole ring cannot mimic a simple carboxylic acid group.",
            "Tetrazole is non-acidic because it contains four nitrogen atoms without an oxygen."
        ],
        "steps": {
            "mc-mod3-les2-step-01": {
                "title": "The Losartan Breakthrough: Overcoming Oral Barrier",
                "prompt": "Early AT1 antagonists carrying benzoic acid failed clinical trials due to poor oral bioavailability. How did a tetrazole ring rescue losartan?"
            },
            "mc-mod3-les2-step-02": {
                "title": "Prediction: Tetrazole Charge at Physiological pH",
                "prompt": "A 5-substituted tetrazole has pKa ≈ 4.5 - 4.9. What percentage of tetrazole is negatively charged in systemic blood at pH 7.4?"
            },
            "mc-mod3-les2-step-03": {
                "title": "Intuitive Model: Charge Delocalization Shield",
                "prompt": "In carboxylic acid, negative charge is concentrated between two oxygens. In tetrazole, the charge delocalizes over 5 ring atoms, boosting lipophilicity."
            },
            "mc-mod3-les2-step-04": {
                "title": "Visual Comparison: -COOH vs 5-Tetrazolyl",
                "prompt": "Compare planar geometries, electrostatic potential surface maps, and hydrogen-bonding acceptor/donor vectors of both groups."
            },
            "mc-mod3-les2-step-05": {
                "title": "Interactive Artifact: LogP / LogD Bioisostere Switch",
                "prompt": "Toggle between -COOH and -Tetrazole on losartan core. Compare logP, membrane permeability flux, and metabolic glucuronidation susceptibility."
            },
            "mc-mod3-les2-step-06": {
                "title": "Guided Discovery: Metabolic Glucuronide Stability",
                "prompt": "Acyl glucuronides of carboxylic acids undergo spontaneous hydrolysis and covalent protein adduct formation. Tetrazoles resist this completely."
            },
            "mc-mod3-les2-step-07": {
                "title": "Formal Definition: Non-Classical Bioisosterism",
                "prompt": "Non-classical bioisosteres produce similar biological effects by mimicking spatial arrangement or electronic properties without identical atom count."
            },
            "mc-mod3-les2-step-08": {
                "title": "Concept Check: Additional Acid Bioisosteres",
                "prompt": "Which of the following functional groups also serves as an effective non-classical bioisostere for a carboxylic acid: Hydroxamic acid or Ester?"
            },
            "mc-mod3-les2-step-09": {
                "title": "Application: Angiotensin Receptor Blockers (ARBs)",
                "prompt": "Identify why valsartan, candesartan, and irbesartan all incorporate tetrazole rings instead of simple aliphatic carboxylic acids."
            },
            "mc-mod3-les2-step-10": {
                "title": "Retrieval: Henderson-Hasselbalch Equation",
                "prompt": "Using pH = pKa + log([A-]/[HA]), calculate the ratio of ionized to unionized tetrazole (pKa = 4.9) at physiological blood pH 7.4."
            },
            "mc-mod3-les2-step-11": {
                "title": "Forward Connection: Conformational Rigidity (Module 4)",
                "prompt": "In Module 4, we examine how locking flexible bonds into rigid aromatic rings increases binding affinity by minimizing entropic penalty."
            },
            "mc-mod3-les2-step-12": {
                "title": "Mastery Assessment: Tetrazole Bioisosteric Rationale",
                "prompt": "What is the primary pharmacokinetic superiority of tetrazole over carboxylic acid in oral cardiovascular therapeutics?"
            }
        }
    },

    "mc-mod4-les1": {
        "title": "Eutomers, Distomers & Pfeiffer's Rule",
        "objective": "Quantify stereoselective drug action through eudismic ratios and apply Pfeiffer's rule to predict target binding fidelity.",
        "misconceptions": [
            "Pfeiffer's rule applies equally to structurally non-specific drugs.",
            "A distomer with low target affinity never causes off-target adverse effects."
        ],
        "steps": {
            "mc-mod4-les1-step-01": {
                "title": "The S-Ibuprofen Dilemma: In Vivo Inversion",
                "prompt": "Racemic ibuprofen contains 50% inactive (R)-isomer, yet in humans it exhibits near-full potency. What biochemical sorcery occurs in vivo?"
            },
            "mc-mod4-les1-step-02": {
                "title": "Prediction: Eudismic Index & Receptor Affinity",
                "prompt": "If eutomer Drug X has Kd = 1 nM while distomer has Kd = 1000 nM, what is the eudismic ratio and eudismic index (EI)?"
            },
            "mc-mod4-les1-step-03": {
                "title": "Intuitive Model: Key in Cylinder Lock",
                "prompt": "The eutomer possesses the precise groove pattern to align pins. The distomer enters halfway, jams the mechanism, or turns an unintended lock."
            },
            "mc-mod4-les1-step-04": {
                "title": "Visual Diagram: Pfeiffer's Correlation Curve",
                "prompt": "Plotting log(Eudismic Ratio) versus log(Eutomer Affinity) produces a linear positive correlation across diverse target families."
            },
            "mc-mod4-les1-step-05": {
                "title": "Interactive Artifact: Pfeiffer Rule Regression",
                "prompt": "Select different drug classes (beta-blockers, opiates, anticholinergics). Observe how high-affinity agonists exhibit massive eudismic ratios."
            },
            "mc-mod4-les1-step-06": {
                "title": "Guided Discovery: Chiral Inversion Mechanism",
                "prompt": "Track (R)-ibuprofen acyl-CoA synthetase activation, epimerase inversion, and thioesterase cleavage generating active (S)-ibuprofen."
            },
            "mc-mod4-les1-step-07": {
                "title": "Formal Formulation: Eudismic Ratio (ER)",
                "prompt": "Eudismic Ratio = Potency(Eutomer) / Potency(Distomer). Eudismic Index (EI) = log10(ER). Higher values denote tighter binding pocket geometry."
            },
            "mc-mod4-les1-step-08": {
                "title": "Concept Check: Distomer-Mediated Toxicities",
                "prompt": "Which famous cardiovascular distomer causes cardiac arrhythmias and respiratory depression while lacking antiarrhythmic potency?"
            },
            "mc-mod4-les1-step-09": {
                "title": "Application: Single-Enantiomer Development (Chiral Switches)",
                "prompt": "Evaluate the regulatory and clinical advantages of levocetirizine over racemic cetirizine in terms of daily milligram dose and sedation."
            },
            "mc-mod4-les1-step-10": {
                "title": "Retrieval: Easson-Stedman 3-Point Hypothesis",
                "prompt": "Recall why the distomer fails to trigger maximal receptor response even when bound inside the binding pocket."
            },
            "mc-mod4-les1-step-11": {
                "title": "Forward Connection: Conformational Rigidity (Lesson 8)",
                "prompt": "Beyond configuration, molecules rotate around single bonds. In Lesson 8, we freeze rotational degrees of freedom to supercharge potency."
            },
            "mc-mod4-les1-step-12": {
                "title": "Mastery Assessment: Pfeiffer's Rule Limits",
                "prompt": "Under what biophysical condition does Pfeiffer's rule completely collapse and show zero correlation?"
            }
        }
    },

    "mc-mod4-les2": {
        "title": "Conformational Isomerism: Rigid & Flexible Scaffolds",
        "objective": "Design conformationally constrained drug scaffolds to eliminate entropic penalties and achieve target-selective binding.",
        "misconceptions": [
            "A flexible drug is always superior because it can adapt to multiple receptor shapes.",
            "The lowest-energy conformer in water is always the bioactive conformer bound to the receptor."
        ],
        "steps": {
            "mc-mod4-les2-step-01": {
                "title": "Acetylcholine's Double Life: Muscarinic or Nicotinic?",
                "prompt": "How can tiny, flexible acetylcholine activate both muscarinic GPCRs and nicotinic ion channels with high affinity and distinct pharmacophores?"
            },
            "mc-mod4-les2-step-02": {
                "title": "Prediction: Entropic Cost of Free Rotation",
                "prompt": "When a ligand with 8 freely rotating single bonds freezes into a single binding pose, how does this affect binding free energy (ΔG)?"
            },
            "mc-mod4-les2-step-03": {
                "title": "Intuitive Model: Spaghetti vs Pretzel",
                "prompt": "Boiled flexible spaghetti flails in all directions, losing heat and energy to coil up. A crispy pretzel is pre-shaped to slot instantly into a toaster."
            },
            "mc-mod4-les2-step-04": {
                "title": "Visual Diagram: Torsion Angles (Gauche vs Anti)",
                "prompt": "Examine acetylcholine's N-C-C-O torsion angle: synclinal (gauche, 60°) fits muscarinic receptors; antiperiplanar (trans, 180°) fits nicotinic."
            },
            "mc-mod4-les2-step-05": {
                "title": "Interactive Artifact: Scaffold Rigidity Engine",
                "prompt": "Incorporate cyclopropane rings and double bonds into flexible neurotransmitters. Measure conformational entropy loss and subtype selectivity."
            },
            "mc-mod4-les2-step-06": {
                "title": "Guided Discovery: Cyclopropane Constraint (Muscarine)",
                "prompt": "Notice how trans-ACTM (cyclopropane analogue) selectively activates muscarinic receptors while failing to trigger nicotinic ganglionic firing."
            },
            "mc-mod4-les2-step-07": {
                "title": "Formal Thermodynamics: Conformational Entropy",
                "prompt": "ΔG_bind = ΔH - TΔS. Freezing each rotatable bond costs ≈ 0.5 - 0.7 kcal/mol in entropy (-TΔS > 0). Rigidification saves this penalty."
            },
            "mc-mod4-les2-step-08": {
                "title": "Concept Check: Bioactive vs Ground State",
                "prompt": "True or False: The bound bioactive conformation of a drug may be 2-3 kcal/mol higher in energy than its lowest energy conformer in aqueous solution."
            },
            "mc-mod4-les2-step-09": {
                "title": "Application: Chlorpromazine vs Promethazine",
                "prompt": "Analyze how bending the phenothiazine ring system alters dopamine D2 antagonism versus histamine H1 sedation profiles."
            },
            "mc-mod4-les2-step-10": {
                "title": "Retrieval: Van der Waals Contacts",
                "prompt": "How does conformational locking improve steric complementarity with the hydrophobic binding pocket walls?"
            },
            "mc-mod4-les2-step-11": {
                "title": "Forward Connection: Phase I Drug Metabolism (Module 5)",
                "prompt": "In Module 5, we discover how rigid aromatic rings and steric hindrance protect drug scaffolds from Cytochrome P450 oxidation."
            },
            "mc-mod4-les2-step-12": {
                "title": "Mastery Assessment: Conformational Restriction Tactics",
                "prompt": "Which synthetic strategy constitutes an authentic conformational restriction method to improve receptor selectivity?"
            }
        }
    },

    "mc-mod5-les1": {
        "title": "Phase I Functionalization: Cytochrome P450 Hydroxylation Mechanisms",
        "objective": "Delineate Cytochrome P450 catalytic oxygenation mechanisms and predict vulnerable sites of aromatic, aliphatic, and benzylic metabolism.",
        "misconceptions": [
            "Phase I metabolism always detoxifies drugs and renders them pharmacologically inert.",
            "Cytochrome P450 enzymes transfer oxygen from molecular water rather than atmospheric O2."
        ],
        "steps": {
            "mc-mod5-les1-step-01": {
                "title": "The Paracetamol Danger: Hepatotoxic Quinone Imine",
                "prompt": "Why does a therapeutic 500 mg dose of paracetamol clear harmlessly, while an overdose generates fatal centrilobular liver necrosis?"
            },
            "mc-mod5-les1-step-02": {
                "title": "Prediction: Most Vulnerable Oxidation Site",
                "prompt": "On a molecule containing an aromatic ring, a benzylic CH2, and an unactivated terminal CH3, where does CYP450 attack fastest?"
            },
            "mc-mod5-les1-step-03": {
                "title": "Intuitive Model: Molecular Blowtorch",
                "prompt": "CYP450 is a controlled molecular blowtorch: its iron-oxo heme core (Compound I) rips a hydrogen atom from inert C-H bonds to insert oxygen."
            },
            "mc-mod5-les1-step-04": {
                "title": "Visual Catalytic Cycle: P450 Electron Cascade",
                "prompt": "Trace Fe3+ substrate binding -> 1st electron reduction -> O2 binding -> 2nd electron -> O-O cleavage -> [Fe(IV)=O] radical rebound."
            },
            "mc-mod5-les1-step-05": {
                "title": "Interactive Artifact: Metabolism Map",
                "prompt": "Highlight metabolic soft spots on drug molecules. Test benzylic hydroxylation, N-dealkylation, and aromatic epoxide formation in real-time."
            },
            "mc-mod5-les1-step-06": {
                "title": "Guided Discovery: NIH Shift & Epoxide Intermediates",
                "prompt": "Observe aromatic hydroxylation: CYP forms an arene oxide intermediate, followed by hydride migration (NIH shift) to avoid reactive toxicity."
            },
            "mc-mod5-les1-step-07": {
                "title": "Formal Principles: CYP Superfamily Genetics",
                "prompt": "CYP3A4, CYP2D6, and CYP2C9 handle >75% of clinical drugs. Functionalization installs polar handles (-OH, -NH2, -COOH) for Phase II conjugation."
            },
            "mc-mod5-les1-step-08": {
                "title": "Concept Check: Prodrug Bioactivation",
                "prompt": "Which anticancer alkylating agent requires CYP2B6/3A4 4-hydroxylation in hepatic microsomes to generate active phosphoramide mustard?"
            },
            "mc-mod5-les1-step-09": {
                "title": "Application: NAPQI Neutralization with N-Acetylcysteine",
                "prompt": "Why is IV N-acetylcysteine (NAC) the specific antidote for paracetamol poisoning, and what endogenous molecule does it replenish?"
            },
            "mc-mod5-les1-step-10": {
                "title": "Retrieval: Classical Bioisosteric Blockers",
                "prompt": "Recall from Lesson 5: which halogen atom is strategically installed at the para-position of a phenyl ring to block CYP oxidation?"
            },
            "mc-mod5-les1-step-11": {
                "title": "Forward Connection: Phase II Conjugation Pathways (Lesson 10)",
                "prompt": "Next, we examine how the polar handles created by CYP450 are conjugated with glucuronic acid and sulfate for total renal excretion."
            },
            "mc-mod5-les1-step-12": {
                "title": "Mastery Assessment: Metabolic Soft Spot Ranking",
                "prompt": "Rank C-H bond activation energies and P450 oxidation susceptibility: Allylic/Benzylic, Tertiary aliphatic, Secondary, Primary."
            }
        }
    },

    "mc-mod5-les2": {
        "title": "Phase II Conjugation: Glucuronidation & Sulfation Pathways",
        "objective": "Map Phase II biosynthetic conjugation pathways and analyze the cofactor energetics driving glucuronidation, sulfation, and glutathione trapping.",
        "misconceptions": [
            "Phase II conjugation products are always larger and therefore more lipophilic than parent drugs.",
            "Glutathione conjugation requires energy-consuming ATP hydrolysis at the moment of drug attachment."
        ],
        "steps": {
            "mc-mod5-les2-step-01": {
                "title": "Morphine-6-Glucuronide: The Potent Conjugate Paradox",
                "prompt": "Phase II metabolism is taught as an inactivation pathway. How can morphine-6-glucuronide (M6G) be 50 times more analgesic than morphine itself?"
            },
            "mc-mod5-les2-step-02": {
                "title": "Prediction: High-Capacity vs High-Affinity Pathway",
                "prompt": "Between UDP-glucuronosyltransferase (UGT) and sulfotransferase (SULT), which pathway has high capacity but lower substrate affinity?"
            },
            "mc-mod5-les2-step-03": {
                "title": "Intuitive Model: The Chemical Shipping Tag",
                "prompt": "Phase II enzymes attach a giant, ionized chemical luggage tag (sugar or sulfate) onto the drug, guaranteeing recognition by renal transport pumps."
            },
            "mc-mod5-les2-step-04": {
                "title": "Visual Diagram: High-Energy Cofactors",
                "prompt": "Inspect UDP-glucuronic acid (UDPGA), 3'-phosphoadenosine-5'-phosphosulfate (PAPS), and tripeptide Glutathione (GSH, gamma-Glu-Cys-Gly)."
            },
            "mc-mod5-les2-step-05": {
                "title": "Interactive Artifact: Phase II Enzyme Simulator",
                "prompt": "Dose paracetamol from therapeutic to toxic levels. Watch SULT saturate first, UGT take over, and GSH deplete rapidly to trigger toxicity."
            },
            "mc-mod5-les2-step-06": {
                "title": "Guided Discovery: Grey Baby Syndrome Mechanism",
                "prompt": "Notice why neonatal chloramphenicol toxicity occurs: deficient hepatic UGT2B7 leads to catastrophic cardiovascular collapse."
            },
            "mc-mod5-les2-step-07": {
                "title": "Formal Biochemistry: SN2 Inversion Mechanism",
                "prompt": "UGT catalyzes an SN2 nucleophilic attack on alpha-UDPGA, inverting stereochemistry to form beta-D-glucuronides with high water solubility."
            },
            "mc-mod5-les2-step-08": {
                "title": "Concept Check: Enterohepatic Recirculation",
                "prompt": "Why do biliary glucuronides excreted into the bowel undergo beta-glucuronidase cleavage by gut flora, re-absorbing active drug?"
            },
            "mc-mod5-les2-step-09": {
                "title": "Application: Glutathione S-Transferase & Mercapturic Acids",
                "prompt": "Trace how reactive electrophilic metabolites conjugated with GSH are cleaved to cysteine adducts and N-acetylated to urinary mercapturic acids."
            },
            "mc-mod5-les2-step-10": {
                "title": "Retrieval: Phase I Hydroxylation Link",
                "prompt": "Which specific Phase I functional group is required as an acceptor handle for SULT-mediated sulfate conjugation?"
            },
            "mc-mod5-les2-step-11": {
                "title": "Course Synthesis: Transition to Course B (Pharmacology)",
                "prompt": "You have mastered Pharmaceutical Chemistry! In Course B, we shift from molecular structures to systemic pharmacodynamics and receptor signaling."
            },
            "mc-mod5-les2-step-12": {
                "title": "Mastery Assessment: Phase II Pathway Selection",
                "prompt": "Which physiological factor primarily dictates whether a phenolic drug undergoes sulfation versus glucuronidation at low therapeutic doses?"
            }
        }
    }
}

# Medicinal Chemistry (Course A) — Master Curriculum Architecture & Lesson Blueprint

## 1. Course Pedagogical Architecture

Course A (**Medicinal Chemistry**) translates chemical structures, electronic properties, spatial conformations, and metabolic pathways into intuitive, active learn-by-doing experiences.

### Key Pedagogical Constraints:
- **Permanent Freemium**: Lessons 1 and 2 of **every module** are free forever. Lessons 3+ require Premium or an active 7-Day Free Trial.
- **Micro-Steps**: Every lesson contains between **8 and 15 interactive steps**.
- **Prose Guard**: Maximum **40 words** of instructional prose per step.
- **Predict-Then-Reveal**: Every step prompts a prediction or active decision before disclosing the chemical explanation.
- **Worked-Example Fading**: Complex chemical calculations (e.g. partition coefficients, substituent $\pi$, pKa shifts) begin with fully annotated scaffolds that systematically fade across steps.
- **Strict Provenance**: Every concept, structure, and equation is tied to source lecture files and page citations in `/materials/medchem`.

---

## 2. Module & Lesson Curriculum Structure

### Summary Table of Modules:

| Module ID | Module Title | Anchor Decks | Total Lessons | Free Lessons | Paid Lessons |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `mc-mod-1` | **Physicochemical Determinants of Drug Action** | `İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf` (29p), `Giriş.pdf` (23p) | 5 | 2 | 3 |
| `mc-mod-2` | **Molecular Stereochemistry & 3D Receptor Complementarity** | `İlaçlarda  İzomeri.pdf` (43p) | 5 | 2 | 3 |
| `mc-mod-3` | **Functional Groups, Ionization & Chemical Scaffolds** | `Fonksiyonel gruplar.pdf` (36p) | 5 | 2 | 3 |
| `mc-mod-4` | **Classical & Non-Classical Bioisosterism** | `Biyoizosterizm.pdf` (15p) | 5 | 2 | 3 |
| `mc-mod-5` | **Drug Biotransformation & Enzymatic Pathways** | `İlaç metabolizması-2026.pdf` (44p) | 5 | 2 | 3 |

---

### Module 1: Physicochemical Determinants of Drug Action (`mc-mod-1`)

#### Diagnostic Pre-Test (`mc-mod1-diag`)
- **Item 1**: *Which property fundamentally dictates whether an anesthetic acts via structurally specific or non-specific mechanisms?*
  - (A) Thermodynamic activity ($a > 0.01$ vs $a < 0.001$) [CORRECT: Ferguson principle]
  - (B) Molecular weight exceeding 800 Da
  - (C) Presence of a chiral stereocenter
  - (D) Covalent binding to voltage-gated ion channels
  - *Misconception Targeted*: Conflating chemical potency with specific macromolecular binding.
- **Item 2**: *Why does branching in an alkyl side chain decrease lipid solubility compared to an isomeric linear chain?*
  - (A) Decreases molecular surface area and hydrophobic contact volume [CORRECT]
  - (B) Increases hydrogen bond donor capacity
  - (C) Permanently ionizes the carbon backbone
  - (D) Induces aromatic resonance stabilization
  - *Misconception Targeted*: Assuming equal carbon counts produce identical partition coefficients.
- **Item 3**: *According to Lipinski's Rule of 5, which violation most severely impairs passive intestinal permeation?*
  - (A) $\log P > 5$ paired with $>10$ hydrogen bond acceptors [CORRECT]
  - (B) Melting point under $100^\circ\text{C}$
  - (C) Optical rotation $[\alpha]_D = 0$
  - (D) Presence of an ester prodrug linkage
  - *Misconception Targeted*: Believing high lipophilicity always guarantees superior systemic bioavailability.

---

#### Lesson Details (`mc-mod-1`):

##### Lesson 1: Thermodynamic Activity & The Ferguson Principle (`mc-mod1-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Differentiate structurally specific from structurally non-specific drugs using thermodynamic activity thresholds.
- **Steps**: 10 steps (Step 1: Hook, Step 2-4: Ferguson thermodynamic activity slider, Step 5: Checkpoint, Step 6-8: Ether vs Beta-blocker comparison, Step 9: Faded calculation, Step 10: Recap).
- **Interactions**: Slider interaction ($a = P_t/P_0$), structural specificity sorter, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Classify 4 mystery compounds based on active biophase concentrations.
- **Recap**: Structurally non-specific drugs require high thermodynamic saturation ($a = 0.01–1.0$); structurally specific drugs act at $a < 0.001$ via 3D receptor fit.
- **Spaced Review Items**:
  1. *Prompt*: What defines the Ferguson thermodynamic activity threshold for structurally non-specific drugs? *Answer*: Relative saturation $a = P_t/P_0$ between 0.01 and 1.0.
  2. *Prompt*: How does altering the chemical core of a structurally specific drug affect potency? *Answer*: Minor changes drastically diminish or abolish activity due to loss of receptor complementarity.
  3. *Prompt*: Give two classic clinical examples of structurally non-specific drugs. *Answer*: Inhalation anesthetics (halothane, nitrous oxide) and simple aliphatic hypnotics.
- **Misconceptions**:
  - *Misconception 1*: "All drugs bind specific receptor pockets." *Correction*: Non-specific drugs alter cellular membranes through physical thermodynamic volume accumulation.
  - *Misconception 2*: "Lower dose always means higher toxicity." *Correction*: Low dose indicates high affinity/potency ($a < 0.001$), independent of therapeutic index.
- **Exam Alignment**: EUS (Farmasötik Kimya Giriş, Q12-15); NAPLEX (General Principles); SPLE (Physical Pharmacy & Drug Action).

##### Lesson 2: Aqueous vs Lipid Solubility: The Dielectric Bridge (`mc-mod1-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Predict aqueous vs lipid partition behavior based on solvent dielectric constants and functional group polarity.
- **Steps**: 11 steps (Step 1: Oral absorption journey hook, Step 2-4: Dielectric solvent ladder, Step 5: Hydrophilic vs Lipophilic group sorter, Step 6: Checkpoint, Step 7-9: Isatin-$\beta$-thiosemicarbazone case study, Step 10: Faded solubility problem, Step 11: Recap).
- **Interactions**: Drag-and-drop solvent polarity ranker, functional group solubility highlighter, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Rank 4 solvents ($\text{H}_2\text{O}$, $\text{MeOH}$, $\text{CHCl}_3$, Benzene) by dielectric constant ($\epsilon$).
- **Recap**: Water ($\epsilon = 78.5$) dissolves polar ionized groups; lipid membranes require balanced lipophilicity ($\epsilon \approx 2-4$).
- **Spaced Review Items**:
  1. *Prompt*: What is the dielectric constant of water vs chloroform? *Answer*: Water is ~78.5; chloroform is ~4.8.
  2. *Prompt*: How does linear vs branched alkyl structure influence lipophilicity? *Answer*: Linear chains possess greater surface area, yielding higher lipid solubility than branched isomers.
  3. *Prompt*: Why must an oral drug balance aqueous and lipid solubility? *Answer*: It must dissolve in gastrointestinal fluids yet permeate the lipophilic lipid bilayer.
- **Misconceptions**:
  - *Misconception 1*: "The more lipophilic a drug, the higher its oral absorption." *Correction*: Excessive lipophilicity prevents aqueous dissolution in the intestinal lumen, stranding drug unabsorbed.
  - *Misconception 2*: "Salts cannot cross membranes." *Correction*: Salts dissociate into equilibrium fractions of unionized species that cross via passive diffusion.
- **Exam Alignment**: EUS (Çözünürlük ve Membran Geçişi); NAPLEX (Biopharmaceutics & Dissolution); SPLE (Basic Pharmacokinetics).

##### Lesson 3: The Partition Coefficient: Quantifying $\log P$ (`mc-mod1-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Calculate and interpret 1-octanol/water partition coefficients ($P$ and $\log P$) and predict CNS penetration.
- **Steps**: 12 steps (Step 1: Shake-flask simulation hook, Step 2-4: Octanol/water ratio interactive calculation, Step 5: Checkpoint, Step 6-8: HPLC retention time correlation, Step 9-11: Thiopental vs Phenobarbital onset/redistribution, Step 12: Recap).
- **Interactions**: Interactive shake-flask phase-separator, $\log P$ vs CNS penetration slider, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Calculate $P$ given $C_{\text{octanol}} = 80\,\mu\text{M}$ and $C_{\text{water}} = 0.8\,\mu\text{M}$. ($\log P = 2.0$).
- **Recap**: Optimal CNS penetration requires $\log P \approx 1.5–2.5$; ultra-high $\log P$ drives rapid adipose redistribution (e.g. thiopental).
- **Spaced Review Items**:
  1. *Prompt*: What is the mathematical definition of partition coefficient $P$? *Answer*: $P = C_{\text{octanol}} / C_{\text{water}}$ for unionized solute at equilibrium.
  2. *Prompt*: Why does thiopental produce ultra-short anesthesia compared to phenobarbital? *Answer*: High $\log P$ (~2.8) causes rapid brain penetration followed by rapid redistribution into peripheral adipose tissue.
  3. *Prompt*: What is the optimal $\log P$ range for blood-brain barrier penetration? *Answer*: Between 1.5 and 2.5.
- **Misconceptions**:
  - *Misconception 1*: "Thiopental's short duration is due to rapid liver metabolism." *Correction*: Its short duration is governed by physical tissue redistribution, not metabolic clearance.
  - *Misconception 2*: "Negative $\log P$ means the drug is insoluble in water." *Correction*: Negative $\log P$ indicates hydrophilic preference ($C_{\text{water}} > C_{\text{octanol}}$).
- **Exam Alignment**: EUS (Partisyon Katsayısı ve Sedatifler); NAPLEX (CNS Drug Permeation); SPLE (Pharmacokinetics).

##### Lesson 4: The Hansch Substituent Constant ($\pi$): Free-Energy Additivity (`mc-mod1-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Compute cumulative drug molecule $\log P$ using additive Hansch substituent constants ($\pi_X = \log P_X - \log P_H$).
- **Steps**: 12 steps (Step 1: Ethchlorvynol modular puzzle hook, Step 2-5: Worked-example fading of substituent $\pi$ addition, Step 6: Checkpoint, Step 7-9: Adding chloro vs hydroxyl vs methyl substituents, Step 10-11: Predicting bacterial inhibition shifts, Step 12: Recap).
- **Interactions**: Chemical fragment builder with live $\log P$ counter, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Calculate $\log P$ of chlorobenzene given benzene $\log P = 2.13$ and $\pi_{\text{Cl}} = +0.71$. ($\log P = 2.84$).
- **Recap**: Substituent $\pi$ constants are additive linear free-energy values; lipophilic groups have positive $\pi$, hydrophilic groups have negative $\pi$.
- **Spaced Review Items**:
  1. *Prompt*: Define the Hansch constant $\pi_X$. *Answer*: $\pi_X = \log P_X - \log P_H$, quantifying substituent lipophilicity relative to hydrogen.
  2. *Prompt*: Does a phenolic $-\text{OH}$ group possess a positive or negative $\pi$ value? *Answer*: Negative $\pi$ (approximately $-0.67$), increasing water solubility.
  3. *Prompt*: How does a trifluoromethyl ($-\text{CF}_3$) group alter molecular $\log P$? *Answer*: Strongly increases $\log P$ ($\pi \approx +0.88$) due to extreme hydrophobicity.
- **Misconceptions**:
  - *Misconception 1*: "All halogens decrease lipophilicity because they are electronegative." *Correction*: Halogens increase lipophilicity ($\pi > 0$) because of low water hydration energy and large polarizability.
- **Exam Alignment**: EUS (Hansch $\pi$ Sabiti ve SAR); NAPLEX (Medicinal Chemistry Principles); SPLE (SAR Fundamentals).

##### Lesson 5: Lipinski's Rule of 5 & Modern Druglikeness (`mc-mod1-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Audit small-molecule drug candidates against Lipinski's Rule of Five and recognize non-Lipinski exceptions.
- **Steps**: 13 steps (Step 1: Drug development graveyard hook, Step 2-5: The 4 rules (500 Da, $\log P \le 5$, 5 HBD, 10 HBA), Step 6: Checkpoint, Step 7-9: Veber rotatable bond extension, Step 10-12: The macrolide exception, Step 13: Recap).
- **Interactions**: Lipinski radar chart auditor, structure filter widget, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Evaluate atorvastatin against the 4 cutoffs and flag the single near-boundary parameter.
- **Recap**: Lipinski's Rule of 5 predicts passive oral absorption; natural products and active transporter substrates represent major valid exceptions.
- **Spaced Review Items**:
  1. *Prompt*: State the four cutoff values in Lipinski's Rule of 5. *Answer*: $\text{MW} \le 500$, $\log P \le 5$, $\text{HBD} \le 5$, $\text{HBA} \le 10$.
  2. *Prompt*: Why are all cutoff numbers multiples of 5? *Answer*: Mnemonic convention formulated by Christopher Lipinski based on statistical analysis of oral drug databases.
  3. *Prompt*: Which major therapeutic class frequently violates Rule of 5 while maintaining efficacy? *Answer*: Macrolide antibiotics (e.g. azithromycin, erythromycin) via conformational chameleonic folding.
- **Misconceptions**:
  - *Misconception 1*: "Violating one Lipinski rule means a compound cannot be a drug." *Correction*: The rule predicts poor oral absorption; injectable drugs and transporter substrates are not bound by it.
- **Exam Alignment**: EUS (Lipinski Kuralları); NAPLEX (Bioavailability Assessment); SPLE (Drug Formulation).

---

### Module 2: Molecular Stereochemistry & 3D Receptor Complementarity (`mc-mod-2`)

#### Diagnostic Pre-Test (`mc-mod2-diag`)
- **Item 1**: *Why is trans-diethylstilbestrol (DES) 14 times more potent than cis-DES?*
  - (A) Inter-hydroxyl distance matches 17$\beta$-estradiol (~12.1 Å) [CORRECT]
  - (B) Trans isomer forms covalent bonds with estrogen receptor
  - (C) Cis isomer undergoes immediate Phase II glucuronidation
  - (D) Trans isomer has lower melting point
  - *Misconception Targeted*: Thinking geometric isomers have identical biological affinity.
- **Item 2**: *What is the fundamental premise of the Easson-Stedman hypothesis?*
  - (A) Three specific complementary interaction points are required for stereoselective receptor activation [CORRECT]
  - (B) All optical enantiomers must have identical potency
  - (C) Chiral drugs require active transport across the BBB
  - (D) Distomers are always pharmacologically inert
  - *Misconception Targeted*: Assuming two-point contact is sufficient for stereodiscrimination.
- **Item 3**: *Why is (R)-thalidomide administration incapable of preventing teratogenicity in clinical practice?*
  - (A) Rapid in vivo keto-enol racemization interconverts (R) and (S) enantiomers [CORRECT]
  - (B) The (R) isomer is selectively absorbed into fetal tissue
  - (C) Gut microbiota selectively synthesizes (S)-thalidomide de novo
  - (D) The (R) isomer decomposes into toxic formaldehyde
  - *Misconception Targeted*: Believing enantiomerically pure formulation prevents racemization in vivo.

---

#### Lesson Details (`mc-mod-2`):

##### Lesson 1: Constitutional vs Geometric Isomerism (`mc-mod2-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Contrast constitutional isomers with geometric ($E/Z$) isomers and explain how geometric constraints fix pharmacophore distances.
- **Steps**: 10 steps (Step 1: Ethanol vs Dimethyl ether hook, Step 2-4: Cis/Trans and CIP $E/Z$ rules, Step 5: Checkpoint, Step 6-8: Diethylstilbestrol (DES) estrogenic receptor distance mapping, Step 9: Faded priority problem, Step 10: Recap).
- **Interactions**: 3D bond rotator, CIP priority ranking tool, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Assign $E$ or $Z$ configuration to 3 disubstituted alkene structures.
- **Recap**: Geometric isomers possess distinct physicochemical constants and rigid interatomic distances; trans-DES perfectly mimics estradiol's 12.1 Å pharmacophore.
- **Spaced Review Items**:
  1. *Prompt*: What causes geometric isomerism around a carbon-carbon double bond? *Answer*: Restricted rotation of the $\pi$-bond forcing substituents into fixed spatial planes.
  2. *Prompt*: Why is trans-DES estrogenically active while cis-DES is poorly active? *Answer*: Trans-DES holds its two phenolic oxygens at 12.1 Å, matching natural $17\beta$-estradiol.
  3. *Prompt*: Contrast constitutional isomers with stereoisomers. *Answer*: Constitutional isomers have different atom connectivity; stereoisomers share connectivity but differ in 3D spatial arrangement.
- **Misconceptions**:
  - *Misconception 1*: "Cis and trans isomers have identical boiling and melting points." *Correction*: They are diastereomers with different dipole moments, polarities, and crystal packing energies.
- **Exam Alignment**: EUS (İlaçlarda İzomeri, Q1-5); NAPLEX (Structural Chemistry); SPLE (Stereochemistry).

##### Lesson 2: Optical Chirality & The Three-Point Attachment Model (`mc-mod2-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Apply the Easson-Stedman 3-point model to explain enantiomer affinity differentials using epinephrine.
- **Steps**: 11 steps (Step 1: Left and right hand gloves hook, Step 2-4: Chiral carbon ($sp^3$) and $(R)/(S)$ naming, Step 5: Checkpoint, Step 6-9: Epinephrine $(R)-(-)$ vs $(S)-(+)$ 3-point vs 2-point receptor binding simulation, Step 10: Faded enantiomer analysis, Step 11: Recap).
- **Interactions**: 3D receptor-pocket dock puzzle, chirality tester, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Identify the asymmetric carbon in ibuprofen and predict its mirror image superimposability.
- **Recap**: Natural $(R)-(-)$-epinephrine forms 3 contacts (aromatic, ammonium, benzylic OH); $(S)-(+)$-epinephrine misses the OH, yielding 45-fold lower activity.
- **Spaced Review Items**:
  1. *Prompt*: State the Easson-Stedman hypothesis. *Answer*: High-affinity stereoselective drug action requires a minimum of three specific complementary spatial contacts with the receptor.
  2. *Prompt*: Why is $(R)-(-)$-epinephrine much more potent than $(S)-(+)$-epinephrine? *Answer*: The $(R)$ enantiomer binds aromatic, amine, and benzylic hydroxyl sites; $(S)$ projects the hydroxyl away from the receptor.
  3. *Prompt*: What is a chiral center? *Answer*: A tetrahedral atom (usually $sp^3$ carbon) bonded to four distinct substituents with no internal plane of symmetry.
- **Misconceptions**:
  - *Misconception 1*: "Dextrorotatory $(+)$ always corresponds to $(R)$ configuration." *Correction*: $(+)/(-)$ measures physical optical rotation; $(R)/(S)$ is an arbitrary CIP structural nomenclature convention.
- **Exam Alignment**: EUS (Optik İzomeri ve Adrenoseptörler); NAPLEX (Pharmacodynamics); SPLE (Medicinal Chemistry).

##### Lesson 3: Eutomer, Distomer & The Eudismic Ratio (`mc-mod2-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Calculate eudismic ratios and categorize distomer consequences across clinical drugs (Ibuprofen, Muscarine, Labetalol).
- **Steps**: 12 steps (Step 1: Pure single enantiomer vs racemic mix hook, Step 2-4: Eutomer/Distomer definitions and Eudismic Index calculation, Step 5: Checkpoint, Step 6-8: Muscarine 3-center stereoisomers, Step 9-11: Ibuprofen metabolic bio-inversion, Step 12: Recap).
- **Interactions**: Eudismic ratio calculator, chiral switch decision matrix, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Given eutomer $\text{EC}_{50} = 2\,\text{nM}$ and distomer $\text{EC}_{50} = 200\,\text{nM}$, compute eudismic ratio and index ($100$ and $2.0$).
- **Recap**: The eutomer provides therapeutic efficacy; the distomer can be inactive, act as an antagonist, cause toxicity, or undergo in vivo bio-inversion.
- **Spaced Review Items**:
  1. *Prompt*: Define Eutomer and Distomer. *Answer*: Eutomer is the active/higher-affinity enantiomer; distomer is the lower-affinity antipode.
  2. *Prompt*: How does the body handle $(R)$-ibuprofen? *Answer*: In vivo 2-arylpropionyl-CoA epimerase unidirectionally inverts $(R)$-ibuprofen into active $(S)$-ibuprofen.
  3. *Prompt*: What does Pfeifer's Rule state? *Answer*: Higher potency of a eutomer generally correlates with a higher eudismic ratio over its distomer.
- **Misconceptions**:
  - *Misconception 1*: "Distomers are always useless ballast." *Correction*: In labetalol, $(R,R)$ provides beta-blockade while $(S,R)$ provides alpha-1 blockade, producing synergistic vasodilation.
- **Exam Alignment**: EUS (Ödomer/Distomer Oranı); NAPLEX (Chiral Drugs & NSAIDs); SPLE (Pharmacology).

##### Lesson 4: Tragic Stereochemistry: Thalidomide & Enantiomeric Toxicity (`mc-mod2-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Explain the molecular mechanism of thalidomide teratogenicity and why chiral purification fails to prevent toxicity.
- **Steps**: 12 steps (Step 1: Contergan historical tragedy hook, Step 2-4: $(R)$-sedative vs $(S)$-teratogen cereblon binding mechanism, Step 5: Checkpoint, Step 6-8: Keto-enol tautomerism and spontaneous racemization kinetics, Step 9-11: Modern chiral switches (esomeprazole, levocetirizine), Step 12: Recap).
- **Interactions**: Tautomerism racemization slider, cereblon binding model, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Predict whether administering 100% pure $(R)$-thalidomide eliminates phocomelia risk in humans. (No, due to rapid in vivo racemization).
- **Recap**: $(S)$-thalidomide binds cereblon to degrade fetal limb transcription factors; spontaneous in vivo racemization ($t_{1/2} \approx 4-5\,\text{h}$) defeats enantiopure dosing.
- **Spaced Review Items**:
  1. *Prompt*: Which thalidomide enantiomer causes teratogenicity? *Answer*: $(S)-(-)$-thalidomide via binding to cereblon (CRBN).
  2. *Prompt*: Why does chiral separation of $(R)$-thalidomide fail to prevent birth defects? *Answer*: Rapid in vivo spontaneous keto-enol racemization converts $(R)$ into $(S)$ within hours.
  3. *Prompt*: Name two successful commercial chiral switches where the single enantiomer provides clinical advantage. *Answer*: Esomeprazole (from omeprazole) and Levocetirizine (from cetirizine).
- **Misconceptions**:
  - *Misconception 1*: "Enzymes are required for thalidomide racemization." *Correction*: The chiral hydrogen at the glutarimide ring is acidic and racemizes spontaneously at physiological pH.
- **Exam Alignment**: EUS (Talidomid Fasiyası ve Teratojenite); NAPLEX (Medication Safety & Chiral Switches); SPLE (Pharmacology).

##### Lesson 5: Conformational Isomerism: Dynamic Receptor Selection (`mc-mod2-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Explain how single bond rotation allows flexible neurotransmitters (acetylcholine, histamine) to activate distinct receptor subtypes.
- **Steps**: 12 steps (Step 1: Bioactive vs ground state conformation hook, Step 2-5: Newman projections (anti, gauche, eclipsed), Step 6: Checkpoint, Step 7-9: Acetylcholine: gauche (nicotinic) vs anti (muscarinic), Step 10-11: Histamine $H_1$ (4.55 Å) vs $H_2$ (3.60 Å) conformation locking, Step 12: Recap).
- **Interactions**: Interactive Newman projection rotator with dihedral angle gauge, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Match gauche vs anti acetylcholine conformations to nicotinic and muscarinic receptor models.
- **Recap**: Flexible transmitters adopt different bioactive conformations; rigid conformational analogs lock selectivity for a single receptor subtype.
- **Spaced Review Items**:
  1. *Prompt*: Contrast configurational and conformational isomers. *Answer*: Configurational isomers require bond breaking to interconvert; conformers interconvert by rotation around single $\sigma$-bonds.
  2. *Prompt*: What inter-nitrogen distance in histamine is selective for the $H_1$ receptor? *Answer*: The trans/anti conformer with ~4.55 Å distance (vs ~3.60 Å for $H_2$).
  3. *Prompt*: Why do medicinal chemists design conformationally locked analogs? *Answer*: To freeze the bioactive conformation, boosting subtype selectivity and eliminating off-target effects.
- **Misconceptions**:
  - *Misconception 1*: "A drug always binds its lowest-energy ground state conformation." *Correction*: The bound bioactive conformation is often higher energy, paid for by favorable receptor binding enthalpy.
- **Exam Alignment**: EUS (Konformasyon İzomerisi ve Asetilkolin); NAPLEX (Medicinal Chemistry Principles); SPLE (Receptor Binding).

---

### Module 3: Functional Groups, Ionization & Chemical Scaffolds (`mc-mod-3`)
*Anchored on `Fonksiyonel gruplar.pdf` (36 slides).*

#### Diagnostic Pre-Test (`mc-mod3-diag`)
- **Item 1**: *Why are aromatic sulfonamides acidic ($\text{p}K_a \approx 4.5–5.5$) while simple aliphatic carboxamides are neutral ($\text{p}K_a \approx 15$)?*
  - (A) The strong electron-withdrawing sulfonyl group ($-\text{SO}_2-$) delocalizes the negative charge onto two sulfonyl oxygens [CORRECT]
  - (B) Sulfonamides possess a free radical on nitrogen
  - (C) Carboxamides are permanently protonated at physiological pH
  - (D) The sulfur atom forms a covalent bond with hydronium ions
  - *Misconception Targeted*: Assuming all nitrogen-bound carbonyl/sulfonyl groups share identical electronic neutrality.
- **Item 2**: *In aqueous physiological buffer (pH 7.4), which aliphatic amine class generally exhibits the highest thermodynamic basicity?*
  - (A) Secondary aliphatic amines ($\text{p}K_a \approx 10.5–11.0$), balancing inductive electron-donation with steric hydration [CORRECT]
  - (B) Primary amines, because they have two acidic protons
  - (C) Tertiary amines, due to maximal steric crowding preventing all hydration
  - (D) Aniline derivatives, due to aromatic resonance
  - *Misconception Targeted*: Conflating gas-phase alkyl inductive trends (3° > 2° > 1°) with aqueous solution basicity where water hydration is critical.
- **Item 3**: *Why is heroin (diacetylmorphine) 3-fold more potent and faster-acting in the CNS than morphine?*
  - (A) Acetylation of the 3- and 6-hydroxyl groups masks polarity, converting a polar phenol/alcohol into a lipophilic diester that readily crosses the BBB [CORRECT]
  - (B) Acetyl groups bind directly to the opioid receptor active site
  - (C) Morphine is completely destroyed by gastric acid
  - (D) Heroin is an irreversible covalent agonist
  - *Misconception Targeted*: Failing to recognize esterification as a classic lipophilicity prodrug strategy.
- **Item 4**: *Why is pyridine basic ($\text{p}K_a \approx 5.2$) while pyrrole is essentially non-basic ($\text{p}K_a \approx -3.8$)?*
  - (A) Pyridine's nitrogen lone pair occupies an $sp^2$ hybrid orbital outside the aromatic ring, while pyrrole's lone pair is required to complete the $6\pi$ aromatic sextet [CORRECT]
  - (B) Pyrrole contains two nitrogen atoms
  - (C) Pyridine has a tetrahedral carbon skeleton
  - (D) Pyrrole has no lone pair of electrons
  - *Misconception Targeted*: Assuming all nitrogen-containing heterocycles donate electrons equally to protons.

---

#### Lesson Details (`mc-mod-3`):

##### Lesson 1: Alcohols, Phenols & Ethers: Electronic Density & Phase II Attack (`mc-mod3-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Contrast acidity, nucleophilicity, and Phase II glucuronidation/sulfation susceptibility between aliphatic alcohols and aromatic phenols.
- **Steps**: 10 steps (Step 1: Morphine hydroxyl puzzle hook, Step 2-4: Phenol resonance delocalization vs aliphatic alcohol neutrality, Step 5: Checkpoint, Step 6-8: Ether oxygen dipole and CYP O-dealkylation, Step 9: Faded pKa comparison, Step 10: Recap).
- **Interactions**: Resonance delocalization slider, phenoxide stability ranker, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Predict which oxygen atom in morphine (phenolic 3-OH vs alcoholic 6-OH) undergoes rapid first-pass glucuronidation at pH 7.4. (Phenolic 3-OH, pKa 9.9 vs 11.2).
- **Recap**: Phenols are weak acids ($\text{p}K_a \approx 9–10$) that conjugate readily via UGT/SULT; aliphatic alcohols ($\text{p}K_a \approx 15–16$) are neutral; ethers resist hydrolysis but undergo CYP dealkylation.
- **Spaced Review Items**:
  1. *Prompt*: Why is phenol 1 million times more acidic than cyclohexanol? *Answer*: The conjugate phenoxide base is stabilized by resonance delocalization into the aromatic $\pi$-system.
  2. *Prompt*: What Phase II pathway metabolizes phenolic drugs most rapidly? *Answer*: O-glucuronidation (UGT) and sulfation (SULT).
  3. *Prompt*: How does converting an alcohol to an ether affect aqueous solubility and lipophilicity? *Answer*: Decreases hydrogen bond donation, increasing lipophilicity and membrane permeation.
- **Misconceptions**:
  - *Misconception 1*: "All hydroxyl groups are acidic." *Correction*: Aliphatic alcohols have $\text{p}K_a \approx 16$ and are neutral at physiological pH.
- **Exam Alignment**: EUS (Fonksiyonel Gruplar, Slayt 1-10); NAPLEX (Structural Chemistry); SPLE (Organic Chemistry in Pharmacy).

##### Lesson 2: Carbonyls & Carboxylic Acids: Ester Prodrugs vs Amide Resistance (`mc-mod3-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Compare the metabolic lability of esters vs amides to design orally bioavailable ester prodrugs and chemically stable amide therapeutics.
- **Steps**: 11 steps (Step 1: Procaine vs Procainamide clinical duration hook, Step 2-4: Carbonyl polarization and esterase nucleophilic attack, Step 5: Amide resonance delocalization ($C-N$ partial double bond character), Step 6: Checkpoint, Step 7-9: Ester prodrug design (Enalapril to Enalaprilat), Step 10: Faded prodrug design problem, Step 11: Recap).
- **Interactions**: Esterase cleavage kinetic simulator, prodrug design canvas, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Explain why procainamide has a cardiac antiarrhythmic duration of 3–4 hours while procaine lasts only 15–30 minutes. (Amide bond resists ubiquitous plasma esterases).
- **Recap**: Esters are rapidly cleaved by plasma/tissue esterases (ideal for prodrugs); amides possess $40\%$ double-bond resonance character, conferring metabolic resistance.
- **Spaced Review Items**:
  1. *Prompt*: Why are amides much more stable to chemical hydrolysis than esters? *Answer*: Nitrogen lone-pair donation creates partial double-bond character across the $C-N$ bond, reducing carbonyl electrophilicity.
  2. *Prompt*: Why was enalapril formulated as an ethyl ester prodrug? *Answer*: Enalaprilat's dicarboxylic acid was too polar for oral absorption; esterification neutralizes one charge, increasing lipophilicity.
  3. *Prompt*: Which ubiquitous enzymes rapidly hydrolyze ester prodrugs in vivo? *Answer*: Carboxylesterases (CES1 and CES2) in intestine, plasma, and liver.
- **Misconceptions**:
  - *Misconception 1*: "Amides are basic like amines." *Correction*: Amide nitrogens are essentially neutral ($\text{p}K_a \approx -0.5$) because their lone pair is delocalized into the carbonyl $\pi$-system.
- **Exam Alignment**: EUS (Karbonil Türevleri ve Ön İlaçlar); NAPLEX (Prodrug Bioavailability); SPLE (Drug Design & Stability).

##### Lesson 3: Amines Across the pH Spectrum: Primary to Quaternary Basicity (`mc-mod3-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Calculate ionized fractions of aliphatic and aromatic amines across gastrointestinal (pH 1.5–6.8) and physiological (pH 7.4) compartments using the Henderson-Hasselbalch equation.
- **Steps**: 12 steps (Step 1: Blood-brain barrier amine entry hook, Step 2-5: Amine basicity hierarchy (1°, 2°, 3°, quaternary), Step 6: Checkpoint, Step 7-9: Henderson-Hasselbalch protonation curves across gastric/intestinal pH, Step 10-11: Quaternary ammonium (curare) neuromuscular blockade without CNS entry, Step 12: Recap).
- **Interactions**: Henderson-Hasselbalch ionization curve slider, amine basicity sorter, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Given an aliphatic secondary amine with $\text{p}K_a = 9.4$, calculate the percentage of ionized drug at blood pH 7.4. ($99\%$ ionized: $\text{pH} - \text{p}K_a = -2.0$).
- **Recap**: Most aliphatic amines ($\text{p}K_a \approx 9–10$) are $>95\%$ cationically charged at blood pH 7.4; quaternary amines carry permanent charges that preclude CNS penetration.
- **Spaced Review Items**:
  1. *Prompt*: Write the Henderson-Hasselbalch equation for a basic amine. *Answer*: $\text{pH} = \text{p}K_a + \log([\text{Unionized}] / [\text{Ionized}])$.
  2. *Prompt*: Why is neostigmine (quaternary ammonium) incapable of treating CNS anticholinergic toxicity? *Answer*: Permanent positive charge prevents passive crossing of the lipophilic blood-brain barrier.
  3. *Prompt*: Why is aniline ($\text{p}K_a \approx 4.6$) vastly less basic than cyclohexylamine ($\text{p}K_a \approx 10.6$)? *Answer*: Aniline's nitrogen lone pair is resonance-delocalized into the aromatic ring.
- **Misconceptions**:
  - *Misconception 1*: "A basic drug is mostly unionized at pH values below its pKa." *Correction*: Bases are protonated (ionized) at pH values below their $\text{p}K_a$.
- **Exam Alignment**: EUS (Aminler ve İyonizasyon); NAPLEX (Henderson-Hasselbalch & Absorption); SPLE (Physical Pharmacy).

##### Lesson 4: Sulfur Pharmacophores: Thiols, Sulfoxides, Sulfones & Sulfonamides (`mc-mod3-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Relate the oxidation state and electron-withdrawing capacity of sulfur functional groups to sulfonamide antibacterial potency and thiol antioxidant/chelation activity.
- **Steps**: 12 steps (Step 1: Sulfanilamide historical antibiotic revolution hook, Step 2-4: Sulfur oxidation states: $-\text{SH}$ to $-\text{SO}-$ to $-\text{SO}_2-$, Step 5: Sulfonamide ionization and PABA structural mimicry, Step 6: Checkpoint, Step 7-9: Thiol oxidation, disulfide bridges, and captopril zinc chelation, Step 10-11: Sulfoxide stereocenters (omeprazole), Step 12: Recap).
- **Interactions**: Sulfur oxidation state ladder, sulfonamide ionization simulator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Explain why sulfamethoxazole ($\text{p}K_a = 5.6$) has optimal antibacterial activity compared to sulfanilamide ($\text{p}K_a = 10.4$). (Matches PABA $\text{p}K_a$ ~5.0, achieving optimal ionized fraction at pH 7.4).
- **Recap**: Sulfonamides require acidic ionization ($\text{p}K_a \approx 5–7$) to mimic PABA and bind dihydropteroate synthase; thiols act as nucleophiles, antioxidants, and metal chelators.
- **Spaced Review Items**:
  1. *Prompt*: What endogenous bacterial precursor does sulfonamides competitively inhibit? *Answer*: Para-aminobenzoic acid (PABA) at dihydropteroate synthase.
  2. *Prompt*: Which functional group in captopril is responsible for coordinating the active-site zinc atom in ACE? *Answer*: The terminal thiol ($-\text{SH}$) group.
  3. *Prompt*: Why does the sulfur atom in sulfoxides (e.g. omeprazole) constitute a chiral center? *Answer*: Pyramidal geometry with a lone pair of electrons creating stable, non-inverting stereocenters.
- **Misconceptions**:
  - *Misconception 1*: "Sulfonamides are neutral like carboxamides." *Correction*: Sulfonamide $-\text{SO}_2\text{NH}-$ protons are acidic ($\text{p}K_a \approx 5–6$) due to strong electron withdrawal by the sulfonyl group.
- **Exam Alignment**: EUS (Kükürtlü Fonksiyonel Gruplar); NAPLEX (Sulfonamide Allergy & Mechanism); SPLE (Antibacterial Chemistry).

##### Lesson 5: Heterocyclic Rings in Drug Design: Pyridine, Imidazole, Thiophene & Purine (`mc-mod3-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Determine aromaticity, basicity, and hydrogen bonding capabilities of five- and six-membered heterocycles to explain their selection in commercial drug scaffolds.
- **Steps**: 12 steps (Step 1: Cimetidine imidazole breakthrough hook, Step 2-4: 6-membered heterocycles: Pyridine, Pyrimidine, Pyrazine, Step 5: 5-membered heterocycles: Pyrrole, Furan, Thiophene, Step 6: Checkpoint, Step 7-9: Imidazole tautomerism and proton shuttle in enzyme active sites, Step 10-11: Purine/Pyrimidine antimetabolites, Step 12: Recap).
- **Interactions**: Heterocycle orbital inspector, aromaticity and lone-pair basicity ranker, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Classify the two nitrogen atoms of imidazole: which is basic and which is non-basic? (Pyridine-like $=N-$ is basic, $\text{p}K_a \approx 6.0$; pyrrole-like $-NH-$ is non-basic).
- **Recap**: Heterocycles control 3D geometry and electrostatics; pyridine-like nitrogens provide basicity and H-bond accepting; pyrrole-like nitrogens provide H-bond donation without basicity.
- **Spaced Review Items**:
  1. *Prompt*: Explain why the pyridine nitrogen is basic while the pyrrole nitrogen is not. *Answer*: Pyridine's lone pair is in an $sp^2$ orbital orthogonal to the aromatic ring; pyrrole's lone pair is consumed in the aromatic $\pi$-system.
  2. *Prompt*: What unique property makes imidazole an ideal catalytic residue in enzyme active sites? *Answer*: $\text{p}K_a \approx 6.0–7.0$ allows it to rapidly switch between protonated and unprotonated forms at physiological pH.
  3. *Prompt*: Which 5-membered sulfur heterocycle is widely used as a classical bioisostere for benzene? *Answer*: Thiophene.
- **Misconceptions**:
  - *Misconception 1*: "All heterocycles with nitrogen are water-soluble bases." *Correction*: Neutral or electron-deficient heterocycles (pyrrole, purines, uracil) are poorly basic or acidic.
- **Exam Alignment**: EUS (Heterosiklik Bileşikler, Slayt 20-36); NAPLEX (Medicinal Chemistry Principles); SPLE (Heterocyclic Drugs).

### Module 4: Classical & Non-Classical Bioisosterism (`mc-mod-4`)
*Anchored on `Biyoizosterizm.pdf` (15 slides).*

#### Diagnostic Pre-Test (`mc-mod4-diag`)
- **Item 1**: *According to Grimm's Hydride Displacement Law, which chemical group is electronically pseudo-equivalent to a chlorine atom (7 valence electrons)?*
  - (A) Hydroxyl radical ($-\text{OH}$)
  - (B) Amino group ($-\text{NH}_2$)
  - (C) Methyl group ($-\text{CH}_3$)
  - (D) Trifluoromethyl group ($-\text{CF}_3$) [CORRECT: Grimm displacement shifts across periodic groups by adding hydrides]
  - *Misconception Targeted*: Confusing atomic radius/mass with outer-shell electronic configuration.
- **Item 2**: *Why does substitution of a carboxylic acid ($-\text{COOH}$) with a $1H$-tetrazole ring in losartan improve oral bioavailability?*
  - (A) Tetrazole has similar acidic $\text{p}K_a$ (~4.5–4.9) but is 10-fold more lipophilic and resists Phase II glucuronidation [CORRECT]
  - (B) Tetrazole forms an irreversible covalent bond with the $\text{AT}_1$ receptor
  - (C) Tetrazole is degraded into urea in the stomach
  - (D) Carboxylic acids cannot bind zinc or basic residues
  - *Misconception Targeted*: Assuming bioisosteres must have identical atom counts and shapes.
- **Item 3**: *Why is 5-fluorouracil (5-FU) a potent antimetabolite inhibitor of thymidylate synthase while 5-chlorouracil is inactive?*
  - (A) Fluorine's van der Waals radius (1.47 Å) closely mimics hydrogen (1.20 Å), allowing enzyme binding, but the $C-F$ bond cannot be abstracted [CORRECT]
  - (B) Chlorine is too electronegative to fit the binding pocket
  - (C) 5-FU spontaneously decomposes into toxic cyanide
  - (D) Thymidylate synthase only recognizes halogenated purines
  - *Misconception Targeted*: Assuming all halogens are mutually interchangeable in enzyme active sites.
- **Item 4**: *Which ring replacement represents a classical aromatic bioisosteric equivalence based on Erlenmeyer's expansion?*
  - (A) Benzene ring replaced with a thiophene ring ($-S-$ substituting for $-CH=CH-$) [CORRECT]
  - (B) Cyclohexane replaced with adamantane
  - (C) Pyridine replaced with piperidine
  - (D) Benzene replaced with cyclobutane
  - *Misconception Targeted*: Treating saturated alicycles as bioisosteres of planar aromatic rings.

---

#### Lesson Details (`mc-mod-4`):

##### Lesson 1: Langmuir Isosteres & Grimm's Hydride Displacement Law (`mc-mod4-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Apply Grimm's Hydride Displacement Law and Langmuir's valence rules to identify isosteric groups with identical outer electron configurations.
- **Steps**: 10 steps (Step 1: The chemical mimicry hook, Step 2-4: Langmuir octet theory, Step 5: Grimm hydride table matrix, Step 6: Checkpoint, Step 7-9: Testing halogen-hydride equivalents ($-\text{CH}_3, -\text{NH}_2, -\text{OH}, -\text{F}$), Step 10: Recap).
- **Interactions**: Interactive Grimm hydride shift periodic table, valence shell electron counter, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Identify the Grimm hydride pseudo-equivalent of oxygen (6 valence electrons) formed by adding one hydrogen to a nitrogen atom. ($-\text{NH}-$, group 6 equivalent).
- **Recap**: Isosteres share identical numbers and arrangements of valence electrons; Grimm's law states adding $n$ hydrides shifts properties rightward by $n$ groups.
- **Spaced Review Items**:
  1. *Prompt*: State Grimm's Hydride Displacement Law. *Answer*: Adding one or more hydrogen atoms to an element imparts physical and electronic properties characteristic of the next element(s) to its right in the periodic table.
  2. *Prompt*: Name the Grimm hydride equivalents of the fluorine atom. *Answer*: $-\text{OH}$, $-\text{NH}_2$, $-\text{CH}_3$.
  3. *Prompt*: Who originally defined the term "isostere" in 1919 based on shared electron octets? *Answer*: Irving Langmuir.
- **Misconceptions**:
  - *Misconception 1*: "Isosteres must have the same total number of protons and neutrons." *Correction*: Isosteres require identical valence electron configurations, not identical nuclear mass.
- **Exam Alignment**: EUS (Biyoizosterizm Giriş, Slayt 1-5); NAPLEX (Structural Bioisosterism); SPLE (Medicinal Chemistry Principles).

##### Lesson 2: Classical Bioisosteres: Monovalent, Bivalent & Ring Equivalents (`mc-mod4-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Select classical monovalent, bivalent, and aromatic ring bioisosteres to modify potency, lipophilicity, and metabolic stability without disrupting receptor fit.
- **Steps**: 11 steps (Step 1: The phenothiazine antipsychotic bridge hook, Step 2-4: Monovalent swaps ($-\text{F}$ for $-\text{H}$, $-\text{OH}$ for $-\text{NH}_2$), Step 5: Bivalent bridge swaps ($-\text{O}-$, $-\text{S}-$, $-\text{NH}-$, $-\text{CH}_2-$), Step 6: Checkpoint, Step 7-9: Ring equivalences (benzene $\leftrightarrow$ thiophene $\leftrightarrow$ pyridine), Step 10: Faded SAR swap problem, Step 11: Recap).
- **Interactions**: Bioisostere drag-and-drop structural swapper, receptor volume tolerance gauge, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — In chlorpromazine, identify which bivalent bridge atom ($-\text{S}-$) connects the two aromatic rings and name its classical bioisosteric replacement in imipramine ($-CH_2-CH_2-$).
- **Recap**: Classical bioisosteres preserve valence and steric volume; swapping $-\text{S}-$ for $-\text{CH}=\text{CH}-$ or $-\text{O}-$ fine-tunes conformation and electronic distribution.
- **Spaced Review Items**:
  1. *Prompt*: Why is fluorine often substituted for hydrogen in lead optimization? *Answer*: Minimal steric impact (1.47 Å vs 1.20 Å) while blocking CYP aromatic oxidation and enhancing lipophilicity.
  2. *Prompt*: Which classical ring bioisostere replaces a $-CH=CH-$ unit in benzene with a divalent heteroatom? *Answer*: Thiophene ($-S-$) or furan ($-O-$).
  3. *Prompt*: What happens to water solubility when a phenyl ring is replaced with a 2-pyridyl ring? *Answer*: Increases significantly due to the basic nitrogen lone pair accepting hydrogen bonds.
- **Misconceptions**:
  - *Misconception 1*: "Replacing $-O-$ with $-S-$ preserves identical bond angles." *Correction*: Sulfur has a larger van der Waals radius and a smaller bond angle ($C-S-C \approx 90^\circ$ vs $C-O-C \approx 110^\circ$), altering 3D trajectory.
- **Exam Alignment**: EUS (Klasik Biyoizosterler, Slayt 6-10); NAPLEX (SAR Optimization); SPLE (Lead Optimization).

##### Lesson 3: Non-Classical Bioisosteres: The Carboxylate to Tetrazole Leap in Sartans (`mc-mod4-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Explain the pharmacokinetic and pharmacodynamic rationale for replacing carboxylic acids with non-classical tetrazole, sulfonamide, or phosphonate isosteres.
- **Steps**: 12 steps (Step 1: Losartan vs earlier peptide antagonists hook, Step 2-4: The planar $1H$-tetrazole ring: delocalized negative charge and $\text{p}K_a \approx 4.5–4.9$, Step 5: Checkpoint, Step 6-8: Comparison of oral bioavailability and metabolic stability against Phase II acyl glucuronidation, Step 9-11: Hydroxamic acid and boronic acid isosteres, Step 12: Recap).
- **Interactions**: Non-classical isostere electrostatic potential map visualizer, pKa and log P comparative gauge, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Compare the $\text{p}K_a$ and lipophilicity ($\log P$) of benzoic acid vs 5-phenyl-1H-tetrazole. (Similar $\text{p}K_a \approx 4.2$ vs $4.8$; tetrazole has $\log P \approx 1.8$ vs $1.2$).
- **Recap**: Non-classical bioisosteres mimic biological activity without matching atom counts or valence; tetrazole provides identical acidity with 10-fold higher lipophilicity and glucuronidation resistance.
- **Spaced Review Items**:
  1. *Prompt*: Why is tetrazole considered a non-classical rather than a classical bioisostere of carboxylic acid? *Answer*: It contains a 5-membered 4-nitrogen aromatic ring with completely different atom count and valence.
  2. *Prompt*: What metabolic liability of carboxylic acids does tetrazole substitution bypass? *Answer*: Rapid Phase II acyl-glucuronidation and reactive glucuronide ester formation.
  3. *Prompt*: Name two commercial sartan antihypertensives that utilize the tetrazole bioisostere. *Answer*: Losartan, Valsartan (or Candesartan).
- **Misconceptions**:
  - *Misconception 1*: "Because tetrazole contains 4 nitrogens, it must be basic." *Correction*: The tetrazole proton at N1 is acidic ($\text{p}K_a \approx 4.5$) due to extreme resonance delocalization across the four nitrogens.
- **Exam Alignment**: EUS (Klasik Olmayan Biyoizosterler ve Sartanlar); NAPLEX (Antihypertensive SAR); SPLE (Medicinal Chemistry).

##### Lesson 4: Antimetabolite Design: 5-Fluorouracil, Allopurinol & Selenomethionine (`mc-mod4-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Design antimetabolite enzyme inhibitors using bioisosteric replacement of endogenous purines, pyrimidines, and amino acids.
- **Steps**: 12 steps (Step 1: Trojan horse chemotherapy hook, Step 2-4: 5-Fluorouracil (5-FU) vs Uracil: suicide inhibition of thymidylate synthase, Step 5: Checkpoint, Step 6-8: Allopurinol (hypoxanthine isomer) inhibition of xanthine oxidase, Step 9-11: Selenomethionine and 6-mercaptopurine, Step 12: Recap).
- **Interactions**: Thymidylate synthase suicide ternary complex animator, antimetabolite design matrix, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Explain why the fluorinated ternary complex (FdUMP-Thymidylate Synthase-THF) cannot complete the enzymatic methylation cycle. (The $C-F$ bond cannot be broken as a fluoride cation, arresting catalysis).
- **Recap**: Antimetabolites exploit bioisosterism to fool biosynthetic enzymes into binding, followed by chemical stall or lethal synthesis into DNA/RNA.
- **Spaced Review Items**:
  1. *Prompt*: How does 5-FU inhibit thymidylate synthase? *Answer*: Formed FdUMP binds the catalytic cysteine and folate cofactor; enzyme cannot abstract fluorine, forming an irreversible dead-end ternary complex.
  2. *Prompt*: What endogenous purine base does allopurinol bioisosterically mimic to treat gout? *Answer*: Hypoxanthine (inhibiting xanthine oxidase to block uric acid production).
  3. *Prompt*: Which functional group bioisostere in 6-mercaptopurine replaces the 6-hydroxyl of hypoxanthine? *Answer*: A thiol ($-SH$) group, creating a cytotoxic antileukemic antimetabolite.
- **Misconceptions**:
  - *Misconception 1*: "5-FU blocks DNA polymerase directly." *Correction*: 5-FU is a prodrug converted to FdUMP, which specifically inhibits thymidylate synthase, starving cells of dTTP.
- **Exam Alignment**: EUS (Antimetabolitler ve Enzim İnhibitörleri); NAPLEX (Oncology & Gout Pharmacotherapy); SPLE (Antineoplastic Chemistry).

##### Lesson 5: Conformational Bioisosterism: Locking Bioactive Conformations via Ring Insertion (`mc-mod4-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Restrict single-bond rotatable flexibility by incorporating cyclic rings or double bonds to freeze bioactive conformations and boost target selectivity.
- **Steps**: 12 steps (Step 1: The floppy peptide trap hook, Step 2-4: Open-chain vs cyclized analogs: entropic binding penalty ($\Delta S$), Step 5: Ring incorporation across ethylenediamine cores (piperazine, morpholine), Step 6: Checkpoint, Step 7-9: Conformationally locked trans-cyclopropyl vs alkene derivatives, Step 10-11: Case study: Tranylcypromine vs amphetamine, Step 12: Recap).
- **Interactions**: Rotatable bond freezer slider, entropy penalty calculator ($\Delta G = \Delta H - T\Delta S$), predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Explain why cyclizing an acyclic lead molecule into a rigid ring can boost receptor binding affinity by $>100$-fold. (Pre-organizes bioactive conformation, eliminating unfavorable conformational entropy penalty $\Delta S$ upon binding).
- **Recap**: Conformational bioisosterism locks flexible chains into target-complementary geometries, reducing the entropic cost of binding and eliminating off-target conformations.
- **Spaced Review Items**:
  1. *Prompt*: What thermodynamic advantage does a conformationally locked rigid drug possess over a flexible open-chain analog? *Answer*: Greatly reduced loss of conformational entropy ($-T\Delta S$) upon binding the receptor.
  2. *Prompt*: What risk arises if a medicinal chemist locks a molecule into the wrong conformation? *Answer*: Complete loss of biological activity due to steric clashes or incorrect pharmacophore presentation.
  3. *Prompt*: What cyclic structure in tranylcypromine locks the phenethylamine backbone of amphetamine? *Answer*: A cyclopropane ring.
- **Misconceptions**:
  - *Misconception 1*: "Rigid molecules always have worse safety profiles than flexible ones." *Correction*: Rigid molecules typically have higher receptor selectivity and fewer off-target side effects.
- **Exam Alignment**: EUS (Konformasyonel Biyoizosterizm); NAPLEX (Drug Design Principles); SPLE (Medicinal Chemistry).

### Module 5: Drug Biotransformation & Enzymatic Pathways (`mc-mod-5`)
*Anchored on `İlaç metabolizması-2026.pdf` (44 slides).*

#### Diagnostic Pre-Test (`mc-mod5-diag`)
- **Item 1**: *During the Cytochrome P450 catalytic cycle, which reactive iron-oxygen intermediate carries out the direct oxidation/hydroxylation of drug substrates?*
  - (A) Oxo-ferryl porphyrin radical cation ($[\text{Fe}^{\text{IV}}=\text{O}]^{+\bullet}$, Compound I) [CORRECT]
  - (B) Ground-state ferric iron ($\text{Fe}^{\text{III}}$)
  - (C) Ferrous dioxy complex ($\text{Fe}^{\text{II}}-\text{O}_2$)
  - (D) Hydroxyl free radical in bulk solution
  - *Misconception Targeted*: Believing free hydroxyl radicals diffuse through solution to attack drugs indiscriminately.
- **Item 2**: *What is the chemical mechanism of the "NIH Shift" during aromatic hydroxylation?*
  - (A) Intramolecular 1,2-hydride migration triggered by spontaneous arene oxide ring opening to reform an aromatic keto-enol tautomer [CORRECT]
  - (B) Radical abstraction of a methyl group by glutathione
  - (C) Direct addition of molecular nitrogen to an epoxide
  - (D) Complete reduction of the benzene ring to cyclohexane
  - *Misconception Targeted*: Assuming aromatic epoxides only open via direct nucleophilic attack by water.
- **Item 3**: *Why do genetically "slow acetylators" (NAT2 deficient) develop peripheral neuropathy during isoniazid treatment?*
  - (A) Reduced Phase II N-acetylation causes accumulation of unmetabolized parent isoniazid, which binds pyridoxal (vitamin $B_6$) and drives its urinary excretion [CORRECT]
  - (B) Isoniazid forms an irreversible covalent bond with myelin basic protein
  - (C) Slow acetylators cannot excrete glucuronide conjugates
  - (D) NAT2 deficiency causes hyperactive CYP2E1 oxidation
  - *Misconception Targeted*: Failing to connect pharmacogenetic acetylation phenotypes with secondary nutritional/neurological toxicity.
- **Item 4**: *Which clinical antidote rescues patients from acute acetaminophen toxicity by replenishing cellular glutathione pools?*
  - (A) N-acetylcysteine (NAC) [CORRECT: provides cysteine precursor for rapid hepatic GSH resynthesis]
  - (B) Sodium bicarbonate
  - (C) Pralidoxime (2-PAM)
  - (D) Naloxone
  - *Misconception Targeted*: Conflating specific antidotes across cholinergic vs toxicological emergencies.

---

#### Lesson Details (`mc-mod-5`):

##### Lesson 1: Phase I Functionalization: CYP450 Mechanisms & Aliphatic/Aromatic Hydroxylation (`mc-mod5-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Trace the Cytochrome P450 catalytic cycle and predict regioselective aliphatic ($\omega, \omega-1$) and aromatic hydroxylation sites on drug molecules.
- **Steps**: 10 steps (Step 1: The hepatic combustion engine hook, Step 2-4: The CYP catalytic cycle: $\text{Fe}^{\text{III}} \to \text{Fe}^{\text{II}} \to \text{O}_2$ binding $\to$ Compound I, Step 5: Checkpoint, Step 6-8: Regioselectivity: benzylic, allylic, $\omega$ vs $\omega-1$ oxidation (ibuprofen, pentobarbital), Step 9: Faded metabolite prediction, Step 10: Recap).
- **Interactions**: Interactive CYP450 catalytic cycle stepper, drug hydroxylation site predictor, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Predict the primary Phase I oxidation site on the butyl side chain of pentobarbital. ($\omega-1$ secondary carbon hydroxylation, forming an alcohol).
- **Recap**: CYP450 enzymes use heme-iron Compound I to insert single oxygen atoms into unactivated $C-H$ bonds, unmasking or introducing polar functional groups.
- **Spaced Review Items**:
  1. *Prompt*: Name the active catalytic species in the CYP450 cycle responsible for oxygen insertion. *Answer*: Compound I (oxo-ferryl porphyrin radical cation, $[\text{Fe}^{\text{IV}}=\text{O}]^{+\bullet}$).
  2. *Prompt*: Why are benzylic and allylic carbons preferentially hydroxylated over ordinary aliphatic carbons? *Answer*: Radical intermediates formed during hydrogen abstraction are resonance-stabilized by adjacent $\pi$-systems.
  3. *Prompt*: What is the difference between $\omega$ and $\omega-1$ aliphatic oxidation? *Answer*: $\omega$-oxidation occurs at the terminal methyl carbon; $\omega-1$ occurs at the penultimate methylene carbon (yielding a secondary alcohol).
- **Misconceptions**:
  - *Misconception 1*: "Phase I metabolism always detoxifies drugs." *Correction*: Phase I often generates reactive electrophiles (epoxides, NAPQI) or pharmacologically active metabolites.
- **Exam Alignment**: EUS (Sitokrom P450 ve Oksidasyon, Slayt 1-15); NAPLEX (Phase I Metabolism); SPLE (Drug Biotransformation).

##### Lesson 2: Arene Oxides, Epoxide Hydrolase & The NIH Shift (`mc-mod5-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Explain the formation, electrophilic toxicity, and enzymatic detoxification of reactive arene oxide intermediates via epoxide hydrolase and the NIH shift.
- **Steps**: 11 steps (Step 1: Benzene toxicity vs safe drugs hook, Step 2-4: CYP epoxidation of aromatic rings: arene oxides, Step 5: The NIH shift mechanism: 1,2-hydride migration forming phenols, Step 6: Checkpoint, Step 7-9: Epoxide hydrolase trans-dihydrodiol formation and glutathione scavenging, Step 10: Faded reaction pathway, Step 11: Recap).
- **Interactions**: Arene oxide ring-opening pathway simulator, NIH shift atom tracer, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Contrast the metabolic fate of an arene oxide processed by epoxide hydrolase vs the non-enzymatic NIH shift. (Epoxide hydrolase produces a trans-dihydrodiol; NIH shift produces an aromatic phenol).
- **Recap**: Arene oxides are mutagenic/toxic electrophiles; cells defend themselves via non-enzymatic NIH shift rearrangement to phenols, epoxide hydrolase hydration to diols, or glutathione conjugation.
- **Spaced Review Items**:
  1. *Prompt*: What is the NIH shift? *Answer*: An intramolecular 1,2-hydride (or halogen) migration during the spontaneous rearrangement of an arene oxide to an aromatic phenol.
  2. *Prompt*: What stereochemical product does microsomal epoxide hydrolase generate from an arene oxide? *Answer*: A trans-dihydrodiol via anti-nucleophilic attack of water.
  3. *Prompt*: Why are arene oxides toxic if not rapidly detoxified? *Answer*: They are strong electrophiles that alkylate cellular nucleophiles (DNA guanine bases, protein thiols), causing mutagenesis or necrosis.
- **Misconceptions**:
  - *Misconception 1*: "The NIH shift is mediated by an enzyme." *Correction*: The NIH shift is a spontaneous chemical carbocation rearrangement occurring during uncatalyzed epoxide opening.
- **Exam Alignment**: EUS (Aren Oksitler ve NIH Kayması); NAPLEX (Toxic Metabolites & Carcinogenesis); SPLE (Biotransformation).

##### Lesson 3: Oxidative Dealkylation, Deamination & Reductive Transformations (`mc-mod5-les3`)
- **Access**: Paid (Permanent Freemium / 7-Day Trial)
- **Order**: 3
- **Objective**: Trace the mechanisms of CYP-catalyzed oxidative N-, O-, and S-dealkylation, oxidative deamination, and reductive metabolic pathways.
- **Steps**: 12 steps (Step 1: Codeine to morphine demethylation hook, Step 2-5: $\alpha$-Carbon hydroxylation of heteroatoms: hemiaminal and hemiketal collapse releasing aldehydes, Step 6: Checkpoint, Step 7-9: Oxidative deamination of amphetamines via carbinolamine intermediates, Step 10-11: Azo- and nitro-reductions (prontosil, chloramphenicol), Step 12: Recap).
- **Interactions**: $\alpha$-Hydroxylation cleavage simulator, prodrug metabolic pathway mapper, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Trace the intermediate formed when diazepam undergoes CYP3A4 N-demethylation. (Forms an unstable $\alpha$-hydroxymethyl hemiaminal that collapses into nordazepam and formaldehyde).
- **Recap**: Oxidative dealkylation proceeds via unstable $\alpha$-hydroxylated carbinolamine/hemiacetal intermediates that spontaneously fragment, releasing an amine/phenol plus an aldehyde.
- **Spaced Review Items**:
  1. *Prompt*: How does CYP450 cleave an N-methyl or O-methyl ether bond? *Answer*: Hydroxylates the $\alpha$-carbon to generate an unstable intermediate (hemiaminal or hemiacetal) that collapses, releasing formaldehyde.
  2. *Prompt*: Which CYP isozyme converts codeine into active morphine via O-demethylation? *Answer*: CYP2D6.
  3. *Prompt*: Name the historical azo dye prodrug cleaved by intestinal azo-reductases into sulfanilamide. *Answer*: Prontosil.
- **Misconceptions**:
  - *Misconception 1*: "Dealkylation directly breaks the carbon-heteroatom bond in one step." *Correction*: It requires initial oxygen insertion at the adjacent carbon, followed by spontaneous non-enzymatic fragmentation.
- **Exam Alignment**: EUS (Oksidatif Dealkilasyon ve İndirgenme); NAPLEX (Prodrug Biotransformation & CYP2D6); SPLE (Metabolism).

##### Lesson 4: Phase II Conjugation: Glucuronidation, Sulfation & Acetylation Polymorphism (`mc-mod5-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Differentiate high-capacity (glucuronidation) vs high-affinity/low-capacity (sulfation) Phase II pathways and assess clinical risks of NAT2 acetylation polymorphisms.
- **Steps**: 12 steps (Step 1: The polar tag of elimination hook, Step 2-4: UGT glucuronidation: UDPGA activated cofactor and $\beta$-D-glucuronides, Step 5: SULT sulfation: PAPS cofactor and saturation kinetics, Step 6: Checkpoint, Step 7-9: NAT2 N-acetylation: Acetyl-CoA cofactor and slow vs rapid acetylator genetics, Step 10-11: Clinical drug interactions (procainamide lupus, INH neuropathy), Step 12: Recap).
- **Interactions**: Phase II cofactor matching matrix, NAT2 patient genotype titration simulator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Compare the metabolic fate of low-dose vs high-dose acetaminophen in terms of sulfation vs glucuronidation capacity. (Low-dose relies heavily on high-affinity SULT; at higher doses, SULT saturates, shifting clearance to high-capacity UGT).
- **Recap**: Phase II conjugations append bulky, highly ionized endogenous tags (glucuronic acid, sulfate, acetyl) using activated cofactors (UDPGA, PAPS, Acetyl-CoA) for rapid biliary/renal excretion.
- **Spaced Review Items**:
  1. *Prompt*: What activated cofactor is required by UDP-glucuronosyltransferases (UGT)? *Answer*: UDP-glucuronic acid (UDPGA).
  2. *Prompt*: Why does N-acetylation (NAT2) decrease rather than increase the water solubility of drugs like sulfamethoxazole? *Answer*: It masks the polar basic amino group with a neutral, less water-soluble acetyl group (increasing crystalluria risk).
  3. *Prompt*: What adverse reaction occurs in slow acetylators taking procainamide or hydralazine? *Answer*: Drug-induced systemic lupus erythematosus (SLE).
- **Misconceptions**:
  - *Misconception 1*: "All Phase II metabolites are more water-soluble than parent drugs." *Correction*: Acetylation and methylation reduce polarity and water solubility.
- **Exam Alignment**: EUS (Faz II Konjugasyon ve Genetik Polimorfizm); NAPLEX (Pharmacogenomics & NAT2); SPLE (Phase II Biotransformation).

##### Lesson 5: Metabolic Traps: Glutathione Depletion, NAPQI Toxicity & Crystalluria (`mc-mod5-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Trace the bioactivation of acetaminophen into N-acetyl-p-benzoquinone imine (NAPQI), explain glutathione exhaustion, and design rescue regimens with N-acetylcysteine.
- **Steps**: 13 steps (Step 1: The midnight toxic ingestion emergency hook, Step 2-4: Acetaminophen bioactivation via CYP2E1/CYP3A4 to electrophilic NAPQI, Step 5: Checkpoint, Step 6-8: Glutathione nucleophilic trapping: mercapturic acid excretion pathway, Step 9-11: GSH depletion (<30%) causing hepatic necrosis; N-acetylcysteine (NAC) replenishment therapy, Step 12: Sulfonamide renal crystalluria risk and urine alkalinization, Step 13: Recap).
- **Interactions**: NAPQI hepatic GSH titration simulator, Rumack-Matthew nomogram interactive chart, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Identify the reactive electrophilic intermediate responsible for acetaminophen-induced fulminant hepatic necrosis. (NAPQI, N-acetyl-p-benzoquinone imine).
- **Recap**: Overdosing acetaminophen shunts clearance to CYP2E1, producing NAPQI; when hepatic GSH drops below 30%, NAPQI covalently attacks hepatocytes. NAC provides cysteine to restore GSH.
- **Spaced Review Items**:
  1. *Prompt*: What endogenous tripeptide neutralizes reactive electrophiles like NAPQI? *Answer*: Glutathione ($\gamma$-Glu-Cys-Gly, GSH) via glutathione S-transferase (GST).
  2. *Prompt*: How does N-acetylcysteine (NAC) treat acetaminophen overdose? *Answer*: Supplies L-cysteine, the rate-limiting substrate for cellular glutathione synthesis, and directly scavenges remaining NAPQI.
  3. *Prompt*: What urinary metabolite is formed when a glutathione conjugate is excreted? *Answer*: A mercapturic acid (N-acetylcysteine conjugate) formed via peptidases in kidney.
- **Misconceptions**:
  - *Misconception 1*: "Acetaminophen toxicity is caused by parent drug accumulating in the liver." *Correction*: Toxicity is caused entirely by the reactive Phase I electrophilic metabolite NAPQI after glutathione is depleted.
- **Exam Alignment**: EUS (Parasetamol Toksisitesi ve Glutatyon); NAPLEX (Toxicology & Acetaminophen Antidote Protocol); SPLE (Emergency Pharmacology).

---

## 3. Widget-to-Lesson Mapping Matrix (MedChem)

| Widget Component | Target Lessons | Interactive Mechanics & User Action | Fallback & A11y Behavior |
| :--- | :--- | :--- | :--- |
| `FergusonSlider` | `mc-mod1-les1` | Interactive thermodynamic saturation slider ($0.0001$ to $1.0$) with live cellular membrane perturbation visualization. | Accessible numeric range input with live screen reader text announcement. |
| `DielectricSolventLadder` | `mc-mod1-les2` | Drag-and-drop ordering of solvents ($\text{H}_2\text{O}$ down to Hexane) with real-time dielectric constant readouts. | Keyboard sortable list with ARIA live regions. |
| `PartitionSimulator` | `mc-mod1-les3` | Biphasic shake-flask slider separating solute between octanol and water phases, calculating live $\log P$. | Text table with tabular inputs and instant recalculation. |
| `HanschFragmentBuilder`| `mc-mod1-les4` | Clickable aromatic scaffold allowing attachment of $-\text{Cl}$, $-\text{OH}$, $-\text{CH}_3$, $-\text{CF}_3$ with cumulative $\pi$ calculation. | Checkbox group with running summation table. |
| `LipinskiRadarAuditor` | `mc-mod1-les5` | 4-axis polygon radar chart testing small molecules against 500 Da, 5 $\log P$, 5 HBD, 10 HBA cutoffs. | Accessible 4-row tabular pass/fail audit checklist. |
| `CIPPriorityRanker` | `mc-mod2-les1` | Interactive assignment of CIP priority (1 through 4) to alkene substituents, rendering $E$ or $Z$ tag. | Radio-button matrix with step-by-step priority explanations. |
| `ThreePointDockPuzzle` | `mc-mod2-les2` | 3D pocket docking interaction requiring user to rotate epinephrine to align 3 distinct pharmacophoric points. | 2D projection matcher with directional button controls. |
| `EudismicCalculator` | `mc-mod2-les3` | Dual potency slider comparing eutomer vs distomer $\text{EC}_{50}$ with instantaneous eudismic ratio computation. | Numeric inputs with step-by-step ratio display. |
| `RacemizationTimer` | `mc-mod2-les4` | Time-course simulation demonstrating spontaneous keto-enol racemization of $(R)$-thalidomide into $(S)$ at pH 7.4. | Step-by-step time-lapse table with graph. |
| `NewmanConformerRotator`| `mc-mod2-les5` | Rotatable Newman projection of acetylcholine / histamine with live dihedral angle and receptor affinity meters. | Discrete button selector for Anti, Gauche, and Eclipsed states. |
| `BioisostereSwapper` | `mc-mod4-les1..5`| Structure fragment swapper substituting $-\text{COOH}$ with tetrazole, $-\text{OH}$ with $-\text{NHSO}_2\text{CH}_3$, showing pKa and log P changes. | Side-by-side comparative cards with toggle switch. |
| `MetabolismPathwayMap` | `mc-mod5-les1..5`| Interactive enzyme pathway flowchart mapping Phase I CYP oxidation to Phase II glucuronide/glutathione conjugates. | Hierarchical collapsible tree view with full keyboard navigation. |

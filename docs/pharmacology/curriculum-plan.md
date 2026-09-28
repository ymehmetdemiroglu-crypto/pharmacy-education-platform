# Pharmacology (Course B) — Master Curriculum Architecture & Lesson Blueprint

## 1. Course Pedagogical Architecture

Course B (**Pharmacology**) structures drug actions, molecular receptor dynamics, physiological cascades, and systemic therapeutics into intuitive, active learn-by-doing modules.

### Foundational Constraints & Pedagogical Pillars:
- **Core Anchor Deck**: The unique 33-page presentation `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` serves as the foundational anchor for molecular receptor binding forces, covalent suicide inhibition, and metal chelation.
- **Shared Biotransformation Anchor**: `İlaç metabolizması-2026.pdf` (44 slides) grounds pharmacokinetic clearance and enzymatic metabolic cascades.
- **Reference Standard Synthesis**: Curricular modules across systems pharmacology are synthesized using standard global pharmacology textbooks: **Katzung's Basic & Clinical Pharmacology** (15th/16th Ed.) and **Goodman & Gilman's The Pharmacological Basis of Therapeutics** (14th Ed.).
- **Permanent Freemium**: Lessons 1 and 2 of **every single module** are free forever. Lessons 3+ require Premium or an active 7-Day Free Trial.
- **Micro-Step Interaction Guard**: 8 to 15 steps per lesson; maximum 40 words prose per step; one predict-then-reveal or interactive simulation per step.
- **Worked-Example Fading**: Dosing calculations, steady-state clearance, Kd/EC50 derivations, and Hill equation curves use phased guidance that fades to autonomous practice.
- **Strict Provenance**: Every claim and structure cites specific slides in `/materials/pharmacology` or reference compendia chapters. All content is authored de novo.

---

## 2. Module & Lesson Curriculum Structure

### Summary Table of Modules:

| Module ID | Module Title | Anchor Decks & Reference Standards | Total Lessons | Free Lessons | Paid Lessons |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `pharm-mod-1` | **Receptor Dynamics & Molecular Forces** | `İlaç Reseptör Etkileşimi.pdf` (33p) + Katzung Ch. 1-2 | 5 | 2 | 3 |
| `pharm-mod-2` | **Pharmacodynamics: Concentration-Effect Dynamics** | Ingested Deck (33p) + Katzung Ch. 2 / Goodman & Gilman Ch. 3 | 5 | 2 | 3 |
| `pharm-mod-3` | **Pharmacokinetics & In Vivo Biotransformation** | `İlaç metabolizması.pdf` (44p) + Goodman & Gilman Ch. 2-4 | 5 | 2 | 3 |
| `pharm-mod-4` | **Autonomic Nervous System Pharmacology** | Katzung Ch. 6-10 / Goodman & Gilman Ch. 8-12 | 5 | 2 | 3 |
| `pharm-mod-5` | **Cardiovascular & Renal Therapeutics** | Katzung Ch. 11-15 / Goodman & Gilman Ch. 25-29 | 5 | 2 | 3 |
| `pharm-mod-6` | **Central Nervous System Pharmacology** | Katzung Ch. 21-30 / Goodman & Gilman Ch. 14-24 | 5 | 2 | 3 |

---

### Module 1: Receptor Dynamics & Molecular Chemical Forces (`pharm-mod-1`)
*Anchored directly on `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` (33 slides) & Katzung Ch. 1-2.*

#### Diagnostic Pre-Test (`pharm-mod1-diag`)
- **Item 1**: *Which chemical bond type produces irreversible enzyme inhibition requiring de novo protein synthesis for recovery?*
  - (A) Covalent bond (e.g. organophosphate phosphorylation of AChE) [CORRECT]
  - (B) Electrostatic ionic bond
  - (C) Induced dipole-induced dipole van der Waals interaction
  - (D) Hydrophobic solvent exclusion
  - *Misconception Targeted*: Confusing high-affinity reversible binding ($K_d < 1\,\text{nM}$) with true covalent irreversibility.
- **Item 2**: *What is the primary thermodynamic driving force governing hydrophobic drug-receptor interactions?*
  - (A) Entropically favorable release of structured water cages into bulk solvent ($\Delta S > 0$) [CORRECT]
  - (B) Strong enthalpic hydrogen bonding between alkyl chains
  - (C) Covalent electron sharing between methyl groups
  - (D) Proton transfer to aromatic ring centroids
  - *Misconception Targeted*: Believing hydrophobic interactions are caused by active attractive forces between lipophilic groups.
- **Item 3**: *Why is dimercaprol (BAL) effective in acute arsenic or gold poisoning while EDTA is preferred for lead and calcium?*
  - (A) BAL provides vicinal dithiols that form stable 5-membered cyclic chelates with arsenic [CORRECT]
  - (B) BAL permanently acylates heavy metal atoms
  - (C) EDTA is insoluble in blood
  - (D) BAL only binds monovalent alkali metals
  - *Misconception Targeted*: Assuming all chelating agents bind metals with identical coordination geometry.

---

#### Lesson Details (`pharm-mod-1`):

##### Lesson 1: The Macromolecular Target: Receptor Classes & Mass Action Equilibrium (`pharm-mod1-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Explain the 4 major receptor superfamilies and calculate equilibrium binding parameters using the Law of Mass Action ($K_d = k_{\text{off}} / k_{\text{on}}$).
- **Steps**: 10 steps (Step 1: The receptor lock hook, Step 2-4: 4 Superfamilies: Ligand-gated ion channels, GPCRs, RTKs, Nuclear receptors, Step 5: Checkpoint, Step 6-8: Law of Mass Action interactive equilibrium simulation, Step 9: Faded $K_d$ derivation, Step 10: Recap).
- **Interactions**: Superfamily architecture explorer, live Mass Action equilibrium simulator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Match 4 drugs (insulin, diazepam, epinephrine, dexamethasone) to their corresponding receptor superfamily.
- **Recap**: Receptors couple ligand recognition to signal transduction; $K_d$ is the free drug concentration occupying 50% of available receptors at equilibrium.
- **Spaced Review Items**:
  1. *Prompt*: Name the four major receptor superfamilies in order of signaling velocity (fastest to slowest). *Answer*: Ligand-gated ion channels (milliseconds), GPCRs (seconds), Enzyme-linked RTKs (minutes to hours), Nuclear receptors (hours to days).
  2. *Prompt*: What does a low $K_d$ value indicate about drug-receptor binding? *Answer*: High binding affinity (less free drug required to achieve 50% receptor occupancy).
  3. *Prompt*: State the equilibrium Law of Mass Action equation for drug-receptor binding. *Answer*: $K_d = [D][R] / [DR] = k_{\text{off}} / k_{\text{on}}$.
- **Misconceptions**:
  - *Misconception 1*: "High affinity ($K_d$) guarantees maximal cellular response ($E_{\max}$)." *Correction*: $K_d$ measures binding affinity; cellular response depends on intrinsic efficacy and signal amplification.
  - *Misconception 2*: "Receptors only exist on the external plasma membrane." *Correction*: Steroid, thyroid, and PPAR receptors reside intracellularly in cytosol or nucleus.
- **Exam Alignment**: EUS (Farmakoloji Giriş ve Reseptörler); NAPLEX (Receptor Superfamilies); SPLE (Pharmacodynamics).

##### Lesson 2: Reversible Binding Forces: Ionic, Hydrogen & Hydrophobic Energies (`pharm-mod1-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Rank and model reversible non-covalent forces (ionic, hydrogen bond, dipole, van der Waals, hydrophobic) within the binding pocket.
- **Steps**: 11 steps (Step 1: The velcro of biology hook, Step 2-4: Ionic steering vs directional hydrogen bonding, Step 5: Dipole and charge-transfer $\pi-\pi$ stacking, Step 6: Checkpoint, Step 7-9: The hydrophobic effect: entropic water release ($\Delta S > 0$), Step 10: Energetic hierarchy ladder, Step 11: Recap).
- **Interactions**: Binding force energy ranker, water cage displacement simulator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Rank binding energies: Covalent ($40-140\,\text{kcal}$), Ionic ($5-10\,\text{kcal}$), Hydrogen ($2-7\,\text{kcal}$), Van der Waals ($0.5-1\,\text{kcal}$).
- **Recap**: Long-range ionic forces steer charged ligands into binding pockets; short-range hydrogen bonds and hydrophobic water exclusion lock high-affinity stereoselectivity.
- **Spaced Review Items**:
  1. *Prompt*: What is the primary thermodynamic origin of hydrophobic binding energy? *Answer*: Positive entropy change ($\Delta S > 0$) resulting from releasing ordered water molecules into bulk solution.
  2. *Prompt*: Which non-covalent force operates over the longest distance in aqueous media? *Answer*: Ionic (electrostatic) attraction, decaying inversely with distance ($1/r$).
  3. *Prompt*: Why do van der Waals forces require strict complementary shape matching? *Answer*: They decay rapidly ($1/r^6$) and contribute significant stabilization only when many atoms are in intimate contact.
- **Misconceptions**:
  - *Misconception 1*: "Hydrogen bonds are the strongest chemical bonds in biology." *Correction*: Covalent bonds are an order of magnitude stronger ($50-100\times$), and ionic bonds are stronger in nonpolar pockets.
  - *Misconception 2*: "Hydrophobic groups attract each other directly." *Correction*: They are pushed together by water's thermodynamic drive to maximize its own hydrogen bonding.
- **Exam Alignment**: EUS (İlaç-Reseptör Kimyasal Bağları, Slayt 7-25); NAPLEX (Drug-Target Interactions); SPLE (Basic Pharmacology).

##### Lesson 3: Irreversible Covalent Blockade: Beta-Lactams, Organophosphates & Alkylating Agents (`pharm-mod1-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Dissect mechanisms of covalent drug binding across beta-lactams, organophosphates, and alkylators, and explain why covalent blockade outlasts drug clearance.
- **Steps**: 12 steps (Step 1: The suicide inhibitor hook, Step 2-4: Beta-lactam acylation of bacterial transpeptidase serine, Step 5: Checkpoint, Step 6-8: Organophosphates: serine phosphorylation and the "aging" dealkylation clock, Step 9-11: Nitrogen mustard aziridinium alkylation of DNA, Step 12: Recap).
- **Interactions**: Covalent bond attack simulator, organophosphate aging timer, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Explain why aspirin's antiplatelet effect lasts 7–10 days despite its plasma half-life being only 15–20 minutes. (Irreversible COX-1 acetylation in anucleate platelets).
- **Recap**: Covalent drugs share electron pairs ($40–140\,\text{kcal/mol}$); pharmacological recovery requires synthesis of new enzyme/receptor macromolecules.
- **Spaced Review Items**:
  1. *Prompt*: How do beta-lactam antibiotics inhibit bacterial cell wall synthesis? *Answer*: Covalent acylation of transpeptidase (PBP) active-site serine, halting peptidoglycan cross-linking.
  2. *Prompt*: What is "aging" in organophosphate cholinesterase poisoning? *Answer*: Spontaneous chemical cleavage of an alkyl group from the phosphorylated enzyme, rendering inhibition permanently irreversible by 2-PAM.
  3. *Prompt*: Why does phenoxybenzamine produce irreversible $\alpha$-adrenoreceptor blockade? *Answer*: It forms a reactive aziridinium ion that covalently alkylates a nucleophilic residue in the $\alpha$-receptor pocket.
- **Misconceptions**:
  - *Misconception 1*: "All drugs wash out of receptors when blood concentration drops." *Correction*: Covalent drugs remain permanently bound; biological effect terminates only through protein turnover.
- **Exam Alignment**: EUS (Kovalan Bağlar ve Organofosfatlar); NAPLEX (Aspirin Antiplatelet Kinetics); SPLE (Toxicology & Antidotes).

##### Lesson 4: Multi-Point Cooperative Binding: The Dibucaine Model (`pharm-mod1-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Deconstruct the cooperative multi-point binding architecture of local anesthetics using the dibucaine pharmacophore model.
- **Steps**: 12 steps (Step 1: The local anesthetic puzzle hook, Step 2-5: Deconstruction of dibucaine: quinoline ring ($\pi-\pi$), amide carbonyl (H-bond), ether oxygen, protonated amine (ionic), butyl tail (hydrophobic), Step 6: Checkpoint, Step 7-9: Point-mutation simulation: what happens when one contact is deleted?, Step 10-11: Cooperativity and affinity multipliers, Step 12: Recap).
- **Interactions**: Interactive 5-point pharmacophore dissection canvas, contact deletion impact meter, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Predict the affinity loss when the protonated diethylamino nitrogen is replaced with a neutral ethyl ester.
- **Recap**: Potent drug molecules combine multiple modest interactions synergistically; deleting a single ionic contact can reduce affinity by 1,000-fold.
- **Spaced Review Items**:
  1. *Prompt*: What role does the aromatic ring play in local anesthetic binding? *Answer*: Hydrophobic insertion and $\pi-\pi$ stacking within the voltage-gated sodium channel pore.
  2. *Prompt*: Which functional group in dibucaine provides long-range electrostatic steering? *Answer*: The protonated tertiary amine cation interacting with an anionic channel carboxylate.
  3. *Prompt*: What is binding cooperativity? *Answer*: The phenomenon where initial binding orientates the molecule, dramatically reducing the entropic penalty for subsequent contact points.
- **Misconceptions**:
  - *Misconception 1*: "Drug potency depends on a single powerful bond." *Correction*: High potency arises from the summation and spatial synergy of multiple weak, reversible interactions.
- **Exam Alignment**: EUS (Dibukain Modeli, Slayt 33); NAPLEX (Local Anesthetic Mechanisms); SPLE (Pharmacodynamics).

##### Lesson 5: Coordination Chemistry in Medicine: Metal Chelation & Antidotes (`pharm-mod1-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Analyze multidentate metal coordination complexes and select clinical chelating antidotes for lead, arsenic, copper, and iron toxicities.
- **Steps**: 13 steps (Step 1: The heavy metal cellular siege hook, Step 2-5: Chelate effect, coordination numbers, 5- and 6-membered ring stability, Step 6: Checkpoint, Step 7-9: Clinical chelators: EDTA (hexadentate), BAL (dithiol), Penicillamine, Deferoxamine, Step 10-12: Tetracycline-metal chelation drug interactions, Step 13: Recap).
- **Interactions**: Chelate coordination ring builder, clinical poisoning antidote selector, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Match heavy metal intoxicants ($\text{Pb}^{2+}$, $\text{As}^{3+}$, $\text{Cu}^{2+}$, $\text{Fe}^{3+}$) with their first-line antidotes (EDTA/Succimer, BAL, Penicillamine, Deferoxamine).
- **Recap**: Polydentate chelators form stable multi-ring coordination complexes around metal ions; tetracyclines chelate polyvalent cations ($Ca^{2+}, Fe^{2+}$), blocking oral absorption.
- **Spaced Review Items**:
  1. *Prompt*: What is the "chelate effect"? *Answer*: The thermodynamic stabilization achieved when a single multidentate ligand coordinates a metal compared to multiple unidentate ligands ($\Delta S > 0$).
  2. *Prompt*: Why must patients avoid consuming dairy or antacids simultaneously with oral tetracyclines? *Answer*: Tetracyclines chelate divalent/trivalent cations ($Ca^{2+}, Mg^{2+}, Al^{3+}$), forming insoluble, unabsorbable complexes.
  3. *Prompt*: Which chelator is used for copper overload in Wilson's disease? *Answer*: D-Penicillamine (or trientine).
- **Misconceptions**:
  - *Misconception 1*: "EDTA can be administered orally for lead poisoning." *Correction*: EDTA has very low oral bioavailability (<5%) and must be given parenterally (or replaced with oral succimer).
- **Exam Alignment**: EUS (Şelasyon ve Antidotlar, Slayt 26-32); NAPLEX (Toxicology & Drug-Food Interactions); SPLE (Clinical Toxicology).

---

### Module 2: Pharmacodynamics: Concentration-Effect Dynamics (`pharm-mod-2`)
*Anchored on Ingested Receptor Deck (slides 3-8, 18) & Katzung Ch. 2 / Goodman & Gilman Ch. 3.*

#### Diagnostic Pre-Test (`pharm-mod2-diag`)
- **Item 1**: *What is the mathematical relationship between drug potency ($EC_{50}$) and binding affinity ($K_d$) in a tissue possessing significant spare receptors?*
  - (A) $EC_{50} < K_d$ (maximal tissue response requires occupancy of only a small fraction of receptors) [CORRECT]
  - (B) $EC_{50} > K_d$ (all receptors must be saturated to elicit any response)
  - (C) $EC_{50} = K_d$ in all biological tissues
  - (D) $EC_{50}$ is completely independent of receptor density
  - *Misconception Targeted*: Assuming 50% maximal biological response always requires 50% receptor occupancy.
- **Item 2**: *In a graded log dose-response curve, what distinguishes a competitive antagonist from a non-competitive antagonist?*
  - (A) Competitive antagonists cause a parallel rightward shift with unchanged $E_{\max}$; non-competitive antagonists depress $E_{\max}$ [CORRECT]
  - (B) Competitive antagonists decrease potency and crush $E_{\max}$
  - (C) Non-competitive antagonists shift curves to the left
  - (D) Competitive antagonists bind only allosteric sites
  - *Misconception Targeted*: Confusing surmountable rightward potency shifts with insurmountable efficacy depression.
- **Item 3**: *How does a partial agonist behave when administered in the presence of high concentrations of a full agonist?*
  - (A) Acts as a competitive antagonist, displacing the full agonist and reducing tissue response to its submaximal ceiling [CORRECT]
  - (B) Synergistically doubles the $E_{\max}$ above 100%
  - (C) Converts the full agonist into an irreversible antagonist
  - (D) Triggers receptor destruction
  - *Misconception Targeted*: Believing an "agonist" must always increase overall biological signaling regardless of background tone.
- **Item 4**: *Which metric provides the safest clinical estimate of drug safety margin by comparing minimal toxic dose to maximal effective dose?*
  - (A) Certain Safety Factor ($\text{CSF} = TD_1 / ED_{99}$) [CORRECT: guarantees overlap evaluation between tail percentiles]
  - (B) Standard Therapeutic Index ($TI = TD_{50} / ED_{50}$)
  - (C) Receptor dissociation constant ($K_d$)
  - (D) Hill coefficient ($n_H$)
  - *Misconception Targeted*: Relying exclusively on median $50\%$ ratios without examining dose-response slope divergence.

---

#### Lesson Details (`pharm-mod-2`):

##### Lesson 1: Affinity vs Intrinsic Activity (Efficacy): What Turns a Receptor "On"? (`pharm-mod2-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Differentiate thermodynamic binding affinity ($K_d$) from intrinsic efficacy ($\alpha$ or $e$) and explain the two-state model of receptor activation ($R \leftrightarrow R^*$).
- **Steps**: 10 steps (Step 1: The locked door vs turning key hook, Step 2-4: Clarke occupancy theory vs Stephenson/Furchgott intrinsic efficacy, Step 5: Checkpoint, Step 6-8: Two-state receptor equilibrium ($R$ inactive vs $R^*$ active), Step 9: Faded efficacy problem, Step 10: Recap).
- **Interactions**: Two-state receptor conformational toggle, affinity vs efficacy dual slider, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Given Drug A ($K_d = 1\,\text{nM}, \alpha = 0$) and Drug B ($K_d = 100\,\text{nM}, \alpha = 1.0$), identify which is the high-affinity antagonist and which is the lower-affinity full agonist. (Drug A is antagonist; Drug B is full agonist).
- **Recap**: Affinity ($K_d$) dictates receptor binding; intrinsic efficacy ($\alpha$) dictates whether binding stabilizes the active conformation ($R^*$) to produce a biological signal.
- **Spaced Review Items**:
  1. *Prompt*: Define intrinsic activity ($\alpha$). *Answer*: A measure of a drug's ability to activate a receptor once bound, ranging from $0$ (pure antagonist) to $1.0$ (full agonist).
  2. *Prompt*: What does an inverse agonist do in the two-state receptor model? *Answer*: Selectively binds and stabilizes the inactive conformation ($R$), suppressing basal constitutive receptor activity below baseline ($\alpha < 0$).
  3. *Prompt*: Can a pure antagonist produce a cellular response in a system with zero basal activity? *Answer*: No; an antagonist has zero efficacy ($\alpha = 0$) and only blocks agonists.
- **Misconceptions**:
  - *Misconception 1*: "Antagonists pull receptors into an altered inactive state." *Correction*: Neutral antagonists bind $R$ and $R^*$ with equal affinity, simply blocking agonist access without shifting equilibrium.
- **Exam Alignment**: EUS (Farmakodinamik ve Reseptör Efficacysi); NAPLEX (Pharmacodynamics); SPLE (Receptor Theory).

##### Lesson 2: Graded vs Quantal Dose-Response Curves: Potency, Efficacy & Therapeutic Index (`pharm-mod2-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Extract $EC_{50}$, $E_{\max}$, $TD_{50}$, and $ED_{50}$ from graded and quantal dose-response curves to calculate Therapeutic Index ($TI$) and Certain Safety Factor ($CSF$).
- **Steps**: 11 steps (Step 1: Single cell contraction vs population headache relief hook, Step 2-4: Graded log-concentration curves (Hill equation, $EC_{50}$, $E_{\max}$), Step 5: Quantal cumulative population curves ($ED_{50}, TD_{50}, LD_{50}$), Step 6: Checkpoint, Step 7-9: Therapeutic Index vs Certain Safety Factor calculation, Step 10: Faded clinical safety problem, Step 11: Recap).
- **Interactions**: Dynamic semi-log dose-response curve plotter, population frequency cumulative distribution slider, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Calculate the Therapeutic Index for warfarin given $TD_{50} = 10\,\text{mg}$ and $ED_{50} = 5\,\text{mg}$. ($TI = 2.0$, narrow therapeutic window).
- **Recap**: Graded curves evaluate response magnitude in an individual ($EC_{50} =$ potency, $E_{\max} =$ efficacy); quantal curves evaluate all-or-none population frequency ($TI = TD_{50}/ED_{50}$).
- **Spaced Review Items**:
  1. *Prompt*: Distinguish between drug potency and drug efficacy. *Answer*: Potency is the concentration required to achieve $50\%$ response ($EC_{50}$); efficacy is the maximum achievable biological effect ($E_{\max}$).
  2. *Prompt*: Why is Certain Safety Factor ($\text{CSF} = TD_1 / ED_{99}$) clinically superior to Therapeutic Index ($TI = TD_{50}/ED_{50}$)? *Answer*: CSF accounts for curve steepness/slopes, verifying that the minimally toxic dose in sensitive patients exceeds the maximally effective dose in resistant patients.
  3. *Prompt*: If Drug X has $EC_{50} = 2\,\text{mg}$ and Drug Y has $EC_{50} = 20\,\text{mg}$, which is more potent? *Answer*: Drug X is 10-fold more potent (requires lower concentration for half-maximal effect).
- **Misconceptions**:
  - *Misconception 1*: "The more potent drug is always the superior clinical choice." *Correction*: Clinical value depends on maximal efficacy ($E_{\max}$) and safety margin, not raw potency.
- **Exam Alignment**: EUS (Doz-Yanıt Eğrileri ve Terapötik İndeks); NAPLEX (Biostatistics & Safety Margins); SPLE (Pharmacodynamics).

##### Lesson 3: Full vs Partial Agonism: Spare Receptors & The Submaximal Ceiling (`pharm-mod2-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Analyze partial agonism, receptor reserves (spare receptors), and determine why partial agonists exhibit tissue-dependent efficacy.
- **Steps**: 12 steps (Step 1: Buprenorphine respiratory ceiling hook, Step 2-4: Full vs partial agonist concentration-effect curves, Step 5: Checkpoint, Step 6-8: Spare receptor concept ($EC_{50} < K_d$) via signal amplification, Step 9-11: Buprenorphine displacing morphine in opioid dependency, Step 12: Recap).
- **Interactions**: Spare receptor amplification slider, partial agonist displacement competitive canvas, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Predict patient symptoms when buprenorphine (partial $\mu$-agonist) is administered to a heroin-dependent patient with high circulating full agonist levels. (Precipitated acute opioid withdrawal).
- **Recap**: Partial agonists cannot produce 100% $E_{\max}$ even at full receptor saturation; they act as competitive inhibitors in the presence of full agonists; spare receptors shift $EC_{50}$ left of $K_d$.
- **Spaced Review Items**:
  1. *Prompt*: What happens to the concentration-response curve of a full agonist in a tissue with 90% spare receptors when an irreversible antagonist destroys 50% of receptors? *Answer*: Curves shift rightward with unchanged $E_{\max}$ because remaining receptors suffice for maximal response.
  2. *Prompt*: Why does buprenorphine have a lower risk of fatal respiratory depression than fentanyl? *Answer*: Being a partial agonist, its intrinsic efficacy plateaus at a submaximal ceiling below fatal respiratory arrest.
  3. *Prompt*: What is the definition of "spare receptors"? *Answer*: Receptors are spare when maximal biological response is achieved at a ligand concentration occupying fewer than 100% of available receptors.
- **Misconceptions**:
  - *Misconception 1*: "Spare receptors are physically hidden in intracellular vesicles." *Correction*: Spare receptors are fully functional cell-surface receptors made redundant by downstream signal amplification (e.g. adenylyl cyclase cascades).
- **Exam Alignment**: EUS (Kısmi Agonistler ve Yedek Reseptörler); NAPLEX (Opioid Overdose & Buprenorphine); SPLE (Pharmacodynamics).

##### Lesson 4: Competitive Antagonism: Parallel Rightward Shifts & Schild Regressions (`pharm-mod2-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Derive and interpret the Gaddum and Schild equations to determine antagonist affinity ($pA_2$ or $K_i$) from parallel rightward dose-response shifts.
- **Steps**: 12 steps (Step 1: Atropine overcoming acetylcholine hook, Step 2-5: Reversible competitive antagonism and Dose Ratio ($DR = 1 + [I]/K_i$), Step 6: Checkpoint, Step 7-9: The Schild plot: $\log(DR-1)$ vs $\log[I]$ (slope = 1.0, x-intercept = $\text{p}A_2$), Step 10-11: Clinical implications of surmountable blockade, Step 12: Recap).
- **Interactions**: Interactive Schild plot generator, competitive rightward shift dose-ratio animator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Given an agonist $EC_{50} = 10\,\text{nM}$ that shifts to $EC_{50} = 100\,\text{nM}$ in the presence of $1\,\mu\text{M}$ antagonist, compute the Dose Ratio ($DR = 10$).
- **Recap**: Competitive antagonists reversibly compete for the orthosteric site; blockade is surmountable by increasing agonist concentration, shifting the curve rightward without lowering $E_{\max}$.
- **Spaced Review Items**:
  1. *Prompt*: What slope value in a Schild regression confirms pure competitive orthosteric antagonism? *Answer*: A linear slope equal to exactly 1.0.
  2. *Prompt*: Define $pA_2$. *Answer*: The negative logarithm of the molar antagonist concentration that requires a 2-fold increase in agonist concentration to maintain original response ($DR=2$).
  3. *Prompt*: How can a physician overcome competitive receptor blockade clinically? *Answer*: By increasing the dose/concentration of the agonist drug.
- **Misconceptions**:
  - *Misconception 1*: "A competitive antagonist decreases the efficacy of an agonist." *Correction*: Competitive antagonists decrease agonist *potency* (shift $EC_{50}$ right), while *efficacy* ($E_{\max}$) remains fully achievable at higher doses.
- **Exam Alignment**: EUS (Yarışmalı Antagonizma ve Schild Denklemi); NAPLEX (Competitive Antagonists); SPLE (Pharmacology Principles).

##### Lesson 5: Non-Competitive, Allosteric & Irreversible Antagonism: Crushing the $E_{\max}$ (`pharm-mod2-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Contrast non-competitive, allosteric (PAMs/NAMs), and irreversible antagonism by evaluating non-surmountable depression of $E_{\max}$.
- **Steps**: 12 steps (Step 1: Phenoxybenzamine irreversible pheochromocytoma control hook, Step 2-4: Irreversible orthosteric covalent alkylation crushing $E_{\max}$, Step 5: Checkpoint, Step 6-8: Allosteric modulation: positive (PAM, benzodiazepine) vs negative (NAM) allosteric modulators, Step 9-11: Physiological vs chemical vs pharmacological antagonism, Step 12: Recap).
- **Interactions**: Allosteric conformation morpher, insurmountable $E_{\max}$ depression simulation, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Explain why administering higher doses of norepinephrine cannot restore blood pressure during phenoxybenzamine therapy. (Phenoxybenzamine covalently inactivates $\alpha$-receptors; blockade is non-surmountable).
- **Recap**: Non-competitive and irreversible antagonists reduce functional receptor numbers or uncouple signaling, depressing $E_{\max}$ in an insurmountable manner. Allosteric modulators tune receptor affinity/efficacy from distinct sites.
- **Spaced Review Items**:
  1. *Prompt*: What happens to the concentration-response curve of an agonist in the presence of an irreversible antagonist after spare receptors are exhausted? *Answer*: Progressive depression of maximal response ($E_{\max}$) that cannot be overcome by adding more agonist.
  2. *Prompt*: Contrast orthosteric and allosteric receptor binding sites. *Answer*: Orthosteric sites bind endogenous agonists; allosteric sites are spatially distinct topographies that modulate receptor conformation when bound.
  3. *Prompt*: Give an example of physiological antagonism. *Answer*: Epinephrine (bronchodilation via $\beta_2$) counteracting histamine (bronchoconstriction via $H_1$) through opposing physiological pathways.
- **Misconceptions**:
  - *Misconception 1*: "Non-competitive antagonism can be overcome by giving 100 times more agonist." *Correction*: Insurmountable antagonism cannot be overcome by any concentration of agonist.
- **Exam Alignment**: EUS (Yarışmasız ve Allosterik Antagonizma); NAPLEX (Phenoxybenzamine & Allosteric Drugs); SPLE (Pharmacodynamics).

### Module 3: Pharmacokinetics & In Vivo Biotransformation (`pharm-mod-3`)
*Anchored on `İlaç metabolizması-2026.pdf` (44 slides) & Goodman & Gilman Ch. 2-4.*

#### Diagnostic Pre-Test (`pharm-mod3-diag`)
- **Item 1**: *If a drug has an oral AUC of $30\,\text{mg}\cdot\text{h/L}$ and an IV AUC of $60\,\text{mg}\cdot\text{h/L}$ at identical doses, what is its absolute oral bioavailability ($F$)?*
  - (A) $50\%$ ($F = \text{AUC}_{\text{oral}} / \text{AUC}_{\text{IV}} = 30 / 60$) [CORRECT]
  - (B) $200\%$
  - (C) $100\%$
  - (D) $25\%$
  - *Misconception Targeted*: Inverting the oral vs intravenous exposure ratio in bioavailability calculations.
- **Item 2**: *Why can a drug have an apparent Volume of Distribution ($V_d = 500\,\text{L}$) that vastly exceeds total human anatomical body water (~42 L)?*
  - (A) The drug is extensively sequestered in peripheral tissues (adipose or intracellular proteins), leaving minimal drug in plasma [CORRECT]
  - (B) The patient has massive pathological fluid retention
  - (C) The drug actively binds only circulating plasma albumin
  - (D) The analytical assay decomposed in the test tube
  - *Misconception Targeted*: Treating Volume of Distribution as an actual physical anatomical fluid volume rather than an apparent proportionality factor.
- **Item 3**: *How many elimination half-lives ($t_{1/2}$) are required for a constant-rate IV infusion to reach approximately 97% of steady-state plasma concentration ($C_{ss}$)?*
  - (A) 5 half-lives ($1 - (0.5)^5 = 96.875\%$) [CORRECT]
  - (B) 1 half-life
  - (C) 2 half-lives
  - (D) 10 half-lives
  - *Misconception Targeted*: Believing increasing infusion rate accelerates the time required to reach steady state.
- **Item 4**: *Which mechanism explains why co-administering rifampin with oral contraceptives precipitates breakthrough pregnancy?*
  - (A) Rifampin potently induces CYP3A4 via PXR nuclear receptor activation, accelerating ethinyl estradiol clearance [CORRECT]
  - (B) Rifampin is a competitive estrogen receptor antagonist
  - (C) Rifampin blocks intestinal absorption of all steroids
  - (D) Rifampin inhibits renal reabsorption of hormones
  - *Misconception Targeted*: Confusing enzyme induction (transcriptional synthesis over days) with immediate competitive inhibition.

---

#### Lesson Details (`pharm-mod-3`):

##### Lesson 1: Bioavailability (F) & First-Pass Hepatic Elimination: The Portal Sieve (`pharm-mod3-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Calculate absolute oral bioavailability ($F = f \times (1 - ER)$) and design alternative dosage routes to bypass hepatic portal first-pass extraction.
- **Steps**: 10 steps (Step 1: Oral nitroglycerin failure hook, Step 2-4: The portal journey: intestinal absorption ($f$) and hepatic extraction ratio ($ER$), Step 5: Checkpoint, Step 6-8: AUC trapezoidal integration oral vs IV, Step 9: Sublingual and transdermal bypass routes, Step 10: Recap).
- **Interactions**: Portal first-pass extraction sieve animator, oral vs IV concentration-time curve integrator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Given a drug completely absorbed across the gut ($f=1.0$) with hepatic extraction ratio $ER = 0.80$, compute oral bioavailability ($F = 0.20$ or $20\%$).
- **Recap**: Bioavailability is the fraction of administered dose reaching systemic circulation unchanged; drugs with high hepatic extraction ($ER > 0.7$) require alternative administration routes (sublingual, rectal, transdermal).
- **Spaced Review Items**:
  1. *Prompt*: State the formula for absolute oral bioavailability $F$ from AUC data. *Answer*: $F = (\text{AUC}_{\text{oral}} \times \text{Dose}_{\text{IV}}) / (\text{AUC}_{\text{IV}} \times \text{Dose}_{\text{oral}})$.
  2. *Prompt*: Why is sublingual nitroglycerin administered rather than oral tablets for acute angina? *Answer*: Sublingual venous drainage flows directly into the superior vena cava, bypassing hepatic first-pass metabolism ($ER \approx 0.95$).
  3. *Prompt*: What two anatomical organs contribute to pre-systemic first-pass elimination? *Answer*: The intestinal wall (gut enterocytes, CYP3A4/P-gp) and the liver.
- **Misconceptions**:
  - *Misconception 1*: "Low bioavailability always means poor intestinal absorption." *Correction*: A drug can be 100% absorbed from the gut lumen yet have near-zero bioavailability due to extensive first-pass hepatic extraction.
- **Exam Alignment**: EUS (Biyoyararlanım ve İlk Geçiş Etkisi); NAPLEX (Bioavailability Calculations); SPLE (Biopharmaceutics).

##### Lesson 2: Volume of Distribution (Vd) & Protein Binding: Albumin vs Alpha-1 Acid Glycoprotein (`pharm-mod3-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Compute apparent volume of distribution ($V_d = \text{Dose} / C_0$) and evaluate the clinical displacement consequences of plasma protein binding (Albumin vs AAG).
- **Steps**: 11 steps (Step 1: The disappearing dose puzzle hook, Step 2-4: The physiological dilution tank and Apparent $V_d = V_p + V_t(f_u/f_{ut})$, Step 5: Acidic drug binding (Albumin) vs basic drug binding ($\alpha_1$-acid glycoprotein), Step 6: Checkpoint, Step 7-9: Sulfonamide-bilirubin displacement (kernicterus) and warfarin displacement, Step 10: Faded $V_d$ problem, Step 11: Recap).
- **Interactions**: Biphasic plasma vs tissue distribution reservoir tank slider, protein binding displacement simulator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Calculate apparent $V_d$ given a $500\,\text{mg}$ IV bolus producing an immediate extrapolated peak plasma concentration $C_0 = 10\,\text{mg/L}$. ($V_d = 50\,\text{L}$).
- **Recap**: $V_d$ is the apparent volume needed to contain the total drug dose at the concentration observed in plasma; high lipophilicity/tissue binding drives $V_d \gg 42\,\text{L}$.
- **Spaced Review Items**:
  1. *Prompt*: Which major circulating plasma protein binds acidic drugs like warfarin and phenytoin? *Answer*: Human serum albumin.
  2. *Prompt*: Which acute-phase plasma protein binds basic drugs like lidocaine and propranolol? *Answer*: $\alpha_1$-Acid glycoprotein (AAG).
  3. *Prompt*: Why are sulfonamides contraindicated in neonates? *Answer*: Displace bilirubin from albumin binding sites, precipitating bilirubin entry across the immature BBB into basal ganglia (kernicterus).
- **Misconceptions**:
  - *Misconception 1*: "A drug with 99% protein binding cannot exert pharmacological effect." *Correction*: The 1% free unbound drug ($f_u$) is in dynamic equilibrium and exerts the pharmacodynamic response.
- **Exam Alignment**: EUS (Dağılım Hacmi ve Plazma Proteinlerine Bağlanma); NAPLEX (Pharmacokinetics & Warfarin Interactions); SPLE (Clinical PK).

##### Lesson 3: Clearance (CL), Half-Life ($t_{1/2}$) & Steady-State Dynamics: The Rule of 5 Half-Lives (`pharm-mod3-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Derive systemic clearance ($CL = kV_d$), calculate elimination half-life ($t_{1/2} = 0.693 V_d / CL$), and determine loading doses ($LD = V_d \times C_{\text{target}}$) and maintenance infusion rates ($MD = CL \times C_{ss}$).
- **Steps**: 12 steps (Step 1: The steady-state dialysis infusion hook, Step 2-5: Systemic clearance ($CL = \text{Rate of elimination} / C_p$), Step 6: Checkpoint, Step 7-9: Relationship between $t_{1/2}$, $V_d$, and $CL$, Step 10-11: Designing loading dose ($LD$) to achieve immediate therapeutic target followed by maintenance dose ($MD$), Step 12: Recap).
- **Interactions**: Multi-compartment pharmacokinetic infusion grapher, loading dose vs maintenance rate calculator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Given a patient with $V_d = 50\,\text{L}$ and $CL = 3.5\,\text{L/h}$, calculate elimination half-life $t_{1/2}$. ($t_{1/2} = 0.693 \times 50 / 3.5 \approx 9.9\,\text{hours}$).
- **Recap**: Clearance ($CL$) is the volume of blood completely cleared of drug per unit time; steady state during continuous infusion is reached after 4–5 half-lives, independent of infusion rate.
- **Spaced Review Items**:
  1. *Prompt*: Write the mathematical formula relating elimination half-life ($t_{1/2}$) to $V_d$ and $CL$. *Answer*: $t_{1/2} = (0.693 \times V_d) / CL$.
  2. *Prompt*: If you double the rate of a constant IV infusion, what happens to the time required to reach steady state? *Answer*: It remains completely unchanged (still takes 4–5 half-lives), though the steady-state concentration itself doubles.
  3. *Prompt*: What is the formula for a loading dose ($LD$)? *Answer*: $LD = (V_d \times C_{\text{target}}) / F$.
- **Misconceptions**:
  - *Misconception 1*: "Half-life is an independent physiological parameter." *Correction*: Half-life is a secondary derived parameter determined mutually by Volume of Distribution ($V_d$) and Clearance ($CL$).
- **Exam Alignment**: EUS (Klerens, Yarılanma Ömrü ve Yükleme Dozu); NAPLEX (Clinical Pharmacokinetics & Calculations); SPLE (Dosing Regimens).

##### Lesson 4: Cytochrome P450 Cascades: Induction, Competitive Inhibition & Clinical Drug Interactions (`pharm-mod3-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Predict and manage life-threatening pharmacokinetic drug-drug interactions caused by CYP3A4, CYP2D6, and CYP2C9 competitive inhibitors vs nuclear receptor-mediated inducers.
- **Steps**: 12 steps (Step 1: The grapefruit juice mystery hook, Step 2-4: Major human CYP isozymes and substrate overlaps (3A4, 2D6, 2C9, 2C19, 1A2), Step 5: Checkpoint, Step 6-8: Competitive vs mechanism-based suicide inhibition (ketoconazole, clarithromycin, furanocoumarins), Step 9-11: Transcriptional induction via PXR/CAR receptors (rifampin, carbamazepine, St. John's wort), Step 12: Recap).
- **Interactions**: CYP enzyme drug-drug interaction matrix matcher, prodrug activation failure simulator (clopidogrel), predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Contrast the time course of CYP inhibition vs CYP induction. (Inhibition occurs immediately upon drug arrival in liver/gut; induction requires 3–7 days for de novo enzyme protein synthesis).
- **Recap**: Competitive inhibition causes immediate drug accumulation and toxicity; transcriptional induction (via PXR/CAR) takes days to ramp up, accelerating clearance and causing therapeutic failure.
- **Spaced Review Items**:
  1. *Prompt*: Name the most abundant human hepatic and intestinal CYP enzyme responsible for metabolizing $>50\%$ of prescription drugs. *Answer*: CYP3A4.
  2. *Prompt*: Why does drinking grapefruit juice dramatically increase oral felodipine plasma levels while leaving IV felodipine unaffected? *Answer*: Grapefruit furanocoumarins irreversibly inhibit *intestinal enterocyte* CYP3A4, destroying pre-systemic first-pass extraction without affecting hepatic CYP.
  3. *Prompt*: Why do poor CYP2C19 metabolizers fail to achieve antiplatelet protection from clopidogrel? *Answer*: Clopidogrel is an inactive prodrug requiring CYP2C19 bioactivation into its active thiol metabolite.
- **Misconceptions**:
  - *Misconception 1*: "All drug interactions occur immediately upon starting a new medication." *Correction*: Enzyme induction requires several days to synthesize new enzyme molecules, and persists for days after stopping the inducer.
- **Exam Alignment**: EUS (Sitokrom P450 İnhibisyonu ve İndüksiyonu); NAPLEX (CYP Drug Interactions & Grapefruit Juice); SPLE (Clinical Pharmacology).

##### Lesson 5: Renal Clearance, Tubular Secretion Traps & Metabolic Crystalluria Defense (`pharm-mod3-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Calculate net renal clearance ($CL_{\text{renal}} = \text{Filtration} + \text{Secretion} - \text{Reabsorption}$) and apply urine pH manipulation to treat drug intoxications.
- **Steps**: 13 steps (Step 1: The aspirin overdose emergency hook, Step 2-4: Glomerular filtration ($GFR \times f_u$) and active organic anion/cation secretion (OAT/OCT), Step 5: Checkpoint, Step 6-8: Passive tubular reabsorption and pH-partition trapping (Henderson-Hasselbalch), Step 9-11: Ion trapping: sodium bicarbonate for weak acids (aspirin, methotrexate) vs ammonium chloride for weak bases, Step 12: Sulfonamide crystalluria defense, Step 13: Recap).
- **Interactions**: Renal nephron clearance flux calculator, urine pH ion-trapping excretion simulator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — If a drug has $CL_{\text{renal}} = 350\,\text{mL/min}$ and inulin clearance ($GFR$) is $125\,\text{mL/min}$, identify the primary renal elimination mechanism. (Active tubular secretion via OAT or OCT transporters).
- **Recap**: Net renal clearance reflects filtration, active transport secretion, and passive reabsorption; alkalinizing urine with IV sodium bicarbonate ionizes weak acids ($\text{p}K_a \approx 3–5$), trapping them in the tubular lumen to accelerate excretion.
- **Spaced Review Items**:
  1. *Prompt*: What finding proves that a drug undergoes active tubular secretion in the kidney? *Answer*: Renal clearance ($CL_{\text{renal}}$) exceeding $GFR \times f_u$ (or exceeding $125\,\text{mL/min}$ in normal humans).
  2. *Prompt*: How does urine alkalinization with sodium bicarbonate accelerate salicylate (aspirin) excretion? *Answer*: Increases tubular pH, shifting salicylic acid ($\text{p}K_a = 3.0$) into its ionized salicylate anion ($A^-$), which cannot diffuse back across renal epithelial membranes.
  3. *Prompt*: Which transporter in the proximal tubule is inhibited by probenecid to prolong penicillin antibiotic blood levels? *Answer*: Organic Anion Transporter (OAT1/OAT3).
- **Misconceptions**:
  - *Misconception 1*: "Protein-bound drug is filtered at the glomerulus." *Correction*: Only unbound free drug ($f_u$) passes through the glomerular filtration barrier; however, protein-bound drug can still undergo active tubular secretion.
- **Exam Alignment**: EUS (Böbrek Klerensi ve İyon Tuzağı); NAPLEX (Salicylate Toxicity & Renal Elimination); SPLE (Renal Pharmacokinetics).

### Module 4: Autonomic Nervous System Pharmacology (`pharm-mod-4`)
*Reference Standard: Katzung Ch. 6-10 / Goodman & Gilman Ch. 8-12.*

#### Diagnostic Pre-Test (`pharm-mod4-diag`)
- **Item 1**: *Which downstream secondary messenger cascade is activated by odd-numbered muscarinic receptors ($M_1, M_3, M_5$)?*
  - (A) $G_q$ coupling activating Phospholipase C (PLC) to yield $\text{IP}_3$ and DAG, mobilizing intracellular calcium [CORRECT]
  - (B) $G_i$ coupling inhibiting adenylyl cyclase and opening potassium channels
  - (C) $G_s$ coupling stimulating cyclic AMP (cAMP) synthesis
  - (D) Direct influx of sodium through a pentameric ligand-gated channel
  - *Misconception Targeted*: Conflating odd-numbered ($G_q$) vs even-numbered ($G_i$) muscarinic GPCR signaling.
- **Item 2**: *Why is glycopyrrolate preferred over atropine to prevent intraoperative bradycardia without causing central anticholinergic delirium?*
  - (A) Glycopyrrolate has a quaternary ammonium cation that cannot penetrate the lipophilic blood-brain barrier [CORRECT]
  - (B) Glycopyrrolate is a selective $\beta_1$ adrenergic agonist
  - (C) Atropine is completely destroyed by plasma cholinesterases
  - (D) Glycopyrrolate acts exclusively on nicotinic neuromuscular junctions
  - *Misconception Targeted*: Assuming all antimuscarinics cross into the brain equally.
- **Item 3**: *What vascular response occurs when a patient receiving a non-selective $\alpha$-blocker (e.g. phentolamine) is administered IV epinephrine?*
  - (A) "Epinephrine reversal": blood pressure drops due to unopposed $\beta_2$-mediated vasodilation [CORRECT]
  - (B) Massive hypertensive crisis due to $\beta_1$ overactivation
  - (C) Sudden cessation of heart rate
  - (D) Immediate pulmonary vasoconstriction
  - *Misconception Targeted*: Forgetting that epinephrine activates both $\alpha$ (vasoconstriction) and $\beta_2$ (vasodilation); blocking $\alpha$ reveals underlying vasodepression.
- **Item 4**: *Which adrenoreceptor subtype is targeted by mirabegron to relax the detrusor muscle in overactive bladder?*
  - (A) $\beta_3$ adrenergic receptor ($G_s$-coupled) [CORRECT]
  - (B) $\alpha_1$ adrenergic receptor
  - (C) $\beta_1$ adrenergic receptor
  - (D) $M_2$ muscarinic receptor
  - *Misconception Targeted*: Confusing classical antimuscarinic therapy with modern $\beta_3$-agonist detrusor relaxation.

---

#### Lesson Details (`pharm-mod-4`):

##### Lesson 1: Cholinergic Neurotransmission: Muscarinic ($M_1-M_5$) vs Nicotinic ($N_M, N_N$) Pathways (`pharm-mod4-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Map cholinergic synthesis, vesicular release, acetylcholinesterase termination, and contrast metabotropic muscarinic GPCRs with ionotropic nicotinic channels.
- **Steps**: 10 steps (Step 1: The vagal brake hook, Step 2-4: ACh life cycle (ChAT synthesis, VAChT vesicular packaging, botulinum/latrotoxin targets), Step 5: Checkpoint, Step 6-8: Muscarinic GPCRs ($M_1/M_3/M_5$ via $G_q$ vs $M_2/M_4$ via $G_i$) vs Nicotinic ($N_N$ ganglion, $N_M$ neuromuscular), Step 9: Faded pathway problem, Step 10: Recap).
- **Interactions**: Cholinergic synapse interactive circuit, muscarinic vs nicotinic target organ highlighter, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Predict the cardiac pacemaker effect of activating muscarinic $M_2$ receptors in the SA node. (Decreased cAMP and activation of $I_{K,\text{ACh}}$ potassium efflux, causing bradycardia).
- **Recap**: Acetylcholine acts through ionotropic nicotinic channels ($\text{Na}^+/\text{K}^+$ flux, millisecond response) and metabotropic muscarinic GPCRs ($G_q$ contraction/secretion, $G_i$ cardiac slowing).
- **Spaced Review Items**:
  1. *Prompt*: Name the rate-limiting step in acetylcholine biosynthesis. *Answer*: Sodium-dependent high-affinity uptake of choline into the presynaptic terminal (inhibited by hemicholinium).
  2. *Prompt*: What enzyme terminates acetylcholine action in the synaptic cleft? *Answer*: Acetylcholinesterase (AChE), turnover rate ~25,000 molecules/second.
  3. *Prompt*: Which muscarinic receptor subtype mediates bronchial smooth muscle bronchoconstriction and glandular secretions? *Answer*: $M_3$ receptor ($G_q$-coupled).
- **Misconceptions**:
  - *Misconception 1*: "Nicotinic receptors are GPCRs." *Correction*: Nicotinic receptors are pentameric ligand-gated ion channels that directly conduct cations ($\text{Na}^+, \text{K}^+$).
- **Exam Alignment**: EUS (Kolinerjik İleti ve Reseptörler); NAPLEX (Autonomic Nervous System); SPLE (Cholinergic Pharmacology).

##### Lesson 2: Cholinomimetics & Acetylcholinesterase Inhibitors: Myasthenia Gravis & Reversal Agents (`pharm-mod4-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Differentiate direct muscarinic agonists (bethanechol, pilocarpine) from reversible carbamate AChE inhibitors (pyridostigmine, donepezil) and apply them to myasthenia gravis, glaucoma, and reversal of neuromuscular blockade.
- **Steps**: 11 steps (Step 1: The drooping eyelids mystery hook, Step 2-4: Direct cholinomimetics (bethanechol for urinary retention, pilocarpine for open-angle glaucoma), Step 5: Carbamate AChE inhibitors (neostigmine, pyridostigmine, donepezil), Step 6: Checkpoint, Step 7-9: Edrophonium Tensilon test (myasthenic vs cholinergic crisis) and sugammadex vs neostigmine reversal, Step 10: Faded clinical case, Step 11: Recap).
- **Interactions**: Synaptic ACh concentration slider, neuromuscular transmission fatigue meter, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Contrast neostigmine vs physostigmine in terms of CNS penetration. (Physostigmine is a tertiary amine crossing the BBB; neostigmine is a quaternary amine restricted to the periphery).
- **Recap**: Direct agonists stimulate receptors directly; AChE inhibitors prevent endogenous ACh breakdown. Quaternary carbamates treat peripheral myasthenia; tertiary carbamates cross into the CNS (Alzheimer's, anticholinergic antidote).
- **Spaced Review Items**:
  1. *Prompt*: Why is physostigmine the antidote of choice for severe central anticholinergic toxicity (e.g. atropine overdose)? *Answer*: Being a tertiary amine, it crosses the blood-brain barrier to reverse central delirium.
  2. *Prompt*: Differentiate a myasthenic crisis from a cholinergic crisis during myasthenia gravis treatment. *Answer*: Myasthenic crisis is caused by insufficient ACh (improves with edrophonium); cholinergic crisis is caused by AChE inhibitor overdose and depolarizing flaccid paralysis (worsens with edrophonium).
  3. *Prompt*: Why is bethanechol selective for smooth muscle contraction with minimal cardiac slowing? *Answer*: Preferential selectivity for muscarinic over nicotinic receptors, with carbamoyl group resisting cholinesterase hydrolysis.
- **Misconceptions**:
  - *Misconception 1*: "Neostigmine only works in the autonomic nervous system." *Correction*: Neostigmine acts at the somatic neuromuscular junction ($N_M$), boosting muscle strength.
- **Exam Alignment**: EUS (AChE İnhibitörleri ve Miyasteniya Gravis); NAPLEX (Myasthenia Gravis & Glaucoma Drugs); SPLE (Autonomic Therapeutics).

##### Lesson 3: Muscarinic Antagonists: Atropine, Glycopyrrolate & Overactive Bladder Selectivity (`pharm-mod4-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Contrast the systemic pharmacodynamics, organ-selectivity, and toxicity profiles of tertiary (atropine, scopolamine, oxybutynin) vs quaternary (glycopyrrolate, ipratropium) antimuscarinics.
- **Steps**: 12 steps (Step 1: Belladonna deadly nightshade dilation hook, Step 2-4: Competitive $M_1-M_5$ blockade: tachycardia, mydriasis/cycloplegia, bronchodilation, dry mouth, urinary retention, Step 5: Quaternary bronchodilators in COPD (ipratropium, tiotropium), Step 6: Checkpoint, Step 7-9: Uroselective antagonists for overactive bladder (darifenacin, solifenacin) vs oxybutynin cognitive impairment, Step 10-11: Anticholinergic toxidrome mnemonics, Step 12: Recap).
- **Interactions**: Anticholinergic symptom body mapper, quaternary vs tertiary BBB partition toggle, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Explain why inhaled tiotropium provides long-acting bronchodilation in COPD with negligible systemic side effects. (Quaternary ammonium poorly absorbed into blood; dissociates very slowly from $M_3$ but rapidly from $M_2$).
- **Recap**: Antimuscarinics competitively block parasympathetic tone; tertiary amines cause CNS sedation/delirium; quaternary agents remain localized. Uroselective $M_3$ agents reduce bladder spasms with fewer cognitive risks.
- **Spaced Review Items**:
  1. *Prompt*: Recite the classic anticholinergic toxidrome mnemonic. *Answer*: "Blind as a bat, mad as a hatter, red as a beet, hot as a hare, dry as a bone, bowel and bladder lose their tone, and the heart runs alone."
  2. *Prompt*: Why is atropine contraindicated in patients with acute closed-angle glaucoma? *Answer*: Mydriasis folds the iris into the iridocorneal angle, obstructing trabecular meshwork drainage of aqueous humor and spiking intraocular pressure.
  3. *Prompt*: Which receptor is selectively targeted by solifenacin and darifenacin in the bladder? *Answer*: $M_3$ muscarinic receptor.
- **Misconceptions**:
  - *Misconception 1*: "Atropine causes pupil constriction." *Correction*: Atropine blocks parasympathetic sphincter pupillae contraction, causing pupillary dilation (mydriasis) and paralysis of accommodation (cycloplegia).
- **Exam Alignment**: EUS (Antimuskarinik İlaçlar ve Zehirlenme); NAPLEX (Anticholinergic Toxicity & COPD Inhalers); SPLE (Autonomic Pharmacology).

##### Lesson 4: Adrenergic Signaling: $\alpha_1, \alpha_2, \beta_1, \beta_2, \beta_3$ Second-Messenger Cascades (`pharm-mod4-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Match adrenergic receptor subtypes ($\alpha_1, \alpha_2, \beta_1, \beta_2, \beta_3$) to their physiological tissue locations, $G$-protein signaling cascades ($G_q, G_i, G_s$), and secondary messenger outcomes.
- **Steps**: 12 steps (Step 1: Fight-or-flight sympathetic mobilization hook, Step 2-4: $\alpha_1$ ($G_q \to \text{PLC} \to \text{IP}_3/\text{Ca}^{2+}$: vasoconstriction, mydriasis), Step 5: $\alpha_2$ ($G_i \to \downarrow\text{cAMP}$: presynaptic autoreceptor inhibition, clonidine), Step 6: Checkpoint, Step 7-9: $\beta_1$ ($G_s \to \uparrow\text{cAMP} \to \text{PKA}$: positive inotropy/chronotropy, renin release) vs $\beta_2$ ($G_s \to \uparrow\text{cAMP} \to \text{MLCK inhibition}$: bronchodilation, vasodilation), Step 10-11: $\beta_3$ detrusor relaxation and lipolysis, Step 12: Recap).
- **Interactions**: Adrenoreceptor signaling cascade diagram with interactive G-protein switch, tissue response selector, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Contrast the biochemical consequence of stimulating $\beta_1$ in cardiac myocytes vs $\beta_2$ in vascular smooth muscle. ($\beta_1$ increases intracellular calcium via PKA to boost contraction; $\beta_2$ inactivates MLCK via PKA to cause relaxation/vasodilation).
- **Recap**: $\alpha_1$ ($G_q$) constricts vessels; $\alpha_2$ ($G_i$) inhibits neurotransmitter release; $\beta_1$ ($G_s$) accelerates heart rate and contractility; $\beta_2$ ($G_s$) dilates bronchi and skeletal muscle beds; $\beta_3$ relaxes bladder.
- **Spaced Review Items**:
  1. *Prompt*: What is the primary physiological function of presynaptic $\alpha_2$ autoreceptors? *Answer*: Negative feedback inhibition of norepinephrine release from sympathetic nerve terminals.
  2. *Prompt*: Which G-protein and second messenger system couples to $\beta_2$ adrenergic receptors? *Answer*: $G_s$ protein activating adenylyl cyclase to increase cyclic AMP (cAMP).
  3. *Prompt*: How does $\beta_1$ receptor stimulation in the renal juxtaglomerular apparatus affect blood pressure? *Answer*: Triggers renin release, activating the RAAS cascade to increase blood pressure.
- **Misconceptions**:
  - *Misconception 1*: "Because both $\beta_1$ and $\beta_2$ increase cAMP, they always produce identical tissue responses." *Correction*: In cardiac muscle, cAMP/PKA enhances calcium influx (contraction); in smooth muscle, cAMP/PKA inhibits myosin light chain kinase (relaxation).
- **Exam Alignment**: EUS (Adrenerjik Reseptörler ve İkinci Haberciler); NAPLEX (Sympathetic Signaling); SPLE (Autonomic Receptors).

##### Lesson 5: Sympathomimetics & Adrenergic Blockers: From Anaphylaxis Epinephrine to Beta-Blockade (`pharm-mod4-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Select clinical sympathomimetic agonists (epinephrine, norepinephrine, phenylephrine, albuterol) and adrenergic antagonists (prazosin, metoprolol, carvedilol) based on hemodynamic receptor selectivity.
- **Steps**: 13 steps (Step 1: Anaphylactic shock resuscitation hook, Step 2-4: Direct catecholamines: Epinephrine ($\alpha_1, \alpha_2, \beta_1, \beta_2$) vs Norepinephrine ($\alpha_1, \alpha_2, \beta_1$) vs Phenylephrine ($\alpha_1$), Step 5: Selective $\beta_2$ agonists (albuterol, salmeterol) in asthma, Step 6: Checkpoint, Step 7-9: $\alpha$-blockers: Prazosin/Tamsulosin ($\alpha_{1A}$ uroselective) in BPH and orthostatic hypotension, Step 10-12: $\beta$-blockers: Non-selective (propranolol), $\beta_1$-cardioselective (metoprolol, atenolol), vasodilating (carvedilol, nebivolol), Step 13: Recap).
- **Interactions**: Hemodynamic shock hemodynamics simulator (BP, HR, SVR, CO gauges), $\beta$-blocker selectivity matrix, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Explain why epinephrine is the absolute first-line drug of choice for anaphylactic shock. ($\alpha_1$ reverses mucosal edema/hypotension, $\beta_1$ restores cardiac output, $\beta_2$ triggers bronchodilation and inhibits mast cell degranulation).
- **Recap**: Epinephrine is the ultimate broad-spectrum catecholamine; selective $\beta_1$-blockers protect ischemic hearts without triggering bronchospasm; vasodilating $\beta$-blockers combine $\alpha_1$-blockade or NO release.
- **Spaced Review Items**:
  1. *Prompt*: Why does norepinephrine produce reflex bradycardia despite stimulating cardiac $\beta_1$ receptors? *Answer*: Intense $\alpha_1$ peripheral vasoconstriction spikes MAP, triggering the carotid sinus baroreceptor reflex which overrides direct cardiac acceleration.
  2. *Prompt*: What advantage does tamsulosin offer over doxazosin in treating benign prostatic hyperplasia (BPH)? *Answer*: Selectively blocks the $\alpha_{1A}$ subtype in the prostate stroma, relieving urinary outflow obstruction without causing severe systemic orthostatic hypotension.
  3. *Prompt*: Which beta-blockers possess intrinsic vasodilating properties? *Answer*: Carvedilol and labetalol (via combined $\alpha_1$-blockade); Nebivolol (via endothelial nitric oxide release).
- **Misconceptions**:
  - *Misconception 1*: "Cardioselective $\beta_1$-blockers can be given safely at high doses to severe asthmatics." *Correction*: $\beta_1$-selectivity is dose-dependent; at higher doses, cardioselectivity is lost, precipitating fatal bronchospasm.
- **Exam Alignment**: EUS (Sempatomimetikler ve Beta-Blokörler); NAPLEX (Shock Management & Beta-Blockers); SPLE (Autonomic Therapeutics).

### Module 5: Cardiovascular & Renal Therapeutics (`pharm-mod-5`)
*Reference Standard: Katzung Ch. 11-15 / Goodman & Gilman Ch. 25-29.*

#### Diagnostic Pre-Test (`pharm-mod5-diag`)
- **Item 1**: *Why do ACE inhibitors cause persistent dry cough and potentially fatal angioedema while Angiotensin Receptor Blockers (ARBs) do not?*
  - (A) Angiotensin Converting Enzyme (kininase II) normally degrades bradykinin; ACE inhibition causes bradykinin accumulation in lung and airways [CORRECT]
  - (B) ACE inhibitors covalently crosslink pulmonary histamine receptors
  - (C) ARBs stimulate surfactant production
  - (D) ACE inhibitors suppress renal potassium excretion
  - *Misconception Targeted*: Attributing the dry cough to angiotensin suppression rather than kininase II inhibition and bradykinin accumulation.
- **Item 2**: *Why is verapamil contraindicated in patients with severe systolic heart failure with reduced ejection fraction (HFrEF)?*
  - (A) Potent negative inotropic action directly depresses cardiac myocyte contractility [CORRECT]
  - (B) Triggers massive reflex tachycardia
  - (C) Stimulates aldosterone secretion
  - (D) Blocks renal filtration of loop diuretics
  - *Misconception Targeted*: Treating all calcium channel blockers as safe vasodilators in heart failure.
- **Item 3**: *Which nephron segment and luminal transporter is inhibited by furosemide to produce powerful natriuresis?*
  - (A) Thick ascending limb of Henle's loop; $\text{Na}^+/\text{K}^+/2\text{Cl}^-$ co-transporter (NKCC2) [CORRECT]
  - (B) Distal convoluted tubule; $\text{Na}^+/\text{Cl}^-$ cotransporter (NCCT)
  - (C) Proximal convoluted tubule; Carbonic anhydrase
  - (D) Cortical collecting duct; Epithelial sodium channel (ENaC)
  - *Misconception Targeted*: Confusing loop diuretic sites with distal thiazide sites.
- **Item 4**: *Which Class III antiarrhythmic agent prolongs cardiac action potential duration and carries a significant risk of pulmonary fibrosis, thyroid dysfunction, and corneal microdeposits?*
  - (A) Amiodarone [CORRECT: contains iodine and causes multi-organ tissue accumulation]
  - (B) Lidocaine
  - (C) Flecainide
  - (D) Diltiazem
  - *Misconception Targeted*: Overlooking amiodarone's unique organ toxicity profile and structural iodination.

---

#### Lesson Details (`pharm-mod-5`):

##### Lesson 1: The RAAS Axis: ACE Inhibitors, ARBs & Bradykinin-Mediated Angioedema (`pharm-mod5-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Intervene in the Renin-Angiotensin-Aldosterone System using ACE inhibitors, ARBs, and ARNIs, managing hemodynamic benefits and kininase-mediated adverse reactions.
- **Steps**: 10 steps (Step 1: The renal perfusion pressure sensor hook, Step 2-4: The enzymatic cascade: Renin $\to$ Ang I $\to$ Ang II via ACE, Step 5: Checkpoint, Step 6-8: Efferent arteriolar dilation and glomerular filtration pressure, Step 9: Bradykinin accumulation (cough, angioedema) and ARNI (sacubitril/valsartan) neprilysin inhibition, Step 10: Recap).
- **Interactions**: RAAS pathway interactive blockade switch, glomerulus hemodynamics simulator (afferent vs efferent tone), predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Contrast the hemodynamic effect of ACE inhibitors on the efferent arteriole with NSAID effects on the afferent arteriole. (ACE inhibitors dilate efferent arteriole; NSAIDs constrict afferent arteriole; together they cause acute renal failure).
- **Recap**: ACE inhibitors block Ang II production and prevent bradykinin degradation; ARBs selectively block $\text{AT}_1$ receptors without bradykinin buildup; ARNIs combine neprilysin inhibition with $\text{AT}_1$ blockade for heart failure.
- **Spaced Review Items**:
  1. *Prompt*: What dual enzymatic role does ACE (Angiotensin Converting Enzyme) perform? *Answer*: Cleaves decapeptide Angiotensin I to octapeptide Angiotensin II, and degrades vasodilator bradykinin to inactive peptides (as kininase II).
  2. *Prompt*: Why are ACE inhibitors and ARBs strictly contraindicated in bilateral renal artery stenosis? *Answer*: Renal perfusion relies on Ang II-mediated efferent arteriolar vasoconstriction to maintain GFR; blocking this drops GFR, causing acute renal shutdown.
  3. *Prompt*: Why are ACE inhibitors and ARBs teratogenic during pregnancy? *Answer*: Cause fetal renal dysgenesis, oligohydramnios, pulmonary hypoplasia, and skull ossification defects.
- **Misconceptions**:
  - *Misconception 1*: "Switching from lisinopril to losartan will worsen the patient's dry cough." *Correction*: ARBs do not inhibit kininase II, do not cause bradykinin accumulation, and do not induce the characteristic dry cough.
- **Exam Alignment**: EUS (RAAS İnhibitörleri ve Kininaz II); NAPLEX (Hypertension & ACEi/ARB Safety); SPLE (Cardiovascular Therapeutics).

##### Lesson 2: Calcium Channel Blockers: Vascular Dihydropyridines vs Nodal Verapamil/Diltiazem (`pharm-mod5-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Contrast the vascular vs cardiac selectivity of dihydropyridine (amlodipine, nifedipine) vs non-dihydropyridine (verapamil, diltiazem) L-type calcium channel blockers.
- **Steps**: 11 steps (Step 1: The excitation-contraction coupling hook, Step 2-4: L-type $\text{Ca}^{2+}$ channel voltage gating in vascular smooth muscle vs cardiac myocytes/nodes, Step 5: Checkpoint, Step 6-8: Dihydropyridines: peripheral vasodilation, reflex tachycardia, ankle edema, Step 9-10: Non-dihydropyridines: negative chronotropy/dromotropy in atrial fibrillation, constipation (verapamil), Step 11: Recap).
- **Interactions**: L-type calcium channel gate animator, cardiac vs vascular tissue selectivity meter, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Match verapamil vs amlodipine to their primary clinical indication: rate control in atrial fibrillation vs isolated systolic hypertension. (Verapamil controls AV nodal rate in AF; amlodipine lowers systemic vascular resistance).
- **Recap**: Dihydropyridines selectively bind inactivated channels in vascular smooth muscle, reducing afterload; non-dihydropyridines bind open channels in SA/AV nodal tissue, slowing conduction and depressing contractility.
- **Spaced Review Items**:
  1. *Prompt*: Why do dihydropyridine CCBs (e.g. nifedipine) cause peripheral ankle edema? *Answer*: Selective precapillary arteriolar dilation without postcapillary venular dilation, increasing capillary hydrostatic pressure and extravasating fluid.
  2. *Prompt*: Why is the combination of verapamil and a beta-blocker hazardous? *Answer*: Additive negative inotropic and dromotropic effects that can trigger complete AV nodal block or asystole.
  3. *Prompt*: Which CCB is famously associated with drug-induced gingival hyperplasia and severe constipation? *Answer*: Verapamil.
- **Misconceptions**:
  - *Misconception 1*: "All calcium channel blockers slow the heart rate." *Correction*: Dihydropyridines cause vasodilation that often triggers reflex sympathetic tachycardia; only non-DHPs directly slow heart rate.
- **Exam Alignment**: EUS (Kalsiyum Kanal Blokörleri); NAPLEX (Hypertension & Angina Guidelines); SPLE (Cardiovascular Pharmacology).

##### Lesson 3: Diuretic Pharmacology: Carbonic Anhydrase, NKCC2 Loop, Thiazide & ENaC Blockade (`pharm-mod5-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Map diuretic classes across nephron segments, predicting electrolyte disturbances (hypo/hyperkalemia, hyperuricemia, calcium shifts) and compensatory neurohormonal activation.
- **Steps**: 12 steps (Step 1: The congestive fluid overload hook, Step 2-4: Proximal tubule (Acetazolamide, carbonic anhydrase) and Thick Ascending Limb (Furosemide, NKCC2 cotransporter), Step 5: Checkpoint, Step 6-8: Distal Convoluted Tubule (Hydrochlorothiazide, NCCT cotransporter) and Cortical Collecting Duct (Spironolactone MRA, Amiloride ENaC), Step 9-11: Electrolyte profiling: $\text{K}^+$ wasting vs $\text{K}^+$ sparing, Step 12: Recap).
- **Interactions**: Longitudinal nephron segment electrolyte flux simulator, diuretic class matcher, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Contrast the effect of loop diuretics vs thiazides on urinary calcium excretion. (Loop diuretics waste calcium in urine ["Loops Lose Calcium"]; thiazides decrease urinary calcium and increase serum calcium).
- **Recap**: Loop diuretics produce maximal natriuresis at NKCC2 with hypokalemic metabolic alkalosis; thiazides block NCCT, conserving calcium; aldosterone antagonists and ENaC blockers spare potassium in the collecting duct.
- **Spaced Review Items**:
  1. *Prompt*: What is the molecular target and nephron site of action of furosemide? *Answer*: NKCC2 ($\text{Na}^+/\text{K}^+/2\text{Cl}^-$) cotransporter in the thick ascending limb of the loop of Henle.
  2. *Prompt*: Why do thiazides cause hyperuricemia and precipitate gout? *Answer*: Compete with uric acid for proximal tubular OAT secretion and increase volume-contraction reabsorption.
  3. *Prompt*: What life-threatening electrolyte imbalance is caused by combining spironolactone, lisinopril, and potassium supplements? *Answer*: Severe hyperkalemia ($\text{K}^+ > 5.5\,\text{mEq/L}$), risking cardiac arrest.
- **Misconceptions**:
  - *Misconception 1*: "Thiazide diuretics are effective in patients with severe renal failure ($GFR < 30\,\text{mL/min}$)." *Correction*: Thiazides lose efficacy when GFR falls below $30\,\text{mL/min}$; loop diuretics (or metolazone) are required.
- **Exam Alignment**: EUS (Diüretikler ve Elektrolit Bozuklukları); NAPLEX (Diuretic Therapy & Electrolyte Management); SPLE (Renal Therapeutics).

##### Lesson 4: Antiarrhythmic Electrophysiology: The Vaughan Williams Classification (Classes I–IV) (`pharm-mod5-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Categorize antiarrhythmics using the Vaughan Williams system (Classes I–IV) by their electrophysiological impacts on Phase 0 depolarization, action potential duration, and refractory periods.
- **Steps**: 12 steps (Step 1: The chaotic electrical storm hook, Step 2-5: Cardiac action potential phases (0 to 4) in Purkinje vs nodal tissue, Step 6: Checkpoint, Step 7-9: Class I $\text{Na}^+$ channel blockers (IA quinidine/procainamide, IB lidocaine, IC flecainide), Step 10-11: Class II $\beta$-blockers, Class III $\text{K}^+$ channel blockers (amiodarone, sotalol; Torsades de Pointes risk), Class IV CCBs, Step 12: Recap).
- **Interactions**: Cardiac action potential waveform morpher, Vaughan Williams classification matrix, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Order Classes IA, IB, and IC by their dissociation kinetics and sodium channel block intensity. (Intensity: IC > IA > IB; dissociation: IB rapid, IA intermediate, IC very slow ["use-dependence"]).
- **Recap**: Class I blocks $\text{Na}^+$ channels (Phase 0); Class II blocks sympathetic drive; Class III blocks $\text{K}^+$ channels, prolonging Phase 3 repolarization and QT interval; Class IV blocks L-type $\text{Ca}^{2+}$ in AV node.
- **Spaced Review Items**:
  1. *Prompt*: Why is lidocaine (Class IB) highly selective for ischemic ventricular tissue over normal atrial tissue? *Answer*: Binds preferentially to open and inactivated $\text{Na}^+$ channels in depolarized, ischemic myocytes with very rapid unbinding during diastole.
  2. *Prompt*: What dangerous ventricular arrhythmia is triggered by drug-induced QT prolongation from Class IA or Class III antiarrhythmics? *Answer*: Torsades de Pointes (polymorphic ventricular tachycardia).
  3. *Prompt*: Why is flecainide (Class IC) contraindicated in patients with prior myocardial infarction or structural heart disease? *Answer*: Cardiac Arrhythmia Suppression Trial (CAST) demonstrated increased proarrhythmic mortality in structural ischemic disease.
- **Misconceptions**:
  - *Misconception 1*: "Amiodarone has a very short half-life." *Correction*: Amiodarone has an extraordinarily long elimination half-life of 40–60 days due to extensive adipose tissue sequestration.
- **Exam Alignment**: EUS (Antiaritmik İlaçlar ve Vaughan Williams); NAPLEX (Antiarrhythmic Drugs & Torsades Prevention); SPLE (Cardiovascular Therapeutics).

##### Lesson 5: Heart Failure Pharmacotherapy: GDMT (ARNI, Beta-Blockers, MRA, SGLT2i) & Digoxin (`pharm-mod5-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Implement Guideline-Directed Medical Therapy (GDMT) with the 4 mortality-reducing medication pillars in HFrEF and manage digitalis toxicity.
- **Steps**: 13 steps (Step 1: The failing myocardium neurohormonal spiral hook, Step 2-5: The 4 Pillars of GDMT: ARNI/ACEi, Evidence-based Beta-blockers (carvedilol, metoprolol succinate, bisoprolol), MRA (spironolactone), SGLT2 inhibitors (dapagliflozin), Step 6: Checkpoint, Step 7-9: Symptom relief via loop diuretics vs mortality benefits, Step 10-12: Digoxin $\text{Na}^+/\text{K}^+$-ATPase inhibition, positive inotropy, narrow TI, and hypokalemia toxicity trigger, Step 13: Recap).
- **Interactions**: Neurohormonal remodeling feedback loop visualizer, 4-pillar GDMT titrator, digoxin toxicity simulator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Identify which 3 beta-blockers have proven mortality reduction in clinical trials for HFrEF. (Carvedilol, Metoprolol succinate, and Bisoprolol).
- **Recap**: GDMT requires early initiation of the 4 pillars (ARNI, $\beta$-blocker, MRA, SGLT2i) to reverse ventricular remodeling; digoxin improves symptoms and reduces hospitalizations but does not reduce overall mortality.
- **Spaced Review Items**:
  1. *Prompt*: What is the molecular mechanism of digoxin in cardiac myocytes? *Answer*: Inhibits sarcolemmal $\text{Na}^+/\text{K}^+$-ATPase, increasing intracellular $\text{Na}^+$, which reverses the $\text{Na}^+/\text{Ca}^{2+}$ exchanger, accumulating intracellular $\text{Ca}^{2+}$ for stronger contraction.
  2. *Prompt*: Why does hypokalemia severely exacerbate digoxin toxicity? *Answer*: $\text{K}^+$ and digoxin compete for the same binding site on $\text{Na}^+/\text{K}^+$-ATPase; low $\text{K}^+$ allows greater digoxin binding and toxicity.
  3. *Prompt*: How do SGLT2 inhibitors benefit heart failure patients even without diabetes? *Answer*: Induce osmotic diuresis, reduce cardiac preload/afterload, improve myocardial energetics, and suppress renal sympathetic tone.
- **Misconceptions**:
  - *Misconception 1*: "Digoxin reduces mortality in heart failure." *Correction*: DIG trial proved digoxin reduces hospital admissions and improves symptoms, but has zero effect on overall survival.
- **Exam Alignment**: EUS (Kalp Yetersizliği Tedavisi ve Digoksin); NAPLEX (Heart Failure GDMT Guidelines); SPLE (Cardiovascular Therapeutics).

### Module 6: Central Nervous System Pharmacology (`pharm-mod-6`)
*Reference Standard: Katzung Ch. 21-30 / Goodman & Gilman Ch. 14-24.*

#### Diagnostic Pre-Test (`pharm-mod6-diag`)
- **Item 1**: *What electrophysiological difference explains why barbiturates cause fatal respiratory depression in overdose while benzodiazepines alone rarely do?*
  - (A) Benzodiazepines increase chloride channel opening *frequency* without direct gating; barbiturates increase opening *duration* and directly gate open chloride channels at high doses [CORRECT]
  - (B) Benzodiazepines block NMDA receptors directly
  - (C) Barbiturates stimulate presynaptic dopamine release
  - (D) Benzodiazepines are completely metabolized by gastric acid
  - *Misconception Targeted*: Confusing the ceiling safety mechanism of allosteric frequency modulation (BZD) with the non-ceiling risk of direct gating duration modulation (barbiturate).
- **Item 2**: *Why is a 2-week washout period mandatory when switching an antidepressant patient from phenelzine (an MAOI) to fluoxetine (an SSRI)?*
  - (A) To allow resynthesis of irreversibly inhibited monoamine oxidase enzymes and prevent fatal Serotonin Syndrome [CORRECT]
  - (B) To allow liver enzymes to downregulate insulin receptors
  - (C) Because fluoxetine binds MAO enzymes competitively
  - (D) To prevent acute hypertensive encephalopathy from tyramine
  - *Misconception Targeted*: Underestimating the lifespan of irreversibly inactivated MAO enzymes (~14 days).
- **Item 3**: *Which second-generation (atypical) antipsychotic carries a 1-2% risk of life-threatening agranulocytosis, necessitating mandatory absolute neutrophil count (ANC) blood monitoring?*
  - (A) Clozapine [CORRECT: requires strict REMS monitoring registry]
  - (B) Haloperidol
  - (C) Risperidone
  - (D) Aripiprazole
  - *Misconception Targeted*: Assuming all atypical antipsychotics share identical hematological safety profiles.
- **Item 4**: *Which two physiological responses to chronic opioid therapy develop virtually ZERO pharmacological tolerance?*
  - (A) Miosis (pupillary constriction) and Constipation [CORRECT]
  - (B) Analgesia and Euphoria
  - (C) Sedation and Nausea
  - (D) Respiratory depression and Itching
  - *Misconception Targeted*: Believing all physiological effects of opioids develop tolerance at identical rates.

---

#### Lesson Details (`pharm-mod-6`):

##### Lesson 1: $\text{GABA}_A$ Receptor Allosteric Modulation: Benzodiazepines, Barbiturates & Flumazenil (`pharm-mod6-les1`)
- **Access**: Free (Permanent Freemium)
- **Order**: 1
- **Objective**: Contrast the biophysical mechanisms, overdose ceilings, and clinical reversal of benzodiazepines (frequency modulation) vs barbiturates (duration modulation and direct gating) on $\text{GABA}_A$ receptors.
- **Steps**: 10 steps (Step 1: The sedative safety ceiling hook, Step 2-4: Pentameric $\text{GABA}_A$ receptor pore ($\alpha_1\beta_2\gamma_2$ stoichiometry) and chloride influx hyperpolarization, Step 5: Checkpoint, Step 6-8: Benzodiazepines (increase frequency) vs Barbiturates (increase duration + direct opening), Step 9: Flumazenil competitive reversal and withdrawal seizure risks, Step 10: Recap).
- **Interactions**: $\text{GABA}_A$ channel patch-clamp electrophysiology simulator (channel open probability vs duration), BZD/barbiturate binding site inspector, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Predict the chloride current when diazepam is added to an in vitro patch clamp in the absolute absence of GABA. (Zero current; benzodiazepines have zero intrinsic gating efficacy and require endogenous GABA).
- **Recap**: $\text{GABA}_A$ is an ionotropic $\text{Cl}^-$ channel; benzodiazepines increase opening frequency (safe ceiling unless combined with ethanol/opioids); barbiturates prolong open duration and directly open pores (fatal respiratory depression); flumazenil reverses BZDs competitively.
- **Spaced Review Items**:
  1. *Prompt*: Mnemonic difference: How do benzodiazepines vs barbiturates alter $\text{GABA}_A$ channel kinetics? *Answer*: "Frenzodiazepines" increase *frequency* of channel opening; "Barbi-durates" increase *duration* of channel opening.
  2. *Prompt*: Which competitive antagonist reverses benzodiazepine overdose? *Answer*: Flumazenil (caution: can precipitate acute withdrawal seizures in chronic users).
  3. *Prompt*: Which $\text{GABA}_A$ receptor $\alpha$-subunit mediates hypnotic sedation vs anxiolysis? *Answer*: $\alpha_1$ mediates sedation and amnesia (zolpidem target); $\alpha_2$ and $\alpha_3$ mediate anxiolysis.
- **Misconceptions**:
  - *Misconception 1*: "Flumazenil can reverse barbiturate or alcohol toxicity." *Correction*: Flumazenil binds specifically to the benzodiazepine site; it has zero efficacy against barbiturates, ethanol, or general anesthetics.
- **Exam Alignment**: EUS (GABA Reseptörleri ve Sedatifler); NAPLEX (Benzodiazepine Overdose & Reversal); SPLE (CNS Pharmacology).

##### Lesson 2: Monoaminergic Transporter Blockade: SSRIs, SNRIs, TCAs & MAOI Diet Traps (`pharm-mod6-les2`)
- **Access**: Free (Permanent Freemium)
- **Order**: 2
- **Objective**: Differentiate reuptake transporter selectivity (SERT vs NET), off-target receptor blockade (TCAs), and irreversible MAO enzyme inhibition to prevent Serotonin Syndrome and the "cheese reaction".
- **Steps**: 11 steps (Step 1: The 4-week delayed clinical response puzzle hook, Step 2-4: SERT and NET transporter blockade: SSRIs (escitalopram) vs SNRIs (venlafaxine), Step 5: Checkpoint, Step 6-8: Tricyclic Antidepressants (TCAs): Amitriptyline off-target 3-ring anticholinergic, antihistaminic, and $\alpha_1$-blockade (cardiac $\text{Na}^+$ channel toxicity), Step 9-10: MAO-A/B inhibition and dietary tyramine hypertensive crisis ("cheese reaction"), Step 11: Recap).
- **Interactions**: Synaptic monoamine reuptake transporter slider, TCA receptor affinity radar auditor, Serotonin Syndrome vs NMS differentiator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Explain why TCA overdoses cause lethal widening of the QRS complex and what antidote is administered. (Blockade of myocardial fast $\text{Na}^+$ channels; treated immediately with IV Sodium Bicarbonate).
- **Recap**: SSRIs/SNRIs selectively block SERT/NET; TCAs block monoamine reuptake but carry dangerous anticholinergic, anti-$\alpha_1$, and cardiac sodium channel blocking liabilities; MAOIs require dietary tyramine restriction to prevent hypertensive crisis.
- **Spaced Review Items**:
  1. *Prompt*: What is the clinical triad of Serotonin Syndrome? *Answer*: Neuromuscular hyperactivity (clonus, hyperreflexia), autonomic instability (hyperthermia, diaphoresis, tachycardia), and altered mental status (agitation).
  2. *Prompt*: Why must patients on phenelzine or tranylcypromine avoid aged cheeses, tap beers, and cured meats? *Answer*: These foods contain tyramine, an indirect sympathomimetic normally degraded by intestinal/hepatic MAO-A; MAO inhibition allows tyramine to reach systemic circulation, releasing massive norepinephrine and precipitating hypertensive crisis.
  3. *Prompt*: What antidote reverses cardiac conduction delay (wide QRS) in TCA overdose? *Answer*: Intravenous Sodium Bicarbonate ($\text{NaHCO}_3$).
- **Misconceptions**:
  - *Misconception 1*: "Antidepressants relieve depression immediately upon elevating synaptic serotonin." *Correction*: Clinical mood improvement requires 2–4 weeks of sustained elevated signaling to downregulate 5-$\text{HT}_{1A}$ autoreceptors and induce neurotrophic factors (BDNF).
- **Exam Alignment**: EUS (Antidepresanlar ve Serotonin Sendromu); NAPLEX (Antidepressant Toxicity & Interactions); SPLE (Psychopharmacology).

##### Lesson 3: Antipsychotic Pharmacology: Mesolimbic $D_2$ Blockade, $5\text{-HT}_{2A}$ Atypicals & EPS (`pharm-mod6-les3`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 3
- **Objective**: Balance antipsychotic efficacy against extrapyramidal symptoms (EPS), hyperprolactinemia, and metabolic syndrome by evaluating $D_2$ vs $5\text{-HT}_{2A}$ receptor occupancy.
- **Steps**: 12 steps (Step 1: The dopamine dopamine hypothesis hook, Step 2-4: 4 Dopamine pathways: Mesolimbic (positive symptoms), Mesocortical (negative symptoms), Nigrostriatal (EPS), Tuberoinfundibular (prolactin), Step 5: First-generation typicals (haloperidol, chlorpromazine): high $D_2$ affinity and acute dystonia/tardive dyskinesia, Step 6: Checkpoint, Step 7-9: Second-generation atypicals (olanzapine, risperidone, clozapine): $5\text{-HT}_{2A}$ antagonism buffering dopamine in striatum, Step 10-11: Clozapine agranulocytosis and metabolic monitoring, Step 12: Recap).
- **Interactions**: 4-pathway brain projection mapper, $D_2$ vs $5\text{-HT}_{2A}$ receptor binding ratio titrator, EPS risk calculator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 6 — Contrast haloperidol vs olanzapine regarding their relative risks of extrapyramidal symptoms (EPS) vs severe metabolic weight gain/diabetes. (Haloperidol has high EPS risk with low metabolic risk; olanzapine has low EPS risk with severe metabolic/weight gain risk).
- **Recap**: Typical antipsychotics block mesolimbic $D_2$ but cause motor EPS (nigrostriatal) and galactorrhea (tuberoinfundibular); atypical agents combine $5\text{-HT}_{2A}$ antagonism to disinhibit striatal dopamine, reducing EPS but introducing metabolic liabilities.
- **Spaced Review Items**:
  1. *Prompt*: Which dopamine tract mediates extrapyramidal symptoms (EPS) and tardive dyskinesia during typical antipsychotic therapy? *Answer*: The nigrostriatal pathway.
  2. *Prompt*: How does $5\text{-HT}_{2A}$ antagonism in atypical antipsychotics protect against EPS? *Answer*: Serotonin normally inhibits dopamine release in the striatum; blocking $5\text{-HT}_{2A}$ disinhibits dopamine release, competing with $D_2$ blockade in the motor striatum.
  3. *Prompt*: What mandatory monitoring is required for clozapine prescriptions? *Answer*: Frequent complete blood count (CBC) with absolute neutrophil count (ANC) due to the risk of severe agranulocytosis.
- **Misconceptions**:
  - *Misconception 1*: "Tardive dyskinesia can be treated by increasing the dose of haloperidol." *Correction*: Increasing the dose temporarily masks symptoms by deepening receptor block, but accelerates underlying $D_2$ receptor supersensitivity and worsens long-term dyskinesia.
- **Exam Alignment**: EUS (Antipsikotik İlaçlar ve Ekstrapiramidal Sistem); NAPLEX (Antipsychotics & Clozapine REMS); SPLE (Psychopharmacology).

##### Lesson 4: Opioid Analgesia & $\mu$-Receptor Dynamics: Tolerance, Constipation & Naloxone Reversal (`pharm-mod6-les4`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 4
- **Objective**: Trace $\mu$-opioid receptor intracellular cascades, distinguish differential tolerance development across organ systems, and execute emergency overdose reversal with naloxone.
- **Steps**: 12 steps (Step 1: The poppy resin double-edged sword hook, Step 2-4: $\mu$-Opioid receptor signaling: $G_i$-coupling, presynaptic voltage-gated $\text{Ca}^{2+}$ closure, postsynaptic $\text{K}^+$ channel opening (hyperpolarization), Step 5: Checkpoint, Step 6-8: Central analgesia, respiratory depression, euphoria vs peripheral constipation (enteric nervous system), Step 9-10: Receptor internalisation and $\beta$-arrestin tolerance vs zero-tolerance responses (miosis, constipation), Step 11: Naloxone pharmacokinetics and renarcotization, Step 12: Recap).
- **Interactions**: Nociceptive dorsal horn synaptic transmission animator, opioid tolerance rate comparative slider, naloxone titration simulator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Explain why a patient with fatal opioid overdose continues to present pinpoint pupils (miosis) despite profound tolerance to analgesic effects. (Tolerance develops rapidly to analgesia and euphoria, but zero tolerance develops to pupillary constriction and constipation).
- **Recap**: $\mu$-Opioid receptors inhibit neurotransmission via $G_i$ ($K^+$ efflux and $Ca^{2+}$ closure); analgesia and respiratory depression develop pronounced tolerance; miosis and constipation develop zero tolerance; naloxone competitively reverses toxicity with short $t_{1/2}$.
- **Spaced Review Items**:
  1. *Prompt*: What cellular mechanisms mediate pain suppression upon $\mu$-opioid receptor activation in the spinal dorsal horn? *Answer*: Presynaptic inhibition of voltage-gated calcium channels (blocking substance P/glutamate release) and postsynaptic opening of inward-rectifying potassium channels (GIRK, hyperpolarizing the projection neuron).
  2. *Prompt*: Why must patients revived with naloxone be monitored for several hours in the emergency department? *Answer*: Naloxone has a short half-life (~30–90 minutes); once cleared, longer-acting opioids (e.g. methadone, sustained-release oxycodone, fentanyl) can re-bind receptors, causing fatal renarcotization.
  3. *Prompt*: Which opioid receptor subtype is primarily responsible for dysphoria and psychotomimetic hallucinations? *Answer*: Kappa ($\kappa$) opioid receptor.
- **Misconceptions**:
  - *Misconception 1*: "Constipation resolves as the patient becomes accustomed to long-term opioid therapy." *Correction*: Gastrointestinal tolerance does not develop; patients on chronic opioids require proactive bowel regimens throughout therapy.
- **Exam Alignment**: EUS (Opioid Analjezikler ve Reseptör Dinamiği); NAPLEX (Opioid Overdose & Naloxone Protocol); SPLE (Analgesic Therapeutics).

##### Lesson 5: Antiepileptic Therapeutics: Sodium Channel Inactivation, Calcium T-Channels & SV2A (`pharm-mod6-les5`)
- **Access**: Paid (Premium / 7-Day Trial)
- **Order**: 5
- **Objective**: Target cellular seizure foci using voltage-gated sodium channel inactivation (phenytoin, carbamazepine), thalamic T-type calcium channel blockade (ethosuximide), and presynaptic vesicle release modulation (levetiracetam SV2A).
- **Steps**: 13 steps (Step 1: The paroxysmal hypersynchronous cortical discharge hook, Step 2-4: Voltage-gated $\text{Na}^+$ channel fast inactivation cycle and use-dependence (phenytoin, carbamazepine, lamotrigine), Step 5: Checkpoint, Step 6-8: Absence seizure 3-Hz spike-and-wave rhythm: Thalamic T-type $\text{Ca}^{2+}$ channel blockade by ethosuximide, Step 9-10: Broad-spectrum agents (valproic acid: multiple mechanisms + teratogenicity), Step 11: Levetiracetam and synaptic vesicle protein 2A (SV2A), Step 12: Phenytoin non-linear zero-order saturation kinetics, Step 13: Recap).
- **Interactions**: Sodium channel state cycle animator (resting $\leftrightarrow$ open $\leftrightarrow$ inactivated), thalamic 3-Hz pacemaker simulator, phenytoin Michaelis-Menten non-linear plasma concentration curve calculator, predict-reveal.
- **Mid-Lesson Checkpoint**: Step 5 — Contrast the clinical consequence of increasing phenytoin dosage when hepatic metabolism transitions from first-order to zero-order Michaelis-Menten kinetics. (Enzyme saturation causes a disproportionately massive, unpredictable spike in plasma concentration and severe toxicity).
- **Recap**: Use-dependent $\text{Na}^+$ blockers stabilize inactivated channels during high-frequency firing; ethosuximide selectively blocks thalamic T-type $\text{Ca}^{2+}$ channels in absence seizures; levetiracetam modulates SV2A release; phenytoin exhibits dangerous zero-order kinetics.
- **Spaced Review Items**:
  1. *Prompt*: What is the drug of first choice for childhood absence seizures, and what is its specific molecular target? *Answer*: Ethosuximide, targeting low-voltage T-type calcium channels in thalamic relay neurons.
  2. *Prompt*: Why does phenytoin require frequent therapeutic drug monitoring (TDM)? *Answer*: Follows non-linear Michaelis-Menten (saturable) kinetics; once metabolizing enzymes saturate within the therapeutic range ($10–20\,\mu\text{g/mL}$), small dose increases produce massive concentration spikes.
  3. *Prompt*: Why is valproate strictly contraindicated in pregnancy unless all alternatives fail? *Answer*: Severe teratogenicity, causing neural tube defects (spina bifida, 1-2% risk) and reduced childhood cognitive IQ.
- **Misconceptions**:
  - *Misconception 1*: "Ethosuximide is effective for generalized tonic-clonic seizures." *Correction*: Ethosuximide is strictly effective for absence seizures only; it has zero efficacy against tonic-clonic or focal seizures.
- **Exam Alignment**: EUS (Antiepileptik İlaçlar ve Etki Mekanizmaları); NAPLEX (Anticonvulsants & Therapeutic Drug Monitoring); SPLE (Neurology Therapeutics).

---

## 3. Widget-to-Lesson Mapping Matrix (Pharmacology)

| Widget Component | Target Lessons | Interactive Mechanics & User Action | Fallback & A11y Behavior |
| :--- | :--- | :--- | :--- |
| `ReceptorSuperfamilyExplorer` | `pharm-mod1-les1` | Interactive 4-quadrant interactive canvas allowing selection of Ion Channel, GPCR, RTK, and Nuclear Receptors with signal cascade animations. | Hierarchical tabbed list with expandable aria-details. |
| `BindingEnergyLadder` | `pharm-mod1-les2` | Drag-and-drop hierarchy sorter ordering Covalent, Ionic, H-Bond, Dipole, and Van der Waals forces with live kcal/mol gauges. | Keyboard-accessible reorderable list with live region announcements. |
| `CovalentInhibitorSimulator` | `pharm-mod1-les3` | Kinetic simulation of organophosphate AChE phosphorylation and aging clock, testing 2-PAM reactivation window. | Step-by-step interactive timeline with time input controls. |
| `DibucainePharmacophoreMap` | `pharm-mod1-les4` | Interactive 5-point pharmacophore inspector testing affinity changes upon deleting individual binding interactions. | Multi-column comparative table with toggleable checkboxes. |
| `MetalChelatorMatch` | `pharm-mod1-les5` | Coordination complex simulator matching heavy metals ($\text{Pb}, \text{As}, \text{Cu}, \text{Fe}$) with specific chelating antidotes. | Radio-button matrix with clinical rationale disclosures. |
| `DoseResponseSimulator` | `pharm-mod2-les1..5`| Dynamic log-dose vs response curve simulator demonstrating parallel right-shifts, partial agonist ceilings, and non-competitive depression. | Tabular numeric output with accessible screen reader data descriptions. |
| `PKOneCompartmentModel` | `pharm-mod3-les1..5`| One- and two-compartment pharmacokinetic concentration-time slider adjusting $V_d$, clearance, and infusion rate ($k_0$). | Table of calculated steady-state concentrations with manual inputs. |
| `AutonomicPathwaysCanvas` | `pharm-mod4-les1..5`| Dual-panel sympathetic vs parasympathetic diagram highlighting target organs, receptor types, and agonist/antagonist responses. | Semantic SVG with keyboard-navigable interactive pins. |
| `NephronTransportSimulator`| `pharm-mod5-les3` | Longitudinal nephron diagram mapping luminal transporters (NHE3, NKCC2, NCCT, ENaC) with diuretic class inhibitors. | Step-by-step nephron segment tabbed viewer. |
| `GABAAChannelVisualizer` | `pharm-mod6-les1` | Pentameric $\text{GABA}_A$ receptor channel pore simulation showing chloride influx changes upon GABA, benzodiazepine, or barbiturate binding. | Accessible state machine diagram with discrete text readouts. |

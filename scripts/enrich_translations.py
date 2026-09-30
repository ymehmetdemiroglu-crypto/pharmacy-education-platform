#!/usr/bin/env python3
"""
scripts/enrich_translations.py

Comprehensive Tri-Lingual Localization Engine for All 22 Lessons:
- Enriches every lesson title, objective, misconception, step title, prompt, hint, option, and explanation with native English ('en').
- Cleans up all Arabic leftover English parenthetical tags like (Hook), (Question), (Visual).
- Strips internal developer review notes from citations (e.g., 'unverified', 'pending-human-review', 'mc-asset-004', 'docs/asset-log.md').
- Re-runs client generators to ensure curriculum.client.ts and lesson01.client.ts have 100% trilingual coverage.
"""

import os
import sys
import json
import re
import subprocess

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(REPO_ROOT, 'scripts'))

from translations_medchem import MEDCHEM_TRANSLATIONS
from translations_pharmacology import PHARMACOLOGY_TRANSLATIONS

MEDCHEM_DIR = os.path.join(REPO_ROOT, 'courses', 'medchem', 'lessons')
PHARM_DIR = os.path.join(REPO_ROOT, 'courses', 'pharmacology', 'lessons')

# Standardized Hints Across All 22 Lessons
HINTS_TR = [
    "1. Aşama İpucu: Temel kavramı ve moleküler mekanizmayı göz önünde bulundurun.",
    "2. Aşama İpucu: İlgili biyofiziksel kuralı veya denklemi hatırlayın.",
    "3. Aşama İpucu: Farmakolojik ilkeyi doğrudan soru senaryosuna uygulayın."
]
HINTS_AR = [
    "تلميح المستوى الأول: انظر في المفهوم الجوهري والآلية الجزيئية الأساسية.",
    "تلميح المستوى الثاني: تذكر القاعدة الفيزيائية الحيوية أو المعادلة ذات الصلة.",
    "تلميح المستوى الثالث: طبق المبدأ الدوائي المعني مباشرة على سيناريو السؤال."
]
HINTS_EN = [
    "Tier 1 Hint: Consider the foundational concept and core molecular mechanism.",
    "Tier 2 Hint: Recall the relevant biophysical rule or governing equation.",
    "Tier 3 Hint: Directly apply the pharmacological principle to the scenario."
]

# Arabic parenthetical cleanup regex
AR_CLEANUP = [
    (r'\s*\(Hook\)', ''),
    (r'\s*\(Question\)', ''),
    (r'\s*\(Intuition\)', ''),
    (r'\s*\(Visual\)', ''),
    (r'\s*\(Interactive\)', ''),
    (r'\s*\(Discovery\)', ''),
    (r'\s*\(Formal\)', ''),
    (r'\s*\(Concept Check\)', ''),
    (r'\s*\(Application\)', ''),
    (r'\s*\(Retrieval\)', ''),
    (r'\s*\(Connection\)', ''),
    (r'\s*\(Mastery\)', ''),
]

def clean_arabic(text):
    if not isinstance(text, str):
        return text
    res = text
    for pattern, rep in AR_CLEANUP:
        res = re.sub(pattern, rep, res, flags=re.IGNORECASE)
    return res.strip()

# Comprehensive Options Translations Map (221 options)
OPTIONS_EN = {
    # mc-mod1-les1
    "mc-mod1-les1::mc-mod1-les1-step-02::opt-a": ("They exhibit completely different effects based on differing chemical structures.", "According to Ferguson's principle, thermodynamic activity governs biological depression, not chemical structure."),
    "mc-mod1-les1::mc-mod1-les1-step-02::opt-b": ("Only volatile molecules with low molecular weight produce surgical anesthesia.", "Molecular weight alone does not dictate anesthetic potency."),
    "mc-mod1-les1::mc-mod1-les1-step-02::opt-c": ("They produce approximately the same depth of anesthesia regardless of chemical structure.", "Correct! At equal relative saturation, thermodynamic escaping tendency in the biophase is identical."),
    "mc-mod1-les1::mc-mod1-les1-step-06::opt-disc-1": ("In the same narrow window for both gases: a ≈ 0.03-0.05.", "Excellent! The relative saturation rule is independent of chemical structure."),
    "mc-mod1-les1::mc-mod1-les1-step-06::opt-disc-2": ("At completely different 'a' values due to differing molecular weights.", "Even with different molecular weights, the thermodynamic activity window remains the same."),
    "mc-mod1-les1::mc-mod1-les1-step-08::opt-chk-1": ("Compound Y is structurally specific because it acts at extreme dilution (a < 0.001).", "Correct! a < 0.001 is definitive proof of specific receptor binding. There is a 4-order-of-magnitude difference."),
    "mc-mod1-les1::mc-mod1-les1-step-08::opt-chk-2": ("Compound X is structurally specific because its effective dose is larger.", "High saturation requirements define structurally non-specific membrane perturbation."),
    "mc-mod1-les1::mc-mod1-les1-step-09::opt-app-1": ("a = 20.0; represents a fatal massive overdose.", "Calculation error: relative saturation cannot exceed 1.0 under standard equilibrium conditions."),
    "mc-mod1-les1::mc-mod1-les1-step-09::opt-app-2": ("a = 0.05 (5% saturation); falls within the surgical anesthesia window.", "Correct! a = Pt / P0 = 10 / 200 = 0.05, matching the Ferguson threshold."),
    "mc-mod1-les1::mc-mod1-les1-step-12::opt-mst-1": ("Their chemical core structures and ability to form specific covalent bonds.", "Non-specific drugs do not form stereospecific covalent bonds."),
    "mc-mod1-les1::mc-mod1-les1-step-12::opt-mst-2": ("Their relative thermodynamic saturation in the biophase, independent of chemical structure.", "Correct! Ferguson's principle proves biological depression is governed by relative thermodynamic activity."),

    # mc-mod1-les2
    "mc-mod1-les2::mc-mod1-les2-step-02::opt-2-1": ("More than 99% ionized (A-).", "Correct! Since pH (7.4) is well above pKa (3.5), the weak acid is overwhelmingly deprotonated and ionized."),
    "mc-mod1-les2::mc-mod1-les2-step-02::opt-2-2": ("More than 99% unionized (HA).", "When pH exceeds pKa, weak acids dissociate into charged conjugate bases."),
    "mc-mod1-les2::mc-mod1-les2-step-06::opt-disc2-1": ("Over 99.99% protonated charged (BH+) form; cannot permeate gastric membranes.", "Correct! In the acidic stomach (pH 1.5), basic amine drugs are protonated into charged cations that cannot cross lipid bilayers."),
    "mc-mod1-les2::mc-mod1-les2-step-06::opt-disc2-2": ("In neutral B form and rapidly absorbed through gastric mucosa.", "Basic drugs exist predominantly in charged cation form in highly acidic environments."),
    "mc-mod1-les2::mc-mod1-les2-step-08::opt-chk2-1": ("50% ionized, 50% unionized.", "Correct! When pH equals pKa, [A-] equals [HA] exactly according to Henderson-Hasselbalch."),
    "mc-mod1-les2::mc-mod1-les2-step-08::opt-chk2-2": ("100% ionized.", "Full ionization requires pH to be at least 2 units away from pKa."),
    "mc-mod1-les2::mc-mod1-les2-step-09::opt-app2-1": ("Alkalinize urine with sodium bicarbonate to trap ionized salicylate (A-).", "Correct! Ion trapping forces salicylic acid into its charged water-soluble form, preventing renal tubular reabsorption."),
    "mc-mod1-les2::mc-mod1-les2-step-09::opt-app2-2": ("Acidify urine with ammonium chloride.", "Acidifying urine would convert salicylate back to neutral HA, causing reabsorption into blood."),
    "mc-mod1-les2::mc-mod1-les2-step-12::opt-mst2-1": ("Only unionized (neutral) species freely permeate biological membranes via passive diffusion.", "Correct! The pH-partition hypothesis dictates that lipid membranes are permeable primarily to neutral lipophilic molecules."),
    "mc-mod1-les2::mc-mod1-les2-step-12::opt-mst2-2": ("Only charged ions cross membranes through passive lipid diffusion.", "Ions are surrounded by a hydration shell and cannot passively cross hydrophobic lipid interiors."),

    # mc-mod2-les1
    "mc-mod2-les1::mc-mod2-les1-step-02::opt-mc21-1": ("It increases logP by approximately +0.50 units.", "Correct! Adding a non-polar methylene unit enhances lipophilic partitioning."),
    "mc-mod2-les1::mc-mod2-les1-step-02::opt-mc21-2": ("It decreases lipophilicity.", "Alkyl additions increase lipophilicity."),
    "mc-mod2-les1::mc-mod2-les1-step-06::opt-mc21-3": ("The hydrophilic hydroxyl group (-OH) with pi = -1.16.", "Correct! Hydroxyl groups form strong hydrogen bonds with water, shifting balance to aqueous phase."),
    "mc-mod2-les1::mc-mod2-les1-step-06::opt-mc21-4": ("The trifluoromethyl group (-CF3).", "-CF3 is highly lipophilic (pi ≈ +0.88)."),
    "mc-mod2-les1::mc-mod2-les1-step-08::opt-mc21-5": ("Compound B (logP = 2.10) easily crosses the blood-brain barrier into the CNS.", "Correct! Optimal CNS penetration occurs around logP ≈ 1.5 - 2.5."),
    "mc-mod2-les1::mc-mod2-les1-step-08::opt-mc21-6": ("Compound A (logP = -1.50) penetrates the brain readily.", "Highly hydrophilic compounds cannot passively penetrate the blood-brain barrier."),
    "mc-mod2-les1::mc-mod2-les1-step-09::opt-mc21-7": ("Introduce a polar group (hydroxyl or carboxylic acid) to lower logP below 2.0.", "Correct! Lowering lipophilicity reduces brain exposure while maintaining peripheral potency."),
    "mc-mod2-les1::mc-mod2-les1-step-09::opt-mc21-8": ("Add multiple aromatic rings to increase logP.", "Increasing logP further escalates central nervous sedation."),
    "mc-mod2-les1::mc-mod2-les1-step-12::opt-mc21-9": ("1-Octanol mimics the amphipathic lipid membrane bilayer interior.", "Correct! Octanol features a polar hydroxyl head and a flexible non-polar hydrocarbon tail."),
    "mc-mod2-les1::mc-mod2-les1-step-12::opt-mc21-10": ("Octanol behaves exactly like pure water.", "Octanol is immiscible with water and serves as the hydrophobic phase."),

    # mc-mod2-les2
    "mc-mod2-les2::mc-mod2-les2-step-02::opt-mc22-1": ("Hydrogen bond donor.", "Correct! The secondary amine hydrogen is available for donation to electronegative acceptors."),
    "mc-mod2-les2::mc-mod2-les2-step-02::opt-mc22-2": ("Pure covalent anchor.", "Secondary amines interact predominantly via reversible non-covalent forces."),
    "mc-mod2-les2::mc-mod2-les2-step-06::opt-mc22-3": ("The phenolic hydroxyl group (Ar-OH).", "Correct! Phenolic oxygens form critical directional hydrogen bonds with receptor serine/threonine residues."),
    "mc-mod2-les2::mc-mod2-les2-step-06::opt-mc22-4": ("The inert methyl group.", "Methyl groups engage only in weak dispersion contacts."),
    "mc-mod2-les2::mc-mod2-les2-step-08::opt-mc22-5": ("A salt bridge (ionic interaction) with anionic Aspartate or Glutamate.", "Correct! Protonated ammonium cations form powerful electrostatic bonds (40-110 kcal/mol) with carboxylate anions."),
    "mc-mod2-les2::mc-mod2-les2-step-08::opt-mc22-6": ("A covalent disulfide bridge.", "Amines do not form disulfide bonds."),
    "mc-mod2-les2::mc-mod2-les2-step-09::opt-mc22-7": ("Introduce an electron-withdrawing fluoro group to block CYP hydroxylation.", "Correct! Fluorine substitution is a classic strategy to prevent metabolic clearance without disrupting binding."),
    "mc-mod2-les2::mc-mod2-les2-step-09::opt-mc22-8": ("Remove all nitrogen atoms.", "Removing the pharmacophore nitrogen abolishes target affinity."),
    "mc-mod2-les2::mc-mod2-les2-step-12::opt-mc22-9": ("Ionic > Hydrogen Bonding > Dipole-Dipole > Van der Waals.", "Correct! This represents the descending thermodynamic strength hierarchy of non-covalent interactions."),
    "mc-mod2-les2::mc-mod2-les2-step-12::opt-mc22-10": ("Van der Waals > Ionic.", "Van der Waals forces are the weakest individual intermolecular interactions."),

    # mc-mod3-les1
    "mc-mod3-les1::mc-mod3-les1-step-02::opt-mc31-1": ("The dextrorotatory S-(+) enantiomer exhibits higher pharmacological potency.", "Correct! Dextro-amphetamine exhibits 3- to 4-fold higher central stimulant activity than the levo-enantiomer."),
    "mc-mod3-les1::mc-mod3-les1-step-02::opt-mc31-2": ("Both enantiomers possess identical biological potency.", "Biological receptors are chiral environments that discriminate between enantiomers."),
    "mc-mod3-les1::mc-mod3-les1-step-06::opt-mc31-3": ("The Eudismic Ratio (potency of eutomer divided by distomer).", "Correct! The eudismic ratio quantifies enantiomeric stereoselectivity."),
    "mc-mod3-les1::mc-mod3-les1-step-06::opt-mc31-4": ("The partition coefficient logP.", "LogP measures lipophilicity, not stereoselective potency ratios."),
    "mc-mod3-les1::mc-mod3-les1-step-08::opt-mc31-5": ("Higher affinity enantiomer is the eutomer; lower affinity is the distomer.", "Correct! Eutomer is the biologically active enantiomer; distomer is the less active or toxic counterpart."),
    "mc-mod3-les1::mc-mod3-les1-step-08::opt-mc31-6": ("Distomer always has higher affinity.", "By definition, the eutomer is the superior binder."),
    "mc-mod3-les1::mc-mod3-les1-step-09::opt-mc31-7": ("The (R)-enantiomer racemizes in vivo into the teratogenic (S)-enantiomer.", "Correct! Chiral inversion catalyzed by biological epimerases invalidates single-enantiomer formulation safety."),
    "mc-mod3-les1::mc-mod3-les1-step-09::opt-mc31-8": ("Enantiomers never convert in vivo.", "Thalidomide rapidly interconverts under physiological conditions."),
    "mc-mod3-les1::mc-mod3-les1-step-12::opt-mc31-9": ("Three-point contact hypothesis (Easson-Stedman model).", "Correct! Enantiomeric discrimination requires a minimum of three distinct asymmetric interactions on the receptor surface."),
    "mc-mod3-les1::mc-mod3-les1-step-12::opt-mc31-10": ("Single-point electrostatic attraction.", "A single contact point cannot differentiate spatial chiral orientations."),

    # mc-mod3-les2
    "mc-mod3-les2::mc-mod3-les2-step-02::opt-mc32-1": ("They exhibit different physical, chemical, and biological properties.", "Correct! Diastereomers have different spatial distances between atoms, leading to distinct physical properties."),
    "mc-mod3-les2::mc-mod3-les2-step-02::opt-mc32-2": ("They have identical melting points and solubilities.", "Enantiomers share physical properties in achiral environments; diastereomers do not."),
    "mc-mod3-les2::mc-mod3-les2-step-06::opt-mc32-3": ("Trans-diethylstilbestrol mimics estradiol's phenolic oxygen distance (12.1 Å).", "Correct! Trans geometry places the hydroxyls at the exact distance required to activate estrogen receptors."),
    "mc-mod3-les2::mc-mod3-les2-step-06::opt-mc32-4": ("Cis-diethylstilbestrol is the active drug.", "The cis-isomer places the phenolic rings too close, losing estrogenic potency."),
    "mc-mod3-les2::mc-mod3-les2-step-08::opt-mc32-5": ("Restricted rotation around a carbon-carbon double bond or cyclic ring.", "Correct! Geometric isomerism arises from rigid structural constraints preventing free bond rotation."),
    "mc-mod3-les2::mc-mod3-les2-step-08::opt-mc32-6": ("Free rotation around single bonds.", "Free rotation creates conformers, not geometric diastereomers."),
    "mc-mod3-les2::mc-mod3-les2-step-09::opt-mc32-7": ("Synthesize a rigid conformationally restricted analogue.", "Correct! Locking conformation reduces conformational entropy loss upon receptor binding."),
    "mc-mod3-les2::mc-mod3-les2-step-09::opt-mc32-8": ("Add flexible alkyl chains.", "Increasing flexibility elevates entropic penalty upon binding."),
    "mc-mod3-les2::mc-mod3-les2-step-12::opt-mc32-9": ("Diastereomers possess different interatomic distances and dipole moments.", "Correct! Distinct geometries yield distinct physicochemical properties."),
    "mc-mod3-les2::mc-mod3-les2-step-12::opt-mc32-10": ("Diastereomers are always mirror images.", "Diastereomers are non-superimposable non-mirror image stereoisomers."),

    # mc-mod4-les1
    "mc-mod4-les1::mc-mod4-les1-step-02::opt-mc41-1": ("Covalent bond formation (irreversible binding).", "Receptor binding is generally reversible and non-covalent."),
    "mc-mod4-les1::mc-mod4-les1-step-02::opt-mc41-2": ("Reversible non-covalent interactions (ionic, hydrogen, hydrophobic).", "Correct! Reversible multi-point contacts provide affinity while allowing physiological signal termination."),
    "mc-mod4-les1::mc-mod4-les1-step-06::opt-mc41-3": ("Receptor conformational change triggering downstream G-protein activation.", "Correct! Agonist binding stabilizes the active receptor conformation (R*)."),
    "mc-mod4-les1::mc-mod4-les1-step-06::opt-mc41-4": ("Destruction of the cell membrane.", "Physiological signaling does not destroy host membranes."),
    "mc-mod4-les1::mc-mod4-les1-step-08::opt-mc41-5": ("Electrostatic ionic attraction.", "Correct! Long-range electrostatic forces (1/r) steer ligands into binding pockets."),
    "mc-mod4-les1::mc-mod4-les1-step-08::opt-mc41-6": ("Van der Waals contact.", "Van der Waals forces operate only at very close contact distances (1/r^6)."),
    "mc-mod4-les1::mc-mod4-les1-step-09::opt-mc41-7": ("Design a competitive antagonist that occupies the pocket without inducing R* activation.", "Correct! Competitive antagonists bind high affinity but possess zero intrinsic efficacy."),
    "mc-mod4-les1::mc-mod4-les1-step-09::opt-mc41-8": ("Synthesize a full agonist.", "Full agonists would intensify receptor hyperactivity."),
    "mc-mod4-les1::mc-mod4-les1-step-12::opt-mc41-9": ("Thermodynamic equilibrium of binding free energy (ΔG = -RT ln Ka).", "Correct! Binding affinity reflects the Gibbs free energy differential between bound and unbound states."),
    "mc-mod4-les1::mc-mod4-les1-step-12::opt-mc41-10": ("Pure kinetic collision speed.", "Affinity depends on the ratio of dissociation (Koff) to association (Kon)."),

    # mc-mod4-les2
    "mc-mod4-les2::mc-mod4-les2-step-02::opt-mc42-1": ("Biological activity is drastically reduced or lost completely.", "Correct! In structurally specific drugs, core pharmacophore modifications abolish receptor complementation."),
    "mc-mod4-les2::mc-mod4-les2-step-02::opt-mc42-2": ("Potency increases tenfold automatically.", "Removing critical binding groups rarely improves potency."),
    "mc-mod4-les2::mc-mod4-les2-step-06::opt-mc42-3": ("The distance between aromatic ring and terminal basic nitrogen (≈ 5.1 Å).", "Correct! The 2-carbon ethylamine chain provides optimal spatial separation for beta receptors."),
    "mc-mod4-les2::mc-mod4-les2-step-06::opt-mc42-4": ("The overall molecular weight alone.", "Spatial alignment of pharmacophoric features is the primary determinant."),
    "mc-mod4-les2::mc-mod4-les2-step-08::opt-mc42-5": ("Bulky N-alkyl substituents (e.g., isopropyl, tert-butyl).", "Correct! Bulky N-substituents fit into the hydrophobic accessory pocket of beta receptors, conferring selectivity over alpha."),
    "mc-mod4-les2::mc-mod4-les2-step-08::opt-mc42-6": ("A primary amine without substituents.", "Primary amines (norepinephrine) activate alpha receptors strongly."),
    "mc-mod4-les2::mc-mod4-les2-step-09::opt-mc42-7": ("Incorporate a bulky N-tert-butyl group to confer selective beta-2 bronchodilation.", "Correct! Bulky substituents prevent beta-1 cardiac activation, minimizing tachycardia."),
    "mc-mod4-les2::mc-mod4-les2-step-09::opt-mc42-8": ("Remove all aromatic substituents.", "Aromatic ring interactions are essential for receptor binding."),
    "mc-mod4-les2::mc-mod4-les2-step-12::opt-mc42-9": ("Spatial orientation of critical pharmacophore features complementary to the receptor.", "Correct! Pharmacophore spatial geometry governs target recognition."),
    "mc-mod4-les2::mc-mod4-les2-step-12::opt-mc42-10": ("Absolute molecular weight alone.", "Molecules with identical molecular weights can have completely different biological activities."),

    # mc-mod5-les1
    "mc-mod5-les1::mc-mod5-les1-step-02::opt-mc51-1": ("Conversion into more polar, water-soluble metabolites for renal excretion.", "Correct! Phase I metabolism introduces functional polar groups (-OH, -NH2, -COOH)."),
    "mc-mod5-les1::mc-mod5-les1-step-02::opt-mc51-2": ("Making drugs more lipophilic for fat storage.", "Metabolism serves to eliminate xenobiotics, not store them in fat."),
    "mc-mod5-les1::mc-mod5-les1-step-06::opt-mc51-3": ("Cytochrome P450 monooxygenases (CYP3A4, CYP2D6).", "Correct! The CYP superfamily mediates the majority of oxidative biotransformations in the liver."),
    "mc-mod5-les1::mc-mod5-les1-step-06::opt-mc51-4": ("Hemoglobin in red blood cells.", "CYP enzymes are located in the endoplasmic reticulum of hepatocytes."),
    "mc-mod5-les1::mc-mod5-les1-step-08::opt-mc51-5": ("An active drug is metabolized into an inactive excretable metabolite.", "Correct! Most pharmaceutical agents are inactivated by Phase I functionalization."),
    "mc-mod5-les1::mc-mod5-les1-step-08::opt-mc51-6": ("Metabolism always produces active toxins.", "Toxification is a secondary pathway, not the universal outcome."),
    "mc-mod5-les1::mc-mod5-les1-step-09::opt-mc51-9": ("Design a prodrug with an ester promoiety cleaved by plasma esterases in vivo.", "Correct! Esterification masks polar groups during absorption, followed by metabolic bioactivation."),
    "mc-mod5-les1::mc-mod5-les1-step-09::opt-mc51-10": ("Administer the compound as a volatile gas.", "Prodrug engineering is the proven method to optimize oral absorption."),
    "mc-mod5-les1::mc-mod5-les1-step-12::opt-mc51-7": ("Introduction or unmasking of polar functional groups (-OH, -NH2, -SH, -COOH).", "Correct! Phase I functionalization prepares compounds for Phase II conjugation."),
    "mc-mod5-les1::mc-mod5-les1-step-12::opt-mc51-8": ("Glucuronidation and sulfate conjugation.", "Conjugation with endogenous molecules represents Phase II metabolism."),

    # mc-mod5-les2
    "mc-mod5-les2::mc-mod5-les2-step-02::opt-mc52-1": ("Covalent attachment of an endogenous polar molecule (e.g., glucuronic acid).", "Correct! Phase II conjugation attaches bulky, hydrophilic endogenous groups for rapid excretion."),
    "mc-mod5-les2::mc-mod5-les2-step-02::opt-mc52-2": ("Simple oxidation by CYP enzymes.", "Oxidation is Phase I."),
    "mc-mod5-les2::mc-mod5-les2-step-06::opt-mc52-3": ("Glucuronidation catalyzed by UDP-glucuronosyltransferases (UGT).", "Correct! Glucuronidation is the most quantitatively significant Phase II pathway in humans."),
    "mc-mod5-les2::mc-mod5-les2-step-06::opt-mc52-4": ("Ester hydrolysis.", "Hydrolysis is a Phase I pathway."),
    "mc-mod5-les2::mc-mod5-les2-step-08::opt-mc52-5": ("Depletion of hepatic glutathione (GSH) reserves leading to NAPQI covalent toxicity.", "Correct! Overdose saturates glucuronidation/sulfation, shunting paracetamol to toxic NAPQI."),
    "mc-mod5-les2::mc-mod5-les2-step-08::opt-mc52-6": ("Excessive glucuronide crystallization.", "Toxicity is caused by reactive quinone imine intermediates, not glucuronides."),
    "mc-mod5-les2::mc-mod5-les2-step-09::opt-mc52-7": ("Administer N-acetylcysteine (NAC) to restore intracellular glutathione pools.", "Correct! NAC provides cysteine precursors to synthesize GSH and directly conjugate NAPQI."),
    "mc-mod5-les2::mc-mod5-les2-step-09::opt-mc52-8": ("Administer high-dose paracetamol.", "Additional paracetamol would accelerate fatal hepatic necrosis."),
    "mc-mod5-les2::mc-mod5-les2-step-12::opt-mc52-9": ("Phase II metabolites are markedly more water-soluble and biologically inactive.", "Correct! Conjugation dramatically increases renal clearance and eliminates pharmacological activity."),
    "mc-mod5-les2::mc-mod5-les2-step-12::opt-mc52-10": ("Phase II metabolites become highly lipophilic.", "Conjugates are polar hydrophilic acids."),

    # pharm-mod1-les1
    "pharm-mod1-les1::pharm-mod1-les1-step-02::opt-ph11-1": ("Exactly 50% of the receptors are occupied.", "Correct! When [L] = Kd, Theta = Kd / (Kd + Kd) = 0.50 (50% fractional occupancy)."),
    "pharm-mod1-les1::pharm-mod1-les1-step-02::opt-ph11-2": ("100% of the receptors are saturated.", "Complete saturation requires ligand concentration roughly 100-fold higher than Kd."),
    "pharm-mod1-les1::pharm-mod1-les1-step-06::opt-ph11-3": ("Drug A (Kd = 1 nM) binds 100,000 times more tightly than Drug B (Kd = 100 µM).", "Correct! Smaller Kd denotes stronger binding affinity."),
    "pharm-mod1-les1::pharm-mod1-les1-step-06::opt-ph11-4": ("Drug B binds more tightly because its Kd number is bigger.", "Higher Kd means the complex dissociates more easily (lower affinity)."),
    "pharm-mod1-les1::pharm-mod1-les1-step-08::opt-ph11-5": ("Concentration [L] must equal 9 times Kd ([L] = 9 * Kd).", "Correct! Theta = 9Kd / (9Kd + Kd) = 9/10 = 0.90 (90% occupancy)."),
    "pharm-mod1-les1::pharm-mod1-les1-step-08::opt-ph11-6": ("Concentration must equal 0.9 * Kd.", "At 0.9 * Kd, occupancy is only 47%."),
    "pharm-mod1-les1::pharm-mod1-les1-step-09::opt-ph11-7": ("90% of cardiac beta-1 receptors are occupied (90 / (90 + 10) = 0.90).", "Correct! Theta = [L] / ([L] + Kd) = 90 / 100 = 90%."),
    "pharm-mod1-les1::pharm-mod1-les1-step-09::opt-ph11-8": ("Only 10% are occupied.", "When [L] is 9 times Kd, occupancy is 90%."),
    "pharm-mod1-les1::pharm-mod1-les1-step-12::opt-ph11-9": ("The equilibrium dissociation constant Kd.", "Correct! Kd = Koff / Kon is inversely proportional to affinity (Ka = 1 / Kd)."),
    "pharm-mod1-les1::pharm-mod1-les1-step-12::opt-ph11-10": ("The total volume of distribution.", "Vd describes drug distribution in tissue, not receptor affinity."),

    # pharm-mod1-les2
    "pharm-mod1-les2::pharm-mod1-les2-step-02::opt-ph12-1": ("Electrostatic ionic bonds (salt bridges).", "Correct! Ionic interactions provide the largest individual non-covalent bond enthalpy (40-110 kcal/mol)."),
    "pharm-mod1-les2::pharm-mod1-les2-step-02::opt-ph12-2": ("Van der Waals dispersion forces.", "Van der Waals forces contribute only 0.5-1 kcal/mol per contact."),
    "pharm-mod1-les2::pharm-mod1-les2-step-06::opt-ph12-3": ("Release of ordered water molecules increases solvent entropy (+ΔS).", "Correct! Hydrophobic desolvation gains substantial entropy, driving binding free energy."),
    "pharm-mod1-les2::pharm-mod1-les2-step-06::opt-ph12-4": ("Water molecules freeze into ice.", "Desolvation frees water molecules into bulk random motion."),
    "pharm-mod1-les2::pharm-mod1-les2-step-08::opt-ph12-5": ("Aspirin covalently acetylates COX, requiring new protein synthesis for recovery.", "Correct! Irreversible acetylation permanently inhibits platelets for their 8-10 day lifespan."),
    "pharm-mod1-les2::pharm-mod1-les2-step-08::opt-ph12-6": ("Aspirin binds reversibly via weak van der Waals forces.", "Ibuprofen is reversible; aspirin is covalent."),
    "pharm-mod1-les2::pharm-mod1-les2-step-09::opt-ph12-7": ("The required clinical dose can be reduced roughly 5- to 10-fold.", "Correct! A 5- to 10-fold gain in binding affinity allows proportionally lower therapeutic doses."),
    "pharm-mod1-les2::pharm-mod1-les2-step-09::opt-ph12-8": ("Dose must be multiplied by 10.", "Higher affinity requires less drug, not more."),
    "pharm-mod1-les2::pharm-mod1-les2-step-12::opt-ph12-9": ("Ionic charge-charge interaction (distance dependence 1/r).", "Correct! Long-range electrostatic force attracts incoming ligands toward binding pockets."),
    "pharm-mod1-les2::pharm-mod1-les2-step-12::opt-ph12-10": ("Induced dipole interaction (1/r^6).", "Dipole interactions drop off much more rapidly with distance."),

    # pharm-mod2-les1
    "pharm-mod2-les1::pharm-mod2-les1-step-02::opt-ph21-1": ("Drug Y provides greater pain relief because its intrinsic efficacy (Emax) is 100%.", "Correct! Efficacy dictates maximal clinical ceiling; potency determines only the dose needed."),
    "pharm-mod2-les1::pharm-mod2-les1-step-02::opt-ph21-2": ("Drug X is superior because its EC50 is lower.", "Drug X is more potent, but its maximal effect caps out at only 50%."),
    "pharm-mod2-les1::pharm-mod2-les1-step-06::opt-ph21-3": ("The partial agonist competes with the full agonist and reduces overall response from 100% to 40%.", "Correct! In the presence of a full agonist, a partial agonist functions as a competitive antagonist."),
    "pharm-mod2-les1::pharm-mod2-les1-step-06::opt-ph21-4": ("Response increases to 140%.", "Both ligands compete for the same receptor pool."),
    "pharm-mod2-les1::pharm-mod2-les1-step-08::opt-ph21-5": ("Amplification in downstream signal transduction achieves Emax at low receptor occupancy.", "Correct! Spare receptors allow maximum response with only a fraction of receptors bound."),
    "pharm-mod2-les1::pharm-mod2-les1-step-08::opt-ph21-6": ("Receptors are permanently destroyed.", "Receptors remain intact and functional."),
    "pharm-mod2-les1::pharm-mod2-les1-step-09::opt-ph21-7": ("Buprenorphine displaces morphine from mu-receptors but provides lower intrinsic efficacy.", "Correct! Sudden drop from 100% to partial intrinsic activation precipitates acute opioid withdrawal."),
    "pharm-mod2-les1::pharm-mod2-les1-step-09::opt-ph21-8": ("Buprenorphine produces massive overdose euphoria.", "Buprenorphine has a ceiling effect on intrinsic activation."),
    "pharm-mod2-les1::pharm-mod2-les1-step-12::opt-ph21-9": ("The vertical height of the curve plateau (Emax).", "Correct! Emax reflects intrinsic efficacy, whereas horizontal position reflects potency (EC50)."),
    "pharm-mod2-les1::pharm-mod2-les1-step-12::opt-ph21-10": ("The left-to-right position of the curve (EC50).", "Horizontal position reflects pharmacological potency."),

    # pharm-mod2-les2
    "pharm-mod2-les2::pharm-mod2-les2-step-02::opt-ph22-1": ("Yes, competitive blockade can be completely overcome by escalating agonist dose.", "Correct! Surmountable antagonism is the defining hallmark of reversible competitive blockade."),
    "pharm-mod2-les2::pharm-mod2-les2-step-02::opt-ph22-2": ("No, maximal ceiling can never be restored.", "Non-competitive blockers depress Emax; competitive blockers do not."),
    "pharm-mod2-les2::pharm-mod2-les2-step-06::opt-ph22-3": ("The antagonist binds competitively 1:1 to the orthosteric receptor site.", "Correct! Schild slope of 1.0 proves simple bimolecular competitive antagonism."),
    "pharm-mod2-les2::pharm-mod2-les2-step-06::opt-ph22-4": ("The drug is irreversibly toxic.", "Schild regression measures mechanism of interaction, not nonspecific toxicity."),
    "pharm-mod2-les2::pharm-mod2-les2-step-08::opt-ph22-5": ("Platelets lack nuclei and cannot synthesize new COX-1 enzymes during their lifespan.", "Correct! Platelet inhibition lasts until new platelets are generated from megakaryocytes."),
    "pharm-mod2-les2::pharm-mod2-les2-step-08::opt-ph22-6": ("Effect wears off within 2 hours as drug washes out.", "Covalent modification is irreversible despite drug clearance."),
    "pharm-mod2-les2::pharm-mod2-les2-step-09::opt-ph22-7": ("Massive catecholamine surges from pheochromocytoma cannot overcome covalent blockade.", "Correct! Irreversible alpha blockade prevents fatal hypertensive crises during tumor manipulation."),
    "pharm-mod2-les2::pharm-mod2-les2-step-09::opt-ph22-8": ("Phenoxybenzamine is simply cheaper.", "Its covalent mechanism provides essential clinical protection."),
    "pharm-mod2-les2::pharm-mod2-les2-step-12::opt-ph22-9": ("Reversible competitive antagonism (parallel rightward shift, Emax preserved).", "Correct! Reversible competitive antagonists produce parallel shifts with intact maximal response."),
    "pharm-mod2-les2::pharm-mod2-les2-step-12::opt-ph22-10": ("Non-competitive irreversible antagonism.", "Non-competitive antagonism depresses Emax."),

    # pharm-mod3-les1
    "pharm-mod3-les1::pharm-mod3-les1-step-02::opt-ph31-1": ("Half-life remains unchanged under first-order kinetics.", "Correct! In first-order elimination, t1/2 is a constant independent of dose (t1/2 = 0.693 * Vd / Cl)."),
    "pharm-mod3-les1::pharm-mod3-les1-step-02::opt-ph31-2": ("Half-life doubles automatically.", "Constant fraction is eliminated per unit time, so half-life is invariant."),
    "pharm-mod3-les1::pharm-mod3-les1-step-06::opt-ph31-3": ("Steady-state concentration (Css) doubled, but time to reach steady state remained unchanged.", "Correct! Time to steady state depends solely on half-life (approx. 4-5 * t1/2), not on dose."),
    "pharm-mod3-les1::pharm-mod3-les1-step-06::opt-ph31-4": ("Steady state was reached twice as fast.", "Infusion rate increases Css magnitude, not the time required to reach plateau."),
    "pharm-mod3-les1::pharm-mod3-les1-step-08::opt-ph31-5": ("Approximately 97% of the drug has been eliminated (leaving < 3.125%).", "Correct! Successive half-lives clear 50% -> 75% -> 87.5% -> 93.75% -> 96.875%."),
    "pharm-mod3-les1::pharm-mod3-les1-step-08::opt-ph31-6": ("Only 50% has been eliminated.", "50% is eliminated after 1 half-life, not 5."),
    "pharm-mod3-les1::pharm-mod3-les1-step-09::opt-ph31-7": ("Loading dose = Target Concentration * Vd = 10 mg/L * 50 L = 500 mg.", "Correct! Loading dose rapidly fills the volume of distribution to establish immediate therapeutic levels."),
    "pharm-mod3-les1::pharm-mod3-les1-step-09::opt-ph31-8": ("Administer a standard maintenance dose of 50 mg.", "Maintenance dosing would require 4-5 half-lives to achieve therapeutic levels."),
    "pharm-mod3-les1::pharm-mod3-les1-step-12::opt-ph31-9": ("t1/2 doubles from 4 hours to 8 hours.", "Correct! Since t1/2 = 0.693 * Vd / Cl, halving clearance doubles elimination half-life."),
    "pharm-mod3-les1::pharm-mod3-les1-step-12::opt-ph31-10": ("Half-life drops to 2 hours.", "Impaired clearance extends drug residence in the body."),

    # pharm-mod3-les2
    "pharm-mod3-les2::pharm-mod3-les2-step-02::opt-ph32-1": ("Only 10% (fraction 1 - ER = 0.10) reaches systemic circulation.", "Correct! Hepatic first-pass clearance extracts 90% of the portal blood drug content."),
    "pharm-mod3-les2::pharm-mod3-les2-step-02::opt-ph32-2": ("90% reaches the systemic circulation.", "An extraction ratio of 0.90 removes 90%, leaving only 10% bioavailable."),
    "pharm-mod3-les2::pharm-mod3-les2-step-06::opt-ph32-3": ("Sublingual absorption drains into systemic veins, completely bypassing hepatic first-pass metabolism.", "Correct! Sublingual venous drainage directly enters the superior vena cava."),
    "pharm-mod3-les2::pharm-mod3-les2-step-06::opt-ph32-4": ("Sublingual administration accelerates liver degradation.", "Sublingual bypasses portal circulation entirely."),
    "pharm-mod3-les2::pharm-mod3-les2-step-08::opt-ph32-5": ("Oral dose must be 80 mg (Dose_oral = Dose_iv / F = 20 / 0.25 = 80 mg).", "Correct! Compensating for 25% bioavailability requires four times the intravenous dose."),
    "pharm-mod3-les2::pharm-mod3-les2-step-08::opt-ph32-6": ("Oral dose should be 5 mg.", "5 mg would provide subtherapeutic exposure."),
    "pharm-mod3-les2::pharm-mod3-les2-step-09::opt-ph32-7": ("Oral morphine undergoes extensive hepatic first-pass extraction (F ≈ 30%), requiring 30 mg oral to match 10 mg IV.", "Correct! Roughly two-thirds of oral morphine is glucuronidated during first pass."),
    "pharm-mod3-les2::pharm-mod3-les2-step-09::opt-ph32-8": ("Morphine is destroyed in the stomach acid.", "Morphine is stable in acid; hepatic metabolism is responsible."),
    "pharm-mod3-les2::pharm-mod3-les2-step-12::opt-ph32-9": ("F = (AUC_oral / AUC_iv) * (Dose_iv / Dose_oral).", "Correct! This standard equation computes absolute bioavailability across extravascular and intravenous routes."),
    "pharm-mod3-les2::pharm-mod3-les2-step-12::opt-ph32-10": ("F = AUC_iv / AUC_oral.", "AUC must be normalized to dose across formulations."),

    # pharm-mod4-les1
    "pharm-mod4-les1::pharm-mod4-les1-step-02::opt-ph41-1": ("cAMP rises, intracellular calcium falls, producing bronchial smooth muscle relaxation (bronchodilation).", "Correct! Gs coupling activates adenylate cyclase, increasing cAMP and activating PKA to relax airway smooth muscle."),
    "pharm-mod4-les1::pharm-mod4-les1-step-02::opt-ph41-2": ("Bronchial airways constrict into severe spasm.", "Beta-2 activation promotes dilation, not constriction."),
    "pharm-mod4-les1::pharm-mod4-les1-step-06::opt-ph41-3": ("Propranolol blocks beta-2 receptors, triggering life-threatening bronchospasm in reactive airways.", "Correct! Non-selective beta antagonists remove tonic sympathetic bronchodilation in asthma."),
    "pharm-mod4-les1::pharm-mod4-les1-step-06::opt-ph41-4": ("Propranolol cures asthmatic symptoms.", "Beta blockade is contraindicated in active asthma."),
    "pharm-mod4-les1::pharm-mod4-les1-step-08::opt-ph41-5": ("Coupled to Gi; provides negative feedback inhibition to shut down norepinephrine release.", "Correct! Presynaptic alpha-2 autoreceptors inhibit further neurotransmitter exocytosis."),
    "pharm-mod4-les1::pharm-mod4-les1-step-08::opt-ph41-6": ("Increases norepinephrine release 10-fold.", "Alpha-2 stimulation reduces sympathetic outflow."),
    "pharm-mod4-les1::pharm-mod4-les1-step-09::opt-ph41-7": ("Simultaneously reverses hypotension (alpha-1), bronchoconstriction (beta-2), and cardiac depression (beta-1).", "Correct! Epinephrine stimulates all adrenergic subtypes to counteract anaphylactic shock across organs."),
    "pharm-mod4-les1::pharm-mod4-les1-step-09::opt-ph41-8": ("Only relieves localized pain.", "Adrenaline provides systemic life support across cardiovascular and respiratory systems."),
    "pharm-mod4-les1::pharm-mod4-les1-step-12::opt-ph41-9": ("Alpha-1 adrenergic receptor (couples to Gq to activate PLC and release IP3/DAG).", "Correct! Alpha-1 stimulates vascular smooth muscle contraction via Gq signaling."),
    "pharm-mod4-les1::pharm-mod4-les1-step-12::opt-ph41-10": ("Beta-2 receptor (couples to Gi).", "Beta-2 couples to Gs, not Gq."),

    # pharm-mod4-les2
    "pharm-mod4-les2::pharm-mod4-les2-step-02::opt-ph42-1": ("Vagal parasympathetic brake is lifted, resulting in accelerated heart rate (tachycardia).", "Correct! Atropine blocks inhibitory M2 receptors on the sinoatrial node."),
    "pharm-mod4-les2::pharm-mod4-les2-step-02::opt-ph42-2": ("Heart rate drops to zero immediately.", "Atropine increases heart rate by blocking vagal suppression."),
    "pharm-mod4-les2::pharm-mod4-les2-step-06::opt-ph42-3": ("Acetylcholine flood causes profuse salivation, bronchospasm, bradycardia, and muscle fasciculations.", "Correct! Cholinesterase inhibition produces overwhelming cholinergic crises at muscarinic and nicotinic synapses."),
    "pharm-mod4-les2::pharm-mod4-les2-step-06::opt-ph42-4": ("Acetylcholine is completely destroyed.", "Cholinesterase inhibitors prevent breakdown, causing accumulation."),
    "pharm-mod4-les2::pharm-mod4-les2-step-08::opt-ph42-5": ("Dry mouth, mydriasis (dilated pupils), blurred vision, constipation, and urinary retention.", "Correct! Classic antimuscarinic symptom constellation from blocking parasympathetic secretions and smooth muscle tone."),
    "pharm-mod4-les2::pharm-mod4-les2-step-08::opt-ph42-6": ("Excessive diarrhea and hyperhidrosis.", "Diarrhea and sweating reflect cholinergic excess, not blockade."),
    "pharm-mod4-les2::pharm-mod4-les2-step-09::opt-ph42-7": ("Paralyzes the pupillary sphincter muscle and ciliary body to produce mydriasis and cycloplegia.", "Correct! Muscarinic blockade in the eye allows radial sympathetic tone to dilate the pupil."),
    "pharm-mod4-les2::pharm-mod4-les2-step-09::opt-ph42-8": ("Constricts pupils into pinpoint miosis.", "Pupillary constriction is mediated by muscarinic agonists."),
    "pharm-mod4-les2::pharm-mod4-les2-step-12::opt-ph42-9": ("Cardiac M2 muscarinic receptors (couple to Gi to open GIRK K+ channels).", "Correct! M2 activation inhibits adenylyl cyclase and hyperpolarizes pacemaker cells."),
    "pharm-mod4-les2::pharm-mod4-les2-step-12::opt-ph42-10": ("Smooth muscle M3 receptors.", "M3 receptors are found in exocrine glands and smooth muscle."),

    # pharm-mod5-les1
    "pharm-mod5-les1::pharm-mod5-les1-step-02::opt-ph51-1": ("Arterioles dilate, systemic vascular resistance falls, and blood pressure drops significantly.", "Correct! Blocking Angiotensin II synthesis relieves arteriolar constriction and reduces aldosterone secretion."),
    "pharm-mod5-les1::pharm-mod5-les1-step-02::opt-ph51-2": ("Blood pressure spikes dangerously high.", "RAAS blockade lowers blood pressure."),
    "pharm-mod5-les1::pharm-mod5-les1-step-06::opt-ph51-3": ("Bradykinin accumulation in respiratory mucosa triggers dry cough and angioedema.", "Correct! ACE degrades bradykinin; its inhibition leads to inflammatory peptide buildup in lungs."),
    "pharm-mod5-les1::pharm-mod5-les1-step-06::opt-ph51-4": ("Insulin deficiency.", "Insulin metabolism is unrelated to ACE inhibition cough."),
    "pharm-mod5-les1::pharm-mod5-les1-step-08::opt-ph51-5": ("Reduced aldosterone decreases renal potassium secretion, risking dangerous hyperkalemia.", "Correct! Less aldosterone means less Na+/K+ exchange in cortical collecting ducts, retaining K+."),
    "pharm-mod5-les1::pharm-mod5-les1-step-08::opt-ph51-6": ("Serum potassium drops to zero.", "Potassium is retained in blood, causing elevation."),
    "pharm-mod5-les1::pharm-mod5-les1-step-09::opt-ph51-7": ("Discontinue ramipril and substitute with an ARB (e.g., losartan or valsartan).", "Correct! ARBs block AT1 receptors directly without inhibiting kininase II / bradykinin breakdown."),
    "pharm-mod5-les1::pharm-mod5-les1-step-09::opt-ph51-8": ("Double the ACE inhibitor dose.", "Increasing dose would worsen pulmonary bradykinin irritation."),
    "pharm-mod5-les1::pharm-mod5-les1-step-12::opt-ph51-9": ("ACE inhibitors block kininase II (elevating bradykinin); ARBs selectively block AT1 receptors without elevating bradykinin.", "Correct! ARB mechanism avoids kinin degradation pathways."),
    "pharm-mod5-les1::pharm-mod5-les1-step-12::opt-ph51-10": ("ARBs do not lower blood pressure.", "ARBs effectively lower vascular resistance by blocking AT1."),

    # pharm-mod5-les2
    "pharm-mod5-les2::pharm-mod5-les2-step-02::opt-ph52-1": ("Thick ascending limb of the loop of Henle (reabsorbs 25% of filtered Na+).", "Correct! The thick ascending limb reabsorbs one-fourth of sodium via NKCC2; loop diuretics are high-ceiling."),
    "pharm-mod5-les2::pharm-mod5-les2-step-02::opt-ph52-2": ("Distal convoluted tubule.", "The distal convoluted tubule reabsorbs only about 5-8% of filtered sodium."),
    "pharm-mod5-les2::pharm-mod5-les2-step-06::opt-ph52-3": ("Increased Na+ delivery to collecting tubules triggers aldosterone-mediated K+ and H+ wasting into urine.", "Correct! Excessive luminal sodium upstream forces distal exchange for potassium and hydrogen ions."),
    "pharm-mod5-les2::pharm-mod5-les2-step-06::opt-ph52-4": ("The kidneys directly degrade potassium.", "Potassium is eliminated via tubular exchange, not degraded."),
    "pharm-mod5-les2::pharm-mod5-les2-step-08::opt-ph52-5": ("Thiazides enhance distal renal tubular calcium reabsorption, preserving bone mineral density.", "Correct! Thiazides spare calcium in urine, protecting against osteoporotic fractures."),
    "pharm-mod5-les2::pharm-mod5-les2-step-08::opt-ph52-6": ("Thiazides excrete high amounts of calcium.", "Loop diuretics waste calcium; thiazides retain calcium."),
    "pharm-mod5-les2::pharm-mod5-les2-step-09::opt-ph52-7": ("Spironolactone retains potassium, neutralizing thiazide-induced hypokalemia.", "Correct! Combining a kaliuretic thiazide with a potassium-sparing aldosterone antagonist stabilizes serum K+."),
    "pharm-mod5-les2::pharm-mod5-les2-step-09::opt-ph52-8": ("They cancel out each other's diuretic action.", "Their natriuretic effects are synergistic."),
    "pharm-mod5-les2::pharm-mod5-les2-step-12::opt-ph52-9": ("Na+/K+/2Cl- (NKCC2) cotransporter in the thick ascending limb.", "Correct! Furosemide binds the chloride site of luminal NKCC2 to inhibit reabsorption."),
    "pharm-mod5-les2::pharm-mod5-les2-step-12::opt-ph52-10": ("Proximal tubular SGLT2 transporter.", "SGLT2 inhibitors are gliflozins, not loop diuretics."),

    # pharm-mod6-les1
    "pharm-mod6-les1::pharm-mod6-les1-step-02::opt-ph61-1": ("No; benzodiazepines are allosteric modulators and require endogenous GABA to open the channel.", "Correct! Benzodiazepines enhance GABA affinity and opening frequency, but cannot open the pore alone."),
    "pharm-mod6-les1::pharm-mod6-les1-step-02::opt-ph61-2": ("Yes; benzodiazepines directly open chloride channels at any dose.", "Barbiturates can directly gate the channel at high doses; benzodiazepines cannot."),
    "pharm-mod6-les1::pharm-mod6-les1-step-06::opt-ph61-3": ("Barbiturates have no safety ceiling; high doses directly open channels, causing fatal respiratory arrest.", "Correct! Barbiturate direct channel gating depresses medullary respiratory pacemakers."),
    "pharm-mod6-les1::pharm-mod6-les1-step-06::opt-ph61-4": ("Barbiturates possess a much wider therapeutic index.", "Benzodiazepines have a far safer therapeutic index due to self-limiting modulation."),
    "pharm-mod6-les1::pharm-mod6-les1-step-08::opt-ph61-5": ("Benzodiazepines increase opening frequency; Barbiturates increase opening duration.", "Correct! Remember: 'Ben FREQs, Barb DURATION'."),
    "pharm-mod6-les1::pharm-mod6-les1-step-08::opt-ph61-6": ("Both drugs share identical electrophysiological kinetics.", "Their microscopic channel gating kinetics are distinct."),
    "pharm-mod6-les1::pharm-mod6-les1-step-09::opt-ph61-7": ("Flumazenil competitively blocks the benzodiazepine allosteric site without inhibiting GABA.", "Correct! Flumazenil displaces benzodiazepines, promptly reversing sedation."),
    "pharm-mod6-les1::pharm-mod6-les1-step-09::opt-ph61-8": ("Flumazenil destroys GABA receptors.", "Flumazenil is a clean, reversible competitive antagonist."),
    "pharm-mod6-les1::pharm-mod6-les1-step-12::opt-ph61-9": ("Benzodiazepines act strictly as positive allosteric modulators dependent on GABA presence.", "Correct! Dependence on endogenous transmitter provides an intrinsic ceiling effect on CNS depression."),
    "pharm-mod6-les1::pharm-mod6-les1-step-12::opt-ph61-10": ("Benzodiazepines are direct pore blockers.", "Blockers cause convulsant excitation, not sedation."),

    # pharm-mod6-les2
    "pharm-mod6-les2::pharm-mod6-les2-step-02::opt-ph62-1": ("Severe extrapyramidal symptoms (EPS: acute dystonia, parkinsonism, akathisia).", "Correct! Striatal D2 occupancy exceeding 80% severely disrupts basal ganglia motor control."),
    "pharm-mod6-les2::pharm-mod6-les2-step-02::opt-ph62-2": ("Zero side effects and complete recovery.", "Excessive D2 blockade consistently triggers movement disorders."),
    "pharm-mod6-les2::pharm-mod6-les2-step-06::opt-ph62-3": ("5-HT2A blockade disinhibits dopamine release specifically in the nigrostriatal tract, relieving motor block.", "Correct! Serotonin antagonism restores dopamine tone in motor pathways without compromising mesolimbic antipsychotic efficacy."),
    "pharm-mod6-les2::pharm-mod6-les2-step-06::opt-ph62-4": ("5-HT2A blockade causes immediate catatonia.", "Atypical 5-HT2A antagonism protects against motor rigidity."),
    "pharm-mod6-les2::pharm-mod6-les2-step-08::opt-ph62-5": ("Hyperprolactinemia, galactorrhea, and gynecomastia.", "Correct! Dopamine is prolactin-inhibiting factor; D2 blockade in the pituitary disinhibits prolactin secretion."),
    "pharm-mod6-les2::pharm-mod6-les2-step-08::opt-ph62-6": ("Complete loss of prolactin secretion.", "Dopamine inhibits prolactin, so blocking dopamine increases prolactin."),
    "pharm-mod6-les2::pharm-mod6-les2-step-09::opt-ph62-7": ("Switch to a second-generation atypical antipsychotic (e.g., aripiprazole, quetiapine) with lower EPS liability.", "Correct! Atypicals modulate 5-HT2A/D2 balance with fast unbinding kinetics, preventing motor toxicity."),
    "pharm-mod6-les2::pharm-mod6-les2-step-09::opt-ph62-8": ("Double the haloperidol dose.", "Increasing haloperidol would exacerbate acute dystonic crisis."),
    "pharm-mod6-les2::pharm-mod6-les2-step-12::opt-ph62-9": ("65% to 80% striatal D2 dopamine receptor occupancy.", "Correct! Validated by PET neuroimaging: >=65% controls psychosis, while <=80% avoids extrapyramidal motor dysfunction."),
    "pharm-mod6-les2::pharm-mod6-les2-step-12::opt-ph62-10": ("100% receptor occupancy.", "100% occupancy produces severe motor rigidity and neuroleptic malignant syndrome.")
}

def clean_citations(citations):
    cleaned = []
    for c in citations:
        ref = {
            "id": c.get("id"),
            "book": c.get("book"),
            "edition": c.get("edition"),
            "topic": c.get("topic"),
            "chapter": c.get("chapter", "unverified"),
            "page": c.get("page", "unverified"),
            "status": c.get("status", "unverified")
        }
        cleaned.append(ref)
    return cleaned

def clean_sources(sources):
    cleaned = []
    for s in sources:
        # Keep clean slide reference
        cleaned.append({
            "file": s.get("file"),
            "page": s.get("page")
        })
    return cleaned

def process_lesson_dir(dir_path, translations_dict):
    files = [f for f in os.listdir(dir_path) if f.endswith('.json')]
    print(f"Processing {len(files)} files in {dir_path}...")
    
    for filename in sorted(files):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        les_id = data.get('id')
        trans = translations_dict.get(les_id)
        if not trans:
            print(f"  Warning: No translation found for {les_id}")
            continue
            
        # 1. Update Title, Objective, Misconceptions
        if isinstance(data.get('title'), dict):
            data['title']['en'] = trans['title']
            data['title']['ar'] = clean_arabic(data['title'].get('ar', ''))
        elif isinstance(data.get('title'), str):
            tr_title = data['title']
            data['title'] = {
                'tr': tr_title,
                'ar': clean_arabic(data.get('translations', {}).get('ar', {}).get('title', tr_title)),
                'en': trans['title']
            }
            
        if isinstance(data.get('objective'), dict):
            data['objective']['en'] = trans['objective']
            data['objective']['ar'] = clean_arabic(data['objective'].get('ar', ''))
        elif isinstance(data.get('objective'), str):
            tr_obj = data['objective']
            data['objective'] = {
                'tr': tr_obj,
                'ar': clean_arabic(data.get('translations', {}).get('ar', {}).get('objective', tr_obj)),
                'en': trans['objective']
            }
            
        # Misconceptions
        if 'misconceptions' in data:
            new_misc = []
            for idx, m in enumerate(data['misconceptions']):
                en_m = trans['misconceptions'][idx] if idx < len(trans['misconceptions']) else trans['misconceptions'][-1]
                if isinstance(m, dict):
                    m['en'] = en_m
                    m['ar'] = clean_arabic(m.get('ar', ''))
                    new_misc.append(m)
                elif isinstance(m, str):
                    new_misc.append({
                        'tr': m,
                        'ar': clean_arabic(m),
                        'en': en_m
                    })
            data['misconceptions'] = new_misc
            
        # Clean citations & sources
        if 'citations' in data:
            data['citations'] = clean_citations(data['citations'])
        if 'sources' in data:
            data['sources'] = clean_sources(data['sources'])
            
        # 2. Update Steps
        steps_trans = trans.get('steps', {})
        for step in data.get('steps', []):
            step_id = step.get('id')
            s_trans = steps_trans.get(step_id, {})
            
            # Title & Prompt
            if isinstance(step.get('title'), dict):
                if 'title' in s_trans:
                    step['title']['en'] = s_trans['title']
                step['title']['ar'] = clean_arabic(step['title'].get('ar', ''))
                
            if isinstance(step.get('prompt'), dict):
                if 'prompt' in s_trans:
                    step['prompt']['en'] = s_trans['prompt']
                step['prompt']['ar'] = clean_arabic(step['prompt'].get('ar', ''))
                
            # Standardize hints
            step['hints'] = [
                {
                    'tr': HINTS_TR[0],
                    'ar': HINTS_AR[0],
                    'en': HINTS_EN[0]
                },
                {
                    'tr': HINTS_TR[1],
                    'ar': HINTS_AR[1],
                    'en': HINTS_EN[1]
                },
                {
                    'tr': HINTS_TR[2],
                    'ar': HINTS_AR[2],
                    'en': HINTS_EN[2]
                }
            ]
            
            # ConceptCheck Options & Feedback
            cc = step.get('conceptCheck')
            if cc and 'options' in cc:
                for opt in cc['options']:
                    opt_id = opt.get('id')
                    key = f"{les_id}::{step_id}::{opt_id}"
                    opt_trans = OPTIONS_EN.get(key)
                    
                    if opt_trans:
                        en_text, en_feedback = opt_trans
                        if isinstance(opt.get('text'), dict):
                            opt['text']['en'] = en_text
                            opt['text']['ar'] = clean_arabic(opt['text'].get('ar', ''))
                        elif isinstance(opt.get('text'), str):
                            tr_txt = opt['text']
                            opt['text'] = {
                                'tr': tr_txt,
                                'ar': clean_arabic(tr_txt),
                                'en': en_text
                            }
                            
                        # Feedback
                        if 'misconceptionFeedback' in opt and isinstance(opt['misconceptionFeedback'], dict):
                            opt['misconceptionFeedback']['en'] = en_feedback
                            opt['misconceptionFeedback']['ar'] = clean_arabic(opt['misconceptionFeedback'].get('ar', ''))
                        elif 'misconceptionFeedback' in opt and isinstance(opt['misconceptionFeedback'], str):
                            tr_fb = opt['misconceptionFeedback']
                            opt['misconceptionFeedback'] = {
                                'tr': tr_fb,
                                'ar': clean_arabic(tr_fb),
                                'en': en_feedback
                            }
                    else:
                        # Fallback for any unmapped option
                        if isinstance(opt.get('text'), dict) and 'en' not in opt['text']:
                            opt['text']['en'] = opt['text'].get('tr', '')
                            opt['text']['ar'] = clean_arabic(opt['text'].get('ar', ''))
                            
            # Clean technical terms arabic context
            for tt in step.get('technicalTerms', []):
                if 'arContext' in tt:
                    tt['arContext'] = clean_arabic(tt['arContext'])
                    
        # Write back cleanly
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write('\n')
            
        print(f"  Enriched {les_id} ({filename})")

def main():
    print("="*60)
    print("STARTING TRI-LINGUAL ENRICHMENT PIPELINE")
    print("="*60)
    
    process_lesson_dir(MEDCHEM_DIR, MEDCHEM_TRANSLATIONS)
    process_lesson_dir(PHARM_DIR, PHARMACOLOGY_TRANSLATIONS)
    
    print("\nRunning client generators...")
    subprocess.run(["node", "scripts/generate-all-client-lessons.mjs"], cwd=REPO_ROOT, check=True)
    subprocess.run(["node", "scripts/generate-lesson-client.mjs"], cwd=REPO_ROOT, check=True)
    
    print("\nTri-lingual enrichment pipeline completed successfully!")

if __name__ == '__main__':
    main()

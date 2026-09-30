import json, os

LESSON_PATH = 'courses/medchem/lessons/lesson-01.json'

with open(LESSON_PATH, 'r', encoding='utf-8') as f:
    d = json.load(f)

# Title & Objective
d['title']['en'] = "Thermodynamic Activity & The Ferguson Principle"
d['objective']['en'] = "Differentiate structurally specific from structurally non-specific drugs using thermodynamic activity thresholds."

# Misconceptions
if len(d.get('misconceptions', [])) >= 2:
    d['misconceptions'][0]['en'] = "The misconception that all drugs must bind specific stereoselective protein receptors."
    d['misconceptions'][1]['en'] = "The assumption that chemically diverse general anesthetics operate via distinct biophasic mechanisms."

# Step Translations mapping
STEP_EN = {
    "mc-mod1-les1-step-01": {
        "title": "Two Drugs, Vastly Different Quantities",
        "prompt": "General anesthesia with ether requires tens of grams, while beta-blocker propranolol acts at milligram doses. What causes this immense dose divergence?",
        "hints": [
            "Consider the nature of the biological targets these molecules act upon.",
            "One substance physically perturbs the membrane; the other binds a single receptor pocket.",
            "Non-specific action requires high relative saturation."
        ]
    },
    "mc-mod1-les1-step-02": {
        "title": "Prediction: Anesthesia at Equal Saturation",
        "prompt": "When chemically diverse volatile agents reach equal relative saturation (Pt / P0), how does their depth of anesthesia compare?",
        "hints": [
            "Thermodynamic activity represents equilibrium across biophasic compartments.",
            "Consider the escaping tendency of volatile molecules into the biophase.",
            "Equal partial saturation yields equal membrane concentration."
        ]
    },
    "mc-mod1-les1-step-03": {
        "title": "Intuitive Model: Escaping Tendency from Membrane",
        "prompt": "Thermodynamic activity measures a molecule's escaping tendency from its biophasic solution into target cellular lipid bilayers.",
        "hints": [
            "As molecules crowd their initial phase, they escape into cellular lipid membranes.",
            "Molecules intercalating into lipid bilayers cause physical membrane expansion.",
            "This expansion mechanically compresses and blocks ion channel conduction."
        ]
    },
    "mc-mod1-les1-step-04": {
        "title": "Visualization: Lipid Bilayer Expansion",
        "prompt": "Accumulation of structurally non-specific molecules expands the neuronal membrane volume, mechanically compressing vital ion channel pores.",
        "hints": [
            "Membrane thickening exerts lateral pressure on neuronal ion channels.",
            "When sodium influx is halted, nerve action potentials cannot propagate.",
            "The critical volume hypothesis provides the physical basis for anesthesia."
        ]
    },
    "mc-mod1-les1-step-05": {
        "title": "Interactive Simulation: Ferguson Slider",
        "prompt": "Modulate partial vapor pressure to examine the iso-activity anesthetic window and phase cutoff boundaries.",
        "hints": [
            "Increase partial vapor pressure to identify the surgical anesthesia threshold.",
            "Monitor the relative saturation ratio.",
            "Anesthesia occurs when relative saturation reaches the target window."
        ]
    },
    "mc-mod1-les1-step-06": {
        "title": "Guided Discovery: Nitrous Oxide vs Chloroform",
        "prompt": "Notice how nitrous oxide and chloroform produce identical surgical depth despite a massive difference in absolute saturation pressure.",
        "hints": [
            "Nitrous oxide has an extremely high saturation vapor pressure.",
            "Chloroform has a much lower saturation vapor pressure.",
            "Relative saturation produces equivalent depth for both volatile agents."
        ]
    },
    "mc-mod1-les1-step-07": {
        "title": "Formal Formulation: Ferguson's Principle",
        "prompt": "For non-specific agents, thermodynamic activity in the biophase equals relative saturation in external phase.",
        "hints": [
            "Pt represents partial pressure; P0 represents saturation vapor pressure.",
            "St represents concentration in solution; S0 represents saturation solubility.",
            "As activity approaches saturation, the biophase reaches thermodynamic equilibrium."
        ]
    },
    "mc-mod1-les1-step-08": {
        "title": "Concept Check: Classifying Mystery Compounds",
        "prompt": "Compound X requires high relative saturation for depression. Compound Y produces activity at extreme dilution. Classify their mechanisms.",
        "hints": [
            "Recall the cutoff dividing specific and non-specific mechanisms.",
            "Compound Y produces biological effects at extreme biophasic dilution.",
            "Low thermodynamic activity proves high-affinity stereospecific receptor binding."
        ]
    },
    "mc-mod1-les1-step-09": {
        "title": "Application: Volatile Inhalation Dose Calculation",
        "prompt": "A volatile anesthetic has saturation vapor pressure P0 = 200 mmHg. Inhalation anesthesia occurs at partial pressure Pt = 10 mmHg. Calculate a.",
        "hints": [
            "Apply Ferguson's equation: a = Pt / P0.",
            "Calculate the ratio of given vapor pressures.",
            "The quotient falls within the surgical anesthesia window."
        ]
    },
    "mc-mod1-les1-step-10": {
        "title": "Retrieval: Raoult's Law from General Chemistry",
        "prompt": "In ideal solutions, how does partial vapor pressure over a solution relate to mole fraction and saturation vapor pressure?",
        "hints": [
            "Recall the law governing vapor pressure depression in solutions.",
            "Named after French physical chemist Francois-Marie Raoult.",
            "Ferguson's principle represents the biophysical application of Raoult's law."
        ]
    },
    "mc-mod1-les1-step-11": {
        "title": "Connection: Solubility and Ionization (Lesson 2)",
        "prompt": "Thermodynamic activity governs non-specific agents, but how does aqueous ionization dictate membrane crossing for specific drugs?",
        "hints": [
            "Ionized species remain partitioned in the bulk aqueous phase.",
            "Un-ionized neutral molecules diffuse across hydrophobic lipid membranes.",
            "The Henderson-Hasselbalch equation governs this ionization equilibrium."
        ]
    },
    "mc-mod1-les1-step-12": {
        "title": "Mastery Assessment: Ferguson Principle Summary",
        "prompt": "Which definitive criterion proves that a series of hypnotic drugs operates via a structurally non-specific biophysical mechanism?",
        "hints": [
            "Consider chemical structure versus biophasic phase equilibrium.",
            "Relative saturation is the key governing parameter.",
            "Equal thermodynamic activity produces equal biological depression."
        ]
    }
}

# Options translations
OPTIONS_EN = {
    "mc-mod1-les1-step-02": {
        "opt-a": ("They exhibit completely different effects based on differing chemical structures.", "According to Ferguson's principle, thermodynamic activity governs biological depression, not chemical structure."),
        "opt-b": ("Only volatile molecules with low molecular weight produce surgical anesthesia.", "Molecular weight alone does not dictate anesthetic potency."),
        "opt-c": ("They produce approximately the same depth of anesthesia regardless of chemical structure.", "Correct! At equal relative saturation, thermodynamic escaping tendency in the biophase is identical.")
    },
    "mc-mod1-les1-step-06": {
        "opt-disc-1": ("In the same narrow relative saturation window for both gases.", "Excellent! The relative saturation rule is independent of chemical structure."),
        "opt-disc-2": ("At completely different activity values due to differing molecular weights.", "Even with different molecular weights, the thermodynamic activity window remains the same.")
    },
    "mc-mod1-les1-step-08": {
        "opt-chk-1": ("Compound Y is structurally specific because it acts at extreme dilution.", "Correct! Low activity proves specific receptor binding. There is a huge divergence in saturation."),
        "opt-chk-2": ("Compound X is structurally specific because its effective dose is larger.", "High saturation requirements define structurally non-specific membrane perturbation.")
    },
    "mc-mod1-les1-step-09": {
        "opt-app-1": ("a = 20.0; represents a fatal massive overdose.", "Calculation error: relative saturation cannot exceed standard limits under equilibrium."),
        "opt-app-2": ("a = 0.05; falls within the surgical anesthesia window.", "Correct! a = Pt / P0 = 10 / 200 = 0.05, matching the Ferguson threshold.")
    },
    "mc-mod1-les1-step-12": {
        "opt-mst-1": ("Their chemical core structures and ability to form specific covalent bonds.", "Non-specific drugs do not form stereospecific covalent bonds."),
        "opt-mst-2": ("Their relative thermodynamic saturation in the biophase, independent of chemical structure.", "Correct! Ferguson's principle proves biological depression is governed by relative thermodynamic activity.")
    }
}

# Apply step translations
for step in d['steps']:
    sid = step['id']
    if sid in STEP_EN:
        meta = STEP_EN[sid]
        step['title']['en'] = meta['title']
        step['prompt']['en'] = meta['prompt']
        if 'hints' in step and len(step['hints']) == len(meta['hints']):
            for idx, h in enumerate(step['hints']):
                h['en'] = meta['hints'][idx]
    
    if sid in OPTIONS_EN and 'conceptCheck' in step:
        for opt in step['conceptCheck'].get('options', []):
            oid = opt['id']
            if oid in OPTIONS_EN[sid]:
                txt_en, fb_en = OPTIONS_EN[sid][oid]
                opt['text']['en'] = txt_en
                opt['misconceptionFeedback']['en'] = fb_en

with open(LESSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(d, f, indent=2, ensure_ascii=False)

print("Successfully enriched lesson-01.json with complete English translations!")

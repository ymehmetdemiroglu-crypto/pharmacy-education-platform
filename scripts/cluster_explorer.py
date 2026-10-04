import sys
import json
import re
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ideas = data['all_ideas']

# Build inverted index of domain keywords
domain_keywords = {
    'bioisostere': ['bioisostere', 'bioisosteric', 'bioisosterism', 'tetrazole', 'isostere'],
    'predict_reveal': ['predict-then-reveal', 'predict-first', 'predict-before-reveal', 'pre-testing', 'prediction', 'predict'],
    'worked_example_fading': ['faded', 'fading', 'worked example', 'worked-example', 'scaffold'],
    'dose_response_curve': ['dose-response', 'log-dose', 'ec50', 'emax', 'agonist-antagonist', 'potency vs efficacy'],
    'ache_hydrolysis': ['acetylcholine esterase', 'acetylcholinesterase', 'ache', 'organophosphate', 'aging', 'pralidoxime'],
    'autonomic_tone_balance': ['autonomic', 'sympathetic', 'parasympathetic', 'baroreceptor', 'reflex', 'dale'],
    'receptor_selectivity': ['adrenoceptor', 'adrenergic', 'cardioselective', 'muscarinic', 'nicotinic', 'subtype'],
    'pka_ionization': ['pka', 'henderson-hasselbalch', 'ion-trapping', 'ionization', 'buffer', 'ph-compartment'],
    'smiles_rdkit_rendering': ['smiles', 'rdkit', 'webassembly', 'wasm', 'rendering', 'vector svg'],
    'spaced_retrieval': ['spaced', 'spacing', 'leitner', 'ebbinghaus', 'forgetting', 'retrieval practice'],
    'diagnostic_distractor': ['distractor', 'misconception', 'diagnostic', 'non-punitive', 'zero-shame'],
    'hint_ladder': ['hint', 'hint ladder', '3-tier', 'scaffolded hint'],
    'bilingual_terminology': ['bilingual', 'turkish', 'translation', 'terminology', 'crosswalk', 'glossary'],
    'offline_indexeddb_state': ['offline', 'indexeddb', 'localstorage', 'service worker', 'state persistence'],
    'freemium_commercial': ['freemium', 'paywall', 'trial', 'subscription', 'pricing', 'ppp', 'monetization'],
    'cognitive_load_40words': ['40-word', 'cognitive load', 'micro-step', 'micro-copy', 'chunking'],
    'pk_clearance_half_life': ['clearance', 'volume of distribution', 'vd', 'half-life', 'steady-state', 'compartment'],
    'confidence_calibration': ['confidence', 'calibration', 'brier', 'metacognitive', 'certainty-based'],
    'cat_irt_analytics': ['item response theory', 'irt', '2pl', 'adaptive testing', 'bayesian knowledge tracing', 'bkt'],
    'chiral_stereochemistry': ['chiral', 'enantiomer', 'eutomer', 'stereochemical', 'optical isomer'],
    'covalent_suicide_inhibitor': ['covalent', 'irreversible', 'suicide inhibitor', 'phenoxybenzamine', 'aspirin'],
    'cyp_metabolism': ['cyp', 'cyp450', 'induction', 'inhibition', 'first-pass', 'hepatic'],
    'therapeutic_index': ['therapeutic index', 'therapeutic window', 'margin of safety', 'ld50'],
    'dark_mode_ergonomics': ['dark mode', 'high-contrast', 'thumb-zone', 'ergonomic', 'accessibility'],
}

keyword_matches = defaultdict(list)
for i in ideas:
    text = f"{i['name']} {i['mechanism']} {i['expected_effect']}".lower()
    matched = False
    for cat, kws in domain_keywords.items():
        if any(re.search(r'\b' + re.escape(kw) + r'\b', text) for kw in kws):
            keyword_matches[cat].append(i['id'])
            matched = True

print("Domain Keyword Cluster Counts:")
for cat, matched_ids in sorted(keyword_matches.items(), key=lambda x: len(x[1]), reverse=True):
    seats = Counter(mid[:3] for mid in matched_ids)
    print(f"  {cat:26}: {len(matched_ids):3} matches | seats: {dict(seats)}")

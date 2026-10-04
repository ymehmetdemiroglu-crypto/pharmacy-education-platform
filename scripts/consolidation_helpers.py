import sys
import json
import re
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ideas = raw_data['all_ideas']
raw_map = {i['id']: i for i in all_raw_ideas}

# Function to synthesize tier:
# if any is 'proven', consolidated is 'proven' (or majority)
# if all 'wild', 'wild'
# else 'adjacent'
def synthesize_tier(raw_ids):
    tiers = [raw_map[rid]['tier'] for rid in raw_ids]
    if 'proven' in tiers:
        return 'proven'
    if all(t == 'wild' for t in tiers):
        return 'wild'
    return 'adjacent'

# Function to synthesize evidence tag:
# if majority evidence-backed, evidence-backed
# if any speculative and none evidence-backed, speculative
# else plausible
def synthesize_evidence(raw_ids):
    evs = [raw_map[rid]['evidence_tag'] for rid in raw_ids]
    if evs.count('evidence-backed') >= len(evs) / 2.0:
        return 'evidence-backed'
    if all(e == 'speculative' for e in evs):
        return 'speculative'
    return 'plausible'

print("Synthesizers defined.")

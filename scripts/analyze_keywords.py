import sys
import json
from collections import defaultdict, Counter
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ideas = data['all_ideas']
print(f"Total ideas loaded: {len(ideas)}")

words = Counter()
for i in ideas:
    name_tokens = re.findall(r'\b[A-Za-z0-9\-]+\b', i['name'].lower())
    for w in name_tokens:
        if len(w) > 3 and w not in {'with', 'from', 'that', 'this', 'into', 'over', 'under', 'step', 'mode', 'system'}:
            words[w] += 1

print("\nTop 30 keywords in idea titles:")
for w, c in words.most_common(30):
    print(f"  {w}: {c}")

print("\nTier counts:", Counter(i['tier'] for i in ideas))
print("Evidence tag counts:", Counter(i['evidence_tag'] for i in ideas))

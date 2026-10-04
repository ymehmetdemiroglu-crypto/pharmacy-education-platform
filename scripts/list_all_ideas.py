import sys
import json
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ideas = data['all_ideas']

# Print all 100 idea names for each seat to understand the landscape
by_seat = defaultdict(list)
for i in ideas:
    by_seat[i['seat_prefix']].append(i)

for pref in ['COG', 'TEA', 'GAM', 'ADV', 'DAT', 'TEC', 'ECO']:
    s_ideas = by_seat[pref]
    print(f"\n==================== {pref} ({len(s_ideas)} ideas) ====================")
    for idx, item in enumerate(s_ideas):
        if idx % 10 == 0:
            print(f"--- {idx+1} to {min(idx+10, len(s_ideas))} ---")
        print(f"[{item['id']}] {item['name']} | {item['tier']} | {item['evidence_tag']}")

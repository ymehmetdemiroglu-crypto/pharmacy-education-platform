import json
from collections import defaultdict, Counter

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ideas = data['all_ideas']
print(f"Loaded {len(ideas)} ideas.")

by_seat = defaultdict(list)
for i in ideas:
    by_seat[i['seat_prefix']].append(i)

for pref, s_ideas in by_seat.items():
    print(f"\n=== {pref} ({len(s_ideas)} ideas) ===")
    for item in s_ideas[:3]:
        print(f"  [{item['id']}] {item['name']} ({item['tier']}, {item['evidence_tag']})")
        print(f"      Mech: {item['mechanism'][:80]}...")
        print(f"      Effect: {item['expected_effect'][:80]}...")

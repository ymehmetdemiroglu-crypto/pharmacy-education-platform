import sys
import json
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ideas = {i['id']: i for i in raw_data['all_ideas']}

# Run the exact code from build_full_700_consolidation.py to inspect missing & dups
from build_full_700_consolidation import final_consolidated_list

assigned_map = defaultdict(list)
for c in final_consolidated_list:
    for rid in c['raw_ids']:
        assigned_map[rid].append(c['id'])

print("Duplicates:")
for rid, cids in assigned_map.items():
    if len(cids) > 1:
        print(f"  {rid} in: {cids}")

missing = sorted(set(all_raw_ideas.keys()) - set(assigned_map.keys()))
print(f"\nMissing ({len(missing)}):")
for mid in missing:
    item = all_raw_ideas[mid]
    print(f"  [{mid}] {item['name']} ({item['seat_name'][:15]}, {item['tier']}, {item['evidence_tag']})")

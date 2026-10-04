import sys
import json
import re
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ideas = raw_data['all_ideas']
raw_map = {i['id']: i for i in all_raw_ideas}
print(f"Total raw ideas loaded: {len(all_raw_ideas)}")

# Let's inspect all 700 IDs to ensure clean set
expected_ids = set()
for p in ['COG', 'TEA', 'GAM', 'ADV', 'DAT', 'TEC', 'ECO']:
    for n in range(1, 101):
        expected_ids.add(f"{p}-{n:03d}")

loaded_ids = set(raw_map.keys())
assert expected_ids == loaded_ids, f"ID mismatch! Missing: {expected_ids - loaded_ids}"
print("All 700 raw IDs verified present.")

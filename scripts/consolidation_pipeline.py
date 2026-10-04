import sys
import json
import re
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ideas = raw_data['all_ideas']
raw_map = {i['id']: i for i in all_raw_ideas}

print(f"Loaded {len(raw_map)} raw ideas.")

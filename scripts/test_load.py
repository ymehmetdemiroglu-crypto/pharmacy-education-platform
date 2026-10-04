import sys
import json
import re
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ideas = {i['id']: i for i in data['all_ideas']}
print(f"Loaded {len(ideas)} unique raw ideas.")

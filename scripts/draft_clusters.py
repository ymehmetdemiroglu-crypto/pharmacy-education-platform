import sys
import json
import re
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

all_ideas = data['all_ideas']
id_map = {i['id']: i for i in all_ideas}

# We can define a comprehensive cluster registry.
# Each cluster will have:
# - canonical_name: title
# - theme: 1 to 7
# - pattern / keywords or explicit raw ID list
# - synthesized tier & evidence tag logic
# - synthesized mechanism & expected_effect logic

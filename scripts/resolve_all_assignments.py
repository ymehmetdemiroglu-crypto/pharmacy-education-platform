import sys
import json
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ideas = {i['id']: i for i in raw_data['all_ideas']}

# Let's inspect the 29 duplicates
from theme1_clusters import THEME_1_CLUSTERS
from theme2_clusters import THEME_2_CLUSTERS
from theme3_clusters import THEME_3_CLUSTERS
from theme4_clusters import THEME_4_CLUSTERS
from theme5_clusters import THEME_5_CLUSTERS
from theme6_clusters import THEME_6_CLUSTERS
from theme7_clusters import THEME_7_CLUSTERS

cluster_sets = [
    (1, THEME_1_CLUSTERS),
    (2, THEME_2_CLUSTERS),
    (3, THEME_3_CLUSTERS),
    (4, THEME_4_CLUSTERS),
    (5, THEME_5_CLUSTERS),
    (6, THEME_6_CLUSTERS),
    (7, THEME_7_CLUSTERS)
]

seen = {}
duplicates = []
for t_id, c_list in cluster_sets:
    for c in c_list:
        new_raw_ids = []
        for rid in c['raw_ids']:
            if rid in seen:
                duplicates.append((rid, seen[rid], (t_id, c['name'])))
            else:
                seen[rid] = (t_id, c['name'])
                new_raw_ids.append(rid)
        c['raw_ids'] = new_raw_ids

print(f"De-duplicated {len(duplicates)} duplicate occurrences.")
print(f"Now {len(seen)} unique raw IDs assigned in base clusters.")
unassigned = set(all_raw_ideas.keys()) - set(seen.keys())
print(f"Unassigned raw IDs: {len(unassigned)}")

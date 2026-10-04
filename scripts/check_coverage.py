import sys
import json
from collections import Counter

from theme1_clusters import THEME_1_CLUSTERS
from theme2_clusters import THEME_2_CLUSTERS
from theme3_clusters import THEME_3_CLUSTERS
from theme4_clusters import THEME_4_CLUSTERS
from theme5_clusters import THEME_5_CLUSTERS
from theme6_clusters import THEME_6_CLUSTERS
from theme7_clusters import THEME_7_CLUSTERS

all_clusters = [
    (1, THEME_1_CLUSTERS),
    (2, THEME_2_CLUSTERS),
    (3, THEME_3_CLUSTERS),
    (4, THEME_4_CLUSTERS),
    (5, THEME_5_CLUSTERS),
    (6, THEME_6_CLUSTERS),
    (7, THEME_7_CLUSTERS)
]

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ids = set(i['id'] for i in raw_data['all_ideas'])
print(f"Total raw ideas in pool: {len(all_raw_ids)}")

assigned_ids = Counter()
cluster_count = 0
for tid, tclusters in all_clusters:
    print(f"Theme {tid}: {len(tclusters)} clusters, {sum(len(c['raw_ids']) for c in tclusters)} raw ID mentions")
    cluster_count += len(tclusters)
    for c in tclusters:
        for rid in c['raw_ids']:
            assigned_ids[rid] += 1

print(f"\nTotal clusters defined: {cluster_count}")
print(f"Unique raw IDs assigned: {len(assigned_ids)}")

# Check duplicates
duplicates = {rid: cnt for rid, cnt in assigned_ids.items() if cnt > 1}
if duplicates:
    print(f"WARNING: {len(duplicates)} duplicate IDs found across clusters:")
    for rid, cnt in sorted(duplicates.items())[:10]:
        print(f"  {rid}: appears {cnt} times")

# Check unassigned
unassigned = all_raw_ids - set(assigned_ids.keys())
print(f"Unassigned raw IDs remaining: {len(unassigned)}")
by_prefix = Counter(rid[:3] for rid in unassigned)
print(f"Unassigned by seat: {dict(by_prefix)}")

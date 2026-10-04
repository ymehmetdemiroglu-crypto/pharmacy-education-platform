import sys
import json
from collections import Counter, defaultdict

from theme1_clusters import THEME_1_CLUSTERS
from theme2_clusters import THEME_2_CLUSTERS
from theme3_clusters import THEME_3_CLUSTERS
from theme4_clusters import THEME_4_CLUSTERS
from theme5_clusters import THEME_5_CLUSTERS
from theme6_clusters import THEME_6_CLUSTERS
from theme7_clusters import THEME_7_CLUSTERS

all_clusters = [THEME_1_CLUSTERS, THEME_2_CLUSTERS, THEME_3_CLUSTERS, THEME_4_CLUSTERS, THEME_5_CLUSTERS, THEME_6_CLUSTERS, THEME_7_CLUSTERS]

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ideas = {i['id']: i for i in raw_data['all_ideas']}
assigned_ids = set()
for tc in all_clusters:
    for c in tc:
        for rid in c['raw_ids']:
            assigned_ids.add(rid)

unassigned = [all_raw_ideas[rid] for rid in sorted(all_raw_ideas.keys()) if rid not in assigned_ids]
print(f"Total unassigned: {len(unassigned)}")

by_seat = defaultdict(list)
for u in unassigned:
    by_seat[u['seat_prefix']].append(u)

for seat in ['COG', 'TEA', 'GAM', 'ADV', 'DAT', 'TEC', 'ECO']:
    print(f"\n=== Seat {seat} ({len(by_seat[seat])} unassigned) ===")
    for u in by_seat[seat]:
        print(f"[{u['id']}] {u['name']} ({u['tier']}, {u['evidence_tag']})")

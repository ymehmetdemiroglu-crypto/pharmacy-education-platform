import sys
import json
import re
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ideas = {i['id']: i for i in raw_data['all_ideas']}

# Load all 7 base theme files
from theme1_clusters import THEME_1_CLUSTERS
from theme2_clusters import THEME_2_CLUSTERS
from theme3_clusters import THEME_3_CLUSTERS
from theme4_clusters import THEME_4_CLUSTERS
from theme5_clusters import THEME_5_CLUSTERS
from theme6_clusters import THEME_6_CLUSTERS
from theme7_clusters import THEME_7_CLUSTERS

# We will build a unified master cluster list
# Each cluster will have: name, theme_id, tier, evidence_tag, mechanism, expected_effect, raw_ids

# Map raw IDs to canonical primary clusters
# First, let's create a clean list of all clusters with exact non-overlapping raw_ids

import sys
import json
import re
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_raw_ideas = raw_data['all_ideas']
raw_map = {i['id']: i for i in all_raw_ideas}

# Load the base clusters from themes 1 to 7
from theme1_clusters import THEME_1_CLUSTERS
from theme2_clusters import THEME_2_CLUSTERS
from theme3_clusters import THEME_3_CLUSTERS
from theme4_clusters import THEME_4_CLUSTERS
from theme5_clusters import THEME_5_CLUSTERS
from theme6_clusters import THEME_6_CLUSTERS
from theme7_clusters import THEME_7_CLUSTERS

print("Building complete consolidated registry...")

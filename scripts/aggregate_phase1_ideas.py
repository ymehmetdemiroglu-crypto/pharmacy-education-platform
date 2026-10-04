import json
import os
from collections import Counter

seat_files = [
    ('COG', 'Seat 1: Cognitive Scientist', 'docs/council/seat_1_cognitive_scientist.json'),
    ('TEA', 'Seat 2: Master Teacher / Instructional Designer', 'docs/council/seat_2_master_teacher.json'),
    ('GAM', 'Seat 3: Game & Interaction Designer', 'docs/council/seat_3_game_designer.json'),
    ('ADV', 'Seat 4: Learner Advocate', 'docs/council/seat_4_learner_advocate.json'),
    ('DAT', 'Seat 5: Assessment & Data Scientist', 'docs/council/seat_5_assessment_data_scientist.json'),
    ('TEC', 'Seat 6: AI/Technology Engineer', 'docs/council/seat_6_ai_engineer.json'),
    ('ECO', 'Seat 7: Skeptic-Economist', 'docs/council/seat_7_skeptic_economist.json')
]

aggregated_data = {
    'metadata': {
        'title': 'The Learning Council - Phase 1 Aggregated Raw Ideas Pool',
        'generated_at': '2026-10-03T20:10:00Z',
        'total_raw_ideas': 700,
        'seats_count': 7,
        'tier_distribution': {'proven': 210, 'adjacent': 350, 'wild': 140},
        'evidence_tag_distribution': {'evidence-backed': 325, 'plausible': 285, 'speculative': 90},
        'seats_summary': []
    },
    'seats': {},
    'all_ideas': []
}

for prefix, name, path in seat_files:
    with open(path, 'r', encoding='utf-8') as fp:
        sdata = json.load(fp)
    ideas = sdata['ideas']
    tiers = dict(Counter(i['tier'] for i in ideas))
    ev = dict(Counter(i['evidence_tag'] for i in ideas))
    seat_meta = {
        'prefix': prefix,
        'seat_name': name,
        'source_file': path,
        'total_ideas': len(ideas),
        'tiers': tiers,
        'evidence_tags': ev
    }
    aggregated_data['metadata']['seats_summary'].append(seat_meta)
    
    # Store seat with its ideas
    aggregated_data['seats'][prefix] = {
        'metadata': seat_meta,
        'ideas': ideas
    }
    
    for item in ideas:
        item_copy = dict(item)
        item_copy['seat_prefix'] = prefix
        item_copy['seat_name'] = name
        aggregated_data['all_ideas'].append(item_copy)

out_path = 'docs/council/phase1_raw_ideas.json'
with open(out_path, 'w', encoding='utf-8') as fp:
    json.dump(aggregated_data, fp, indent=2, ensure_ascii=False)

print(f"Successfully wrote {out_path}")
print(f"Total ideas aggregated: {len(aggregated_data['all_ideas'])}")
print(f"Seats aggregated: {len(aggregated_data['seats'])}")
print(f"File size in bytes: {os.path.getsize(out_path)}")

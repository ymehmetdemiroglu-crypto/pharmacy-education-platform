import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for lpath in ['courses/pharmacology/lessons/lesson-05.json', 'courses/pharmacology/lessons/lesson-06.json']:
    print(f"\n==================== {lpath} ====================")
    with open(lpath, 'r', encoding='utf-8') as f:
        d = json.load(f)
    print(f"Title: {d.get('title', {}).get('tr')}")
    print(f"Root sources: {d.get('sources')}")
    print(f"Citations: {[c.get('book') for c in d.get('citations', [])]}")
    for idx, step in enumerate(d.get('steps', [])):
        print(f"Step {idx+1} ({step.get('id')}): {step.get('title', {}).get('tr')}")

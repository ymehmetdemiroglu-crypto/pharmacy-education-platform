import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

lessons = [
    'courses/medchem/lessons/lesson-03.json',
    'courses/medchem/lessons/lesson-04.json',
    'courses/medchem/lessons/lesson-05.json',
    'courses/medchem/lessons/lesson-06.json'
]

for lpath in lessons:
    print(f"\n==================== {lpath} ====================")
    with open(lpath, 'r', encoding='utf-8') as f:
        d = json.load(f)
    print(f"Title: {d.get('title', {}).get('tr')}")
    print(f"Root sources: {d.get('sources')}")
    for idx, step in enumerate(d.get('steps', [])):
        srcs = step.get('sources', [])
        print(f"Step {idx+1} ({step.get('id')}): {step.get('title', {}).get('tr')} -> {srcs}")

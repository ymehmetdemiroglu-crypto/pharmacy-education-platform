import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('courses/pharmacology/lessons/lesson-01.json', encoding='utf-8') as f:
    d = json.load(f)

sources = d.get('sources', [])
steps = d.get('steps', [])

for idx, (step, src) in enumerate(zip(steps, sources)):
    print(f"Step {idx+1} ({step.get('id')}): {step.get('title', {}).get('tr')}")
    print(f"   Mapped source: {src.get('file')} slide {src.get('page')}")

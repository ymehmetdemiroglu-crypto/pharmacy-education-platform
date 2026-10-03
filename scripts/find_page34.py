import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('courses/pharmacology/lessons/lesson-02.json', encoding='utf-8') as f:
    d = json.load(f)

for idx, step in enumerate(d.get('steps', [])):
    srcs = step.get('sources', [])
    for s in srcs:
        if s.get('page') == 34:
            print(f"Step {idx+1} ({step.get('id')}): {step.get('title', {}).get('tr')} has source page 34")

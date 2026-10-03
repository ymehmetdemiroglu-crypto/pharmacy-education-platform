import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('courses/pharmacology/lessons/lesson-02.json', encoding='utf-8') as f:
    d = json.load(f)

print("Pharmacology Lesson 2:", d.get('title', {}).get('tr'))
for i, s in enumerate(d.get('steps', [])):
    print(f"Step {i+1} ({s.get('id')}): {s.get('title', {}).get('tr')}")
    print(f"   sources: {s.get('sources')}")

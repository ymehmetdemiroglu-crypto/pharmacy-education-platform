import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Lesson 5
lpath5 = 'courses/pharmacology/lessons/lesson-05.json'
with open(lpath5, 'r', encoding='utf-8') as f:
    d5 = json.load(f)

sources_map5 = {
    1: [{"file": "İlaç metabolizması-2026.pdf", "page": 2}],
    2: [{"file": "İlaç metabolizması-2026.pdf", "page": 2}],
    3: [{"file": "İlaç metabolizması-2026.pdf", "page": 2}],
    4: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    5: [{"file": "İlaç metabolizması-2026.pdf", "page": 2}, {"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    6: [{"file": "İlaç metabolizması-2026.pdf", "page": 6}, {"file": "İlaç metabolizması-2026.pdf", "page": 20}],
    7: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    8: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    9: [{"file": "İlaç metabolizması-2026.pdf", "page": 2}],
    10: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    11: [{"file": "İlaç metabolizması-2026.pdf", "page": 2}],
    12: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}]
}

for idx, step in enumerate(d5.get('steps', [])):
    step['sources'] = sources_map5[idx + 1]

with open(lpath5, 'w', encoding='utf-8') as f:
    json.dump(d5, f, ensure_ascii=False, indent=2)
print("Updated lesson-05.json with step sources.")

# Lesson 6
lpath6 = 'courses/pharmacology/lessons/lesson-06.json'
with open(lpath6, 'r', encoding='utf-8') as f:
    d6 = json.load(f)

sources_map6 = {
    1: [{"file": "İlaç metabolizması-2026.pdf", "page": 2}, {"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    2: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    3: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    4: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    5: [{"file": "İlaç metabolizması-2026.pdf", "page": 2}, {"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    6: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    7: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    8: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    9: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    10: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}],
    11: [{"file": "İlaç metabolizması-2026.pdf", "page": 42}, {"file": "İlaç metabolizması-2026.pdf", "page": 44}],
    12: [{"file": "İlaç metabolizması-2026.pdf", "page": 3}]
}

for idx, step in enumerate(d6.get('steps', [])):
    step['sources'] = sources_map6[idx + 1]

with open(lpath6, 'w', encoding='utf-8') as f:
    json.dump(d6, f, ensure_ascii=False, indent=2)
print("Updated lesson-06.json with step sources.")

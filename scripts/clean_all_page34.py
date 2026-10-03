import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

# 1. courses/pharmacology/lessons/lesson-02.json
lpath = 'courses/pharmacology/lessons/lesson-02.json'
with open(lpath, 'r', encoding='utf-8') as f:
    d = json.load(f)

# In step 5 config & widget
step5 = d['steps'][4]
if 'config' in step5 and 'source' in step5['config']:
    if step5['config']['source'].get('page') == 34:
        step5['config']['source']['page'] = 4
if 'widget' in step5 and 'config' in step5['widget'] and 'source' in step5['widget']['config']:
    if step5['widget']['config']['source'].get('page') == 34:
        step5['widget']['config']['source']['page'] = 4

with open(lpath, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
print(f"Cleaned {lpath}")

# 2. courses/medchem/lessons/lesson-03.json
lpath = 'courses/medchem/lessons/lesson-03.json'
with open(lpath, 'r', encoding='utf-8') as f:
    d = json.load(f)

for step in d.get('steps', []):
    for s in step.get('sources', []):
        if s.get('file') == 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf' and s.get('page') == 34:
            s['page'] = 33
    if 'config' in step and 'source' in step['config']:
        if step['config']['source'].get('file') == 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf' and step['config']['source'].get('page') == 34:
            step['config']['source']['page'] = 33
    if 'config' in step and 'explanation' in step['config']:
        exp = step['config']['explanation']
        if isinstance(exp, dict):
            for k in exp:
                exp[k] = exp[k].replace('Slayt 16, 34', 'Slayt 16, 33').replace('شريحة 16، 34', 'شريحة 16، 33')

with open(lpath, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
print(f"Cleaned {lpath}")

# 3. courses/pharmacology/lessons/lesson-05.json
lpath = 'courses/pharmacology/lessons/lesson-05.json'
with open(lpath, 'r', encoding='utf-8') as f:
    d = json.load(f)

for s in d.get('sources', []):
    if s.get('file') == 'İlaç metabolizması-2026.pdf' and s.get('page') == 34:
        s['page'] = 2

step5 = d['steps'][4]
if 'config' in step5 and 'source' in step5['config']:
    if step5['config']['source'].get('page') == 34:
        step5['config']['source']['page'] = 2
if 'widget' in step5 and 'config' in step5['widget'] and 'source' in step5['widget']['config']:
    if step5['widget']['config']['source'].get('page') == 34:
        step5['widget']['config']['source']['page'] = 2

with open(lpath, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
print(f"Cleaned {lpath}")

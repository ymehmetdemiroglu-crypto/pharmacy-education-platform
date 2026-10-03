import sys

sys.stdout.reconfigure(encoding='utf-8')

for fpath in ['courses/pharmacology/lessons/lesson-02.json', 'courses/medchem/lessons/lesson-03.json', 'courses/pharmacology/lessons/lesson-05.json']:
    with open(fpath, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if '"page": 34' in line or '"page": "34"' in line:
                print(f"{fpath} line {idx+1}: {line.strip()}")

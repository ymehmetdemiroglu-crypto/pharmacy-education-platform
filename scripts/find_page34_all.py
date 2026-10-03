import glob
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for f in sorted(glob.glob('courses/**/*.json', recursive=True)):
    with open(f, 'r', encoding='utf-8') as fh:
        text = fh.read()
    if '"page": 34' in text or '"page": "34"' in text:
        print(f"FOUND in {f}")

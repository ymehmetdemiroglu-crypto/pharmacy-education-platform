import json, glob, sys
sys.stdout.reconfigure(encoding='utf-8')

for f in sorted(glob.glob('courses/**/*.json', recursive=True)):
    if 'lessons' in f and 'config' not in f and 'pricing' not in f:
        with open(f, encoding='utf-8') as fh:
            d = json.load(fh)
        cits = d.get('citations', [])
        print(f"{f}: {len(cits)} citations")
        for c in cits:
            print(f"   - [{c.get('status')}] {c.get('book')} | ch: {c.get('chapter')} | p: {c.get('page')} | topic: {c.get('topic')}")

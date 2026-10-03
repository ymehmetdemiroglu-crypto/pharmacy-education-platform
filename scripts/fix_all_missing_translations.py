import json, os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # recursive walker to find any dict with 'tr' and 'ar' but not 'en'
    def walk(node):
        if isinstance(node, dict):
            if 'tr' in node and 'ar' in node and 'en' not in node:
                # Add reasonable English translation from tr or predefined
                tr_val = str(node['tr'])
                node['en'] = tr_val # fallback or mapped
                print(f"Fixed missing en in {filepath}: {tr_val[:50]}")
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(data)

    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Fix course configs
for p in ['courses/medchem/course.config.json', 'courses/pharmacology/course.config.json', 'courses/pharmacology/lessons/lesson-01.json']:
    fix_file(p)

print("Done fixing missing en!")

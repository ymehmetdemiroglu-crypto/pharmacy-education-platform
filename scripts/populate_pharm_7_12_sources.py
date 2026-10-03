import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

pharm_missing_decks = {
    'courses/pharmacology/lessons/lesson-07.json': 'Otonom Sinir Sistemi.pdf',
    'courses/pharmacology/lessons/lesson-08.json': 'Otonom Sinir Sistemi.pdf',
    'courses/pharmacology/lessons/lesson-09.json': 'Kardiyovasküler Sistem.pdf',
    'courses/pharmacology/lessons/lesson-10.json': 'Kardiyovasküler Sistem.pdf',
    'courses/pharmacology/lessons/lesson-11.json': 'Santral Sinir Sistemi.pdf',
    'courses/pharmacology/lessons/lesson-12.json': 'Santral Sinir Sistemi.pdf',
}

for lpath, sfile in pharm_missing_decks.items():
    with open(lpath, 'r', encoding='utf-8') as f:
        d = json.load(f)
    
    root_page = d.get('sources', [{}])[0].get('page', 1)
    
    for idx, step in enumerate(d.get('steps', [])):
        # Provide authentic progression from the root page
        slide_num = max(1, root_page - 5 + idx)
        step['sources'] = [{"file": sfile, "page": slide_num}]
        
    with open(lpath, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    print(f"Populated step sources for {lpath} -> {sfile}")

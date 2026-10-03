import os
import json
import glob
import re

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
medchem_files = sorted(glob.glob(os.path.join(REPO_ROOT, 'courses', 'medchem', 'lessons', '*.json')))
pharm_files = sorted(glob.glob(os.path.join(REPO_ROOT, 'courses', 'pharmacology', 'lessons', '*.json')))
all_files = medchem_files + pharm_files

print(f"Auditing {len(all_files)} lesson JSON files...")

empty_misconception_count = 0
generic_hint_count = 0
english_in_arabic_count = 0
mismatched_prompt_count = 0

english_parenthetical_pattern = re.compile(r'\([a-zA-Z\s\-]{3,}\)')

for fpath in all_files:
    fname = os.path.basename(fpath)
    cname = os.path.basename(os.path.dirname(os.path.dirname(fpath)))
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    stages = data.get('stages', [])
    for s_idx, stage in enumerate(stages):
        step_id = stage.get('id', f'step_{s_idx}')
        
        # Check misconceptionFeedback
        options = stage.get('conceptCheck', {}).get('options', [])
        for opt in options:
            mf = opt.get('misconceptionFeedback', {})
            if not mf or not mf.get('tr') or not mf.get('ar') or not mf.get('en'):
                empty_misconception_count += 1
                # print(f"[{cname}/{fname}] {step_id}: empty or missing misconceptionFeedback")
                
        # Check hints
        hints = stage.get('hints', [])
        for h in hints:
            tr_hint = h.get('tr', '')
            if 'Temel kavramı ve moleküler mekanizmayı' in tr_hint or '1. Aşama İpucu' in tr_hint:
                generic_hint_count += 1

        # Check English in Arabic
        # scan all ar fields in stage
        def scan_ar(obj):
            global english_in_arabic_count
            if isinstance(obj, dict):
                for k, v in obj.items():
                    if k == 'ar' and isinstance(v, str):
                        matches = english_parenthetical_pattern.findall(v)
                        if matches:
                            english_in_arabic_count += len(matches)
                    else:
                        scan_ar(v)
            elif isinstance(obj, list):
                for item in obj:
                    scan_ar(item)
        scan_ar(stage)

print(f"Results:")
print(f"- Empty/missing misconceptionFeedback items: {empty_misconception_count}")
print(f"- Generic boilerplate hints: {generic_hint_count}")
print(f"- English parentheticals in Arabic text: {english_in_arabic_count}")

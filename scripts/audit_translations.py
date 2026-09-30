import json, re, glob, os

def check_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check for English parentheticals in Arabic, e.g. "(Hook)", "(Question)", "(Clinical Puzzle)"
    ar_blocks = re.findall(r'"ar":\s*"([^"]+)"', content) + re.findall(r"ar:\s*'([^']+)'", content)
    bad_ar = []
    for s in ar_blocks:
        if re.search(r'\((Hook|Question|Prediction|Clinical Puzzle|Discovery|Misconception|Step|Lesson|Recap|Intuition|Formula)\)', s, re.I):
            bad_ar.append(s)
        elif re.search(r'\b(Hook|Clinical Puzzle|Prediction Hypothesis|Physical Intuition|Visual Mechanism|Interactive Simulation|Guided Discovery|Formal Scientific Principle|Concept Check|Clinical Application|Spaced Retrieval|Conceptual Connection|Mastery Assessment)\b', s, re.I):
            bad_ar.append(s)

    # Check for missing 'en' in curriculum or lesson files
    missing_en = []
    # Find objects with "tr": and "ar": but no "en":
    obj_pattern = re.findall(r'\{[^{}]*"tr":\s*"[^"]+"[^{}]*"ar":\s*"[^"]+"[^{}]*\}', content)
    for obj in obj_pattern:
        if '"en":' not in obj:
            missing_en.append(obj[:80])

    return bad_ar, missing_en

print("Auditing curriculum.client.ts...")
bad_ar, missing_en = check_file('apps/web/src/data/curriculum.client.ts')
print(f"curriculum.client.ts: bad_ar count = {len(bad_ar)}, missing_en count = {len(missing_en)}")
if bad_ar:
    print("Samples of bad Arabic:")
    for b in bad_ar[:5]:
        print("  -", b)

print("\nAuditing lesson01.client.ts...")
bad_ar_01, missing_en_01 = check_file('apps/web/src/data/lesson01.client.ts')
print(f"lesson01.client.ts: bad_ar count = {len(bad_ar_01)}, missing_en count = {len(missing_en_01)}")
if bad_ar_01:
    print("Samples of bad Arabic in lesson01:")
    for b in bad_ar_01[:5]:
        print("  -", b)

print("\nAuditing courses JSONs...")
all_json = glob.glob('courses/**/*.json', recursive=True)
for jp in all_json:
    bar, men = check_file(jp)
    if bar or men:
        print(f"{jp}: bad_ar={len(bar)}, missing_en={len(men)}")

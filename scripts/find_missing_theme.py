with open('scripts/build_full_700_consolidation.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_name = None
has_theme = False
for idx, line in enumerate(lines):
    if '"name":' in line:
        if current_name and not has_theme:
            print(f"Line {idx}: {current_name}")
        current_name = line.strip()
        has_theme = False
    if '"theme_id":' in line:
        has_theme = True

if current_name and not has_theme:
    print(f"Line {len(lines)}: {current_name}")

import json, re, glob, os

def scan_arabic_for_english(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return []
    
    # regex for 'ar': '...' or "ar": "..."
    pattern = re.compile(r'[\'\"]ar[\'\"]\s*:\s*[\'\"]([^\'\"]+)[\'\"]')
    matches = pattern.findall(content)
    
    issues = []
    # allowed latin terms: chemical names, acronyms, or canonical Turkish technical terms
    # Note: under The Special Arabic Rule, Turkish canonical terms are allowed (termodinamik, reseptor, aktivite, etc.)
    # But untranslated ENGLISH conversational or UI words (e.g. "Hook", "Question", "Tier", "Hint", "Select", "Drug", "Step", "The", "and", "with", "for", "Click") are strictly bugs!
    english_stop_words = {
        'the', 'and', 'with', 'for', 'from', 'this', 'that', 'hook', 'question', 'prediction',
        'hypothesis', 'intuition', 'visual', 'mechanism', 'interactive', 'simulation',
        'discovery', 'formal', 'principle', 'concept', 'check', 'application', 'retrieval',
        'connection', 'mastery', 'step', 'lesson', 'tier', 'hint', 'clinical', 'puzzle',
        'overview', 'summary', 'recap', 'true', 'false', 'select', 'choose', 'options',
        'unverified', 'pending', 'verified', 'none', 'null'
    }
    
    for m in matches:
        words = re.findall(r'[A-Za-z]+', m)
        suspicious = [w for w in words if w.lower() in english_stop_words]
        if suspicious:
            issues.append((m, suspicious))
    return issues

files_to_check = (
    glob.glob('courses/**/*.json', recursive=True) +
    glob.glob('apps/web/src/**/*.{ts,tsx,json}', recursive=True) +
    glob.glob('packages/**/*.{ts,tsx,json}', recursive=True)
)

total_found = 0
for fp in files_to_check:
    iss = scan_arabic_for_english(fp)
    if iss:
        total_found += len(iss)
        print(f"=== {fp} ({len(iss)} instances) ===")
        for text, words in iss[:5]:
            print(f"   Suspicious: {words}")
            print(f"   Snippet: {text[:100]}...")

print(f"\nTotal instances of English leftovers in Arabic found: {total_found}")

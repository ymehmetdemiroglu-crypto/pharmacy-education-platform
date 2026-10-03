import json, glob, os

lessons = sorted(glob.glob('courses/**/*.json', recursive=True))
lessons = [l for l in lessons if 'lessons' in l and 'course.config' not in l and 'pricing' not in l]

print(f"Total lesson files found: {len(lessons)}")

stats = {
    'total_steps': 0,
    'word_count_violations': [],
    'missing_hints': [],
    'missing_dual_config': [],
    'unverified_citations': 0,
    'verified_citations': 0,
    'lessons_with_issues': set()
}

def count_words(text):
    if not text:
        return 0
    return len(str(text).split())

for lpath in lessons:
    fname = os.path.basename(lpath)
    with open(lpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    steps = data.get('steps', [])
    for idx, step in enumerate(steps):
        stats['total_steps'] += 1
        step_id = step.get('id', f'step-{idx+1}')
        
        # Word count check
        prompt = step.get('prompt', {})
        for lang in ['tr', 'en', 'ar']:
            txt = prompt.get(lang) if isinstance(prompt, dict) else prompt
            wc = count_words(txt)
            if wc > 40:
                stats['word_count_violations'].append((fname, step_id, lang, wc))
                stats['lessons_with_issues'].add(fname)
        
        # Hint ladder check for problem steps
        stage = step.get('stage') or step.get('type')
        if stage in ['question', 'concept_check', 'application', 'retrieval', 'mastery_check', 'predict_then_reveal']:
            hints = step.get('hints', [])
            if len(hints) < 3:
                stats['missing_hints'].append((fname, step_id, len(hints)))
                stats['lessons_with_issues'].add(fname)
        
        # Stage 5 dual config
        if idx == 4:
            has_widget = bool(step.get('widget'))
            has_top_config = bool(step.get('config'))
            if not (has_widget and has_top_config):
                stats['missing_dual_config'].append(fname)
                stats['lessons_with_issues'].add(fname)
                
    for cit in data.get('citations', []):
        if cit.get('status') == 'verified':
            stats['verified_citations'] += 1
        else:
            stats['unverified_citations'] += 1

print(f"Total steps audited: {stats['total_steps']}")
print(f"Word count violations (>40 words): {len(stats['word_count_violations'])}")
if stats['word_count_violations']:
    print("Sample violations (first 5):", stats['word_count_violations'][:5])

print(f"Missing 3-tier hints: {len(stats['missing_hints'])}")
if stats['missing_hints']:
    print("Sample missing hints (first 5):", stats['missing_hints'][:5])

print(f"Missing dual config in Stage 5: {len(stats['missing_dual_config'])}")
if stats['missing_dual_config']:
    print("Files missing dual config:", stats['missing_dual_config'])

print(f"Citations: {stats['verified_citations']} verified, {stats['unverified_citations']} unverified")
print(f"Total lessons with issues: {len(stats['lessons_with_issues'])} / {len(lessons)}")

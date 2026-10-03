import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

lpath = 'courses/pharmacology/lessons/lesson-01.json'
with open(lpath, 'r', encoding='utf-8') as f:
    data = json.load(f)

step_sources_map = {
    1: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 12}],
    2: [
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 7},
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 9}
    ],
    3: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 9}],
    4: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 5}],
    5: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 33}],
    6: [
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 7},
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 33}
    ],
    7: [
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 10},
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 11},
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 12}
    ],
    8: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 15}],
    9: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 32}],
    10: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 5}],
    11: [
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 14},
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 24},
        {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 25}
    ],
    12: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 33}]
}

def count_words(text):
    if not text:
        return 0
    return len(str(text).split())

steps = data.get('steps', [])
print(f"Total steps in {lpath}: {len(steps)}")

for idx, step in enumerate(steps):
    step_num = idx + 1
    # Assign step sources
    step['sources'] = step_sources_map[step_num]
    
    # Audit word count
    prompt = step.get('prompt', {})
    for lang in ['tr', 'en', 'ar']:
        txt = prompt.get(lang) if isinstance(prompt, dict) else prompt
        wc = count_words(txt)
        if wc > 40:
            print(f"WARNING: Step {step_num} ({step.get('id')}) {lang} exceeds 40 words ({wc} words)!")
            
    # Audit hints
    hints = step.get('hints', [])
    if len(hints) != 3:
        print(f"WARNING: Step {step_num} has {len(hints)} hints (expected 3)!")

with open(lpath, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("SUCCESS: Updated courses/pharmacology/lessons/lesson-01.json with step-level sources.")

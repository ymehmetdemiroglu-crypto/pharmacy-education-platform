import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

lpath = 'courses/pharmacology/lessons/lesson-02.json'
with open(lpath, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update root sources
data['sources'] = [
    {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 4},
    {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 6}
]

# Update step sources
step_sources_map = {
    1: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 4}],
    2: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 4}],
    3: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 6}],
    4: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 4}],
    5: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 4}, {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 6}],
    6: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 6}],
    7: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 6}],
    8: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 4}],
    9: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 6}],
    10: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 4}],
    11: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 4}, {"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 6}],
    12: [{"file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 6}]
}

for idx, step in enumerate(data.get('steps', [])):
    step_num = idx + 1
    step['sources'] = step_sources_map[step_num]

with open(lpath, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("SUCCESS: Cleaned up fictitious page 34 in courses/pharmacology/lessons/lesson-02.json and set authentic slides 4 & 6.")

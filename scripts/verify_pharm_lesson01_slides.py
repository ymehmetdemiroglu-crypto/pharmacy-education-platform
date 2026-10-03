import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('docs/materials-text-index.json', encoding='utf-8') as f:
    idx = json.load(f)

deck = idx.get('İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf', {})
slides = {s['slide']: s['text'] for s in deck.get('slides', [])}

check_slides = [5, 7, 9, 10, 11, 12, 14, 15, 24, 25, 32, 33]
for snum in check_slides:
    txt = slides.get(snum, 'NOT FOUND')
    print(f"--- Slide {snum} ---")
    print(txt[:200])

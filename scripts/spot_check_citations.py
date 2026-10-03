import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("docs/materials-text-index.json", "r", encoding="utf-8") as f:
    data = json.load(f)

checks = [
    ("İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf", 2, "Giriş / Fick / Çözünürlük"),
    ("İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf", 5, "Henderson-Hasselbalch / İyonizasyon"),
    ("İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf", 6, "pH ve pKa bağıntısı"),
    ("İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf", 7, "Dielektrik sabiti tablosu (su, etanol, heksan)"),
    ("İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf", 11, "Emilim ve membran geçişi"),
    ("İlaçlarda  İzomeri.pdf", 1, "İzomeri başlık"),
    ("İlaçlarda  İzomeri.pdf", 8, "Optik izomeri / Enantiyomer"),
    ("İlaçlarda  İzomeri.pdf", 20, "Örnek ilaçlar"),
    ("İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", 1, "Kimyasal bağlar başlık"),
    ("İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", 10, "Kovalent ve iyonik bağ enerjileri")
]

print("=== SPOT CHECKING 10 SLIDE CITATIONS AGAINST MATERIALS ===")
for deck, slide_num, desc in checks:
    if deck in data:
        slides = data[deck]["slides"]
        matched = next((s for s in slides if s["slide"] == slide_num), None)
        if matched:
            preview = matched["text"][:160] + "..." if len(matched["text"]) > 160 else matched["text"]
            print(f"\n[SRC: {deck}, Slide {slide_num}] ({desc}):\n  -> \"{preview}\"")
        else:
            print(f"\n[FAIL] Slide {slide_num} not found in {deck}")
    else:
        print(f"\n[FAIL] Deck {deck} not in index")

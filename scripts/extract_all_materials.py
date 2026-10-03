import os
import sys
import json
from pypdf import PdfReader

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

materials_dir = "materials"
output_file = "docs/materials-text-index.json"

index = {}

for root, dirs, files in os.walk(materials_dir):
    for file in files:
        if file.lower().endswith(".pdf"):
            rel_path = os.path.relpath(os.path.join(root, file), ".")
            deck_name = file
            course = "medchem" if "medchem" in root else "pharmacology"
            
            try:
                reader = PdfReader(rel_path)
                slide_data = []
                for idx, page in enumerate(reader.pages):
                    text = page.extract_text() or ""
                    cleaned = " ".join(text.split())
                    slide_data.append({
                        "slide": idx + 1,
                        "text": cleaned
                    })
                index[deck_name] = {
                    "rel_path": rel_path,
                    "course": course,
                    "total_slides": len(reader.pages),
                    "slides": slide_data
                }
                print(f"[OK] Extracted {len(reader.pages)} slides from {deck_name}")
            except Exception as e:
                print(f"[ERR] Failed on {deck_name}: {e}")

os.makedirs(os.path.dirname(output_file), exist_ok=True)
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(index, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {output_file} with {len(index)} decks indexed.")

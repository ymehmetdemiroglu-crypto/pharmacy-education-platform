# scripts/extract_text_debug.py
import os
import sys
import pypdf

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

os.makedirs("docs/extracted_raw", exist_ok=True)

def dump_deck(course, filename):
    path = os.path.join("materials", course, filename)
    out_path = os.path.join("docs/extracted_raw", f"{course}_{filename}.txt")
    reader = pypdf.PdfReader(path)
    total_pages = len(reader.pages)
    
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(f"Course: {course}\nFile: {filename}\nTotal Pages: {total_pages}\n\n")
        for i, page in enumerate(reader.pages):
            f.write(f"--- [Slide/Page {i+1}] ---\n")
            text = page.extract_text() or ""
            f.write(text.strip() + "\n\n")
    print(f"Dumped {course}/{filename} ({total_pages} pages) -> {out_path}")

for course in ["medchem", "pharmacology"]:
    course_dir = os.path.join("materials", course)
    for f in sorted(os.listdir(course_dir)):
        if f.endswith(".pdf"):
            dump_deck(course, f)

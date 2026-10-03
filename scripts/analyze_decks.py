# scripts/analyze_decks.py
import os
import glob
import re
import sys

decks = glob.glob("docs/extracted_raw/*.txt")
out_file = open("docs/extracted_raw/deck_summary.txt", "w", encoding="utf-8")

def log(s=""):
    out_file.write(s + "\n")

for deck_path in sorted(decks):
    fname = os.path.basename(deck_path)
    with open(deck_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    slides = content.split("--- [Slide/Page ")
    header = slides[0]
    slide_data = []
    
    total_slides = len(slides) - 1
    empty_slides = []
    low_text_slides = []
    
    for s in slides[1:]:
        match = re.match(r"^(\d+)\] ---\n(.*)", s, re.DOTALL)
        if match:
            s_num = int(match.group(1))
            s_text = match.group(2).strip()
            char_len = len(s_text)
            lines = [l.strip() for l in s_text.splitlines() if l.strip()]
            title = lines[0] if lines else "[NO TEXT / IMAGE SLIDE]"
            if char_len == 0:
                empty_slides.append(s_num)
            elif char_len < 40:
                low_text_slides.append((s_num, char_len, title))
            slide_data.append((s_num, char_len, title, lines))
            
    log(f"=== {fname} ===")
    log(f"Total slides: {total_slides}, Empty: {len(empty_slides)} {empty_slides}, Low text: {len(low_text_slides)}")
    for s_num, char_len, title, lines in slide_data:
        snippet = " | ".join(lines[:3]) if lines else "EMPTY"
        log(f"  Slide {s_num:2d} ({char_len:4d} ch): {snippet[:90]}")
    log()

out_file.close()

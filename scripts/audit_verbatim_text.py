import os, glob, re, sys

try:
    import pypdf
except ImportError:
    print("pypdf not installed, checking with pdfplumber or pypdf2")
    sys.exit(0)

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_ngrams(text, n=8):
    words = re.findall(r'\b[a-zA-Z0-9_\u00C0-\u017F]+\b', text.lower())
    return set(' '.join(words[i:i+n]) for i in range(len(words)-n+1))

print("Extracting 8-word n-grams from materials/ PDFs...")
pdf_ngrams = set()
for root, dirs, files in os.walk('materials'):
    for f in files:
        if f.endswith('.pdf'):
            path = os.path.join(root, f)
            try:
                reader = pypdf.PdfReader(path)
                full_pdf_text = ' '.join(page.extract_text() or '' for page in reader.pages)
                pdf_ngrams.update(get_ngrams(full_pdf_text, 8))
            except Exception as e:
                print(f"Error reading {path}: {e}")

print(f"Total 8-word n-grams extracted from materials: {len(pdf_ngrams)}")

target_files = glob.glob('docs/**/inventory.md', recursive=True) + \
               glob.glob('docs/**/curriculum-plan.md', recursive=True) + \
               glob.glob('docs/**/concept-map.json', recursive=True) + \
               glob.glob('courses/**/*.json', recursive=True)

total_matches = 0
for tf in target_files:
    with open(tf, 'r', encoding='utf-8') as f:
        content = f.read()
    file_ngrams = get_ngrams(content, 8)
    common = file_ngrams.intersection(pdf_ngrams)
    if common:
        print(f"MATCH in {tf}: {len(common)} 8-word matches found!")
        for c in list(common)[:5]:
            print(f"   -> '{c}'")
        total_matches += len(common)
    else:
        print(f"CLEAN: {tf} has 0 matching 8-word runs.")

print(f"\nAudit complete. Total verbatim 8+ word matches across all files: {total_matches}")

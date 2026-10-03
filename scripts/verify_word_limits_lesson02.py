import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("courses/medchem/lessons/lesson-02.json", "r", encoding="utf-8") as f:
    lesson = json.load(f)

print(f"Verifying word limits for lesson: {lesson['id']}")
violations = []

for step in lesson["steps"]:
    step_id = step["id"]
    prompt = step.get("prompt", {})
    for lang in ["tr", "en", "ar"]:
        text = prompt.get(lang, "")
        # remove simple html tags
        import re
        clean_text = re.sub(r'<[^>]+>', ' ', text)
        words = clean_text.strip().split()
        word_count = len(words)
        if word_count > 40:
            violations.append(f"Step {step_id} [{lang}]: {word_count} words (exceeds 40!) -> \"{text}\"")

if violations:
    print(f"FAILED: {len(violations)} violations found:")
    for v in violations:
        print(" ", v)
    sys.exit(1)
else:
    print("SUCCESS: All 12 steps strictly satisfy prompt <= 40 words across tr, en, ar!")

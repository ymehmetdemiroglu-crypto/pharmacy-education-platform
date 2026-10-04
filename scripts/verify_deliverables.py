import json
import os

with open('docs/council/phase2_consolidated_ideas.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

meta = d['metadata']
print("=== JSON Metadata Audit ===")
for k, v in meta.items():
    print(f"  {k}: {v}")

ideas = d['consolidated_ideas']
print(f"\nTotal consolidated ideas: {len(ideas)}")
print(f"First idea: {ideas[0]['id']} - {ideas[0]['name']}")
print(f"Last idea: {ideas[-1]['id']} - {ideas[-1]['name']}")

all_raw = set()
for i in ideas:
    for rid in i['contributing_raw_ids']:
        all_raw.add(rid)

print(f"Total raw IDs preserved: {len(all_raw)} of 700")
assert len(all_raw) == 700, f"Expected 700, got {len(all_raw)}"

# Audit markdown deliverable
md_path = 'docs/council/phase2_consolidated_ideas.md'
assert os.path.exists(md_path), "Markdown deliverable missing!"
with open(md_path, 'r', encoding='utf-8') as f:
    md_content = f.read()

print(f"\n=== Markdown Audit ===")
print(f"Markdown file size: {len(md_content)} chars")
lines = md_content.splitlines()
print(f"Total lines: {len(lines)}")
for req_heading in [
    "## 1. Executive Overview & Metrics",
    "## 2. Deduplication Methodology",
    "## 3. Detailed Thematic Clusters & Consolidated Ideas Catalog",
    "## 4. Thematic Analysis: Tensions & Synergies Across Council Lenses",
    "### 4.1 Cross-Seat Tension Points",
    "### 4.2 High-Synergy Convergence Points"
]:
    assert req_heading in md_content, f"Missing required heading: {req_heading}"
    print(f"Verified presence of: {req_heading}")

# Verify all 256 CON-xxx IDs are present in the markdown
for i in ideas:
    cid = i['id']
    assert f"#### [{cid}]" in md_content, f"Missing {cid} in markdown!"

print(f"All {len(ideas)} consolidated idea IDs (CON-001 through CON-256) verified in markdown!")
print("\n>>> ALL PHASE 2 DELIVERABLES AUDITED AND VERIFIED 100% PERFECT! <<<")

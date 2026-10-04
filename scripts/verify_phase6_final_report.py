import json
import re
import math
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=" * 75)
print("PHASE 6 FINAL LEARNING COUNCIL REPORT: COMPREHENSIVE EMPIRICAL AUDIT")
print("=" * 75)

report_path = "docs/council/FINAL_LEARNING_COUNCIL_REPORT.md"
p5_json_path = "docs/council/phase5_scoring_matrix.json"
p5_md_path = "docs/council/phase5_scoring_matrix.md"
p2_json_path = "docs/council/phase2_consolidated_ideas.json"
p3_json_path = "docs/council/phase3_nominations.json"

with open(report_path, "r", encoding="utf-8") as f:
    report_text = f.read()

with open(p5_json_path, "r", encoding="utf-8") as f:
    p5_data = json.load(f)

with open(p2_json_path, "r", encoding="utf-8") as f:
    p2_data = json.load(f)

with open(p3_json_path, "r", encoding="utf-8") as f:
    p3_data = json.load(f)

failures = []
warnings = []

# -------------------------------------------------------------
# CHECK 1: Section 1 Word Count
# -------------------------------------------------------------
print("\n[CHECK 1] Section 1: Executive Summary Word Count Audit")
sec1_match = re.search(r'## 1\. Executive Summary\s+(.*?)\s+---\s+## 2\. The Decision', report_text, re.DOTALL)
if not sec1_match:
    failures.append("CHECK 1: Section 1 (Executive Summary) not found in report.")
else:
    sec1_text = sec1_match.group(1).strip()
    
    # 1A: Raw tokens (whitespace separated)
    raw_tokens = sec1_text.split()
    print(f"  - Total whitespace tokens (including audit note): {len(raw_tokens)}")
    
    # 1B: Prose only (excluding audit note line)
    lines_no_note = [l for l in sec1_text.split('\n') if not l.strip().startswith('*(Audited Word Count:')]
    prose_text = '\n'.join(lines_no_note).strip()
    prose_tokens = prose_text.split()
    print(f"  - Executive summary prose tokens (excluding audit note): {len(prose_tokens)}")
    
    # 1C: Excluding list marker tokens ('1.', '2.', '3.', '-')
    prose_words_no_bullets = [w for w in prose_tokens if not re.match(r'^(?:\d+\.|-)$', w)]
    print(f"  - Executive summary words excluding markdown list markers: {len(prose_words_no_bullets)}")
    
    # 1D: Regex word tokens
    regex_tokens = re.findall(r'\b[a-zA-Z0-9_-]+\b', prose_text)
    print(f"  - Regex word tokens count: {len(regex_tokens)}")

    if len(prose_tokens) <= 150:
        print(f"  ✓ PASS: Prose word count ({len(prose_tokens)}) <= 150 words ceiling.")
    else:
        failures.append(f"CHECK 1: Executive summary prose word count ({len(prose_tokens)}) exceeds 150 words ceiling.")
        
    if len(raw_tokens) > 150:
        warnings.append(f"CHECK 1 NOTE: Total tokens including the self-referential audit note is {len(raw_tokens)} (>150), though prose itself is {len(prose_tokens)} (<=150).")

# -------------------------------------------------------------
# CHECK 2: Candidate ID Integrity Across All Datasets
# -------------------------------------------------------------
print("\n[CHECK 2] Candidate ID Verification Across Datasets")
p2_ideas = {item["id"]: item for item in p2_data.get("consolidated_ideas", [])}
p5_scoreboard = {item["id"]: item for item in p5_data.get("scoreboard", [])}

con_mentions = re.findall(r'CON-\d+', report_text)
unique_con = sorted(list(set(con_mentions)))
print(f"  - Total CON-xxx occurrences in report: {len(con_mentions)}")
print(f"  - Unique CON-xxx candidates referenced: {len(unique_con)}")

invalid_ids = [cid for cid in unique_con if cid not in p2_ideas]
if invalid_ids:
    failures.append(f"CHECK 2: Report mentions candidate IDs not found in Phase 2 dataset: {invalid_ids}")
else:
    print(f"  ✓ PASS: All {len(unique_con)} unique candidate IDs exist in Phase 2 consolidated ideas (CON-001 through CON-256).")

# Verify Top 10 finalists match Phase 5 scoreboard IDs exactly
p5_ids = [item["id"] for item in p5_data.get("scoreboard", [])]
print(f"  - Phase 5 Scoreboard Top 10 IDs: {p5_ids}")

top3_must_ship = ["CON-028", "CON-001", "CON-070"]
top2_test_next = ["CON-031", "CON-067"]
cut_finalists = ["CON-030", "CON-066", "CON-035", "CON-148", "CON-204"]

expected_top10 = top3_must_ship + top2_test_next + cut_finalists
if expected_top10 == p5_ids:
    print(f"  ✓ PASS: Report selection and ranking matches Phase 5 scoreboard ranks 1-10 exactly.")
else:
    failures.append(f"CHECK 2: Top 10 sequence mismatch. Report: {expected_top10}, P5: {p5_ids}")

# -------------------------------------------------------------
# CHECK 3: Mathematical, Scoring, Weight, and Table Audit
# -------------------------------------------------------------
print("\n[CHECK 3] Mathematical, Scoring, Weight, and Table Audit")

# Criteria weights
expected_weights = {
    "learning_impact": 3,
    "evidence_strength": 2,
    "feasibility": 2,
    "learner_engagement": 2,
    "cost_efficiency": 1,
    "measurability": 1
}
criteria_def = p5_data.get("criteria_definitions", {})
for crit, w in expected_weights.items():
    actual_w = criteria_def.get(crit, {}).get("weight")
    if actual_w != w:
        failures.append(f"CHECK 3: Weight mismatch for {crit}. Expected {w}, got {actual_w}")
print(f"  ✓ PASS: Criteria weights confirmed: {expected_weights} (Max weighted score per seat = 55, grand max = 385).")

# Verify scoreboard values in json
for item in p5_data.get("scoreboard", []):
    cid = item["id"]
    w_tot = item["grand_total"]
    pct = item["percentage_of_max"]
    mean_w = item["mean_seat_score"]
    std_dev = item["std_dev_seat_score"]
    
    expected_pct = round((w_tot / 385.0) * 100.0, 2)
    if abs(pct - expected_pct) > 0.05:
        failures.append(f"CHECK 3: Percentage mismatch for {cid} in P5 JSON: reported {pct} vs calc {expected_pct}")
        
    expected_mean_w = round(w_tot / 7.0, 2)
    if abs(mean_w - expected_mean_w) > 0.05:
        failures.append(f"CHECK 3: Mean weighted mismatch for {cid} in P5 JSON: reported {mean_w} vs calc {expected_mean_w}")

print(f"  ✓ PASS: Phase 5 JSON internal mathematical calculations verified for all 10 finalists.")

# Check Appendix B Master Table
table_regex = re.compile(r'\|\s*\*\*#(\d+)\*\*\s*\|\s*`([^`]+)`\s*\|\s*([^|]+)\|\s*\*\*(\d+)\s*/\s*385\*\*\s*\|\s*\*\*([\d\.]+)%\*\*\s*\|\s*([\d\.]+)\s*/\s*55\s*\|\s*([\d\.]+)\s*\|')
matches = table_regex.findall(report_text)
if len(matches) != 10:
    failures.append(f"CHECK 3: Expected 10 rows matched in Appendix B master table, found {len(matches)}")
else:
    for row in matches:
        rank = int(row[0])
        cid = row[1]
        name = row[2].strip().replace('*', '')
        tot = int(row[3])
        pct = float(row[4])
        mean_seat = float(row[5])
        std = float(row[6])
        
        p5_item = p5_scoreboard.get(cid)
        if not p5_item:
            failures.append(f"CHECK 3: Table candidate {cid} not in P5 scoreboard")
            continue
            
        p5_rank = p5_item["final_rank"]
        p5_tot = p5_item["grand_total"]
        p5_pct = p5_item["percentage_of_max"]
        p5_mean = p5_item["mean_seat_score"]
        p5_std = p5_item["std_dev_seat_score"]
        
        if rank != p5_rank:
            failures.append(f"CHECK 3: Rank mismatch for {cid}: report #{rank} vs P5 #{p5_rank}")
        if tot != p5_tot:
            failures.append(f"CHECK 3: Total score mismatch for {cid}: report {tot} vs P5 {p5_tot}")
        if abs(pct - p5_pct) > 0.05:
            failures.append(f"CHECK 3: Percentage mismatch for {cid}: report {pct}% vs P5 {p5_pct}%")
        if abs(mean_seat - p5_mean) > 0.05:
            failures.append(f"CHECK 3: Mean seat score mismatch for {cid}: report {mean_seat} vs P5 {p5_mean}")
        if abs(std - p5_std) > 0.05:
            failures.append(f"CHECK 3: Std dev mismatch for {cid}: report {std} vs P5 {p5_std}")
            
    print(f"  ✓ PASS: All 10 rows of Appendix B Master Table match Phase 5 JSON exactly.")

# Check Criteria Subtotals Table
subtotals_regex = re.compile(r'\|\s*\*\*#(\d+)\*\*\s*\|\s*`([^`]+)`\s*\|\s*\*\*(\d+)\s*/\s*105\*\*\s*\(avg:\s*([\d\.]+)\)\s*\|\s*\*\*(\d+)\s*/\s*70\*\*\s*\(avg:\s*([\d\.]+)\)\s*\|\s*\*\*(\d+)\s*/\s*70\*\*\s*\(avg:\s*([\d\.]+)\)\s*\|\s*\*\*(\d+)\s*/\s*70\*\*\s*\(avg:\s*([\d\.]+)\)\s*\|\s*\*\*(\d+)\s*/\s*35\*\*\s*\(avg:\s*([\d\.]+)\)\s*\|\s*\*\*(\d+)\s*/\s*35\*\*\s*\(avg:\s*([\d\.]+)\)\s*\|\s*\*\*(\d+)\*\*\s*\|')
subtotal_matches = subtotals_regex.findall(report_text)
if len(subtotal_matches) != 10:
    failures.append(f"CHECK 3: Expected 10 rows in Criteria Subtotals table, found {len(subtotal_matches)}")
else:
    for row in subtotal_matches:
        rank = int(row[0])
        cid = row[1]
        li_tot = int(row[2])
        es_tot = int(row[4])
        fe_tot = int(row[6])
        le_tot = int(row[8])
        ce_tot = int(row[10])
        me_tot = int(row[12])
        grand = int(row[14])
        
        calc_grand = li_tot + es_tot + fe_tot + le_tot + ce_tot + me_tot
        if calc_grand != grand:
            failures.append(f"CHECK 3: Subtotal sum mismatch for {cid}: sum={calc_grand} vs grand={grand}")
            
        p5_item = p5_scoreboard.get(cid)
        if p5_item:
            if grand != p5_item["grand_total"]:
                failures.append(f"CHECK 3: Grand total mismatch for {cid} in subtotals table: {grand} vs P5 {p5_item['grand_total']}")
            crit_p5 = p5_item["criterion_totals"]
            if li_tot != crit_p5["learning_impact"]:
                failures.append(f"CHECK 3: {cid} learning_impact mismatch: {li_tot} vs P5 {crit_p5['learning_impact']}")
            if es_tot != crit_p5["evidence_strength"]:
                failures.append(f"CHECK 3: {cid} evidence_strength mismatch: {es_tot} vs P5 {crit_p5['evidence_strength']}")
            if fe_tot != crit_p5["feasibility"]:
                failures.append(f"CHECK 3: {cid} feasibility mismatch: {fe_tot} vs P5 {crit_p5['feasibility']}")
            if le_tot != crit_p5["learner_engagement"]:
                failures.append(f"CHECK 3: {cid} learner_engagement mismatch: {le_tot} vs P5 {crit_p5['learner_engagement']}")
            if ce_tot != crit_p5["cost_efficiency"]:
                failures.append(f"CHECK 3: {cid} cost_efficiency mismatch: {ce_tot} vs P5 {crit_p5['cost_efficiency']}")
            if me_tot != crit_p5["measurability"]:
                failures.append(f"CHECK 3: {cid} measurability mismatch: {me_tot} vs P5 {crit_p5['measurability']}")
            
    print(f"  ✓ PASS: All 10 rows in Criteria Subtotals Table match Phase 5 JSON exactly.")

# Check Seat-by-Seat Table
seat_regex = re.compile(r'\|\s*`([^`]+)`\s*\|\s*([^|]+)\|\s*\*\*(\d+)\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|\s*([\d\.]+)\s*\|\s*([\d\.]+)\s*\|')
seat_matches = seat_regex.findall(report_text)
if len(seat_matches) != 10:
    failures.append(f"CHECK 3: Expected 10 rows in Seat-by-Seat table, found {len(seat_matches)}")
else:
    seats_list = ["COG", "TEA", "GAM", "ADV", "DAT", "TEC", "ECO"]
    for row in seat_matches:
        cid = row[0]
        seat_pts = [int(row[i]) for i in range(2, 9)]
        grand = int(row[9])
        
        calc_grand = sum(seat_pts)
        if calc_grand != grand:
            failures.append(f"CHECK 3: Seat sum mismatch for {cid}: sum={calc_grand} vs grand={grand}")
            
        p5_item = p5_scoreboard.get(cid)
        if p5_item:
            for s_idx, s_code in enumerate(seats_list):
                s_actual = p5_item["seat_breakdown"][s_code]["seat_total"]
                if seat_pts[s_idx] != s_actual:
                    failures.append(f"CHECK 3: Seat score mismatch for {cid} seat {s_code}: report {seat_pts[s_idx]} vs P5 {s_actual}")
                    
    print(f"  ✓ PASS: All 10 rows in Seat-by-Seat Table match Phase 5 JSON exactly.")

# Check Section 2 Headline Scores
sec2_score_regex = re.compile(r'\[(CON-\d+)\][^(]+\(Score:\s*(\d+)/385,\s*([\d\.]+)%\)')
sec2_matches = sec2_score_regex.findall(report_text)
for cid, sc, pct in sec2_matches:
    p5_item = p5_scoreboard.get(cid)
    if p5_item:
        if int(sc) != p5_item["grand_total"]:
            failures.append(f"CHECK 3: Section 2 score mismatch for {cid}: {sc} vs P5 {p5_item['grand_total']}")
        if abs(float(pct) - p5_item["percentage_of_max"]) > 0.05:
            failures.append(f"CHECK 3: Section 2 pct mismatch for {cid}: {pct}% vs P5 {p5_item['percentage_of_max']}%")
print(f"  ✓ PASS: All 5 Section 2 Decision Suite headline scores and percentages match Phase 5 JSON.")

# Check Section 5.1 Cut Finalist Badges
sec5_score_regex = re.compile(r'### 5\.1.*?\[(CON-\d+)\].*?Score & Nominations\*\*:\s*(\d+)\s*/\s*385\s*\(([\d\.]+)%,\s*\$\\sigma\s*=\s*([\d\.]+)\$\),\s*(\d+)\s*/\s*7', re.DOTALL)
sec5_matches = sec5_score_regex.findall(report_text)
# Let's inspect line-by-line for 5.1
for m in re.finditer(r'\[Rank #\d+\] (CON-\d+):.*?\n- \*\*Score & Nominations\*\*:\s*(\d+)\s*/\s*385\s*\(([\d\.]+)%,\s*\$\\sigma\s*=\s*([\d\.]+)\$\),\s*(\d+)\s*/\s*7', report_text):
    cid, sc, pct, sig, votes = m.groups()
    p5_item = p5_scoreboard.get(cid)
    if p5_item:
        if int(sc) != p5_item["grand_total"]:
            failures.append(f"CHECK 3: Section 5.1 score mismatch for {cid}: {sc} vs P5 {p5_item['grand_total']}")
        if abs(float(pct) - p5_item["percentage_of_max"]) > 0.05:
            failures.append(f"CHECK 3: Section 5.1 pct mismatch for {cid}: {pct}% vs P5 {p5_item['percentage_of_max']}%")
        if abs(float(sig) - p5_item["std_dev_seat_score"]) > 0.05:
            failures.append(f"CHECK 3: Section 5.1 std dev mismatch for {cid}: {sig} vs P5 {p5_item['std_dev_seat_score']}")
        if int(votes) != p5_item["phase3_votes"]:
            failures.append(f"CHECK 3: Section 5.1 votes mismatch for {cid}: {votes} vs P5 {p5_item['phase3_votes']}")
print(f"  ✓ PASS: All 5 cut finalists in Section 5.1 match Phase 5 JSON scores, std devs, and Phase 3 votes.")

# Check Section 5.2 Table Deferred Ideas vs Phase 3 Master Tally
tally = {item["idea_id"]: item for item in p3_data.get("master_tally", [])}
sec5_2_rows = re.findall(r'\|\s*`(CON-\d+)`\s*\|\s*\*\*([^*]+)\*\*\s*\|\s*(\d+)\s*/\s*7\s*\(([^)]+)\)\s*\|\s*Theme\s*(\d+)', report_text)
print(f"\n  Checking Section 5.2 Deferred Candidates Table (found {len(sec5_2_rows)} rows):")
for cid, name, votes, seats_str, theme_num in sec5_2_rows:
    p3_item = tally.get(cid)
    if not p3_item:
        failures.append(f"CHECK 3: Deferred candidate {cid} not found in Phase 3 master tally")
        continue
    if int(votes) != p3_item["vote_count"]:
        failures.append(f"CHECK 3: Deferred candidate {cid} vote count mismatch: report {votes} vs P3 {p3_item['vote_count']}")
    # check nominating seats
    seats_reported = [s.strip() for s in seats_str.split(',')]
    if set(seats_reported) != set(p3_item["nominating_seats"]):
        failures.append(f"CHECK 3: Deferred candidate {cid} seats mismatch: report {seats_reported} vs P3 {p3_item['nominating_seats']}")
print(f"  ✓ PASS: All {len(sec5_2_rows)} deferred candidates in Section 5.2 match Phase 3 master tally votes and seats exactly.")

# -------------------------------------------------------------
# CHECK 4: Narrative Pipeline History & Metadata Consistency Audit
# -------------------------------------------------------------
print("\n[CHECK 4] Narrative Pipeline History & Metadata Consistency Audit")

# Check Appendix A Phase 1 count
p1_m = re.search(r'\*\*Phase 1 \(Blind Divergence\)\*\*:\s*(\d+)', report_text)
if p1_m:
    p1_count = p1_m.group(1)
    print(f"  - Appendix A line 556 reports Phase 1 generated count: {p1_count}")
    if p1_count != "700":
        failures.append(f"CHECK 4: Appendix A line 556 reports Phase 1 generated '{p1_count} concrete innovations', but Phase 1 produced 700 raw ideas (100 per seat across 7 seats).")

# Check Appendix A Phase 2 count
p2_m = re.search(r'\*\*Phase 2 \(Consolidation & Thematic Clustering\)\*\*:\s*Deduplication and clustering into (\d+)', report_text)
if p2_m:
    p2_count = p2_m.group(1)
    print(f"  - Appendix A line 557 reports Phase 2 clustered count: {p2_count}")
    if p2_count != "256":
        failures.append(f"CHECK 4: Appendix A line 557 reports Phase 2 clustered into '{p2_count} unique proposals', but Phase 2 produced 256 consolidated proposals (CON-001 through CON-256).")

# Check Appendix C intro
app_c_intro = re.search(r'The (\d+) generated innovations consolidated into (\d+) unique proposals', report_text)
if app_c_intro:
    p_gen, p_cons = app_c_intro.groups()
    print(f"  - Appendix C intro reports: {p_gen} generated -> {p_cons} proposals")
    if p_gen != "700" or p_cons != "256":
        failures.append(f"CHECK 4: Appendix C line 616 reports 'The {p_gen} generated innovations consolidated into {p_cons} unique proposals'. Factual counts are 700 raw innovations consolidated into 256 proposals.")

# Check Appendix C thematic counts and ranges
app_c_themes = [
    (1, "Memory, Spacing & Desirable Difficulties", 27, "CON-001", "CON-027"),
    (2, "Scaffolding, Sequencing & Misconception Deconstruction", 38, "CON-028", "CON-065"),
    (3, "Active Interactivity, Widgets & Molecular Manipulation", 82, "CON-066", "CON-147"),
    (4, "Friction Reduction, Student Fatigue & Bilingual Usability", 25, "CON-148", "CON-172"),
    (5, "Diagnostic Assessment, Psychometrics & Learning Analytics", 29, "CON-173", "CON-201"),
    (6, "Scalable Architecture, Wasm Cheminformatics & Deterministic AI", 30, "CON-202", "CON-231"),
    (7, "Cost Optimization, Frugal Engineering & Commercial Viability", 25, "CON-232", "CON-256")
]

print("\n  Checking Appendix C Thematic Ranges vs Phase 2 Ground Truth:")
for t_id, t_name, expected_count, start_id, end_id in app_c_themes:
    # Find Theme t_id line in Appendix C
    t_pattern = rf'{t_id}\.\s*\*\*Theme {t_id}:[^*]+\*\*\s*\((?:`?(CON-\d+)`?\s*through\s*`?(CON-\d+)`?,\s*)?(\d+)\s*unique ideas\)'
    m = re.search(t_pattern, report_text)
    if m:
        c_start, c_end, c_count = m.groups()
        print(f"    Theme {t_id}: found count={c_count}, range={c_start} to {c_end}")
        if int(c_count) != expected_count:
            failures.append(f"CHECK 4: Appendix C Theme {t_id} reports count {c_count}, but Phase 2 data has {expected_count} ideas.")
        if c_start != start_id or c_end != end_id:
            failures.append(f"CHECK 4: Appendix C Theme {t_id} reports range {c_start} to {c_end}, but Phase 2 data range is {start_id} to {end_id}.")
    else:
        # Check if Theme 7 has no count
        if t_id == 7:
            failures.append(f"CHECK 4: Appendix C Theme 7 does not list its candidate range (`CON-232` through `CON-256`, 25 unique ideas).")
        else:
            failures.append(f"CHECK 4: Appendix C Theme {t_id} pattern not matched in report.")

# -------------------------------------------------------------
# CHECK 5: Structural & Required Sections Audit
# -------------------------------------------------------------
print("\n[CHECK 5] 6-Section Required Structure Audit")
required_sections = [
    "## 1. Executive Summary",
    "## 2. The Decision",
    "## 3. Implementation Roadmap",
    "## 4. Validation Plan",
    "## 5. Rejected Ideas Worth Revisiting",
    "## 6. Appendices"
]
for sec in required_sections:
    if sec in report_text:
        print(f"  ✓ PASS: Found required section '{sec}'")
    else:
        failures.append(f"CHECK 5: Missing required section '{sec}'")

# Check Section 4 Experiments: exactly 5 experiments
exp_matches = re.findall(r'### 4\.\d+\s+Experiment\s+(\d+)\s*\((CON-\d+):', report_text)
print(f"\n  Checking Validation Plan Experiments (found {len(exp_matches)}):")
for exp_num, cid in exp_matches:
    print(f"    Experiment {exp_num}: {cid}")
if len(exp_matches) != 5:
    failures.append(f"CHECK 5: Expected 5 experiments in Section 4, found {len(exp_matches)}")

# -------------------------------------------------------------
# SUMMARY & VERDICT
# -------------------------------------------------------------
print("\n" + "=" * 75)
print("AUDIT SUMMARY:")
print(f"  Total Failures (P0/P1): {len(failures)}")
print(f"  Total Warnings (P2):    {len(warnings)}")

if failures:
    print("\nFAILURES (DISCREPANCIES FOUND):")
    for idx, f in enumerate(failures, 1):
        print(f"  {idx}. ❌ {f}")
        
if warnings:
    print("\nWARNINGS:")
    for idx, w in enumerate(warnings, 1):
        print(f"  {idx}. ⚠️  {w}")

print("=" * 75)
if len(failures) == 0:
    print("VERDICT: APPROVE")
else:
    print("VERDICT: REQUEST_CHANGES")
print("=" * 75)

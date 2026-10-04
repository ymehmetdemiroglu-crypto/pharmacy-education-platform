import json
import sys

def verify():
    with open('docs/council/seat_1_cognitive_scientist.json', 'r', encoding='utf-8') as f:
        d = json.load(f)

    print('Seat:', d['seat'])
    print('Total count:', d['total_count'])
    print('Breakdown:', d['breakdown'])
    assert d['total_count'] == 100, f"Expected 100 total, got {d['total_count']}"
    assert d['breakdown']['proven'] == 30, f"Expected 30 proven, got {d['breakdown']['proven']}"
    assert d['breakdown']['adjacent'] == 50, f"Expected 50 adjacent, got {d['breakdown']['adjacent']}"
    assert d['breakdown']['wild'] == 20, f"Expected 20 wild, got {d['breakdown']['wild']}"
    assert len(d['ideas']) == 100, f"Expected 100 ideas list length, got {len(d['ideas'])}"

    for i, idea in enumerate(d['ideas']):
        expected_id = f"COG-{i+1:03d}"
        assert idea['id'] == expected_id, f"ID mismatch: {idea['id']} != {expected_id}"
        assert idea['tier'] in ['proven', 'adjacent', 'wild'], f"Invalid tier at {idea['id']}"
        assert idea['evidence_tag'] in ['evidence-backed', 'plausible', 'speculative'], f"Invalid tag at {idea['id']}"
        assert idea['name'], f"Missing name at {idea['id']}"
        assert idea['mechanism'], f"Missing mechanism at {idea['id']}"
        assert idea['expected_effect'], f"Missing expected_effect at {idea['id']}"
        expected_formatted = f"{idea['name']}: {idea['mechanism']} -> {idea['expected_effect']} [{idea['evidence_tag']}]"
        assert idea['formatted'] == expected_formatted, f"Format mismatch at {idea['id']}:\nGot: {idea['formatted']}\nExp: {expected_formatted}"

    print("VERIFICATION_SUCCESS: All 100 ideas verified successfully with 0 defects!")

if __name__ == '__main__':
    verify()

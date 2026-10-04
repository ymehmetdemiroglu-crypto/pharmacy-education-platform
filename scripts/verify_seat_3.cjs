const fs = require('fs');
const path = require('path');

const filePath = path.resolve('docs/council/seat_3_game_designer.json');
if (!fs.existsSync(filePath)) {
  console.error(`File does not exist: ${filePath}`);
  process.exit(1);
}

const raw = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(raw);

let errors = [];

if (data.seat !== "Seat 3: Game & Interaction Designer") {
  errors.push(`Invalid seat title: ${data.seat}`);
}

if (data.total_count !== 100) {
  errors.push(`total_count is ${data.total_count}, expected 100`);
}

if (!data.breakdown || data.breakdown.proven !== 30 || data.breakdown.adjacent !== 50 || data.breakdown.wild !== 20) {
  errors.push(`breakdown mismatch: ${JSON.stringify(data.breakdown)}`);
}

if (!Array.isArray(data.ideas) || data.ideas.length !== 100) {
  errors.push(`ideas length is ${data.ideas ? data.ideas.length : 'not an array'}, expected 100`);
}

const idSet = new Set();
const allowedTiers = new Set(['proven', 'adjacent', 'wild']);
const allowedTags = new Set(['evidence-backed', 'plausible', 'speculative']);

data.ideas.forEach((idea, idx) => {
  const prefix = `Idea [${idx}] (${idea.id || 'NO_ID'}): `;
  if (!idea.id || !/^GAM-\d{3}$/.test(idea.id)) {
    errors.push(prefix + `Invalid ID format: ${idea.id}`);
  }
  if (idSet.has(idea.id)) {
    errors.push(prefix + `Duplicate ID: ${idea.id}`);
  }
  idSet.add(idea.id);

  if (!allowedTiers.has(idea.tier)) {
    errors.push(prefix + `Invalid tier: ${idea.tier}`);
  }
  if (!allowedTags.has(idea.evidence_tag)) {
    errors.push(prefix + `Invalid evidence_tag: ${idea.evidence_tag}`);
  }
  if (!idea.name || idea.name.trim().length === 0) {
    errors.push(prefix + `Empty name`);
  }
  if (!idea.mechanism || idea.mechanism.trim().length === 0) {
    errors.push(prefix + `Empty mechanism`);
  }
  if (!idea.expected_effect || idea.expected_effect.trim().length === 0) {
    errors.push(prefix + `Empty expected_effect`);
  }

  const expectedFormatted = `${idea.name}: ${idea.mechanism} -> ${idea.expected_effect} [${idea.evidence_tag}]`;
  if (idea.formatted !== expectedFormatted) {
    errors.push(prefix + `Formatted mismatch! Expected:\n"${expectedFormatted}"\nGot:\n"${idea.formatted}"`);
  }

  // Ensure no generic filler phrases
  const lowerMech = idea.mechanism.toLowerCase();
  if (lowerMech.includes("make it engaging") || lowerMech.includes("gamify the lesson") || lowerMech.includes("add animations")) {
    errors.push(prefix + `Generic filler phrase detected in mechanism`);
  }
});

if (errors.length > 0) {
  console.error(`Verification FAILED with ${errors.length} errors:`);
  errors.forEach(e => console.error(" - " + e));
  process.exit(1);
} else {
  console.log("Verification PASSED! All 100 ideas conform strictly to specifications.");
}

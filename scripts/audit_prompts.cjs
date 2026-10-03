const fs = require('fs');

const content = fs.readFileSync('docs/INTERACTIVE_LEARNING_BLUEPRINT.md', 'utf8');
const lines = content.split('\n');

let currentCluster = '';
let inPrompts = false;
let promptCount = 0;
let violations = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('# Cluster')) {
    currentCluster = line;
    inPrompts = false;
  }
  if (line.includes('Exemplar 12-Stage Mastery Progression Prompts')) {
    inPrompts = true;
    continue;
  }
  if (inPrompts && line.startsWith('### 3.')) {
    inPrompts = false;
  }
  if (inPrompts && line.trim().startsWith('- **')) {
    // Format: - **1. Hook**: Prompt text...
    const match = line.match(/- \*\*(\d+\.\s*[\w\s]+)\*\*:\s*(.*)/);
    if (match) {
      promptCount++;
      const stageName = match[1];
      const promptText = match[2].trim();
      const words = promptText.split(/\s+/).filter(Boolean);
      const count = words.length;
      if (count > 40) {
        violations.push({
          cluster: currentCluster,
          stage: stageName,
          count: count,
          text: promptText,
          lineNum: i + 1
        });
      }
    }
  }
}

console.log(`Audited ${promptCount} prompts.`);
console.log(`Violations (>40 words): ${violations.length}`);
for (const v of violations) {
  console.log(`[VIOLATION] Line ${v.lineNum} (${v.cluster} - ${v.stage}): ${v.count} words!\nText: "${v.text}"`);
}

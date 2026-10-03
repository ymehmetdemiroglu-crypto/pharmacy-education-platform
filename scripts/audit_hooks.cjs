const fs = require('fs');

const content = fs.readFileSync('docs/INTERACTIVE_LEARNING_BLUEPRINT.md', 'utf8');
const lines = content.split('\n');

let currentCluster = '';
let inHooks = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('# Cluster')) {
    currentCluster = line;
  }
  if (line.includes('### 1. The Core Dilemma / Hook Case')) {
    inHooks = true;
    continue;
  }
  if (inHooks && line.startsWith('### 2.')) {
    inHooks = false;
  }
  if (inHooks && (line.trim().startsWith('- **Turkish (TR)**:') || line.trim().startsWith('- **Arabic (AR)**:') || line.trim().startsWith('- **English (EN)**:'))) {
    const lang = line.split(':')[0].replace('- **', '').replace('**', '').trim();
    // Next line or rest of this line is the text
    let text = line.split(':').slice(1).join(':').trim();
    if (i + 1 < lines.length && lines[i + 1].trim().startsWith('"')) {
      text += ' ' + lines[i + 1].trim();
    }
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[^\w\s\u0600-\u06FF\u00C0-\u017F]/g, ' ');
    const words = cleanText.split(/\s+/).filter(Boolean);
    console.log(`Cluster ${currentCluster.substring(0, 15)} | ${lang} | ${words.length} words`);
  }
}

import fs from 'fs';
import { ReceptorLigandMatcherConfigSchema } from './packages/widgets/src/ReceptorLigandMatcher/schema.ts';

const raw = fs.readFileSync('courses/medchem/lessons/lesson-04.json', 'utf8');
const data = JSON.parse(raw);
const step5 = data.steps[4];

console.log('Validating step5.config against ReceptorLigandMatcherConfigSchema...');
try {
  const parsed = ReceptorLigandMatcherConfigSchema.parse(step5.config);
  console.log('✅ ReceptorLigandMatcherConfigSchema VALIDATED SUCCESSFULLY!');
  console.log('Title:', parsed.title);
  console.log('Drug Name:', parsed.drugName);
  console.log('Pairs count:', parsed.pairs.length);
  console.log('Residues count:', parsed.residues.length);
} catch (err) {
  console.error('❌ ReceptorLigandMatcherConfigSchema FAILED:', err);
  process.exit(1);
}

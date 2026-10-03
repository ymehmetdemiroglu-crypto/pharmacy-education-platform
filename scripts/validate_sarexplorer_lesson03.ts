import fs from 'fs';
import { SarExplorerConfigSchema } from './packages/widgets/src/SarExplorer/schema.ts';

const raw = fs.readFileSync('courses/medchem/lessons/lesson-03.json', 'utf8');
const data = JSON.parse(raw);

const step5 = data.steps[4];
try {
  const parsedWidget = SarExplorerConfigSchema.parse(step5.widget.config);
  console.log('✅ SarExplorerConfigSchema validated successfully!');
  console.log('Scaffold:', parsedWidget.scaffoldName);
  console.log('Positions count:', parsedWidget.positions.length);
} catch (err) {
  console.error('❌ SarExplorerConfigSchema validation FAILED:', err);
  process.exit(1);
}

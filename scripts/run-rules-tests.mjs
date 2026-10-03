import { spawnSync } from 'child_process';

const env = {
  ...process.env,
  JAVA_TOOL_OPTIONS: '-XX:+UseSerialGC -Xmx256m -Xms32m',
};

const result = spawnSync(
  'npx firebase-tools@13.31.0 emulators:exec --only firestore "vitest run -c vitest.rules.config.ts"',
  {
    shell: true,
    env,
    encoding: 'utf8',
  }
);

if (result.stdout) {
  process.stdout.write(result.stdout);
}
if (result.stderr) {
  process.stderr.write(result.stderr);
}

const rawOutput = ((result.stdout || '') + (result.stderr || '')).replace(/\x1b\[[0-9;]*m/g, '');
const passed = (result.status === 0) && !rawOutput.includes('ERR!') && !rawOutput.includes('FAIL') && rawOutput.includes('passed');

process.exit(passed ? 0 : (result.status ?? 1));


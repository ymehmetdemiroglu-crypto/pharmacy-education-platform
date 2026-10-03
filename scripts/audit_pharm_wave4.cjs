const fs = require('fs');

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function auditLesson(relPath) {
  const data = JSON.parse(fs.readFileSync(relPath, 'utf8'));
  console.log('================================================================');
  console.log('AUDITING: ' + data.id + ' (' + data.title.en + ')');
  console.log('Total Steps:', data.steps ? data.steps.length : 'none');
  console.log('================================================================');

  let promptWcMax = { en: 0, tr: 0, ar: 0 };
  let optionWcMax = { en: 0, tr: 0, ar: 0 };
  let missingHintsCount = 0;
  let optMismatchCount = 0;

  data.steps.forEach((step, idx) => {
    const stepNum = idx + 1;
    console.log('\n--- Step ' + stepNum + ': id=' + step.id + ', stage=' + (step.stage || step.phase) + ', widget=' + step.widgetType + ' ---');

    ['en', 'tr', 'ar'].forEach(lang => {
      const prompt = step.prompt?.[lang] || '';
      const wc = countWords(prompt);
      if (wc > promptWcMax[lang]) promptWcMax[lang] = wc;
      if (wc > 40) {
        console.warn('  [PROMPT WC EXCEEDED > 40] ' + lang + ' (' + wc + ' words): ' + prompt);
      } else {
        console.log('  Prompt [' + lang + '] (' + wc + ' w): ' + prompt);
      }
    });

    const ccOptions = step.conceptCheck?.options || [];
    const cfgOptions = step.config?.options || [];
    console.log('  Options count -> conceptCheck: ' + ccOptions.length + ', config: ' + cfgOptions.length);

    if (ccOptions.length !== cfgOptions.length) {
      console.warn('  [OPTIONS COUNT MISMATCH] conceptCheck has ' + ccOptions.length + ' but config has ' + cfgOptions.length);
      optMismatchCount++;
    }

    ccOptions.forEach((opt, oIdx) => {
      ['en', 'tr', 'ar'].forEach(lang => {
        const text = opt.text?.[lang] || '';
        const wc = countWords(text);
        if (wc > optionWcMax[lang]) optionWcMax[lang] = wc;
        if (wc > 40) {
          console.warn('    [OPTION WC EXCEEDED > 40] opt ' + oIdx + ' ' + lang + ' (' + wc + ' words): ' + text);
        }
      });
      const hasFeedback = opt.feedback?.en && opt.feedback?.tr && opt.feedback?.ar;
      if (!hasFeedback) {
        console.warn('    [MISSING FEEDBACK] opt ' + oIdx + ' missing feedback');
      }
      console.log('    Opt ' + oIdx + ' (isCorrect=' + opt.isCorrect + '): ' + (opt.text?.en || ''));
      console.log('      FB: ' + (opt.feedback?.en || ''));
    });

    // Hints
    const hints = step.hints || {};
    const tiers = ['nudge', 'clue', 'solution'];
    tiers.forEach(tier => {
      const h = hints[tier];
      if (!h || !h.en || !h.tr || !h.ar) {
        console.warn('  [MISSING HINT] Step ' + stepNum + ' Tier ' + tier + ' is missing or incomplete!');
        missingHintsCount++;
      } else {
        console.log('  Hint [' + tier + ']: ' + h.en);
      }
    });
  });

  console.log('\n--- SUMMARY FOR ' + data.id + ' ---');
  console.log('Max Prompt WC:', promptWcMax);
  console.log('Max Option WC:', optionWcMax);
  console.log('Missing Hints:', missingHintsCount);
  console.log('Option Sync Mismatches:', optMismatchCount);
}

auditLesson('courses/pharmacology/lessons/lesson-07.json');
auditLesson('courses/pharmacology/lessons/lesson-08.json');

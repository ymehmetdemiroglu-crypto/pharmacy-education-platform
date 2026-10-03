const fs = require('fs');

function summarizeFile(filename) {
  console.log(`\n=================== ${filename} ===================`);
  const content = fs.readFileSync('docs/extracted_raw/' + filename, 'utf8');
  const slides = content.split('--- [Slide/Page');
  for (let i = 1; i < slides.length; i++) {
    const lines = slides[i].split('\n').map(l => l.trim()).filter(Boolean);
    console.log(`Slide ${i}: ${lines.slice(1, 4).join(' | ')}`);
  }
}

summarizeFile('pharmacology_İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf.txt');
summarizeFile('medchem_İlaç metabolizması-2026.pdf.txt');

const fs = require('fs');

function searchInFile(filename, keywords) {
  const content = fs.readFileSync('docs/extracted_raw/' + filename, 'utf8');
  console.log('=== SEARCHING IN ' + filename + ' ===');
  const slides = content.split('--- [Slide/Page');
  for (const s of slides) {
    const lines = s.split('\n');
    const header = lines[0];
    for (const kw of keywords) {
      if (s.toLowerCase().includes(kw.toLowerCase())) {
        console.log(`  [Match] "${kw}" in Slide ${header.trim()}`);
      }
    }
  }
}

searchInFile('medchem_Biyoizosterizm.pdf.txt', ['Grimm', 'Langmuir', 'Friedman', 'Tetrazol', 'Karboksil', 'izoster']);
searchInFile('medchem_İlaçlarda  İzomeri.pdf.txt', ['Easson', 'Stedman', 'Pfeiffer', 'Eutomer', 'Distomer', 'Adrenalin', 'Epinefrin', 'Konformasyon', 'Rotasyon']);
searchInFile('medchem_İlaç metabolizması-2026.pdf.txt', ['CYP', 'Glutatyon', 'NAPQI', 'Parasetamol', 'Asetaminofen', 'NIH', 'Epoksit', 'Glukuron']);
searchInFile('pharmacology_İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf.txt', ['Yedek', 'Reserve', 'Schild', 'Afinite', 'Efikasite', 'İntrinsik', 'Kompetitif', 'Antagonist', 'Ariens', 'Stephenson']);

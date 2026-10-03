const fs = require('fs');

let code = fs.readFileSync('scripts/generate_lesson08.cjs', 'utf8');

// 1. Add objective after description
const objBlock = `  "description": {
    "tr": "İlaç moleküllerinde konformasyonel serbestlik, biyoaktif konformasyon paradoksu ve iskelet rijitifikasyonunun reseptör alt tip seçiciliği ile termodinamik afinite üzerindeki etkilerini analiz etme.",
    "ar": "تحليل الحرية التشكيلية للأدوية، ومفارقة التشكل النشط حيوياً، وأثر إكساب الهياكل الجسوءة في انتقائية المستقبلات والارتباط الديناميكي الحراري.",
    "en": "Analyze conformational mobility, resolve the bioactive conformation paradox, and leverage molecular rigidification to maximize receptor subtype selectivity and thermodynamic affinity."
  },
  "objective": {
    "tr": "Asetilkolin ve histamin arketipleri üzerinden konformasyonel izomerizmi (gauche vs anti), biyoaktif konformasyon paradoksunu ve rijitifikasyon ile entropi kazancını analiz etmek.",
    "ar": "تحليل التماكب التشكلي (gauche مقابل anti) ومفارقة التشكل النشط حيوياً ومكاسب الإنتروبيا بالجسوءة عبر نماذج أسيتيل كولين وهيستامين.",
    "en": "Analyze conformational isomerism (gauche vs anti), resolve the bioactive conformation paradox, and leverage scaffold rigidification to maximize subtype selectivity and entropic affinity."
  },`;

code = code.replace(/  "description": \{[\s\S]*?"en": "[^"]*"\s*\},/, objBlock);

// 2. Replace multiple_choice types with corresponding stage types
code = code.replace(/("id": "mc-mod4-les2-step-02",\s*"stage": "question",\s*"stageIndex": 2,\s*)"type": "multiple_choice"/, '$1"type": "question"');
code = code.replace(/("id": "mc-mod4-les2-step-03",\s*"stage": "intuition",\s*"stageIndex": 3,\s*)"type": "multiple_choice"/, '$1"type": "intuition"');
code = code.replace(/("id": "mc-mod4-les2-step-04",\s*"stage": "visual_explanation",\s*"stageIndex": 4,\s*)"type": "multiple_choice"/, '$1"type": "visual_explanation"');
code = code.replace(/("id": "mc-mod4-les2-step-06",\s*"stage": "guided_discovery",\s*"stageIndex": 6,\s*)"type": "multiple_choice"/, '$1"type": "guided_discovery"');
code = code.replace(/("id": "mc-mod4-les2-step-07",\s*"stage": "formal_explanation",\s*"stageIndex": 7,\s*)"type": "multiple_choice"/, '$1"type": "formal_explanation"');
code = code.replace(/("id": "mc-mod4-les2-step-08",\s*"stage": "concept_check",\s*"stageIndex": 8,\s*)"type": "multiple_choice"/, '$1"type": "concept_check"');
code = code.replace(/("id": "mc-mod4-les2-step-09",\s*"stage": "application",\s*"stageIndex": 9,\s*)"type": "multiple_choice"/, '$1"type": "clinical_vignette"');
code = code.replace(/("id": "mc-mod4-les2-step-10",\s*"stage": "retrieval",\s*"stageIndex": 10,\s*)"type": "multiple_choice"/, '$1"type": "retrieval"');
code = code.replace(/("id": "mc-mod4-les2-step-11",\s*"stage": "connection",\s*"stageIndex": 11,\s*)"type": "multiple_choice"/, '$1"type": "connection"');
code = code.replace(/("id": "mc-mod4-les2-step-12",\s*"stage": "mastery_check",\s*"stageIndex": 12,\s*)"type": "multiple_choice"/, '$1"type": "mastery_check"');

// 3. Replace 'medisinal kimya' / 'Medisinal kimya'
code = code.replace(/medisinal kimya/g, 'farmasötik kimya');
code = code.replace(/Medisinal kimya/g, 'Farmasötik kimya');

fs.writeFileSync('scripts/generate_lesson08.cjs', code, 'utf8');
console.log('Successfully patched scripts/generate_lesson08.cjs');

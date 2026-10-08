import React, { useState } from 'react';
import {
  ClinicalOrderVerificationConfig,
  ClinicalOrderCase,
  ClinicalCaseId,
  ClinicalCaseOption,
} from './schema';
import { ModelIllustrationNotice } from '../common/ModelIllustrationNotice';

export const CANONICAL_CLINICAL_CASES: ClinicalOrderCase[] = [
  {
    caseId: 'ciprofloxacin_caco3',
    title: 'Vaka 1: Florokinolon & Katyon Şelasyonu',
    patientProfile: {
      age: 64,
      gender: 'Kadın',
      weightKg: 68,
      indication: 'Komplike Olmayan Akut Piyelonefrit',
      renalFunction: 'eGFR 72 mL/dk/1.73m²',
      allergies: 'NKDA (Bilinen İlaç Alerjisi Yok)',
    },
    activeOrder: {
      drugName: 'Siprofloksasin (Ciprofloxacin)',
      dose: '500 mg PO',
      route: 'Oral Tablet',
      frequency: 'Günde 2 kez (BID)',
    },
    concomitantMedication: {
      drugName: 'Kalsiyum Karbonat (CaCO₃)',
      dose: '1000 mg (400 mg elementer Ca²⁺)',
      indication: 'Osteopeni / Kalsiyum Desteği (Yemeklerle TID)',
    },
    clinicalScenario:
      'Hastaya sabah 08:00 dozunda Siprofloksasin 500 mg ve Kalsiyum Karbonat 1000 mg tabletlerinin eşzamanlı yutulması yönünde istem yapılmıştır. Klinik eczacı olarak bu istemi onaylıyor musunuz?',
    correctDecision: 'modify_spacing',
    options: [
      {
        id: 'opt-c1-approve',
        decision: 'approve',
        text: 'İstemi olduğu gibi onayla: Florokinolon emilimi kalsiyum tuzlarından klinik olarak etkilenmez.',
        isCorrect: false,
        feedback:
          'Hatalı Değerlendirme: Divalan Ca²⁺ katyonu, siprofloksasinin 4-keto ve 3-karboksil gruplarıyla çözünmeyen bidentat şelat oluşturarak oral biyoyararlanımı yaklaşık %40–50 oranında düşürür. Tedavi başarısızlığı riski doğar.',
        misconceptionCode: 'MISC-CHELATION-NEGLECT',
      },
      {
        id: 'opt-c1-spacing',
        decision: 'modify_spacing',
        text: 'Dozlama aralığını düzenle: Siprofloksasini kalsiyumdan en az 2 saat önce veya 6 saat sonra ver.',
        isCorrect: true,
        feedback:
          'Klinik Olarak Kusursuz! İki ilacın alım zamanı arasına 2 saat önce / 6 saat sonra kuralı konulduğunda bidentat şelasyon engellenir ve oral AUC tam olarak korunur. IV geçişe gerek kalmaz.',
      },
      {
        id: 'opt-c1-iv',
        decision: 'contraindicated_switch',
        text: 'İstemi reddet ve zorunlu IV forma geçir: Oral emilim %80\'in üzerinde çöktüğü için oral verilemez.',
        isCorrect: false,
        feedback:
          'Aşırı Tedavi Yanılgısı: >%80 emilim çöküşü Al³⁺/Mg²⁺ hidroksit antasitlerinde görülür; CaCO₃ biyoyararlanımı ~%40–50 azaltır. Zaman aralığı düzenlemesi oral yolla tedaviyi güvenle kurtarır.',
        misconceptionCode: 'MISC-CATION-VALENCY-CONFLATION',
      },
      {
        id: 'opt-c1-double',
        decision: 'approve',
        text: 'Siprofloksasin dozunu 1000 mg BID\'e çıkararak eşzamanlı ver: Şelasyon doygunluğunu aş.',
        isCorrect: false,
        feedback:
          'Tehlikeli Yaklaşım: Biyoyararlanım öngörülemez hale gelir; aşırı florokinolon dozu QTc uzaması ve gastrointestinal toksisite riskini katlar.',
        misconceptionCode: 'MISC-EMPIRIC-OVERDOSE',
      },
    ],
    pharmacologicalMechanism:
      'Florokinolon molekülünün C3 karboksil ve C4 okso oksijenleri, divalan Ca²⁺ ile suda çözünmeyen bidentat şelat kompleksi oluşturur. Bu durum gastrointestinal emilimi %40–50 baskılar (trivalan Al³⁺/Mg²⁺ ise >%80 baskılar). İlaç alımları 2 saat önce / 6 saat sonra ayrılarak çözülür.',
    keyEvidenceCitation:
      'Goodman & Gilman 14. Baskı Bölüm 59; Katzung 15. Baskı Bölüm 44; Nix DE et al. Antimicrob Agents Chemother 1989.',
  },
  {
    caseId: 'simvastatin_clarithromycin',
    title: 'Vaka 2: CYP3A4 Mekanizma-Tabanlı İnhibisyon',
    patientProfile: {
      age: 58,
      gender: 'Erkek',
      weightKg: 82,
      indication: 'Toplum Kaynaklı Pnömoni (CAP) + Primer Hiperkolesterolemi',
      renalFunction: 'eGFR 65 mL/dk/1.73m²',
      allergies: 'NKDA',
    },
    activeOrder: {
      drugName: 'Klaritromisin (Clarithromycin)',
      dose: '500 mg PO',
      route: 'Oral Tablet',
      frequency: 'Günde 2 kez (BID) - 7 Günlük Kür',
    },
    concomitantMedication: {
      drugName: 'Simvastatin',
      dose: '40 mg PO',
      indication: 'Koroner Arter Hastalığı Sekonder Profilaksi (Her Gece QHS)',
    },
    clinicalScenario:
      'Pnömoni nedeniyle 7 gün süreyle oral klaritromisin 500 mg BID başlanmak isteniyor. Hasta kronik olarak simvastatin 40 mg QHS kullanmaktadır. Bu istemi nasıl yönetirsiniz?',
    correctDecision: 'contraindicated_switch',
    options: [
      {
        id: 'opt-c2-approve',
        decision: 'approve',
        text: 'İstemi onayla: Simvastatin temel olarak OATP2B1 ve renal yolla atıldığı için etkileşmez.',
        isCorrect: false,
        feedback:
          'Ölümcül Farmakokinetik Yanılgı: Simvastatin inaktif lipofilik bir lakton ön ilaçtır ve bağırsak/karaciğerde neredeyse tamamen CYP3A4 ile metabolize edilir (F < %5). OATP2B1 doygunluğu uydurma bir mekanizmadır.',
        misconceptionCode: 'MISC-INVENTED-TRANSPORTER-MECHANISM',
      },
      {
        id: 'opt-c2-switch',
        decision: 'contraindicated_switch',
        text: 'Kontrendike kombinasyon: Klaritromisin süresince simvastatin kesilmeli veya antibiyotik Azitromisin\'e geçilmelidir.',
        isCorrect: true,
        feedback:
          'Mükemmel Klinik Karar! Klaritromisin güçlü bir mekanizma-tabanlı CYP3A4 inhibitörüdür; simvastatin AUC değerini 10–12 kat (+%1000–1100) artırarak rabdomiyoliz ve akut böbrek hasarı riskini tetikler. Azitromisin CYP3A4 inhibisyonu yapmaz.',
      },
      {
        id: 'opt-c2-halve',
        decision: 'modify_spacing',
        text: 'Simvastatin dozunu 20 mg\'a indirerek tedaviye devam et: %50 doz azaltımı güvenli seviyeyi sağlar.',
        isCorrect: false,
        feedback:
          'Yetersiz Koruma: 10–12 katlık devasa AUC artışı karşısında dozu yarıya indirmek kan düzeyini yine 5–6 kat toksik eşikte bırakır. Birlikte kullanım kesinlikle kontrendikedir.',
        misconceptionCode: 'MISC-LINEAR-DOSE-FALLACY',
      },
      {
        id: 'opt-c2-lovastatin',
        decision: 'approve',
        text: 'Simvastatin yerine aynı dozda Lovastatin ver: Makrolidlerden etkilenmeyen alternatif statindir.',
        isCorrect: false,
        feedback:
          'Hatalı Alternatif: Lovastatin de tıpkı simvastatin gibi majör CYP3A4 substratıdır ve aynı ölümcül rabdomiyoliz riskini taşır.',
        misconceptionCode: 'MISC-CLASS-SUBSTRATE-CONFUSION',
      },
    ],
    pharmacologicalMechanism:
      'Klaritromisin, CYP3A4 demir hemini metabolit ara kompleksinde (MI-complex) bağlayarak kuazi-tersinmez mekanizma-tabanlı inaktivasyona (MBI) uğratır. Simvastatin laktonunun first-pass klirensi çöker ve plazma AUC değeri 10–12 kat artar (+%1000–1100). Rabdomiyolizi önlemek için statin kesilmeli veya CYP etkileşimsiz Azitromisin seçilmelidir.',
    keyEvidenceCitation:
      'FDA Drug Safety Communication; Goodman & Gilman 14. Baskı Bölüm 35; Katzung 15. Baskı Bölüm 35; Neuvonen PJ et al. Clin Pharmacol Ther 1998.',
  },
  {
    caseId: 'warfarin_heparin_bridge',
    title: 'Vaka 3: Varfarin Gecikmesi & Heparin Köprüleme',
    patientProfile: {
      age: 71,
      gender: 'Erkek',
      weightKg: 76,
      indication: 'Akut Proksimal Derin Ven Trombozu (DVT)',
      renalFunction: 'eGFR 58 mL/dk/1.73m²',
      allergies: 'NKDA',
    },
    activeOrder: {
      drugName: 'Varfarin (Warfarin)',
      dose: '5 mg PO Günlük (48 saat önce başlandı)',
      route: 'Oral',
      frequency: 'Günde 1 kez (Akşam)',
    },
    concomitantMedication: {
      drugName: 'Enoksaparin (LMWH Heparin)',
      dose: '80 mg (1 mg/kg) SC',
      indication: 'Akut DVT Terapötik Doz (Günde 2 kez Q12H)',
    },
    clinicalScenario:
      'Akut DVT tanısıyla yatırılan hastaya 48 saat önce eşzamanlı Enoksaparin ve Varfarin başlanmıştır. 2. gün sabah lab sonucunda: INR = 2.2 gelmiştir. Asistan hekim: "INR hedef aralığa (2.0-3.0) ulaştı, kanama olmasın diye Enoksaparini keselim" demektedir. Eczacı kararınız nedir?',
    correctDecision: 'maintain_bridge',
    options: [
      {
        id: 'opt-c3-stop',
        decision: 'approve',
        text: 'Enoksaparini kesmeyi onayla: Hedef INR sağlandı, kanama riskini önlemek için heparin hemen kesilmelidir.',
        isCorrect: false,
        feedback:
          'Kritik Klinik Tuzak! Erken INR artışı yarılanma ömrü ~6 saat olan Faktör VII azalmasından kaynaklanır. Ancak asıl antitrombotik etki için Faktör II (t½ ~60–72 saat) ve Faktör X (t½ ~36–48 saat) tükenmelidir. Heparini 2. günde kesmek rekürren tromboz ve deri nekrozu riskini doğurur.',
        misconceptionCode: 'MISC-INR-EFFICACY-EQUATION',
      },
      {
        id: 'opt-c3-bridge',
        decision: 'maintain_bridge',
        text: 'Heparin köprüsünü sürdür: En az 5 gün ve INR art arda 24 saat terapötik kalana kadar Enoksaparin kesilmemelidir.',
        isCorrect: true,
        feedback:
          'Doğru ve Hayat Kurtarıcı! Antitrombotik etkinlik, uzun yarı ömürlü Faktör II (protrombin) tükenmesine bağlıdır ve 5–7 gün gecikir. Ayrıca Protein C (t½ ~8 saat) hızla düşerek ilk günlerde geçici protrombotik zemin hazırlar. Köprüleme zorunludur.',
      },
      {
        id: 'opt-c3-double',
        decision: 'approve',
        text: 'Varfarin dozunu 10 mg\'a yükselterek heparini kes: Dozu artırmak antitrombotik etkiyi hızlandırır.',
        isCorrect: false,
        feedback:
          'Hatalı & Tehlikeli: INR zaten 2.2 iken dozu ikiye katlamak gecikmiş kümülasyonla supraterapötik INR ve ölümcül majör kanamalara yol açar.',
        misconceptionCode: 'MISC-KINETIC-OVERCORRECTION',
      },
      {
        id: 'opt-c3-withhold',
        decision: 'approve',
        text: 'Aşırı duyarlılık nedeniyle hem varfarini hem enoksaparini 48 saat durdur.',
        isCorrect: false,
        feedback:
          'Hatalı: Akut DVT hastasında tüm antikoagülasyonu kesmek ölümcül pulmoner emboli riskini davet eder.',
        misconceptionCode: 'MISC-ACUTE-DISCONTINUATION',
      },
    ],
    pharmacologicalMechanism:
      'Varfarin VKORC1 enzimini inhibe ederek Faktör II, VII, IX, X ve Protein C/S karboksilasyonunu durdurur. Kısa yarı ömürlü Faktör VII (t½ ~6h) hızla tükendiği için INR 24–48 saatte yükselir. Ancak gerçek antitrombotik koruma protrombin (Faktör II, t½ ~60–72h) ve Faktör X (t½ ~36–48h) düşüşüne bağlıdır (5–7 gün). Bu biyofiziksel gecikme nedeniyle heparin köprülemesi en az 5 gün şarttır.',
    keyEvidenceCitation:
      'CHEST 2012/2018 Antithrombotic Therapy Guidelines; Goodman & Gilman 14. Baskı Bölüm 34; Katzung 15. Baskı Bölüm 34.',
  },
];

export const CANONICAL_CASES_EN: ClinicalOrderCase[] = [
  {
    caseId: 'ciprofloxacin_caco3',
    title: 'Case 1: Fluoroquinolone & Cation Chelation',
    patientProfile: {
      age: 64,
      gender: 'Female',
      weightKg: 68,
      indication: 'Uncomplicated Acute Pyelonephritis',
      renalFunction: 'eGFR 72 mL/min/1.73m²',
      allergies: 'NKDA (No Known Drug Allergies)',
    },
    activeOrder: {
      drugName: 'Ciprofloxacin',
      dose: '500 mg PO',
      route: 'Oral Tablet',
      frequency: 'Twice daily (BID)',
    },
    concomitantMedication: {
      drugName: 'Calcium Carbonate (CaCO₃)',
      dose: '1000 mg (400 mg elemental Ca²⁺)',
      indication: 'Osteopenia / Calcium Supplementation (TID with meals)',
    },
    clinicalScenario:
      'The patient is ordered Ciprofloxacin 500 mg and Calcium Carbonate 1000 mg tablets to be ingested simultaneously at the 08:00 AM dose. As a clinical pharmacist, do you verify this order?',
    correctDecision: 'modify_spacing',
    options: [
      {
        id: 'opt-c1-approve',
        decision: 'approve',
        text: 'Approve order as written: Fluoroquinolone absorption is not clinically affected by calcium salts.',
        isCorrect: false,
        feedback:
          'Erroneous Assessment: Divalent Ca²⁺ cations form insoluble bidentate chelate complexes with the 4-keto and 3-carboxyl groups of ciprofloxacin, reducing oral bioavailability by ~40–50%. This creates a high risk of therapeutic failure.',
        misconceptionCode: 'MISC-CHELATION-NEGLECT',
      },
      {
        id: 'opt-c1-spacing',
        decision: 'modify_spacing',
        text: 'Adjust dosing interval: Administer ciprofloxacin at least 2 hours before or 6 hours after calcium.',
        isCorrect: true,
        feedback:
          'Clinically Flawless! Separating administration by 2 hours before or 6 hours after completely prevents bidentate chelation and preserves oral AUC. IV switch is unnecessary.',
      },
      {
        id: 'opt-c1-iv',
        decision: 'contraindicated_switch',
        text: 'Reject order and switch to mandatory IV form: Cannot be administered orally because absorption collapses by over 80%.',
        isCorrect: false,
        feedback:
          'Overtreatment Fallacy: >80% absorption collapse occurs with trivalent Al³⁺/Mg²⁺ hydroxide antacids; CaCO₃ reduces bioavailability by ~40–50%. Proper spacing safely rescues oral therapy.',
        misconceptionCode: 'MISC-CATION-VALENCY-CONFLATION',
      },
      {
        id: 'opt-c1-double',
        decision: 'approve',
        text: 'Increase ciprofloxacin to 1000 mg BID concurrently: Overcome chelation binding saturation.',
        isCorrect: false,
        feedback:
          'Dangerous Approach: Bioavailability remains erratic and unpredictable; excessive fluoroquinolone dosing compounds risks of QTc prolongation and gastrointestinal toxicity.',
        misconceptionCode: 'MISC-EMPIRIC-OVERDOSE',
      },
    ],
    pharmacologicalMechanism:
      'The C3 carboxyl and C4 oxo oxygens of the fluoroquinolone form water-insoluble bidentate chelate complexes with divalent Ca²⁺ cations. This suppresses GI absorption by 40–50% (compared to >80% for trivalent Al³⁺/Mg²⁺). Separating administration times solves the interaction.',
    keyEvidenceCitation:
      'Goodman & Gilman 14th Ed. Ch. 59; Katzung 15th Ed. Ch. 44; Nix DE et al. Antimicrob Agents Chemother 1989.',
  },
  {
    caseId: 'simvastatin_clarithromycin',
    title: 'Case 2: CYP3A4 Mechanism-Based Inhibition',
    patientProfile: {
      age: 58,
      gender: 'Male',
      weightKg: 82,
      indication: 'Community-Acquired Pneumonia (CAP) + Primary Hypercholesterolemia',
      renalFunction: 'eGFR 65 mL/min/1.73m²',
      allergies: 'NKDA',
    },
    activeOrder: {
      drugName: 'Clarithromycin',
      dose: '500 mg PO',
      route: 'Oral Tablet',
      frequency: 'Twice daily (BID) - 7-day course',
    },
    concomitantMedication: {
      drugName: 'Simvastatin',
      dose: '40 mg PO',
      indication: 'Coronary Artery Disease Secondary Prophylaxis (Nightly QHS)',
    },
    clinicalScenario:
      'Oral clarithromycin 500 mg BID for 7 days is initiated for pneumonia. The patient chronically takes simvastatin 40 mg QHS. How do you manage this clinical order?',
    correctDecision: 'contraindicated_switch',
    options: [
      {
        id: 'opt-c2-approve',
        decision: 'approve',
        text: 'Approve order: Simvastatin is cleared primarily via OATP2B1 and renal excretion and will not interact.',
        isCorrect: false,
        feedback:
          'Fatal Pharmacokinetic Fallacy: Simvastatin is an inactive lipophilic lactone prodrug cleared almost completely by intestinal/hepatic CYP3A4 (F < 5%). OATP2B1 saturation is a fabricated mechanism.',
        misconceptionCode: 'MISC-INVENTED-TRANSPORTER-MECHANISM',
      },
      {
        id: 'opt-c2-switch',
        decision: 'contraindicated_switch',
        text: 'Contraindicated combination: Hold simvastatin during clarithromycin or switch antibiotic to Azithromycin.',
        isCorrect: true,
        feedback:
          'Outstanding Clinical Judgment! Clarithromycin is a potent mechanism-based CYP3A4 inactivator; it elevates simvastatin AUC by 10–12 fold (+1000–1100%), precipitating severe rhabdomyolysis and acute kidney injury. Azithromycin does not inhibit CYP3A4.',
      },
      {
        id: 'opt-c2-halve',
        decision: 'modify_spacing',
        text: 'Continue therapy with simvastatin reduced to 20 mg: 50% dose reduction ensures safe systemic exposure.',
        isCorrect: false,
        feedback:
          'Inadequate Protection: Against a 10–12 fold massive AUC surge, halving the dose leaves exposure 5–6 fold above toxic thresholds. Co-administration is strictly contraindicated.',
        misconceptionCode: 'MISC-LINEAR-DOSE-FALLACY',
      },
      {
        id: 'opt-c2-lovastatin',
        decision: 'approve',
        text: 'Substitute simvastatin with equivalent Lovastatin: Lovastatin is an alternative statin unaffected by macrolides.',
        isCorrect: false,
        feedback:
          'Erroneous Alternative: Lovastatin is also a major CYP3A4 substrate and carries the exact same fatal rhabdomyolysis risk.',
        misconceptionCode: 'MISC-CLASS-SUBSTRATE-CONFUSION',
      },
    ],
    pharmacologicalMechanism:
      'Clarithromycin forms a metabolite-intermediate (MI) complex with CYP3A4 heme iron, causing quasi-irreversible mechanism-based inactivation (MBI). First-pass clearance collapses and simvastatin AUC surges 10–12 fold (+1000–1100%). Hold statin or switch to Azithromycin.',
    keyEvidenceCitation:
      'FDA Drug Safety Communication; Goodman & Gilman 14th Ed. Ch. 35; Katzung 15th Ed. Ch. 35; Neuvonen PJ et al. Clin Pharmacol Ther 1998.',
  },
  {
    caseId: 'warfarin_heparin_bridge',
    title: 'Case 3: Warfarin Latency & Heparin Bridging',
    patientProfile: {
      age: 71,
      gender: 'Male',
      weightKg: 76,
      indication: 'Acute Proximal Deep Vein Thrombosis (DVT)',
      renalFunction: 'eGFR 58 mL/min/1.73m²',
      allergies: 'NKDA',
    },
    activeOrder: {
      drugName: 'Warfarin',
      dose: '5 mg PO Daily (Initiated 48h ago)',
      route: 'Oral',
      frequency: 'Once daily (Evening)',
    },
    concomitantMedication: {
      drugName: 'Enoxaparin (LMWH Heparin)',
      dose: '80 mg (1 mg/kg) SC',
      indication: 'Acute DVT Therapeutic Dosing (Twice daily Q12H)',
    },
    clinicalScenario:
      'A patient admitted for acute DVT was initiated concurrently on Enoxaparin and Warfarin 48h ago. Day 2 morning lab reveals INR = 2.2. The resident suggests: "INR reached therapeutic range (2.0-3.0), discontinue Enoxaparin to avoid bleeding risk." What is your clinical decision?',
    correctDecision: 'maintain_bridge',
    options: [
      {
        id: 'opt-c3-stop',
        decision: 'approve',
        text: 'Approve stopping Enoxaparin: Target INR achieved, discontinue heparin immediately to mitigate hemorrhage risk.',
        isCorrect: false,
        feedback:
          'Critical Clinical Pitfall! Early INR elevation reflects depletion of Factor VII (half-life ~6h). However, antithrombotic efficacy requires depletion of prothrombin (Factor II, t½ ~60–72h) and Factor X (t½ ~36–48h). Stopping heparin on Day 2 risks recurrent thrombosis and warfarin skin necrosis.',
        misconceptionCode: 'MISC-INR-EFFICACY-EQUATION',
      },
      {
        id: 'opt-c3-bridge',
        decision: 'maintain_bridge',
        text: 'Maintain heparin bridge: Enoxaparin must continue for at least 5 days and until INR is therapeutic for 24 hours.',
        isCorrect: true,
        feedback:
          'Correct and Life-Saving! True antithrombotic protection depends on depletion of Factor II and is delayed by 5–7 days. Rapid initial decline of Protein C (t½ ~8h) creates transient hypercoagulability. Bridging is mandatory.',
      },
      {
        id: 'opt-c3-double',
        decision: 'approve',
        text: 'Double warfarin to 10 mg and discontinue heparin: Higher dose accelerates antithrombotic onset.',
        isCorrect: false,
        feedback:
          'Erroneous & Dangerous: Doubling the dose when INR is already 2.2 triggers delayed accumulation, supratherapeutic INR, and life-threatening hemorrhage.',
        misconceptionCode: 'MISC-KINETIC-OVERCORRECTION',
      },
      {
        id: 'opt-c3-withhold',
        decision: 'approve',
        text: 'Withhold both warfarin and enoxaparin for 48 hours due to hypersensitivity concern.',
        isCorrect: false,
        feedback:
          'Unsound: Halting all anticoagulation in acute DVT invites fatal pulmonary embolism.',
        misconceptionCode: 'MISC-ACUTE-DISCONTINUATION',
      },
    ],
    pharmacologicalMechanism:
      'Warfarin inhibits VKORC1, blocking carboxylation of Factors II, VII, IX, X and Proteins C/S. Short half-life Factor VII (t½ ~6h) drops rapidly, elevating INR in 24–48h. However, real antithrombotic efficacy requires prothrombin (Factor II, t½ ~60–72h) and Factor X depletion (5–7 days). Bridging for at least 5 days is essential.',
    keyEvidenceCitation:
      'CHEST 2012/2018 Antithrombotic Therapy Guidelines; Goodman & Gilman 14th Ed. Ch. 34; Katzung 15th Ed. Ch. 34.',
  },
];

export const CANONICAL_CASES_AR: ClinicalOrderCase[] = [
  {
    caseId: 'ciprofloxacin_caco3',
    title: 'الحالة 1: الفلوروكينولون واستخلاب الكاتيونات',
    patientProfile: {
      age: 64,
      gender: 'أنثى',
      weightKg: 68,
      indication: 'التهاب الحويضة والكلية الحاد غير المصحوب بمضاعفات',
      renalFunction: 'معدل الترشيح الكبيبي 72 مل/دقيقة/1.73م²',
      allergies: 'لا توجد حساسية دوائية معروفة (NKDA)',
    },
    activeOrder: {
      drugName: 'سيبروفلوكساسين',
      dose: '500 ملغ فموياً',
      route: 'قرص فموي',
      frequency: 'مرتان يومياً (BID)',
    },
    concomitantMedication: {
      drugName: 'كربونات الكالسيوم (CaCO₃)',
      dose: '1000 ملغ (400 ملغ كالسيوم عنصري)',
      indication: 'قلة العظام / مكمل كالسيوم (3 مرات يومياً مع الوجبات)',
    },
    clinicalScenario:
      'تم وصف سيبروفلوكساسين 500 ملغ وأقراص كربونات الكالسيوم 1000 ملغ ليتم تناولهما معاً في جرعة الساعة 08:00 صباحاً. بصفتك صيدلياً سريرياً، هل توافق على هذه الوصفة؟',
    correctDecision: 'modify_spacing',
    options: [
      {
        id: 'opt-c1-approve',
        decision: 'approve',
        text: 'الموافقة على الوصفة كما هي: امتصاص الفلوروكينولون لا يتأثر سريرياً بأملاح الكالسيوم.',
        isCorrect: false,
        feedback:
          'تقييم خاطئ: تشكل كاتيونات Ca²⁺ ثنائية التكافؤ معقدات استخلابية ثنائية السن غير قابلة للذوبان مع مجموعتي 4-كيتو و3-كاربوكسيل في السيبروفلوكساسين، مما يخفض التوافر الحيوي الفموي بنسبة 40-50%. ينشأ خطر فشل العلاج.',
        misconceptionCode: 'MISC-CHELATION-NEGLECT',
      },
      {
        id: 'opt-c1-spacing',
        decision: 'modify_spacing',
        text: 'تعديل الفاصل الزمني للجرعات: إعطاء السيبروفلوكساسين قبل الكالسيوم بساعتين على الأقل أو بعده بـ 6 ساعات.',
        isCorrect: true,
        feedback:
          'قرار سريري ممتاز! تطبيق قاعدة الساعتين قبل أو الست ساعات بعد يمنع تشكل المعقدات الاستخلابية تماماً ويحافظ على المساحة تحت المنحنى (AUC) الفموية. لا حاجة للتحويل الوريدي.',
      },
      {
        id: 'opt-c1-iv',
        decision: 'contraindicated_switch',
        text: 'رفض الوصفة والتحويل الإلزامي إلى الحقن الوريدي: لا يمكن إعطاؤه فموياً لهبوط الامتصاص بأكثر من 80%.',
        isCorrect: false,
        feedback:
          'مغالطة الإفراط في العلاج: هبوط الامتصاص بأكثر من 80% يحدث مع مضادات الحموضة المحتوية على هيدروكسيد Al³⁺/Mg²⁺؛ بينما CaCO₃ يخفضه بنسبة 40-50% فقط. الفصل الزمني كافٍ لإنقاذ العلاج الفموي بأمان.',
        misconceptionCode: 'MISC-CATION-VALENCY-CONFLATION',
      },
      {
        id: 'opt-c1-double',
        decision: 'approve',
        text: 'مضاعفة جرعة السيبروفلوكساسين إلى 1000 ملغ مرتين يومياً بالتزامن: لتجاوز تشبع الاستخلاب.',
        isCorrect: false,
        feedback:
          'نهج خطير: يصبح التوافر الحيوي غير متوقع؛ والجرعات المفرطة تضاعف مخاطر استطالة فاصل QTc والسمية المعدية المعوية.',
        misconceptionCode: 'MISC-EMPIRIC-OVERDOSE',
      },
    ],
    pharmacologicalMechanism:
      'يشكل أكسجينا C3 كاربوكسيل وC4 أوكسو في الفلوروكينولون معقدات استخلابية غير ذوابة مع Ca²⁺ ثنائي التكافؤ، مما يثبط الامتصاص الهضمي بنسبة 40-50%. يُحل التداخل بفصل مواعيد التناول.',
    keyEvidenceCitation:
      'Goodman & Gilman 14th Ed. Ch. 59; Katzung 15th Ed. Ch. 44; Nix DE et al. Antimicrob Agents Chemother 1989.',
  },
  {
    caseId: 'simvastatin_clarithromycin',
    title: 'الحالة 2: تثبيط CYP3A4 القائم على الآلية',
    patientProfile: {
      age: 58,
      gender: 'ذكر',
      weightKg: 82,
      indication: 'ذات الرئة المكتسبة من المجتمع (CAP) + فرط كولسترول الدم الأولي',
      renalFunction: 'معدل الترشيح الكبيبي 65 مل/دقيقة/1.73م²',
      allergies: 'لا توجد حساسية دوائية معروفة (NKDA)',
    },
    activeOrder: {
      drugName: 'كلاريثروميسين',
      dose: '500 ملغ فموياً',
      route: 'قرص فموي',
      frequency: 'مرتان يومياً (BID) - دورة لمدة 7 أيام',
    },
    concomitantMedication: {
      drugName: 'سيمفاستاتين',
      dose: '40 ملغ فموياً',
      indication: 'الوقاية الثانوية من داء الشريان التاجي (ليلياً عند النوم)',
    },
    clinicalScenario:
      'تم وصف كلاريثروميسين فموي 500 ملغ مرتين يومياً لمدة 7 أيام لعلاج ذات الرئة. يتناول المريض سيمفاستاتين 40 ملغ ليلياً بشكل مزمن. كيف تدير هذه الوصفة؟',
    correctDecision: 'contraindicated_switch',
    options: [
      {
        id: 'opt-c2-approve',
        decision: 'approve',
        text: 'الموافقة على الوصفة: يتم التخلص من السيمفاستاتين أساساً عبر OATP2B1 والإطراح الكلوي ولن يتداخل.',
        isCorrect: false,
        feedback:
          'مغالطة دوائية مميتة: السيمفاستاتين طليعة دوائية لاكتونية تُستقلب كلياً تقريباً عبر CYP3A4 المعوي والكبدي (التوافر الحيوي < 5%). تشبع OATP2B1 آلية مختلقة.',
        misconceptionCode: 'MISC-INVENTED-TRANSPORTER-MECHANISM',
      },
      {
        id: 'opt-c2-switch',
        decision: 'contraindicated_switch',
        text: 'مزيج مضاد استطباب: يجب إيقاف السيمفاستاتين أثناء العلاج بالكلاريثروميسين أو التحويل إلى أزيثروميسين.',
        isCorrect: true,
        feedback:
          'قرار سريري سليم تماماً! الكلاريثروميسين مثبط قوي لـ CYP3A4 قائم على الآلية؛ يرفع AUC للسيمفاستاتين بمقدار 10-12 ضعفاً (+1000-1100%)، مما يثير خطر انحلال الربيدات والقصور الكلوي الحاد. الأزيثروميسين لا يثبط CYP3A4.',
      },
      {
        id: 'opt-c2-halve',
        decision: 'modify_spacing',
        text: 'مواصلة العلاج مع تخفيض جرعة السيمفاستاتين إلى 20 ملغ: خفض الجرعة بنسبة 50% يضمن مستوى آمناً.',
        isCorrect: false,
        feedback:
          'حماية غير كافية: أمام ارتفاع هائل بمقدار 10-12 ضعفاً، فإن خفض الجرعة للنصف يترك المستويات 5-6 أضعاف فوق العتبة السمية. الاستخدام المتزامن مضاد استطباب قطعي.',
        misconceptionCode: 'MISC-LINEAR-DOSE-FALLACY',
      },
      {
        id: 'opt-c2-lovastatin',
        decision: 'approve',
        text: 'استبدال السيمفاستاتين بجرعة مكافئة من لوفاستاتين: لوفاستاتين ستاتين بديل لا يتأثر بالماكروليدات.',
        isCorrect: false,
        feedback:
          'بديل غير صحيح: اللوفاستاتين مثل السيمفاستاتين ركيزة رئيسية لـ CYP3A4 ويحمل نفس الخطر القاتل لانحلال الربيدات.',
        misconceptionCode: 'MISC-CLASS-SUBSTRATE-CONFUSION',
      },
    ],
    pharmacologicalMechanism:
      'يرتبط الكلاريثروميسين بحديد الهيم في CYP3A4 مشكلاً معقداً وسيطاً شبه غير عكوس. ينهار التصفية الكبدية ويرتفع AUC للسيمفاستاتين بمقدار 10-12 ضعفاً. يجب إيقاف الستاتين أو التحويل إلى أزيثروميسين.',
    keyEvidenceCitation:
      'FDA Drug Safety Communication; Goodman & Gilman 14th Ed. Ch. 35; Katzung 15th Ed. Ch. 35; Neuvonen PJ et al. Clin Pharmacol Ther 1998.',
  },
  {
    caseId: 'warfarin_heparin_bridge',
    title: 'الحالة 3: تأخر تأثير الوارفارين والتجسير بالهيبارين',
    patientProfile: {
      age: 71,
      gender: 'ذكر',
      weightKg: 76,
      indication: 'الخثار الوريدي العميق الداني الحاد (DVT)',
      renalFunction: 'معدل الترشيح الكبيبي 58 مل/دقيقة/1.73م²',
      allergies: 'لا توجد حساسية دوائية معروفة (NKDA)',
    },
    activeOrder: {
      drugName: 'وارفارين',
      dose: '5 ملغ فموياً يومياً (بدأ قبل 48 ساعة)',
      route: 'فموي',
      frequency: 'مرة واحدة يومياً (مساءً)',
    },
    concomitantMedication: {
      drugName: 'إينوكسابارين (هيبارين منخفض الوزن الجزيئي)',
      dose: '80 ملغ (1 ملغ/كغ) تحت الجلد',
      indication: 'جرعة علاجية للـ DVT الحاد (مرتان يومياً Q12H)',
    },
    clinicalScenario:
      'مريض منوم لعلاج DVT حاد بدأ بالتزامن على إينوكسابارين ووارفارين قبل 48 ساعة. أظهرت تحاليل صباح اليوم الثاني: INR = 2.2. يقول الطبيب المقيم: "وصل INR إلى النطاق العلاجي (2.0-3.0)، فلنوقف الإينوكسابارين لتجنب النزيف". ما هو قرارك الصيدلاني؟',
    correctDecision: 'maintain_bridge',
    options: [
      {
        id: 'opt-c3-stop',
        decision: 'approve',
        text: 'الموافقة على إيقاف الإينوكسابارين: تحقق الهدف العلاجي لـ INR، ويجب إيقاف الهيبارين فوراً لتفادي النزف.',
        isCorrect: false,
        feedback:
          'فخ سريري حرج! الارتفاع المبكر لـ INR يعكس استنفاد العامل VII ذي نصف العمر القصير (~6 ساعات). لكن الفعالية الحقيقية المضادة للتخثر تتطلب نضوب العامل II (~60-72 ساعة) والعامل X (~36-48 ساعة). إيقاف الهيبارين في اليوم الثاني يعرض المريض لانتكاس الخثار ونخر الجلد بالوارفارين.',
        misconceptionCode: 'MISC-INR-EFFICACY-EQUATION',
      },
      {
        id: 'opt-c3-bridge',
        decision: 'maintain_bridge',
        text: 'مواصلة التجسير بالهيبارين: يجب عدم إيقاف الإينوكسابارين قبل 5 أيام على الأقل وبقاء INR في النطاق العلاجي ليومين متتاليين.',
        isCorrect: true,
        feedback:
          'صحيح ومنقذ للحياة! الحماية الحقيقية المضادة للتخثر تتأخر من 5-7 أيام بانتظار نضوب العامل II (البروثرومبين). كما أن الهبوط السريع لبروتين C (~8 ساعات) يخلق حالة مؤقتة مؤهبة للتخثر. التجسير إلزامي.',
      },
      {
        id: 'opt-c3-double',
        decision: 'approve',
        text: 'مضاعفة جرعة الوارفارين إلى 10 ملغ وإيقاف الهيبارين: الجرعة الأعلى تسرع الأثر المضاد للتخثر.',
        isCorrect: false,
        feedback:
          'خاطئ وخطير: مضاعفة الجرعة بينما INR بالفعل 2.2 تؤدي لتراكم متأخر وقيم فوق علاجية ونزف جسيم مهدد للحياة.',
        misconceptionCode: 'MISC-KINETIC-OVERCORRECTION',
      },
      {
        id: 'opt-c3-withhold',
        decision: 'approve',
        text: 'إيقاف الوارفارين والإينوكسابارين معاً لمدة 48 ساعة تحسباً لفرط التحسس.',
        isCorrect: false,
        feedback:
          'خاطئ: إيقاف كامل مضادات التخثر في مريض DVT حاد يدعو إلى انصمام رئوي مميت.',
        misconceptionCode: 'MISC-ACUTE-DISCONTINUATION',
      },
    ],
    pharmacologicalMechanism:
      'يثبط الوارفارين VKORC1 مانعاً كربكسلة العوامل II, VII, IX, X والبروتينين C/S. ينضب العامل VII سريعاً ليرتفع INR في 24-48 ساعة، لكن الوقاية الحقيقية تتطلب نضوب البروثرومبين (العامل II) والعامل X (5-7 أيام). التجسير بالهيبارين لـ 5 أيام على الأقل إلزامي.',
    keyEvidenceCitation:
      'CHEST 2012/2018 Antithrombotic Therapy Guidelines; Goodman & Gilman 14th Ed. Ch. 34; Katzung 15th Ed. Ch. 34.',
  },
];

const STRINGS = {
  tr: {
    stationBadge: 'Klinik Eczacı İstemi Doğrulama İstasyonu',
    pharmacovigilanceTag: '[Vaka Odaklı Farmakovijilans]',
    stationTitle: 'Klinik İlaç Etkileşim ve Dozlama Doğrulama',
    caseSelectorAria: 'Klinik Vaka Seçimi',
    tabCase1: '1: Florokinolon & Ca²⁺',
    tabCase2: '2: Statin & Makrolid',
    tabCase3: '3: Varfarin & Heparin',
    patientChart: 'Hasta Dosyası',
    inpatientWard: 'YATAKLI SERVİS',
    ageGender: 'Yaş/Cinsiyet:',
    yearsOld: 'yaş',
    weight: 'Ağırlık:',
    indication: 'Endikasyon:',
    renalFunction: 'Böbrek Fonksiyonu:',
    allergies: 'Alerjiler:',
    medicationRegimen: 'İlaç Tedavisi ve Doğrulama Bekleyen İstem',
    orderAwaitingVerification: 'Doğrulama İstenen İstem:',
    dose: 'Doz:',
    frequency: 'Sıklık:',
    concomitantTherapy: 'Eşzamanlı Tedavi / Lab:',
    detail: 'Detay:',
    clinicalScenario: 'Klinik Senaryo: ',
    decisionTitle: 'Eczacı Doğrulama Kararı & Klinik Müdahale Seçeneği:',
    optionsAria: 'Klinik Seçenekler',
    evalCompleted: 'Değerlendirme Tamamlandı',
    selectOneOption: 'Lütfen 1 Seçenek Belirleyin',
    clinicalRationale: '✓ Klinik Gerekçe: ',
    diagnosticError: '✗ Hata Tanısı: ',
    verifyBtn: 'İstemi Onayla / Kararı Kaydet',
    tryAgainBtn: 'Tekrar Dene',
    showMechanismBtn: 'Biyofiziksel Mekanizma İncele',
    hideMechanismBtn: 'Mekanizma Notunu Gizle',
    source: 'Kaynak:',
    mechanismSummary: 'Moleküler & Farmakolojik Mekanizma Özeti',
    mechanismAssumption: 'Klinik etkileşim hesaplamaları in-vivo insan farmakokinetik ve kararlı durum çalışmalarına dayanır.',
  },
  en: {
    stationBadge: 'Clinical Pharmacist Order Verification Station',
    pharmacovigilanceTag: '[Case-Based Pharmacovigilance]',
    stationTitle: 'Clinical Drug Interaction & Dosing Verification',
    caseSelectorAria: 'Clinical Case Selection',
    tabCase1: '1: Fluoroquinolone & Ca²⁺',
    tabCase2: '2: Statin & Macrolide',
    tabCase3: '3: Warfarin & Heparin',
    patientChart: 'Patient Chart',
    inpatientWard: 'INPATIENT WARD',
    ageGender: 'Age/Gender:',
    yearsOld: 'yo',
    weight: 'Weight:',
    indication: 'Indication:',
    renalFunction: 'Renal Function:',
    allergies: 'Allergies:',
    medicationRegimen: 'Medication Regimen & Queued Order',
    orderAwaitingVerification: 'Order Awaiting Verification:',
    dose: 'Dose:',
    frequency: 'Frequency:',
    concomitantTherapy: 'Concomitant Therapy / Lab:',
    detail: 'Detail:',
    clinicalScenario: 'Clinical Scenario: ',
    decisionTitle: 'Pharmacist Verification Decision & Intervention:',
    optionsAria: 'Clinical Options',
    evalCompleted: 'Evaluation Completed',
    selectOneOption: 'Please Select 1 Option',
    clinicalRationale: '✓ Clinical Rationale: ',
    diagnosticError: '✗ Diagnostic Misconception: ',
    verifyBtn: 'Verify Order / Record Decision',
    tryAgainBtn: 'Try Again',
    showMechanismBtn: 'Explore Biophysical Mechanism',
    hideMechanismBtn: 'Hide Mechanism Note',
    source: 'Source:',
    mechanismSummary: 'Molecular & Pharmacological Mechanism Summary',
    mechanismAssumption: 'Clinical interaction evaluations are based on in-vivo human pharmacokinetics and steady-state studies.',
  },
  ar: {
    stationBadge: 'محطة التحقق من الوصفات السريرية للصيدلي',
    pharmacovigilanceTag: '[التيقظ الدوائي القائم على الحالات]',
    stationTitle: 'التحقق السريري من التداخلات الدوائية والجرعات',
    caseSelectorAria: 'اختيار الحالة السريرية',
    tabCase1: '1: الفلوروكينولون و Ca²⁺',
    tabCase2: '2: الستاتين والماكروليد',
    tabCase3: '3: الوارفارين والهيبارين',
    patientChart: 'ملف المريض',
    inpatientWard: 'قسم التنويم',
    ageGender: 'العمر/الجنس:',
    yearsOld: 'سنة',
    weight: 'الوزن:',
    indication: 'دواعي الاستعمال:',
    renalFunction: 'وظائف الكلى:',
    allergies: 'الحساسية:',
    medicationRegimen: 'النظام العلاجي والوصفة بانتظار التحقق',
    orderAwaitingVerification: 'الوصفة المطلوب التحقق منها:',
    dose: 'الجرعة:',
    frequency: 'التكرار:',
    concomitantTherapy: 'العلاج المتزامن / التحاليل:',
    detail: 'التفاصيل:',
    clinicalScenario: 'السيناريو السريري: ',
    decisionTitle: 'قرار الصيدلي السريري وخيار التدخل:',
    optionsAria: 'الخيارات السريرية',
    evalCompleted: 'تم التقييم',
    selectOneOption: 'يرجى تحديد خيار واحد',
    clinicalRationale: '✓ التعليل السريري: ',
    diagnosticError: '✗ تشخيص الخطأ: ',
    verifyBtn: 'تأكيد الوصفة / حفظ القرار',
    tryAgainBtn: 'إعادة المحاولة',
    showMechanismBtn: 'فحص الآلية البيوفيزيائية',
    hideMechanismBtn: 'إخفاء ملاحظة الآلية',
    source: 'المصدر:',
    mechanismSummary: 'ملخص الآلية الجزيئية والدوائية',
    mechanismAssumption: 'تستند حسابات التداخلات السريرية إلى دراسات الحركية الدوائية وحالة الاستقرار لدى الإنسان في الجسم الحي.',
  },
};

export interface ClinicalOrderVerificationProps {
  config?: ClinicalOrderVerificationConfig;
  locale?: 'tr' | 'ar' | 'en';
  className?: string;
  onVerify?: (result: { caseId: ClinicalCaseId; isCorrect: boolean; selectedOptionId: string }) => void;
}

export const ClinicalOrderVerification: React.FC<ClinicalOrderVerificationProps> = ({
  config,
  locale = 'tr',
  className = '',
  onVerify,
}) => {
  const t = STRINGS[locale] ?? STRINGS.tr;
  const isRtl = locale === 'ar';
  const defaultCases = locale === 'ar' ? CANONICAL_CASES_AR : locale === 'en' ? CANONICAL_CASES_EN : CANONICAL_CLINICAL_CASES;
  const cases = config?.cases || defaultCases;
  const [selectedCaseId, setSelectedCaseId] = useState<ClinicalCaseId>(
    config?.initialCaseId || 'ciprofloxacin_caco3'
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showMechanismDeepDive, setShowMechanismDeepDive] = useState<boolean>(false);

  const fallbackCase = CANONICAL_CLINICAL_CASES[0]!;
  const activeCase: ClinicalOrderCase =
    cases.find((c) => c.caseId === selectedCaseId) || cases[0] || fallbackCase;
  const selectedOption = activeCase.options.find((o) => o.id === selectedOptionId);

  const handleSelectCase = (caseId: ClinicalCaseId) => {
    setSelectedCaseId(caseId);
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setShowMechanismDeepDive(false);
  };

  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitVerification = () => {
    if (!selectedOption || hasSubmitted) return;
    setHasSubmitted(true);
    if (onVerify) {
      onVerify({
        caseId: activeCase.caseId,
        isCorrect: selectedOption.isCorrect,
        selectedOptionId: selectedOption.id,
      });
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setShowMechanismDeepDive(false);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-slate-900 text-start dark:border-[#2F2F2F] dark:bg-[#1E1E1E] dark:text-slate-100 ${className}`}
      data-testid="clinical-order-verification-station"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#2F2F2F] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {t.stationBadge}
            </span>
            <span className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.pharmacovigilanceTag}
            </span>
          </div>
          <h2 className="mt-1 font-heading text-lg font-bold text-slate-900 dark:text-white">
            {t.stationTitle}
          </h2>
        </div>

        {/* Case selector tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.caseSelectorAria}>
          {cases.map((c) => {
            const isCurrent = c.caseId === selectedCaseId;
            return (
              <button
                key={c.caseId}
                role="tab"
                aria-selected={isCurrent}
                onClick={() => handleSelectCase(c.caseId)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors border ${
                  isCurrent
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-emerald-500 dark:text-slate-950 dark:border-emerald-500 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 dark:bg-[#252525] dark:text-slate-400 dark:border-[#333333] dark:hover:bg-[#2E2E2E]'
                }`}
              >
                {c.caseId === 'ciprofloxacin_caco3' && t.tabCase1}
                {c.caseId === 'simvastatin_clarithromycin' && t.tabCase2}
                {c.caseId === 'warfarin_heparin_bridge' && t.tabCase3}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Overview & Patient Vignette */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Patient Profile Box */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 dark:border-[#2F2F2F] dark:bg-[#252525]/50">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#2F2F2F] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t.patientChart}
            </span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {t.inpatientWard}
            </span>
          </div>
          <div className="mt-2.5 space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300">
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100">{t.ageGender}</span> {activeCase.patientProfile.age} {t.yearsOld},{' '}
              {activeCase.patientProfile.gender}
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100">{t.weight}</span> {activeCase.patientProfile.weightKg} kg
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100">{t.indication}</span>{' '}
              <span className="font-semibold text-slate-900 dark:text-slate-100">{activeCase.patientProfile.indication}</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100">{t.renalFunction}</span>{' '}
              <span className="rounded bg-amber-500/10 px-1.5 py-0.5 font-medium text-amber-700 dark:text-amber-400 border border-amber-500/20">
                {activeCase.patientProfile.renalFunction}
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100">{t.allergies}</span> {activeCase.patientProfile.allergies}
            </div>
          </div>
        </div>

        {/* Active Order & Concomitant Meds */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 dark:border-[#2F2F2F] dark:bg-[#252525]/50 md:col-span-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#2F2F2F] pb-2">
            {t.medicationRegimen}
          </div>
          <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-sky-500/20 bg-sky-50/50 p-3 dark:border-sky-500/30 dark:bg-sky-950/20">
              <div className="text-[11px] font-bold uppercase text-sky-600 dark:text-sky-400">
                {t.orderAwaitingVerification}
              </div>
              <div className="mt-1 font-bold text-sm text-slate-900 dark:text-slate-100">
                {activeCase.activeOrder.drugName}
              </div>
              <div className="font-mono text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {t.dose} <span className="font-bold text-slate-800 dark:text-slate-200">{activeCase.activeOrder.dose}</span> (
                {activeCase.activeOrder.route})
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {t.frequency} {activeCase.activeOrder.frequency}
              </div>
            </div>

            <div className="rounded-lg border border-amber-500/20 bg-amber-50/50 p-3 dark:border-amber-500/30 dark:bg-amber-950/20">
              <div className="text-[11px] font-bold uppercase text-amber-600 dark:text-amber-400">
                {t.concomitantTherapy}
              </div>
              <div className="mt-1 font-bold text-sm text-slate-900 dark:text-slate-100">
                {activeCase.concomitantMedication.drugName}
              </div>
              <div className="font-mono text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {t.dose} {activeCase.concomitantMedication.dose}
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {t.detail} {activeCase.concomitantMedication.indication}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg border-l-2 border-emerald-500 bg-slate-100/70 p-3 text-xs text-slate-700 dark:bg-[#1E1E1E] dark:text-slate-300">
            <span className="font-bold uppercase mr-1 text-slate-900 dark:text-slate-100">{t.clinicalScenario}</span>
            {activeCase.clinicalScenario}
          </div>
        </div>
      </div>

      {/* Decision Options */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2F2F2F] dark:bg-[#1E1E1E]">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#2F2F2F] pb-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {t.decisionTitle}
          </div>
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
            {hasSubmitted ? t.evalCompleted : t.selectOneOption}
          </span>
        </div>

        <div className="mt-3 space-y-2.5" role="radiogroup" aria-label={t.optionsAria}>
          {activeCase.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let containerStyle = 'bg-white hover:bg-slate-50 border-slate-200 dark:bg-[#1E1E1E] dark:hover:bg-[#252525] dark:border-[#2F2F2F]';

            if (hasSubmitted) {
              if (option.isCorrect) {
                containerStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200';
              } else if (isSelected && !option.isCorrect) {
                containerStyle = 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-200';
              } else {
                containerStyle = 'bg-slate-50 dark:bg-[#252525] opacity-50 border-slate-200 dark:border-[#2F2F2F]';
              }
            } else if (isSelected) {
              containerStyle = 'bg-emerald-500/5 border-emerald-500 dark:bg-emerald-500/10 dark:border-emerald-500 ring-1 ring-emerald-500';
            }

            return (
              <div
                key={option.id}
                role="radio"
                tabIndex={0}
                aria-checked={isSelected}
                onClick={() => handleSelectOption(option.id)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    handleSelectOption(option.id);
                  }
                }}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all ${containerStyle}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-[#252525]'
                    }`}
                  >
                    {isSelected ? '✓' : ''}
                  </span>
                  <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                    {option.text}
                  </div>
                </div>

                {hasSubmitted && (option.isCorrect || isSelected) && (
                  <div
                    className={`mt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 pt-2.5 text-xs font-normal ${
                      option.isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    <span className="font-bold uppercase mr-1">
                      {option.isCorrect ? t.clinicalRationale : t.diagnosticError}
                    </span>
                    {option.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-[#2F2F2F] pt-3">
          <div className="flex items-center gap-2">
            {!hasSubmitted ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleSubmitVerification}
                className={`rounded-lg px-5 py-2 font-semibold text-xs transition-colors shadow-sm ${
                  selectedOptionId
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-slate-200 text-slate-400 dark:bg-[#2E2E2E] dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                {t.verifyBtn}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-xs text-slate-700 dark:border-[#2F2F2F] dark:bg-[#252525] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2E2E2E] transition-colors"
              >
                {t.tryAgainBtn}
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowMechanismDeepDive(!showMechanismDeepDive)}
              className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 dark:border-[#2F2F2F] dark:bg-[#252525] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2E2E2E] transition-colors"
            >
              {showMechanismDeepDive ? t.hideMechanismBtn : t.showMechanismBtn}
            </button>
          </div>

          <div className="text-right text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {t.source} <span className="font-semibold text-slate-700 dark:text-slate-300">{activeCase.keyEvidenceCitation}</span>
          </div>
        </div>
      </div>

      {/* Mechanism Deep-Dive Panel */}
      {showMechanismDeepDive && (
        <div className="mt-4 rounded-xl border border-sky-500/20 bg-sky-50/50 p-4 dark:border-sky-500/30 dark:bg-sky-950/20">
          <div className="flex items-center justify-between border-b border-sky-500/20 pb-2">
            <span className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400">
              {t.mechanismSummary}
            </span>
            <span className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-300">
              {activeCase.caseId}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
            {activeCase.pharmacologicalMechanism}
          </p>
          <div className="mt-3">
            <ModelIllustrationNotice
              locale={locale}
              equation={activeCase.keyEvidenceCitation}
              sourceReference="Goodman & Gilman 14. Baskı; Katzung 15. Baskı"
              assumptions={[t.mechanismAssumption]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

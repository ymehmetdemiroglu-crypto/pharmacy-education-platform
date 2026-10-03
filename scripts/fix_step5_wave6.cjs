const fs = require('fs');
const path = require('path');

const l11Step5Config = {
  title: "GABA-A Konsantrasyon-Yanıt ve Allosterik Modülasyon",
  prompt: "GABA konsantrasyonunu artırın; diazepam ekleyerek sola kaymayı ve flumazenil ile nötrleşmeyi izleyin.",
  defaultEc50: 10,
  defaultEmax: 100,
  defaultHillSlope: 1,
  modes: [
    "agonist",
    "competitive_antagonist",
    "partial_agonist"
  ],
  source: {
    file: "Santral Sinir Sistemi.pdf",
    page: 6
  },
  explanation: "Diazepam pozitif allosterik modülatör (PAM) olarak GABA'nın afinitesini artırır ve eğriyi sola kaydırır (EC50 10 uM'den 1 uM'ye düşer). Flumazenil ise BZD bölgesinde yarışmalı nötral antagonist olarak etkiyi sıfırlar."
};

const l12Step5Config = {
  title: "Haloperidol - D2 Dopamin Reseptör Kenetlenmesi",
  prompt: "Haloperidolün gruplarını D2 cebindeki amino asitlerle eşleştirerek yüksek affiniteli blokajın kimyasını çözün.",
  drugName: "Haloperidol",
  receptorName: "D2 Dopamin Reseptörü",
  pairs: [
    {
      id: "pair_tert_amine",
      drugGroup: "Protonlanmış Tersiyer Amin (Piperidin)",
      correctResidueId: "res_asp114",
      bondType: "ionic",
      energyKcalMol: "-8 ila -12 kcal/mol",
      explanation: "Fizyolojik pH'ta pozitif yüklü piperidin azotu, TM3 heliksindeki negatif Asp114 karboksilatı ile en kritik elektrostatik tuz köprüsünü kurar."
    },
    {
      id: "pair_fluorophenyl",
      drugGroup: "p-Fluorofenil Halkası (Bütirofenon)",
      correctResidueId: "res_val115_trp386",
      bondType: "van_der_waals",
      energyKcalMol: "-3 ila -5 kcal/mol",
      explanation: "Lipofilik p-fluorofenil ucu, TM3/TM6 helikslerindeki Val115 ve Trp386 kalıntılarının oluşturduğu derin hidrofobik cebe oturur."
    },
    {
      id: "pair_chlorophenyl",
      drugGroup: "4-(p-Klorofenil) Aromatik Halkası",
      correctResidueId: "res_phe390",
      bondType: "pi_pi",
      energyKcalMol: "-4 ila -6 kcal/mol",
      explanation: "Klorlu benzen halkası, TM6'daki Phe390 aromatik halkasıyla paralel pi-pi istiflenme yaparak bağlanmayı sıkılaştırır."
    },
    {
      id: "pair_hydroxyl",
      drugGroup: "4-Hidroksil Grubu (-OH)",
      correctResidueId: "res_ser193",
      bondType: "h_bond",
      energyKcalMol: "-2 ila -4 kcal/mol",
      explanation: "Piperidin C4 pozisyonundaki hidroksil grubu, TM5 heliksindeki Ser193 kalıntısıyla yönlendirici hidrojen bağı oluşturur."
    }
  ],
  residues: [
    {
      id: "res_asp114",
      residueName: "Asp114 (TM3)",
      description: "Negatif yüklü karboksilat kalıntısı (anyonik kenetlenme merkezi)"
    },
    {
      id: "res_val115_trp386",
      residueName: "Val115 / Trp386 (TM3/TM6)",
      description: "Derin apolar hidrofobik cep kalıntıları"
    },
    {
      id: "res_phe390",
      residueName: "Phe390 (TM6)",
      description: "Aromatik benzen halkalı fenilalanin kalıntısı"
    },
    {
      id: "res_ser193",
      residueName: "Ser193 (TM5)",
      description: "Polar hidrojen bağı verici ve alıcı serin kalıntısı"
    },
    {
      id: "res_glu95",
      residueName: "Glu95 (TM2)",
      description: "Ekstraselüler yüzey asidik kalıntısı (cep dışı tuzak kalıntı)"
    }
  ],
  source: {
    file: "Santral Sinir Sistemi.pdf",
    page: 22
  }
};

function fixStep5(filePath, widgetType, config) {
  const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const step5 = lesson.steps[4];
  step5.widgetType = widgetType;
  step5.widget = {
    type: widgetType,
    config: JSON.parse(JSON.stringify(config))
  };
  step5.config = JSON.parse(JSON.stringify(config));
  step5.conceptCheck = { options: [] };
  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2) + '\n', 'utf8');
  console.log(`Step 5 fixed in ${filePath}`);
}

const worktreeDir = 'C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/pharmacology/lessons';
const mainRepoDir = 'C:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons';

fixStep5(path.join(worktreeDir, 'lesson-11.json'), 'DoseResponseCurve', l11Step5Config);
fixStep5(path.join(mainRepoDir, 'lesson-11.json'), 'DoseResponseCurve', l11Step5Config);

fixStep5(path.join(worktreeDir, 'lesson-12.json'), 'ReceptorLigandMatcher', l12Step5Config);
fixStep5(path.join(mainRepoDir, 'lesson-12.json'), 'ReceptorLigandMatcher', l12Step5Config);

console.log('Step 5 synchronization complete!');

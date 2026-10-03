const fs = require('fs');

let code = fs.readFileSync('scripts/apply_pharm_wave4_audit.cjs', 'utf8');

// Replace all occurrences of step.hints = newStepData.hints;
code = code.split('step.hints = newStepData.hints;').join(`if (newStepData.hints) {
      step.hints = [
        { tier: 1, tr: newStepData.hints.nudge.tr, ar: newStepData.hints.nudge.ar, en: newStepData.hints.nudge.en },
        { tier: 2, tr: newStepData.hints.clue.tr, ar: newStepData.hints.clue.ar, en: newStepData.hints.clue.en },
        { tier: 3, tr: newStepData.hints.solution.tr, ar: newStepData.hints.solution.ar, en: newStepData.hints.solution.en }
      ];
    }`);

// Replace step5 hints in updateLesson07
const oldL7Pattern = /step5\.hints = \{[\s\S]*?solution: \{[\s\S]*?\}[\s\S]*?\};/;
const newL7Replacement = `step5.hints = [
        {
          tier: 1,
          tr: "Epinefrinin pozitif yüklü amin grubunu, katekol halkasını ve kiral hidroksilini inceleyin.",
          ar: "افحص مجموعة الأمين الموجبة وحلقة الكاتيكول والهيدروكسيل الفراغي في الإبينفرين.",
          en: "Examine epinephrine's positively charged amine, catechol ring, and chiral beta-hydroxyl group."
        },
        {
          tier: 2,
          tr: "Asp113 iyonik bağ için negatif karboksilat sağlar; Ser204 katekol ile H-bağı yapar; Phe290 aromatik istiflenme kurar.",
          ar: "يوفر Asp113 كربوكسيلات سالبة للرابط الأيوني؛ ويشكل Ser204 رابطاً هيدروجينياً؛ بينما يتيح Phe290 تكدساً عطرياً.",
          en: "Asp113 provides a carboxylate for ionic bonding; Ser204 H-bonds with catechol; Phe290 forms pi-stacking."
        },
        {
          tier: 3,
          tr: "Protonlanmış amini Asp113'e (iyonik), katekol OH'yi Ser204'e (H-bağı), aromatik halkayı Phe290'a (pi-pi) ve beta-OH'yi Asn293'e (H-bağı) kenetleyin.",
          ar: "اربط الأمين البروتوني بـ Asp113 (أيوني)، وهيدروكسيل الكاتيكول بـ Ser204 (هيدروجيني)، والحلقة بـ Phe290 (باي-باي)، وبيتا-OH بـ Asn293.",
          en: "Match protonated amine to Asp113 (ionic), catechol meta-OH to Ser204 (H-bond), aromatic ring to Phe290 (pi-pi), and beta-OH to Asn293 (H-bond)."
        }
      ];`;

code = code.replace(oldL7Pattern, newL7Replacement);

// Replace step5 hints in updateLesson08 (second occurrence of the pattern)
const newL8Replacement = `step5.hints = [
        {
          tier: 1,
          tr: "Asetilkolinin pozitif yüklü kuaterner amonyumunu, ester karbonilini ve etilen zincirini inceleyin.",
          ar: "افحص الأمونيوم الرابعي الموجب وإستر الكربونيل وجسر الإيثيلين في الأسيتيل كولين.",
          en: "Examine acetylcholine's positively charged quaternary ammonium, ester carbonyl, and ethylene spacer."
        },
        {
          tier: 2,
          tr: "Asp147 kuaterner amonyum ile iyonik bağ kurar; Tyr506 katyon-pi kafesi oluşturur; Asn507 ester oksijeniyle H-bağı yapar.",
          ar: "يشكل Asp147 رابطاً أيونياً مع الأمونيوم؛ ويوفر Tyr506 قفصاً عطرياً (كاتيون-باي)؛ ويصنع Asn507 رابطاً هيدروجينياً مع الإستر.",
          en: "Asp147 provides an ionic anchor for quaternary ammonium; Tyr506 creates a cation-pi cage; Asn507 H-bonds with carbonyl."
        },
        {
          tier: 3,
          tr: "Kuaterner azotu Asp147'ye (iyonik), kolin metillerini Tyr506'ya (pi-pi), karbonil oksijenini Asn507'ye (H-bağı) ve etilen omurgasını Trp199'a (van der Waals) yerleştirin.",
          ar: "اربط الأمونيوم الرابعي بـ Asp147 (أيوني)، والميثيل بـ Tyr506 (كاتيون-باي)، وأكسجين الكربونيل بـ Asn507 (هيدروجيني)، والإيثيلين بـ Trp199.",
          en: "Dock quaternary ammonium into Asp147 (ionic), methyl groups into Tyr506 (cation-pi), ester carbonyl into Asn507 (H-bond), and ethylene into Trp199 (van der Waals)."
        }
      ];`;

code = code.replace(oldL7Pattern, newL8Replacement);

fs.writeFileSync('scripts/apply_pharm_wave4_audit.cjs', code, 'utf8');
console.log('Fixed apply_pharm_wave4_audit.cjs successfully!');

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

export interface ClinicalOrderVerificationProps {
  config?: ClinicalOrderVerificationConfig;
  className?: string;
  onVerify?: (result: { caseId: ClinicalCaseId; isCorrect: boolean; selectedOptionId: string }) => void;
}

export const ClinicalOrderVerification: React.FC<ClinicalOrderVerificationProps> = ({
  config,
  className = '',
  onVerify,
}) => {
  const cases = config?.cases || CANONICAL_CLINICAL_CASES;
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
      className={`border-4 border-black bg-[#FFF8E7] p-5 shadow-[6px_6px_0px_#000000] text-black ${className}`}
      data-testid="clinical-order-verification-station"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-black pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#4D96FF] px-2 py-0.5 text-xs font-black uppercase text-white border-2 border-black shadow-[2px_2px_0px_#000000]">
              Klinik Eczacı İstemi Doğrulama İstasyonu
            </span>
            <span className="font-mono text-xs font-bold text-gray-700">
              [Vaka Odaklı Farmakovijilans]
            </span>
          </div>
          <h2 className="mt-1 font-heading text-xl font-black text-black">
            Klinik İlaç Etkileşim ve Dozlama Doğrulama
          </h2>
        </div>

        {/* Case selector tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Klinik Vaka Seçimi">
          {cases.map((c) => {
            const isCurrent = c.caseId === selectedCaseId;
            return (
              <button
                key={c.caseId}
                role="tab"
                aria-selected={isCurrent}
                onClick={() => handleSelectCase(c.caseId)}
                className={`border-2 border-black px-3 py-1 text-xs font-black uppercase transition-transform ${
                  isCurrent
                    ? 'bg-[#FFD93D] shadow-[3px_3px_0px_#000000] -translate-y-0.5'
                    : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_#000000]'
                }`}
              >
                {c.caseId === 'ciprofloxacin_caco3' && '1: Florokinolon & Ca²⁺'}
                {c.caseId === 'simvastatin_clarithromycin' && '2: Statin & Makrolid'}
                {c.caseId === 'warfarin_heparin_bridge' && '3: Varfarin & Heparin'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Overview & Patient Vignette */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Patient Profile Box */}
        <div className="border-3 border-black bg-white p-3 shadow-[4px_4px_0px_#000000]">
          <div className="flex items-center justify-between border-b-2 border-black pb-1">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Hasta Dosyası
            </span>
            <span className="bg-[#6BCB77] px-1.5 py-0.2 text-[10px] font-black text-black border border-black">
              YATAKLI SERVİS
            </span>
          </div>
          <div className="mt-2 space-y-1 font-mono text-xs text-gray-800">
            <div>
              <span className="font-bold">Yaş/Cinsiyet:</span> {activeCase.patientProfile.age} yaş,{' '}
              {activeCase.patientProfile.gender}
            </div>
            <div>
              <span className="font-bold">Ağırlık:</span> {activeCase.patientProfile.weightKg} kg
            </div>
            <div>
              <span className="font-bold">Endikasyon:</span>{' '}
              <span className="font-semibold text-black">{activeCase.patientProfile.indication}</span>
            </div>
            <div>
              <span className="font-bold">Böbrek Fonksiyonu:</span>{' '}
              <span className="bg-yellow-100 px-1 font-bold text-black border border-black">
                {activeCase.patientProfile.renalFunction}
              </span>
            </div>
            <div>
              <span className="font-bold">Alerjiler:</span> {activeCase.patientProfile.allergies}
            </div>
          </div>
        </div>

        {/* Active Order & Concomitant Meds */}
        <div className="border-3 border-black bg-white p-3 shadow-[4px_4px_0px_#000000] md:col-span-2">
          <div className="text-xs font-black uppercase tracking-wider text-black border-b-2 border-black pb-1">
            İlaç Tedavisi ve Doğrulama Bekleyen İstem
          </div>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="border-2 border-black bg-[#E8F0FE] p-2.5 shadow-[2px_2px_0px_#000000]">
              <div className="text-[11px] font-black uppercase text-[#1A73E8]">
                Doğrulama İstenen İstem:
              </div>
              <div className="mt-1 font-bold text-sm text-black">
                {activeCase.activeOrder.drugName}
              </div>
              <div className="font-mono text-xs text-gray-900 mt-0.5">
                Doz: <span className="font-black">{activeCase.activeOrder.dose}</span> (
                {activeCase.activeOrder.route})
              </div>
              <div className="font-mono text-xs text-gray-700">
                Sıklık: {activeCase.activeOrder.frequency}
              </div>
            </div>

            <div className="border-2 border-black bg-[#FFF3E0] p-2.5 shadow-[2px_2px_0px_#000000]">
              <div className="text-[11px] font-black uppercase text-[#E65100]">
                Eşzamanlı Tedavi / Lab:
              </div>
              <div className="mt-1 font-bold text-sm text-black">
                {activeCase.concomitantMedication.drugName}
              </div>
              <div className="font-mono text-xs text-gray-900 mt-0.5">
                Doz: {activeCase.concomitantMedication.dose}
              </div>
              <div className="font-mono text-xs text-gray-700">
                Detay: {activeCase.concomitantMedication.indication}
              </div>
            </div>
          </div>

          <div className="mt-3 border-l-4 border-[#FF9F45] bg-[#FFF8E7] p-2 text-xs font-medium text-black">
            <span className="font-black uppercase">Klinik Senaryo: </span>
            {activeCase.clinicalScenario}
          </div>
        </div>
      </div>

      {/* Decision Options */}
      <div className="mt-5 border-3 border-black bg-white p-4 shadow-[4px_4px_0px_#000000]">
        <div className="flex items-center justify-between border-b-2 border-black pb-2">
          <div className="text-xs font-black uppercase tracking-wider text-black">
            Eczacı Doğrulama Kararı & Klinik Müdahale Seçeneği:
          </div>
          <span className="font-mono text-xs text-gray-600">
            {hasSubmitted ? 'Değerlendirme Tamamlandı' : 'Lütfen 1 Seçenek Belirleyin'}
          </span>
        </div>

        <div className="mt-3 space-y-2.5" role="radiogroup" aria-label="Klinik Seçenekler">
          {activeCase.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let containerBg = 'bg-white hover:bg-yellow-50';
            let borderStyle = 'border-2 border-black';

            if (hasSubmitted) {
              if (option.isCorrect) {
                containerBg = 'bg-[#E8F5E9] border-[#2E7D32] border-3 shadow-[3px_3px_0px_#2E7D32]';
              } else if (isSelected && !option.isCorrect) {
                containerBg = 'bg-[#FFEBEE] border-[#C62828] border-3 shadow-[3px_3px_0px_#C62828]';
              } else {
                containerBg = 'bg-gray-50 opacity-60';
              }
            } else if (isSelected) {
              containerBg = 'bg-[#FFD93D] shadow-[3px_3px_0px_#000000] -translate-y-0.5';
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
                className={`cursor-pointer p-3 transition-transform ${borderStyle} ${containerBg}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-black text-xs font-black ${
                      isSelected ? 'bg-black text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected ? '✓' : ''}
                  </span>
                  <div className="flex-1 text-sm font-medium text-black">
                    {option.text}
                  </div>
                </div>

                {hasSubmitted && (option.isCorrect || isSelected) && (
                  <div
                    className={`mt-2 border-t-2 border-black pt-2 text-xs font-medium ${
                      option.isCorrect ? 'text-[#1B5E20]' : 'text-[#B71C1C]'
                    }`}
                  >
                    <span className="font-black uppercase">
                      {option.isCorrect ? '✓ Klinik Gerekçe: ' : '✗ Hata Tanısı: '}
                    </span>
                    {option.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-black pt-3">
          <div className="flex items-center gap-2">
            {!hasSubmitted ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleSubmitVerification}
                className={`border-3 border-black px-5 py-2 font-black uppercase text-sm shadow-[4px_4px_0px_#000000] transition-transform ${
                  selectedOptionId
                    ? 'bg-[#6BCB77] hover:bg-[#58b763] active:translate-x-1 active:translate-y-1'
                    : 'bg-gray-300 opacity-60 cursor-not-allowed'
                }`}
              >
                İstemi Onayla / Kararı Kaydet
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="border-3 border-black bg-white px-4 py-2 font-black uppercase text-xs shadow-[3px_3px_0px_#000000] hover:bg-gray-100 active:translate-x-1 active:translate-y-1"
              >
                Tekrar Dene
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowMechanismDeepDive(!showMechanismDeepDive)}
              className="border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_#000000] hover:bg-gray-50"
            >
              {showMechanismDeepDive ? 'Mekanizma Notunu Gizle' : 'Biyofiziksel Mekanizma İncele'}
            </button>
          </div>

          <div className="text-right text-[11px] font-mono text-gray-600">
            Kaynak: <span className="font-bold">{activeCase.keyEvidenceCitation}</span>
          </div>
        </div>
      </div>

      {/* Mechanism Deep-Dive Panel */}
      {showMechanismDeepDive && (
        <div className="mt-4 border-3 border-black bg-[#E8F0FE] p-4 shadow-[4px_4px_0px_#000000]">
          <div className="flex items-center justify-between border-b-2 border-black pb-1">
            <span className="text-xs font-black uppercase text-[#1A73E8]">
              Moleküler & Farmakolojik Mekanizma Özeti
            </span>
            <span className="font-mono text-xs font-bold text-gray-700">
              {activeCase.caseId}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-black font-medium">
            {activeCase.pharmacologicalMechanism}
          </p>
          <div className="mt-3">
            <ModelIllustrationNotice
              equation={activeCase.keyEvidenceCitation}
              sourceReference="Goodman & Gilman 14. Baskı; Katzung 15. Baskı"
              assumptions={['Klinik etkileşim hesaplamaları in-vivo insan farmakokinetik ve kararlı durum çalışmalarına dayanır.']}
            />
          </div>
        </div>
      )}
    </div>
  );
};

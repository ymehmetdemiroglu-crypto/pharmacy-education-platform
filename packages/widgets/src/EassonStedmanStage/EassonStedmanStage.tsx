import React, { useState, useId } from 'react';
import { EassonStedmanConfig, EassonStedmanConfigSchema } from './schema';
import { BaseWidgetProps } from '../types';

export interface EassonStedmanStageProps extends BaseWidgetProps<EassonStedmanConfig> {
  onDockChange?: (isDocked: boolean, contacts: number) => void;
}

const STRINGS = {
  tr: {
    badge: '3D Kiral Bağlanma Simülatörü',
    title: 'Easson-Stedman 3-Noktalı Kenetlenme',
    eutomerBtn: (name: string) => `Ötomer (${name})`,
    distomerBtn: (name: string) => `Distomer (${name})`,
    configBadge: (enantiomer: string) => `3D Konfigürasyon: ${enantiomer.toUpperCase()}`,
    aromatic: '[A] Aromatik',
    hydroxyl: (inPocket: boolean) => `[B] -OH (${inPocket ? 'Cepte' : 'Dışa Dönük'})`,
    amine: '[C] -NH₂⁺',
    angle: (x: number, y: number, z: number) => `Açı: X:${x}° | Y:${y}° | Z:${z}°`,
    target: (receptor: string) => `Hedef: ${receptor}`,
    pocketsTitle: 'Reseptör Bağlanma Cepleri',
    locus1: 'Nokta 1: π-π Aromatik Çukuru',
    locus1Docked: '✓ KENETLENDİ (-4.5 kcal)',
    locus1Apart: '○ AYRI',
    locus2: 'Nokta 2: Serin Hidrojen Bağı',
    locus2Docked: '✓ KENETLENDİ (-3.0 kcal)',
    locus2Clash: '✗ STERİK ÇATIŞMA / BOŞTA',
    locus2Apart: '○ AYRI',
    locus3: 'Nokta 3: Aspartat Tuz Köprüsü',
    locus3Docked: '✓ KENETLENDİ (-4.0 kcal)',
    locus3Apart: '○ AYRI',
    score: (count: number) => `TEMAS SKORU: ${count} / 3`,
    fullyDocked: '★ 3-NOKTA EŞLEŞTİ: Maksimal Afinite & Sinyal İletimi!',
    twoDocked: (ratio: number) => `⚠ 2-NOKTA EŞLEŞTİ: Distomer zayıf bağlanır (${ratio}x düşük afinite)!`,
    notDocked: 'Maksimal kenetlenme için molekülü 3 boyutta döndürün.',
    controlsTitle: '3D Oryantasyon Denetleyicileri',
    axisX: (val: number) => `X Ekseni (Pitch): ${val}°`,
    xMinusAria: 'X ekseninde geriye 15 derece döndür',
    xPlusAria: 'X ekseninde ileriye 15 derece döndür',
    axisY: (val: number) => `Y Ekseni (Yaw): ${val}°`,
    yMinusAria: 'Y ekseninde sola 15 derece döndür',
    yPlusAria: 'Y ekseninde sağa 15 derece döndür',
    axisZ: (val: number) => `Z Ekseni (Roll): ${val}°`,
    zMinusAria: 'Z ekseninde saat yönünün tersine 15 derece döndür',
    zPlusAria: 'Z ekseninde saat yönünde 15 derece döndür',
    snapBtn: 'Biyoaktif Cebe Hizala',
    noticeLabel: 'Model İllüstrasyonu Notu:',
    noticeText: (eutomer: string, distomer: string, ref: string) =>
      `Easson-Stedman hipotezine göre kiral bir molekülün spesifik biyolojik aktivite gösterebilmesi için reseptör cebindeki en az 3 nokta ile eşzamanlı etkileşmesi gerekir. Ötomer (${eutomer}) 3 temas noktasını da sağlarken, distomer (${distomer}) hidrojen bağı verici hidroksil grubunu çözücüye yönlendirerek yalnızca 2 noktadan bağlanabilir ($ΔΔG = 3.0$ kcal/mol $\\implies \\sim 150$ kat afinite kaybı). Referans: ${ref}`,
  },
  en: {
    badge: '3D Chiral Binding Simulator',
    title: 'Easson-Stedman 3-Point Attachment',
    eutomerBtn: (name: string) => `Eutomer (${name})`,
    distomerBtn: (name: string) => `Distomer (${name})`,
    configBadge: (enantiomer: string) => `3D Configuration: ${enantiomer.toUpperCase()}`,
    aromatic: '[A] Aromatic',
    hydroxyl: (inPocket: boolean) => `[B] -OH (${inPocket ? 'In Pocket' : 'Solvent-Facing'})`,
    amine: '[C] -NH₂⁺',
    angle: (x: number, y: number, z: number) => `Angle: X:${x}° | Y:${y}° | Z:${z}°`,
    target: (receptor: string) => `Target: ${receptor}`,
    pocketsTitle: 'Receptor Binding Pockets',
    locus1: 'Point 1: π-π Aromatic Cleft',
    locus1Docked: '✓ DOCKED (-4.5 kcal)',
    locus1Apart: '○ SEPARATE',
    locus2: 'Point 2: Serine Hydrogen Bond',
    locus2Docked: '✓ DOCKED (-3.0 kcal)',
    locus2Clash: '✗ STERIC CLASH / DETACHED',
    locus2Apart: '○ SEPARATE',
    locus3: 'Point 3: Aspartate Salt Bridge',
    locus3Docked: '✓ DOCKED (-4.0 kcal)',
    locus3Apart: '○ SEPARATE',
    score: (count: number) => `CONTACT SCORE: ${count} / 3`,
    fullyDocked: '★ 3-POINT MATCH: Maximal Affinity & Signal Transduction!',
    twoDocked: (ratio: number) => `⚠ 2-POINT MATCH: Distomer binds weakly (${ratio}x lower affinity)!`,
    notDocked: 'Rotate molecule in 3 dimensions for maximal docking.',
    controlsTitle: '3D Orientation Controls',
    axisX: (val: number) => `X Axis (Pitch): ${val}°`,
    xMinusAria: 'Rotate backward 15 degrees on X axis',
    xPlusAria: 'Rotate forward 15 degrees on X axis',
    axisY: (val: number) => `Y Axis (Yaw): ${val}°`,
    yMinusAria: 'Rotate left 15 degrees on Y axis',
    yPlusAria: 'Rotate right 15 degrees on Y axis',
    axisZ: (val: number) => `Z Axis (Roll): ${val}°`,
    zMinusAria: 'Rotate counter-clockwise 15 degrees on Z axis',
    zPlusAria: 'Rotate clockwise 15 degrees on Z axis',
    snapBtn: 'Snap to Bioactive Pocket',
    noticeLabel: 'Model Illustration Notice:',
    noticeText: (eutomer: string, distomer: string, ref: string) =>
      `According to the Easson-Stedman hypothesis, for a chiral molecule to exhibit specific biological activity, it must interact simultaneously with at least 3 points in the receptor pocket. While the eutomer (${eutomer}) fulfills all 3 contact points, the distomer (${distomer}) directs its hydrogen-bonding hydroxyl group into solvent, binding through only 2 points ($ΔΔG = 3.0$ kcal/mol $\\implies \\sim 150$-fold loss in affinity). Reference: ${ref}`,
  },
  ar: {
    badge: 'محاكي الارتباط اليدواني ثلاثي الأبعاد',
    title: 'نموذج إيسون-ستيدمان للالتحام ثلاثي النقاط',
    eutomerBtn: (name: string) => `المصاوغ الفعال (${name})`,
    distomerBtn: (name: string) => `المصاوغ غير الفعال (${name})`,
    configBadge: (enantiomer: string) => `التهيئة ثلاثية الأبعاد: ${enantiomer.toUpperCase()}`,
    aromatic: '[أ] عطري',
    hydroxyl: (inPocket: boolean) => `[ب] -OH (${inPocket ? 'في الجيب' : 'متجه للمذيب'})`,
    amine: '[ج] -NH₂⁺',
    angle: (x: number, y: number, z: number) => `الزاوية: X:${x}° | Y:${y}° | Z:${z}°`,
    target: (receptor: string) => `الهدف: ${receptor}`,
    pocketsTitle: 'جيوب الارتباط بالمستقبل',
    locus1: 'النقطة 1: فجوة π-π العطرية',
    locus1Docked: '✓ ملتحم (-4.5 سعرة ك)',
    locus1Apart: '○ منفصل',
    locus2: 'النقطة 2: رابطة سيرين الهيدروجينية',
    locus2Docked: '✓ ملتحم (-3.0 سعرة ك)',
    locus2Clash: '✗ إعاقة فراغية / غير مرتبط',
    locus2Apart: '○ منفصل',
    locus3: 'النقطة 3: جسر ملحي مع الأسبارتات',
    locus3Docked: '✓ ملتحم (-4.0 سعرة ك)',
    locus3Apart: '○ منفصل',
    score: (count: number) => `نقاط التلامس: ${count} / 3`,
    fullyDocked: '★ تطابق 3 نقاط: ألفة قصوى ونقل للإشارة!',
    twoDocked: (ratio: number) => `⚠ تطابق نقطتين: يرتبط المصاوغ غير الفعال بضعف (ألفة أقل بـ ${ratio} ضعف)!`,
    notDocked: 'قم بتدوير الجزيء في 3 أبعاد للالتحام الأقصى.',
    controlsTitle: 'عناصر التحكم في الاتجاه ثلاثي الأبعاد',
    axisX: (val: number) => `محور X (الميل): ${val}°`,
    xMinusAria: 'تدوير للخلف 15 درجة على محور X',
    xPlusAria: 'تدوير للأمام 15 درجة على محور X',
    axisY: (val: number) => `محور Y (الانعراج): ${val}°`,
    yMinusAria: 'تدوير لليسار 15 درجة على محور Y',
    yPlusAria: 'تدوير لليمين 15 درجة على محور Y',
    axisZ: (val: number) => `محور Z (التدحرج): ${val}°`,
    zMinusAria: 'تدوير عكس عقارب الساعة 15 درجة على محور Z',
    zPlusAria: 'تدوير مع عقارب الساعة 15 درجة على محور Z',
    snapBtn: 'محاذاة مع الجيب الحيوي',
    noticeLabel: 'ملاحظة نموذج المحاكاة التوضيحي:',
    noticeText: (eutomer: string, distomer: string, ref: string) =>
      `وفقاً لفرضية إيسون-ستيدمان، لكي يُظهر الجزيء اليدواني نشاطاً حيوياً نوعياً، يجب أن يتفاعل في آن واحد مع 3 نقاط على الأقل في جيب المستقبل. بينما يوفر المصاوغ الفعال (${eutomer}) نقاط التلامس الثلاث كاملة، يوجه المصاوغ غير الفعال (${distomer}) مجموعة الهيدروكسيل المانحة للرابطة الهيدروجينية نحو المذيب، ليرتبط عبر نقطتين فقط ($ΔΔG = 3.0$ سعرة ك/مول $\\implies$ فقدان في الألفة بمقدار $\\sim 150$ ضعفاً). المرجع: ${ref}`,
  },
};

export const EassonStedmanStage: React.FC<EassonStedmanStageProps> = ({
  config: rawConfig,
  locale = 'tr',
  className = '',
  onDockChange,
}) => {
  const t = STRINGS[locale] ?? STRINGS.tr;
  const isRtl = locale === 'ar';
  const config = EassonStedmanConfigSchema.parse(rawConfig || {});
  const [enantiomer, setEnantiomer] = useState<'eutomer' | 'distomer'>(config.initialEnantiomer);
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [rotZ, setRotZ] = useState<number>(0);

  const headingId = useId();
  const statusId = useId();

  // Alignment tolerances
  const isAlignedX = Math.abs(rotX % 360) <= 20 || Math.abs(rotX % 360) >= 340;
  const isAlignedY = Math.abs(rotY % 360) <= 20 || Math.abs(rotY % 360) >= 340;
  const isAlignedZ = Math.abs(rotZ % 360) <= 20 || Math.abs(rotZ % 360) >= 340;
  const isOrientationOptimal = isAlignedX && isAlignedY && isAlignedZ;

  // Locus contact checks
  // Locus 1: Aromatic ring docks if X & Y aligned
  const locus1Docked = isAlignedX && isAlignedY;
  // Locus 3: Basic amine docks if orientation is generally aligned
  const locus3Docked = isOrientationOptimal;
  // Locus 2: Hydroxyl OH ONLY docks if eutomer AND orientation optimal.
  // In distomer, the OH projects 109.5° away into bulk solvent!
  const locus2Docked = enantiomer === 'eutomer' && isOrientationOptimal;

  const contactsCount = (locus1Docked ? 1 : 0) + (locus2Docked ? 1 : 0) + (locus3Docked ? 1 : 0);
  const isFullyDocked = contactsCount === 3;

  // Thermodynamics
  // RT at 37°C (310.15 K) = 0.592 kcal/mol (or 0.616 kcal/mol at 310 K)
  const RT = 0.592;
  const currentDeltaG = locus2Docked ? config.deltaGEutomer : (contactsCount === 2 ? config.deltaGDistomer : (locus1Docked ? -4.5 : 0));
  const eudismicRatio = Math.round(Math.exp((Math.abs(config.deltaGEutomer) - Math.abs(config.deltaGDistomer)) / RT));

  const handleSnap = () => {
    setRotX(0);
    setRotY(0);
    setRotZ(0);
  };

  const handleRotate = (axis: 'x' | 'y' | 'z', delta: number) => {
    if (axis === 'x') setRotX((prev) => (prev + delta) % 360);
    if (axis === 'y') setRotY((prev) => (prev + delta) % 360);
    if (axis === 'z') setRotZ((prev) => (prev + delta) % 360);
  };

  return (
    <section
      role="region"
      aria-labelledby={headingId}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`p-6 bg-[#FFF8E7] border-4 border-black shadow-[6px_6px_0px_#000000] rounded-none max-w-3xl mx-auto font-sans text-black text-start ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b-4 border-black gap-2">
        <div>
          <span className="inline-block text-xs uppercase tracking-widest font-black bg-[#4D96FF] text-white px-2 py-0.5 border-2 border-black mb-1">
            {t.badge}
          </span>
          <h3 id={headingId} className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            {t.title}
          </h3>
        </div>

        {/* Enantiomer Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEnantiomer('eutomer')}
            data-testid="toggle-eutomer"
            className={`px-3 py-1.5 font-bold text-xs sm:text-sm border-2 border-black transition-transform ${
              enantiomer === 'eutomer'
                ? 'bg-[#6BCB77] text-black shadow-[2px_2px_0px_#000000] -translate-y-0.5'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t.eutomerBtn(config.eutomerName)}
          </button>
          <button
            type="button"
            onClick={() => setEnantiomer('distomer')}
            data-testid="toggle-distomer"
            className={`px-3 py-1.5 font-bold text-xs sm:text-sm border-2 border-black transition-transform ${
              enantiomer === 'distomer'
                ? 'bg-[#FF6B9D] text-white shadow-[2px_2px_0px_#000000] -translate-y-0.5'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t.distomerBtn(config.distomerName)}
          </button>
        </div>
      </div>

      {/* Main 3D Stage & Target Receptor View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 3D Molecule Visualizer */}
        <div className="flex flex-col items-center justify-center p-4 bg-white border-4 border-black min-h-[260px] relative overflow-hidden">
          <div className="absolute top-2 left-2 text-[10px] font-mono uppercase font-black bg-black text-white px-1.5 py-0.5">
            {t.configBadge(enantiomer)}
          </div>

          {/* Perspective viewport */}
          <div
            className="w-48 h-48 relative flex items-center justify-center transition-transform duration-200"
            style={{
              perspective: '600px',
            }}
          >
            <div
              data-testid="molecule-3d-node"
              className="w-32 h-32 relative transition-transform duration-150"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
              }}
            >
              {/* Central Chiral Carbon */}
              <div
                className="absolute top-1/2 left-1/2 w-6 h-6 -mt-3 -ml-3 bg-black rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-mono font-bold"
                style={{ transform: 'translateZ(0px)' }}
              >
                C*
              </div>

              {/* Group 1: Aromatic Ring */}
              <div
                data-testid="group-aromatic"
                className={`absolute top-0 left-1/2 -ml-8 px-2 py-1 border-2 border-black text-xs font-bold text-center ${
                  locus1Docked ? 'bg-[#6BCB77] text-black ring-2 ring-black' : 'bg-gray-200'
                }`}
                style={{ transform: 'translateY(-20px) translateZ(25px)' }}
              >
                {t.aromatic}
              </div>

              {/* Group 2: Hydroxyl (-OH) - Chiral Position flips in distomer! */}
              <div
                data-testid="group-hydroxyl"
                className={`absolute bottom-2 left-0 px-2 py-1 border-2 border-black text-xs font-bold text-center ${
                  locus2Docked
                    ? 'bg-[#6BCB77] text-black ring-2 ring-black'
                    : enantiomer === 'distomer'
                    ? 'bg-[#FF6B9D] text-white'
                    : 'bg-gray-200'
                }`}
                style={{
                  transform:
                    enantiomer === 'eutomer'
                      ? 'translateX(-15px) translateY(10px) translateZ(35px)'
                      : 'translateX(-25px) translateY(-10px) translateZ(-45px)', // flipped outward into solvent
                }}
              >
                {t.hydroxyl(enantiomer === 'eutomer')}
              </div>

              {/* Group 3: Protonated Amine */}
              <div
                data-testid="group-amine"
                className={`absolute bottom-2 right-0 px-2 py-1 border-2 border-black text-xs font-bold text-center ${
                  locus3Docked ? 'bg-[#6BCB77] text-black ring-2 ring-black' : 'bg-gray-200'
                }`}
                style={{ transform: 'translateX(15px) translateY(10px) translateZ(25px)' }}
              >
                {t.amine}
              </div>
            </div>
          </div>

          <div className="text-xs font-mono font-bold text-gray-600 mt-2">
            {t.angle(rotX, rotY, rotZ)}
          </div>
        </div>

        {/* Receptor Cleft & Docking Status */}
        <div className="flex flex-col justify-between p-4 bg-white border-4 border-black">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              {t.target(config.targetReceptor)}
            </div>
            <h4 className="text-lg font-black uppercase mb-3">{t.pocketsTitle}</h4>

            <div className="space-y-2 mb-4">
              <div
                data-testid="locus-1-status"
                className={`p-2 border-2 border-black flex items-center justify-between text-xs font-bold ${
                  locus1Docked ? 'bg-[#E8F5E9] text-green-900 border-green-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span>{t.locus1}</span>
                <span className="font-mono">{locus1Docked ? t.locus1Docked : t.locus1Apart}</span>
              </div>

              <div
                data-testid="locus-2-status"
                className={`p-2 border-2 border-black flex items-center justify-between text-xs font-bold ${
                  locus2Docked
                    ? 'bg-[#E8F5E9] text-green-900 border-green-700'
                    : enantiomer === 'distomer' && isOrientationOptimal
                    ? 'bg-[#FFEBEE] text-red-900 border-red-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span>{t.locus2}</span>
                <span className="font-mono">
                  {locus2Docked
                    ? t.locus2Docked
                    : enantiomer === 'distomer' && isOrientationOptimal
                    ? t.locus2Clash
                    : t.locus2Apart}
                </span>
              </div>

              <div
                data-testid="locus-3-status"
                className={`p-2 border-2 border-black flex items-center justify-between text-xs font-bold ${
                  locus3Docked ? 'bg-[#E8F5E9] text-green-900 border-green-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span>{t.locus3}</span>
                <span className="font-mono">{locus3Docked ? t.locus3Docked : t.locus3Apart}</span>
              </div>
            </div>
          </div>

          {/* Calculated Output Banner */}
          <div
            id={statusId}
            data-testid="docking-result-banner"
            className={`p-3 border-2 border-black font-mono text-xs ${
              isFullyDocked
                ? 'bg-[#6BCB77] text-black font-black'
                : contactsCount === 2
                ? 'bg-[#FFD93D] text-black font-bold'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span>{t.score(contactsCount)}</span>
              <span>ΔG = {currentDeltaG.toFixed(1)} kcal/mol</span>
            </div>
            <div>
              {isFullyDocked
                ? t.fullyDocked
                : contactsCount === 2
                ? t.twoDocked(eudismicRatio)
                : t.notDocked}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Rotation Controls & WCAG 2.2 Steppers */}
      <div className="p-4 bg-white border-4 border-black mb-4">
        <div className="text-xs font-black uppercase tracking-wider mb-3">{t.controlsTitle}</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {/* Axis X */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold font-mono">{t.axisX(rotX)}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleRotate('x', -15)}
                aria-label={t.xMinusAria}
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                -15°
              </button>
              <button
                type="button"
                onClick={() => handleRotate('x', 15)}
                aria-label={t.xPlusAria}
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                +15°
              </button>
            </div>
          </div>

          {/* Axis Y */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold font-mono">{t.axisY(rotY)}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleRotate('y', -15)}
                aria-label={t.yMinusAria}
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                -15°
              </button>
              <button
                type="button"
                onClick={() => handleRotate('y', 15)}
                aria-label={t.yPlusAria}
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                +15°
              </button>
            </div>
          </div>

          {/* Axis Z */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold font-mono">{t.axisZ(rotZ)}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleRotate('z', -15)}
                aria-label={t.zMinusAria}
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                -15°
              </button>
              <button
                type="button"
                onClick={() => handleRotate('z', 15)}
                aria-label={t.zPlusAria}
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                +15°
              </button>
            </div>
          </div>
        </div>

        {/* Snap / Reset Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSnap}
            data-testid="snap-bioactive-button"
            className="px-4 py-2 bg-[#FFD93D] border-2 border-black font-bold text-xs uppercase shadow-[2px_2px_0px_#000000] hover:bg-yellow-400 active:translate-y-0.5"
          >
            {t.snapBtn}
          </button>
        </div>
      </div>

      {/* Model Illustration Notice */}
      <aside
        data-testid="model-illustration-notice"
        className="p-3 bg-[#FFF] border-2 border-black text-xs text-gray-700 font-mono leading-relaxed"
      >
        <span className="font-bold text-black uppercase">{t.noticeLabel}</span>{' '}
        {t.noticeText(config.eutomerName, config.distomerName, config.equationRef)}
      </aside>
    </section>
  );
};
